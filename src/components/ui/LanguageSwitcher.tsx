"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const locales = ["pt", "en"] as const;
const flags: Record<string, string> = { pt: "🇧🇷", en: "🇺🇸" };

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const currentLocale =
    locales.find((l) => pathname.startsWith(`/${l}`)) || "pt";
  const otherLocale = currentLocale === "pt" ? "en" : "pt";
  const switchedPath = pathname.replace(`/${currentLocale}`, `/${otherLocale}`);

  return (
    <Link
      href={switchedPath}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border border-border text-muted hover:text-primary hover:border-primary/50 transition-all"
      aria-label={`Switch to ${otherLocale === "pt" ? "Portuguese" : "English"}`}
    >
      <span>{flags[currentLocale]}</span>
      <span className="uppercase tracking-wider">{currentLocale}</span>
    </Link>
  );
}
