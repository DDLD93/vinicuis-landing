
import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Tag, User } from 'lucide-react';
import Image from 'next/image';
import ShareButton from '@/components/ShareButton';
import FloatingShareButton from '@/components/FloatingShareButton';
import { ShareData } from '@/lib/share-utils';

const newsUpdates = [
  {
    id: '1',
    title: 'Vinicius International: Building Africa\'s Security Future',
    excerpt: 'Licensed under DICON, Vinicius International is redefining African security with locally assembled armoured vehicles, integrated surveillance systems, and advanced training, proving that Africa\'s defence future can be built on African soil, by African hands.',
    date: '2024-01-20',
    category: 'Security',
    author: 'Amure Eniola',
    image: 'https://images.pexels.com/photos/8872465/pexels-photo-8872465.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: `Vinicius International: Building Africa's Security Future

Licensed under DICON, Vinicius International is redefining African security with locally assembled armoured vehicles, integrated surveillance systems, and advanced training, proving that Africa's defence future can be built on African soil, by African hands.

Africa is standing on the edge of a new chapter in its security story. Budgets are climbing, threats are evolving, and alliances are shifting. In 2023 alone, military expenditure across the continent surged to USD 51.6 billion, a 22 % rise in just one year. Yet, more than 95 % of Africa's defence hardware is still imported, with Russia, China, the United States, and European suppliers dominating the market.

Amid this landscape, Vinicius International is rewriting the script. Vinicius International, fully licensed under the Defence Industries Corporation of Nigeria (DICON), with an armoured vehicle assembly line in Abuja and integrated surveillance solutions, is proving that Africa's security can and should be built in Africa, by African hands.

Closing the Gap

Demand is at an all-time high. From West to Central Africa, rising insecurity is driving governments to expand defence budgets. Nigeria leads West Africa's spending, while nations like South Sudan and the Democratic Republic of Congo have doubled allocations in response to internal conflict. This surge highlights a critical truth: Africa's need for reliable, locally built security hardware has never been greater.

Yet supply remains lopsided. Outside of South Africa, Egypt, and Sudan, domestic production is minimal. Between 2019 and 2023, Russia accounted for 24 % of Africa's arms imports, followed by the United States (16 %), China (13 %), and France (10 %). Every delay in these global supply chains carries a cost measured not just in dollars, but in lives and sovereignty.

Vinicius International is bridging that gap. By assembling armoured tactical vehicles in Nigeria and integrating surveillance and UAV systems tailored to local realities, Vinicius International offers a speed, adaptability, and reliability foreign suppliers cannot match.

A Nigerian Powerhouse with Continental Vision

Founded in 2017, Vinicius International has grown into a multi-sector enterprise, but its security division is the beating heart of its operations. From its Abuja facility, Vinicius International produces world-class tactical vehicles based on proven platforms like the Toyota Land Cruiser 79 series. In January 2024, Vinicius delivered over a thousand armoured vehicles to Nigerian security forces, a milestone moment for indigenous production in a sector long dominated by imports.

But vehicles are only part of the story. Vinicius offers a full-stack approach rare in the African market. Integrated surveillance hardware, UAV procurement, access-control systems, and advanced training via its ASCC division make it a one-stop partner for governments and agencies. With USD 40-50 million in annual security hardware imports, Vinicius also serves as a procurement bridge, blending global sourcing with local assembly and maintenance.

More Than Hardware: A Vision of Sovereignty

For Vinicius, localisation is not a buzzword; it's a commitment. Every vehicle assembled, every system deployed, and every officer trained is a step towards African security independence. Vinicius International isn't just shortening supply chains, it's building technical skills, creating jobs, and laying the foundation for a defence industry that keeps Africa's investment within Africa.

This isn't a story of potential; it's a story already unfolding. Vinicius has moved beyond serving high-net-worth individuals and Nigerian agencies to positioning itself as a continental force for African-built security solutions. In a market projected to hit USD 60 billion by 2030, even modest regional market share translates into hundreds of millions in retained value for African economies.

Africa's Security, Built at Home

As Africa invests billions to safeguard its borders and its people, the question is no longer whether local capability matters, it's how fast it can scale. Vinicius International is answering that call. Its Abuja facility is already a nucleus for West African production, and its integrated approach ensures African agencies can rely on solutions designed for African realities.

Beyond Nigeria, Vinicius is opening doors for regional growth and global collaboration. By acting as a strategic partner for International manufacturers seeking to enter African markets, Vinicius is creating pathways for tech transfer, OEM partnerships, and joint ventures that keep value and expertise anchored on the continent.

Vinicius International represents more than a company, it represents a movement. A movement away from dependency and towards sovereignty. A movement that ensures every naira, every dollar invested in Africa's security strengthens African hands and African futures.

From tactical vehicles to advanced surveillance, from training to technology partnerships, Vinicius is redefining what African-led security looks like. Vinicius is not just meeting demand; it is setting a new standard: world-class capability, built on African soil, for African realities.

Written by Amure Eniola For 
Vinicius International corporate communication`,
    readTime: '8 min read',
    tags: ['Security', 'DICON', 'African Security', 'Defense', 'Local Production']
  },
  {
    id: '2',
    title: 'Vinicius International Delivers 50 Armored Vehicles to Nigerian Security Forces',
    excerpt: 'In a landmark achievement, Vinicius International has successfully delivered 50 state-of-the-art armored vehicles to enhance national security capabilities.',
    date: '2024-01-15',
    category: 'Security',
    author: 'Corporate Communications',
    image: 'https://images.pexels.com/photos/8828687/pexels-photo-8828687.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: 'In a landmark achievement, Vinicius International has successfully delivered 50 state-of-the-art armored vehicles to enhance national security capabilities. This delivery represents our commitment to supporting Nigeria\'s defense infrastructure. (Full article content here...)',
    readTime: '3 min read',
    tags: ['Security', 'Government', 'Defense']
  },
  {
    id: '3',
    title: 'New Construction Project: 100-Unit Housing Estate in Abuja',
    excerpt: 'Saiha Constructions breaks ground on ambitious housing project that will provide affordable homes for government workers.',
    date: '2024-01-10',
    category: 'Construction',
    author: 'Saiha Constructions Team',
    image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: 'Saiha Constructions breaks ground on ambitious housing project that will provide affordable homes for government workers. The project is expected to be completed within 18 months. (Full article content here...)',
    readTime: '4 min read',
    tags: ['Construction', 'Housing', 'Abuja']
  },
  {
    id: '4',
    title: 'Record Agricultural Exports: $5M in International Trade',
    excerpt: 'Richfood Essentials achieves milestone with record-breaking agricultural exports to European and Asian markets.',
    date: '2024-01-05',
    category: 'Agro-Trade',
    author: 'Richfood Essentials',
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: 'Richfood Essentials achieves milestone with record-breaking agricultural exports to European and Asian markets. This success demonstrates our growing international presence. (Full article content here...)',
    readTime: '2 min read',
    tags: ['Agriculture', 'Export', 'International']
  },
];

export function generateStaticParams() {
  return newsUpdates.map((news) => ({ id: news.id }));
}

export default function NewsArticlePage({ params }: { params: { id: string } }) {
  const news = newsUpdates.find((n) => n.id === params.id);
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
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {news.content}
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