'use client';

import { useEffect, useState } from 'react';
import { Shield, Building, Users, Scale, DollarSign, Target, TrendingUp, UserCheck } from 'lucide-react';
import Image from 'next/image';

export default function Departments() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const departments = [
    {
      icon: Shield,
      name: 'Security and Logistics',
      director: 'Director of Security Services',
      bio: 'Overseeing comprehensive security operations, logistics management, and strategic security partnerships. Leading a team of security professionals dedicated to protecting assets, personnel, and maintaining operational excellence across all security initiatives.',
      image: 'https://images.pexels.com/photos/8872465/pexels-photo-8872465.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Building,
      name: 'Corporate Services & Information Management',
      director: 'Director',
      bio: 'Managing corporate governance, information systems, and administrative services. Ensuring efficient operations, data management, and technological infrastructure that supports the organization\'s strategic objectives.',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Scale,
      name: 'Legal Department',
      director: 'General Counsel / Legal Officer',
      bio: 'Providing expert legal counsel, contract management, and regulatory compliance. Ensuring all business operations adhere to legal standards while protecting the organization\'s interests and maintaining ethical business practices.',
      image: 'https://images.pexels.com/photos/5668856/pexels-photo-5668856.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: DollarSign,
      name: 'Finance, Budget and Accounting',
      director: 'Director, Finance, Budget and Accounting',
      bio: 'Managing financial operations, budgeting, accounting, and fiscal planning. Ensuring financial stability, transparency, and strategic financial management to support sustainable business growth and operational excellence.',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Target,
      name: 'Project Management Office',
      director: 'Director of Project Management',
      bio: 'Overseeing project planning, execution, and delivery across all business divisions. Implementing best practices in project management to ensure timely, cost-effective, and high-quality project outcomes.',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: TrendingUp,
      name: 'Business Development',
      director: 'Business Development Officer',
      bio: 'Driving strategic growth initiatives, market expansion, and business partnerships. Identifying new opportunities, fostering client relationships, and developing innovative business strategies to enhance market position.',
      image: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: UserCheck,
      name: 'Human Resources',
      director: 'HRO',
      bio: 'Managing talent acquisition, employee development, and organizational culture. Ensuring effective human resource policies, employee satisfaction, and professional development programs that support organizational success.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600'
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
              Our <span className="text-red-400">Departments</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Expert leadership driving excellence across all our business divisions
            </p>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Department <span className="text-gradient">Leadership</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Meet the dedicated professionals leading our specialized departments
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover border border-gray-100">
                <div className="h-64 overflow-hidden">
                  <Image
                    src={dept.image}
                    alt={dept.name}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <dept.icon className="h-8 w-8 text-red-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">{dept.name}</h3>
                  </div>
                  <div className="mb-6">
                    <p className="text-red-600 font-semibold text-lg mb-2">{dept.director}</p>
                    <p className="text-gray-600 leading-relaxed">{dept.bio}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      <Users className="h-4 w-4 inline mr-1" />
                      Department Active
                    </span>
                    <span className="text-red-600 font-semibold">Leadership Team</span>
                  </div>
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
            Connect with Our Departments
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Ready to collaborate with our expert teams? Contact us to discuss your specific needs.
          </p>
          <a href="/contact" className="btn-secondary text-lg px-8 py-4">
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
} 