/**
 * Swarm — tipos compartilhados. Este módulo e os vizinhos em `src/lib/swarm`
 * são PUROS (sem DOM, sem React) para poderem ser testados com `node --test`.
 */

/** Tipo de construção aplicado a um elemento marcado com `data-sw`. */
export type SwarmKind =
  | "frame" // contêiner desenhado por arrasto (canto -> canto)
  | "type" // texto digitado caractere a caractere
  | "block" // bloco de texto revelado linha a linha
  | "media" // imagem revelada por varredura
  | "chip" // etiqueta técnica posicionada
  | "link" // botão/link posicionado + clique
  | "line"; // régua/borda traçada

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Point {
  x: number;
  y: number;
}

/** Geometria em coordenadas de DOCUMENTO (não de viewport). */
export interface Geometry {
  rect: Rect;
  /** Para `type`: posição do cursor de texto antes de cada caractere (+ fim). */
  carets?: Point[];
  /** Para `line`: eixo do traço. */
  axis?: "x" | "y";
}

/** Elemento descoberto no DOM (ou descrito em teste). */
export interface TargetDescriptor {
  id: string;
  kind: SwarmKind;
  /** Ordem no documento (0..n). */
  order: number;
  /** Grupo lógico (ex.: um card de projeto). Elementos do mesmo grupo são sequenciados juntos. */
  group: string;
  /** Preferência de cursor (slot) opcional. */
  cursorHint?: number;
  /** Quantidade de caracteres (type). */
  chars?: number;
}

export interface Task {
  id: string;
  targetId: string;
  kind: SwarmKind;
  /** Slot de cursor (0..cursors-1) dentro da cena. */
  slot: number;
  /** Início planejado (ms no relógio da cena). */
  start: number;
  /** Duração do trabalho (ms). */
  duration: number;
  /** Tempo de deslocamento do cursor até o ponto inicial (ms). */
  travel: number;
  /** Se definido, um "fantasma" é duplicado da geometria desse alvo até este. */
  dupFrom?: string;
}

export type ChoreographyPattern =
  | "intro" // abertura: moldura -> nav -> nome -> foto/detalhes
  | "cascade" // um a um, em ordem
  | "columns" // colunas em paralelo, deslocamento diagonal
  | "timeline" // régua desce e entradas surgem sob o cursor
  | "grid" // células em grade, duplicadas por cursores
  | "mirror"; // grupos alternam o sentido

export interface Preset {
  pattern: ChoreographyPattern;
  /** Máximo de cursores simultâneos na cena. */
  cursors: number;
  /** Intervalo base entre tarefas (ms). */
  gap: number;
  /** Velocidade base dos tipos (ms por kind). */
  durations?: Partial<Record<SwarmKind, number>>;
}

export type MotionMode = "full" | "reduced" | "off";

export interface CursorIdentity {
  name: string;
  color: string;
}

/** Quadro de um cursor, em coordenadas de documento. */
export interface CursorFrame {
  slot: number;
  visible: boolean;
  x: number;
  y: number;
  opacity: number;
  /** true no instante do clique (links/chips). */
  clicking: boolean;
  /** Alvo atual (para tag de dimensões). */
  targetId?: string;
  kind?: SwarmKind;
  progress?: number;
}

export interface GhostFrame {
  taskId: string;
  from: Rect;
  to: Rect;
  /** 0..1 */
  t: number;
}
