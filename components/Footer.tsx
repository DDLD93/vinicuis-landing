import Link from 'next/link';
import { Shield, Mail, Phone, MapPin, Linkedin, Instagram, Twitter, Facebook } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
            <Image 
              src="/logo.png"
              alt="logo"
              width={70}
              height={70}
            />
              <span className="text-xl font-bold">Vinicius International</span>
            </div>
            <p className="text-gray-400">
              Building, Securing, and Powering the Future of Nigeria
            </p>
            <div className="flex space-x-4">
              <Link href="https://instagram.com/Vinicius_intl" target="_blank" className="text-gray-400 hover:text-red-600 transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com/Vinicius_intl" target="_blank" className="text-gray-400 hover:text-red-600 transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://tiktok.com/@Vinicius_intl" target="_blank" className="text-gray-400 hover:text-red-600 transition-colors duration-300">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </Link>
              <Link href="https://linkedin.com/company/Vinicius_intl" target="_blank" className="text-gray-400 hover:text-red-600 transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="https://facebook.com/Vinicius_intl" target="_blank" className="text-gray-400 hover:text-red-600 transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-red-600 transition-colors duration-300">
                Home
              </Link>
              <Link href="/about" className="block text-gray-400 hover:text-red-600 transition-colors duration-300">
                About Us
              </Link>
              <Link href="/services" className="block text-gray-400 hover:text-red-600 transition-colors duration-300">
                Services
              </Link>
              <Link href="/gallery" className="block text-gray-400 hover:text-red-600 transition-colors duration-300">
                Gallery
              </Link>
              <Link href="/news" className="block text-gray-400 hover:text-red-600 transition-colors duration-300">
                News
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-red-600 transition-colors duration-300">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <div className="space-y-2 text-sm">
              <Link href="/services" className="block text-gray-400 hover:text-red-600 transition-colors duration-300">
                Security & Solitary Solutions
              </Link>
              <Link href="/services" className="block text-gray-400 hover:text-red-600 transition-colors duration-300">
                Construction Services
              </Link>
              <Link href="/services" className="block text-gray-400 hover:text-red-600 transition-colors duration-300">
                Automobile Solutions
              </Link>
              <Link href="/services" className="block text-gray-400 hover:text-red-600 transition-colors duration-300">
                Private Aviation
              </Link>
              <Link href="/services" className="block text-gray-400 hover:text-red-600 transition-colors duration-300">
                Agro-Trade
              </Link>
              <Link href="/services" className="block text-gray-400 hover:text-red-600 transition-colors duration-300">
                Emerging Ventures
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-sm">
                  13B Shettima Mongonu Crescent, Utako, Abuja, Nigeria
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-600" />
                <Link href="mailto:info@vinicius.com" className="text-gray-400 hover:text-red-600 transition-colors duration-300">
                  info@vinicius.com
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-600" />
                <Link href="tel:+2347035469259" className="text-gray-400 hover:text-red-600 transition-colors duration-300">
                  +234 70x xxx xxxx
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Vinicius International. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}