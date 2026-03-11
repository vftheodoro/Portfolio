"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { FaGraduationCap, FaShieldAlt, FaGamepad, FaBriefcase, FaUserShield, FaDownload } from "react-icons/fa";
import SectionTitle from "../ui/SectionTitle";

const educationItems = [
  {
    key: "etec",
    icon: FaGraduationCap,
    title: { pt: "Técnico em Desenvolvimento de Sistemas", en: "Systems Development Technician" },
    institution: "ETEC de Registro",
    period: "2023 - 2025",
  },
  {
    key: "cisco_network",
    icon: FaShieldAlt,
    title: { pt: "Cisco Network Defense", en: "Cisco Network Defense" },
    institution: "Cisco Networking Academy",
    period: "2025",
  },
  {
    key: "cisco_hacking",
    icon: FaUserShield,
    title: { pt: "Cisco Ethical Hacking Essentials", en: "Cisco Ethical Hacking Essentials" },
    institution: "Cisco Networking Academy",
    period: "2024",
  },
  {
    key: "danki",
    icon: FaGamepad,
    title: { pt: "Desenvolvimento de Games FullStack", en: "FullStack Game Development" },
    institution: "Danki Code",
    period: "2023",
  },
  {
    key: "sebrae",
    icon: FaBriefcase,
    title: { pt: "Oficina \"Partiu Mercado\"", en: "\"Partiu Mercado\" Workshop" },
    institution: "Sebrae-SP",
    period: "2023",
  },
];

function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 1500;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            start = Math.floor(eased * target);
            setCount(start);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">
        {count}+
      </div>
      <div className="text-sm text-muted">{label}</div>
    </div>
  );
}

export default function About() {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t("title")} />

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-muted leading-relaxed mb-4">{t("bio")}</p>
            <p className="text-muted leading-relaxed mb-8">{t("bio2")}</p>
            <a
              href="/cv/victor-theodoro-cv.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface border border-border rounded-xl text-sm font-medium hover:border-primary/50 hover:text-primary transition-all group"
            >
              <FaDownload size={14} className="group-hover:text-primary transition-colors" />
              {t("download_cv")}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center"
          >
            <div className="flex items-stretch divide-x divide-border w-full bg-surface rounded-2xl border border-border overflow-hidden">
              <div className="flex-1 py-8 px-4">
                <AnimatedCounter target={10} label={t("stats.projects")} />
              </div>
              <div className="flex-1 py-8 px-4">
                <AnimatedCounter target={7} label={t("stats.awards")} />
              </div>
              <div className="flex-1 py-8 px-4">
                <AnimatedCounter target={15} label={t("stats.technologies")} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-8 text-center">
            {t("education_title")}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {educationItems.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-surface rounded-xl p-5 border border-border hover:border-primary/30 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                    <item.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm leading-tight mb-1">
                      {item.title[locale as "pt" | "en"]}
                    </h4>
                    <p className="text-muted text-xs">{item.institution}</p>
                    <p className="text-primary/70 text-xs mt-1 font-mono">
                      {item.period}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
