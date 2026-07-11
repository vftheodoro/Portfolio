"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaBuilding, FaChalkboardTeacher, FaCode, FaUsers } from "react-icons/fa";
import SectionTitle from "../ui/SectionTitle";

const experiences = [
  { key: "corporate", icon: FaBuilding },
  { key: "education", icon: FaChalkboardTeacher },
  { key: "bythe", icon: FaUsers },
  { key: "projects", icon: FaCode },
] as const;

export default function Experience() {
  const t = useTranslations("experience");

  return (
    <section id="experience" className="bg-surface/30 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />
        <div className="grid gap-5 md:grid-cols-2">
          {experiences.map(({ key, icon: Icon }, index) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="group rounded-2xl border border-border bg-surface p-6 sm:p-7"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={19} />
                </div>
                <span className="font-mono text-xs text-primary/70">0{index + 1}</span>
              </div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {t(`${key}.eyebrow`)}
              </p>
              <h3 className="mb-3 text-xl font-semibold">{t(`${key}.title`)}</h3>
              <p className="text-sm leading-relaxed text-muted">{t(`${key}.description`)}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
