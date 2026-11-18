import { SwType, sw } from "@/components/swarm/Sw";

interface SectionTitleProps {
  /** Número da seção, ex.: "01". */
  index?: string;
  /** Rótulo mono ao lado do número, ex.: "Sobre". */
  label?: string;
  title: string;
  /** Trecho de `title` destacado em serifada itálica (uma expressão por título). */
  accent?: string;
  subtitle?: string;
  /** `id` do `<h2>` (use com `aria-labelledby` da seção). */
  id?: string;
  /** Grupo do Swarm dos elementos do cabeçalho. */
  group?: string;
  /**
   * Marca título, régua e subtítulo para o Swarm. Só use DENTRO de um
   * `SwSection`: fora dele o texto digitado nunca seria revelado.
   */
  typed?: boolean;
}

/** Cabeçalho editorial de seção: `01 / SOBRE` + régua, título com destaque e subtítulo. */
export default function SectionTitle({ index, label, title, accent, subtitle, id, group, typed = false }: SectionTitleProps) {
  const at = accent ? title.indexOf(accent) : -1;
  const parts =
    accent && at >= 0
      ? [
          { text: title.slice(0, at).trimEnd(), accent: false },
          { text: accent, accent: true },
          { text: title.slice(at + accent.length).trimStart(), accent: false },
        ].filter((p) => p.text.length > 0)
      : [{ text: title, accent: false }];

  return (
    <header className="mb-12 md:mb-16">
      {(index || label) && (
        <div className="mb-6 flex items-center gap-4">
          {index && <span className="label text-primary">{index}</span>}
          {label && <span className="label">/ {label}</span>}
          <span aria-hidden="true" className="rule flex-1" {...(typed ? sw("line", { group }) : {})} />
        </div>
      )}
      <h2
        id={id}
        className="max-w-3xl text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em]"
      >
        {parts.map((p, i) => {
          const cls = p.accent ? "serif-accent text-primary" : undefined;
          return (
            <span key={i}>
              {i > 0 && " "}
              {typed ? <SwType as="span" text={p.text} className={cls} group={group} /> : <span className={cls}>{p.text}</span>}
            </span>
          );
        })}
      </h2>
      {subtitle && (
        <p className="mt-5 max-w-2xl text-base leading-[1.65] text-muted" {...(typed ? sw("block", { group }) : {})}>
          {subtitle}
        </p>
      )}
    </header>
  );
}
