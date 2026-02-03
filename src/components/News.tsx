"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { newsArticles as fallbackArticles } from "@/data/newsData";
import type { NewsArticle } from "@/lib/models/News";

interface NewsProps {
  articles?: NewsArticle[];
}

const News = ({ articles: articlesProp }: NewsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const articles = articlesProp ?? fallbackArticles;
  const latestNews = articles.slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section id="news" className="section-padding bg-secondary/30 overflow-x-hidden" ref={ref}>
      <div className="container px-4 sm:px-6">
        {/* Section Header */}
        <div className="section-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="divider-accent" />
            <h2 className="section-title">Latest News & Updates</h2>
            <p className="section-subtitle">
              Stay informed about our latest achievements, partnerships, and developments
            </p>
          </motion.div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {latestNews.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-card transition-all group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                    <Tag className="w-3 h-3" />
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(article.date)}</span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                <Link
                  href={`/news/${article.id}`}
                  className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-primary hover:underline"
                >
                  Read more
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/news"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 min-h-[44px] bg-primary text-primary-foreground font-semibold rounded-lg transition-all duration-300 hover:shadow-red hover:scale-[1.02] touch-manipulation"
          >
            View All News
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default News;
