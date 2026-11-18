import type { Diagram, DiagramEdge, DiagramNode, Side, Tone } from "@/data/projects";
import { pick, type Lang } from "@/data/l10n";
import { sw } from "@/components/swarm/Sw";
import type { CaseUi } from "./ui";

interface Pt {
  x: number;
  y: number;
}

const toneClass: Record<Tone, { box: string; dash?: string }> = {
  default: { box: "stroke-border-strong" },
  ok: { box: "stroke-ok" },
  warn: { box: "stroke-warn" },
  planned: { box: "stroke-faint", dash: "5 4" },
};

const swatchClass: Record<Tone, string> = {
  default: "border-border-strong",
  ok: "border-ok",
  warn: "border-warn",
  planned: "border-dashed border-faint",
};

function port(n: { x: number; y: number }, w: number, h: number, side: Side, off = 0.5): Pt {
  switch (side) {
    case "t":
      return { x: n.x + w * off, y: n.y };
    case "b":
      return { x: n.x + w * off, y: n.y + h };
    case "l":
      return { x: n.x, y: n.y + h * off };
    case "r":
      return { x: n.x + w, y: n.y + h * off };
  }
}

const horizontal = (s: Side) => s === "l" || s === "r";

/** Rota ortogonal: Z entre lados do mesmo eixo, L entre eixos diferentes. */
function route(a: Pt, sa: Side, b: Pt, sb: Side): Pt[] {
  let pts: Pt[];
  if (horizontal(sa) && horizontal(sb)) {
    const mx = (a.x + b.x) / 2;
    pts = [a, { x: mx, y: a.y }, { x: mx, y: b.y }, b];
  } else if (!horizontal(sa) && !horizontal(sb)) {
    const my = (a.y + b.y) / 2;
    pts = [a, { x: a.x, y: my }, { x: b.x, y: my }, b];
  } else if (horizontal(sa)) {
    pts = [a, { x: b.x, y: a.y }, b];
  } else {
    pts = [a, { x: a.x, y: b.y }, b];
  }
  return pts.filter((p, i) => i === 0 || p.x !== pts[i - 1].x || p.y !== pts[i - 1].y);
}

function longest(pts: Pt[]): { mid: Pt; vertical: boolean; length: number } {
  let best = { mid: pts[0], vertical: false, length: 0 };
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const length = Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
    if (length > best.length) {
      best = { mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, vertical: a.x === b.x, length };
    }
  }
  return best;
}

const stateTag = (tone: Tone | undefined, ui: CaseUi) =>
  tone === "warn" ? ` (${ui.stateProto})` : tone === "planned" ? ` (${ui.stateUnverified})` : "";

interface Props {
  id: string;
  diagram: Diagram;
  lang: Lang;
  ui: CaseUi;
}

/**
 * Diagrama simples em SVG inline, calculado a partir de nós em grade + arestas com
 * lados (t/r/b/l). Acessível: role="img" com título e descrição, e uma lista textual
 * equivalente sempre visível logo abaixo.
 */
export default function CaseDiagram({ id, diagram, lang, ui }: Props) {
  const { cols, rows, w, h, gx, gy } = diagram;
  const width = cols * w + (cols - 1) * gx;
  const height = rows * h + (rows - 1) * gy;
  const pos = (n: DiagramNode) => ({ x: n.col * (w + gx), y: n.row * (h + gy) });
  const byId = new Map(diagram.nodes.map((n) => [n.id, n]));
  const label = (nodeId: string) => {
    const n = byId.get(nodeId);
    return n ? pick(n.label, lang) : nodeId;
  };

  const drawn = diagram.edges.map((e: DiagramEdge, i) => {
    const from = byId.get(e.from);
    const to = byId.get(e.to);
    if (!from || !to) return null;
    const pts = route(
      port(pos(from), w, h, e.fromSide, e.fromOff),
      e.fromSide,
      port(pos(to), w, h, e.toSide, e.toOff),
      e.toSide,
    );
    return { e, i, pts, d: pts.map((p, k) => `${k === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ") };
  });

  const connected = new Set(diagram.edges.flatMap((e) => [e.from, e.to]));
  const isolated = diagram.nodes.filter((n) => !connected.has(n.id));
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;
  const arrowId = `${id}-arrow`;

  return (
    <figure className="m-0" {...sw("block")}>
      <p className="mb-2 text-xs text-muted md:hidden">{ui.diagramScroll}</p>
      <div className="overflow-x-auto border border-border bg-surface" tabIndex={0} role="region" aria-labelledby={titleId}>
        <svg
          role="img"
          aria-labelledby={titleId}
          aria-describedby={descId}
          viewBox={`-6 -6 ${width + 12} ${height + 12}`}
          className="block h-auto w-full min-w-[760px]"
          fontFamily="var(--font-geist-sans), system-ui, sans-serif"
        >
          <title id={titleId}>{pick(diagram.title, lang)}</title>
          <desc id={descId}>{pick(diagram.description, lang)}</desc>
          <defs>
            <marker id={arrowId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
            </marker>
          </defs>

          {drawn.map((item) => {
            if (!item) return null;
            const { e, pts, d, i } = item;
            const text = e.label ? pick(e.label, lang) : "";
            const seg = longest(pts);
            const fits = text && (seg.vertical ? seg.length >= 24 : seg.length >= text.length * 6.4 + 24);
            return (
              <g key={i}>
                <path
                  d={d}
                  fill="none"
                  className="stroke-muted"
                  strokeWidth={1.5}
                  strokeDasharray={e.dashed ? "5 4" : undefined}
                  markerEnd={`url(#${arrowId})`}
                />
                {fits ? (
                  <text
                    x={seg.vertical ? seg.mid.x + (seg.mid.x > width / 2 ? -8 : 8) : seg.mid.x}
                    y={seg.vertical ? seg.mid.y + 4 : seg.mid.y - 7}
                    textAnchor={seg.vertical ? (seg.mid.x > width / 2 ? "end" : "start") : "middle"}
                    fontSize={11}
                    className="fill-muted stroke-surface font-mono"
                    strokeWidth={4}
                    paintOrder="stroke"
                  >
                    {text}
                  </text>
                ) : null}
              </g>
            );
          })}

          {diagram.nodes.map((n) => {
            const p = pos(n);
            const tone = n.tone ?? "default";
            return (
              <g key={n.id} transform={`translate(${p.x} ${p.y})`}>
                <rect
                  width={w}
                  height={h}
                  rx={4}
                  className={`fill-surface-light ${toneClass[tone].box}`}
                  strokeWidth={1.5}
                  strokeDasharray={toneClass[tone].dash}
                />
                <text x={12} y={n.sub ? 26 : 38} fontSize={13.5} fontWeight={600} className="fill-foreground">
                  {pick(n.label, lang)}
                </text>
                {n.sub ? (
                  <text x={12} y={47} fontSize={10.5} className="fill-muted font-mono">
                    {pick(n.sub, lang)}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted" aria-label={ui.legend}>
        {diagram.legend.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <span aria-hidden="true" className={`inline-block h-3 w-5 rounded-[2px] border-[1.5px] ${swatchClass[item.tone]}`} />
            {pick(item.label, lang)}
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <p className="label mb-2">{ui.diagramText}</p>
        <ol className="grid gap-1.5 text-sm leading-snug text-muted">
          {diagram.edges.map((e, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden="true" className="w-5 shrink-0 text-right font-mono text-[0.72rem] text-faint">
                {i + 1}
              </span>
              <span>
                <span className="text-foreground">
                  {label(e.from)}
                  {stateTag(byId.get(e.from)?.tone, ui)}
                </span>
                {" → "}
                <span className="text-foreground">
                  {label(e.to)}
                  {stateTag(byId.get(e.to)?.tone, ui)}
                </span>
                {": "}
                {pick(e.note ?? e.label ?? { pt: "", en: "" }, lang)}
                {e.dashed ? ` (${ui.stateUnverified})` : ""}
              </span>
            </li>
          ))}
          {isolated.map((n) => (
            <li key={n.id} className="flex gap-3">
              <span aria-hidden="true" className="w-5 shrink-0 text-right font-mono text-[0.72rem] text-faint">
                ·
              </span>
              <span>
                <span className="text-foreground">
                  {pick(n.label, lang)}
                  {stateTag(n.tone, ui)}
                </span>
                {` (${ui.isolated}): `}
                {n.note ? pick(n.note, lang) : ""}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
