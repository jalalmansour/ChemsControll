"use client";

import React from "react";
import { useLanguage } from "@/contexts/language-context";
import PageLayout from "@/components/page-layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, BugOff } from "lucide-react";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <PageLayout>
      <motion.div
        className="flex flex-col items-center justify-center text-center py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-9xl font-bold mb-8 text-primary opacity-20"
        >
          404
        </motion.div>

        <h1 className="text-4xl font-bold mb-4">{t("error.404")}</h1>

        <div className="flex items-center gap-4 mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, repeatType: "loop" }}
          >
            🌱
          </motion.div>
          <p className="text-xl text-muted-foreground">
            {t("error.message")}
          </p>
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, repeatType: "loop", delay: 0.5 }}
          >
            🌱
          </motion.div>
        </div>

        <div className="flex gap-4">
          <Button asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home size={16} />
              {t("error.returnHome")}
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/help" className="flex items-center gap-2">
              <BugOff size={16} />
              {t("error.reportIssue")}
            </Link>
          </Button>
        </div>
      </motion.div>
    </PageLayout>
  );
}
