"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, ChevronRight } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TOCSidebar() {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Detect headings
    const headings = document.querySelectorAll("h2[id], h3[id]");
    const tocItems: TOCItem[] = Array.from(headings).map((h) => ({
      id: h.id,
      text: h.textContent || "",
      level: parseInt(h.tagName[1]),
    }));
    setItems(tocItems);

    // Scroll spy
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            const rectA = a.boundingClientRect;
            const rectB = b.boundingClientRect;
            return rectA.top - rectB.top;
          });
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0.1,
      }
    );

    headings.forEach((h) => observerRef.current?.observe(h));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
      setIsOpen(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block sticky top-24 self-start w-64 shrink-0">
        <div className="pl-6 border-l border-border">
          <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4">
            On this page
          </h4>
          <nav className="flex flex-col gap-1">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left text-sm py-1.5 transition-colors ${
                  item.level === 3 ? "pl-4" : "pl-0"
                } ${
                  activeId === item.id
                    ? "text-accent font-medium"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {activeId === item.id && (
                    <ChevronRight size={12} className="text-accent shrink-0" />
                  )}
                  <span className="line-clamp-2">{item.text}</span>
                </span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile TOC Button */}
      <div className="lg:hidden fixed bottom-20 right-4 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-accent text-white shadow-lg hover:bg-accent-hover transition-colors"
        >
          <List size={18} />
          <span className="text-sm font-medium">Contents</span>
        </button>
      </div>

      {/* Mobile TOC Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 max-h-[70vh] bg-bg-secondary rounded-t-2xl border-t border-border z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                    Table of Contents
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 text-text-muted hover:text-text-primary"
                  >
                    <X size={20} />
                  </button>
                </div>
                <nav className="flex flex-col gap-1">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`text-left text-sm py-2.5 px-3 rounded-lg transition-colors ${
                        item.level === 3 ? "pl-7" : "pl-3"
                      } ${
                        activeId === item.id
                          ? "bg-accent-subtle text-accent font-medium"
                          : "text-text-secondary hover:bg-bg-card"
                      }`}
                    >
                      {item.text}
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
