'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Globe, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  ExternalLink,
  Shield,
  Building,
  Plane,
  Truck,
  Laptop,
  Leaf,
  Pill,
  Trophy,
  FileText,
  DollarSign,
  GraduationCap,
  Target,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Careers() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const whyWorkWithUs = [
    {
      icon: Globe,
      title: 'Proudly Nigerian, Globally Connected',
      description: 'Be part of a proudly Nigerian conglomerate with global reach and international partnerships'
    },
    {
      icon: Target,
      title: 'Impactful Projects',
      description: 'Work on impactful projects across security, construction, procurement, aviation, IT, agro-trade, and more'
    },
    {
      icon: TrendingUp,
      title: 'Professional Growth',
      description: 'Professional growth, continuous learning, and leadership development opportunities'
    },
    {
      icon: Users,
      title: 'Inclusive Environment',
      description: 'Inclusive, dynamic, and collaborative work environment that values diversity'
    },
    {
      icon: Award,
      title: 'Prestigious Partnerships',
      description: 'Opportunities to work with government agencies and international partners'
    }
  ];

  const opportunities = [
    {
      icon: Shield,
      title: 'Security & Defense Solutions',
      description: 'Join our security division working with government agencies on critical national security projects',
      color: 'bg-red-50 text-red-600'
    },
    {
      icon: Building,
      title: 'Construction & Infrastructure',
      description: 'Build Nigeria\'s future through road construction, building projects, and infrastructure development',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Plane,
      title: 'Aviation Services',
      description: 'Work in private and commercial aviation operations supporting business and government needs',
      color: 'bg-sky-50 text-sky-600'
    },
    {
      icon: Truck,
      title: 'Procurement & Logistics',
      description: 'Manage complex supply chains and procurement operations across multiple sectors',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: Laptop,
      title: 'IT & Technologies',
      description: 'Drive innovation in technology solutions and digital transformation initiatives',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: Leaf,
      title: 'Agro-Trade',
      description: 'Support international agricultural trade and export operations with Richfood Essentials',
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      icon: Pill,
      title: 'Pharmaceuticals',
      description: 'Contribute to pharmaceutical development and healthcare solutions for Africa',
      color: 'bg-pink-50 text-pink-600'
    },
    {
      icon: Trophy,
      title: 'Sports Development',
      description: 'Help develop Nigeria\'s next generation of athletes through our football academy',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      icon: FileText,
      title: 'Corporate Services',
      description: 'Support business operations, strategy, and corporate development initiatives',
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      icon: DollarSign,
      title: 'Finance & Administration',
      description: 'Manage financial operations, accounting, and administrative functions',
      color: 'bg-teal-50 text-teal-600'
    }
  ];

  const benefits = [
    'Competitive compensation packages',
    'Comprehensive health and wellness benefits',
    'Professional development and training programs',
    'Opportunities for career advancement',
    'Work-life balance initiatives',
    'Collaborative and supportive team environment',
    'Access to cutting-edge technology and resources',
    'Recognition and rewards for outstanding performance'
  ];

  return (
    <div className="pt-[5.5rem]">
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
                Careers at <span className="text-red-400">Vinicius International</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                Build Your Future With Us
              </p>
              {/* <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                At Vinicius International, we are shaping Africa&apos;s future through innovation, excellence, 
                and national development. We&apos;re always looking for talented, driven, and passionate 
                individuals to join our growing team across multiple sectors.
              </p> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Work <span className="text-red-600">With Us?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join a team that&apos;s making a real difference across Nigeria and Africa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {whyWorkWithUs.map((item, index) => (
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

          {/* Available Opportunities */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Available <span className="text-red-600">Opportunities</span>
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join us in any of our key divisions and make an impact
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.map((opportunity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-100 group"
                >
                  <div className={`w-14 h-14 ${opportunity.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <opportunity.icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                    {opportunity.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {opportunity.description}
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
                  Employee <span className="text-red-600">Benefits</span>
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

          {/* How to Apply Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                How to Apply
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Submit your CV and a brief cover letter to:
              </p>
              <a
                href="mailto:careers@viniciusint.com"
                className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-lg transition-colors"
              >
                <Mail className="w-5 h-5" />
                careers@viniciusint.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6">
                <ExternalLink className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Application Portal
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Visit our online application portal for a streamlined application process:
              </p>
              <a
                href="https://www.viniciusint.com/careers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                www.viniciusint.com/careers
              </a>
            </motion.div>
          </div>

          {/* Internships & Graduate Trainee Programs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white mb-20"
          >
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">
                Internships & Graduate Trainee <span className="text-red-400">Programs</span>
              </h3>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                We offer structured internship and trainee programs designed to groom young professionals 
                and prepare them for long-term success. Gain hands-on experience, mentorship, and 
                professional development opportunities.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <a href="mailto:careers@viniciusint.com" className="flex items-center gap-2">
                  Apply for Internship
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-12 text-white"
          >
            <h3 className="text-4xl font-bold mb-4">
              Grow <span className="text-white">With Us</span>
            </h3>
            <p className="text-xl text-red-50 mb-8 max-w-2xl mx-auto">
              At Vinicius International, your talent, creativity, and ambition have a home. 
              Join us and become part of a mission that transforms industries and communities across Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white hover:bg-gray-100 text-red-600 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <a href="mailto:careers@viniciusint.com" className="flex items-center gap-2">
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
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

