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
  title: "Victor Theodoro | Dev",
  description:
    "Portfólio profissional de Victor Theodoro — Desenvolvedor FullStack especializado em soluções web, mobile e IoT. Serviços freelancer de desenvolvimento de sistemas.",
  keywords: [
    "desenvolvedor",
    "fullstack",
    "react native",
    "node.js",
    "python",
    "freelancer",
    "IoT",
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
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
