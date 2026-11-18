/**
 * CursorRenderer — desenha cursores e "fantasmas" de duplicação na camada
 * fixa `#sw-layer` (aria-hidden, pointer-events: none). Tudo imperativo: um
 * nó por cursor, atualizado só com `transform`/`opacity`.
 */
import type { CursorFrame, CursorIdentity, Geometry, GhostFrame } from "./types.ts";

export const IDENTITIES: CursorIdentity[] = [
  { name: "atlas", color: "#36BCF7" },
  { name: "nova", color: "#A78BFA" },
  { name: "kite", color: "#34D399" },
  { name: "quill", color: "#FBBF24" },
  { name: "pixel", color: "#FB7185" },
  { name: "sage", color: "#F472B6" },
];

const ARROW =
  '<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false"><path d="M2 2 L2 15.6 L5.7 12.3 L8.3 18.2 L10.6 17.2 L8 11.4 L13 11.4 Z" /></svg>';

interface CursorNode {
  el: HTMLDivElement;
  dim: HTMLSpanElement;
  identity: number;
  clicking: boolean;
  lastDim: string;
}

export class CursorRenderer {
  private readonly layer: HTMLElement | null;
  private fancy: boolean;
  private nodes = new Map<string, CursorNode>();
  /** cena -> (tarefa -> nó). Cada cena só mexe nos próprios fantasmas. */
  private ghosts = new Map<string, Map<string, HTMLDivElement>>();
  private used = new Set<number>();

  constructor(layer: HTMLElement | null, fancy: boolean) {
    this.layer = layer;
    this.fancy = fancy;
  }

  setFancy(v: boolean): void {
    this.fancy = v;
    if (!v) {
      this.ghosts.forEach((m) => m.forEach((g) => g.remove()));
      this.ghosts.clear();
    }
  }

  update(
    scene: string,
    frames: CursorFrame[],
    ghosts: GhostFrame[],
    scrollY: number,
    scrollX: number,
    geom: (id: string) => Geometry | null,
  ): void {
    if (!this.layer) return;
    const vh = window.innerHeight;
    for (const f of frames) {
      const key = `${scene}:${f.slot}`;
      let node = this.nodes.get(key);
      if (!f.visible) {
        // cursor fora de cena: remove o nó e devolve a identidade ao conjunto livre
        if (node) {
          node.el.remove();
          this.used.delete(node.identity);
          this.nodes.delete(key);
        }
        continue;
      }
      if (!node) node = this.create(key);
      const x = f.x - scrollX;
      const y = f.y - scrollY;
      const off = y < -60 || y > vh + 60;
      node.el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
      node.el.style.opacity = off ? "0" : f.opacity.toFixed(2);
      if (f.clicking !== node.clicking) {
        node.clicking = f.clicking;
        node.el.classList.toggle("is-click", f.clicking);
      }
      if (this.fancy) {
        let text = "";
        if ((f.kind === "frame" || f.kind === "media") && f.targetId && f.progress !== undefined && f.progress > 0) {
          const g = geom(f.targetId);
          if (g) {
            const w = Math.round(g.rect.w * (f.kind === "frame" ? f.progress : 1));
            const h = Math.round(g.rect.h * f.progress);
            text = `${w} × ${h}`;
          }
        }
        if (text !== node.lastDim) {
          node.dim.textContent = text;
          node.lastDim = text;
        }
      }
    }

    if (this.fancy) {
      let mine = this.ghosts.get(scene);
      if (!mine) {
        mine = new Map();
        this.ghosts.set(scene, mine);
      }
      const live = new Set<string>();
      for (const gh of ghosts) {
        live.add(gh.taskId);
        let el = mine.get(gh.taskId);
        if (!el) {
          el = document.createElement("div");
          el.className = "sw-ghost";
          this.layer.appendChild(el);
          mine.set(gh.taskId, el);
        }
        const x = gh.from.x + (gh.to.x - gh.from.x) * gh.t - scrollX;
        const y = gh.from.y + (gh.to.y - gh.from.y) * gh.t - scrollY;
        el.style.width = `${(gh.from.w + (gh.to.w - gh.from.w) * gh.t).toFixed(1)}px`;
        el.style.height = `${(gh.from.h + (gh.to.h - gh.from.h) * gh.t).toFixed(1)}px`;
        el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
        el.style.opacity = (0.85 * (1 - gh.t * gh.t)).toFixed(2);
      }
      for (const [id, el] of mine) {
        if (!live.has(id)) {
          el.remove();
          mine.delete(id);
        }
      }
    }
  }

  /** Remove os cursores de uma cena e devolve as identidades ao conjunto livre. */
  releaseScene(scene: string): void {
    this.ghosts.get(scene)?.forEach((g) => g.remove());
    this.ghosts.delete(scene);
    for (const [key, node] of this.nodes) {
      if (!key.startsWith(`${scene}:`)) continue;
      node.el.remove();
      this.used.delete(node.identity);
      this.nodes.delete(key);
    }
  }

  destroy(): void {
    this.nodes.forEach((n) => n.el.remove());
    this.ghosts.forEach((m) => m.forEach((g) => g.remove()));
    this.nodes.clear();
    this.ghosts.clear();
    this.used.clear();
  }

  private create(key: string): CursorNode {
    let identity = IDENTITIES.findIndex((_, i) => !this.used.has(i));
    if (identity < 0) identity = this.nodes.size % IDENTITIES.length;
    this.used.add(identity);
    const id = IDENTITIES[identity];
    const el = document.createElement("div");
    el.className = "sw-cursor";
    el.style.setProperty("--c", id.color);
    el.style.opacity = "0";
    el.innerHTML = `${ARROW}<span class="sw-flag"></span><span class="sw-dim"></span>`;
    (el.querySelector(".sw-flag") as HTMLElement).textContent = id.name;
    this.layer!.appendChild(el);
    const node: CursorNode = {
      el,
      dim: el.querySelector(".sw-dim") as HTMLSpanElement,
      identity,
      clicking: false,
      lastDim: "",
    };
    this.nodes.set(key, node);
    return node;
  }
}
