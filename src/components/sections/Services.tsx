"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  HiGlobeAlt,
  HiDeviceMobile,
  HiServer,
  HiChip,
  HiLightBulb,
  HiClipboardList,
  HiCode,
  HiCheckCircle,
} from "react-icons/hi";

import { services } from "@/data/services";
import SectionTitle from "../ui/SectionTitle";
import { IconType } from "react-icons";

const serviceIcons: Record<string, IconType> = {
  globe: HiGlobeAlt,
  smartphone: HiDeviceMobile,
  server: HiServer,
  cpu: HiChip,
};

const stepIcons = [HiLightBulb, HiClipboardList, HiCode, HiCheckCircle];

export default function Services() {
  const t = useTranslations("services");
  const locale = useLocale() as "pt" | "en";

  return (
    <section id="services" className="py-20 sm:py-28 bg-surface/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        {/* Service cards */}
        <div className="grid sm:grid-cols-2 gap-6 mb-20">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon] || HiCode;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-surface rounded-2xl p-6 sm:p-8 border border-border hover:border-primary/30 transition-all group"
              >
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon
                    size={28}
                    className="text-primary"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {t(`${service.id}_title`)}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  {t(`${service.id}_desc`)}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-center gap-2 text-sm text-muted"
                    >
                      <HiCheckCircle className="text-primary shrink-0" size={16} />
                      {feature[locale]}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-sm text-primary/70 hover:text-primary transition-colors font-medium group"
                >
                  {t("card_cta")}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Process steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-center mb-10">
            {t("process_title")}
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((step, index) => {
              const StepIcon = stepIcons[index];
              return (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                    <StepIcon size={24} className="text-primary" />
                  </div>
                  <div className="text-xs text-primary font-mono mb-1">
                    0{step}
                  </div>
                  <h4 className="font-semibold mb-1 text-sm sm:text-base">
                    {t(`step${step}_title`)}
                  </h4>
                  <p className="text-muted text-xs sm:text-sm">
                    {t(`step${step}_desc`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-xl sm:text-2xl font-semibold mb-6">
            {t("cta")}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-background font-semibold rounded-xl hover:bg-primary-hover transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            {t("card_cta")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
