import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Victor Theodoro | Especialista em Tecnologia",
  description:
    "Site profissional de Victor Theodoro — suporte, infraestrutura, manutenção, ensino e soluções tecnológicas no Vale do Ribeira.",
  keywords: [
    "Victor Theodoro",
    "especialista em tecnologia",
    "suporte de TI",
    "infraestrutura de TI",
    "Vale do Ribeira",
    "instrutor de tecnologia",
    "BYTHE",
    "WACS",
  ],
  icons: {
    icon: "/images/victor/vt-logo.png",
    shortcut: "/images/victor/vt-logo.png",
    apple: "/images/victor/vt-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
