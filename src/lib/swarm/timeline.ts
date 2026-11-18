import { endAnchor, entryPoint, anchorAt, startAnchor } from "./cursorPath.ts";
import { clamp, easeOut, lerp, shape } from "./math.ts";
import type { CursorFrame, Geometry, GhostFrame, Point, Task } from "./types.ts";

export interface TimelineEnv {
  /** O alvo está (ou quase está) na viewport? Tarefas só começam com alvo visível. */
  isVisible(targetId: string): boolean;
  /** Geometria em coordenadas de documento; null se o alvo não puder ser medido. */
  getGeom(targetId: string): Geometry | null;
}

type Status = "waiting" | "travel" | "running" | "done";

interface Runtime {
  status: Status;
  readyAt: number;
  runStart: number;
  doneAt: number;
}

export interface TickResult {
  started: string[];
  finished: string[];
}

const LINGER_MS = 650;
const LEAVE_MS = 420;

/**
 * Relógio + máquina de estados de UMA cena. Sem DOM: recebe dt, a velocidade e
 * um "ambiente" (visibilidade/geometria) e devolve o que mudou. O controlador
 * aplica o resultado no DOM; os testes exercitam esta classe diretamente.
 */
export class SectionTimeline {
  readonly tasks: Task[];
  clock = 0;
  private rt = new Map<string, Runtime>();
  private bySlot = new Map<number, Task[]>();

  constructor(tasks: Task[]) {
    this.tasks = tasks;
    for (const t of tasks) {
      this.rt.set(t.id, { status: "waiting", readyAt: 0, runStart: 0, doneAt: 0 });
      const list = this.bySlot.get(t.slot) ?? [];
      list.push(t);
      this.bySlot.set(t.slot, list);
    }
  }

  get finished(): boolean {
    for (const r of this.rt.values()) if (r.status !== "done") return false;
    return true;
  }

  /** true enquanto algum cursor ainda precisa ser desenhado (inclui "linger"). */
  get busy(): boolean {
    return !this.finished;
  }

  /** Algum cursor está de fato trabalhando (deslocando ou construindo) agora. */
  get working(): boolean {
    for (const r of this.rt.values()) if (r.status === "travel" || r.status === "running") return true;
    return false;
  }

  /** Tudo concluído E os cursores já saíram de cena. */
  get settled(): boolean {
    if (!this.finished) return false;
    let last = 0;
    for (const r of this.rt.values()) last = Math.max(last, r.doneAt);
    return this.clock - last > LINGER_MS + LEAVE_MS;
  }

  status(taskId: string): Status {
    return this.rt.get(taskId)?.status ?? "done";
  }

  /** Progresso JÁ MODELADO (0..1) que deve ir para `--b`. */
  progress(task: Task): number {
    const r = this.rt.get(task.id);
    if (!r) return 1;
    if (r.status === "done") return 1;
    if (r.status !== "running") return 0;
    return shape(task.kind, clamp((this.clock - r.runStart) / Math.max(1, task.duration)));
  }

  tick(dtMs: number, speed: number, env: TimelineEnv): TickResult {
    this.clock += dtMs * speed;
    const out: TickResult = { started: [], finished: [] };
    for (const task of this.tasks) {
      const r = this.rt.get(task.id)!;
      if (r.status === "done") continue;

      if (r.status === "waiting") {
        if (this.clock < task.start - task.travel) continue;
        if (!this.slotFree(task)) continue;
        if (!env.isVisible(task.targetId)) continue;
        r.status = "travel";
        r.readyAt = this.clock;
        r.runStart = this.clock + task.travel;
      }
      if (r.status === "travel" && this.clock >= r.runStart) {
        r.status = "running";
        out.started.push(task.id);
      }
      if (r.status === "running" && this.clock - r.runStart >= task.duration) {
        r.status = "done";
        r.doneAt = this.clock;
        out.finished.push(task.id);
      }
    }
    return out;
  }

  /** Conclui tudo de uma vez (scroll rápido, âncora, foco, pular). */
  flush(): string[] {
    const ids: string[] = [];
    for (const task of this.tasks) {
      const r = this.rt.get(task.id)!;
      if (r.status !== "done") {
        r.status = "done";
        r.doneAt = this.clock;
        ids.push(task.id);
      }
    }
    return ids;
  }

  /** Conclui só uma tarefa (alvo que ficou inteiro acima da viewport). */
  flushTask(taskId: string): boolean {
    const r = this.rt.get(taskId);
    if (!r || r.status === "done") return false;
    r.status = "done";
    r.doneAt = this.clock;
    return true;
  }

  private slotFree(task: Task): boolean {
    const list = this.bySlot.get(task.slot)!;
    for (const t of list) {
      if (t === task) return true;
      if (this.rt.get(t.id)!.status !== "done") return false;
    }
    return true;
  }

  /** Quadros dos cursores (coordenadas de documento). */
  frames(env: TimelineEnv): CursorFrame[] {
    const frames: CursorFrame[] = [];
    for (const [slot, list] of this.bySlot) {
      frames.push(this.frameFor(slot, list, env));
    }
    return frames;
  }

  private frameFor(slot: number, list: Task[], env: TimelineEnv): CursorFrame {
    const hidden: CursorFrame = { slot, visible: false, x: 0, y: 0, opacity: 0, clicking: false };
    let lastDone: Task | undefined;
    let current: Task | undefined;
    for (const t of list) {
      const r = this.rt.get(t.id)!;
      if (r.status === "done") lastDone = t;
      else {
        current = t;
        break;
      }
    }
    const restPoint = (): Point | null => {
      if (!lastDone) return null;
      const g = env.getGeom(lastDone.targetId);
      return g ? endAnchor(lastDone.kind, g) : null;
    };

    if (current) {
      const r = this.rt.get(current.id)!;
      const g = env.getGeom(current.targetId);
      if (!g) return hidden;
      if (r.status === "waiting") {
        const rest = restPoint();
        if (!rest || !lastDone) return hidden; // ainda nem entrou em cena
        // esperando alvo fora da viewport: o cursor sai de cena em vez de ficar parado
        return this.restFrame(slot, rest, lastDone.id);
      }
      const from = restPoint() ?? entryPoint(slot, g);
      if (r.status === "travel") {
        const k = easeOut((this.clock - r.readyAt) / Math.max(1, current.travel));
        const to = startAnchor(current.kind, g);
        return {
          slot,
          visible: true,
          x: lerp(from.x, to.x, k),
          y: lerp(from.y, to.y, k),
          opacity: lastDone && this.clock - r.readyAt >= 0 && !this.hasLeft(lastDone.id, r.readyAt) ? 1 : k,
          clicking: false,
          targetId: current.targetId,
          kind: current.kind,
          progress: 0,
        };
      }
      const b = this.progress(current);
      const p = anchorAt(current.kind, b, g);
      return {
        slot,
        visible: true,
        x: p.x,
        y: p.y,
        opacity: 1,
        clicking: (current.kind === "link" || current.kind === "chip") && b > 0.82,
        targetId: current.targetId,
        kind: current.kind,
        progress: b,
      };
    }

    // todas concluídas: repousa e depois sai de cena
    const rest = restPoint();
    if (!rest || !lastDone) return hidden;
    return this.restFrame(slot, rest, lastDone.id);
  }

  private hasLeft(lastDoneId: string, now: number): boolean {
    return now - this.rt.get(lastDoneId)!.doneAt > LINGER_MS + LEAVE_MS;
  }

  private restFrame(slot: number, rest: Point, lastDoneId: string): CursorFrame {
    const since = this.clock - this.rt.get(lastDoneId)!.doneAt;
    if (since <= LINGER_MS) return { slot, visible: true, x: rest.x, y: rest.y, opacity: 1, clicking: false };
    const k = clamp((since - LINGER_MS) / LEAVE_MS);
    if (k >= 1) return { slot, visible: false, x: 0, y: 0, opacity: 0, clicking: false };
    return { slot, visible: true, x: rest.x + 60 * k, y: rest.y - 40 * k, opacity: 1 - k, clicking: false };
  }

  /** Fantasmas de duplicação ativos (viagem de uma geometria para outra). */
  ghosts(env: TimelineEnv): GhostFrame[] {
    const out: GhostFrame[] = [];
    for (const task of this.tasks) {
      if (!task.dupFrom) continue;
      const r = this.rt.get(task.id)!;
      if (r.status !== "travel" && r.status !== "running") continue;
      const span = task.travel + task.duration * 0.6;
      const t = clamp((this.clock - r.readyAt) / Math.max(1, span));
      if (t >= 1) continue;
      const from = env.getGeom(task.dupFrom);
      const to = env.getGeom(task.targetId);
      if (!from || !to) continue;
      out.push({ taskId: task.id, from: from.rect, to: to.rect, t: easeOut(t) });
    }
    return out;
  }
}
