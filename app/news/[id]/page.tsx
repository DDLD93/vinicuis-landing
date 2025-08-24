
import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Tag, User } from 'lucide-react';
import Image from 'next/image';
import ShareButton from '@/components/ShareButton';
import FloatingShareButton from '@/components/FloatingShareButton';
import { ShareData } from '@/lib/share-utils';
import { newsUpdate } from '@/store/newsUpdate';

export function generateStaticParams() {
    return newsUpdate.map((news) => ({ id: news.id }));
}

export default function NewsArticlePage({ params }: { params: { id: string } }) {
  const news = newsUpdate.find((n) => n.id === params.id);
  if (!news) return notFound();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="pt-[5.5rem] bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Breadcrumb */}
          <Link href="/news" className="inline-flex items-center text-red-600 hover:text-red-700 font-medium mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </Link>
          
          {/* Article Header */}
          <div className="mb-8 md:mb-12">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {news.category}
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(news.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {news.readTime}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {news.title}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
              {news.excerpt}
            </p>
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">By {news.author}</p>
                  <p className="text-xs text-gray-500">Vinicius International</p>
                </div>
              </div>
              
              <ShareButton 
                data={{
                  title: news.title,
                  url: typeof window !== 'undefined' ? window.location.href : '',
                  description: news.excerpt,
                  image: news.image
                }}
                size="sm"
                variant="outline"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Featured Image */}
        <div className="mb-8 md:mb-12">
          <Image
            src={news.image}
            alt={news.title}
            width={800}
            height={400}
            className="w-full h-auto rounded-xl shadow-lg"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none news-content">
          <div className="text-gray-700 leading-relaxed">
            {(() => {
              // Parse content and format it properly
              const formatContent = (text: string) => {
                if (!text) return '';
                
                // Split by lines and process each line
                const lines = text.split('\n').filter(line => line.trim());
                const formattedLines = lines.map((line, index) => {
                  const trimmedLine = line.trim();
                  
                  // Check if it's a main heading (starts with title)
                  if (trimmedLine.includes('Vinicius International: Building Africa\'s Security Future')) {
                    return (
                      <h1 key={`h1-${index}`} className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 mt-8 first:mt-0 leading-tight">
                        {trimmedLine}
                      </h1>
                    );
                  }
                  
                  // Check if it's a subheading (starts with capital letter, ends with colon, and is short)
                  if (trimmedLine.length < 100 && trimmedLine.endsWith(':') && /^[A-Z]/.test(trimmedLine)) {
                    return (
                      <h2 key={`h2-${index}`} className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 mt-8 leading-tight">
                        {trimmedLine}
                      </h2>
                    );
                  }
                  
                  // Check if it's a section heading (starts with capital letter, is medium length)
                  if (trimmedLine.length < 80 && /^[A-Z]/.test(trimmedLine) && !trimmedLine.includes('.')) {
                    return (
                      <h3 key={`h3-${index}`} className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-3 mt-6 leading-tight">
                        {trimmedLine}
                      </h3>
                    );
                  }
                  
                  // Regular paragraph
                  if (trimmedLine.length > 0) {
                    return (
                      <p key={`p-${index}`} className="text-base md:text-lg leading-relaxed mb-4 md:mb-6 text-gray-700">
                        {trimmedLine}
                      </p>
                    );
                  }
                  
                  return null;
                });
                
                return formattedLines;
              };
              
              const parts = news.content.split('[CHART1]');
              const firstPart = parts[0];
              const secondPart = parts[1];
              
              if (secondPart) {
                const secondParts = secondPart.split('[CHART2]');
                const beforeChart2 = secondParts[0];
                const afterChart2 = secondParts[1];
                
                return (
                  <>
                    {/* First part before CHART1 */}
                    <div className="mb-8 md:mb-12">
                      {formatContent(firstPart)}
                    </div>
                    
                    {/* First Chart */}
                    <div className="chart-container">
                      <h3>African Defense Market Analysis</h3>
                      <div className="relative">
                        <Image
                          src="/chart1.png"
                          alt="Chart showing African defense market trends and statistics"
                          width={800}
                          height={600}
                          className="w-full h-auto max-w-4xl rounded-xl shadow-xl mx-auto"
                          priority
                        />
                      </div>
                      <p>Source: Vinicius International Research</p>
                    </div>
                    
                    {/* Second part before CHART2 */}
                    <div className="mb-8 md:mb-12">
                      {formatContent(beforeChart2)}
                    </div>
                    
                    {/* Second Chart */}
                    <div className="chart-container">
                      <h3>Regional Security Spending Patterns</h3>
                      <div className="relative">
                        <Image
                          src="/chart2.png"
                          alt="Chart showing regional security spending patterns across Africa"
                          width={800}
                          height={600}
                          className="w-full h-auto max-w-4xl rounded-xl shadow-xl mx-auto"
                          priority
                        />
                      </div>
                      <p>Source: Vinicius International Research</p>
                    </div>
                    
                    {/* Final part after CHART2 */}
                    {afterChart2 && (
                      <div className="mb-8 md:mb-12">
                        {formatContent(afterChart2)}
                      </div>
                    )}
                  </>
                );
              }
              
              // Fallback if no charts
              return (
                <div className="mb-8 md:mb-12">
                  {formatContent(news.content)}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Article Footer */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Share this article:</span>
              <ShareButton 
                data={{
                  title: news.title,
                  url: typeof window !== 'undefined' ? window.location.href : '',
                  description: news.excerpt,
                  image: news.image
                }}
                size="sm"
                variant="outline"
              />
            </div>
            
            <Link href="/news" className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to News
            </Link>
          </div>
        </div>
      </div>
      
      {/* Floating Share Button for Mobile */}
      <FloatingShareButton
        data={{
          title: news.title,
          url: typeof window !== 'undefined' ? window.location.href : '',
          description: news.excerpt,
          image: news.image
        }}
      />
    </div>
  );
}