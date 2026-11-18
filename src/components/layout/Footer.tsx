import { getTranslations } from "next-intl/server";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import SwarmToggle from "@/components/swarm/SwarmToggle";
import BytheFooterCredit from "./BytheFooterCredit";

const NAV_LINKS = ["about", "projects", "experience", "ai", "stack", "recognition", "contact"] as const;

const CONTACTS = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/vftheodoro", external: true },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/vftheodoro/", external: true },
  { icon: FaEnvelope, label: "victorgft@outlook.com", href: "mailto:victorgft@outlook.com", external: false },
] as const;

const linkClass = "inline-flex min-h-8 items-center text-sm text-muted transition-colors hover:text-foreground";

export default async function Footer() {
  const [t, tNav, tCommon] = await Promise.all([
    getTranslations("footer"),
    getTranslations("nav"),
    getTranslations("common"),
  ]);

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="wrap pt-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-lg font-semibold tracking-[-0.01em]">Victor Theodoro</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{t("tagline")}</p>
            <p className="label mt-4">{t("location")}</p>
          </div>

          <nav aria-label={t("nav_title")}>
            <p className="label mb-3">{t("nav_title")}</p>
            <ul>
              {NAV_LINKS.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className={linkClass}>
                    {tNav(id)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label mb-3">{t("contact_title")}</p>
            <ul>
              {CONTACTS.map(({ icon: Icon, label, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    className={`${linkClass} gap-2.5`}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <Icon size={14} aria-hidden="true" className="shrink-0 text-primary" />
                    {label}
                    {external && <span className="sr-only">({tCommon("new_tab")})</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <BytheFooterCredit />

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-6 sm:flex-row">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Victor Theodoro. {t("rights")}
          </p>
          <SwarmToggle className="min-h-8 rounded-[var(--radius-sm)] px-2 font-mono text-[0.7rem] text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline" />
        </div>
      </div>
    </footer>
  );
}
