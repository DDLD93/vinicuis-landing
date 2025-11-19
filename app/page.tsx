import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import GalleryPreviewSection from '@/components/sections/GalleryPreviewSection';
import PartnersSection from '@/components/sections/PartnersSection';
import NewsSection from '@/components/sections/NewsSection';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <GalleryPreviewSection />
      <PartnersSection />
      <NewsSection />
      <CTASection />
    </div>
  );
}