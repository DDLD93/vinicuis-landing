import { getNewsArticles } from "@/lib/actions/news";
import { getGalleryItems } from "@/lib/actions/gallery";
import DashboardClient from "./DashboardClient";

export default async function AdminDashboardPage() {
  let newsArticles;
  let galleryItems;
  try {
    [newsArticles, galleryItems] = await Promise.all([
      getNewsArticles(),
      getGalleryItems(),
    ]);
  } catch {
    newsArticles = [];
    galleryItems = [];
  }
  return (
    <DashboardClient
      newsArticles={newsArticles}
      galleryItems={galleryItems}
    />
  );
}
