"use client";

import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { projects, coreCategories, getAllTags } from "@/data/projects";
import FilterBar from "@/components/ui/FilterBar";
import ProjectCard from "@/components/projects/ProjectCard";

export default function ProjectsPage() {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const allTags = useMemo(() => getAllTags(), []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategories.length === 0 ||
        activeCategories.some((cat) => project.coreCategory.includes(cat));

      const matchesTags =
        activeTags.length === 0 ||
        activeTags.some((tag) => project.tags.includes(tag));

      return matchesCategory && matchesTags;
    });
  }, [activeCategories, activeTags]);

  const handleCategoryToggle = (category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleTagToggle = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearAll = () => {
    setActiveCategories([]);
    setActiveTags([]);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
            Portfolio
          </p>
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-text-primary mb-3">
            All <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-text-secondary max-w-2xl">
            Explore my engineering projects spanning robotics, mechanical
            design, IoT, and research — each demonstrating end-to-end problem
            solving.
          </p>
        </div>
      </div>

      {/* Filters + Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterBar
          categories={[...coreCategories]}
          tags={allTags}
          activeCategories={activeCategories}
          activeTags={activeTags}
          onCategoryToggle={handleCategoryToggle}
          onTagToggle={handleTagToggle}
          onClearAll={handleClearAll}
        />

        {/* Results count */}
        <p className="text-sm text-text-muted mt-6 mb-4">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={idx}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-muted text-lg">
              No projects match the selected filters.
            </p>
            <button
              onClick={handleClearAll}
              className="mt-4 text-accent hover:text-accent-hover transition-colors text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
