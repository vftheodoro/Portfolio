import type { Metadata } from "next";
import "./globals.css";

/**
 * Layout raiz mínimo. `<html lang>` e `<body>` vivem em `[locale]/layout.tsx`
 * (idioma correto por rota) e em `not-found.tsx`; esta camada só carrega o CSS
 * global e os ícones comuns a todas as rotas.
 */
export const metadata: Metadata = {
  icons: {
    icon: "/images/victor/vt-logo.png",
    shortcut: "/images/victor/vt-logo.png",
    apple: "/images/victor/vt-logo.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
