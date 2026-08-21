"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { experiences } from "@/data/personal";

export default function Experience() {
  return (
    <SectionWrapper id="experience" className="bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
            Professional Journey
          </p>
          <h2
            id="experience-heading"
            className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-text-primary"
          >
            Work <span className="text-gradient">Experience</span>
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {experiences.map((exp, idx) => (
            <TimelineItem key={exp.id} experience={exp} index={idx} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function TimelineItem({
  experience,
  index,
}: {
  experience: (typeof experiences)[number];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`relative flex items-start mb-12 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Dot */}
      <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent border-2 border-bg-primary -translate-x-1.5 md:-translate-x-1.5 mt-6 z-10" />

      {/* Spacer for mobile */}
      <div className="w-12 md:hidden shrink-0" />

      {/* Card */}
      <div
        className={`flex-1 ${
          isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
        }`}
      >
        <div className="p-5 rounded-xl bg-bg-card border border-border card-hover">
          <div
            className={`flex items-center gap-2 mb-2 text-accent text-sm font-medium ${
              isLeft ? "md:justify-end" : ""
            }`}
          >
            <Calendar size={14} />
            {experience.period}
          </div>
          <h3 className="text-lg font-semibold text-text-primary font-[family-name:var(--font-poppins)] mb-1">
            {experience.role}
          </h3>
          <div
            className={`flex items-center gap-2 text-text-secondary text-sm mb-1 ${
              isLeft ? "md:justify-end" : ""
            }`}
          >
            <Briefcase size={14} />
            {experience.company} · {experience.type}
          </div>
          <div
            className={`flex items-center gap-2 text-text-muted text-xs mb-3 ${
              isLeft ? "md:justify-end" : ""
            }`}
          >
            <MapPin size={12} />
            {experience.location} · {experience.locationType}
          </div>
          {experience.description && (
            <p className="text-sm text-text-secondary mb-3 leading-relaxed">
              {experience.description}
            </p>
          )}
          <div
            className={`flex flex-wrap gap-1.5 ${
              isLeft ? "md:justify-end" : ""
            }`}
          >
            {experience.skills.slice(0, 5).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 text-xs rounded-full bg-bg-primary text-text-muted border border-border"
              >
                {skill}
              </span>
            ))}
            {experience.skills.length > 5 && (
              <span className="px-2 py-0.5 text-xs text-text-muted">
                +{experience.skills.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Spacer for desktop */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
}
