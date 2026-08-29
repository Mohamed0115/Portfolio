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
  const [progress, setProgress] = useState(0);
  const isClickScrolling = useRef(false);
  const scrollLockTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Detect headings
    const headings = document.querySelectorAll("h2[id], h3[id]");
    const tocItems: TOCItem[] = Array.from(headings).map((h) => ({
      id: h.id,
      text: h.textContent || "",
      level: parseInt(h.tagName[1]),
    }));
    setItems(tocItems);

    // Scroll-based active heading detection
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);

      // If user just clicked a TOC link, skip scroll detection until smooth scroll finishes
      if (isClickScrolling.current) return;

      const headingsArr = document.querySelectorAll("h2[id], h3[id]");
      if (headingsArr.length === 0) return;

      // Bottom of page: activate last section
      if (docHeight > 0 && scrollTop >= docHeight - 40) {
        setActiveId(headingsArr[headingsArr.length - 1].id);
        return;
      }

      // Find the active heading: the last heading whose top has reached near the navbar (<= 140px)
      let currentId = "";
      for (const h of headingsArr) {
        const rect = h.getBoundingClientRect();
        if (rect.top <= 140) {
          currentId = h.id;
        }
      }

      if (currentId) {
        setActiveId(currentId);
      } else {
        // At the very top of page before first heading
        setActiveId(headingsArr[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollLockTimer.current) clearTimeout(scrollLockTimer.current);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      
      isClickScrolling.current = true;
      setActiveId(id);
      setIsOpen(false);
      
      window.scrollTo({ top: y, behavior: "smooth" });

      if (scrollLockTimer.current) clearTimeout(scrollLockTimer.current);
      scrollLockTimer.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 700);
    }
  };

  // Get the index of a section (h2 only, for numbering)
  const getH2Index = (item: TOCItem, index: number) => {
    if (item.level !== 2) return null;
    const h2Items = items.filter((i) => i.level === 2);
    return h2Items.indexOf(item) + 1;
  };

  if (items.length === 0) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block sticky top-24 self-start w-72 shrink-0">
        <div className="pl-6 border-l-2 border-border relative">
          {/* Progress bar on the border */}
          <div
            className="absolute left-[-2px] top-0 w-[2px] bg-accent transition-all duration-200 rounded-full"
            style={{ height: `${progress * 100}%` }}
          />

          <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-5 flex items-center gap-2">
            <List size={14} />
            On This Page
          </h4>
          <nav className="flex flex-col gap-0.5">
            {items.map((item, index) => {
              const h2Num = getH2Index(item, index);
              const isActive = activeId === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`group text-left py-2 px-3 rounded-lg transition-all duration-200 ${
                    item.level === 3 ? "pl-8" : "pl-3"
                  } ${
                    isActive
                      ? "bg-accent-subtle text-accent font-semibold"
                      : "text-text-muted hover:text-text-secondary hover:bg-bg-card"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {/* Number badge for h2 */}
                    {h2Num !== null && (
                      <span
                        className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold shrink-0 transition-colors ${
                          isActive
                            ? "bg-accent text-white"
                            : "bg-bg-card text-text-muted group-hover:bg-accent/20 group-hover:text-accent"
                        }`}
                      >
                        {h2Num}
                      </span>
                    )}
                    {/* Arrow for h3 sub-items */}
                    {item.level === 3 && (
                      <ChevronRight
                        size={12}
                        className={`shrink-0 transition-colors ${
                          isActive ? "text-accent" : "text-text-muted"
                        }`}
                      />
                    )}
                    <span className="line-clamp-2 text-sm">{item.text}</span>
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Scroll progress indicator */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <span>{Math.round(progress * 100)}%</span>
              <div className="flex-1 h-1 bg-bg-card rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-200"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile TOC Button — enhanced with section count badge */}
      <div className="lg:hidden fixed bottom-20 right-4 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-white shadow-lg hover:bg-accent-hover transition-colors"
        >
          <List size={18} />
          <span className="text-sm font-medium">Contents</span>
          {/* Section count badge */}
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-white text-accent text-[10px] font-bold shadow-sm">
            {items.filter((i) => i.level === 2).length}
          </span>
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
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                      Table of Contents
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-bold">
                      {items.filter((i) => i.level === 2).length} sections
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 text-text-muted hover:text-text-primary"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile progress */}
                <div className="mb-4 flex items-center gap-2 text-xs text-text-muted">
                  <span>{Math.round(progress * 100)}% read</span>
                  <div className="flex-1 h-1.5 bg-bg-card rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-200"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                </div>

                <nav className="flex flex-col gap-1">
                  {items.map((item, index) => {
                    const h2Num = getH2Index(item, index);
                    const isActive = activeId === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={`text-left py-3 px-3 rounded-lg transition-colors ${
                          item.level === 3 ? "pl-10" : "pl-3"
                        } ${
                          isActive
                            ? "bg-accent-subtle text-accent font-semibold"
                            : "text-text-secondary hover:bg-bg-card"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          {h2Num !== null && (
                            <span
                              className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 ${
                                isActive
                                  ? "bg-accent text-white"
                                  : "bg-bg-card text-text-muted"
                              }`}
                            >
                              {h2Num}
                            </span>
                          )}
                          {item.level === 3 && (
                            <ChevronRight
                              size={14}
                              className={`shrink-0 ${
                                isActive ? "text-accent" : "text-text-muted"
                              }`}
                            />
                          )}
                          <span className="text-sm">{item.text}</span>
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
