"use client";

import { useSyncExternalStore } from "react";
import { useLocale } from "next-intl";

function subscribe(cb: () => void) {
  window.addEventListener("swarm:store", cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener("swarm:store", cb);
    window.removeEventListener("storage", cb);
  };
}

function readOff(): boolean {
  try {
    return window.localStorage.getItem("swarm-motion") === "off";
  } catch {
    return false;
  }
}

/**
 * Preferência persistente de animação (para o rodapé). Desligar tem efeito
 * imediato; religar vale na próxima visita (o que já foi construído fica).
 */
export default function SwarmToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const en = locale === "en";
  const off = useSyncExternalStore(subscribe, readOff, () => false);

  const toggle = () => {
    const next = !off;
    try {
      window.localStorage.setItem("swarm-motion", next ? "off" : "on");
    } catch {
      /* armazenamento indisponível */
    }
    window.dispatchEvent(new Event("swarm:store"));
    if (next) window.dispatchEvent(new CustomEvent("swarm:pref", { detail: "off" }));
  };

  return (
    <button type="button" onClick={toggle} aria-pressed={!off} className={className}>
      {en ? "Build animation" : "Animação de construção"}: {off ? (en ? "off" : "desligada") : en ? "on" : "ligada"}
    </button>
  );
}
