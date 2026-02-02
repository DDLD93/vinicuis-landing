"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const partners = [
  { name: "Nigeria Navy", category: "Defense & Intel", logo: "/partners/Nigeria Navy.png" },
  { name: "Nigeria Air Force", category: "Defense & Intel", logo: "/partners/Nigeria Air Force.png" },
  { name: "The Nigeria Police", category: "Defense & Intel", logo: "/partners/The Nigeria Police.png" },
  { name: "State Security Service", category: "Defense & Intel", logo: "/partners/State Security Service.png" },
  { name: "National Intelligence Agency", category: "Defense & Intel", logo: "/partners/National Inteligent Agency.png" },
  { name: "FAAN", category: "Aviation", logo: "/partners/Faan.png" },
  { name: "NDA", category: "Defense & Intel", logo: "/partners/Nda.png" },
  { name: "Civil Defence", category: "Defense & Intel", logo: "/partners/Civil Defence.png" },
  { name: "Enugu State Government", category: "Government", logo: "/partners/Enugu state goverment.png" },
  { name: "Kogi State", category: "Government", logo: "/partners/Kogi state.png" },
  { name: "Imo State Government", category: "Government", logo: "/partners/Imo State Goverment Nigeria.png" },
  { name: "Mari Terraque Servimen", category: "Maritime", logo: "/partners/Mari Terraque Servimen.png" },
];

const globalPresence = [
  { 
    region: "China", 
    description: "Technology & Manufacturing", 
    flagUrl: "https://flagcdn.com/w320/cn.png",
    flagAlt: "China Flag"
  },
  { 
    region: "Dubai", 
    description: "Trade & Finance Hub", 
    flagUrl: "https://flagcdn.com/w320/ae.png",
    flagAlt: "UAE Flag"
  },
  { 
    region: "Egypt", 
    description: "Industrial Partnerships", 
    flagUrl: "https://flagcdn.com/w320/eg.png",
    flagAlt: "Egypt Flag"
  },
  { 
    region: "Europe", 
    description: "Strategic Partnerships", 
    flagUrl: "https://flagcdn.com/w320/eu.png",
    flagAlt: "European Union Flag"
  },
];

const Partners = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="partners" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="divider-accent" />
            <h2 className="section-title">Our Trusted Partners</h2>
            <p className="section-subtitle">
              Collaboration with prestigious institutions across defense, government, and global markets
            </p>
          </motion.div>
        </div>

        {/* Infinite Scrolling Partners Carousel */}
        <div className="mb-10 sm:mb-16 overflow-hidden">
          <motion.div
            className="flex gap-4 sm:gap-6"
            animate={{
              x: [0, -2448],
            }}
            transition={{
              x: {
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {/* Duplicate partners array for seamless loop */}
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <motion.div
                key={`${partner.name}-${index}`}
                className="bg-card rounded-lg p-4 text-center border border-border/50 hover:border-primary/30 hover:shadow-card transition-all group flex-shrink-0 w-[180px]"
                whileHover={{ y: -3, scale: 1.02 }}
              >
                {/* Logo */}
                <div className="h-16 flex items-center justify-center mb-3 relative">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100"
                  />
                </div>
                
                {/* Name & Category */}
                <p className="font-semibold text-xs text-foreground group-hover:text-primary transition-colors mb-1">
                  {partner.name}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {partner.category}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Global Presence */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground text-center mb-6 sm:mb-8">
            Global Alliances
          </h3>
          
          {/* Infinite Scrolling Global Alliances Carousel */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{
                x: [0, -1632],
              }}
              transition={{
                x: {
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {/* Duplicate globalPresence array for seamless loop */}
              {[...globalPresence, ...globalPresence, ...globalPresence].map((item, index) => (
                <motion.div
                  key={`${item.region}-${index}`}
                  className="relative overflow-hidden rounded-xl bg-card p-5 border border-border/50 hover:border-primary/30 transition-all group flex-shrink-0 w-[250px]"
                  whileHover={{ y: -3, scale: 1.02 }}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full" />
                  
                  {/* Flag */}
                  <div className="relative w-16 h-12 mb-3 mx-auto overflow-hidden rounded-lg shadow-md group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                    <img
                      src={item.flagUrl}
                      alt={item.flagAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h4 className="text-lg font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors text-center">
                    {item.region}
                  </h4>
                  <p className="text-xs text-muted-foreground text-center">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
