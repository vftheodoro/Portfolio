"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Image
          src="/images/victor/vt-logo.png"
          alt="VT"
          width={56}
          height={56}
          className="drop-shadow-[0_0_16px_rgba(6,182,212,0.5)] object-contain mx-auto"
        />
      </motion.div>

      {/* 404 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="text-8xl sm:text-9xl font-black mb-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent select-none">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3">
          Página não encontrada
        </h2>
        <p className="text-muted max-w-md mx-auto mb-10 leading-relaxed">
          Esta página não existe ou foi removida. Volte para o portfólio e
          continue explorando meu trabalho.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-7 py-3 bg-primary text-background font-semibold rounded-xl hover:bg-primary-hover transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            ← Voltar ao início
          </Link>
          <Link
            href="/#contact"
            className="px-7 py-3 border border-primary/40 text-primary font-semibold rounded-xl hover:bg-primary/10 transition-all"
          >
            Entrar em contato
          </Link>
        </div>
      </motion.div>

      {/* decorative dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
