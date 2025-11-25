'use client';

import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Services from '@/components/Services';
import Careers from '@/components/Careers';
import Gallery from '@/components/Gallery';
import Partners from '@/components/Partners';
import News from '@/components/News';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Stats />
      <About />
      <Services />
      <Careers />
      <Gallery />
      <News />
      <Partners />
      <CTA />
    </div>
  );
}
