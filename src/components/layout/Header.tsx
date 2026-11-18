"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { HiMenu, HiX } from "react-icons/hi";
import { SwFrame, sw } from "@/components/swarm/Sw";
import LanguageSwitcher from "../ui/LanguageSwitcher";

const NAV_ITEMS = ["about", "projects", "experience", "ai", "stack", "recognition", "contact"] as const;

/** Tokens do Swarm: barra de largura total, sem cantos arredondados. */
const BAR_VARS = { "--sw-fill": "rgba(7, 9, 13, 0.92)", "--sw-radius": "0px" } as CSSProperties;

const link =
  "inline-flex min-h-10 items-center rounded-[var(--radius-sm)] px-2.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] transition-colors";

export default function Header() {
  const t = useTranslations("nav");
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // seção ativa conforme a rolagem
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const id of NAV_ITEMS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) menuButton.current?.focus();
  }, []);

  // menu móvel: Esc fecha (devolvendo o foco), clique fora e ampliar a tela também fecham
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panel.current?.contains(target) && !menuButton.current?.contains(target)) close(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = () => desktop.matches && close(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    desktop.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      desktop.removeEventListener("change", onChange);
    };
  }, [open, close]);

  const itemClass = (id: string) =>
    `${link} ${active === id ? "text-foreground shadow-[inset_0_-2px_0_var(--color-primary)]" : "text-muted hover:text-foreground"}`;

  return (
    <header data-sw-section="hero" data-sw-fixed className="fixed inset-x-0 top-0 z-50" style={BAR_VARS}>
      <SwFrame group="nav" className="[&>.sw-chrome]:border-x-0! [&>.sw-chrome]:border-t-0!">
        <div className="wrap flex h-16 items-center justify-between gap-4">
          <a href="#top" aria-label={t("home")} className="flex shrink-0 items-center gap-3 rounded-[var(--radius-sm)]">
            <Image src="/images/victor/vt-logo.png" alt="" width={32} height={32} priority className="object-contain" />
            <span className="hidden font-mono text-xs uppercase tracking-[0.14em] text-foreground sm:inline">
              Victor Theodoro
            </span>
          </a>

          <nav aria-label={t("aria")} className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {NAV_ITEMS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? "location" : undefined}
                    className={itemClass(id)}
                    {...sw("chip", { group: "nav" })}
                  >
                    {t(id)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={open ? "mobile-nav" : undefined}
              aria-label={open ? t("menu_close") : t("menu_open")}
              className="flex size-10 items-center justify-center rounded-[var(--radius-md)] border border-border-strong text-foreground transition-colors hover:border-primary hover:text-primary lg:hidden"
            >
              {open ? <HiX size={20} aria-hidden="true" /> : <HiMenu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </SwFrame>

      {open && (
        <div
          ref={panel}
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-b border-border bg-background lg:hidden"
        >
          <nav aria-label={t("aria")} className="wrap py-3">
            <ul className="grid gap-1">
              {NAV_ITEMS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => close(false)}
                    aria-current={active === id ? "location" : undefined}
                    className={`flex min-h-11 items-center rounded-[var(--radius-sm)] px-3 font-mono text-sm uppercase tracking-[0.12em] transition-colors ${
                      active === id ? "bg-surface-light text-foreground" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {t(id)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
