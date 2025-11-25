'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Handshake, Building2, Users, TrendingUp, Globe, Award, ArrowRight, CheckCircle2, Briefcase, Target, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Partnership() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const whyPartner = [
    {
      icon: Award,
      title: 'Trusted by Multiple Agencies',
      description: 'Proven track record with Nigerian state and federal government agencies'
    },
    {
      icon: Globe,
      title: 'Strong Global Supply Chain',
      description: 'Strategic partnerships across Dubai, China, Europe, and beyond'
    },
    {
      icon: TrendingUp,
      title: 'Proven Excellence',
      description: 'Outstanding performance across security, construction, procurement, aviation, IT, and emerging sectors'
    },
    {
      icon: Target,
      title: 'Commitment to Innovation',
      description: 'Dedicated to quality, innovation, and long-term sustainable success'
    }
  ];

  const waysToPartner = [
    {
      icon: Building2,
      title: 'Government Collaborations',
      description: 'Strategic partnerships with federal and state agencies for national development projects',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Users,
      title: 'Technical Partnerships',
      description: 'Collaborate on technical expertise, knowledge sharing, and capacity building initiatives',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: Handshake,
      title: 'Joint Ventures',
      description: 'Form strategic joint ventures to tackle large-scale projects and expand market reach',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Investment Opportunities',
      description: 'Explore investment opportunities in emerging sectors and innovative ventures',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      icon: Briefcase,
      title: 'Project Development Alliances',
      description: 'Partner on project development from conception to completion and beyond',
      color: 'bg-red-50 text-red-600'
    }
  ];

  const benefits = [
    'Access to extensive government and private sector networks',
    'World-class infrastructure and operational capabilities',
    'Proven track record of successful project delivery',
    'Innovation-driven approach to problem-solving',
    'Long-term commitment to partnership success',
    'Comprehensive support throughout collaboration lifecycle'
  ];

  return (
    <div className="pt-[5rem]">
      {/* Hero Section */}
      <section className="py-20 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Partnership and <span className="text-red-400">Collaboration</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                Join Our Network of Growth and Innovation
              </p>
              {/* <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                At Vinicius International, we believe in strategic partnerships that drive national development, 
                empower industries, and create sustainable value across Africa.
              </p> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partner With Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Partner <span className="text-red-600">With Us</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Let&apos;s Build the Future Together
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-4">
              Partner with Vinicius International and bring impactful, world-class solutions to life.
            </p>
          </motion.div> */}

          {/* Why Partner With Us */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Why Partner <span className="text-red-600">With Us?</span>
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyPartner.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-100 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Ways to Partner */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Ways to <span className="text-red-600">Partner</span>
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore various partnership models tailored to your organization&apos;s needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {waysToPartner.map((way, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-100 group"
                >
                  <div className={`w-16 h-16 ${way.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <way.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                    {way.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {way.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-8 md:p-12 mb-20"
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <Zap className="w-16 h-16 text-red-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Partnership <span className="text-red-600">Benefits</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-md"
                  >
                    <CheckCircle2 className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 font-medium">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-white"
          >
            <h3 className="text-4xl font-bold mb-4">
              Let&apos;s Build the Future <span className="text-red-400">Together</span>
            </h3>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Partner with Vinicius International and bring impactful, world-class solutions to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                <Link href="/about" className="flex items-center gap-2">
                  Learn More About Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

