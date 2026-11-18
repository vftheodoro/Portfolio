import type { StatusPanel as StatusData } from "@/data/projects";
import { pickAll, type Lang } from "@/data/l10n";
import { sw } from "@/components/swarm/Sw";
import type { CaseUi } from "./ui";

interface Props {
  data: StatusData;
  lang: Lang;
  ui: CaseUi;
}

/**
 * Painel explícito Implementado / Protótipo / Planejado-não verificado. Cada coluna
 * tem glifo e título próprios (o estado nunca depende só da cor).
 */
export default function StatusPanel({ data, lang, ui }: Props) {
  const columns = [
    {
      key: "implemented",
      title: ui.implemented,
      hint: ui.implementedHint,
      items: pickAll(data.implemented, lang),
      glyph: <span aria-hidden="true" className="inline-block size-2.5 rounded-full border border-ok bg-ok" />,
      accent: "border-t-ok",
    },
    {
      key: "prototype",
      title: ui.prototype,
      hint: ui.prototypeHint,
      items: pickAll(data.prototype, lang),
      glyph: (
        <span
          aria-hidden="true"
          className="inline-block size-2.5 rounded-full border border-warn bg-linear-to-r from-warn from-50% to-transparent to-50%"
        />
      ),
      accent: "border-t-warn",
    },
    {
      key: "planned",
      title: ui.planned,
      hint: ui.plannedHint,
      items: pickAll(data.planned, lang),
      glyph: <span aria-hidden="true" className="inline-block size-2.5 rounded-full border border-dashed border-muted" />,
      accent: "border-t-faint",
    },
  ];

  return (
    <div className="grid gap-px border border-border bg-border md:grid-cols-3" {...sw("block")}>
      {columns.map((c) => (
        <section key={c.key} className={`border-t-2 bg-surface p-4 sm:p-5 ${c.accent}`} aria-label={c.title}>
          <h5 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            {c.glyph}
            {c.title}
          </h5>
          <p className="label mt-1 text-[0.66rem]">{c.hint}</p>
          {c.items.length > 0 ? (
            <ul className="mt-4 grid gap-3 text-sm leading-[1.55] text-muted">
              {c.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="mt-[0.6em] h-px w-2.5 shrink-0 bg-border-strong" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}
