"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleDropdownEnter = (itemName: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(itemName);
  };

  const handleDropdownLeave = () => {
    // Add a small delay before closing to allow mouse movement
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Navigation structure with dropdowns
  const navStructure = [
    {
      name: "Company",
      href: "/about",
      dropdown: [
        { name: "About Us", href: "/about" },
        { name: "Departments", href: "/departments" },
        { name: "Careers", href: "/careers" },
      ]
    },
    {
      name: "Services",
      href: "/services",
      dropdown: null
    },
    {
      name: "Media",
      href: "/gallery",
      dropdown: [
        { name: "Gallery", href: "/gallery" },
        { name: "News", href: "/news" },
      ]
    },
    {
      name: "Partnership",
      href: "/partnership",
      dropdown: null
    }
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  const navLinkClasses = (isActive: boolean) => {
    const base = "px-3 py-2 text-sm lg:text-base font-semibold relative transition-all duration-300 flex items-center gap-1";
    
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

            {/* Logo - Mobile (Left Aligned) */}
            <Link 
              href="/" 
              className="md:hidden flex items-center gap-2"
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
              <span className={`text-lg font-bold transition-colors duration-300 ${
                isScrolled ? "text-gray-900" : "text-white"
              }`}>
                Vinicius International
              </span>
            </Link>

            {/* Desktop Navigation - Centered Links with Dropdowns */}
            <div className="hidden md:flex flex-1 items-center justify-center">
              <div className="flex items-center gap-1 lg:gap-2" ref={dropdownRef}>
                {navStructure.map((item) => (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => item.dropdown && handleDropdownEnter(item.name)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {item.dropdown ? (
                      <>
                        <button
                          className={navLinkClasses(isActive(item.href))}
                          onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        >
                          {item.name}
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                            openDropdown === item.name ? "rotate-180" : ""
                          }`} />
                        </button>
                        
                        {/* Dropdown Menu - with padding to bridge gap */}
                        {openDropdown === item.name && (
                          <div 
                            className="absolute top-full left-0 pt-2 w-64"
                            onMouseEnter={handleDropdownEnter.bind(null, item.name)}
                            onMouseLeave={handleDropdownLeave}
                          >
                            <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className={`block px-4 py-2 text-sm transition-colors ${
                                    isActive(subItem.href)
                                      ? "text-red-600 bg-red-50 font-semibold"
                                      : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                                  }`}
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={navLinkClasses(isActive(item.href))}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
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
                    : "bg-white hover:bg-red-600 hover:text-white text-gray-900 border border-white/30 hover:border-red-600"
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
          <div className="flex-1 px-4 py-6 space-y-1">
            {navStructure.map((item, index) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => setMobileDropdownOpen(mobileDropdownOpen === item.name ? null : item.name)}
                      className={`w-full ${mobileLinkClasses(isActive(item.href))} flex items-center justify-between`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        mobileDropdownOpen === item.name ? "rotate-180" : ""
                      }`} />
                    </button>
                    {mobileDropdownOpen === item.name && (
                      <div className="pl-4 mt-1 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`block px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                              isActive(subItem.href)
                                ? isScrolled
                                  ? "text-red-600 bg-red-50 font-semibold"
                                  : "text-white bg-white/20 font-semibold"
                                : isScrolled
                                  ? "text-gray-600 hover:text-red-600 hover:bg-gray-50"
                                  : "text-white/80 hover:text-white hover:bg-white/10"
                            }`}
                            onClick={closeMenu}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`${mobileLinkClasses(isActive(item.href))} ${
                      isMenuOpen ? "animate-in slide-in-from-right duration-300" : ""
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200/10">
            <Button
              asChild
              className={`w-full py-3 text-base font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 ${
                isScrolled
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-white hover:bg-red-600 hover:text-white text-gray-900"
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
