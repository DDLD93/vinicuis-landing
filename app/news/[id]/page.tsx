
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
    <div className="pt-[5.5rem]">
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Back Button */}
        <Link href="/news" className="inline-flex items-center text-red-600 hover:text-red-700 font-medium mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to News
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            {news.title}
          </h1>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full font-medium">
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
            {news.author && (
              <span className="text-sm text-gray-500 flex items-center">
                <User className="h-4 w-4 mr-2" />
                By {news.author}
              </span>
            )}
            {news.readTime && (
              <span className="text-sm text-gray-500 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {news.readTime}
              </span>
            )}
          </div>

          {/* Tags */}
          {news.tags && news.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {news.tags.map((tag, index) => (
                <span key={index} className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <Image
            src={news.image}
            alt={news.title}
            width={800}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed">
            {(() => {
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
                    <div className="whitespace-pre-line mb-6">
                      {firstPart}
                    </div>
                    
                    {/* First Chart */}
                    <div className="my-8 text-center">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">African Defense Market Analysis</h3>
                      <Image
                        src="/chart1.png"
                        alt="Chart showing African defense market trends and statistics"
                        width={800}
                        height={600}
                        className="w-full h-auto rounded-lg shadow-lg mx-auto"
                      />
                      <p className="text-sm text-gray-500 mt-2">Source: Vinicius International Research</p>
                    </div>
                    
                    {/* Second part before CHART2 */}
                    <div className="whitespace-pre-line mb-6">
                      {beforeChart2}
                    </div>
                    
                    {/* Second Chart */}
                    <div className="my-8 text-center">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Regional Security Spending Patterns</h3>
                      <Image
                        src="/chart2.png"
                        alt="Chart showing regional security spending patterns across Africa"
                        width={800}
                        height={600}
                        className="w-full h-auto rounded-lg shadow-lg mx-auto"
                      />
                      <p className="text-sm text-gray-500 mt-2">Source: Vinicius International Research</p>
                    </div>
                    
                    {/* Final part after CHART2 */}
                    {afterChart2 && (
                      <div className="whitespace-pre-line mb-6">
                        {afterChart2}
                      </div>
                    )}
                  </>
                );
              }
              
              // Fallback if no charts
              return (
                <div className="whitespace-pre-line mb-6">
                  {news.content}
                </div>
              );
            })()}
          </div>
        </div>



        {/* Share and Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
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
            
            <Link href="/news" className="text-red-600 hover:text-red-700 font-medium">
              ← Back to News
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