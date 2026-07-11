"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import SectionTitle from "../ui/SectionTitle";

const socialLinks = [
  { icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com/in/vftheodoro" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com/vftheodoro" },
  { icon: FaGithub, label: "GitHub", href: "https://github.com/vftheodoro" },
  { icon: FaEnvelope, label: "E-mail", href: "mailto:victorgft@outlook.com" },
];

export default function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-3xl border border-primary/20 bg-[linear-gradient(135deg,rgba(6,182,212,.12),rgba(17,24,39,.9)_45%,rgba(139,92,246,.08))] p-6 sm:p-10"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">{t("primary_title")}</p>
              <p className="mb-7 max-w-2xl text-lg leading-relaxed text-muted">{t("primary_text")}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="https://wa.me/5513996016551" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-green-400">
                  <FaWhatsapp size={18} />{t("whatsapp_cta")}
                </a>
                <a href="https://bythe.tech" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl border border-border bg-background/30 px-6 py-3.5 font-semibold transition hover:border-primary/40 hover:text-primary">
                  {t("bythe_cta")}
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background/45 p-5 sm:p-6">
              <h3 className="mb-4 text-sm font-semibold">{t("social_title")}</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl border border-border/80 px-3 py-3 text-sm text-muted transition hover:border-primary/30 hover:text-primary">
                    <Icon size={15} />{label}
                  </a>
                ))}
              </div>
              <div className="mt-5 flex items-start gap-2 border-t border-border pt-5 text-sm text-muted">
                <FaMapMarkerAlt className="mt-0.5 shrink-0 text-primary" size={14} />{t("location")}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
