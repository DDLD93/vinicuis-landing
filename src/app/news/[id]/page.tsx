import { notFound } from "next/navigation";
import { getNewsArticleById } from "@/lib/actions/news";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "News Article | Vinicius International",
  description: "Read the latest news and updates from Vinicius International",
};

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let article;
  try {
    article = await getNewsArticleById(id);
  } catch {
    article = null;
  }
  if (!article) notFound();

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
        <article className="section-padding">
          <div className="container max-w-3xl">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 sm:mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to News
            </Link>

            <header className="mb-6 sm:mb-8">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4">
                <Tag className="w-3 h-3" />
                {article.category}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                {article.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </div>
            </header>

            <div className="relative w-full aspect-video sm:aspect-[16/9] rounded-xl overflow-hidden border border-border/50 mb-6 sm:mb-8">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed whitespace-pre-line">
                {article.excerpt}
              </p>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
