"use client";

import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { personalInfo } from "@/data/personal";

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Gradient border ring */}
              <div
                className="absolute -inset-1 rounded-2xl opacity-60 blur-sm"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-gradient-from), var(--accent-gradient-to))",
                }}
              />
              <div className="relative rounded-2xl overflow-hidden border-2 border-border w-72 h-80 sm:w-80 sm:h-96">
                <Image
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 288px, 320px"
                  priority
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium shadow-lg">
                Cairo University
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
              About Me
            </p>
            <h2 id="about-heading" className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-text-primary mb-6">
              Engineering the Future of{" "}
              <span className="text-gradient">Intelligent Machines</span>
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              {personalInfo.about.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Quick info cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { label: "Location", value: "Cairo, Egypt" },
                { label: "University", value: "Cairo University" },
                { label: "Focus", value: "Robotics & IIoT" },
                { label: "Status", value: "Open to Opportunities" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-3 rounded-lg bg-bg-card border border-border"
                >
                  <p className="text-xs text-text-muted mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-text-primary">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
