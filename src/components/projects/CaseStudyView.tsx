import type { ReactNode } from "react";
import type { CaseStudy } from "@/data/projects";
import { pick, pickAll, type Lang } from "@/data/l10n";
import { SwFrame, SwType, sw } from "@/components/swarm/Sw";
import CaseDiagram from "./CaseDiagram";
import CaseGallery from "./CaseGallery";
import ExtLink from "./ExtLink";
import StatusPanel from "./StatusPanel";
import type { CaseUi } from "./ui";

interface Props {
  study: CaseStudy;
  position: number;
  lang: Lang;
  ui: CaseUi;
}

function Block({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  return (
    <section aria-labelledby={id}>
      <h4 id={id} className="label mb-4 border-t border-border pt-3">
        {title}
      </h4>
      <div {...sw("block")}>{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 leading-[1.65] text-muted">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.78em] h-px w-3 shrink-0 bg-primary" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/** Um estudo de caso completo: ficha lateral, galeria, texto, diagrama, painel de estado. */
export default function CaseStudyView({ study, position, lang, ui }: Props) {
  const hid = (s: string) => `${study.id}-${s}`;
  const hasTeamTech = study.tech.some((t) => t.scope === "team");
  const num = String(position).padStart(2, "0");

  const galleryImages = study.images.map((img) => ({
    src: img.src,
    width: img.width,
    height: img.height,
    alt: pick(img.alt, lang),
    caption: pick(img.caption, lang),
  }));

  return (
    <article id={`projects-${study.id}`} aria-labelledby={hid("title")} className="mb-20 scroll-mt-24 md:mb-28">
      <SwFrame group={study.id} className="p-5 sm:p-8 lg:p-10">
        <header className="mb-10 max-w-3xl">
          <p className="label mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-primary">
              {ui.caseWord} {num}
            </span>
            <span aria-hidden="true" className="h-px w-6 bg-border-strong" />
            <span>{pick(study.kind, lang)}</span>
          </p>
          <SwType
            as="h3"
            id={hid("title")}
            text={study.shortName}
            className="text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-none tracking-[-0.02em]"
          />
          {study.fullName ? (
            <p className="mt-2 font-mono text-sm text-muted">{pick(study.fullName, lang)}</p>
          ) : null}
          <p className="mt-6 text-lg leading-[1.6] text-foreground" {...sw("block")}>
            {pick(study.lead, lang)}
          </p>
        </header>
        <hr className="mb-10 h-px border-0 bg-border" {...sw("line")} />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
          {/* ficha lateral: vem primeiro no DOM (links e papel antes do texto longo no mobile) */}
          <aside
            aria-label={ui.factSheet}
            className="grid content-start gap-7 border-t border-border pt-5 lg:col-start-2 lg:row-start-1 lg:sticky lg:top-24 lg:self-start lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0"
          >
            <dl className="grid gap-5">
              <div>
                <dt className="label">{ui.role}</dt>
                <dd className="mt-1.5 text-sm leading-[1.6] text-foreground">{pick(study.role, lang)}</dd>
              </div>
              <div>
                <dt className="label">{ui.period}</dt>
                <dd className="mt-1.5 text-sm leading-[1.6] text-foreground">{pick(study.period, lang)}</dd>
              </div>
              <div>
                <dt className="label">{ui.authorship}</dt>
                <dd className="mt-1.5 text-sm leading-[1.6] text-muted">{pick(study.authorship, lang)}</dd>
              </div>
              {study.recognition ? (
                <div>
                  <dt className="label">{ui.recognition}</dt>
                  <dd className="mt-1.5 text-sm leading-[1.6] text-foreground">{pick(study.recognition, lang)}</dd>
                </div>
              ) : null}
            </dl>

            <div>
              <h4 className="label mb-3">{ui.links}</h4>
              <ul className="flex flex-col items-start gap-2">
                {study.links.map((l) => (
                  <li key={l.href}>
                    <ExtLink href={l.href} kind={l.kind} newTabLabel={ui.newTab}>
                      {pick(l.label, lang)}
                    </ExtLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="label mb-3">{ui.stack}</h4>
              <ul className="flex flex-wrap gap-1.5">
                {study.tech.map((t) => (
                  <li
                    key={t.name}
                    {...sw("chip")}
                    className={`rounded-[3px] border px-2 py-1 font-mono text-[0.72rem] leading-none ${
                      t.scope === "team" ? "border-dashed border-border-strong text-muted" : "border-border-strong text-foreground"
                    }`}
                  >
                    {t.name}
                  </li>
                ))}
              </ul>
              {hasTeamTech ? <p className="mt-3 text-xs leading-[1.55] text-muted">{ui.stackTeam}</p> : null}
            </div>
          </aside>

          <div className="grid min-w-0 grid-cols-1 content-start gap-12 lg:col-start-1 lg:row-start-1">
            <CaseGallery
              images={galleryImages}
              stageRatio={study.stageRatio}
              labels={{
                dialog: ui.lightbox,
                close: ui.close,
                prev: ui.prev,
                next: ui.next,
                of: ui.of,
                gallery: ui.gallery,
                enlarge: ui.enlarge,
                thumbs: ui.thumbs,
              }}
            />

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <Block title={ui.problem} id={hid("problem")}>
                <p className="leading-[1.65] text-muted">{pick(study.problem, lang)}</p>
              </Block>
              <Block title={ui.context} id={hid("context")}>
                <p className="leading-[1.65] text-muted">{pick(study.context, lang)}</p>
              </Block>
            </div>

            <Block title={ui.built} id={hid("built")}>
              <Bullets items={pickAll(study.built, lang)} />
            </Block>

            <section aria-labelledby={hid("diagram")}>
              <h4 id={hid("diagram")} className="label mb-4 border-t border-border pt-3">
                {ui.diagram}
              </h4>
              <CaseDiagram id={hid("diagram-svg")} diagram={study.diagram} lang={lang} ui={ui} />
            </section>

            <section aria-labelledby={hid("status")}>
              <h4 id={hid("status")} className="label mb-4 border-t border-border pt-3">
                {ui.status}
              </h4>
              <StatusPanel data={study.status} lang={lang} ui={ui} />
            </section>

            <Block title={ui.decisions} id={hid("decisions")}>
              <dl className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {study.decisions.map((d) => (
                  <div key={pick(d.title, "pt")}>
                    <dt className="font-semibold leading-snug text-foreground">{pick(d.title, lang)}</dt>
                    <dd className="mt-1.5 text-sm leading-[1.65] text-muted">{pick(d.body, lang)}</dd>
                  </div>
                ))}
              </dl>
            </Block>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <Block title={ui.difficulties} id={hid("difficulties")}>
                <Bullets items={pickAll(study.difficulties, lang)} />
              </Block>
              <Block title={ui.verification} id={hid("verification")}>
                <Bullets items={pickAll(study.verification, lang)} />
              </Block>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <Block title={ui.result} id={hid("result")}>
                <p className="leading-[1.65] text-muted">{pick(study.result, lang)}</p>
              </Block>
              <Block title={ui.limits} id={hid("limits")}>
                <Bullets items={pickAll(study.limits, lang)} />
              </Block>
            </div>
          </div>
        </div>
      </SwFrame>
    </article>
  );
}
