import type { Metadata } from "next";
import Link from "next/link";
import { fontVariables } from "./fonts";

export const metadata: Metadata = {
  title: "Página não encontrada | Victor Theodoro",
  robots: { index: false },
};

/**
 * 404 global (rotas fora de /pt e /en). Como o layout raiz não define
 * `<html>`, esta página declara o seu. Bilíngue por não ter idioma de rota.
 */
export default function NotFound() {
  return (
    <html lang="pt-BR" className="bg-background">
      <body className={`${fontVariables} antialiased`}>
        <main className="wrap flex min-h-screen flex-col justify-center py-24">
          <p className="label mb-6">Erro 404 / Error 404</p>
          <h1 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
            Página não encontrada
          </h1>
          <p className="mt-4 max-w-md text-muted">
            Esta página não existe ou foi movida. <span lang="en">This page does not exist or was moved.</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/pt"
              className="inline-flex min-h-11 items-center rounded-[var(--radius-md)] bg-primary px-5 font-medium text-primary-ink transition hover:bg-primary-hover"
            >
              Voltar ao início
            </Link>
            <Link
              href="/en"
              lang="en"
              className="inline-flex min-h-11 items-center rounded-[var(--radius-md)] border border-border-strong px-5 font-medium text-foreground transition hover:border-primary hover:text-primary"
            >
              Back to home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
