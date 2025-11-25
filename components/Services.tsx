'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Shield, Building, Car, Plane, Leaf, Plus, ArrowRight, LucideIcon, Laptop, Lock, Pill, Trophy } from 'lucide-react';

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  features?: string[];
};

interface ServicesProps {
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    icon: Shield,
    title: 'Security & Safety Solutions',
    description: 'Comprehensive security services including risk assessment, equipment supply, personnel training, and modern surveillance technology.',
    image: '/security/4.jpg',
    features: ['Risk assessment', 'Security equipment supply', 'Personnel training', 'Modern surveillance technology']
  },
  {
    icon: Building,
    title: 'Construction (Vinicius Construction)',
    description: 'Leading construction services specializing in urban development, commercial infrastructure, residential construction, and government contracting.',
    image: '/construction/15.jpg',
    features: ['Urban development', 'Commercial infrastructure', 'Residential construction', 'Government contracting']
  },
  {
    icon: Laptop,
    title: 'Vinicius Technologies',
    description: 'Comprehensive IT solutions including software development, cybersecurity, cloud infrastructure, digital transformation, and managed IT services.',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=500',
    features: ['Software Development', 'Cybersecurity', 'Cloud Solutions', 'Digital Transformation']
  },
  {
    icon: Car,
    title: 'Automobile',
    description: 'Complete automotive solutions including armored vehicles, fleet management, import services, and vehicle customization.',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=500',
    features: ['Armored vehicles', 'Fleet management', 'Import and customization']
  },
  {
    icon: Plane,
    title: 'Private Aviation',
    description: 'Premium private aviation services including charter services, VIP logistics, and aircraft procurement support.',
    image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=500',
    features: ['Private charter services', 'VIP logistics', 'Aircraft procurement support']
  },
  {
    icon: Lock,
    title: 'ASCC Security',
    description: 'Professional private security services with trained operatives and government-certified solutions.',
    image: 'https://images.pexels.com/photos/8872465/pexels-photo-8872465.jpeg?auto=compress&cs=tinysrgb&w=500',
    features: ['Private security services', 'Trained operatives', 'Government-certified solutions']
  }
];

export default function Services({ services = defaultServices }: ServicesProps) {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-red-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions across multiple sectors, delivering excellence in every project.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service, index) => (
            <motion.div
              key={index}
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
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features?.slice(0, 3).map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-sm group/link"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/services" className="btn-primary text-lg px-8 py-4">
            Explore All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
