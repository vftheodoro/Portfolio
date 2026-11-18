import { clamp } from "./math.ts";
import type { Preset, SwarmKind, TargetDescriptor, Task } from "./types.ts";

export interface PlanOptions {
  /** Versão reduzida: até 3 cursores, mais curta, sem chips/linhas animados. */
  lite?: boolean;
}

const KIND_SLOT: Record<SwarmKind, number> = {
  frame: 0,
  line: 0,
  type: 1,
  block: 1,
  media: 2,
  chip: 3,
  link: 4,
};

const BASE_TRAVEL = 300;

export function durationFor(kind: SwarmKind, d: TargetDescriptor, preset: Preset): number {
  const o = preset.durations?.[kind];
  if (o !== undefined) return o;
  switch (kind) {
    case "frame":
      return 760;
    case "type":
      return clamp((d.chars ?? 24) * 26, 320, 1100);
    case "block":
      return 640;
    case "media":
      return 900;
    case "chip":
      return 210;
    case "link":
      return 320;
    case "line":
      return 580;
  }
}

/**
 * Transforma elementos descobertos em tarefas agendadas. Função pura e
 * determinística: mesma entrada -> mesma saída. Garante que dois trabalhos do
 * mesmo cursor nunca se sobreponham (inclui o tempo de deslocamento).
 */
export function planChoreography(
  descriptors: TargetDescriptor[],
  preset: Preset,
  opts: PlanOptions = {},
): Task[] {
  const lite = !!opts.lite;
  const cursors = Math.max(1, lite ? Math.min(3, preset.cursors) : preset.cursors);
  const scale = lite ? 0.6 : 1;
  const items = descriptors
    .filter((d) => !(lite && (d.kind === "chip" || d.kind === "line")))
    .slice()
    .sort((a, b) => a.order - b.order);

  // agrupa preservando a ordem de aparição
  const groupOrder: string[] = [];
  const groups = new Map<string, TargetDescriptor[]>();
  for (const d of items) {
    if (!groups.has(d.group)) {
      groups.set(d.group, []);
      groupOrder.push(d.group);
    }
    groups.get(d.group)!.push(d);
  }

  const freeAt = new Array<number>(cursors).fill(0);
  const tasks: Task[] = [];
  const lastOfKind = new Map<SwarmKind, string>();

  const slotFor = (d: TargetDescriptor, shift: number): number =>
    ((d.cursorHint ?? KIND_SLOT[d.kind]) + shift) % cursors;

  const place = (d: TargetDescriptor, desired: number, shift: number, dup: boolean): number => {
    const slot = slotFor(d, shift);
    const duration = Math.round(durationFor(d.kind, d, preset) * scale);
    const travel = Math.round(BASE_TRAVEL * scale);
    const start = Math.max(desired, freeAt[slot] + travel);
    freeAt[slot] = start + duration;
    const prev = lastOfKind.get(d.kind);
    tasks.push({
      id: `t:${d.id}`,
      targetId: d.id,
      kind: d.kind,
      slot,
      start,
      duration,
      travel,
      dupFrom: dup && !lite && prev ? prev : undefined,
    });
    lastOfKind.set(d.kind, d.id);
    return start + duration;
  };

  const order = (g: TargetDescriptor[], kinds: SwarmKind[]) =>
    kinds.flatMap((k) => g.filter((d) => d.kind === k));

  groupOrder.forEach((gid, gi) => {
    const g = groups.get(gid)!;
    const gap = preset.gap * scale;
    const dupFrames = preset.pattern === "mirror" || preset.pattern === "grid";
    const dupChips = preset.pattern === "grid" || preset.pattern === "mirror";

    switch (preset.pattern) {
      case "intro": {
        // abertura: moldura -> navegação -> nome -> foto -> detalhes -> links
        const t0 = 120 * scale;
        for (const d of order(g, ["frame"])) place(d, t0, 0, false);
        for (const d of order(g, ["chip"])) place(d, t0 + 260 * scale + gi * 40, 0, false);
        for (const d of order(g, ["type"])) place(d, t0 + 460 * scale, 0, false);
        for (const d of order(g, ["media"])) place(d, t0 + 760 * scale, 0, false);
        for (const d of order(g, ["line", "block"])) place(d, t0 + 1000 * scale, 0, false);
        for (const d of order(g, ["link"])) place(d, t0 + 1500 * scale, 0, false);
        break;
      }
      case "columns": {
        // grupos quase em paralelo, deslocados na diagonal
        const t0 = gi * gap * 0.55;
        for (const d of order(g, ["frame", "line"])) place(d, t0, gi, false);
        for (const d of order(g, ["type", "block", "media"])) place(d, t0 + 260 * scale, gi, false);
        for (const d of order(g, ["chip", "link"])) place(d, t0 + 640 * scale, gi, false);
        break;
      }
      case "timeline": {
        // a régua (line) desce; cada entrada é construída conforme ela passa
        const t0 = gi * gap;
        for (const d of order(g, ["line"])) place(d, t0, 0, false);
        const shift = 1 + (gi % Math.max(1, cursors - 1));
        for (const d of order(g, ["frame"])) place(d, t0 + 80 * scale, shift, false);
        for (const d of order(g, ["type", "block", "media"])) place(d, t0 + 280 * scale, shift, false);
        for (const d of order(g, ["chip", "link"])) place(d, t0 + 560 * scale, shift, false);
        break;
      }
      case "grid": {
        // células posicionadas em ordem; cada uma "copiada" da anterior
        const t0 = gi * gap * 0.6;
        for (const d of order(g, ["frame", "line"])) place(d, t0, 0, dupFrames);
        for (const d of order(g, ["type", "block"])) place(d, t0 + 160 * scale, 0, false);
        g.filter((d) => d.kind === "chip").forEach((d, i) =>
          place(d, t0 + 280 * scale + i * 55 * scale, gi + i, dupChips),
        );
        for (const d of order(g, ["media", "link"])) place(d, t0 + 360 * scale, 0, false);
        break;
      }
      case "mirror": {
        // cada grupo (ex.: projeto) é construído com coreografia espelhada
        const t0 = gi * gap;
        const odd = gi % 2 === 1;
        const shift = odd ? 1 : 0;
        for (const d of order(g, ["frame"])) place(d, t0, shift, dupFrames);
        const firstKinds: SwarmKind[] = odd ? ["media", "type", "block"] : ["type", "block", "media"];
        firstKinds.forEach((k, i) =>
          g.filter((d) => d.kind === k).forEach((d) => place(d, t0 + (300 + i * 120) * scale, shift, false)),
        );
        g.filter((d) => d.kind === "chip").forEach((d, i) =>
          place(d, t0 + (760 + i * 60) * scale, shift, dupChips && i > 0),
        );
        for (const d of order(g, ["line"])) place(d, t0 + 700 * scale, shift, false);
        for (const d of order(g, ["link"])) place(d, t0 + 1100 * scale, shift, false);
        break;
      }
      case "cascade":
      default: {
        const t0 = gi * gap;
        for (const d of order(g, ["frame", "line"])) place(d, t0, 0, false);
        for (const d of order(g, ["type", "block", "media"])) place(d, t0 + 320 * scale, 0, false);
        for (const d of order(g, ["chip", "link"])) place(d, t0 + 640 * scale, 0, false);
      }
    }
  });

  return tasks.sort((a, b) => a.start - b.start || a.slot - b.slot);
}

export function planDuration(tasks: Task[]): number {
  return tasks.reduce((m, t) => Math.max(m, t.start + t.duration), 0);
}
