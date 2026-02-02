"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface NavLink {
  name: string;
  href: string;
  type: "anchor" | "route";
}

interface NavDropdown {
  label: string;
  items: NavLink[];
}
// add

const navStructure: (NavLink | NavDropdown)[] = [
  {
    label: "Company",
    items: [
      { name: "About", href: "#about", type: "anchor" },
      { name: "Divisions", href: "#divisions", type: "anchor" },
      { name: "Departments", href: "/departments", type: "route" },
    ],
  },
  {
    label: "Resources",
    items: [
      { name: "Careers", href: "/careers", type: "route" },
      { name: "Partnership", href: "/partnership", type: "route" },
    ],
  },
  {
    label: "Media",
    items: [
      { name: "News", href: "/news", type: "route" },
      { name: "Gallery", href: "/gallery", type: "route" },
    ],
  },
  { name: "Contact", href: "/contact", type: "route" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section - collect all anchor links from nav structure
      const sections: string[] = [];
      navStructure.forEach((item) => {
        if ("items" in item) {
          item.items.forEach((link) => {
            if (link.type === "anchor" && link.href.startsWith("#")) {
              sections.push(link.href.replace("#", ""));
            }
          });
        } else if (item.type === "anchor" && item.href.startsWith("#")) {
          sections.push(item.href.replace("#", ""));
        }
      });
      
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
      
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };
    
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    if (isMobileMenuOpen) {
      window.addEventListener("scroll", handleScroll);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const pathname = usePathname();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, type: string) => {
    if (type === "route") {
      setIsMobileMenuOpen(false);
      return; // Let Next.js handle the navigation
    }
    
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // If we're not on the home page, navigate to home first
    if (pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
    
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  const isLinkActive = (link: NavLink): boolean => {
    if (link.type === "route") {
      return pathname === link.href;
    }
    if (link.type === "anchor") {
      if (pathname !== "/") return false;
      if (link.href === "#") {
        return activeSection === "" && window.scrollY < 100;
      }
      return activeSection === link.href.replace("#", "");
    }
    return false;
  };

  const isDropdownActive = (dropdown: NavDropdown): boolean => {
    return dropdown.items.some((item) => isLinkActive(item));
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-gradient-to-r from-primary/95 via-red-900/95 to-primary/95 backdrop-blur-xl shadow-2xl shadow-primary/20 border-b border-primary/30"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex items-center justify-between py-3 sm:py-4 min-h-[72px] sm:min-h-[88px] lg:min-h-0">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            href="/" 
            className="flex items-center gap-2 relative z-10"
          >
            <img 
              src="/logo.png" 
              alt="Vinicius Group" 
              className={`object-contain bg-white rounded-full p-1.5 sm:p-2 transition-all duration-300 ${
                isScrolled ? "w-12 h-12 sm:w-16 sm:h-16" : "w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
              }`}
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {navStructure.map((item) => {
            // Handle dropdown
            if ("items" in item) {
              const isActive = isDropdownActive(item);
              const dropdownClassName = `relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                isActive 
                  ? isScrolled 
                    ? "text-white" 
                    : "text-primary"
                  : isScrolled
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-foreground/80 hover:text-foreground hover:bg-accent/50"
              }`;

              return (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <button className={dropdownClassName}>
                      <span className="flex items-center gap-1">
                        {item.label}
                        <ChevronDown className="w-4 h-4" />
                      </span>
                      {isActive && (
                        <motion.div
                          className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                            isScrolled ? "bg-white" : "bg-primary"
                          }`}
                          layoutId={`activeDropdown-${item.label}`}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 ${
                        isScrolled ? "bg-white/10" : "bg-accent"
                      }`} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {item.items.map((link) => {
                      const linkIsActive = isLinkActive(link);
                      return link.type === "route" ? (
                        <DropdownMenuItem key={link.name} asChild>
                          <Link
                            href={link.href}
                            className={`cursor-pointer ${linkIsActive ? "bg-accent" : ""}`}
                          >
                            {link.name}
                          </Link>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          key={link.name}
                          asChild
                        >
                          <a
                            href={link.href}
                            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                              e.preventDefault();
                              handleNavClick(e, link.href, link.type);
                            }}
                            className={`cursor-pointer ${linkIsActive ? "bg-accent" : ""}`}
                          >
                            {link.name}
                          </a>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            // Handle regular link
            const link = item as NavLink;
            const isActive = isLinkActive(link);
            const linkClassName = `relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
              isActive 
                ? isScrolled 
                  ? "text-white" 
                  : "text-primary"
                : isScrolled
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-foreground/80 hover:text-foreground hover:bg-accent/50"
            }`;
            
            const content = (
              <>
                {link.name}
                {isActive && (
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                      isScrolled ? "bg-white" : "bg-primary"
                    }`}
                    layoutId={`activeLink-${link.name}`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 ${
                  isScrolled ? "bg-white/10" : "bg-accent"
                }`} />
              </>
            );
            
            return link.type === "route" ? (
              <Link
                key={link.name}
                href={link.href}
                className={linkClassName}
              >
                {content}
              </Link>
            ) : (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.type)}
                className={linkClassName}
              >
                {content}
              </a>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/contact"
              className={`inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group ${
                isScrolled
                  ? "bg-white text-primary hover:shadow-white/50 shadow-lg"
                  : "bg-primary text-primary-foreground hover:shadow-red"
              }`}
            >
              <span className="relative z-10">Get in Touch</span>
              <span className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isScrolled 
                  ? "bg-gradient-to-r from-white to-gray-100" 
                  : "bg-gradient-to-r from-primary to-red-600"
              }`} />
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          className={`lg:hidden p-2 relative z-10 rounded-lg transition-colors duration-300 ${
            isScrolled
              ? "text-white hover:bg-white/10"
              : "text-foreground hover:bg-accent"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              className="lg:hidden fixed top-[72px] sm:top-[88px] left-0 right-0 bottom-0 bg-background/98 backdrop-blur-lg shadow-2xl border-t border-border z-50 overflow-y-auto pb-[env(safe-area-inset-bottom)]"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <nav className="container py-6 sm:py-8 flex flex-col gap-2">
                {navStructure.map((item, index) => {
                  // Handle dropdown in mobile
                  if ("items" in item) {
                    const isOpen = openDropdowns[item.label] || false;
                    const isActive = isDropdownActive(item);
                    
                    return (
                      <Collapsible
                        key={item.label}
                        open={isOpen}
                        onOpenChange={(open) => setOpenDropdowns(prev => ({ ...prev, [item.label]: open }))}
                      >
                        <motion.div
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.08 }}
                        >
                          <CollapsibleTrigger
                            className={`w-full text-lg font-semibold transition-all py-4 px-6 rounded-xl relative overflow-hidden group text-left flex items-center justify-between ${
                              isActive
                                ? "text-primary bg-accent/80"
                                : "text-foreground/80 hover:text-foreground hover:bg-accent/50"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              {item.label}
                              {isActive && (
                                <motion.span
                                  className="w-2 h-2 rounded-full bg-primary"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                              )}
                            </span>
                            <ChevronRight
                              className={`w-5 h-5 transition-transform ${isOpen ? "rotate-90" : ""}`}
                            />
                            <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pl-4 mt-2 space-y-2">
                            {item.items.map((link, linkIndex) => {
                              const linkIsActive = isLinkActive(link);
                              const linkClassName = `block text-base font-medium transition-all py-3 px-6 rounded-lg relative overflow-hidden group ${
                                linkIsActive
                                  ? "text-primary bg-accent/60"
                                  : "text-foreground/70 hover:text-foreground hover:bg-accent/40"
                              }`;
                              
                              return link.type === "route" ? (
                                <Link
                                  key={link.name}
                                  href={link.href}
                                  className={linkClassName}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {link.name}
                                </Link>
                              ) : (
                                <a
                                  key={link.name}
                                  href={link.href}
                                  className={linkClassName}
                                  onClick={(e) => {
                                    handleNavClick(e, link.href, link.type);
                                    setIsMobileMenuOpen(false);
                                  }}
                                >
                                  {link.name}
                                </a>
                              );
                            })}
                          </CollapsibleContent>
                        </motion.div>
                      </Collapsible>
                    );
                  }

                  // Handle regular link
                  const link = item as NavLink;
                  const isActive = isLinkActive(link);
                  const linkClassName = `text-lg font-semibold transition-all py-4 px-6 rounded-xl relative overflow-hidden group ${
                    isActive
                      ? "text-primary bg-accent/80"
                      : "text-foreground/80 hover:text-foreground hover:bg-accent/50"
                  }`;
                  
                  const content = (
                    <>
                      <span className="relative z-10 flex items-center justify-between">
                        {link.name}
                        {isActive && (
                          <motion.span
                            className="w-2 h-2 rounded-full bg-primary"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  );
                  
                  return link.type === "route" ? (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.08 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={link.href}
                        className={linkClassName}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {content}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className={linkClassName}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.08 }}
                      onClick={(e) => handleNavClick(e, link.href, link.type)}
                      whileTap={{ scale: 0.98 }}
                    >
                      {content}
                    </motion.a>
                  );
                })}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-xl mt-6 transition-all duration-300 hover:shadow-red relative overflow-hidden group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="relative z-10">Get in Touch</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </motion.div>
                
                {/* Decorative elements */}
                <motion.div
                  className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
