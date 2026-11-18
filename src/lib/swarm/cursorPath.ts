import { easeOut, lerp } from "./math.ts";
import type { Geometry, Point, SwarmKind } from "./types.ts";

/**
 * Posição (documento) do cursor ao executar `kind` com progresso JÁ MODELADO `p`
 * (0..1, saída de `shape()`; é o mesmo valor aplicado em `--b`).
 * Cada tipo tem uma "mão" diferente: arrasta a moldura, segue o caret,
 * varre a imagem, pousa na etiqueta, etc.
 */
export function anchorAt(kind: SwarmKind, p: number, g: Geometry): Point {
  const { x, y, w, h } = g.rect;
  switch (kind) {
    case "frame":
      return { x: x + w * p, y: y + h * p };
    case "type": {
      const carets = g.carets;
      if (!carets || carets.length === 0) return { x: x + w * p, y: y + h };
      const f = p * (carets.length - 1);
      const i = Math.min(Math.floor(f), carets.length - 2);
      if (i < 0) return carets[0];
      return {
        x: lerp(carets[i].x, carets[i + 1].x, f - i),
        y: lerp(carets[i].y, carets[i + 1].y, f - i),
      };
    }
    case "media":
      return { x: x + w - 10, y: y + h * p };
    case "block":
      return { x: x - 10, y: y + h * p };
    case "line":
      return g.axis === "y" ? { x, y: y + h * p } : { x: x + w * p, y };
    case "chip":
    case "link":
    default:
      return { x: x + w / 2 + (1 - easeOut(p)) * 10, y: y + h / 2 + (1 - easeOut(p)) * 8 };
  }
}

export const startAnchor = (k: SwarmKind, g: Geometry): Point => anchorAt(k, 0, g);
export const endAnchor = (k: SwarmKind, g: Geometry): Point => anchorAt(k, 1, g);

/** Ponto de entrada fora da área do alvo (o cursor "chega" de algum lugar). */
export function entryPoint(slot: number, g: Geometry): Point {
  const side = slot % 2 === 0 ? -1 : 1;
  return {
    x: g.rect.x + g.rect.w / 2 + side * (260 + slot * 36),
    y: g.rect.y - 140 - (slot % 3) * 40,
  };
}
