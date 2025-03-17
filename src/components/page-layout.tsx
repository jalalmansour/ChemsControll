"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageLayoutProps {
  children: React.ReactNode;
  showGradientBackground?: boolean;
  fullWidth?: boolean;
}

export default function PageLayout({
  children,
  showGradientBackground = false,
  fullWidth = false,
}: PageLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-1 ${showGradientBackground ? "bg-gradient-to-br from-background to-muted" : ""}`}
        >
          {fullWidth ? (
            children
          ) : (
            <div className="container mx-auto px-4 py-6">
              {children}
            </div>
          )}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
