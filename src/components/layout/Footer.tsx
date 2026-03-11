"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp, FaHeart, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const socials = [
  { icon: FaGithub, href: "https://github.com/vftheodoro", label: "GitHub", color: "hover:text-slate-300" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/vftheodoro", label: "LinkedIn", color: "hover:text-blue-400" },
  { icon: FaInstagram, href: "https://instagram.com/vftheodoro", label: "Instagram", color: "hover:text-pink-400" },
  { icon: FaWhatsapp, href: "https://wa.me/5513996016551", label: "WhatsApp", color: "hover:text-green-400" },
];

const navLinks = ["about", "skills", "projects", "services", "achievements", "press", "contact"] as const;

const serviceLinks = [
  { key: "websites", label: { pt: "Sites & Landing Pages", en: "Websites & Landing Pages" } },
  { key: "mobile", label: { pt: "Apps Mobile", en: "Mobile Apps" } },
  { key: "systems", label: { pt: "Sistemas Web", en: "Web Systems" } },
  { key: "iot", label: { pt: "Automação & IoT", en: "Automation & IoT" } },
];

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Detect locale from URL for service labels
  const locale = typeof window !== "undefined" && window.location.pathname.startsWith("/en") ? "en" : "pt";

  return (
    <footer className="border-t border-border bg-surface/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Col 1 — Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="cursor-pointer mb-4 block"
              aria-label="Ir ao topo"
            >
              <Image
                src="/Portfolio/images/victor/vt-logo.png"
                alt="VT — Victor Theodoro"
                width={44}
                height={44}
                className="drop-shadow-[0_0_10px_rgba(6,182,212,0.4)] object-contain"
              />
            </button>
            <p className="text-sm text-muted leading-relaxed mb-5 max-w-[220px]">
              {t("tagline")}
            </p>
            <div className="flex items-center gap-4">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-muted ${color} transition-all hover:scale-110`}
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Col 2 — Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              {t("nav_title")}
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleNavClick(item)}
                    className="text-sm text-muted hover:text-foreground transition-colors cursor-pointer text-left"
                  >
                    {tNav(item)}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              {t("services_title")}
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s.key}>
                  <button
                    onClick={() => handleNavClick("services")}
                    className="text-sm text-muted hover:text-foreground transition-colors cursor-pointer text-left"
                  >
                    {s.label[locale as "pt" | "en"]}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4 — Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              {t("contact_title")}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:victorgft@outlook.com"
                  className="flex items-center gap-2.5 text-sm text-muted hover:text-foreground transition-colors group"
                >
                  <FaEnvelope size={14} className="text-primary/60 group-hover:text-primary transition-colors shrink-0" />
                  victorgft@outlook.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5513996016551"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-muted hover:text-green-400 transition-colors group"
                >
                  <FaWhatsapp size={14} className="text-primary/60 group-hover:text-green-400 transition-colors shrink-0" />
                  +55 13 99601-6551
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-muted">
                <FaMapMarkerAlt size={14} className="text-primary/60 mt-0.5 shrink-0" />
                {t("location")}
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Victor Theodoro. {t("rights")}
          </p>
          <p className="text-xs text-muted flex items-center gap-1">
            {t("built_with")} <FaHeart className="text-red-500 mx-0.5" size={11} />
          </p>
        </div>
      </div>
    </footer>
  );
}

