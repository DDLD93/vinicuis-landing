import mongoose from "mongoose";

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  images?: string[];
  description?: string;
}

const GallerySchema = new mongoose.Schema<{
  title: string;
  category: string;
  image: string;
  images?: string[];
  description?: string;
}>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    images: { type: [String], default: undefined },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export const GalleryModel =
  mongoose.models.Gallery ?? mongoose.model("Gallery", GallerySchema);

export function toGalleryItem(doc: {
  _id: mongoose.Types.ObjectId;
  title: string;
  category: string;
  image: string;
  images?: string[];
  description?: string;
}): GalleryItem {
  const images = doc.images?.length ? doc.images : [doc.image];
  return {
    id: doc._id.toString(),
    title: doc.title,
    category: doc.category,
    image: doc.image,
    images,
    description: doc.description ?? undefined,
  };
}
