import { getGalleryItems } from "@/lib/actions/gallery";
import GalleryPageClient from "./GalleryPageClient";

export const revalidate = 60;

export const metadata = {
  title: "Gallery | Vinicius International",
  description: "Explore our gallery and projects",
};

export default async function GalleryPage() {
  let items;
  try {
    items = await getGalleryItems();
  } catch {
    items = [];
  }
  return <GalleryPageClient items={items} />;
}
