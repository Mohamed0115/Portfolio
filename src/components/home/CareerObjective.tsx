"use client";

import { Quote } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { personalInfo } from "@/data/personal";

export default function CareerObjective() {
  return (
    <SectionWrapper id="career-objective">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
            Vision
          </p>
          <h2
            id="career-objective-heading"
            className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-text-primary"
          >
            Career <span className="text-gradient">Objective</span>
          </h2>
        </div>

        <div className="relative p-8 md:p-12 rounded-2xl bg-bg-card border border-border">
          {/* Gradient accent left border */}
          <div
            className="absolute left-0 top-6 bottom-6 w-1 rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, var(--accent-gradient-from), var(--accent-gradient-to))",
            }}
          />

          <Quote
            size={40}
            className="text-accent/20 mb-4"
          />
          <p className="text-lg md:text-xl text-text-primary leading-relaxed font-medium italic">
            {personalInfo.careerObjective}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-10 h-px bg-accent" />
            <p className="text-sm text-accent font-medium">
              {personalInfo.name}
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
