"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaGraduationCap,
  FaLaptop,
  FaUsers,
} from "react-icons/fa";
import SectionTitle from "../ui/SectionTitle";

const subjectKeys = [
  "computing",
  "windows",
  "excel",
  "internet",
  "productivity",
  "employability",
  "technology",
] as const;

const responsibilityKeys = [
  "planning",
  "exercises",
  "assessments",
  "attendance",
  "evaluation",
] as const;

const credentials = [
  { key: "fatec", icon: FaGraduationCap },
  { key: "etec", icon: FaLaptop },
  { key: "cisco", icon: FaBookOpen },
] as const;

export default function Teaching() {
  const t = useTranslations("teaching");

  return (
    <section id="teaching" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="mb-12 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <motion.article
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-primary/20 bg-[linear-gradient(145deg,rgba(6,182,212,.12),rgba(17,24,39,.92)_48%)] p-6 sm:p-8"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-background">
              <FaChalkboardTeacher size={22} />
            </div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {t("eyebrow")}
            </p>
            <h3 className="mb-4 text-2xl font-semibold sm:text-3xl">{t("lead")}</h3>
            <p className="mb-7 leading-relaxed text-muted">{t("description")}</p>
            <div className="flex flex-wrap gap-2">
              {subjectKeys.map((key) => (
                <span
                  key={key}
                  className="rounded-full border border-border bg-background/35 px-3 py-1.5 text-xs text-muted"
                >
                  {t(`subjects.${key}`)}
                </span>
              ))}
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border bg-surface p-6 sm:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FaClipboardCheck size={18} />
              </div>
              <h3 className="text-xl font-semibold">{t("responsibilities_title")}</h3>
            </div>
            <ul className="space-y-4">
              {responsibilityKeys.map((key) => (
                <li key={key} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {t(`responsibilities.${key}`)}
                </li>
              ))}
            </ul>
            <div className="mt-7 rounded-2xl border border-primary/15 bg-primary/5 p-4">
              <div className="flex gap-3">
                <FaUsers className="mt-0.5 shrink-0 text-primary" size={17} />
                <p className="text-sm leading-relaxed text-muted">{t("institutions")}</p>
              </div>
            </div>
          </motion.article>
        </div>

        <div>
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
              {t("credentials_title")}
            </h3>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {credentials.map(({ key, icon: Icon }, index) => (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="rounded-2xl border border-border bg-surface/60 p-5"
              >
                <Icon className="mb-4 text-primary" size={20} />
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-primary/75">
                  {t(`credentials.${key}.status`)}
                </p>
                <h4 className="mb-1 font-semibold">{t(`credentials.${key}.title`)}</h4>
                <p className="text-sm text-muted">{t(`credentials.${key}.institution`)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
