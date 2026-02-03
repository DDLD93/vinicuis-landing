"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background overflow-x-hidden" ref={ref}>
      <div className="container py-10 sm:py-14 md:py-16 px-4 sm:px-6">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo.png" 
                alt="Vinicius Group" 
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain bg-white rounded-full p-1.5 sm:p-2"
              />
              <span className="font-serif font-bold text-lg sm:text-xl">
                VINICIUS GROUP
              </span>
            </div>
            <p className="text-background/70 leading-relaxed max-w-md text-sm sm:text-base">
              Africa&apos;s Industrial Vanguard. Building, Securing, Powering, and
              Digitizing the future of Nigeria and the continent.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-1 sm:space-y-2">
              {["About Us", "Divisions", "Partners", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "")}`}
                    className="block py-2 text-background/70 hover:text-primary transition-colors text-sm sm:text-base"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Divisions */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Divisions</h4>
            <ul className="space-y-1 sm:space-y-2">
              {[
                "Defense & Security",
                "Infrastructure",
                "Aviation",
                "Technology",
                "Automobile",
                "Agro-Industrial",
              ].map((division) => (
                <li key={division}>
                  <a
                    href="#divisions"
                    className="flex items-center py-2.5 min-h-[44px] text-background/70 hover:text-primary transition-colors text-sm sm:text-base touch-manipulation"
                  >
                    {division}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} Vinicius Group. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 min-h-[44px] px-3 py-2 text-sm text-background/70 hover:text-primary transition-colors touch-manipulation"
            aria-label="Back to top"
          >
            Back to Top
            <ArrowUp className="w-4 h-4 shrink-0" />
          </button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
