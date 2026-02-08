"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { X, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { GalleryItem } from "@/lib/models/Gallery";

interface GalleryPageClientProps {
  items: GalleryItem[];
}

function getItemUrls(item: GalleryItem): string[] {
  return item.images?.length ? item.images : [item.image];
}

export default function GalleryPageClient({ items }: GalleryPageClientProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const list = Array.isArray(items) ? items : [];
  const categories = Array.from(new Set(list.map((item) => item.category)));
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredItems =
    selectedCategory === "All"
      ? list
      : list.filter((item) => item.category === selectedCategory);

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    setSelectedIndex(0);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
  };

  const lightboxUrls = selectedItem ? getItemUrls(selectedItem) : [];
  const totalImages = lightboxUrls.length;
  const goPrev = () => {
    setSelectedIndex((i) => (i <= 0 ? totalImages - 1 : i - 1));
  };
  const goNext = () => {
    setSelectedIndex((i) => (i >= totalImages - 1 ? 0 : i + 1));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <section className="relative min-h-[50vh] sm:min-h-[60vh] h-[50vh] sm:h-[60vh] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/bg.png"
              alt="Gallery"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/70 to-background/80" />
          </div>
          <div className="absolute inset-0 flex items-center z-10">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto"
              >
                <div className="divider-accent mx-auto" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-6">
                  Project Gallery
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Explore our portfolio of projects and achievements across all
                  divisions.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {list.length > 0 && (
        <section className="pt-8 pb-4">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-3 justify-center"
            >
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-all text-sm sm:text-base touch-manipulation ${
                  selectedCategory === "All"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground hover:bg-accent border border-border/50"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-all text-sm sm:text-base touch-manipulation ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground hover:bg-accent border border-border/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </section>
        )}

        <section className="section-padding" ref={ref}>
          <div className="container">
            {filteredItems.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">No gallery items yet. Check back soon.</p>
            ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              >
                {filteredItems.map((item, index) => {
                  const urls = getItemUrls(item);
                  return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="relative group cursor-pointer overflow-hidden rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-card transition-all"
                    onClick={() => openLightbox(item)}
                  >
                    <div className="relative h-48 sm:h-64 overflow-hidden">
                      <img
                        src={urls[0]}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                          <Tag className="w-3 h-3" />
                          {item.category}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-lg font-serif font-bold text-primary-foreground mb-1">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-sm text-primary-foreground/80">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
            )}
          </div>
        </section>
      </main>

      <Dialog open={selectedItem !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-5xl p-0 bg-transparent border-0 overflow-visible max-h-[90dvh]">
          {selectedItem && lightboxUrls.length > 0 && (
            <div className="relative">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/90 hover:bg-background rounded-full flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <img
                    src={lightboxUrls[selectedIndex]}
                    alt={selectedItem.title}
                    className="w-full h-auto rounded-lg"
                  />
                </motion.div>
              </AnimatePresence>
              {totalImages > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); goPrev(); }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background/90 hover:bg-background rounded-full flex items-center justify-center transition-colors"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-6 h-6 text-foreground" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); goNext(); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background/90 hover:bg-background rounded-full flex items-center justify-center transition-colors"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-6 h-6 text-foreground" />
                  </button>
                  <div className="flex justify-center gap-2 mt-3">
                    {lightboxUrls.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }}
                        className={`w-2 h-2 rounded-full transition-colors ${i === selectedIndex ? "bg-primary" : "bg-muted-foreground/40 hover:bg-muted-foreground/60"}`}
                        aria-label={`Image ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
