'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image 
                  src="/logo.png"
                  alt="Vinicius International Logo"
                  width={60}
                  height={60}
                  className="rounded-full w-10 h-10 bg-white"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Vinicius International
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Building, Securing, and Powering the Future of Nigeria through excellence and innovation.
            </p>
            <div className="flex space-x-3">
              <Link 
                href="https://instagram.com/Vinicius_intl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <Instagram className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </Link>
              <Link 
                href="https://twitter.com/Vinicius_intl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-gray-800 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <Twitter className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </Link>
              <Link 
                href="https://tiktok.com/@Vinicius_intl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-gray-800 hover:bg-black rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <svg className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </Link>
              <Link 
                href="https://linkedin.com/company/Vinicius_intl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </Link>
              <Link 
                href="https://facebook.com/Vinicius_intl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <Facebook className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <div className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/services', label: 'Services' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/news', label: 'News' },
                { href: '/contact', label: 'Contact Us' }
              ].map((link, index) => (
                <Link 
                  key={index}
                  href={link.href} 
                  className="group flex items-center text-gray-400 hover:text-red-500 transition-all duration-300 text-sm"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-red-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-white mb-4">Our Services</h3>
            <div className="space-y-3 text-sm">
              {[
                'Security & Solitary Solutions',
                'Construction Services',
                'Automobile Solutions',
                'Private Aviation',
                'Agro-Trade',
                'Emerging Ventures'
              ].map((service, index) => (
                <Link 
                  key={index}
                  href="/services" 
                  className="group flex items-center text-gray-400 hover:text-red-500 transition-all duration-300"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-red-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  {service}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-red-600/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-600/20 transition-colors">
                  <MapPin className="h-5 w-5 text-red-500" />
                </div>
                <p className="text-gray-400 text-sm leading-relaxed pt-2">
                  13B Shettima Mongonu Crescent, Utako, Abuja, Nigeria
                </p>
              </div>
              <Link 
                href="mailto:info@viniciusint.com" 
                className="flex items-center space-x-3 group"
              >
                <div className="w-10 h-10 bg-red-600/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-600/20 transition-colors">
                  <Mail className="h-5 w-5 text-red-500" />
                </div>
                <span className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm pt-2">
                  info@viniciusint.com
                </span>
              </Link>
              <Link 
                href="tel:+2347000000000" 
                className="flex items-center space-x-3 group"
              >
                <div className="w-10 h-10 bg-red-600/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-600/20 transition-colors">
                  <Phone className="h-5 w-5 text-red-500" />
                </div>
                <span className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm pt-2">
                  +234 70x xxx xxxx
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Vinicius International. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-red-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-red-500 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}