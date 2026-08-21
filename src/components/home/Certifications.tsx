"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Award, ChevronDown, ChevronUp } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { certifications } from "@/data/personal";

export default function Certifications() {
  const [showAll, setShowAll] = useState(false);
  const displayedCerts = showAll ? certifications : certifications.slice(0, 6);

  return (
    <SectionWrapper id="certifications">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
            Continuous Learning
          </p>
          <h2
            id="certifications-heading"
            className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-text-primary"
          >
            Licenses & <span className="text-gradient">Certifications</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedCerts.map((cert, idx) => (
            <CertCard key={cert.id} cert={cert} index={idx} />
          ))}
        </div>

        {certifications.length > 6 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-border text-text-secondary hover:text-accent hover:border-accent transition-colors text-sm font-medium"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp size={16} />
                </>
              ) : (
                <>
                  Show All ({certifications.length}){" "}
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}

function CertCard({
  cert,
  index,
}: {
  cert: (typeof certifications)[number];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="p-4 rounded-xl bg-bg-card border border-border card-hover group"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-accent-subtle shrink-0 mt-0.5">
          <Award
            size={18}
            className="text-accent"
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors line-clamp-2">
            {cert.title}
          </h3>
          <p className="text-xs text-text-secondary mt-1">{cert.issuer}</p>
          <p className="text-xs text-text-muted mt-0.5">
            Issued {cert.date}
          </p>
          {cert.skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 text-[10px] rounded-full bg-bg-primary text-text-muted border border-border"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
