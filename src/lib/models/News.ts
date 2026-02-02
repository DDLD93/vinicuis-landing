import mongoose from "mongoose";

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

const NewsSchema = new mongoose.Schema<{
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}>(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export const NewsModel =
  mongoose.models.News ?? mongoose.model("News", NewsSchema);

export function toNewsArticle(doc: { _id: mongoose.Types.ObjectId; title: string; excerpt: string; date: string; category: string; image: string }): NewsArticle {
  return {
    id: doc._id.toString(),
    title: doc.title,
    excerpt: doc.excerpt,
    date: doc.date,
    category: doc.category,
    image: doc.image,
  };
}
