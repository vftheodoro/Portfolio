import { useLocale } from "next-intl";
import { caseStudies, otherProjects } from "@/data/projects";
import { pick, toLang } from "@/data/l10n";
import { SwFrame, SwSection, sw } from "@/components/swarm/Sw";
import CaseStudyView from "@/components/projects/CaseStudyView";
import ExtLink from "@/components/projects/ExtLink";
import SectionHead from "@/components/projects/SectionHead";
import { caseUi } from "@/components/projects/ui";

/** 02 / PROJETOS: estudos de caso empilhados (âncoras acessíveis) e lista densa de outros projetos. */
export default function Projects() {
  const lang = toLang(useLocale());
  const ui = caseUi[lang];

  return (
    <SwSection name="projects" id="projects" aria-labelledby="projects-title" className="py-24 md:py-32">
      <div className="wrap">
        <SectionHead
          id="projects-title"
          index="02"
          label={ui.projectsLabel}
          title={ui.projectsTitle}
          accent={ui.projectsAccent}
          lead={ui.projectsLead}
        />

        <nav aria-label={ui.sectionNav} className="-mt-4 mb-12 md:mb-16">
          <ol className="flex flex-wrap gap-2">
            {caseStudies.map((c, i) => (
              <li key={c.id}>
                <a
                  href={`#projects-${c.id}`}
                  className="inline-flex min-h-10 items-center gap-2 rounded-[3px] border border-border-strong px-3 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <span className="font-mono text-[0.72rem] text-primary">{String(i + 1).padStart(2, "0")}</span>
                  {c.shortName}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#projects-other"
                className="inline-flex min-h-10 items-center gap-2 rounded-[3px] border border-border px-3 py-2 text-sm text-muted transition-colors hover:border-primary hover:text-primary"
              >
                {ui.others}
              </a>
            </li>
          </ol>
        </nav>

        {caseStudies.map((study, i) => (
          <CaseStudyView key={study.id} study={study} position={i + 1} lang={lang} ui={ui} />
        ))}

        <section id="projects-other" aria-labelledby="projects-other-title" className="scroll-mt-24">
          <SwFrame group="other-projects" className="p-5 sm:p-8">
            <h3 id="projects-other-title" className="text-2xl font-semibold tracking-[-0.01em]">
              {ui.others}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-[1.6] text-muted" {...sw("block")}>
              {ui.othersLead}
            </p>
            <hr className="my-6 h-px border-0 bg-border" {...sw("line")} />
            <ul className="divide-y divide-border">
              {otherProjects.map((p) => (
                <li
                  key={p.id}
                  className="grid gap-3 py-5 first:pt-0 last:pb-0 md:grid-cols-[200px_minmax(0,1fr)_auto] md:items-start md:gap-8"
                  {...sw("block")}
                >
                  <div>
                    <h4 className="font-semibold text-foreground">{p.name}</h4>
                    <p className="label mt-1 text-[0.66rem] leading-[1.5]">{pick(p.tag, lang)}</p>
                  </div>
                  <div>
                    <p className="text-sm leading-[1.65] text-muted">{pick(p.description, lang)}</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <li
                          key={t}
                          className="rounded-[3px] border border-border-strong px-2 py-1 font-mono text-[0.72rem] leading-none text-foreground"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ul className="flex flex-wrap gap-2 md:max-w-[200px] md:justify-end">
                    {p.links.map((l) => (
                      <li key={l.href}>
                        <ExtLink href={l.href} kind={l.kind} newTabLabel={ui.newTab}>
                          {pick(l.label, lang)}
                        </ExtLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </SwFrame>
        </section>
      </div>
    </SwSection>
  );
}
