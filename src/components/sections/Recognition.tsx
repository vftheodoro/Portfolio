import { useLocale } from "next-intl";
import { pressRefs, recognitions } from "@/data/achievements";
import { pick, toLang, type Lang } from "@/data/l10n";
import { SwFrame, SwSection, sw } from "@/components/swarm/Sw";
import ExtLink from "@/components/projects/ExtLink";
import SectionHead from "@/components/projects/SectionHead";

const copy: Record<Lang, { label: string; title: string; accent: string; lead: string; press: string; pressLead: string; omitted: string; newTab: string }> = {
  pt: {
    label: "RECONHECIMENTOS",
    title: "Reconhecimentos",
    accent: "verificáveis",
    lead: "Cada item tem fonte pública, linkada. São reconhecimentos de equipes, não conquistas individuais.",
    press: "Na imprensa",
    pressLead: "Matérias e páginas oficiais sobre o projeto WACS. Os links levam às fontes originais; nenhum recorte de imprensa é reproduzido aqui.",
    omitted: "Resultados sem fonte pública, como premiações internas da escola, não são listados.",
    newTab: "abre em nova aba",
  },
  en: {
    label: "RECOGNITION",
    title: "Verifiable",
    accent: "recognition",
    lead: "Every item has a public source, linked. These are recognitions of teams, not individual achievements.",
    press: "In the press",
    pressLead: "Articles and official pages about the WACS project. Links go to the original sources; no press clipping is reproduced here.",
    omitted: "Results with no public source, such as the school's internal awards, are not listed.",
    newTab: "opens in a new tab",
  },
};

/** 06 / RECONHECIMENTOS: só o que tem fonte pública; legendas honestas, sem imagens de terceiros. */
export default function Recognition() {
  const lang = toLang(useLocale());
  const c = copy[lang];

  return (
    <SwSection name="recognition" id="recognition" aria-labelledby="recognition-title" className="py-24 md:py-32">
      <div className="wrap">
        <SectionHead
          id="recognition-title"
          index="06"
          label={c.label}
          title={c.title}
          accent={c.accent}
          lead={c.lead}
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <SwFrame group="recognition-awards" className="p-5 sm:p-8">
            <ul>
              {recognitions.map((r) => (
                <li key={r.id} className="grid gap-x-6 gap-y-3 border-t border-border py-6 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[4rem_minmax(0,1fr)]">
                  <p className="font-mono text-sm text-primary" {...sw("block")}>
                    {r.year}
                  </p>
                  <div>
                    <h3 className="text-xl font-semibold leading-snug tracking-[-0.01em]" {...sw("block")}>
                      {pick(r.title, lang)}
                    </h3>
                    <p className="label mt-1.5 text-[0.68rem] leading-[1.5]">{pick(r.subject, lang)}</p>
                    <p className="mt-3 text-sm leading-[1.65] text-muted" {...sw("block")}>
                      {pick(r.statement, lang)}
                    </p>
                    <ul className="mt-4 flex flex-col items-start gap-2">
                      {r.sources.map((s) => (
                        <li key={s.href}>
                          <ExtLink href={s.href} kind="reference" newTabLabel={c.newTab}>
                            {pick(s.label, lang)}
                          </ExtLink>
                          {s.note ? <span className="mt-1 block text-xs text-muted">{pick(s.note, lang)}</span> : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </SwFrame>

          <SwFrame group="recognition-press" className="p-5 sm:p-8">
            <h3 className="text-xl font-semibold tracking-[-0.01em]">{c.press}</h3>
            <p className="mt-2 text-sm leading-[1.6] text-muted" {...sw("block")}>
              {c.pressLead}
            </p>
            <hr className="my-5 h-px border-0 bg-border" {...sw("line")} />
            <ul>
              {pressRefs.map((p) => (
                <li key={p.id} className="grid grid-cols-1 gap-1.5 border-t border-border py-4 first:border-t-0 first:pt-0" {...sw("block")}>
                  <p className="label text-[0.68rem]">{p.outlet}</p>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm leading-[1.5] text-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                    {...sw("link")}
                  >
                    {pick(p.title, lang)}
                    <span className="sr-only"> ({c.newTab})</span>
                  </a>
                  {p.note ? <p className="text-xs text-muted">{pick(p.note, lang)}</p> : null}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-border pt-4 text-xs leading-[1.6] text-muted">{c.omitted}</p>
          </SwFrame>
        </div>
      </div>
    </SwSection>
  );
}
