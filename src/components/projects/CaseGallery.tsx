"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { FaExpand } from "react-icons/fa";
import { sw } from "@/components/swarm/Sw";
import Lightbox, { type LightboxImage, type LightboxLabels } from "./Lightbox";

interface Labels extends LightboxLabels {
  gallery: string;
  enlarge: string;
  thumbs: string;
}

interface Props {
  images: LightboxImage[];
  /** [mobile, desktop], ex.: ["16 / 9", "2 / 1"] */
  stageRatio: [string, string];
  labels: Labels;
}

/**
 * Galeria: palco grande de proporção fixa (sem layout shift), miniaturas e o
 * visualizador acessível. O 1º filho do wrapper `media` é o palco, recortado pelo Swarm.
 */
export default function CaseGallery({ images, stageRatio, labels }: Props) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const current = images[active];
  const ratioVars = { "--rm": stageRatio[0], "--rd": stageRatio[1] } as CSSProperties;

  return (
    <figure className="m-0" aria-label={labels.gallery}>
      <div {...sw("media")}>
        <div
          className="relative w-full overflow-hidden border border-border bg-surface-light [aspect-ratio:var(--rm)] md:[aspect-ratio:var(--rd)]"
          style={ratioVars}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-label={`${labels.enlarge}: ${current.caption}`}
            className="group absolute inset-0 block cursor-zoom-in"
          >
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              sizes="(min-width: 1024px) 820px, 100vw"
              className="object-contain"
              priority={false}
            />
            <span
              aria-hidden="true"
              className="absolute bottom-3 right-3 inline-flex items-center gap-2 border border-border-strong bg-background/90 px-2.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted transition-colors group-hover:border-primary group-hover:text-primary"
            >
              <FaExpand size={11} />
              {labels.enlarge}
            </span>
          </button>
        </div>
      </div>

      <figcaption className="mt-3 flex items-start justify-between gap-4 text-sm leading-snug text-muted" {...sw("block")}>
        <span>{current.caption}</span>
        <span className="shrink-0 font-mono text-[0.72rem] tracking-[0.1em]">
          {active + 1}/{images.length}
        </span>
      </figcaption>

      {images.length > 1 ? (
        <ul className="mt-3 flex flex-wrap gap-2" aria-label={labels.thumbs}>
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={img.caption}
                aria-current={i === active ? "true" : undefined}
                className={`relative block h-14 w-20 overflow-hidden border bg-surface-light transition-colors sm:h-16 sm:w-24 ${
                  i === active ? "border-primary" : "border-border hover:border-border-strong"
                }`}
              >
                <Image src={img.src} alt="" fill sizes="96px" className="object-cover object-top" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {open ? (
        <Lightbox images={images} index={active} labels={labels} onIndex={setActive} onClose={() => setOpen(false)} />
      ) : null}
    </figure>
  );
}
