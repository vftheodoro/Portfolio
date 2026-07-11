"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaArrowRight, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

const proofPoints = ["support", "education", "solutions"] as const;

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[92vh] overflow-hidden border-b border-border/70 pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(6,182,212,0.14),transparent_28%),radial-gradient(circle_at_15%_10%,rgba(139,92,246,0.08),transparent_24%)]" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto grid min-h-[calc(92vh-6rem)] max-w-6xl items-center gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="relative z-10 text-center lg:text-left"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
            <FaMapMarkerAlt size={11} />
            {t("location")}
          </div>

          <p className="mb-3 font-mono text-sm uppercase tracking-[0.2em] text-muted">
            {t("eyebrow")}
          </p>
          <h1 className="mb-5 text-4xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
            {t("name")}
          </h1>
          <h2 className="mb-6 max-w-2xl text-xl font-medium leading-snug text-primary sm:text-2xl">
            {t("role")}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
            {t("description")}
          </p>

          <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="https://wa.me/5513996016551"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-background transition hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20"
            >
              <FaWhatsapp size={17} />
              {t("cta_contact")}
            </a>
            <a
              href="#experience"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface/70 px-6 py-3.5 font-semibold transition hover:border-primary/40 hover:text-primary"
            >
              {t("cta_work")}
              <FaArrowRight size={13} />
            </a>
          </div>

          <div className="grid grid-cols-3 gap-2 border-t border-border/70 pt-6 sm:gap-4">
            {proofPoints.map((point) => (
              <div key={point} className="text-left">
                <strong className="block text-sm font-semibold sm:text-base">
                  {t(`proof.${point}.title`)}
                </strong>
                <span className="mt-1 block text-[11px] leading-snug text-muted sm:text-xs">
                  {t(`proof.${point}.label`)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="relative mx-auto w-full max-w-[470px]"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/25 via-transparent to-accent/20 blur-2xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-surface shadow-2xl shadow-black/40">
            <Image
              src="/images/victor/portrait-2026.png"
              alt={t("photo_alt")}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 470px"
              className="object-cover object-[50%_30%]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/45 to-transparent p-6 pt-24">
              <p className="text-sm font-semibold">{t("photo_caption")}</p>
              <p className="mt-1 text-xs text-muted">{t("photo_subcaption")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
