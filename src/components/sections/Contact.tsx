import { getLocale, getTranslations } from "next-intl/server";
import { FaArrowRight, FaDownload, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { SwFrame, SwSection, sw } from "@/components/swarm/Sw";
import SectionTitle from "../ui/SectionTitle";
import { btnSecondary } from "../ui/buttons";

const CV = { pt: "/cv/Victor-Theodoro-CV-PT.pdf", en: "/cv/Victor-Theodoro-CV-EN.pdf" } as const;

const rowClass =
  "group flex min-h-14 items-center gap-4 border-b border-border px-5 py-3 transition-colors last:border-b-0 hover:bg-surface-light";

export default async function Contact() {
  const [t, tCommon, locale] = await Promise.all([getTranslations("contact"), getTranslations("common"), getLocale()]);
  const newTab = `(${tCommon("new_tab")})`;

  const channels = [
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/vftheodoro",
      href: "https://www.linkedin.com/in/vftheodoro/",
      external: true,
    },
    { icon: FaGithub, label: "GitHub", value: "github.com/vftheodoro", href: "https://github.com/vftheodoro", external: true },
    { icon: FaEnvelope, label: t("email_label"), value: "victorgft@outlook.com", href: "mailto:victorgft@outlook.com", external: false },
    { icon: FaDownload, label: t("cv_label"), value: t("cv_value"), href: locale === "en" ? CV.en : CV.pt, external: false, download: true },
  ];

  return (
    <SwSection
      name="contact"
      id="contact"
      className="border-t border-border py-24 md:py-32"
      aria-labelledby="contact-title"
    >
      <div className="wrap">
        <SectionTitle
          typed
          group="contact-head"
          index="07"
          label={t("label")}
          title={t("title")}
          accent={t("accent")}
          subtitle={t("lead")}
          id="contact-title"
        />

        <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
          <SwFrame group="contact-channels" className="overflow-hidden">
            <p className="label border-b border-border px-5 py-3">{t("channels_label")}</p>
            <ul>
              {channels.map(({ icon: Icon, label, value, href, external, download }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    {...(download ? { download: true } : {})}
                    {...sw("link", { group: "contact-channels" })}
                    className={rowClass}
                  >
                    <Icon size={16} aria-hidden="true" className="shrink-0 text-primary" />
                    <span className="min-w-0 flex-1">
                      <span className="label block">{label}</span>
                      <span className="block truncate text-foreground sm:text-lg">{value}</span>
                    </span>
                    {external && <span className="sr-only">{newTab}</span>}
                    <FaArrowRight
                      size={12}
                      aria-hidden="true"
                      className="shrink-0 text-faint transition-colors group-hover:text-primary"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </SwFrame>

          <SwFrame group="contact-bythe" className="self-start p-5 sm:p-7">
            <p className="label text-primary">{t("bythe_label")}</p>
            <p {...sw("block", { group: "contact-bythe" })} className="mt-3 leading-[1.65] text-muted">
              {t("bythe_text")}
            </p>
            <a
              href="https://bythe.tech"
              target="_blank"
              rel="noopener noreferrer"
              {...sw("link", { group: "contact-bythe" })}
              className={`${btnSecondary} mt-6`}
            >
              {t("bythe_cta")}
              <span className="sr-only">{newTab}</span>
            </a>
          </SwFrame>
        </div>
      </div>
    </SwSection>
  );
}
