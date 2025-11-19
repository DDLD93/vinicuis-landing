'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.section
      className="relative min-h-[80vh] h-screen flex items-center justify-center gradient-bg px-2 sm:px-0"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      {/* Black overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center text-white px-2 sm:px-4 max-w-full sm:max-w-4xl mx-auto w-full">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight break-words">
            Building, Securing, and <span className="text-red-400">Powering</span> Nigeria&apos;s Future
          </h1>
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-200">
            Nigeria&apos;s premier conglomerate driving national progress across security, construction, agro-trade, and aviation
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-xs sm:max-w-none mx-auto">
            <Link href="/services" className="btn-primary w-full sm:w-auto">
              Our Services
            </Link>
            <Link href="/contact" className="btn-secondary w-full sm:w-auto">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </motion.section>
  );
}

