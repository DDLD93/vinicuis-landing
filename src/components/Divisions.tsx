"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, ChevronDown, Shield, Building2, Plane, Server, Car, Wheat, Pill, Trophy } from "lucide-react";
import Link from "next/link";
import type { Division } from "@/lib/models/Division";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Building2, Plane, Server, Car, Wheat, Pill, Trophy,
};

interface DivisionsProps {
  divisions?: Division[];
}

const Divisions = ({ divisions: divisionsFromDb }: DivisionsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);
  const divisions = (divisionsFromDb ?? []) as (Division & { icon?: string | React.ComponentType<{ className?: string }> })[];
  const displayedDivisions = showAll ? divisions : divisions.slice(0, 3);

  return (
    <section id="divisions" className="section-padding" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="divider-accent" />
            <h2 className="section-title">Core Business Divisions</h2>
            <p className="section-subtitle">
              Eight strategic sectors driving national development and industrial growth
            </p>
          </motion.div>
        </div>

        {/* Divisions Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {displayedDivisions.map((division, index) => {
            const IconComponent = typeof division.icon === "string" ? (ICON_MAP[division.icon] ?? Shield) : (division.icon as React.ComponentType<{ className?: string }>);
            return (
            <motion.div
              key={"slug" in division ? division.slug : division.title}
              className="card-division group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              {/* Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={division.image}
                  alt={division.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-red">
                  <IconComponent className="w-6 h-6 text-primary-foreground" />
                </div>

                {/* Subtitle Overlay */}
                <div className="absolute bottom-4 left-4">
                  <span className="text-sm font-medium text-primary-foreground/90">
                    {division.subtitle}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                  {division.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {division.description}
                </p>
                <Link
                  href={`/divisions/${division.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          );
          })}
        </div>

        {/* Show More/Less Button */}
        {divisions.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mt-10"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground text-base sm:text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-red hover:scale-[1.02] touch-manipulation"
            >
              {showAll ? "Show Less" : "Show More"}
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  showAll ? "rotate-180" : ""
                }`}
              />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Divisions;
