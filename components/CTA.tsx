'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section  className="py-20 gradient-bg text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-black/50" />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl font-bold mb-6">
        Partner with Nigeria&apos;s Most Trusted Conglomerate
      </h2>
      <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
        Experience the difference that comes with working alongside a company committed to 
        excellence, innovation, and national development.
      </p>
      <Button asChild className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group">
        <Link href="/contact" className="inline-flex items-center gap-2">
          Start your Project Now
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </div>
  </section>
);
}

