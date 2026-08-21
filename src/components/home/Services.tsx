"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, Wrench, Wifi, BarChart3 } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { services } from "@/data/personal";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Bot,
  Wrench,
  Wifi,
  BarChart3,
};

export default function Services() {
  return (
    <SectionWrapper id="services" className="bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
            What I Offer
          </p>
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-text-primary"
          >
            Professional <span className="text-gradient">Services</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((service, idx) => {
            const Icon = iconMap[service.icon] || Bot;
            return (
              <ServiceCard
                key={service.title}
                service={service}
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

function ServiceCard({
  service,
  Icon,
  index,
}: {
  service: (typeof services)[number];
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
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="p-6 rounded-xl bg-bg-card border border-border card-hover group relative overflow-hidden"
    >
      {/* Accent gradient line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            "linear-gradient(90deg, var(--accent-gradient-from), var(--accent-gradient-to))",
        }}
      />

      <div className="p-3 rounded-xl bg-accent-subtle w-fit mb-4 group-hover:bg-accent transition-colors">
        <Icon
          size={28}
          className="text-accent group-hover:text-white transition-colors"
        />
      </div>
      <h3 className="text-lg font-semibold text-text-primary font-[family-name:var(--font-poppins)] mb-2">
        {service.title}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  );
}
