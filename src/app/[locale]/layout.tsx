import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { fontVariables } from "../fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SwarmBootScript from "@/components/swarm/SwarmBootScript";
import JsonLd from "@/components/seo/JsonLd";
import SwarmExperience from "@/components/swarm/SwarmExperience";

const SITE_URL = "https://vftheodoro.vercel.app";
const OG_LOCALE = { pt: "pt_BR", en: "en_US" } as const;

export const viewport: Viewport = {
  themeColor: "#07090d",
  colorScheme: "dark",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const description = t("description");
  const other = locale === "pt" ? "en" : "pt";

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: t("keywords").split(",").map((k) => k.trim()),
    authors: [{ name: "Victor Theodoro", url: SITE_URL }],
    creator: "Victor Theodoro",
    alternates: {
      canonical: `/${locale}`,
      languages: { "pt-BR": "/pt", en: "/en", "x-default": "/pt" },
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: "Victor Theodoro",
      title,
      description,
      locale: OG_LOCALE[locale],
      alternateLocale: [OG_LOCALE[other]],
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: t("og_alt") }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const [messages, t] = await Promise.all([getMessages(), getTranslations({ locale, namespace: "common" })]);

  return (
    <html lang={locale === "pt" ? "pt-BR" : "en"} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <SwarmBootScript />
      </head>
      <body className={`${fontVariables} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-md)] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-ink"
          >
            {t("skip_to_content")}
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <JsonLd locale={locale === "en" ? "en" : "pt"} />
          <SwarmExperience />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
