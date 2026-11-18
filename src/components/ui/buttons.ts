/**
 * Classes de botão/link do design system (docs/DESIGN_SYSTEM.md): retas,
 * borda de 1 px, alvo mínimo de 44 px, foco herdado de `:focus-visible` global.
 * Sem transição de `transform` (o Swarm anima transform em `sw("link")`).
 */
const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] px-5 text-sm font-medium transition-colors";

export const btnPrimary = `${base} bg-primary text-primary-ink hover:bg-primary-hover`;
export const btnSecondary = `${base} border border-border-strong text-foreground hover:border-primary hover:text-primary`;
