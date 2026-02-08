import { getGalleryItems } from "@/lib/actions/gallery";
import GalleryPageClient from "./GalleryPageClient";
import type { GalleryItem } from "@/lib/models/Gallery";

export const revalidate = 60;

export const metadata = {
  title: "Gallery | Vinicius International",
  description: "Explore our gallery and projects",
};

export default async function GalleryPage() {
  let items: GalleryItem[] = [];
  try {
    const data = await getGalleryItems();
    items = Array.isArray(data) ? data : [];
  } catch {
    items = [];
  }
  return <GalleryPageClient items={items} />;
}
