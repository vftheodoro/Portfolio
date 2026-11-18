import { useLocale } from "next-intl";
import { evidenceLegend, stackCategories, type Evidence } from "@/data/skills";
import { pick, toLang, type Lang } from "@/data/l10n";
import { SwFrame, SwSection, sw } from "@/components/swarm/Sw";
import SectionHead from "@/components/projects/SectionHead";

const copy: Record<Lang, { label: string; title: string; accent: string; lead: string; legend: string; sr: Record<Evidence, string> }> = {
  pt: {
    label: "STACK",
    title: "Stack por",
    accent: "categoria",
    lead: "Só tecnologias com evidência em repositório público, no currículo ou em prática de trabalho declarada. O marcador de cada item diz qual é o nível dessa evidência.",
    legend: "Legenda do nível de evidência",
    sr: { own: "projeto público", team: "projeto de equipe", reported: "relatado" },
  },
  en: {
    label: "STACK",
    title: "Stack by",
    accent: "category",
    lead: "Only technologies with evidence in a public repository, in the résumé or in declared working practice. Each item's marker shows the level of that evidence.",
    legend: "Evidence level legend",
    sr: { own: "public project", team: "team project", reported: "reported" },
  },
};

/** Marcador por forma (cheio, metade, vazado), nunca só por cor. */
function Marker({ level }: { level: Evidence }) {
  const shape =
    level === "own"
      ? "border-primary bg-primary"
      : level === "team"
        ? "border-primary bg-linear-to-r from-primary from-50% to-transparent to-50%"
        : "border-muted bg-transparent";
  return <span aria-hidden="true" className={`inline-block size-2 shrink-0 rounded-full border ${shape}`} />;
}

/** 05 / STACK: chips por categoria, com nível de evidência discreto. */
export default function Stack() {
  const lang = toLang(useLocale());
  const c = copy[lang];
  const levels: Evidence[] = ["own", "team", "reported"];

  return (
    <SwSection name="stack" id="stack" aria-labelledby="stack-title" className="py-24 md:py-32">
      <div className="wrap">
        <SectionHead id="stack-title" index="05" label={c.label} title={c.title} accent={c.accent} lead={c.lead} />

        <ul aria-label={c.legend} className="mb-8 grid gap-2 text-xs leading-snug text-muted md:flex md:flex-wrap md:gap-x-6">
          {levels.map((lv) => (
            <li key={lv} className="flex items-center gap-2">
              <Marker level={lv} />
              {pick(evidenceLegend[lv], lang)}
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 gap-4">
          {stackCategories.map((cat) => (
            <SwFrame key={cat.id} group={`stack-${cat.id}`} className="p-5 sm:p-6">
              <div className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8">
                <h3 className="text-base font-semibold leading-snug text-foreground">{pick(cat.title, lang)}</h3>
                <ul className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <li
                      key={item.name.pt}
                      {...sw("chip")}
                      className="inline-flex items-center gap-2 rounded-[3px] border border-border-strong px-2.5 py-1.5 font-mono text-[0.75rem] leading-none text-foreground"
                    >
                      <Marker level={item.evidence} />
                      {pick(item.name, lang)}
                      <span className="sr-only"> ({c.sr[item.evidence]})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SwFrame>
          ))}
        </div>
      </div>
    </SwSection>
  );
}
