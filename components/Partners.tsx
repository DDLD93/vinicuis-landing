'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Play, Pause } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

type Partner = { 
  name: string; 
  logo: string; 
  category: string;
};

interface PartnersProps {
  partners?: Partner[];
}

const defaultPartners: Partner[] = [
  { name: 'Nigeria Navy', logo: '/partners/Nigeria Navy.png', category: 'Government' },
  { name: 'Civil Defence', logo: '/partners/Civil Defence.png', category: 'Security' },
  { name: 'Federal Airports Authority', logo: '/partners/Faan.png', category: 'Aviation' },
  { name: 'Imo State Government', logo: '/partners/Imo State Goverment Nigeria.png', category: 'Government' },
  { name: 'Mari Terraque Servimen', logo: '/partners/Mari Terraque Servimen.png', category: 'International' },
  { name: 'State Security Service', logo: '/partners/State Security Service.png', category: 'Security' },
  { name: 'Kogi State Government', logo: '/partners/Kogi state.png', category: 'Government' },
  { name: 'Nigeria Air Force', logo: '/partners/Nigeria Air Force.png', category: 'Military' },
  { name: 'National Intelligence Agency', logo: '/partners/National Inteligent Agency.png', category: 'Security' },
  { name: 'Nigeria Police Force', logo: '/partners/The Nigeria Police.png', category: 'Security' },
  { name: 'Enugu State Government', logo: '/partners/Enugu state goverment.png', category: 'Government' },
  { name: 'Nigerian Defence Academy', logo: '/partners/Nda.png', category: 'Military' },
];

export default function Partners({ partners = defaultPartners }: PartnersProps) {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [autoPlay, setAutoPlay] = useState(true);
  const partnerCarouselApi = useRef<any>(null);
  const [partnerApiReady, setPartnerApiReady] = useState(false);

  // Auto-play for partners carousel
  useEffect(() => {
    if (!partnerApiReady || !partnerCarouselApi.current || !autoPlay) return;
    
    const api = partnerCarouselApi.current;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [partnerApiReady, autoPlay]);

  return (
    <section id="partners" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Partners and <span className="text-red-600">Leading Collaborators</span>
          </h2>
          Partnering with Nigeria's most prestigious institutions and international organizations
          
        </motion.div>

        <div className="relative">
          {/* Auto-play controls */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors"
            >
              {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {autoPlay ? 'Pause' : 'Play'} Auto-scroll
            </button>
          </div>

          <Carousel
            opts={{ loop: true, align: 'start' }}
            setApi={api => { partnerCarouselApi.current = api; setPartnerApiReady(true); }}
            className="w-full"
          >
            <CarouselContent>
              {partners.map((partner, index) => (
                <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center p-6 group cursor-pointer"
                    onClick={() => setSelectedPartner(partner)}
                  >
                    <div className="w-32 h-32 rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center p-4 group-hover:shadow-xl transition-all duration-300 mb-4">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={120}
                        height={120}
                        className="object-contain w-24 h-24"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-center mb-2 leading-tight">
                      {partner.name}
                    </h3>
                    <span className="text-xs text-red-600 bg-red-50 px-3 py-1 rounded-full font-medium">
                      {partner.category}
                    </span>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Partner Modal */}
        <AnimatePresence>
          {selectedPartner && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedPartner(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-auto"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedPartner(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto mb-6 bg-gray-50 rounded-2xl flex items-center justify-center p-6">
                    <Image
                      src={selectedPartner.logo}
                      alt={selectedPartner.name}
                      width={160}
                      height={160}
                      className="object-contain"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedPartner.name}
                  </h3>
                  <p className="text-red-600 font-semibold mb-4">
                    {selectedPartner.category} Partner
                  </p>
                  <p className="text-gray-600 text-sm">
                    Trusted collaboration in {selectedPartner.category.toLowerCase()} sector
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

