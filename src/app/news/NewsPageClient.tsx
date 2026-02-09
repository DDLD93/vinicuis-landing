"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { NewsArticle } from "@/lib/models/News";

interface NewsPageClientProps {
  articles: NewsArticle[];
}

export default function NewsPageClient({ articles }: NewsPageClientProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] sm:min-h-[60vh] h-[50vh] sm:h-[60vh] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/bg4.jpg"
              alt="News"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/70 to-background/80" />
          </div>
          <div className="absolute inset-0 flex items-center z-10">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto"
              >
                <div className="divider-accent mx-auto" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-6">
                  Latest News & Updates
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Stay informed about our latest achievements, partnerships,
                  and developments across all divisions.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="section-padding" ref={ref}>
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {articles.map((article, index) => (
                console.log(article),
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-card transition-all group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                        <Tag className="w-3 h-3" />
                        {article.category}
                      </span>
                    </div>
                  </div>
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
