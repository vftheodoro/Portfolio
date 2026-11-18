"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { SwarmMotionController, revealAll } from "@/lib/swarm/controller";
import { resolveMode } from "@/lib/swarm/motion";
import "./swarm.css";

/** Instâncias montadas (módulo): evita revelar tudo quando a troca de idioma remonta o componente. */
let mounted = 0;

const COPY = {
  pt: { skip: "Pular animação", aria: "Pular a animação de construção da página" },
  en: { skip: "Skip animation", aria: "Skip the page build animation" },
} as const;

function readSaved(): "on" | "off" | "reduced" | null {
  try {
    const v = window.localStorage.getItem("swarm-motion");
    return v === "on" || v === "off" || v === "reduced" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Monta o controlador do Swarm e a camada de cursores. Fica no layout do
 * idioma; não renderiza nada que o conteúdo precise (se falhar, a página
 * continua completa — veja SwarmBootScript e o CSS condicional).
 */
export default function SwarmExperience() {
  const locale = useLocale();
  const copy = COPY[locale === "en" ? "en" : "pt"];
  const [busy, setBusy] = useState(false);
  const ctl = useRef<SwarmMotionController | null>(null);

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const mode = resolveMode({
      prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      saved: readSaved(),
      viewportWidth: window.innerWidth,
      hardwareConcurrency: nav.hardwareConcurrency,
      deviceMemory: nav.deviceMemory,
      saveData: nav.connection?.saveData,
    });
    mounted++;
    const controller = new SwarmMotionController({ mode, onBusyChange: setBusy });
    ctl.current = controller;
    try {
      controller.start();
    } catch (err) {
      // qualquer falha: mostra tudo, nunca deixa a página em branco
      console.error("[swarm] falha ao iniciar, exibindo conteúdo completo", err);
      controller.destroy();
      revealAll();
    }

    const onPref = (e: Event) => {
      if ((e as CustomEvent<string>).detail === "off") controller.skipAll();
    };
    window.addEventListener("swarm:pref", onPref);
    return () => {
      window.removeEventListener("swarm:pref", onPref);
      controller.destroy();
      ctl.current = null;
      // StrictMode remonta em seguida; só revela tudo se NÃO houve remontagem
      mounted--;
      window.setTimeout(() => {
        if (mounted === 0) revealAll();
      }, 60);
    };
  }, []);

  return (
    <>
      <div id="sw-layer" aria-hidden="true" />
      {busy && (
        <button type="button" className="sw-skip" aria-label={copy.aria} onClick={() => ctl.current?.skipAll()}>
          <i aria-hidden="true" />
          {copy.skip}
        </button>
      )}
    </>
  );
}
