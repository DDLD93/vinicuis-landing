'use client';

import { useEffect, useState } from 'react';
import { Shield, Target, Award, Users, Globe, Building, Truck, Plane } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const infrastructure = [
    { title: 'Headquarters in Abuja', icon: Building },
    { title: 'Armored Vehicle Assembly Plant', icon: Truck },
    { title: 'Agro-trade Warehouses', icon: Building },
    { title: 'Private Jet Operations', icon: Plane }
  ];

  const values = [
    {
      title: 'Excellence',
      description: 'Delivering world-class solutions that exceed international standards',
      icon: Award
    },
    {
      title: 'Innovation',
      description: 'Embracing cutting-edge technology to drive national progress',
      icon: Target
    },
    {
      title: 'Integrity',
      description: 'Maintaining ethical operations aligned with national priorities',
      icon: Shield
    },
    {
      title: 'Partnership',
      description: 'Building strong relationships with government and private sector',
      icon: Users
    }
  ];

  return (
    <div className="pt-[5.5rem]">
      {/* Hero Section */}
      <section className="py-20 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-red-400">Vinicius International</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Nigeria&apos;s premier conglomerate driving national progress across multiple sectors
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Proudly Nigerian, <span className="text-gradient">Globally Connected</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Vinicius International is a proudly Nigerian conglomerate driving national progress across 
                security, construction, procurement, aviation, agro-trade, and emerging sectors such as 
                pharmaceuticals and sports development.
              </p>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                We are trusted partners of the Nigerian government, working with multiple state and 
                federal agencies. Our global collaborations &mdash; spanning Dubai, China, Europe, and beyond &mdash; 
                enable us to deliver solutions that meet and exceed international standards.
              </p>
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-600">
                <p className="text-red-800 font-semibold">
                  With an asset base of over $80 million, our operations include the annual importation of 
                  $40&ndash;50 million worth of security equipment for the Nigerian government.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Vinicius International Leadership"
                className="rounded-lg shadow-2xl"
                width={400}
                height={400}
                priority
                placeholder="blur"
                blurDataURL="/placeholder-blur.png"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="card-hover bg-white p-8 rounded-lg shadow-lg">
              <Target className="h-12 w-12 text-red-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be Nigeria&apos;s most trusted and innovative conglomerate &mdash; shaping the nation&apos;s future 
                through secure, sustainable, and world-class solutions. We are committed to helping 
                transform Nigeria into a production hub for the security sector.
              </p>
            </div>
            <div className="card-hover bg-white p-8 rounded-lg shadow-lg">
              <Globe className="h-12 w-12 text-red-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Deliver ethical, innovative, and reliable solutions across sectors
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Strengthen national development through strategic partnerships and job creation
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Advance local capacity in security, infrastructure, and trade
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              What <span className="text-gradient">Sets Us Apart</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our core values guide every decision and drive our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center card-hover bg-gray-50 p-6 rounded-lg">
                <value.icon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="text-gradient">Infrastructure</span>
            </h2>
            <p className="text-gray-600 text-lg">
              World-class facilities supporting our diverse operations across Nigeria
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {infrastructure.map((item, index) => (
              <div key={index} className="card-hover bg-white p-6 rounded-lg shadow-lg text-center">
                <item.icon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
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
            Partner with Nigeria&apos;s Most Trusted Conglomerate
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Experience the difference that comes with working alongside a company committed to 
            excellence, innovation, and national development.
          </p>
          <a href="/contact" className="btn-secondary text-lg px-8 py-4">
            Contact Us Today
          </a>
        </div>
      </section>
    </div>
  );
}