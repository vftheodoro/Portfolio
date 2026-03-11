"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  FaWhatsapp,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import SectionTitle from "../ui/SectionTitle";

const contactLinks = [
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/5513996016551",
    color: "hover:text-green-400",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    href: "mailto:contato@victortheodoro.dev",
    color: "hover:text-blue-400",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/vftheodoro",
    color: "hover:text-blue-500",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/vftheodoro",
    color: "hover:text-foreground",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://instagram.com/vftheodoro",
    color: "hover:text-pink-400",
  },
];

export default function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "freelance",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // EmailJS or Formspree integration placeholder
      // For now, open WhatsApp with pre-filled message
      const msg = encodeURIComponent(
        `Olá Victor! Meu nome é ${formData.name}.\n\nTipo: ${formData.type}\n\n${formData.message}`
      );
      window.open(`https://wa.me/5513996016551?text=${msg}`, "_blank");
      setStatus("success");
      setFormData({ name: "", email: "", type: "freelance", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t("name")}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors"
                  placeholder={t("name")}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t("email")}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors"
                  placeholder={t("email")}
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium mb-2">
                  {t("type")}
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors"
                >
                  <option value="recruitment">{t("type_recruitment")}</option>
                  <option value="freelance">{t("type_freelance")}</option>
                  <option value="other">{t("type_other")}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t("message")}
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors resize-none"
                  placeholder={t("message")}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full px-8 py-3.5 bg-primary text-background font-semibold rounded-xl hover:bg-primary-hover transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaPaperPlane size={14} />
                {status === "sending" ? t("sending") : t("send")}
              </button>

              {status === "success" && (
                <p className="text-green-400 text-sm text-center">
                  {t("success")}
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm text-center">
                  {t("error")}
                </p>
              )}
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-between"
          >
            <div>
              <p className="text-muted mb-8">{t("or")}</p>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/5513996016551"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-green-600/10 border border-green-600/30 rounded-xl hover:bg-green-600/20 transition-colors mb-8 group"
              >
                <div className="p-3 bg-green-600 rounded-lg">
                  <FaWhatsapp size={24} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold group-hover:text-green-400 transition-colors">
                    {t("whatsapp_cta")}
                  </p>
                  <p className="text-sm text-muted">+55 13 99601-6551</p>
                </div>
              </a>

              {/* Social links */}
              <div className="space-y-3">
                {contactLinks.slice(1).map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 text-muted ${color} transition-colors`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="mt-8 flex items-center gap-2 text-muted">
              <FaMapMarkerAlt size={14} className="text-primary" />
              <span className="text-sm">Registro, São Paulo, Brasil</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
