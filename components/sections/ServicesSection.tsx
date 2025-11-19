'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Shield, Building, Car, Plane, Leaf, Plus } from 'lucide-react';

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

export default function ServicesSection() {
  return (
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
  );
}

