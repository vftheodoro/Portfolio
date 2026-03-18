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
    pt: "Victor Theodoro | Dev",
    en: "Victor Theodoro | Dev",
  };
  const descriptions = {
    pt: "Portfólio profissional de Victor Theodoro — Desenvolvedor FullStack especializado em soluções web, mobile e IoT. Serviços freelancer de desenvolvimento de sistemas.",
    en: "Professional portfolio of Victor Theodoro — FullStack Developer specialized in web, mobile, and IoT solutions. Freelance systems development services.",
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
