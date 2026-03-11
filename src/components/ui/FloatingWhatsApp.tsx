"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations("hero");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://wa.me/5513996016551"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-6 right-20 z-50 p-3 bg-green-600 text-white rounded-full shadow-lg shadow-green-600/30 hover:bg-green-500 transition-colors"
          aria-label="WhatsApp"
        >
          <FaWhatsapp size={22} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
