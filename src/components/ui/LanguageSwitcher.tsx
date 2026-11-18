"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";

const OPTIONS: Record<Locale, { label: string; name: string; lang: string }> = {
  pt: { label: "PT", name: "Português (Brasil)", lang: "pt-BR" },
  en: { label: "EN", name: "English", lang: "en" },
};

const item = "flex min-h-10 min-w-10 items-center justify-center px-2 font-mono text-xs tracking-[0.1em] transition-colors";

/** Seletor PT/EN: dois links reais (sem JS para trocar), o idioma atual marcado com `aria-current`. */
export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("common");

  const hrefFor = (code: Locale) => pathname.replace(/^\/(pt|en)(?=\/|$)/, `/${code}`);

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={`inline-flex overflow-hidden rounded-[var(--radius-md)] border border-border-strong ${className}`}
    >
      {routing.locales.map((code) => {
        const o = OPTIONS[code];
        return code === locale ? (
          <span key={code} aria-current="true" className={`${item} bg-surface-light text-foreground`}>
            <span aria-hidden="true">{o.label}</span>
            <span className="sr-only">{o.name}</span>
          </span>
        ) : (
          <Link
            key={code}
            href={hrefFor(code)}
            hrefLang={o.lang}
            lang={o.lang}
            aria-label={o.name}
            className={`${item} text-muted hover:text-foreground`}
          >
            {o.label}
          </Link>
        );
      })}
    </div>
  );
}
