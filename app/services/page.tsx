'use client';

import { useEffect, useState } from 'react';
import { Shield, Building, Car, Leaf, Plane, Pill, Trophy, Users, GraduationCap, Plus, ArrowRight, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      id: 'security-solutions',
      icon: Shield,
      title: 'Security & Solitary Solutions',
      overview: 'Premier supplier of arms and security equipment to government agencies, strategic partner in national security initiatives.',
      galleryCategory: 'Security',
      pastProjects: [
        {
          title: 'Presidential Fleet Security',
          description: 'Complete security solution for presidential motorcade including armored vehicles and security personnel.',
          image: 'https://images.pexels.com/photos/8872465/pexels-photo-8872465.jpeg?auto=compress&cs=tinysrgb&w=600',
          video: null
        },
        {
          title: 'Government Agency Protection',
          description: 'Comprehensive security systems for multiple government facilities across Nigeria.',
          image: 'https://images.pexels.com/photos/1089549/pexels-photo-1089549.jpeg?auto=compress&cs=tinysrgb&w=600',
          video: null
        }
      ],
      features: [
        'Presidential fleets and armored vehicles',
        'Special-purpose vehicle manufacturing',
        'Modern armored vehicle assembly facility',
        'Government agency partnerships'
      ]
    },
    {
      id: 'construction',
      icon: Building,
      title: 'Construction (Saiha Constructions)',
      overview: 'Full-service construction company with proven track record in infrastructure development.',
      galleryCategory: 'Construction',
      pastProjects: [
        {
          title: 'Commercial Plaza Development',
          description: 'Successfully delivered 5 major commercial plazas with modern amenities and sustainable design.',
          image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=600',
          video: null
        },
        {
          title: 'Housing Complex Project',
          description: 'Completed 200+ housing units with modern infrastructure and community facilities.',
          image: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=600',
          video: null
        }
      ],
      features: [
        '5 plazas and 200+ housing units delivered',
        '100+ kilometers of roads constructed',
        'Hospitals and police stations built',
        'Full technical team of experts'
      ]
    },
    {
      id: 'automobile',
      icon: Car,
      title: 'Automobile',
      overview: 'Comprehensive automotive solutions including vehicle manufacturing, maintenance, and fleet management services.',
      galleryCategory: 'Automobile',
      pastProjects: [
        {
          title: 'Fleet Management System',
          description: 'Implemented comprehensive fleet management for government agencies with 500+ vehicles.',
          image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=600',
          video: null
        },
        {
          title: 'Vehicle Assembly Plant',
          description: 'State-of-the-art vehicle assembly facility producing specialized vehicles for security and commercial use.',
          image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=600',
          video: null
        }
      ],
      features: [
        'Specialized vehicle manufacturing',
        'Fleet management services',
        'Maintenance and repair facilities',
        'Custom vehicle modifications'
      ]
    },
    {
      id: 'private-aviation',
      icon: Plane,
      title: 'Private Aviation',
      overview: 'Private and commercial jet operations for business and government transportation.',
      galleryCategory: 'Aviation',
      pastProjects: [
        {
          title: 'VIP Transport Services',
          description: 'Provided secure and luxurious air transport for government officials and business executives.',
          image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=600',
          video: null
        },
        {
          title: 'Charter Operations',
          description: 'Successfully operated charter flights for corporate clients and special events.',
          image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=600',
          video: null
        }
      ],
      features: [
        'Private jet operations',
        'VIP transport services',
        'Charter flight services',
        'Aviation logistics support'
      ]
    },
    {
      id: 'security-academy',
      icon: GraduationCap,
      title: 'ASCC Security',
      overview: 'Professional security training and certification programs for security personnel.',
      galleryCategory: 'ASCC Security',
      pastProjects: [
        {
          title: 'Guard Training Program',
          description: 'Trained 600+ security guards through comprehensive professional development programs.',
          image: 'https://images.pexels.com/photos/1089549/pexels-photo-1089549.jpeg?auto=compress&cs=tinysrgb&w=600',
          video: null
        },
        {
          title: 'Specialized Security Training',
          description: 'Developed specialized training programs for VIP protection and corporate security.',
          image: 'https://images.pexels.com/photos/1089549/pexels-photo-1089549.jpeg?auto=compress&cs=tinysrgb&w=600',
          video: null
        }
      ],
      features: [
        'Professional security training',
        'Certification programs',
        'Specialized security courses',
        'Industry-standard curriculum'
      ]
    }
  ];

  const emergings = [
    {
      id: 'agro-trade',
      icon: Leaf,
      title: 'Agro-Trade (Richfood Essentials)',
      overview: 'International agricultural trade with focus on quality and global compliance.',
      galleryCategory: 'Agro-Trade (Richfood Essentials)',
      pastProjects: [
        {
          title: 'Export Success Program',
          description: 'Achieved $3+ million in annual exports with strict quality control and international compliance.',
          image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=600',
          video: null
        },
        {
          title: 'Warehouse Infrastructure',
          description: 'Developed large-scale warehousing facilities for agricultural products with modern storage systems.',
          image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=600',
          video: null
        }
      ],
      features: [
        'Domestic and international trade',
        '$3+ million in annual exports',
        'Strict quality control systems',
        'Large-scale warehousing facilities'
      ]
    },
    {
      id: 'pharmaceutical',
      icon: Pill,
      title: 'Pharmaceutical Development',
      overview: 'Developing capacity for essential medicine production to support Nigeria\'s healthcare sector.',
      galleryCategory: 'Pharmaceutical Development',
      pastProjects: [
        {
          title: 'Medicine Production Facility',
          description: 'Established state-of-the-art pharmaceutical manufacturing facility for essential medicines.',
          image: 'https://images.pexels.com/photos/3376790/pexels-photo-3376790.jpeg?auto=compress&cs=tinysrgb&w=600',
          video: null
        },
        {
          title: 'Healthcare Partnership Program',
          description: 'Collaborated with healthcare institutions to develop and distribute essential medications.',
          image: 'https://images.pexels.com/photos/3376790/pexels-photo-3376790.jpeg?auto=compress&cs=tinysrgb&w=600',
          video: null
        }
      ],
      features: [
        'Essential medicine production',
        'Pharmaceutical manufacturing',
        'Healthcare partnerships',
        'Quality assurance systems'
      ]
    },
    {
      id: 'football-academy',
      icon: Trophy,
      title: 'Football Academy',
      overview: 'Developing young football talent and promoting sports excellence in Nigeria.',
      galleryCategory: 'Football Academy',
      pastProjects: [
        {
          title: 'Youth Development Program',
          description: 'Established comprehensive youth football development program with professional coaching.',
          image: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=600',
          video: null
        },
        {
          title: 'Sports Facility Development',
          description: 'Developed modern sports facilities and training grounds for football academy.',
          image: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=600',
          video: null
        }
      ],
      features: [
        'Youth football development',
        'Professional coaching programs',
        'Sports facility management',
        'Talent identification and training'
      ]
    }
  ]

  const handleInquiry = (serviceId: string) => {
    // Redirect to contact page with service pre-selected
    window.location.href = `/contact?service=${serviceId}`;
  };

  const handleViewGallery = (category: string) => {
    // Navigate to gallery with category filter
    router.push(`/gallery?category=${category}`);
  };

  return (
    <div className="pt-[5.5rem]">
      {/* Hero Section */}
      <section className="py-20 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-red-400">Services</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Comprehensive solutions across multiple sectors, delivering excellence in every project
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Interactive service cards with detailed information, past projects, and inquiry options
            </p>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover border border-gray-100">
                {/* Service Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center mb-4">
                    <service.icon className="h-10 w-10 text-red-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.overview}</p>
                </div>

                {/* Features */}
                <div className="p-6 bg-gray-50">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="p-6 space-y-3">
                  <button
                    onClick={() => handleViewGallery(service.galleryCategory)}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    View Gallery
                  </button>
                  <button
                    onClick={() => handleInquiry(service.id)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    Make Inquiry
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="text-gradient">Emerging Ventures</span>
            </h2>
            {/* <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Interactive service cards with detailed information, past projects, and inquiry options
            </p> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {emergings.map((service, index) => (
              <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover border border-gray-100">
                {/* Service Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center mb-4">
                    <service.icon className="h-10 w-10 text-red-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.overview}</p>
                </div>
                {/* Features */}
                <div className="p-6 bg-gray-50">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Action Buttons */}
                <div className="p-6 space-y-3">
                  <button
                    onClick={() => handleViewGallery(service.galleryCategory)}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    View Gallery
                  </button>
                  <button
                    onClick={() => handleInquiry(service.id)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    Make Inquiry
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience Our Services?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Contact us today to discuss how our comprehensive solutions can meet your specific needs.
          </p>
          <a href="/contact" className="btn-secondary text-lg px-8 py-4">
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}