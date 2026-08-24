"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certs" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export default function SectionNav() {
  const [activeId, setActiveId] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  // Scroll-position-based active section detection (more reliable than IntersectionObserver)
  const updateActiveSection = useCallback(() => {
    if (!isHome) return;

    const scrollY = window.scrollY;
    setIsVisible(scrollY > 300);

    // Find which section is currently in view by checking each section's position
    let currentId = "hero";
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        // Section is "active" when its top is above the center of the viewport
        if (rect.top <= window.innerHeight * 0.4) {
          currentId = id;
        }
      }
    }
    setActiveId(currentId);
  }, [isHome]);

  useEffect(() => {
    if (!isHome) return;

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    updateActiveSection(); // Initial check

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, [isHome, updateActiveSection]);

  if (!isHome) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-2"
          aria-label="Section navigation"
        >
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="group flex items-center gap-2"
              aria-label={`Go to ${label}`}
            >
              {/* Label - visible on hover */}
              <span
                className={`text-xs font-medium px-2 py-1 rounded-md transition-all duration-200 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 ${
                  activeId === id
                    ? "text-accent bg-accent-subtle"
                    : "text-text-secondary bg-bg-card"
                }`}
              >
                {label}
              </span>

              {/* Dot indicator */}
              <span className="relative flex items-center justify-center">
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    activeId === id
                      ? "w-3 h-3 bg-accent shadow-[0_0_8px_var(--accent-primary)]"
                      : "w-2 h-2 bg-text-muted group-hover:bg-accent group-hover:scale-125"
                  }`}
                />
                {activeId === id && (
                  <motion.span
                    layoutId="section-nav-ring"
                    className="absolute inset-[-3px] rounded-full border-2 border-accent/40"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </span>
            </button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
