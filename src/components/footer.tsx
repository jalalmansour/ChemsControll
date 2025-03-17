"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Facebook, Twitter, Instagram, Github, Youtube, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  // Footer links organized by category
  const footerLinks = [
    {
      title: t("footer.aboutUs"),
      links: [
        { name: t("footer.aboutUs"), href: "/about" },
        { name: t("footer.careers"), href: "/careers" },
        { name: t("footer.blog"), href: "/blog" },
        { name: t("footer.contact"), href: "/contact" },
      ],
    },
    {
      title: t("help.title"),
      links: [
        { name: t("help.knowledgeBase"), href: "/help/knowledge-base" },
        { name: t("help.setupGuides"), href: "/help/setup-guides" },
        { name: t("help.troubleshooting"), href: "/help/troubleshooting" },
        { name: t("help.communityForum"), href: "/community" },
      ],
    },
    {
      title: t("footer.privacyPolicy"),
      links: [
        { name: t("footer.privacyPolicy"), href: "/privacy" },
        { name: t("footer.termsOfService"), href: "/terms" },
        { name: "GDPR", href: "/gdpr" },
        { name: "API", href: "/api-docs" },
      ],
    },
  ];

  // Social media links
  const socialLinks = [
    { icon: <Instagram size={20} />, href: "https://instagram.com/chemscontroll", name: "Instagram" },
    { icon: <Twitter size={20} />, href: "https://twitter.com/chemscontroll", name: "Twitter" },
    { icon: <Github size={20} />, href: "https://github.com/chemscoop", name: "GitHub" },
    { icon: <Youtube size={20} />, href: "https://youtube.com/chemscontroll", name: "YouTube" },
    { icon: <Linkedin size={20} />, href: "https://linkedin.com/company/chemscoop", name: "LinkedIn" },
    { icon: <Facebook size={20} />, href: "https://facebook.com/chemscontroll", name: "Facebook" },
  ];

  return (
    <footer className="relative bg-background mt-20">
      {/* Wave divider effect */}
      <svg
        className="absolute top-0 w-full -translate-y-full h-20 text-background"
        preserveAspectRatio="none"
        viewBox="0 0 1440 54"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 22L48 17.3C96 13 192 4 288 0C384 -4 480 -2 576 10.3C672 22 768 44 864 48.7C960 54 1056 40 1152 31.7C1248 22 1344 18 1392 15.3L1440 13V54H1392C1344 54 1248 54 1152 54C1056 54 960 54 864 54C768 54 672 54 576 54C480 54 384 54 288 54C192 54 96 54 48 54H0V22Z" />
      </svg>

      <div className="container mx-auto px-4 py-12">
        {/* Upper section with links and subscription */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-sm">CC</span>
              </div>
              <span className="green-gradient-text">chemsControll</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Advanced IoT hydroponics platform with AI integration, designed by chemsCoop for sustainable and efficient plant growth management.
            </p>
            {/* Newsletter signup */}
            <div className="flex flex-col space-y-4">
              <h3 className="font-medium">{t("footer.newsletter")}</h3>
              <div className="flex gap-2">
                <Input placeholder="email@example.com" className="max-w-[240px]" />
                <Button type="submit" size="icon">
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </div>

          {/* Footer link categories */}
          {footerLinks.map((category, i) => (
            <div key={i} className="flex flex-col">
              <h3 className="font-medium mb-4">{category.title}</h3>
              <ul className="space-y-3">
                {category.links.map((link, j) => (
                  <motion.li
                    key={j}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-border my-8" />

        {/* Lower section with copyright and social */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} chemsCoop. {t("footer.allRightsReserved")}
          </p>

          {/* Social media links */}
          <div className="flex gap-4">
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
