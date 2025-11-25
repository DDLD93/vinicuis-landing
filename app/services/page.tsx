'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Shield, 
  Building, 
  Car, 
  Plane, 
  Leaf, 
  Plus, 
  ArrowRight, 
  LucideIcon, 
  Image as ImageIcon,
  Laptop,
  Lock,
  ExternalLink,
  Pill,
  Trophy
} from 'lucide-react';
import Link from 'next/link';

type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  galleryCategory: string;
  features: string[];
  website?: string;
};

const defaultServices: Service[] = [
    {
      id: 'security-solutions',
      icon: Shield,
    title: 'Security & Safety Solutions',
    description: 'Comprehensive security services including risk assessment, equipment supply, personnel training, and modern surveillance technology.',
    image: '/security/4.jpg',
      galleryCategory: 'Security',
    features: [
      'Risk assessment',
      'Security equipment supply',
      'Personnel training',
      'Modern surveillance technology'
    ]
    },
    {
      id: 'construction',
      icon: Building,
    title: 'Construction (Vinicius Construction)',
    description: 'Leading construction services specializing in urban development, commercial infrastructure, residential construction, and government contracting.',
    image: '/construction/15.jpg',
      galleryCategory: 'Construction',
    features: [
      'Urban development',
      'Commercial infrastructure',
      'Residential construction',
      'Government contracting'
    ]
  },
  {
    id: 'vinicius-technologies',
    icon: Laptop,
    title: 'Vinicius Technologies',
    description: 'Comprehensive IT solutions including software development, cybersecurity, cloud infrastructure, digital transformation, and managed IT services.',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=500',
    galleryCategory: 'IT & Technologies',
    features: [
      'Software Development & Engineering',
      'Cybersecurity & Digital Defense',
      'IT Infrastructure & Cloud Solutions',
      'Digital Transformation Consulting',
      'Hardware & Technology Procurement',
      'Data Analytics & Intelligence Systems',
      'Managed IT Services',
      'Emerging Technology Solutions'
    ],
    website: 'https://xxxxx.xxxxxx.xxxxxx'
    },
    {
      id: 'automobile',
      icon: Car,
    title: 'Automobile',
    description: 'Complete automotive solutions including armored vehicles, fleet management, import services, and vehicle customization.',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=500',
      galleryCategory: 'Automobile',
    features: [
      'Armored vehicles',
      'Fleet management',
      'Import and customization'
    ]
    },
    {
      id: 'private-aviation',
      icon: Plane,
      title: 'Private Aviation',
    description: 'Premium private aviation services including charter services, VIP logistics, and aircraft procurement support.',
    image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=500',
      galleryCategory: 'Aviation',
    features: [
      'Private charter services',
      'VIP logistics',
      'Aircraft procurement support'
    ]
  },
  {
    id: 'ascc-security',
    icon: Lock,
    title: 'ASCC Security',
    description: 'Professional private security services with trained operatives and government-certified solutions.',
    image: 'https://images.pexels.com/photos/8872465/pexels-photo-8872465.jpeg?auto=compress&cs=tinysrgb&w=500',
    galleryCategory: 'Security',
    features: [
      'Private security services',
      'Trained operatives',
      'Government-certified solutions'
    ]
    },
    {
    id: 'agro-trade',
    icon: Leaf,
    title: 'Agro-Trade (Bichwood Essentials)',
    description: 'International agricultural trade specializing in export commodities, sustainable farming, and global trade links.',
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=500',
    galleryCategory: 'Agro-Trade',
    features: [
      'Export commodities',
      'Sustainable farming',
      'International trade links'
    ]
        },
        {
    id: 'pharmaceutical',
    icon: Pill,
    title: 'Pharmaceutical Development',
    description: 'Healthcare solutions including local drug manufacturing, healthcare product distribution, and medical equipment importation.',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=500',
    galleryCategory: 'Pharmaceuticals',
    features: [
      'Local drug manufacturing',
      'Healthcare product distribution',
      'Medical equipment importation'
    ]
  },
  {
    id: 'football-academy',
    icon: Trophy,
    title: 'Football Academy',
    description: 'Youth sports development programs focusing on athlete training, development, and community engagement.',
    image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=500',
    galleryCategory: 'Sports Development',
    features: [
      'Youth sports training',
      'Athlete development',
      'Community engagement programs'
    ]
  }
];

export default function Services() {
  const services = defaultServices;
  const router = useRouter();

  const handleInquiry = (serviceId: string) => {
    window.location.href = `/contact?service=${serviceId}`;
  };

  const handleViewGallery = (category: string) => {
    router.push(`/gallery?category=${category}`);
  };

  return (
    <div className="pt-[5.5rem]">
      {/* Hero Section */}
      <section className="py-20 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center transition-all duration-1000">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-red-400">Services</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Comprehensive solutions across multiple sectors, delivering excellence in every project.
            </p>
          </div>
        </div>
      </section>

        {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => (
            <motion.div
                key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-red-100"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {service.title}
                </h3>
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                  {service.description}
                </p>
                
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-gray-600 text-xs flex items-start">
                          <span className="text-red-600 mr-2 mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {service.website && (
                    <a
                      href={service.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm mb-4 group/link"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Website
                    </a>
                  )}
                
                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => handleViewGallery(service.galleryCategory)}
                      className="flex-1 group/btn bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95"
                    >
                      <ImageIcon className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      <span className="text-sm">Gallery</span>
                    </button>
                    <button
                      onClick={() => handleInquiry(service.id)}
                      className="flex-1 group/btn bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-red-500/50 transform hover:scale-105 active:scale-95"
                >
                      <span className="text-sm">Inquiry</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      </section>
    </div>
  );
}
