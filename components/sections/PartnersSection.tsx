'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

type Partner = { name: string; logo: string; category: string };

const partners = [
  { name: 'Nigeria Navy', logo: '/partners/Nigeria Navy.png', category: 'Trusted' },
  { name: 'Civil Defence', logo: '/partners/Civil Defence.png', category: 'Trusted' },
  { name: 'Faan', logo: '/partners/Faan.png', category: 'Trusted' },
  { name: 'Imo State Goverment Nigeria', logo: '/partners/Imo State Goverment Nigeria.png', category: 'Trusted' },
  { name: 'Mari Terraque Servimen', logo: '/partners/Mari Terraque Servimen.png', category: 'Trusted' },
  { name: 'State Security Service', logo: '/partners/State Security Service.png', category: 'Trusted' },
  { name: 'Kogi state', logo: '/partners/Kogi state.png', category: 'Trusted' },
  { name: 'Nigeria Air Force', logo: '/partners/Nigeria Air Force.png', category: 'Trusted' },
  { name: 'National Inteligent Agency', logo: '/partners/National Inteligent Agency.png', category: 'Trusted' },
  { name: 'The Nigeria Police', logo: '/partners/The Nigeria Police.png', category: 'Trusted' },
  { name: 'Enugu state goverment', logo: '/partners/Enugu state goverment.png', category: 'Trusted' },
  { name: 'Nda', logo: '/partners/Nda.png', category: 'Trusted' },
];

export default function PartnersSection() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const partnerCarouselApi = useRef<any>(null);
  const [partnerApiReady, setPartnerApiReady] = useState(false);

  useEffect(() => {
    if (partnerCarouselApi.current) setPartnerApiReady(true);
  }, [partnerCarouselApi.current]);

  useEffect(() => {
    if (!partnerApiReady || !partnerCarouselApi.current) return;
    const api = partnerCarouselApi.current;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 2500);
    return () => clearInterval(interval);
  }, [partnerApiReady]);

  return (
    <section id="partners" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Our <span className="text-gradient">Trusted Partners</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Working alongside Nigeria&apos;s most prestigious institutions and international organizations
          </p>
        </div>
        <div className="relative">
          <Carousel
            opts={{ loop: true, align: 'start' }}
            setApi={api => { partnerCarouselApi.current = api; setPartnerApiReady(true); }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselPrevious />
            <CarouselContent>
              {partners.map((partner, index) => (
                <CarouselItem key={index} className="flex flex-col items-center justify-center p-8 lg:basis-1/4 md:basis-1/3 basis-full">
                  <div className="w-48 h-48 rounded-full overflow-hidden flex items-center justify-center bg-gray-300 border border-gray-200 mb-6 cursor-pointer" onClick={() => setSelectedPartner(partner)}>
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={180}
                      height={180}
                      className="object-contain w-44 h-44"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">{partner.name}</h3>
                  <p className="text-gray-500 text-xs mb-1">{partner.logo.split('/').pop()}</p>
                  <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                    {partner.category}
                  </span>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
          </Carousel>
          {/* Modal/Lightbox for partner logo */}
          {selectedPartner && (
            <div 
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedPartner(null)}
            >
              <div className="relative max-w-xl max-h-full bg-white rounded-lg p-8 flex flex-col items-center" onClick={e => e.stopPropagation()}>
                <Image
                  src={selectedPartner.logo}
                  alt={selectedPartner.name}
                  width={320}
                  height={320}
                  className="max-w-full max-h-[60vh] rounded-lg object-contain"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedPartner.name}</h3>
                  <p className="text-gray-500 text-xs mb-1">{selectedPartner.logo.split('/').pop()}</p>
                  <p className="text-red-600 text-sm mt-2">{selectedPartner.category}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

