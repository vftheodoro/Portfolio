import { getTranslations } from "next-intl/server";
import { SwFrame, SwSection, SwType, sw } from "@/components/swarm/Sw";
import SectionTitle from "../ui/SectionTitle";

const EDUCATION = ["etec", "fatec"] as const;
const APPROACH = ["requirements", "decisions", "quality", "communication"] as const;

export default async function About() {
  const t = await getTranslations("about");

  return (
    <SwSection name="about" id="about" className="py-24 md:py-32" aria-labelledby="about-title">
      <div className="wrap">
        <SectionTitle
          typed
          group="about-head"
          index="01"
          label={t("label")}
          title={t("title")}
          accent={t("accent")}
          id="about-title"
        />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          <div className="space-y-5">
            <p {...sw("block", { group: "about-text" })} className="text-lg leading-[1.65] text-foreground">
              {t("p1")}
            </p>
            <p {...sw("block", { group: "about-text" })} className="leading-[1.65] text-muted">
              {t("p2")}
            </p>
            <p {...sw("block", { group: "about-text" })} className="leading-[1.65] text-muted">
              {t("p3")}
            </p>
            <SwFrame group="about-goal" className="mt-8 p-5">
              <p className="label text-primary">{t("goal_label")}</p>
              <p {...sw("block", { group: "about-goal" })} className="mt-2 leading-[1.65]">
                {t("goal")}
              </p>
            </SwFrame>
          </div>

          <div>
            <p className="label mb-4">{t("education_label")}</p>
            <ol className="grid grid-cols-1 gap-4">
              {EDUCATION.map((key) => (
                <li key={key}>
                  <SwFrame group={`about-${key}`} className="p-5">
                    <p className="label">{t(`education.${key}.status`)}</p>
                    <SwType
                      as="h3"
                      group={`about-${key}`}
                      text={t(`education.${key}.title`)}
                      className="mt-2 block text-lg font-semibold leading-snug tracking-[-0.01em]"
                    />
                    <p {...sw("block", { group: `about-${key}` })} className="mt-1 text-sm text-muted">
                      {t(`education.${key}.org`)}
                    </p>
                  </SwFrame>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <p className="label mb-4">{t("approach_label")}</p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {APPROACH.map((key, i) => (
              <li key={key}>
                <SwFrame group={`about-${key}`} className="h-full p-5">
                  <p className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</p>
                  <SwType
                    as="h3"
                    group={`about-${key}`}
                    text={t(`approach.${key}.title`)}
                    className="mt-3 block font-semibold leading-snug"
                  />
                  <p {...sw("block", { group: `about-${key}` })} className="mt-2 text-sm leading-[1.65] text-muted">
                    {t(`approach.${key}.text`)}
                  </p>
                </SwFrame>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SwSection>
  );
}
