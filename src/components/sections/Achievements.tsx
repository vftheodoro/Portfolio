"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FaTrophy, FaMedal, FaStar, FaAward } from "react-icons/fa";
import { achievements } from "@/data/achievements";
import SectionTitle from "../ui/SectionTitle";
import { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  trophy: FaTrophy,
  medal: FaMedal,
  star: FaStar,
  award: FaAward,
};

const iconColors: Record<string, string> = {
  trophy: "text-yellow-400 bg-yellow-400/10",
  medal: "text-orange-400 bg-orange-400/10",
  star: "text-blue-400 bg-blue-400/10",
  award: "text-purple-400 bg-purple-400/10",
};

export default function Achievements() {
  const t = useTranslations("achievements");
  const locale = useLocale() as "pt" | "en";

  return (
    <section id="achievements" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((item, index) => {
            const Icon = iconMap[item.icon] || FaTrophy;
            const colorClass = iconColors[item.icon] || "text-primary bg-primary/10";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-surface rounded-2xl p-6 border border-border hover:border-primary/30 transition-all group relative overflow-hidden"
              >
                {/* subtle glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/3 group-hover:to-accent/3 transition-all duration-500" />
                <div className="relative flex items-start gap-4">
                  <div className={`p-2.5 rounded-xl shrink-0 ${colorClass}`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-xs text-primary/70 font-mono mb-1 bg-primary/5 border border-primary/10 px-2 py-0.5 rounded-full">
                      {item.date[locale]}
                    </span>
                    <h3 className="font-semibold text-sm sm:text-base mb-2 leading-tight">
                      {item.title[locale]}
                    </h3>
                    <p className="text-muted text-xs sm:text-sm leading-relaxed">
                      {item.description[locale]}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
