"use client";

import { motion } from "framer-motion";

interface FilterBarProps {
  categories: string[];
  tags: string[];
  activeCategories: string[];
  activeTags: string[];
  onCategoryToggle: (category: string) => void;
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
}

export default function FilterBar({
  categories,
  tags,
  activeCategories,
  activeTags,
  onCategoryToggle,
  onTagToggle,
  onClearAll,
}: FilterBarProps) {
  const hasFilters = activeCategories.length > 0 || activeTags.length > 0;

  return (
    <div className="space-y-4">
      {/* Core Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryToggle(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategories.includes(cat)
                ? "bg-accent text-white shadow-md"
                : "bg-bg-card text-text-secondary border border-border hover:border-accent hover:text-accent"
            }`}
          >
            {cat}
          </button>
        ))}
        {hasFilters && (
          <button
            onClick={onClearAll}
            className="px-4 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-accent transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <motion.button
            key={tag}
            layout
            onClick={() => onTagToggle(tag)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTags.includes(tag)
                ? "bg-accent-subtle text-accent border border-accent"
                : "bg-bg-card text-text-muted border border-border hover:border-border-hover hover:text-text-secondary"
            }`}
          >
            {tag}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
