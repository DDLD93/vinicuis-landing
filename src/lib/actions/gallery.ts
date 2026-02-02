"use server";

import { revalidatePath } from "next/cache";
import connect from "@/lib/mongodb";
import {
  GalleryModel,
  toGalleryItem,
  type GalleryItem,
} from "@/lib/models/Gallery";
import { getSessionFromCookies } from "@/lib/auth";
import { createAuditEntry } from "@/lib/actions/audit";

export async function getGalleryItems(options?: {
  limit?: number;
}): Promise<GalleryItem[]> {
  await connect();
  const query = GalleryModel.find().sort({ createdAt: -1 });
  if (options?.limit) {
    query.limit(options.limit);
  }
  const docs = await query.lean().exec();
  return docs.map((d) =>
    toGalleryItem({
      _id: d._id,
      title: d.title,
      category: d.category,
      image: d.image,
      images: d.images,
      description: d.description,
    })
  );
}

export async function getGalleryItemById(
  id: string
): Promise<GalleryItem | null> {
  await connect();
  const mongoose = await import("mongoose");
  const ObjectId = mongoose.default.Types.ObjectId;
  if (!ObjectId.isValid(id)) return null;
  const doc = await GalleryModel.findById(id).lean().exec();
  if (!doc) return null;
  return toGalleryItem({
    _id: doc._id,
    title: doc.title,
    category: doc.category,
    image: doc.image,
    images: doc.images,
    description: doc.description,
  });
}

export type CreateGalleryInput = Omit<GalleryItem, "id">;
export type UpdateGalleryInput = Partial<CreateGalleryInput>;

export async function createGalleryItem(
  data: CreateGalleryInput
): Promise<{ success: true; id: string } | { success: false; error: string }> {
  try {
    await connect();
    const image = data.images?.length ? data.images[0] : data.image;
    const doc = await GalleryModel.create({
      title: data.title,
      category: data.category,
      image,
      images: data.images?.length ? data.images : undefined,
      description: data.description ?? "",
    });
    revalidatePath("/admin", "layout");
    revalidatePath("/admin/gallery");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    revalidatePath("/gallery");
    const session = await getSessionFromCookies();
    if (session?.email) {
      await createAuditEntry({
        action: "create",
        resource: "gallery",
        resourceId: doc._id.toString(),
        details: data.title,
        email: session.email,
      });
    }
    return { success: true, id: doc._id.toString() };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create gallery item";
    return { success: false, error: message };
  }
}

export async function updateGalleryItem(
  id: string,
  data: UpdateGalleryInput
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    await connect();
    const mongoose = await import("mongoose");
    const ObjectId = mongoose.default.Types.ObjectId;
    if (!ObjectId.isValid(id)) return { success: false, error: "Invalid id" };
    const setPayload: Record<string, unknown> = {};
    if (data.title != null) setPayload.title = data.title;
    if (data.category != null) setPayload.category = data.category;
    if (data.description !== undefined) setPayload.description = data.description ?? "";
    if (data.images?.length) {
      setPayload.image = data.images[0];
      setPayload.images = data.images;
    } else if (data.image != null) {
      setPayload.image = data.image;
    }
    if (data.images !== undefined && !data.images?.length) setPayload.images = undefined;
    const result = await GalleryModel.updateOne(
      { _id: new ObjectId(id) },
      { $set: setPayload }
    );
    if (result.matchedCount === 0) {
      return { success: false, error: "Gallery item not found" };
    }
    revalidatePath("/admin/gallery");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    revalidatePath("/gallery");
    const session = await getSessionFromCookies();
    if (session?.email) {
      await createAuditEntry({
        action: "update",
        resource: "gallery",
        resourceId: id,
        details: data.title ?? undefined,
        email: session.email,
      });
    }
    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to update gallery item";
    return { success: false, error: message };
  }
}

export async function deleteGalleryItem(
  id: string
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    await connect();
    const mongoose = await import("mongoose");
    const ObjectId = mongoose.default.Types.ObjectId;
    if (!ObjectId.isValid(id)) return { success: false, error: "Invalid id" };
    const result = await GalleryModel.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return { success: false, error: "Gallery item not found" };
    }
    revalidatePath("/admin", "layout");
    revalidatePath("/admin/gallery");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    revalidatePath("/gallery");
    const session = await getSessionFromCookies();
    if (session?.email) {
      await createAuditEntry({
        action: "delete",
        resource: "gallery",
        resourceId: id,
        details: "Gallery item deleted",
        email: session.email,
      });
    }
    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to delete gallery item";
    return { success: false, error: message };
  }
}
