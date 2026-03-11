"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaInstagram,
  FaTrophy,
} from "react-icons/fa";
import { projects } from "@/data/projects";
import SectionTitle from "../ui/SectionTitle";

const wacsScreenshots = [
  { src: "/images/wacs/login.jpeg", alt: "WACS Login" },
  { src: "/images/wacs/home.jpeg", alt: "WACS Home" },
  { src: "/images/wacs/control.jpeg", alt: "WACS Control" },
  { src: "/images/wacs/bluetooth.png", alt: "WACS Bluetooth" },
  { src: "/images/wacs/locations.jpeg", alt: "WACS Locations" },
  { src: "/images/wacs/profile.jpeg", alt: "WACS Profile" },
  { src: "/images/wacs/security.jpeg", alt: "WACS Security" },
];

export default function Projects() {
  const t = useTranslations("projects");
  const locale = useLocale() as "pt" | "en";

  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        {/* Featured project — WACS */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 bg-gradient-to-br from-surface via-surface to-primary/5 rounded-2xl border border-primary/20 overflow-hidden shadow-lg shadow-primary/5"
          >
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full border border-primary/30">
                  {t("featured")}
                </span>
                {featured.awarded && (
                  <span className="px-3 py-1 text-xs font-semibold bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30 flex items-center gap-1">
                    <FaTrophy size={10} />
                    {t("awarded")}
                  </span>
                )}
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                    {featured.title[locale]}
                  </h3>
                  <p className="text-muted leading-relaxed mb-6 max-w-3xl">
                    {featured.description[locale]}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featured.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-surface-light rounded-full text-muted border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-3">
                    {featured.site && (
                      <a
                        href={featured.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-background font-medium rounded-lg hover:bg-primary-hover transition-colors text-sm"
                      >
                        <FaExternalLinkAlt size={12} />
                        {t("visit_site")}
                      </a>
                    )}
                    {featured.instagram && (
                      <a
                        href={featured.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-muted hover:text-foreground hover:border-primary/50 rounded-lg transition-colors text-sm"
                      >
                        <FaInstagram size={14} />
                        {t("view_instagram")}
                      </a>
                    )}
                  </div>
                </div>

                {/* App screenshots gallery */}
                <div className="lg:w-[420px] shrink-0">
                  <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide">
                    {wacsScreenshots.map((screenshot, index) => (
                      <motion.div
                        key={screenshot.alt}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="shrink-0 snap-center"
                      >
                        {/* Phone mockup */}
                        <div className="relative w-[140px] h-[280px] sm:w-[160px] sm:h-[320px] bg-surface rounded-[24px] border-2 border-border p-1.5 shadow-lg shadow-black/20">
                          <div className="relative w-full h-full rounded-[18px] overflow-hidden bg-surface-light">
                            <Image
                              src={screenshot.src}
                              alt={screenshot.alt}
                              fill
                              className="object-cover object-top"
                              sizes="160px"
                            />
                          </div>
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-surface rounded-b-xl" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-xs text-muted text-center mt-2 opacity-60">
                    ← scroll →
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery of real photos */}
            <div className="border-t border-border p-6 sm:p-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { src: "/images/press/cnn.jpg", alt: "Entrevista CNN Brasil" },
                  { src: "/images/press/estadao.jpg", alt: "Entrevista Estadão" },
                  { src: "/images/press/equipe-vereador.png", alt: "Equipe WACS com Vereador" },
                  { src: "/images/press/prototipo.jpg", alt: "Protótipo WACS" },
                ].map((photo) => (
                  <div
                    key={photo.alt}
                    className="relative aspect-video rounded-lg overflow-hidden border border-border group"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <span className="text-white text-xs">{photo.alt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Other projects */}
        <div className="grid sm:grid-cols-2 gap-6">
          {others.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface rounded-2xl p-6 border border-border hover:border-primary/30 transition-all group"
            >
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {project.title[locale]}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-4">
                {project.description[locale]}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs bg-surface-light rounded text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors"
                  >
                    <FaGithub size={14} />
                    {t("view_code")}
                  </a>
                )}
                {project.site && (
                  <a
                    href={project.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors"
                  >
                    <FaExternalLinkAlt size={12} />
                    {t("visit_site")}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
