"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Tag, ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import type { GalleryItem } from "@/lib/models/Gallery";

function getItemUrls(item: GalleryItem): string[] {
  return item.images?.length ? item.images : [item.image];
}

interface GalleryProps {
  items?: GalleryItem[];
}

const Gallery = ({ items: itemsProp }: GalleryProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items = itemsProp ?? [];
  const previewItems = items.slice(0, 6);
  const lightboxUrls = selectedItem ? getItemUrls(selectedItem) : [];
  const totalImages = lightboxUrls.length;

  const openPreview = (item: GalleryItem) => {
    setSelectedItem(item);
    setSelectedIndex(0);
  };

  const closePreview = () => setSelectedItem(null);

  const goPrev = () => setSelectedIndex((i) => (i <= 0 ? totalImages - 1 : i - 1));
  const goNext = () => setSelectedIndex((i) => (i >= totalImages - 1 ? 0 : i + 1));

  return (
    <section id="gallery" className="section-padding" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="divider-accent" />
            <h2 className="section-title">Project Gallery</h2>
            <p className="section-subtitle">
              Explore our portfolio of projects and achievements across all divisions
            </p>
          </motion.div>
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {previewItems.slice(0, 3).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              className="relative group cursor-pointer overflow-hidden rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-card transition-all"
              onClick={() => openPreview(item)}
            >
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <img
                  src={(item.images && item.images[0]) || item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                    <Tag className="w-3 h-3" />
                    {item.category}
                  </span>
                </div>

                {/* Title Overlay */}
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
          ))}
        </div>

        {/* View Full Gallery Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg transition-all duration-300 hover:shadow-red hover:scale-[1.02] text-sm sm:text-base"
          >
            View Full Gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Image preview modal */}
      <Dialog open={selectedItem !== null} onOpenChange={(open) => !open && closePreview()}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-5xl p-0 bg-transparent border-0 overflow-visible max-h-[90dvh]">
          {selectedItem && lightboxUrls.length > 0 && (
            <div className="relative">
              <button
                onClick={closePreview}
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
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6 text-foreground" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); goNext(); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background/90 hover:bg-background rounded-full flex items-center justify-center transition-colors"
                    aria-label="Next image"
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
                  <span className="absolute top-4 left-4 text-xs text-primary-foreground bg-black/40 px-2 py-1 rounded">
                    {selectedItem.title} — {selectedIndex + 1} / {totalImages}
                  </span>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
