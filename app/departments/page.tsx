'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Shield,
  Building2,
  Laptop,
  Scale,
  DollarSign,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';

export default function Departments() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const departments = [
    {
      id: "security-logistics",
      title: "Security & Logistics",
      leadership: "Director of Security Logistics",
      icon: Shield,
      description: "Overseeing provision of security operations, logistics, defense procurement, armored vehicles, and more.",
      image: "https://images.pexels.com/photos/8872465/pexels-photo-8872465.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "corporate-services",
      title: "Corporate Services & Information Management",
      leadership: "Director",
      icon: Building2,
      description: "Responsible for governance processes, information systems, and administrative excellence.",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "it",
      title: "IT Department",
      leadership: "IT Director",
      icon: Laptop,
      description: "Managing information technology infrastructure, systems development, and digital transformation initiatives.",
      image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "legal",
      title: "Legal Department",
      leadership: "General Counsel / Legal Officer",
      icon: Scale,
      description: "Providing legal oversight, contract management, and regulatory compliance.",
      image: "https://images.pexels.com/photos/5668856/pexels-photo-5668856.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "finance",
      title: "Finance, Budget and Accounting",
      leadership: "Director, Finance, Budget & Accounting",
      icon: DollarSign,
      description: "Financial reporting, treasury operations, budgeting, and audit controls.",
      image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "project-management",
      title: "Project Management Office",
      leadership: "Director of Project Management",
      icon: Target,
      description: "Overseeing planning, execution, and delivery across all organizational projects.",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "business-development",
      title: "Business Development",
      leadership: "Business Development Officer",
      icon: TrendingUp,
      description: "Responsible for new market entries, partnerships, and investment strategy.",
      image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "hr",
      title: "Human Resources",
      leadership: "HR Director",
      icon: Users,
      description: "Managing talent acquisition, staff development, payroll, and organizational culture.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    <div className="pt-[5.5rem]">
      {/* Hero Section */}
      <section className="py-20 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Department <span className="text-red-400">Leadership</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Meet the dedicated professionals leading our specialized departments.
            </p>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, index) => {
              const Icon = dept.icon;
              return (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-red-200 group">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={dept.image}
                        alt={dept.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <div className="bg-red-600 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                        {dept.title}
                      </CardTitle>
                      <CardDescription className="text-red-600 font-semibold">
                        {dept.leadership}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">{dept.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
