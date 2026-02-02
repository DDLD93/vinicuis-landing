"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const chairmanImage = "/ceo.png";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="pt-16 sm:pt-20 pb-8 bg-secondary/30" ref={ref}>
      <div className="container">
        {/* About Header */}
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="divider-accent" />
            <h2 className="section-title">Who We Are</h2>
            <p className="section-subtitle">
              Over 15 years of operational excellence driving Nigeria&apos;s industrial advancement
            </p>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              Vinicius Group is a premier African conglomerate and sovereign-scale
              industrial titan dedicated to the strategic advancement of Nigeria
              and the continent. With over 15 years of operational excellence and
              a significant asset base, we do not merely participate in markets;
              we define them.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              From establishing Nigeria&apos;s indigenous defense manufacturing
              capabilities to executing mega-infrastructure and digital
              transformation projects, Vinicius Group stands as the bridge
              between national ambition and realized capability.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              We operate at the intersection of{" "}
              <span className="text-foreground font-semibold">
                Security, Defense, Infrastructure, Technology, Aviation, and
                Agriculture
              </span>
              , delivering sovereign-grade solutions for federal governments,
              state agencies, and high-net-worth multinational partners.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4 sm:gap-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              { value: "15+", label: "Years of Excellence" },
              { value: "$300M+", label: "Asset Base" },
              { value: "6+", label: "Core Divisions" },
              { value: "100+", label: "Major Projects" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="card-elevated text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Chairman&apos;s Statement */}
        <motion.div
          className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/50"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="grid lg:grid-cols-5 items-stretch">
            {/* Image */}
            <div className="lg:col-span-2 relative h-48 sm:h-56 md:h-64 lg:h-auto min-h-[12rem]">
              <img
                src={chairmanImage}
                alt="Chairman"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent lg:bg-gradient-to-r" />
            </div>

            {/* Quote */}
            <div className="lg:col-span-3 p-5 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
              <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-primary/20 mb-3 sm:mb-4" />
              <blockquote className="text-lg sm:text-xl lg:text-2xl font-serif text-foreground leading-relaxed mb-4 sm:mb-6">
                &quot;For over a decade and a half, Vinicius Group has evolved from a
                vision of possibility into a pillar of national capability. Our
                journey has been defined not just by the contracts we execute,
                but by the value we create for Nigeria.&quot;
              </blockquote>
              <p className="text-base sm:text-lg text-muted-foreground italic">
                &quot;Whether it is securing our borders, building our cities, or
                digitizing our government, our mandate remains clear:{" "}
                <span className="text-primary font-semibold not-italic">
                  Self-Reliance through Excellence.
                </span>
                &quot;
              </p>
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
                <p className="font-semibold text-foreground">Group Chairman</p>
                <p className="text-sm text-muted-foreground">
                  Chairman&apos;s Statement
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
