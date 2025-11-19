'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';

const stats = [
  { number: 80, label: 'Asset Base', suffix: 'M+', prefix: '$' },
  { number: 50, label: 'Annual Imports', suffix: 'M', prefix: '$' },
  { number: 600, label: 'Trained Guards', suffix: '+' },
  { number: 200, label: 'Housing Units Built', suffix: '+' }
];

export default function StatsSection() {
  return (
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
  );
}

