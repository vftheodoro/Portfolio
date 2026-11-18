import { sw } from "@/components/swarm/Sw";

interface Props {
  /** id do h2 (para aria-labelledby da seção) */
  id: string;
  /** "02" */
  index: string;
  /** "PROJETOS" */
  label: string;
  title: string;
  /** palavra em serifada itálica (uma por título) */
  accent: string;
  lead?: string;
}

/** Cabeçalho padrão das seções: "02 / PROJETOS", h2 com um destaque serifado e lead. */
export default function SectionHead({ id, index, label, title, accent, lead }: Props) {
  return (
    <header className="mb-12 md:mb-16" {...sw("block")}>
      <p className="label flex items-center gap-3">
        <span className="text-primary">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-border-strong" />
        <span>{label}</span>
      </p>
      <h2
        id={id}
        className="mt-5 max-w-3xl text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em]"
      >
        {title} <span className="serif-accent">{accent}</span>
      </h2>
      {lead ? <p className="mt-5 max-w-2xl leading-[1.65] text-muted">{lead}</p> : null}
    </header>
  );
}
