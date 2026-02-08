import { getNewsArticles } from "@/lib/actions/news";
import NewsPageClient from "./NewsPageClient";
import type { NewsArticle } from "@/lib/models/News";

export const revalidate = 60;

export const metadata = {
  title: "News | Vinicius International",
  description: "Latest news and updates from Vinicius International",
};

export default async function NewsPage() {
  let articles: NewsArticle[] = [];
  try {
    const data = await getNewsArticles({ sort: "desc" });
    articles = Array.isArray(data) ? data : [];
  } catch {
    articles = [];
  }
  return <NewsPageClient articles={articles} />;
}
