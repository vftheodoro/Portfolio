import { getTranslations } from "next-intl/server";
import { SwFrame, SwSection, SwType, sw } from "@/components/swarm/Sw";
import SectionTitle from "../ui/SectionTitle";
import { btnSecondary } from "../ui/buttons";

/** `href` interno (âncora) ou externo (abre em nova aba); `skills` indica que há lista de competências. */
const ENTRIES = [
  { key: "bythe", href: "https://bythe.tech", external: true, skills: true },
  { key: "wacs", href: "#projects", external: false, skills: true },
  { key: "teaching", href: null, external: false, skills: false },
] as const;

export default async function Experience() {
  const [t, tCommon] = await Promise.all([getTranslations("experience"), getTranslations("common")]);

  return (
    <SwSection
      name="experience"
      id="experience"
      className="border-t border-border py-24 md:py-32"
      aria-labelledby="experience-title"
    >
      <div className="wrap">
        <SectionTitle
          typed
          group="exp-head"
          index="03"
          label={t("label")}
          title={t("title")}
          accent={t("accent")}
          subtitle={t("subtitle")}
          id="experience-title"
        />

        <div className="relative">
          <span
            aria-hidden="true"
            {...sw("line", { axis: "y", group: "exp-axis" })}
            className="absolute bottom-2 left-[5px] top-2 w-px bg-border-strong"
          />
          <ol className="grid grid-cols-1 gap-8 pl-9 md:gap-10 md:pl-12">
            {ENTRIES.map(({ key, href, external, skills: hasSkills }) => {
              const group = `exp-${key}`;
              const skills = hasSkills ? (t.raw(`${key}.skills`) as string[]) : null;
              return (
                <li key={key} className="relative">
                  <span
                    aria-hidden="true"
                    {...sw("chip", { group })}
                    className="absolute -left-9 top-6 size-[11px] rounded-full border-2 border-primary bg-background md:-left-12"
                  />
                  <SwFrame group={group} className="p-5 sm:p-7">
                    <p className="label text-primary">
                      {t(`${key}.period`)}
                      <span className="text-muted"> / {t(`${key}.role`)}</span>
                    </p>
                    <SwType
                      as="h3"
                      group={group}
                      text={t(`${key}.title`)}
                      className="mt-3 block text-xl font-semibold leading-snug tracking-[-0.01em] sm:text-2xl"
                    />
                    <p {...sw("block", { group })} className="mt-3 max-w-3xl leading-[1.65] text-muted">
                      {t(`${key}.description`)}
                    </p>
                    {skills && (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <li
                            key={skill}
                            {...sw("chip", { group })}
                            className="rounded-[var(--radius-sm)] border border-border-strong px-2.5 py-1 font-mono text-xs text-foreground"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    )}
                    {href && (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        {...sw("link", { group })}
                        className={`${btnSecondary} mt-6`}
                      >
                        {t(`${key}.cta`)}
                        {external && <span className="sr-only">({tCommon("new_tab")})</span>}
                      </a>
                    )}
                  </SwFrame>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </SwSection>
  );
}
