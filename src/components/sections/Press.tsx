"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { FaExternalLinkAlt, FaNewspaper, FaMicrophone, FaHashtag } from "react-icons/fa";
import { pressItems } from "@/data/press";
import SectionTitle from "../ui/SectionTitle";
import { IconType } from "react-icons";

const typeIcons: Record<string, IconType> = {
  article: FaNewspaper,
  interview: FaMicrophone,
  social: FaHashtag,
};

const typeColors: Record<string, string> = {
  article: "text-blue-400",
  interview: "text-green-400",
  social: "text-pink-400",
};

export default function Press() {
  const t = useTranslations("press");
  const locale = useLocale() as "pt" | "en";
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const handleOpenMore = () => setShowAll(true);
    window.addEventListener("openPressMore", handleOpenMore);
    return () => window.removeEventListener("openPressMore", handleOpenMore);
  }, []);

  // Initial items: CNN and Estadão
  const visibleItems = showAll ? pressItems : pressItems.filter(item => ["cnn", "estadao"].includes(item.id));

  return (
    <section id="press" className="py-20 sm:py-28 bg-surface/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleItems.map((item, index) => {
            const TypeIcon = typeIcons[item.type] || FaNewspaper;
            const typeColor = typeColors[item.type] || "text-primary";

            return (
              <motion.a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                layout
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-surface rounded-2xl border border-border hover:border-primary/30 transition-all group block overflow-hidden"
              >
                {/* Image thumbnail */}
                {item.image && (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title[locale]}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                    
                    {/* Logo Overlay */}
                    {item.logo && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-lg">
                        <Image 
                          src={item.logo} 
                          alt={item.source} 
                          width={60} 
                          height={20} 
                          className="h-5 w-auto object-contain"
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <TypeIcon size={14} className={typeColor} />
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        {item.source}
                      </span>
                    </div>
                    <FaExternalLinkAlt
                      size={12}
                      className="text-muted group-hover:text-primary transition-colors shrink-0"
                    />
                  </div>
                  <h3 className="text-sm font-medium leading-relaxed text-muted group-hover:text-foreground transition-colors">
                    {item.title[locale]}
                  </h3>
                  <p className="mt-3 text-xs text-primary/70 group-hover:text-primary transition-colors">
                    {t("read_more")} →
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>

        {pressItems.length > 2 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-surface border border-border rounded-xl text-sm font-medium hover:border-primary/50 hover:text-primary transition-all"
            >
              {showAll ? t("view_less") : t("view_more")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
