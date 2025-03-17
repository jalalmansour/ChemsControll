"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { motion } from "framer-motion";

export function LoadingScreen() {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-background z-50">
      <motion.div
        className="flex flex-col items-center justify-center gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Logo */}
        <div className="relative">
          <motion.div
            className="w-32 h-32 rounded-full bg-green-gradient flex items-center justify-center glow glow-primary overflow-hidden"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-4xl font-bold text-white">CC</span>
          </motion.div>
          <motion.div
            className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            AI
          </motion.div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 green-gradient-text">chemsControll</h1>
          <p className="text-foreground/80">{t("home.subtitle")}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>

        <p className="text-sm text-muted-foreground">{t("general.loading")}</p>
      </motion.div>
    </div>
  );
}
