"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  Palette,
  Download,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { personalInfo } from "@/data/personal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/lectures", label: "Lectures" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme, toggleColorScheme, colorScheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="text-lg md:text-xl font-bold font-[family-name:var(--font-poppins)] text-text-primary hover:text-accent transition-colors"
            >
              <span className="text-gradient">&lt;</span>
              {personalInfo.name.split(" ")[0]}
              <span className="text-gradient">/&gt;</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    pathname === link.href
                      ? "text-accent"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-2">
              {/* Color scheme toggle */}
              <button
                onClick={toggleColorScheme}
                className="p-2 rounded-lg text-text-secondary hover:text-accent hover:bg-accent-subtle transition-colors"
                aria-label="Toggle color scheme"
                title={`Switch to ${colorScheme === "blue" ? "gold" : "blue"} theme`}
              >
                <Palette size={18} />
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-text-secondary hover:text-accent hover:bg-accent-subtle transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Resume */}
              <a
                href={personalInfo.resumeUrl}
                download
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors"
              >
                <Download size={16} />
                Resume
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-bg-secondary border-l border-border z-50 md:hidden"
            >
              <div className="flex flex-col h-full p-6 pt-20">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        pathname === link.href
                          ? "bg-accent-subtle text-accent"
                          : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleColorScheme}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-text-secondary hover:text-accent transition-colors"
                    >
                      <Palette size={18} />
                      {colorScheme === "blue" ? "Gold" : "Blue"}
                    </button>
                    <button
                      onClick={toggleTheme}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-text-secondary hover:text-accent transition-colors"
                    >
                      {theme === "dark" ? (
                        <>
                          <Sun size={18} /> Light
                        </>
                      ) : (
                        <>
                          <Moon size={18} /> Dark
                        </>
                      )}
                    </button>
                  </div>
                  <a
                    href={personalInfo.resumeUrl}
                    download
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors font-medium"
                  >
                    <Download size={18} />
                    Download Resume
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  );
}
