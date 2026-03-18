"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const locales = ["pt", "en"] as const;
const flagIcons: Record<string, string> = { 
  pt: "/images/flags/br.png", 
  en: "/images/flags/us.png" 
};

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const currentLocale =
    locales.find((l) => pathname.startsWith(`/${l}`)) || "pt";
  const otherLocale = currentLocale === "pt" ? "en" : "pt";
  const switchedPath = pathname.replace(`/${currentLocale}`, `/${otherLocale}`);

  return (
    <Link
      href={switchedPath}
      className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-border bg-surface/50 text-xs font-medium hover:border-primary/50 hover:text-primary transition-all group"
      aria-label={`Switch to ${otherLocale === "pt" ? "Portuguese" : "English"}`}
    >
      <div className="relative w-5 h-5 overflow-hidden rounded-full border border-white/10 group-hover:border-primary/30 transition-colors">
        <Image
          src={flagIcons[otherLocale]}
          alt={otherLocale}
          fill
          className="object-cover"
        />
      </div>
      <span className="uppercase tracking-widest text-muted group-hover:text-primary transition-colors">
        {otherLocale}
      </span>
    </Link>
  );
}
