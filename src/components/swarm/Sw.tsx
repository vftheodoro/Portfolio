import type { CSSProperties, ElementType, ReactNode } from "react";
import type { SwarmKind } from "@/lib/swarm/types";

/**
 * Helpers de marcação do Swarm. São server-friendly (sem hooks): o HTML que o
 * servidor envia já contém todo o conteúdo; os atributos só dizem ao
 * controlador COMO construir cada elemento.
 */

type Common = { className?: string; group?: string; cursor?: number; children?: ReactNode; id?: string };

/** Atributos `data-sw-*` para espalhar em qualquer elemento: `<p {...sw("block")}>`. */
export function sw(kind: SwarmKind, opts: { group?: string; cursor?: number; axis?: "x" | "y" } = {}) {
  return {
    "data-sw": kind,
    ...(opts.group ? { "data-sw-group": opts.group } : {}),
    ...(opts.cursor !== undefined ? { "data-sw-cursor": opts.cursor } : {}),
    ...(opts.axis ? { "data-sw-axis": opts.axis } : {}),
  } as const;
}

/** Cena do Swarm. `name` escolhe a coreografia em `src/lib/swarm/presets.ts`. */
export function SwSection({
  name,
  as: Tag = "section",
  className,
  id,
  children,
  ...rest
}: Common & { name: string; as?: ElementType; "aria-labelledby"?: string }) {
  return (
    <Tag data-sw-section={name} id={id} className={className} {...rest}>
      {children}
    </Tag>
  );
}

/** Contêiner desenhado por arrasto. O fundo/borda vêm de `.sw-chrome` (tokens --sw-*). */
export function SwFrame({ as: Tag = "div", className = "", group, cursor, children }: Common & { as?: ElementType }) {
  return (
    <Tag className={`sw-frame ${className}`} {...sw("frame", { group, cursor })}>
      <span className="sw-chrome" aria-hidden="true" />
      {children}
    </Tag>
  );
}

/**
 * Texto "digitado". Cada caractere vira um <span> (o texto continua inteiro no
 * HTML do servidor, na ordem certa); palavras não quebram no meio.
 */
export function SwType({
  as: Tag = "span",
  text,
  className,
  group,
  cursor,
  id,
}: Omit<Common, "children"> & { as?: ElementType; text: string }) {
  const n = Array.from(text).length;
  let i = 0;
  const words = text.split(/(\s+)/);
  return (
    <Tag
      id={id}
      className={className}
      data-sw-n={n}
      style={{ "--n": n } as CSSProperties}
      {...sw("type", { group, cursor })}
    >
      {words.map((w, wi) => {
        if (/^\s+$/.test(w)) {
          i += w.length;
          return w;
        }
        return (
          <span key={wi} style={{ whiteSpace: "nowrap" }}>
            {Array.from(w).map((ch) => (
              <span key={i} className="sw-c" style={{ "--i": i++ } as CSSProperties}>
                {ch}
              </span>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}
