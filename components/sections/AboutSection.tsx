'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Target, Globe, Award, Users } from 'lucide-react';

export default function AboutSection() {
  return (
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
  );
}

