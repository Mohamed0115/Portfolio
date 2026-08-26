"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Building2,
  User,
  FileText,
  Download,
  ExternalLink,
  Image as ImageIcon,
  Presentation,
} from "lucide-react";
import TOCSidebar from "@/components/layout/TOCSidebar";
import VideoEmbed from "@/components/ui/VideoEmbed";
import ModelViewer from "@/components/ui/ModelViewer";
import APSViewer from "@/components/ui/APSViewer";
import CodeBlock from "@/components/ui/CodeBlock";
import type { Project, ActionButton } from "@/data/projects";

const actionIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  FileText,
  Download,
  ExternalLink,
  Image: ImageIcon,
  Presentation,
};

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({
  project,
}: ProjectDetailClientProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  // Lightbox: click handler for inline images (inside dangerouslySetInnerHTML)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" && target.closest(".inline-project-image")) {
        setLightboxSrc((target as HTMLImageElement).src);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Lightbox: close on Escape
  useEffect(() => {
    if (!lightboxSrc) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxSrc(null);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [lightboxSrc]);

  const openLightbox = useCallback((src: string) => setLightboxSrc(src), []);

  return (
    <div className="min-h-screen">
      {/* Lightbox overlay */}
      {lightboxSrc && (
        <div className="image-lightbox" onClick={() => setLightboxSrc(null)}>
          <button
            className="image-lightbox-close"
            onClick={(e) => { e.stopPropagation(); setLightboxSrc(null); }}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <img src={lightboxSrc} alt="Zoomed view" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* Header */}
      <div className="bg-bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-poppins)] text-text-primary mb-4">
            {project.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-text-secondary mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-accent" />
              {project.timeline}
            </span>
            <span className="flex items-center gap-1.5">
              <User size={14} className="text-accent" />
              {project.role}
            </span>
            {project.association && (
              <span className="flex items-center gap-1.5">
                <Building2 size={14} className="text-accent" />
                {project.association}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.coreCategory.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 text-xs font-medium rounded-lg bg-accent text-white"
              >
                {cat}
              </span>
            ))}
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-lg bg-bg-card text-text-secondary border border-border"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          {project.actionButtons.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {project.actionButtons.map((btn: ActionButton) => {
                const Icon = actionIconMap[btn.icon] || FileText;
                return (
                  <a
                    key={btn.label}
                    href={btn.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-bg-card border border-border text-text-primary hover:border-accent hover:text-accent transition-all text-sm font-medium"
                  >
                    <Icon size={16} />
                    {btn.label}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Content + TOC */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Description */}
            <p className="text-text-secondary leading-relaxed mb-10 text-base">
              {project.description}
            </p>

            {/* Sections */}
            {project.sections.map((section) => (
              <div key={section.id} className="mb-12">
                <h2
                  id={section.id}
                  className="text-xl md:text-2xl font-bold font-[family-name:var(--font-poppins)] text-text-primary mb-4 scroll-mt-24"
                >
                  {section.title}
                </h2>
                <div
                  className="text-text-secondary leading-relaxed mb-4 prose-content"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />

                {/* APS 3D Viewer (renders inside 3d-model section) */}
                {section.id === "3d-model" && project.apsModelUrn && (
                  <div className="mt-6 mb-4">
                    <APSViewer urn={project.apsModelUrn} />
                  </div>
                )}

                {/* Code blocks */}
                {section.codeBlocks && section.codeBlocks.length > 0 && (
                  <div className="mt-4">
                    {section.codeBlocks.map((block, idx) => (
                      <CodeBlock key={idx} code={block.code} language={block.language} />
                    ))}
                  </div>
                )}

                {/* Section media (for sections that still use media arrays) */}
                {section.media && section.media.length > 0 && (
                  <div className={`mt-6 ${
                    section.media.length >= 4
                      ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                      : section.media.length > 1
                      ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                      : "flex flex-col gap-4"
                  }`}>
                    {section.media.map((item, idx) =>
                      item.type === "youtube" || item.type === "vimeo" || item.type === "video" ? (
                        <div key={idx} className="col-span-full">
                          <VideoEmbed url={item.url} title={item.caption} />
                        </div>
                      ) : (
                        <div
                          key={idx}
                          className="rounded-xl border border-border overflow-hidden bg-bg-card section-media-image"
                          onClick={() => openLightbox(item.url)}
                        >
                          <img
                            src={item.url}
                            alt={item.caption || "Project image"}
                            className="w-full object-contain"
                            loading="lazy"
                          />
                          {item.caption && (
                            <p className="text-sm text-text-muted text-center py-2 px-3">
                              {item.caption}
                            </p>
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* 3D Model Viewer */}
            {project.cadModels && project.cadModels.length > 0 && (
              <div className="mb-12">
                <h2
                  id="3d-models"
                  className="text-xl md:text-2xl font-bold font-[family-name:var(--font-poppins)] text-text-primary mb-4 scroll-mt-24"
                >
                  Interactive 3D Models
                </h2>
                {project.cadModels.map((model, idx) => (
                  <div key={idx} className="mb-6">
                    <ModelViewer url={model.url} format={model.format} />
                    <p className="text-sm text-text-muted mt-2 text-center">
                      {model.filename}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TOC Sidebar */}
          <TOCSidebar />
        </div>
      </div>
    </div>
  );
}
