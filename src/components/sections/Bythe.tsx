"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaArrowRight, FaCheckCircle, FaExternalLinkAlt } from "react-icons/fa";

const serviceKeys = ["support", "infrastructure", "modernization", "projects"] as const;

export default function Bythe() {
  const t = useTranslations("bythe");

  return (
    <section id="bythe" className="bg-surface/30 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-[#0080ff]/25 bg-[linear-gradient(135deg,rgba(0,128,255,.13),rgba(17,24,39,.96)_42%,rgba(10,10,10,.98))] p-6 sm:p-10 lg:p-12"
        >
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#0080ff]/10 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#4ba6ff]">
                {t("eyebrow")}
              </p>
              <a
                href="https://bythe.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-block"
                aria-label={t("logo_link_label")}
              >
                <Image
                  src="/images/bythe-logo.svg"
                  alt="BYTHE"
                  width={420}
                  height={72}
                  className="h-auto w-full max-w-[340px] transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </a>
              <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed sm:text-xl">
                {t("headline")}
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-muted">{t("description")}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-background/45 p-5 sm:p-7">
              <p className="mb-5 text-sm font-semibold">{t("services_title")}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {serviceKeys.map((key) => (
                  <div key={key} className="flex items-start gap-2.5 rounded-xl border border-border/80 bg-surface/50 p-3.5">
                    <FaCheckCircle className="mt-0.5 shrink-0 text-[#0080ff]" size={15} />
                    <span className="text-sm text-muted">{t(`services.${key}`)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://bythe.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0080ff] px-6 py-3.5 font-semibold text-white transition hover:bg-[#2995ff] hover:shadow-lg hover:shadow-[#0080ff]/20"
                >
                  {t("cta")}
                  <FaExternalLinkAlt size={12} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3.5 font-semibold transition hover:border-[#0080ff]/50 hover:text-[#4ba6ff]"
                >
                  {t("contact_cta")}
                  <FaArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
