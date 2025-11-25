'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Target, 
  TrendingUp, 
  Users, 
  Award, 
  ArrowRight, 
  Briefcase,
  GraduationCap,
  Mail
} from 'lucide-react';

export default function Careers() {
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
    }
  ];

  const topOpportunities = [
    {
      icon: Briefcase,
      title: 'Security & Defense Solutions',
      description: 'Join our security division working with government agencies on critical national security projects'
    },
    {
      icon: Award,
      title: 'Construction & Infrastructure',
      description: 'Build Nigeria\'s future through road construction, building projects, and infrastructure development'
    },
    {
      icon: Target,
      title: 'IT & Technologies',
      description: 'Drive innovation in technology solutions and digital transformation initiatives'
    }
  ];

  return (
    <section id="careers" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Careers at <span className="text-red-600">Vinicius International</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Build Your Future With Us
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            At Vinicius International, we are shaping Africa&apos;s future through innovation, excellence, 
            and national development. We&apos;re always looking for talented, driven, and passionate 
            individuals to join our growing team.
          </p>
        </motion.div>

        {/* Why Work With Us */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Work <span className="text-red-600">With Us?</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Available Opportunities */}
        <div className="mb-12">
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
              Join us in any of our key divisions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topOpportunities.map((opportunity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-100 group"
              >
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <opportunity.icon className="w-7 h-7 text-red-600" />
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

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <div className="max-w-3xl mx-auto">
            <GraduationCap className="w-16 h-16 mx-auto mb-6 text-white/90" />
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Grow <span className="text-white">With Us</span>
            </h3>
            <p className="text-xl text-red-50 mb-8 max-w-2xl mx-auto">
              At Vinicius International, your talent, creativity, and ambition have a home. 
              Join us and become part of a mission that transforms industries and communities across Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/careers"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-red-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                View All Opportunities
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="mailto:careers@viniciusint.com"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Apply Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

