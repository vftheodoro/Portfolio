import type { Preset } from "./types.ts";

/**
 * Coreografias declarativas por cena. A chave é o valor de `data-sw-section`.
 * Cada cena usa um padrão diferente; só o necessário é declarado aqui, o
 * restante (quais elementos existem) vem das marcações `data-sw` do DOM.
 */
export const PRESETS: Record<string, Preset> = {
  hero: { pattern: "intro", cursors: 6, gap: 150 },
  about: { pattern: "columns", cursors: 4, gap: 260 },
  projects: { pattern: "mirror", cursors: 5, gap: 420 },
  experience: { pattern: "timeline", cursors: 4, gap: 380 },
  ai: { pattern: "cascade", cursors: 3, gap: 220 },
  stack: { pattern: "grid", cursors: 4, gap: 120 },
  recognition: { pattern: "columns", cursors: 3, gap: 220 },
  contact: { pattern: "cascade", cursors: 3, gap: 160 },
};

export const DEFAULT_PRESET: Preset = { pattern: "cascade", cursors: 3, gap: 200 };

export const presetFor = (section: string): Preset => PRESETS[section] ?? DEFAULT_PRESET;
