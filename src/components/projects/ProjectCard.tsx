"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/projects/${project.slug}`} className="group block h-full">
        <div className="h-full rounded-xl bg-bg-card border border-border overflow-hidden card-hover flex flex-col">
          {/* Thumbnail */}
          <div className="relative h-44 bg-bg-secondary overflow-hidden">
            <div
              className="absolute inset-0 opacity-25"
              style={{
                background: `linear-gradient(135deg, var(--accent-gradient-from), var(--accent-gradient-to))`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-bold text-text-primary/10 font-[family-name:var(--font-poppins)]">
                {project.title
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 3)}
              </span>
            </div>
            {/* Categories */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              {project.coreCategory.map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-0.5 text-xs font-medium rounded-md bg-accent/90 text-white"
                >
                  {cat}
                </span>
              ))}
            </div>
            {/* External icon */}
            <div className="absolute top-3 right-3 p-1.5 rounded-md bg-bg-card/80 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink size={14} />
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
              <span>{project.timeline}</span>
              {project.association && (
                <>
                  <span>·</span>
                  <span>{project.association}</span>
                </>
              )}
            </div>
            <h3 className="text-base font-semibold text-text-primary font-[family-name:var(--font-poppins)] mb-2 group-hover:text-accent transition-colors line-clamp-2">
              {project.title}
            </h3>
            <p className="text-sm text-text-secondary line-clamp-3 mb-4 flex-1">
              {project.subtitle}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[11px] rounded-full bg-bg-primary text-text-muted border border-border"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="px-2 py-0.5 text-[11px] text-text-muted">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
