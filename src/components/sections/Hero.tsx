"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";


const techBadges = ["React Native", "Node.js", "TypeScript", "Python", "Firebase"];

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-primary/8 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-accent/8 rounded-full blur-3xl animate-pulse" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-mono mb-5"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {t("available")}
            </motion.div>

            <p className="text-primary font-mono text-sm sm:text-base mb-3 tracking-wider">
              {t("greeting")}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              {t("name")}
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-muted mb-6 font-light">
              {t("role")}
            </h2>
            <p className="text-muted max-w-xl mx-auto lg:mx-0 mb-6 text-sm sm:text-base leading-relaxed">
              {t("description")}
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
              {techBadges.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono bg-surface border border-border rounded-lg text-muted hover:border-primary/40 hover:text-primary transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a
                href="#projects"
                className="px-8 py-3.5 bg-primary text-background font-semibold rounded-xl hover:bg-primary-hover transition-all hover:shadow-lg hover:shadow-primary/25 glow-primary"
              >
                {t("cta_work")}
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 border border-primary/50 text-primary font-semibold rounded-xl hover:bg-primary/10 transition-all"
              >
                {t("cta_hire")}
              </a>
            </div>
          </motion.div>

          {/* Professional photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative shrink-0"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-3 rounded-full border border-accent/15 animate-[spin_25s_linear_infinite_reverse]" />

              {/* Photo container */}
              <div className="absolute inset-6 rounded-full overflow-hidden border-2 border-primary/30 shadow-xl shadow-primary/20">
                <Image
                  src="/Portfolio/images/victor/profile.png"
                  alt="Victor Theodoro"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                />
              </div>

              {/* Glowing dots */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50" />
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-accent rounded-full shadow-lg shadow-accent/50" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-muted/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted/50 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}