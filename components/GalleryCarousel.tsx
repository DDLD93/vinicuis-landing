import React, { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';

const galleryImages = [
  // Security Category
  {
    src: '/security/1.jpg',
    title: 'Security Operations Center',
    category: 'Security',
  },
  {
    src: '/security/2.jpg',
    title: 'VIP Protection Services',
    category: 'Security',
  },
  {
    src: '/security/3.jpg',
    title: 'Security Training Facility',
    category: 'Security',
  },
  {
    src: '/security/4.jpg',
    title: 'Armored Vehicle Assembly',
    category: 'Security',
  },
  {
    src: '/security/5.jpg',
    title: 'Security Equipment',
    category: 'Security',
  },
  {
    src: '/security/6.jpg',
    title: 'Security Personnel Training',
    category: 'Security',
  },
  {
    src: '/security/7.jpg',
    title: 'Advanced Security Systems',
    category: 'Security',
  },
  {
    src: '/security/8.jpg',
    title: 'Security Infrastructure',
    category: 'Security',
  },
  
  // Construction Category
  {
    src: '/construction/1.jpg',
    title: 'Commercial Plaza Development',
    category: 'Construction',
  },
  {
    src: '/construction/2.jpg',
    title: 'Infrastructure Projects',
    category: 'Construction',
  },
  {
    src: '/construction/3.jpg',
    title: 'Housing Complex',
    category: 'Construction',
  },
  {
    src: '/construction/4.jpg',
    title: 'Modern Building Construction',
    category: 'Construction',
  },
  {
    src: '/construction/5.jpg',
    title: 'Construction Site Management',
    category: 'Construction',
  },
  {
    src: '/construction/6.jpg',
    title: 'Road Construction',
    category: 'Construction',
  },
  {
    src: '/construction/7.jpg',
    title: 'Industrial Construction',
    category: 'Construction',
  },
  {
    src: '/construction/8.jpg',
    title: 'Residential Development',
    category: 'Construction',
  },
  {
    src: '/construction/9.jpg',
    title: 'Commercial Building',
    category: 'Construction',
  },
  {
    src: '/construction/10.jpg',
    title: 'Construction Equipment',
    category: 'Construction',
  },
  {
    src: '/construction/11.jpg',
    title: 'Project Management',
    category: 'Construction',
  },
  {
    src: '/construction/12.jpg',
    title: 'Quality Control',
    category: 'Construction',
  },
  {
    src: '/construction/13.jpg',
    title: 'Site Planning',
    category: 'Construction',
  },
  {
    src: '/construction/14.jpg',
    title: 'Structural Engineering',
    category: 'Construction',
  },
  {
    src: '/construction/15.jpg',
    title: 'Final Project Delivery',
    category: 'Construction',
  },
  
  // Automobile Category
  {
    src: '/automobile/1.jpg',
    title: 'Automotive Manufacturing',
    category: 'Automobile',
  },
  {
    src: '/automobile/2.jpg',
    title: 'Vehicle Assembly Line',
    category: 'Automobile',
  },
];

export default function GalleryCarousel() {
  const carouselApi = useRef<any>(null);
  const [apiReady, setApiReady] = useState(false);
  const [selectedImage, setSelectedImage] = useState<null | typeof galleryImages[0]>(null);

  useEffect(() => {
    if (carouselApi.current) setApiReady(true);
  }, [carouselApi.current]);

  useEffect(() => {
    if (!apiReady || !carouselApi.current) return;
    const api = carouselApi.current;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 2500);
    return () => clearInterval(interval);
  }, [apiReady]);

  return (
    <>
      <Carousel
        opts={{ loop: true, align: 'start' }}
        setApi={(api) => { carouselApi.current = api; setApiReady(true); }}
        className="w-full"
      >
        <CarouselContent>
          {galleryImages.map((img, idx) => (
            <CarouselItem key={idx} className="px-2 md:basis-1/3 basis-4/5">
              <div className="rounded-lg overflow-hidden shadow-lg bg-white flex flex-col h-full cursor-pointer" onClick={() => setSelectedImage(img)}>
                <Image
                  src={img.src}
                  alt={img.title}
                  width={300}
                  height={200}
                  className="w-full h-64 object-cover"
                  priority={idx < 6} // Prioritize first 6 images
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{img.title}</h3>
                  <p className="text-gray-500 text-sm">{img.category}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* Modal/Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full" onClick={e => e.stopPropagation()}>
            <Image
              src={selectedImage.src}
              alt={selectedImage.title}
              width={800}
              height={600}
              className="max-w-full max-h-[80vh] rounded-lg"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
              <p className="text-gray-300 text-sm">{selectedImage.category}</p>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-red-400 text-3xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
} 