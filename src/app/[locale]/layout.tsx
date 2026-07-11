import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const titles = {
    pt: "Victor Theodoro | Especialista em Tecnologia",
    en: "Victor Theodoro | Technology Specialist",
  };
  const descriptions = {
    pt: "Site profissional de Victor Theodoro — suporte, infraestrutura, manutenção, ensino e soluções tecnológicas no Vale do Ribeira.",
    en: "Victor Theodoro's professional website — support, infrastructure, maintenance, education, and technology solutions in Vale do Ribeira, Brazil.",
  };
  return {
    title: titles[locale as "pt" | "en"] || titles.pt,
    description: descriptions[locale as "pt" | "en"] || descriptions.pt,
    icons: {
      icon: "/images/victor/vt-logo.png",
      shortcut: "/images/victor/vt-logo.png",
      apple: "/images/victor/vt-logo.png",
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
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
