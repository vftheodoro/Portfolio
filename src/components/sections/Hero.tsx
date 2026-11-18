import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { FaArrowRight, FaDownload, FaGithub } from "react-icons/fa";
import { SwFrame, SwSection, SwType, sw } from "@/components/swarm/Sw";
import { btnPrimary, btnSecondary } from "../ui/buttons";

/** Tecnologias com evidÃªncia em repositÃ³rios (docs/CONTENT_AUDIT.md, seÃ§Ã£o 3.7). */
const STACK = ["TypeScript", "Node.js", "React", "Next.js", "Supabase", "PostgreSQL"] as const;

const CV = { pt: "/cv/Victor-Theodoro-CV-PT.pdf", en: "/cv/Victor-Theodoro-CV-EN.pdf" } as const;

export default async function Hero() {
  const [t, tCommon, locale] = await Promise.all([getTranslations("hero"), getTranslations("common"), getLocale()]);
  const cv = locale === "en" ? CV.en : CV.pt;

  return (
    <SwSection name="hero" id="top" className="pb-16 pt-24 md:pb-24 md:pt-28" aria-labelledby="hero-title">
      <div className="wrap">
        <SwFrame group="hero" className="p-5 sm:p-8 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-14">
            <div>
              <p className="label mb-6 flex items-center gap-3">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-ok" />
                {t("status")}
              </p>

              <h1
                id="hero-title"
                className="text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
              >
                <SwType as="span" text={t("name")} className="block" />{" "}
                <SwType
                  as="span"
                  text={t("role")}
                  className="mt-2 block text-[clamp(1.25rem,3vw,2rem)] font-medium leading-[1.15] tracking-[-0.02em] text-primary"
                />
              </h1>

              <p {...sw("block")} className="mt-5 font-mono text-[0.78rem] leading-relaxed text-muted">
                {t("headline")}
              </p>
              <p {...sw("block")} className="mt-5 max-w-xl text-lg leading-[1.65] text-muted">
                {t("lead")}
              </p>

              <ul aria-label={t("stack_label")} className="mt-7 flex flex-wrap gap-2">
                {STACK.map((tech) => (
                  <li
                    key={tech}
                    {...sw("chip")}
                    className="rounded-[var(--radius-sm)] border border-border-strong px-2.5 py-1 font-mono text-xs text-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects" {...sw("link")} className={btnPrimary}>
                  {t("cta_projects")}
                  <FaArrowRight size={12} aria-hidden="true" />
                </a>
                <a
                  href="https://github.com/vftheodoro"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...sw("link")}
                  className={btnSecondary}
                >
                  <FaGithub size={15} aria-hidden="true" />
                  GitHub
                  <span className="sr-only">({tCommon("new_tab")})</span>
                </a>
                <a href={cv} download {...sw("link")} className={btnSecondary}>
                  <FaDownload size={13} aria-hidden="true" />
                  {t("cta_cv")}
                </a>
                <a href="#contact" {...sw("link")} className={btnSecondary}>
                  {t("cta_contact")}
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[420px] lg:max-w-none">
              <div
                {...sw("media")}
                className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface"
              >
                <Image
                  src="/images/victor/portrait-2026.webp"
                  alt={t("photo_alt")}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 440px"
                  className="object-cover object-[50%_20%]"
                />
              </div>

              <dl {...sw("block")} className="mt-6 grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
                <div>
                  <dt className="label">{t("education_label")}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed">
                    {t("education_etec")}
                    <br />
                    <span className="text-muted">{t("education_fatec")}</span>
                  </dd>
                </div>
                <div>
                  <dt className="label">{t("location_label")}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed">{t("location_value")}</dd>
                </div>
              </dl>
            </div>
          </div>
        </SwFrame>
      </div>
    </SwSection>
  );
}
