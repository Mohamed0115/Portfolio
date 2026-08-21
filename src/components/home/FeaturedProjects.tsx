"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { getFeaturedProjects } from "@/data/projects";

export default function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <SectionWrapper id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
            Featured Work
          </p>
          <h2
            id="projects-heading"
            className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-text-primary"
          >
            Selected <span className="text-gradient">Projects</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, idx) => (
            <ProjectPreviewCard key={project.slug} project={project} index={idx} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-text-primary font-medium hover:border-accent hover:text-accent transition-all"
          >
            View All Projects
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}

function ProjectPreviewCard({
  project,
  index,
}: {
  project: ReturnType<typeof getFeaturedProjects>[number];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="rounded-xl bg-bg-card border border-border overflow-hidden card-hover">
          {/* Thumbnail placeholder */}
          <div className="relative h-48 bg-bg-secondary overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `linear-gradient(135deg, var(--accent-gradient-from), var(--accent-gradient-to))`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-text-primary/20 font-[family-name:var(--font-poppins)]">
                {project.title
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 3)}
              </span>
            </div>
            {/* Categories */}
            <div className="absolute top-3 left-3 flex gap-2">
              {project.coreCategory.map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-1 text-xs font-medium rounded-md bg-accent/90 text-white"
                >
                  {cat}
                </span>
              ))}
            </div>
            {/* External link icon */}
            <div className="absolute top-3 right-3 p-2 rounded-lg bg-bg-card/80 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink size={16} />
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-semibold text-text-primary font-[family-name:var(--font-poppins)] mb-2 group-hover:text-accent transition-colors line-clamp-2">
              {project.title}
            </h3>
            <p className="text-sm text-text-muted mb-1">{project.timeline}</p>
            <p className="text-sm text-text-secondary line-clamp-2 mb-3">
              {project.subtitle}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs rounded-full bg-bg-primary text-text-muted border border-border"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="px-2 py-0.5 text-xs rounded-full text-text-muted">
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
