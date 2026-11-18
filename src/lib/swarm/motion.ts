import { clamp } from "./math.ts";
import type { MotionMode } from "./types.ts";

export interface MotionEnv {
  prefersReducedMotion: boolean;
  /** Preferência salva pelo visitante. */
  saved: "on" | "off" | "reduced" | null;
  viewportWidth: number;
  hardwareConcurrency?: number;
  deviceMemory?: number;
  saveData?: boolean;
}

/** Decide o modo inicial de movimento. `prefers-reduced-motion` sempre vence. */
export function resolveMode(env: MotionEnv): MotionMode {
  if (env.prefersReducedMotion) return "off";
  if (env.saved === "off") return "off";
  if (env.saved === "reduced") return "reduced";
  if (env.saved === "on") return "full";
  if (env.saveData) return "reduced";
  if (env.viewportWidth < 768) return "reduced";
  if (env.hardwareConcurrency !== undefined && env.hardwareConcurrency <= 4) return "reduced";
  if (env.deviceMemory !== undefined && env.deviceMemory <= 4) return "reduced";
  return "full";
}

/**
 * Fator de velocidade do relógio em função da velocidade de rolagem (px/s).
 * Parado = 1x; rolando = acelera a construção para acompanhar; muito rápido
 * = teto, e o controlador conclui o que sobrar.
 */
export function speedForVelocity(pxPerSec: number): number {
  const v = Math.abs(pxPerSec);
  return 1 + clamp(v / 1400, 0, 1) * 3.5;
}

/** Velocidade (px/s) acima da qual cenas visíveis são concluídas na hora. */
export const FLUSH_VELOCITY = 5200;

/** Uma cena inteira acima da viewport nunca deve ser animada. */
export function isPassed(docBottom: number, scrollY: number, margin = 40): boolean {
  return docBottom < scrollY - margin;
}

/** Visibilidade para iniciar uma tarefa: topo do alvo dentro de 92% da altura e base abaixo do topo. */
export function isInView(docTop: number, docBottom: number, scrollY: number, vh: number): boolean {
  return docTop - scrollY < vh * 0.92 && docBottom - scrollY > 0;
}

/**
 * Média móvel exponencial do intervalo entre quadros: usada para detectar
 * dispositivos que não acompanham (rebaixa para "off").
 */
export class FrameBudget {
  private avg = 16.7;
  private n = 0;
  private readonly limitMs: number;
  private readonly minSamples: number;
  constructor(limitMs = 42, minSamples = 45) {
    this.limitMs = limitMs;
    this.minSamples = minSamples;
  }
  push(dt: number): void {
    // ignora saltos de aba em segundo plano
    if (dt > 250) return;
    this.avg = this.avg * 0.9 + dt * 0.1;
    this.n++;
  }
  get overBudget(): boolean {
    return this.n >= this.minSamples && this.avg > this.limitMs;
  }
}
