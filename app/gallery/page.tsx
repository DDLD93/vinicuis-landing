'use client';

import { useEffect, useState } from 'react';
import { Expand, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const searchParams = useSearchParams();

  // Pagination settings
  const imagesPerPage = 9;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const galleryImages = [
    // Security Category - 8 images
    {
      src: '/security/1.jpg',
      title: 'Security Operations Center',
      category: 'Security'
    },
    {
      src: '/security/2.jpg',
      title: 'VIP Protection Services',
      category: 'Security'
    },
    {
      src: '/security/3.jpg',
      title: 'Security Training Facility',
      category: 'Security'
    },
    {
      src: '/security/4.jpg',
      title: 'Armored Vehicle Assembly',
      category: 'Security'
    },
    {
      src: '/security/5.jpg',
      title: 'Security Equipment',
      category: 'Security'
    },
    {
      src: '/security/6.jpg',
      title: 'Security Personnel Training',
      category: 'Security'
    },
    {
      src: '/security/7.jpg',
      title: 'Advanced Security Systems',
      category: 'Security'
    },
    {
      src: '/security/8.jpg',
      title: 'Security Infrastructure',
      category: 'Security'
    },
    
    // Construction Category - 15 images
    {
      src: '/construction/1.jpg',
      title: 'Commercial Plaza Development',
      category: 'Construction'
    },
    {
      src: '/construction/2.jpg',
      title: 'Infrastructure Projects',
      category: 'Construction'
    },
    {
      src: '/construction/3.jpg',
      title: 'Housing Complex',
      category: 'Construction'
    },
    {
      src: '/construction/4.jpg',
      title: 'Modern Building Construction',
      category: 'Construction'
    },
    {
      src: '/construction/5.jpg',
      title: 'Construction Site Management',
      category: 'Construction'
    },
    {
      src: '/construction/6.jpg',
      title: 'Road Construction',
      category: 'Construction'
    },
    {
      src: '/construction/7.jpg',
      title: 'Industrial Construction',
      category: 'Construction'
    },
    {
      src: '/construction/8.jpg',
      title: 'Residential Development',
      category: 'Construction'
    },
    {
      src: '/construction/9.jpg',
      title: 'Commercial Building',
      category: 'Construction'
    },
    {
      src: '/construction/10.jpg',
      title: 'Construction Equipment',
      category: 'Construction'
    },
    {
      src: '/construction/11.jpg',
      title: 'Project Management',
      category: 'Construction'
    },
    {
      src: '/construction/12.jpg',
      title: 'Quality Control',
      category: 'Construction'
    },
    {
      src: '/construction/13.jpg',
      title: 'Site Planning',
      category: 'Construction'
    },
    {
      src: '/construction/14.jpg',
      title: 'Structural Engineering',
      category: 'Construction'
    },
    {
      src: '/construction/15.jpg',
      title: 'Final Project Delivery',
      category: 'Construction'
    },
    
    // Automobile Category - 2 images
    {
      src: '/automobile/1.jpg',
      title: 'Automotive Manufacturing',
      category: 'Automobile'
    },
    {
      src: '/automobile/2.jpg',
      title: 'Vehicle Assembly Line',
      category: 'Automobile'
    },
    // ASCC Security Category
    {
      src: '/ascc-security/Gemini_Generated_Image_od0a3qod0a3qod0a.png',
      title: 'ASCC Security 1',
      category: 'ASCC Security'
    },
    {
      src: '/ascc-security/Gemini_Generated_Image_2ifxgy2ifxgy2ifx.png',
      title: 'ASCC Security 2',
      category: 'ASCC Security'
    },
    {
      src: '/ascc-security/Gemini_Generated_Image_giw8c0giw8c0giw8.png',
      title: 'ASCC Security 3',
      category: 'ASCC Security'
    },
    {
      src: '/ascc-security/Gemini_Generated_Image_c53qnvc53qnvc53q.png',
      title: 'ASCC Security 4',
      category: 'ASCC Security'
    },
    {
      src: '/ascc-security/Gemini_Generated_Image_kz0px0kz0px0kz0p.png',
      title: 'ASCC Security 5',
      category: 'ASCC Security'
    },
    // Agro-Trade (Richfood Essentials) Category
    {
      src: '/agro-trade-richfood-essentials/Gemini_Generated_Image_8jxtld8jxtld8jxt.png',
      title: 'Agro-Trade (Richfood Essentials) 1',
      category: 'Agro-Trade (Richfood Essentials)'
    },
    // Pharmaceutical Development Category
    {
      src: '/pharmaceutical-development/Gemini_Generated_Image_jxw2b3jxw2b3jxw2.png',
      title: 'Pharmaceutical Development 1',
      category: 'Pharmaceutical Development'
    },
    // Football Academy Category
    {
      src: '/football-academy/Gemini_Generated_Image_9a58gj9a58gj9a58.png',
      title: 'Football Academy 1',
      category: 'Football Academy'
    }
  ];

  const categories = ['All', 'Security', 'Construction', 'Automobile', 'ASCC Security', 'Agro-Trade (Richfood Essentials)', 'Pharmaceutical Development', 'Football Academy'];
  
  // Get initial category from URL parameter or default to 'All'
  const initialCategory = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  // Update active category when URL parameter changes
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
      setCurrentPage(1); // Reset to first page when category changes
    }
  }, [searchParams]);

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  // Filter out images that failed to load
  const validImages = filteredImages.filter(img => !imageErrors.has(img.src));

  // Pagination calculations
  const totalPages = Math.ceil(validImages.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = validImages.slice(startIndex, endIndex);

  // Handle image load errors
  const handleImageError = (imageSrc: string) => {
    setImageErrors(prev => new Set(prev).add(imageSrc));
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="pt-[5.5rem]">
      {/* Hero Section */}
      <section className="py-20 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-red-400">Gallery</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              A quick look at our projects, facilities, and operations across Nigeria
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Filters */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentPage(1); // Reset to first page when category changes
                }}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentImages.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentImages.map((image, index) => (
                  <div 
                    key={index} 
                    className="relative group card-hover bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(image.src)}
                  >
                    <div className="aspect-square overflow-hidden bg-gray-100">
                      <Image
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        width={300}
                        height={300}
                        onError={() => handleImageError(image.src)}
                        priority={index < 6} // Prioritize first 6 images
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <Expand className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-white font-semibold">{image.title}</h3>
                      <p className="text-gray-200 text-sm">{image.category}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    {/* Previous Button */}
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg transition-colors duration-300 ${
                        currentPage === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-600 hover:text-red-600 hover:bg-gray-100'
                      }`}
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center space-x-1">
                      {getPageNumbers().map((page, index) => (
                        <button
                          key={index}
                          onClick={() => typeof page === 'number' && goToPage(page)}
                          className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                            page === currentPage
                              ? 'bg-red-600 text-white shadow-lg'
                              : page === '...'
                              ? 'text-gray-400 cursor-default'
                              : 'text-gray-600 hover:text-red-600 hover:bg-gray-100'
                          }`}
                          disabled={page === '...'}
                          aria-label={typeof page === 'number' ? `Go to page ${page}` : undefined}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-lg transition-colors duration-300 ${
                        currentPage === totalPages
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-600 hover:text-red-600 hover:bg-gray-100'
                      }`}
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Page Info */}
              {totalPages > 1 && (
                <div className="mt-4 text-center text-gray-600">
                  <p>
                    Showing {startIndex + 1}-{Math.min(endIndex, validImages.length)} of {validImages.length} images
                    {activeCategory !== 'All' && ` in ${activeCategory}`}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No images found</h3>
              <p className="text-gray-500">No images available for the selected category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={selectedImage}
              alt="Gallery Image"
              className="max-w-full max-h-full rounded-lg"
              width={800}
              height={800}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-red-400 text-2xl"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Interested in Our Projects?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Contact us to learn more about our capabilities and how we can support your next project.
          </p>
          <a href="/contact" className="btn-secondary text-lg px-8 py-4">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}