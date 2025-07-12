'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setActiveHash(window.location.hash);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleScroll);
    };
  }, []);

  const navItems = [
    { href: '/about', label: 'About Us' },
    { href: '/departments', label: 'Departments' },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/news', label: 'News' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) {
      return pathname === '/' && activeHash === href.replace('/','');
    }
    return pathname === href;
  };

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', href);
      }
      setIsOpen(false);
    }
  };

  // Always show all nav links on all pages
  const linksToShow = navItems;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-black/20 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            {/* Red and black logo SVG */}
            <Image 
              src="/logo.png"
              alt="logo"
              width={70}
              height={70}
            />
            <span className={`text-xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-black' : 'text-white'
            }`}>
              Vinicius International
            </span>
          </Link>

          {/* Desktop Menu - Center */}
          <div className="hidden lg:flex space-x-8">
            {linksToShow.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-medium transition-all duration-300 hover:text-red-600 relative ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                } ${isActive(item.href) ? 'text-red-600' : ''}`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Contact Button - Right */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                isScrolled 
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl' 
                  : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30'
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden transition-colors duration-300 ${
              isScrolled ? 'text-black' : 'text-white'
            }`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {linksToShow.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block px-3 py-2 font-medium transition-colors duration-300 ${
                    isActive(item.href) 
                      ? 'text-red-600 bg-red-50' 
                      : 'text-gray-700 hover:text-red-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block mx-3 mt-4 px-3 py-2 bg-red-600 text-white text-center rounded-lg font-medium hover:bg-red-700 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}