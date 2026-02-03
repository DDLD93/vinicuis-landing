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
    <section id="about" className="pt-14 sm:pt-16 md:pt-20 pb-8 sm:pb-10 bg-secondary/30 overflow-x-hidden" ref={ref}>
      <div className="container px-4 sm:px-6">
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
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              Vinicius Group is a premier African conglomerate and sovereign-scale
              industrial titan dedicated to the strategic advancement of Nigeria
              and the continent. With over 15 years of operational excellence and
              a significant asset base, we do not merely participate in markets;
              we define them.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              From establishing Nigeria&apos;s indigenous defense manufacturing
              capabilities to executing mega-infrastructure and digital
              transformation projects, Vinicius Group stands as the bridge
              between national ambition and realized capability.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
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
          <div className="grid lg:grid-cols-5 items-stretch gap-0">
            {/* Image - portrait frame, shows face clearly */}
            <div className="lg:col-span-2 relative flex justify-center lg:justify-end bg-muted/30">
              <div className="w-full max-w-sm mx-auto lg:max-w-none lg:w-full lg:pr-0">
                <div className="relative aspect-[3/4] min-h-[280px] sm:min-h-[320px] lg:aspect-auto lg:h-full lg:min-h-[380px]">
                  <img
                    src={chairmanImage}
                    alt="Group Chairman"
                    className="absolute inset-0 w-full h-full object-cover object-[center_top] rounded-none lg:rounded-l-2xl"
                  />
                  <div className="absolute inset-0 rounded-none lg:rounded-l-2xl bg-gradient-to-t from-foreground/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-foreground/20 lg:via-transparent lg:to-transparent" />
                  {/* Accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/80 lg:bottom-0 lg:left-0 lg:right-auto lg:top-0 lg:h-full lg:w-1" />
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="lg:col-span-3 p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-center">
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-primary/20 mb-3 sm:mb-4 shrink-0" />
              <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif text-foreground leading-relaxed mb-4 sm:mb-6">
                &quot;For over a decade and a half, Vinicius Group has evolved from a
                vision of possibility into a pillar of national capability. Our
                journey has been defined not just by the contracts we execute,
                but by the value we create for Nigeria.&quot;
              </blockquote>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground italic">
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
