import { getNewsArticles } from "@/lib/actions/news";
import NewsPageClient from "./NewsPageClient";

export const revalidate = 60;

export const metadata = {
  title: "News | Vinicius International",
  description: "Latest news and updates from Vinicius International",
};

export default async function NewsPage() {
  let articles;
  try {
    articles = await getNewsArticles({ sort: "desc" });
  } catch {
    articles = [];
  }
  return <NewsPageClient articles={articles} />;
}
