import { getNewsArticles } from "@/lib/actions/news";
import NewsListClient from "./NewsListClient";

export default async function NewsListPage() {
  let articles;
  try {
    articles = await getNewsArticles();
  } catch {
    articles = [];
  }
  return <NewsListClient initialArticles={articles} />;
}
