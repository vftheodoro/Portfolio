/**
 * SwarmMotionController — camada DOM do Swarm Experience.
 *
 * Responsabilidades (a lógica de tempo/planejamento fica em módulos puros):
 *  - descobrir cenas (`[data-sw-section]`) e alvos (`[data-sw]`) já renderizados;
 *  - ativar cada cena com IntersectionObserver e planejá-la (planner.ts);
 *  - rodar UM loop de requestAnimationFrame, só enquanto há trabalho;
 *  - escrever `--b` (progresso) direto no elemento: nenhum state React por quadro;
 *  - concluir (flush) cenas passadas, âncoras, foco e rolagem muito rápida;
 *  - limpar listeners/observers em `destroy()`.
 *
 * O conteúdo real nunca é recriado: o HTML do servidor (SEO/leitor de tela) é o
 * mesmo; o CSS em swarm.css só esconde/revela visualmente cada alvo enquanto o
 * atributo `data-sw-done` não existe.
 */
import { CursorRenderer } from "./cursorRenderer.ts";
import { FLUSH_VELOCITY, FrameBudget, isInView, isPassed, speedForVelocity } from "./motion.ts";
import { planChoreography } from "./planner.ts";
import { presetFor } from "./presets.ts";
import { SectionTimeline, type TimelineEnv } from "./timeline.ts";
import type { Geometry, MotionMode, Preset, SwarmKind, TargetDescriptor, Task } from "./types.ts";

const KINDS = new Set<string>(["frame", "type", "block", "media", "chip", "link", "line"]);
const CACHE_TTL_MS = 600;

interface Scene {
  name: string;
  roots: HTMLElement[];
  preset: Preset;
  els: Map<string, HTMLElement>;
  descriptors: TargetDescriptor[];
  tl: SectionTimeline | null;
  tasks: Task[];
  activated: boolean;
  done: boolean;
  lastB: Map<string, number>;
}

export interface ControllerOptions {
  mode: MotionMode;
  onBusyChange?: (busy: boolean) => void;
  /** Atraso (ms) antes da abertura começar, para a hidratação assentar. */
  introDelay?: number;
}

export class SwarmMotionController {
  private mode: MotionMode;
  private readonly opts: ControllerOptions;
  private scenes: Scene[] = [];
  private active = new Set<Scene>();
  private io: IntersectionObserver | null = null;
  private ro: ResizeObserver | null = null;
  private renderer: CursorRenderer | null = null;
  private raf = 0;
  private lastTs = 0;
  private lastScrollY = 0;
  private velocity = 0;
  private geomCache = new Map<string, Geometry>();
  private bottomCache = new Map<string, number | null>();
  private nullSince = new Map<string, number>();
  private cacheStamp = 0;
  private budget = new FrameBudget();
  private cleanups: Array<() => void> = [];
  private busy = false;
  private destroyed = false;
  private introTimer = 0;
  private idSeq = 0;
  private debug = (() => {
    try {
      return window.localStorage.getItem("swarm-debug") === "1";
    } catch {
      return false;
    }
  })();
  private elId = new WeakMap<HTMLElement, string>();

  constructor(opts: ControllerOptions) {
    this.opts = opts;
    this.mode = opts.mode;
  }

  get currentMode(): MotionMode {
    return this.mode;
  }

  start(): void {
    const root = document.documentElement;
    (window as unknown as { __swarmBoot?: boolean }).__swarmBoot = true;
    if (this.mode === "off" || !root.classList.contains("swarm-on")) {
      this.finalizeEverything();
      return;
    }
    root.dataset.swarm = this.mode;
    this.discover();
    if (this.scenes.length === 0) {
      this.finalizeEverything();
      return;
    }

    this.renderer = new CursorRenderer(document.getElementById("sw-layer"), this.mode === "full");
    this.lastScrollY = window.scrollY;

    this.io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const scene = this.scenes.find((s) => s.roots.includes(e.target as HTMLElement));
          if (scene) this.activate(scene);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    for (const s of this.scenes) {
      if (s.name === "hero") continue; // a abertura é ativada por tempo, abaixo
      s.roots.forEach((r) => this.io!.observe(r));
    }

    this.ro = new ResizeObserver(() => this.clearCaches());
    this.ro.observe(document.body);
    void document.fonts?.ready.then(() => this.clearCaches());

    const onFocus = (ev: FocusEvent) => {
      const t = ev.target as HTMLElement | null;
      const scene = t && this.scenes.find((s) => s.roots.some((r) => r.contains(t)));
      if (scene && !scene.done) this.flushScene(scene, "focus");
    };
    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const target = document.getElementById(a.getAttribute("href")!.slice(1));
      if (target) this.flushAbove(target.getBoundingClientRect().top + window.scrollY);
    };
    const onScroll = () => this.kick();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("focusin", onFocus);
    document.addEventListener("click", onClick, true);
    this.cleanups.push(
      () => window.removeEventListener("scroll", onScroll),
      () => document.removeEventListener("focusin", onFocus),
      () => document.removeEventListener("click", onClick, true),
    );

    // âncora na URL inicial (#projects): conclui tudo que ficou acima
    if (window.location.hash) {
      let id = window.location.hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        /* hash inválido: usa como veio */
      }
      const el = document.getElementById(id);
      if (el) this.flushAbove(el.getBoundingClientRect().top + window.scrollY);
    }

    const hero = this.scenes.find((s) => s.name === "hero");
    if (hero) {
      this.introTimer = window.setTimeout(() => this.activate(hero), this.opts.introDelay ?? 280);
    }
    this.kick();
  }

  /** Botão "pular": conclui tudo agora e desliga o Swarm nesta página. */
  skipAll(): void {
    this.mode = "off";
    this.finalizeEverything();
  }

  destroy(): void {
    this.destroyed = true;
    cancelAnimationFrame(this.raf);
    window.clearTimeout(this.introTimer);
    this.io?.disconnect();
    this.ro?.disconnect();
    this.cleanups.forEach((fn) => fn());
    this.cleanups = [];
    this.renderer?.destroy();
    this.renderer = null;
    this.setBusy(false);
  }

  // ---------------------------------------------------------------- descoberta

  private discover(): void {
    const byName = new Map<string, HTMLElement[]>();
    document.querySelectorAll<HTMLElement>("[data-sw-section]").forEach((el) => {
      const name = el.dataset.swSection!;
      byName.set(name, [...(byName.get(name) ?? []), el]);
    });
    for (const [name, roots] of byName) {
      const els = new Map<string, HTMLElement>();
      const descriptors: TargetDescriptor[] = [];
      let order = 0;
      for (const root of roots) {
        const nodes = [
          ...(root.matches("[data-sw]") ? [root] : []),
          ...Array.from(root.querySelectorAll<HTMLElement>("[data-sw]")),
        ];
        for (const el of nodes) {
          const kind = el.dataset.sw as string;
          if (!KINDS.has(kind)) continue;
          const id = `${name}:${this.idSeq++}`;
          this.elId.set(el, id);
          els.set(id, el);
          const groupEl = el.closest<HTMLElement>("[data-sw-group]");
          const cursor = el.dataset.swCursor;
          descriptors.push({
            id,
            kind: kind as SwarmKind,
            order: order++,
            group: el.dataset.swGroup ?? groupEl?.dataset.swGroup ?? "g0",
            cursorHint: cursor !== undefined && Number.isInteger(Number(cursor)) && Number(cursor) >= 0 ? Number(cursor) : undefined,
            chars: el.dataset.swN ? Number(el.dataset.swN) : undefined,
          });
        }
      }
      this.scenes.push({
        name,
        roots,
        preset: presetFor(name),
        els,
        descriptors,
        tl: null,
        tasks: [],
        activated: false,
        done: false,
        lastB: new Map(),
      });
    }
  }

  // ----------------------------------------------------------------- ativação

  private activate(scene: Scene): void {
    if (scene.activated || scene.done || this.destroyed) return;
    scene.activated = true;
    this.io?.unobserve(scene.roots[0]);
    scene.roots.forEach((r) => this.io?.unobserve(r));

    // alvos sem caixa (display:none em algum breakpoint) concluem na hora
    const live: TargetDescriptor[] = [];
    for (const d of scene.descriptors) {
      const el = scene.els.get(d.id)!;
      if (el.getClientRects().length === 0) this.finalize(el);
      else live.push(d);
    }

    const tasks = planChoreography(live, scene.preset, { lite: this.mode === "reduced" });
    const planned = new Set(tasks.map((t) => t.targetId));
    for (const d of live) if (!planned.has(d.id)) this.finalize(scene.els.get(d.id)!);

    scene.tasks = tasks;
    scene.tl = new SectionTimeline(tasks);
    if (tasks.length === 0) {
      scene.done = true;
      return;
    }
    this.active.add(scene);
    this.kick();
  }

  private flushScene(scene: Scene, reason = "?"): void {
    if (scene.done) return;
    if (this.debug) console.debug(`[swarm] flush ${scene.name}: ${reason}`);
    if (!scene.tl) {
      scene.activated = true;
      scene.roots.forEach((r) => this.io?.unobserve(r));
      scene.els.forEach((el) => this.finalize(el));
    } else {
      for (const id of scene.tl.flush()) this.finalizeTask(scene, id);
      scene.els.forEach((el) => this.finalize(el));
    }
    scene.done = true;
    scene.tl = null;
    this.active.delete(scene);
    this.renderer?.releaseScene(scene.name);
    this.evaluateBusy();
  }

  private flushAbove(docY: number): void {
    for (const s of this.scenes) {
      if (s.done) continue;
      const bottom = this.sceneBottom(s);
      if (bottom !== null && bottom <= docY + 4) this.flushScene(s, "anchor");
    }
  }

  private sceneBottom(scene: Scene): number | null {
    if (this.bottomCache.has(scene.name)) return this.bottomCache.get(scene.name)!;
    let bottom: number | null = null;
    for (const r of scene.roots) {
      if (r.hasAttribute("data-sw-fixed")) continue;
      const rect = r.getBoundingClientRect();
      const b = rect.bottom + window.scrollY;
      bottom = bottom === null ? b : Math.max(bottom, b);
    }
    this.bottomCache.set(scene.name, bottom);
    return bottom;
  }

  // -------------------------------------------------------------------- loop

  private kick(): void {
    if (this.raf || this.destroyed) return;
    this.lastTs = 0;
    this.lastScrollY = window.scrollY;
    this.velocity = 0;
    this.raf = requestAnimationFrame(this.frame);
  }

  private frame = (ts: number): void => {
    this.raf = 0;
    if (this.destroyed) return;
    try {
      this.step(ts);
    } catch (err) {
      // qualquer erro no loop: nunca deixa conteúdo escondido
      console.error("[swarm] erro no loop, exibindo conteúdo completo", err);
      this.finalizeEverything();
    }
  };

  private step(ts: number): void {
    const dt = this.lastTs ? Math.min(ts - this.lastTs, 64) : 16;
    const rawDt = this.lastTs ? ts - this.lastTs : 16;
    this.lastTs = ts;
    this.budget.push(rawDt);

    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const inst = ((scrollY - this.lastScrollY) / Math.max(1, rawDt)) * 1000;
    // salto programático (âncora, scrollTo): não é "rolagem rápida"; cenas passadas
    // já são concluídas por isPassed e a cena de destino deve ser animada.
    const jumped = Math.abs(scrollY - this.lastScrollY) > vh * 1.2;
    this.velocity = jumped ? 0 : this.velocity * 0.82 + inst * 0.18;
    this.lastScrollY = scrollY;

    if (ts - this.cacheStamp > CACHE_TTL_MS) {
      this.clearCaches();
      this.cacheStamp = ts;
    }

    if (this.budget.overBudget) {
      this.degrade();
      if (this.mode === "off") return;
    }

    // cenas inteiramente acima da viewport nunca são animadas
    for (const s of this.scenes) {
      if (s.done) continue;
      const bottom = this.sceneBottom(s);
      if (bottom !== null && isPassed(bottom, scrollY)) this.flushScene(s, "passed");
    }
    const fast = Math.abs(this.velocity) > FLUSH_VELOCITY;
    if (fast) for (const s of [...this.active]) this.flushScene(s, `fast ${Math.round(this.velocity)}px/s`);

    const speed = speedForVelocity(this.velocity);
    const env = this.makeEnv(scrollY, vh);

    for (const scene of [...this.active]) {
      const tl = scene.tl!;
      // alvo que ficou todo acima da viewport: conclui só ele
      for (const task of tl.tasks) {
        if (tl.status(task.id) === "done") continue;
        const g = env.getGeom(task.targetId);
        if (!g) {
          const since = this.nullSince.get(task.id) ?? ts;
          this.nullSince.set(task.id, since);
          if (ts - since > 2500 && tl.flushTask(task.id)) this.finalizeTask(scene, task.id);
          continue;
        }
        if (isPassed(g.rect.y + g.rect.h, scrollY, 30) && tl.flushTask(task.id)) this.finalizeTask(scene, task.id);
      }
      const res = tl.tick(dt, speed, env);
      for (const id of res.finished) this.finalizeTask(scene, id);
      for (const task of tl.tasks) {
        if (tl.status(task.id) !== "running") continue;
        const b = tl.progress(task);
        const el = scene.els.get(task.targetId)!;
        if (Math.abs(b - (scene.lastB.get(task.id) ?? -1)) > 0.002) {
          el.style.setProperty("--b", b.toFixed(3));
          scene.lastB.set(task.id, b);
        }
      }
      this.renderer?.update(scene.name, tl.frames(env), tl.ghosts(env), scrollY, window.scrollX, (id) =>
        env.getGeom(id),
      );
      if (tl.settled) {
        scene.done = true;
        scene.tl = null;
        this.active.delete(scene);
        this.renderer?.releaseScene(scene.name);
      }
    }

    this.evaluateBusy();
    if (this.active.size > 0) this.raf = requestAnimationFrame(this.frame);
  }

  private makeEnv(scrollY: number, vh: number): TimelineEnv {
    return {
      getGeom: (id) => this.geometry(id),
      isVisible: (id) => {
        const g = this.geometry(id);
        return !!g && isInView(g.rect.y, g.rect.y + g.rect.h, scrollY, vh);
      },
    };
  }

  // --------------------------------------------------------------- geometria

  private clearCaches(): void {
    this.geomCache.clear();
    this.bottomCache.clear();
  }

  private geometry(id: string): Geometry | null {
    const cached = this.geomCache.get(id);
    if (cached) return cached;
    const el = this.findEl(id);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return null;
    const sx = window.scrollX;
    const sy = window.scrollY;
    const g: Geometry = { rect: { x: r.left + sx, y: r.top + sy, w: r.width, h: r.height } };
    if (el.dataset.sw === "type") {
      const chars = el.querySelectorAll<HTMLElement>(".sw-c");
      const carets = [];
      for (let i = 0; i < chars.length; i++) {
        const cr = chars[i].getBoundingClientRect();
        carets.push({ x: cr.left + sx, y: cr.top + sy + cr.height * 0.85 });
      }
      if (chars.length > 0) {
        const last = chars[chars.length - 1].getBoundingClientRect();
        carets.push({ x: last.right + sx, y: last.top + sy + last.height * 0.85 });
        g.carets = carets;
      }
    } else if (el.dataset.sw === "line") {
      g.axis = el.dataset.swAxis === "y" ? "y" : "x";
    }
    this.geomCache.set(id, g);
    return g;
  }

  private findEl(id: string): HTMLElement | null {
    const name = id.slice(0, id.indexOf(":"));
    const scene = this.scenes.find((s) => s.name === name);
    return scene?.els.get(id) ?? null;
  }

  // ---------------------------------------------------------------- aplicação

  private finalize(el: HTMLElement): void {
    el.setAttribute("data-sw-done", "");
    el.style.removeProperty("--b");
  }

  private finalizeTask(scene: Scene, taskId: string): void {
    const task = scene.tasks.find((t) => t.id === taskId);
    const el = task && scene.els.get(task.targetId);
    if (el) this.finalize(el);
  }

  private finalizeEverything(): void {
    for (const s of this.scenes) {
      s.done = true;
      s.tl = null;
    }
    this.active.clear();
    this.io?.disconnect();
    this.ro?.disconnect();
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    window.clearTimeout(this.introTimer);
    document.querySelectorAll<HTMLElement>("[data-sw]").forEach((el) => this.finalize(el));
    this.renderer?.destroy();
    this.renderer = null;
    document.documentElement.classList.remove("swarm-on");
    document.documentElement.dataset.swarm = "off";
    this.setBusy(false);
  }

  /** Desempenho insuficiente: full -> reduced -> off. */
  private degrade(): void {
    if (this.mode === "full") {
      this.mode = "reduced";
      this.budget = new FrameBudget();
      document.documentElement.dataset.swarm = "reduced";
      this.renderer?.setFancy(false);
      return;
    }
    this.mode = "off";
    this.finalizeEverything();
  }

  private evaluateBusy(): void {
    let working = false;
    for (const s of this.active) if (s.tl?.working) working = true;
    this.setBusy(working);
  }

  private setBusy(b: boolean): void {
    if (b === this.busy) return;
    this.busy = b;
    this.opts.onBusyChange?.(b);
  }
}

/** Revela todo o conteúdo marcado (usado quando o Swarm é desmontado de verdade). */
export function revealAll(): void {
  document.documentElement.classList.remove("swarm-on");
  document.querySelectorAll<HTMLElement>("[data-sw]").forEach((el) => {
    el.setAttribute("data-sw-done", "");
    el.style.removeProperty("--b");
  });
}
