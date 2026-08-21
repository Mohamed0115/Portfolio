"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Lecture } from "@/data/lectures";

interface LectureCardProps {
  lecture: Lecture;
  index: number;
  onPlay: (lecture: Lecture) => void;
}

export default function LectureCard({
  lecture,
  index,
  onPlay,
}: LectureCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <button
        onClick={() => onPlay(lecture)}
        className="group block w-full text-left h-full"
      >
        <div className="h-full rounded-xl bg-bg-card border border-border overflow-hidden card-hover flex flex-col">
          {/* Thumbnail - 2/3 */}
          <div className="relative h-48 bg-bg-secondary overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `linear-gradient(135deg, var(--accent-gradient-from), var(--accent-gradient-to))`,
              }}
            />
            {/* Play icon overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center shadow-lg group-hover:bg-accent group-hover:scale-110 transition-all">
                <Play size={28} className="text-white ml-1" fill="white" />
              </div>
            </div>
            {/* Duration badge */}
            {lecture.duration && (
              <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/70 text-white text-xs font-medium">
                {lecture.duration}
              </div>
            )}
            {/* Coming soon badge */}
            {lecture.date === "Coming Soon" && (
              <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-accent/90 text-white text-xs font-medium">
                Coming Soon
              </div>
            )}
          </div>

          {/* Content - 1/3 */}
          <div className="p-4 flex flex-col flex-1">
            <h3 className="text-sm font-semibold text-text-primary font-[family-name:var(--font-poppins)] mb-1.5 group-hover:text-accent transition-colors line-clamp-2">
              {lecture.title}
            </h3>
            <p className="text-xs text-text-secondary line-clamp-2 mb-3 flex-1">
              {lecture.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {lecture.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] rounded-full bg-bg-primary text-text-muted border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
}
