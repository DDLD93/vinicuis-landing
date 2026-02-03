"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield, Building2, Plane, Server, ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "Building. Securing.",
    highlight: "Powering.",
    subtitle: "Digitizing the Future.",
    description: "A premier African conglomerate and sovereign-scale industrial titan dedicated to the strategic advancement of Nigeria and the continent.",
    tag: "Africa's Industrial Vanguard",
    cta: { primary: "Explore Our Divisions", secondary: "Contact Us" },
    image: "/bg.png",
  },
  {
    id: 2,
    title: "Defending Nations.",
    highlight: "Protecting Lives.",
    subtitle: "Building Peace.",
    description: "Advanced security solutions, military technology, and defense systems designed to safeguard sovereignty and ensure continental stability.",
    tag: "Defense & Security Excellence",
    cta: { primary: "Security Solutions", secondary: "Learn More" },
    image: "/bg2.jpeg",
  },
  {
    id: 3,
    title: "Constructing Tomorrow.",
    highlight: "Engineering Legacy.",
    subtitle: "Creating Infrastructure.",
    description: "World-class infrastructure development, civil engineering, and construction projects that shape the skyline and foundation of modern Africa.",
    tag: "Infrastructure Development",
    cta: { primary: "View Projects", secondary: "Get Started" },
    image: "/bg3.jpeg",
  },
  {
    id: 4,
    title: "Connecting Continents.",
    highlight: "Elevating Travel.",
    subtitle: "Soaring Higher.",
    description: "Premium aviation services, aircraft solutions, and aerospace technology driving connectivity across Africa and beyond.",
    tag: "Aviation & Aerospace",
    cta: { primary: "Aviation Services", secondary: "Explore Fleet" },
    image: "/bg4.jpg",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={`bg-${currentSlide}`}
            src={slide.image}
            alt={slide.tag}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/85 to-background/50" />
        
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-red-600/20"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <div className="accent-line" />
                  <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-primary">
                    {slide.tag}
                  </span>
                </div>
              </motion.div>

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {slide.title}{" "}
                <span className="text-gradient">{slide.highlight}</span>{" "}
                <br className="hidden md:block" />
                {slide.subtitle}
              </motion.h1>

              <motion.p
                className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-4 sm:mb-6 md:mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {slide.description}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <a href="#divisions" className="btn-hero min-h-[44px] touch-manipulation">
                  {slide.cta.primary}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                </a>
                <a href="#contact" className="btn-outline-hero min-h-[44px] touch-manipulation">
                  {slide.cta.secondary}
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-8 sm:mt-12">
          {/* Previous Button */}
          <motion.button
            onClick={prevSlide}
            className="p-2.5 sm:p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-foreground hover:bg-accent hover:text-primary transition-all duration-300 shadow-lg touch-manipulation"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>

          {/* Slide Indicators */}
          <div className="flex gap-1.5 sm:gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="group relative touch-manipulation p-1"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-8 sm:w-12 bg-primary"
                      : "w-5 sm:w-8 bg-muted-foreground/30 group-hover:bg-muted-foreground/50"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            onClick={nextSlide}
            className="p-2.5 sm:p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-foreground hover:bg-accent hover:text-primary transition-all duration-300 shadow-lg touch-manipulation"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>

          {/* Auto-play indicator */}
          <div className="ml-2 flex items-center gap-2">
            <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isAutoPlaying ? (
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              ) : (
                <div className="w-2 h-2 rounded-full bg-muted-foreground/50" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Floating Stats */}
        <motion.div
          className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[
            { icon: Shield, label: "Security" },
            { icon: Building2, label: "Infrastructure" },
            { icon: Plane, label: "Aviation" },
            { icon: Server, label: "Technology" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-3 bg-card/80 backdrop-blur-sm px-4 py-3 rounded-lg shadow-card border border-border/50"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, x: -5 }}
            >
              <item.icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <motion.div
            className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-3 bg-primary rounded-full mt-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
