"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export default function SectionTitle({ title, subtitle, align = "center" }: SectionTitleProps) {
  const isCenter = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${isCenter ? "text-center" : "text-left"}`}
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
      {subtitle && (
        <p className={`text-muted text-sm sm:text-base ${isCenter ? "max-w-2xl mx-auto" : "max-w-2xl"}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-6 w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full ${isCenter ? "mx-auto" : ""}`} />
    </motion.div>
  );
}
