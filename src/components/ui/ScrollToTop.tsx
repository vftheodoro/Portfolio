"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FaArrowUp } from "react-icons/fa";

/** Botão "voltar ao topo": aparece após 400 px de rolagem; fora disso fica fora da ordem de tabulação. */
export default function ScrollToTop() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("scroll_top")}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-50 flex size-11 items-center justify-center rounded-[var(--radius-md)] border border-border-strong bg-surface text-foreground transition-[opacity,border-color,color] hover:border-primary hover:text-primary motion-reduce:transition-none ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <FaArrowUp size={14} aria-hidden="true" />
    </button>
  );
}
