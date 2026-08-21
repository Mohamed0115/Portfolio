"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Bot,
  Cog,
  Cpu,
  Code,
  Terminal,
  Users,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { skillCategories } from "@/data/personal";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Bot,
  Cog,
  Cpu,
  Code,
  Terminal,
  Users,
};

export default function Skills() {
  return (
    <SectionWrapper id="skills" className="bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
            Technical Expertise
          </p>
          <h2
            id="skills-heading"
            className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-text-primary"
          >
            Skills & <span className="text-gradient">Competencies</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => {
            const Icon = iconMap[category.icon] || Code;
            return (
              <SkillCard
                key={category.title}
                category={category}
                Icon={Icon}
                index={idx}
              />
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

function SkillCard({
  category,
  Icon,
  index,
}: {
  category: (typeof skillCategories)[number];
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-6 rounded-xl bg-bg-card border border-border card-hover group"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-lg bg-accent-subtle group-hover:bg-accent group-hover:text-white transition-colors">
          <Icon size={22} className="text-accent group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary font-[family-name:var(--font-poppins)]">
          {category.title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 text-xs font-medium rounded-full bg-bg-primary text-text-secondary border border-border"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
