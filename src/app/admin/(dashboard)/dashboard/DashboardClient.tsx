"use client";

import { motion } from "framer-motion";
import {
  Newspaper,
  Image as ImageIcon,
  Building2,
  Briefcase,
  ArrowRight,
  Calendar,
  Tag,
  Plus,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { divisions } from "@/data/divisionsData";
import type { NewsArticle } from "@/lib/models/News";
import type { GalleryItem } from "@/lib/models/Gallery";

interface DashboardClientProps {
  newsArticles: NewsArticle[];
  galleryItems: GalleryItem[];
}

export default function DashboardClient({
  newsArticles,
  galleryItems,
}: DashboardClientProps) {
  const greeting =
    new Date().getHours() < 12
      ? "Good morning"
      : new Date().getHours() < 18
        ? "Good afternoon"
        : "Good evening";
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const stats = [
    {
      label: "News Articles",
      value: newsArticles.length,
      icon: Newspaper,
      href: "/admin/news",
      gradient: "from-blue-500/20 to-blue-600/5",
      iconBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
    },
    {
      label: "Gallery Items",
      value: galleryItems.length,
      icon: ImageIcon,
      href: "/admin/gallery",
      gradient: "from-violet-500/20 to-violet-600/5",
      iconBg: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
    },
    {
      label: "Divisions",
      value: divisions.length,
      icon: Building2,
      href: "/admin/divisions",
      gradient: "from-emerald-500/20 to-emerald-600/5",
      iconBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Careers",
      value: "—",
      icon: Briefcase,
      href: "/admin/careers",
      gradient: "from-amber-500/20 to-amber-600/5",
      iconBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    },
  ];

  const quickActions = [
    { label: "Add News", href: "/admin/news", icon: Plus },
    { label: "Add Gallery Item", href: "/admin/gallery", icon: Plus },
    { label: "Divisions", href: "/admin/divisions", icon: LayoutGrid },
    { label: "Careers", href: "/admin/careers", icon: Briefcase },
  ];

  const recentNews = newsArticles.slice(0, 4);
  const recentGallery = galleryItems.slice(0, 4);

  return (
    <div className="min-h-full bg-slate-50 dark:bg-slate-950/50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            {greeting}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Here&apos;s what&apos;s happening with your content.
          </p>
        </div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 shrink-0">
          {today}
        </p>
      </motion.header>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link href={stat.href} className="block h-full">
                <div
                  className={`h-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 bg-gradient-to-br ${stat.gradient}`}
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-2 sm:mb-3 ${stat.iconBg}`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mb-8 flex flex-wrap gap-3"
      >
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <Icon className="w-4 h-4" />
              {action.label}
            </Link>
          );
        })}
      </motion.div>

      {/* Recent content */}
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.section
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
              Recent News
            </h2>
            <Link
              href="/admin/news"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentNews.length === 0 ? (
              <div className="px-6 py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                No news articles yet.
              </div>
            ) : (
              recentNews.map((article) => (
                <Link
                  key={article.id}
                  href="/admin/news"
                  className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800">
                    <img
                      src={article.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium mb-1">
                      <Tag className="w-3 h-3" />
                      {article.category}
                    </span>
                    <p className="font-medium text-slate-900 dark:text-white truncate">
                      {article.title}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString()}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                </Link>
              ))
            )}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
              Recent Gallery
            </h2>
            <Link
              href="/admin/gallery"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentGallery.length === 0 ? (
              <div className="px-6 py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                No gallery items yet.
              </div>
            ) : (
              recentGallery.map((item) => (
                <Link
                  key={item.id}
                  href="/admin/gallery"
                  className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium mb-1">
                      {item.category}
                    </span>
                    <p className="font-medium text-slate-900 dark:text-white truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {item.description || "No description"}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                </Link>
              ))
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
