import { getNewsArticles } from "@/lib/actions/news";
import { getGalleryItems } from "@/lib/actions/gallery";
import { getDivisions } from "@/lib/actions/division";
import DashboardClient from "./DashboardClient";

export default async function AdminDashboardPage() {
  let newsArticles: Awaited<ReturnType<typeof getNewsArticles>> = [];
  let galleryItems: Awaited<ReturnType<typeof getGalleryItems>> = [];
  let divisions: Awaited<ReturnType<typeof getDivisions>> = [];
  try {
    [newsArticles, galleryItems, divisions] = await Promise.all([
      getNewsArticles(),
      getGalleryItems(),
      getDivisions(),
    ]);
  } catch {
    // keep defaults
  }
  return (
    <DashboardClient
      newsArticles={Array.isArray(newsArticles) ? newsArticles : []}
      galleryItems={Array.isArray(galleryItems) ? galleryItems : []}
      divisions={Array.isArray(divisions) ? divisions : []}
    />
  );
}
