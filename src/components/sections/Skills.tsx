"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { IconType } from "react-icons";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiFigma,
  SiNodedotjs,
  SiPython,
  SiFirebase,
  SiMysql,
  SiGit,
  SiGithub,
  SiArduino,
  SiPostman,
  SiExpo,
  SiAndroidstudio,
  SiLinux,
  SiNextdotjs,
  SiGooglecloud,
} from "react-icons/si";
import { HiCode } from "react-icons/hi";
import { FaVial, FaNetworkWired, FaUserShield, FaAws } from "react-icons/fa";
import { skillCategories } from "@/data/skills";
import SectionTitle from "../ui/SectionTitle";

const iconColors: Record<string, string> = {
  html5: "text-orange-400",
  css3: "text-blue-400",
  javascript: "text-yellow-400",
  typescript: "text-blue-500",
  react: "text-cyan-400",
  figma: "text-pink-400",
  nodejs: "text-green-400",
  python: "text-yellow-300",
  firebase: "text-orange-500",
  mysql: "text-sky-400",
  git: "text-orange-500",
  github: "text-slate-300",
  arduino: "text-teal-400",
  postman: "text-orange-400",
  expo: "text-slate-200",
  android: "text-green-500",
  linux: "text-yellow-400",
  api: "text-primary",
  nextjs: "text-slate-100",
  aws: "text-orange-400",
  googlecloud: "text-blue-400",
  testing: "text-red-400",
  network: "text-blue-500",
  security: "text-green-500",
  ejs: "text-yellow-500",
};

const iconMap: Record<string, IconType> = {
  html5: SiHtml5,
  css3: SiCss,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  figma: SiFigma,
  nodejs: SiNodedotjs,
  python: SiPython,
  firebase: SiFirebase,
  mysql: SiMysql,
  git: SiGit,
  github: SiGithub,
  arduino: SiArduino,
  postman: SiPostman,
  expo: SiExpo,
  android: SiAndroidstudio,
  linux: SiLinux,
  api: HiCode,
  nextjs: SiNextdotjs,
  aws: FaAws,
  googlecloud: SiGooglecloud,
  testing: FaVial,
  network: FaNetworkWired,
  security: FaUserShield,
  ejs: HiCode,
};

export default function Skills() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="py-20 sm:py-28 bg-surface/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="bg-surface rounded-2xl p-6 border border-border"
            >
              <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider">
                {t(`categories.${category.key}`)}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill) => {
                  const Icon = iconMap[skill.icon] || HiCode;
                  return (
                    <div
                      key={skill.name}
                      className="flex items-center gap-3 text-muted hover:text-foreground transition-colors group"
                    >
                      <div className="p-1.5 rounded-md bg-surface-light group-hover:bg-primary/10 transition-colors shrink-0">
                        <Icon size={16} className={`${iconColors[skill.icon] || "text-primary"} transition-colors`} />
                      </div>
                      <span className="text-sm">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
