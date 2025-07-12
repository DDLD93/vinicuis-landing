'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Search, Filter, Tag } from 'lucide-react';

export default function News() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const newsArticles = [
    {
      id: 1,
      title: 'Vinicius International Delivers 50 Armored Vehicles to Nigerian Security Forces',
      excerpt: 'In a landmark achievement, Vinicius International has successfully delivered 50 state-of-the-art armored vehicles to enhance national security capabilities. This delivery represents our commitment to supporting Nigeria\'s defense infrastructure.',
      content: 'Full article content would go here...',
      date: '2024-01-15',
      category: 'Security',
      author: 'Corporate Communications',
      image: 'https://images.pexels.com/photos/8828687/pexels-photo-8828687.jpeg?auto=compress&cs=tinysrgb&w=800',
      readTime: '3 min read',
      tags: ['Security', 'Government', 'Defense']
    },
    {
      id: 2,
      title: 'New Construction Project: 100-Unit Housing Estate in Abuja',
      excerpt: 'Saiha Constructions breaks ground on ambitious housing project that will provide affordable homes for government workers. The project is expected to be completed within 18 months.',
      content: 'Full article content would go here...',
      date: '2024-01-10',
      category: 'Construction',
      author: 'Saiha Constructions Team',
      image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800',
      readTime: '4 min read',
      tags: ['Construction', 'Housing', 'Abuja']
    },
    {
      id: 3,
      title: 'Record Agricultural Exports: $5M in International Trade',
      excerpt: 'Richfood Essentials achieves milestone with record-breaking agricultural exports to European and Asian markets. This success demonstrates our growing international presence.',
      content: 'Full article content would go here...',
      date: '2024-01-05',
      category: 'Agro-Trade',
      author: 'Richfood Essentials',
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
      readTime: '2 min read',
      tags: ['Agriculture', 'Export', 'International']
    },
  ];

  const categories = ['All', 'Security', 'Construction', 'Agro-Trade', 'Aviation'];

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-[5.5rem]">
      {/* Hero Section */}
      <section className="py-20 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              News & <span className="text-red-400">Updates</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Stay informed about our latest achievements, projects, and developments across all divisions
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Articles Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
                <div className="h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {article.readTime}
                    </div>
                    <Link 
                      href={`/news/${article.id}`}
                      className="text-red-600 hover:text-red-700 font-semibold text-sm flex items-center"
                    >
                      Read More <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">By {article.author}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated with <span className="text-gradient">Vinicius International</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
            <button className="btn-primary px-6 py-3">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Want to Learn More About Our Projects?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Contact us to discuss potential partnerships and learn more about our ongoing initiatives.
          </p>
          <Link href="/contact" className="btn-secondary text-lg px-8 py-4">
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
}