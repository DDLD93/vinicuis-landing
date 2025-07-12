'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { Shield, Truck, Building, Plane, Leaf, Award, ArrowRight, Users, Target, Globe, ExternalLink, Calendar, Car, Plus } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';
import GalleryCarousel from '@/components/GalleryCarousel';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

const About = '/About.png';

type Partner = { name: string; logo: string; category: string };

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const partnerCarouselApi = useRef<any>(null);
  const [partnerApiReady, setPartnerApiReady] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  const services = [
    {
      icon: Shield,
      title: 'Security & Solitary Solutions',
      description: 'Premier supplier of arms and security equipment to government agencies. Strategic partner in national security initiatives.',
      image: '/security/4.jpg'
    },
    {
      icon: Building,
      title: 'Construction Services',
      description: 'Comprehensive construction including Saiha Constructions, road construction, rehabilitation projects, and mega construction.',
      image: '/construction/15.jpg'
    },
    {
      icon: Car,
      title: 'Automobile Solutions',
      description: 'Complete automotive services including armored vehicles, luxury vehicles, executive vehicles, and customized cars.',
      image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      icon: Plane,
      title: 'Private Aviation',
      description: 'Private and commercial jet operations supporting business and government transportation needs.',
      image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      icon: Leaf,
      title: 'Agro-Trade',
      description: 'Richfood Essentials specializing in international agricultural trade with $3+ million in annual exports.',
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      icon: Plus,
      title: 'Emerging Ventures',
      description: 'Innovative business initiatives including pharmaceutical development and football academy.',
      image: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=500'
    }
  ];

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

  const newsUpdates = [
    {
      id: 1,
      title: 'Vinicius International Delivers 50 Armored Vehicles to Nigerian Security Forces',
      excerpt: 'In a landmark achievement, Vinicius International has successfully delivered 50 state-of-the-art armored vehicles to enhance national security capabilities.',
      date: '2024-01-15',
      category: 'Security',
      image: 'https://images.pexels.com/photos/8828687/pexels-photo-8828687.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '3 min read'
    },
    {
      id: 2,
      title: 'New Construction Project: 100-Unit Housing Estate in Abuja',
      excerpt: 'Saiha Constructions breaks ground on ambitious housing project that will provide affordable homes for government workers.',
      date: '2024-01-10',
      category: 'Construction',
      image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '4 min read'
    },
    {
      id: 3,
      title: 'Record Agricultural Exports: $5M in International Trade',
      excerpt: 'Richfood Essentials achieves milestone with record-breaking agricultural exports to European and Asian markets.',
      date: '2024-01-05',
      category: 'Agro-Trade',
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '2 min read'
    }
  ];

  const stats = [
    { number: 80, label: 'Asset Base', suffix: 'M+', prefix: '$' },
    { number: 50, label: 'Annual Imports', suffix: 'M', prefix: '$' },
    { number: 600, label: 'Trained Guards', suffix: '+' },
    { number: 200, label: 'Housing Units Built', suffix: '+' }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center gradient-bg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/hero.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        {/* Black overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Building, Securing, and <span className="text-red-400">Powering</span> Nigeria&apos;s Future
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Nigeria&apos;s premier conglomerate driving national progress across security, construction, agro-trade, and aviation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services" className="btn-primary">
                Our Services
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in card-hover p-6">
                <AnimatedCounter 
                  end={stat.number} 
                  suffix={stat.suffix} 
                  prefix={stat.prefix}
                />
                <div className="text-gray-600 font-medium mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl font-bold mb-6">
                About <span className="text-gradient">Vinicius International</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Vinicius International is a proudly Nigerian conglomerate driving national progress across 
                security, construction, procurement, aviation, agro-trade, and emerging sectors such as 
                pharmaceuticals and sports development.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Target className="h-6 w-6 text-red-600" />
                  <span className="text-gray-700">Trusted government partner across multiple agencies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-6 w-6 text-red-600" />
                  <span className="text-gray-700">Global collaborations spanning Dubai, China, and Europe</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-red-600" />
                  <span className="text-gray-700">Over $80 million in assets and infrastructure</span>
                </div>
              </div>
              <Link href="/about" className="inline-block mt-8 btn-primary">
                Learn More About Us
              </Link>
            </div>
            <div className="relative">
              <Image
                src="/About.png"
                alt="About Vinicius International"
                className="rounded-lg shadow-2xl animate-float"
                width={800}
                height={800}
                priority
              />
              <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-6 rounded-lg shadow-xl">
                <Users className="h-8 w-8 mb-2" />
                <div className="font-bold text-2xl">15+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="text-gradient">Group Divisions</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive solutions across multiple sectors, delivering excellence in every project
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-lg overflow-hidden card-hover border border-gray-100"
              >
                <div className="h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <service.icon className="h-8 w-8 text-red-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
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

       {/* Partners Section */}
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

      {/* News Updates Section */}
      <section id="news" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Latest <span className="text-gradient">News & Updates</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Stay informed about our latest achievements and developments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsUpdates.map((news) => (
              <article key={news.id} className="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
                <div className="h-48 overflow-hidden">
                  <Image
                    src={news.image}
                    alt={news.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                      {news.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(news.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {news.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{news.readTime}</span>
                    <Link 
                      href={`/news/${news.id}`}
                      className="text-red-600 hover:text-red-700 font-semibold text-sm flex items-center"
                    >
                      Read More <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/news" className="btn-primary">
              View All News
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Partner with Nigeria&apos;s Most Trusted Conglomerate?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Let&apos;s discuss how Vinicius International can support your project needs with our 
            world-class solutions and extensive experience.
          </p>
          <Link href="/contact" className="btn-secondary text-lg px-8 py-4">
            Start Your Project Today
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" />
      </section>
    </div>
  );
}