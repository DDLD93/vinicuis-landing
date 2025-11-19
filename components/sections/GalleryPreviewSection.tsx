'use client';

import GalleryCarousel from '@/components/GalleryCarousel';

export default function GalleryPreviewSection() {
  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            A Quick Look At The <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore some of our projects, facilities, and operations. Click below to see the full gallery.
          </p>
        </div>

        {/* Carousel */}
        <GalleryCarousel />

        <div className="text-center mt-8">
          <a href="/gallery" className="btn-primary inline-block px-8 py-4 text-lg">
            View More
          </a>
        </div>
      </div>
    </section>
  );
}

