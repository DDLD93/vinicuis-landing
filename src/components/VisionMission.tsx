"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Target, 
  Lightbulb, 
  ShieldCheck, 
  Users, 
  Globe, 
  TrendingUp, 
  Award, 
  Building2,
  Zap,
  Heart,
  Rocket
} from "lucide-react";

const visionItems = [
  {
    icon: Globe,
    title: "Trusted African Enterprise",
    description:
      "Building a reputation as a reliable partner across the continent.",
  },
  {
    icon: ShieldCheck,
    title: "World-Class Security",
    description:
      "Delivering cutting-edge security solutions that protect and strengthen nations.",
  },
  {
    icon: Building2,
    title: "Infrastructure Excellence",
    description:
      "Transforming landscapes through innovative infrastructure development.",
  },
  {
    icon: TrendingUp,
    title: "Economic Growth",
    description:
      "Driving sustainable economic development through strategic partnerships.",
  },
  {
    icon: Zap,
    title: "Innovation First",
    description:
      "Leading with technology and innovation in every sector we serve.",
  },
  {
    icon: Heart,
    title: "Integrity & Trust",
    description:
      "Building lasting relationships through transparency and ethical practices.",
  },
];

const missionItems = [
  {
    icon: Target,
    title: "To Industrialize",
    description:
      "To shift Nigeria from importation to production in defense, infrastructure, and technology.",
  },
  {
    icon: Lightbulb,
    title: "To Innovate",
    description:
      "To deploy cutting-edge Information Technology that drives efficiency in public and private sectors.",
  },
  {
    icon: ShieldCheck,
    title: "To Fortify",
    description:
      "To deliver world-class security and digital assets that uplift national capacity.",
  },
  {
    icon: Users,
    title: "To Empower",
    description:
      "To reduce dependence on foreign solutions by promoting indigenous growth and local talent.",
  },
];

const VisionMission = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="pt-6 sm:pt-8 pb-10 sm:pb-20 bg-secondary/30 overflow-x-hidden" ref={ref}>
      <div className="container px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="accent-line mb-6" />
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-3 sm:mb-6">
              Our Vision
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-8">
              To be a trusted African enterprise delivering world-class solutions
              that strengthen security, infrastructure, and economic growth
              through innovation, integrity, and strategic partnerships.
            </p>
            <div className="grid gap-4">
              {visionItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-card border border-border/50 transition-all hover:shadow-card hover:border-primary/20 min-h-[44px] touch-manipulation"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="accent-line mb-6" />
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-3 sm:mb-6">
              Our Mission
            </h2>
            <div className="grid gap-4">
              {missionItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-card border border-border/50 transition-all hover:shadow-card hover:border-primary/20 min-h-[44px] touch-manipulation"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
