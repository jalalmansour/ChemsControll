"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Theme = "light" | "dark" | "system";
export type CustomColor = "green" | "blue" | "purple" | "orange" | "red";

interface ThemeContextType {
  theme: Theme;
  customColor: CustomColor;
  setTheme: (theme: Theme) => void;
  setCustomColor: (color: CustomColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("system");
  const [customColor, setCustomColor] = useState<CustomColor>("green");

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedTheme = localStorage.getItem("theme") as Theme;
    const savedColor = localStorage.getItem("customColor") as CustomColor;

    if (savedTheme) setTheme(savedTheme);
    if (savedColor) setCustomColor(savedColor);

    // Apply the theme to the document
    const isDark =
      savedTheme === "dark" ||
      (savedTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", isDark);

    // Apply custom color
    document.documentElement.setAttribute("data-color", savedColor || "green");
  }, []);

  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("customColor", customColor);

    // Apply theme
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }

    // Apply custom color
    document.documentElement.setAttribute("data-color", customColor);
  }, [theme, customColor]);

  return (
    <ThemeContext.Provider value={{ theme, customColor, setTheme, setCustomColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
