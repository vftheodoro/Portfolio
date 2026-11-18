"use client";

import Image from "next/image";
import { useEffect, useRef, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

export interface LightboxImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export interface LightboxLabels {
  dialog: string;
  close: string;
  prev: string;
  next: string;
  of: string;
}

interface Props {
  images: LightboxImage[];
  index: number;
  labels: LightboxLabels;
  onIndex: (next: number) => void;
  onClose: () => void;
}

/**
 * Visualizador de imagens acessível: role="dialog" + aria-modal, foco preso nos
 * botões, Esc fecha, setas navegam, rolagem do fundo travada e foco devolvido ao
 * elemento que abriu (guardado no mount, restaurado no unmount).
 */
export default function Lightbox({ images, index, labels, onIndex, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = images.length;
  const current = images[index];

  useEffect(() => {
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, []);

  const go = (delta: number) => onIndex((index + delta + total) % total);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      onClose();
      return;
    }
    if (total > 1 && e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
      return;
    }
    if (total > 1 && e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
      return;
    }
    if (e.key === "Tab") {
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])");
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !dialogRef.current?.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const btn =
    "inline-flex size-11 items-center justify-center rounded-[3px] border border-border-strong bg-surface text-foreground transition-colors hover:border-primary hover:text-primary";

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={labels.dialog}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] flex flex-col bg-background/95 p-3 sm:p-6"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="label" aria-live="polite">
          {index + 1} {labels.of} {total}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} className={btn} aria-label={labels.close}>
          <FaTimes aria-hidden="true" size={16} />
        </button>
      </div>

      <div className="relative min-h-0 flex-1 border border-border bg-surface">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        {total > 1 ? (
          <button type="button" onClick={() => go(-1)} className={btn} aria-label={labels.prev}>
            <FaChevronLeft aria-hidden="true" size={16} />
          </button>
        ) : (
          <span className="size-11" aria-hidden="true" />
        )}
        <p className="min-w-0 flex-1 text-center text-sm leading-snug text-muted" aria-live="polite">
          {current.caption}
        </p>
        {total > 1 ? (
          <button type="button" onClick={() => go(1)} className={btn} aria-label={labels.next}>
            <FaChevronRight aria-hidden="true" size={16} />
          </button>
        ) : (
          <span className="size-11" aria-hidden="true" />
        )}
      </div>
    </div>,
    document.body,
  );
}
