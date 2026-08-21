"use client";

import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { lectures, getAllLectureTags } from "@/data/lectures";
import LectureCard from "@/components/lectures/LectureCard";
import VideoModal from "@/components/lectures/VideoModal";
import type { Lecture } from "@/data/lectures";

export default function LecturesPage() {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);

  const allTags = useMemo(() => getAllLectureTags(), []);

  const filteredLectures = useMemo(() => {
    if (activeTags.length === 0) return lectures;
    return lectures.filter((lecture) =>
      activeTags.some((tag) => lecture.tags.includes(tag))
    );
  }, [activeTags]);

  const handleTagToggle = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
            Knowledge Sharing
          </p>
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-text-primary mb-3">
            Video <span className="text-gradient">Lectures</span>
          </h1>
          <p className="text-text-secondary max-w-2xl">
            Technical tutorials and walkthroughs covering robotics, mechanical
            design, IoT, and software engineering.
          </p>
        </div>
      </div>

      {/* Filters + Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTags([])}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTags.length === 0
                ? "bg-accent text-white"
                : "bg-bg-card text-text-secondary border border-border hover:border-accent hover:text-accent"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTags.includes(tag)
                  ? "bg-accent text-white"
                  : "bg-bg-card text-text-secondary border border-border hover:border-accent hover:text-accent"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredLectures.map((lecture, idx) => (
              <LectureCard
                key={lecture.id}
                lecture={lecture}
                index={idx}
                onPlay={setSelectedLecture}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredLectures.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-muted text-lg">
              No lectures match the selected filters.
            </p>
            <button
              onClick={() => setActiveTags([])}
              className="mt-4 text-accent hover:text-accent-hover transition-colors text-sm font-medium"
            >
              Show all lectures
            </button>
          </div>
        )}
      </div>

      {/* Video Modal */}
      <VideoModal
        lecture={selectedLecture}
        onClose={() => setSelectedLecture(null)}
      />
    </div>
  );
}
