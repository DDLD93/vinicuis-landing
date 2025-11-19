"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { name: "About Us", href: "/about" },
    { name: "Departments", href: "/departments" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "News", href: "/news" },
  ];

  const navLinkClasses = (isActive: boolean) => {
    const base = "px-3 py-2 text-sm lg:text-base font-semibold relative transition-all duration-300";
    
    if (isScrolled) {
      return `${base} ${
        isActive
          ? "text-red-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600"
          : "text-gray-700 hover:text-red-600 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 hover:after:w-full after:transition-all after:duration-300"
      }`;
    }
    
    return `${base} ${
      isActive
        ? "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white"
        : "text-white/90 hover:text-white after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all after:duration-300"
    }`;
  };

  const mobileLinkClasses = (isActive: boolean) => {
    const base = "block px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200";
    
    if (isScrolled) {
      return `${base} ${
        isActive
          ? "text-red-600 bg-red-50"
          : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
      }`;
    }
    
    return `${base} ${
      isActive
        ? "text-white bg-white/20"
        : "text-white/90 hover:text-white hover:bg-white/10"
    }`;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-black/20 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo - Desktop */}
            <Link 
              href="/" 
              className="hidden md:flex items-center gap-3 group"
              aria-label="Vinicius International Home"
            >
              <Image
                src="/logo.png"
                alt="Vinicius International Logo"
                width={64}
                height={64}
                className="rounded-full w-14 h-14 lg:w-16 lg:h-16 transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <span className={`text-xl lg:text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? "text-gray-900" : "text-white"
              }`}>
                Vinicius International
              </span>
            </Link>

            {/* Logo - Mobile (Centered) */}
            <Link 
              href="/" 
              className="md:hidden absolute left-1/2 -translate-x-1/2"
              aria-label="Vinicius International Home"
            >
              <Image
                src="/logo.png"
                alt="Vinicius International Logo"
                width={48}
                height={48}
                className="rounded-full w-12 h-12 transition-transform duration-300 active:scale-95"
                priority
              />
            </Link>

            {/* Spacer for mobile */}
            <div className="md:hidden w-10" />

            {/* Desktop Navigation - Centered Links */}
            <div className="hidden md:flex flex-1 items-center justify-center">
              <div className="flex items-center gap-1 lg:gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={navLinkClasses(pathname === link.href)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Button - Right */}
            <div className="hidden md:flex items-center">
              <Button
                asChild
                className={`text-sm lg:text-base px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95 ${
                  isScrolled
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-white hover:bg-white/90 text-gray-900 border border-white/30"
                }`}
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className={`md:hidden h-10 w-10 rounded-lg transition-colors duration-300 ${
                isScrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/20"
              }`}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed top-16 sm:top-20 right-0 bottom-0 w-full max-w-sm z-40 transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } ${
          isScrolled 
            ? "bg-white shadow-2xl" 
            : "bg-gray-900/95 backdrop-blur-xl"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex-1 px-4 py-6 space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className={`${mobileLinkClasses(pathname === link.href)} ${
                  isMenuOpen ? "animate-in slide-in-from-right duration-300" : ""
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200/10">
            <Button
              asChild
              className={`w-full py-3 text-base font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 ${
                isScrolled
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-white hover:bg-white/90 text-gray-900"
              }`}
            >
              <Link href="/contact" onClick={closeMenu}>
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;