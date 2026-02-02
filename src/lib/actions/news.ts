"use server";

import { revalidatePath } from "next/cache";
import connect from "@/lib/mongodb";
import { NewsModel, toNewsArticle, type NewsArticle } from "@/lib/models/News";
import { getSessionFromCookies } from "@/lib/auth";
import { createAuditEntry } from "@/lib/actions/audit";

export async function getNewsArticles(options?: {
  limit?: number;
  sort?: "asc" | "desc";
}): Promise<NewsArticle[]> {
  await connect();
  const sortOrder = options?.sort === "asc" ? 1 : -1;
  const query = NewsModel.find().sort({ date: sortOrder });
  if (options?.limit) {
    query.limit(options.limit);
  }
  const docs = await query.lean().exec();
  return docs.map((d) =>
    toNewsArticle({
      _id: d._id,
      title: d.title,
      excerpt: d.excerpt,
      date: d.date,
      category: d.category,
      image: d.image,
    })
  );
}

export async function getNewsArticleById(id: string): Promise<NewsArticle | null> {
  await connect();
  const mongoose = await import("mongoose");
  const ObjectId = mongoose.default.Types.ObjectId;
  if (!ObjectId.isValid(id)) return null;
  const doc = await NewsModel.findById(id).lean().exec();
  if (!doc) return null;
  return toNewsArticle({
    _id: doc._id,
    title: doc.title,
    excerpt: doc.excerpt,
    date: doc.date,
    category: doc.category,
    image: doc.image,
  });
}

export type CreateNewsInput = Omit<NewsArticle, "id">;
export type UpdateNewsInput = Partial<CreateNewsInput>;

export async function createNewsArticle(
  data: CreateNewsInput
): Promise<{ success: true; id: string } | { success: false; error: string }> {
  try {
    await connect();
    const doc = await NewsModel.create({
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      category: data.category,
      image: data.image,
    });
    revalidatePath("/admin", "layout");
    revalidatePath("/admin/news");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    revalidatePath("/news");
    const session = await getSessionFromCookies();
    if (session?.email) {
      await createAuditEntry({
        action: "create",
        resource: "news",
        resourceId: doc._id.toString(),
        details: data.title,
        email: session.email,
      });
    }
    return { success: true, id: doc._id.toString() };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create article";
    return { success: false, error: message };
  }
}

export async function updateNewsArticle(
  id: string,
  data: UpdateNewsInput
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    await connect();
    const mongoose = await import("mongoose");
    const ObjectId = mongoose.default.Types.ObjectId;
    if (!ObjectId.isValid(id)) return { success: false, error: "Invalid id" };
    const result = await NewsModel.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...(data.title != null && { title: data.title }),
          ...(data.excerpt != null && { excerpt: data.excerpt }),
          ...(data.date != null && { date: data.date }),
          ...(data.category != null && { category: data.category }),
          ...(data.image != null && { image: data.image }),
        },
      }
    );
    if (result.matchedCount === 0) {
      return { success: false, error: "Article not found" };
    }
    revalidatePath("/admin/news");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    revalidatePath("/news");
    const session = await getSessionFromCookies();
    if (session?.email) {
      await createAuditEntry({
        action: "update",
        resource: "news",
        resourceId: id,
        details: data.title ?? undefined,
        email: session.email,
      });
    }
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update article";
    return { success: false, error: message };
  }
}

export async function deleteNewsArticle(
  id: string
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    await connect();
    const mongoose = await import("mongoose");
    const ObjectId = mongoose.default.Types.ObjectId;
    if (!ObjectId.isValid(id)) return { success: false, error: "Invalid id" };
    const result = await NewsModel.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return { success: false, error: "Article not found" };
    }
    revalidatePath("/admin", "layout");
    revalidatePath("/admin/news");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    revalidatePath("/news");
    const session = await getSessionFromCookies();
    if (session?.email) {
      await createAuditEntry({
        action: "delete",
        resource: "news",
        resourceId: id,
        details: "Article deleted",
        email: session.email,
      });
    }
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete article";
    return { success: false, error: message };
  }
}
