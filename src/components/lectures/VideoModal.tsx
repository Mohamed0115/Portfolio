"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Lecture } from "@/data/lectures";

interface VideoModalProps {
  lecture: Lecture | null;
  onClose: () => void;
}

export default function VideoModal({ lecture, onClose }: VideoModalProps) {
  return (
    <AnimatePresence>
      {lecture && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-12 lg:inset-20 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-poppins)] truncate pr-4">
                {lecture.title}
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Video */}
            <div className="relative flex-1 rounded-xl overflow-hidden bg-black">
              <iframe
                src={lecture.videoUrl}
                title={lecture.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Description */}
            <div className="mt-4">
              <p className="text-sm text-gray-300">{lecture.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {lecture.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
