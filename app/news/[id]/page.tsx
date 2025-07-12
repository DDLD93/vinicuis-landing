
import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Share2, Tag, User } from 'lucide-react';
import Image from 'next/image';

const newsUpdates = [
  {
    id: '1',
      title: 'Vinicius International Delivers 50 Armored Vehicles to Nigerian Security Forces',
      excerpt: 'In a landmark achievement, Vinicius International has successfully delivered 50 state-of-the-art armored vehicles to enhance national security capabilities.',
      date: '2024-01-15',
      category: 'Security',
    image: 'https://images.pexels.com/photos/8828687/pexels-photo-8828687.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: 'In a landmark achievement, Vinicius International has successfully delivered 50 state-of-the-art armored vehicles to enhance national security capabilities. (Full article content here...)',
  },
  {
    id: '2',
      title: 'New Construction Project: 100-Unit Housing Estate in Abuja',
      excerpt: 'Saiha Constructions breaks ground on ambitious housing project that will provide affordable homes for government workers.',
      date: '2024-01-10',
      category: 'Construction',
    image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: 'Saiha Constructions breaks ground on ambitious housing project that will provide affordable homes for government workers. (Full article content here...)',
  },
  {
    id: '3',
      title: 'Record Agricultural Exports: $5M in International Trade',
      excerpt: 'Richfood Essentials achieves milestone with record-breaking agricultural exports to European and Asian markets.',
      date: '2024-01-05',
      category: 'Agro-Trade',
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: 'Richfood Essentials achieves milestone with record-breaking agricultural exports to European and Asian markets. (Full article content here...)',
  },
];

export function generateStaticParams() {
  return newsUpdates.map((news) => ({ id: news.id }));
}

export default function NewsArticlePage({ params }: { params: { id: string } }) {
  const news = newsUpdates.find((n) => n.id === params.id);
  if (!news) return notFound();
  return (
    <div className="max-w-3xl mx-auto py-24 px-4">
      <h1 className="text-3xl font-bold mb-4 text-red-600">{news.title}</h1>
            <div className="flex items-center gap-4 mb-4">
        <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">{news.category}</span>
        <span className="text-xs text-gray-500 flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          {new Date(news.date).toLocaleDateString()}
              </span>
            </div>
      <Image
        src={news.image}
        alt={news.title}
        width={800}
        height={400}
        className="rounded-lg shadow mb-6"
      />
      <p className="text-gray-700 mb-6">{news.content}</p>
      <a href="/news" className="text-red-600 hover:underline font-medium">← Back to News</a>
    </div>
  );
}