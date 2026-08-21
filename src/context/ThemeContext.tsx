"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
type ColorScheme = "blue" | "gold";

interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  toggleTheme: () => void;
  toggleColorScheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [colorScheme, setColorScheme] = useState<ColorScheme>("blue");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("portfolio-theme") as Theme;
    const savedScheme = localStorage.getItem(
      "portfolio-color-scheme"
    ) as ColorScheme;
    if (savedTheme) setTheme(savedTheme);
    if (savedScheme) setColorScheme(savedScheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    root.setAttribute("data-color-scheme", colorScheme);

    localStorage.setItem("portfolio-theme", theme);
    localStorage.setItem("portfolio-color-scheme", colorScheme);
  }, [theme, colorScheme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleColorScheme = () => {
    setColorScheme((prev) => (prev === "blue" ? "gold" : "blue"));
  };

  if (!mounted) {
    return (
      <div className="dark" data-color-scheme="blue">
        {children}
      </div>
    );
  }

  return (
    <ThemeContext.Provider
      value={{ theme, colorScheme, toggleTheme, toggleColorScheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return defaults during SSG prerendering
    return {
      theme: "dark" as Theme,
      colorScheme: "blue" as ColorScheme,
      toggleTheme: () => {},
      toggleColorScheme: () => {},
    };
  }
  return context;
}
