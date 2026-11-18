import type { ReactNode } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { sw } from "@/components/swarm/Sw";

interface Props {
  href: string;
  kind: "github" | "demo" | "reference";
  children: ReactNode;
  newTabLabel: string;
  /** marca para o Swarm posicionar e "clicar" o link */
  swarm?: boolean;
  className?: string;
}

/** Link externo: ícone, alvo ≥ 40 px, aviso de nova aba só para leitor de tela. */
export default function ExtLink({ href, kind, children, newTabLabel, swarm = true, className = "" }: Props) {
  const Icon = kind === "github" ? FaGithub : FaExternalLinkAlt;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex min-h-10 items-center gap-2 rounded-[3px] border border-border-strong px-3 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary ${className}`}
      {...(swarm ? sw("link") : {})}
    >
      <Icon aria-hidden="true" size={kind === "github" ? 15 : 12} className="shrink-0 text-muted transition-colors group-hover:text-primary" />
      <span>{children}</span>
      <span className="sr-only"> ({newTabLabel})</span>
    </a>
  );
}
