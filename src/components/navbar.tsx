"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/contexts/theme-context";
import { useLanguage, supportedLanguages, LanguageCode } from "@/contexts/language-context";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  Search,
  Menu,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { theme, setTheme, customColor, setCustomColor } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Handle scrolling to add shadow to navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links
  const navLinks = [
    { name: t("nav.dashboard"), href: "/" },
    { name: t("nav.hydroponicsCore"), href: "/hydroponics" },
    { name: t("nav.iotDevices"), href: "/iot" },
    { name: t("nav.aiAnalytics"), href: "/ai" },
    { name: t("nav.sustainability"), href: "/sustainability" },
    { name: t("nav.help"), href: "/help" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md transition-all duration-200 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm">CC</span>
            </div>
            <span className="green-gradient-text">chemsControll</span>
          </Link>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Right side: Search, Theme, Language, User */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("nav.search")}
              className="w-[180px] lg:w-[240px] pl-8 rounded-full bg-muted/50"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Settings className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="font-semibold">
                {supportedLanguages.find(lang => lang.code === language)?.flag}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {supportedLanguages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as LanguageCode)}
                  className={language === lang.code ? "bg-accent/20" : ""}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Color Theme Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full relative overflow-hidden"
                style={{ backgroundColor: `var(--primary)` }}
              >
                <div className="w-3 h-3 rounded-full bg-primary-foreground"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setCustomColor("green")}>
                <div className="w-4 h-4 rounded-full bg-theme-green-primary mr-2" />
                Green
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCustomColor("blue")}>
                <div className="w-4 h-4 rounded-full bg-theme-blue-primary mr-2" />
                Blue
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCustomColor("purple")}>
                <div className="w-4 h-4 rounded-full bg-theme-purple-primary mr-2" />
                Purple
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCustomColor("orange")}>
                <div className="w-4 h-4 rounded-full bg-theme-orange-primary mr-2" />
                Orange
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCustomColor("red")}>
                <div className="w-4 h-4 rounded-full bg-theme-red-primary mr-2" />
                Red
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={18} />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[280px]">
              <div className="px-4 py-2 font-medium border-b">
                {t("nav.notifications")}
              </div>
              <div className="py-2">
                {[1, 2, 3].map((n) => (
                  <DropdownMenuItem key={n} className="flex flex-col items-start p-3 gap-1">
                    <div className="font-medium">
                      {n === 1 && "pH Level Warning"}
                      {n === 2 && "Nutrient Mix Updated"}
                      {n === 3 && "System Maintenance"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {n === 1 && "pH levels reached 6.8. Consider adjusting."}
                      {n === 2 && "AI updated nutrient mix for better yield."}
                      {n === 3 && "Scheduled maintenance in 2 days."}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">
                      {n * 10} min ago
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <div className="p-2 border-t">
                <Button variant="ghost" size="sm" className="w-full">
                  {t("nav.notifications")}
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  {t("nav.profile")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/preferences">
                  <Settings className="mr-2 h-4 w-4" />
                  {t("nav.settings")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                {t("nav.logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-2">
                <div className="relative flex items-center mb-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={t("nav.search")}
                    className="w-full pl-8 rounded-full bg-muted/50"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
