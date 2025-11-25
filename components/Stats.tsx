'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';

type Stat = {
  number: number;
  label: string;
  suffix: string;
  prefix?: string;
};

interface StatsProps {
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  { number: 80, label: 'Asset Base', suffix: 'M+', prefix: '$' },
  { number: 50, label: 'Annual Imports', suffix: 'M', prefix: '$' },
  { number: 600, label: 'Trained Guards', suffix: '+' },
  { number: 200, label: 'Housing Units Built', suffix: '+' }
];

export default function Stats({ stats = defaultStats }: StatsProps) {
  return (
    <motion.section
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="mb-2">
                <AnimatedCounter 
                  end={stat.number} 
                  suffix={stat.suffix} 
                  prefix={stat.prefix}
                />
              </div>
              <div className="text-gray-600 font-medium text-sm lg:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

