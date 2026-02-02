"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Globe, Building, DollarSign, Award } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Sovereign Trust",
    description:
      "Vetted partner to high-level national security and infrastructure agencies.",
  },
  {
    icon: Building,
    title: "Digital & Physical Convergence",
    description:
      "One of the few firms that can build physical infrastructure while deploying cybersecurity systems.",
  },
  {
    icon: CheckCircle,
    title: "Localized Advantage",
    description:
      "Commitment to local manufacturing and technology transfer reduces foreign dependency.",
  },
  {
    icon: DollarSign,
    title: "Financial Muscle",
    description:
      "Multi-billion Naira capital structure allows instant resource mobilization.",
  },
  {
    icon: Globe,
    title: "Global Standards",
    description:
      "Partnerships in Dubai, China, and Europe ensure international best practices.",
  },
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="divider-accent" />
            <h2 className="section-title">Why Choose Vinicius Group?</h2>
            <p className="section-subtitle">
              The power to execute, the stability to sustain
            </p>
          </motion.div>
        </div>

        {/* Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              className="card-elevated group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 transition-colors group-hover:bg-primary">
                <reason.icon className="w-7 h-7 text-primary transition-colors group-hover:text-primary-foreground" />
              </div>
              <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Financial Strength Banner */}
        <motion.div
          className="mt-10 sm:mt-16 relative overflow-hidden rounded-2xl bg-foreground text-background p-6 sm:p-8 lg:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }} />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold mb-3 sm:mb-4">
                Financial Strength & Capability
              </h3>
              <p className="text-background/80 leading-relaxed">
                With a verified asset base valued in excess of{" "}
                <span className="text-primary font-semibold">US$300 Million</span>,
                Vinicius Group possesses the raw financial weight to undertake
                multi-billion Naira concurrent projects with zero-delay mobilization.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { value: "48hrs", label: "Mobilization Time" },
                { value: "100%", label: "Project Continuity" },
                { value: "Tier-1", label: "Banking Partners" },
                { value: "Audit Ready", label: "Fiscal Compliance" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-background/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center"
                >
                  <div className="text-lg sm:text-2xl font-bold text-primary mb-0.5 sm:mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-background/70 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
