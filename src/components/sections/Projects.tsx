"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaInstagram,
  FaTrophy,
  FaNewspaper,
  FaTimes,
} from "react-icons/fa";
import { projects } from "@/data/projects";
import SectionTitle from "../ui/SectionTitle";

export default function Projects() {
  const t = useTranslations("projects");
  const locale = useLocale() as "pt" | "en";
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string} | null>(null);

  const featuredProjects = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        {/* Featured projects */}
        <div className="space-y-12 mb-12">
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-surface via-surface to-primary/5 rounded-2xl border border-primary/20 overflow-hidden shadow-lg shadow-primary/5"
            >
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full border border-primary/30">
                    {t("featured")}
                  </span>
                  {project.awarded && (
                    <span className="px-3 py-1 text-xs font-semibold bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30 flex items-center gap-1">
                      <FaTrophy size={10} />
                      {t("awarded")}
                    </span>
                  )}
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      {project.icon && (
                        <div className="w-12 h-12 relative flex-shrink-0 bg-white/5 rounded-xl border border-white/10 p-2 overflow-hidden">
                          <Image
                            src={project.icon}
                            alt={`${project.id} logo`}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                      )}
                      <h3 className="text-2xl sm:text-3xl font-bold">
                        {project.title[locale]}
                      </h3>
                    </div>

                    <p className="text-muted leading-relaxed mb-6 max-w-3xl">
                      {project.description[locale]}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs bg-surface-light rounded-full text-muted border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-4">
                      {project.site && (
                        <a
                          href={project.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background font-semibold rounded-xl hover:bg-primary-hover transition-all hover:scale-[1.02] active:scale-[0.98] text-sm shadow-lg shadow-primary/10"
                        >
                          <FaExternalLinkAlt size={12} />
                          {t("visit_site")}
                        </a>
                      )}
                      {project.id === "wacs" && (
                        <a
                          href="#press"
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('press')?.scrollIntoView({ behavior: 'smooth' });
                            window.dispatchEvent(new CustomEvent("openPressMore"));
                          }}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-surface border border-border text-muted hover:text-foreground hover:border-primary/50 rounded-xl transition-all text-sm group"
                        >
                          <FaNewspaper size={14} className="group-hover:text-primary transition-colors" />
                          {locale === "pt" ? "Notícias" : "News"}
                        </a>
                      )}
                      {project.instagram && (
                        <a
                          href={project.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-3 border border-border text-muted hover:text-foreground hover:border-primary/50 rounded-xl transition-all text-sm"
                        >
                          <FaInstagram size={14} />
                          Instagram
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-3 border border-border text-muted hover:text-foreground hover:border-primary/50 rounded-xl transition-all text-sm"
                        >
                          <FaGithub size={14} />
                          {t("view_code")}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Screenshots gallery */}
                  {project.screenshots && project.screenshots.length > 0 && (
                    <div className="lg:w-[480px] shrink-0">
                      <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
                        {project.screenshots.map((screenshot, index) => (
                          <motion.div
                            key={screenshot.alt}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="shrink-0 snap-center group/img relative cursor-zoom-in"
                            onClick={() => setSelectedImage(screenshot)}
                          >
                            {/* Device mockup */}
                            <div className={`relative ${project.id === 'wacs' ? 'w-[150px] h-[300px] sm:w-[170px] sm:h-[340px]' : 'w-[280px] h-[170px] sm:w-[320px] sm:h-[195px]'} bg-surface rounded-[24px] border-2 border-border p-1.5 shadow-xl shadow-black/30 group-hover/img:border-primary/40 transition-colors`}>
                              <div className="relative w-full h-full rounded-[18px] overflow-hidden bg-surface-light">
                                <Image
                                  src={screenshot.src}
                                  alt={screenshot.alt}
                                  fill
                                  className="object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
                                  sizes="320px"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors flex items-center justify-center">
                                  <span className="opacity-0 group-hover/img:opacity-100 bg-primary/90 text-background px-3 py-1 rounded-lg text-xs font-bold transition-all transform translate-y-2 group-hover/img:translate-y-0 shadow-lg">
                                    Zoom
                                  </span>
                                </div>
                              </div>
                              {project.id === 'wacs' && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-surface rounded-b-xl" />
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-xs text-muted/60 opacity-80 italic">
                        <span>← scroll →</span>
                        <span className="w-1 h-1 rounded-full bg-muted/30" />
                        <span>{locale === 'pt' ? 'clique para ampliar' : 'click to enlarge'}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Gallery of real photos (if exists) */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="border-t border-border p-6 sm:p-8 bg-black/5">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {project.gallery.map((photo) => (
                      <div
                        key={photo.alt}
                        className="relative aspect-video rounded-xl overflow-hidden border border-border group cursor-pointer"
                        onClick={() => setSelectedImage(photo)}
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 640px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <span className="text-white text-xs font-medium">{photo.alt}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Other projects */}
        <div className="grid sm:grid-cols-2 gap-8">
          {others.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface rounded-2xl p-8 border border-border hover:border-primary/30 transition-all group flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                {project.icon && (
                  <div className="w-8 h-8 relative flex-shrink-0">
                    <Image src={project.icon} alt={project.id} fill className="object-contain" />
                  </div>
                )}
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {project.title[locale]}
                </h3>
              </div>
              
              <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
                {project.description[locale]}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[10px] font-medium bg-white/5 border border-white/10 rounded-md text-muted/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-5 pt-4 border-t border-border/50">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors"
                  >
                    <FaGithub size={16} />
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
                    <FaExternalLinkAlt size={14} />
                    {t("visit_site")}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-10 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 p-4 text-white hover:text-primary transition-colors bg-white/10 rounded-full backdrop-blur-md border border-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes size={24} />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative max-w-5xl w-full h-full max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  quality={100}
                  priority
                />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white/80 text-center mt-6 text-lg font-medium"
              >
                {selectedImage.alt}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
