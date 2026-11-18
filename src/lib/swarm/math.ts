import type { SwarmKind } from "./types.ts";

export const clamp = (v: number, min = 0, max = 1): number =>
  v < min ? min : v > max ? max : v;

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/** Ease-out cúbico: arranque rápido, parada suave (movimento de cursor). */
export const easeOut = (t: number): number => 1 - Math.pow(1 - clamp(t), 3);

/** Ease-in-out suave (arrasto de moldura). */
export const easeInOut = (t: number): number => {
  const x = clamp(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

/** Ease-out quártico: usado nos tipos de revelação. */
export const easeOutQuart = (t: number): number => 1 - Math.pow(1 - clamp(t), 4);

/**
 * Curva de progresso por tipo. O valor devolvido é o que vai para `--b` no CSS
 * E o que o cursor usa para se posicionar, então os dois ficam sempre alinhados.
 */
export function shape(kind: SwarmKind, p: number): number {
  switch (kind) {
    case "frame":
      return easeInOut(p);
    case "type":
      return clamp(p);
    default:
      return easeOut(p);
  }
}
