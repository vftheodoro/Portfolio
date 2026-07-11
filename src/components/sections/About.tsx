"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { FaBuilding, FaChalkboardTeacher, FaDownload, FaLightbulb } from "react-icons/fa";
import SectionTitle from "../ui/SectionTitle";

const highlights = [
  { key: "business", icon: FaBuilding },
  { key: "teaching", icon: FaChalkboardTeacher },
  { key: "builder", icon: FaLightbulb },
] as const;

export default function About() {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
          >
            <p className="mb-5 text-lg font-medium leading-relaxed">{t("lead")}</p>
            <p className="mb-4 leading-relaxed text-muted">{t("bio")}</p>
            <p className="mb-8 leading-relaxed text-muted">{t("bio2")}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={locale === "pt" ? "/cv/Curriculo_Theodoro.pdf" : "/cv/EN_Theodoro.pdf"}
                download
                className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium transition hover:border-primary/50 hover:text-primary"
              >
                <FaDownload size={13} />
                {t("download_cv")}
              </a>
              <a
                href="https://bythe.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition hover:bg-primary/20"
              >
                {t("visit_bythe")}
              </a>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {highlights.map(({ key, icon: Icon }, index) => (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex gap-4 rounded-2xl border border-border bg-surface/60 p-5 transition hover:border-primary/30"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={19} />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">{t(`highlights.${key}.title`)}</h3>
                  <p className="text-sm leading-relaxed text-muted">{t(`highlights.${key}.description`)}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
