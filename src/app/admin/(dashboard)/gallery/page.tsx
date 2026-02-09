import { getGalleryItems } from "@/lib/actions/gallery";
import GalleryListClient from "./GalleryListClient";

export default async function GalleryListPage() {
  let items;
  try {
    items = await getGalleryItems();
  } catch {
    items = [];
  }
  return <GalleryListClient initialItems={items} />;
}
