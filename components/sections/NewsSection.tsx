'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import { newsUpdate } from '@/store/newsUpdate';

export default function NewsSection() {
  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Latest <span className="text-gradient">News & Updates</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay informed about our latest achievements and developments
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsUpdate.map((news) => (
            <article key={news.id} className="bg-gray-100 rounded-lg shadow-lg overflow-hidden card-hover">
              <div className="h-48 overflow-hidden">
                <Image
                  src={news.image}
                  alt={news.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                    {news.category}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(news.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {news.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{news.readTime}</span>
                  <Link 
                    href={`/news/${news.id}`}
                    className="text-red-600 hover:text-red-700 font-semibold text-sm flex items-center"
                  >
                    Read More <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/news" className="btn-primary">
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
}

