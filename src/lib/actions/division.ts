"use server";

import { revalidatePath } from "next/cache";
import connect from "@/lib/mongodb";
import {
  DivisionModel,
  toDivision,
  type Division,
  type DivisionDetailedContent,
} from "@/lib/models/Division";
import { getSessionFromCookies } from "@/lib/auth";
import { createAuditEntry } from "@/lib/actions/audit";

export async function getDivisions(options?: {
  limit?: number;
}): Promise<Division[]> {
  try {
    await connect();
  } catch {
    return [];
  }
  const query = DivisionModel.find().sort({ createdAt: 1 });
  if (options?.limit) {
    query.limit(options.limit);
  }
  const docs = await query.lean().exec();
  return docs.map((d) =>
    toDivision({
      _id: d._id,
      slug: d.slug,
      title: d.title,
      subtitle: d.subtitle,
      description: d.description,
      image: d.image,
      icon: d.icon,
      detailedContent: d.detailedContent as DivisionDetailedContent,
    })
  );
}

export async function getDivisionBySlug(slug: string): Promise<Division | null> {
  await connect();
  const doc = await DivisionModel.findOne({ slug }).lean().exec();
  if (!doc) return null;
  return toDivision({
    _id: doc._id,
    slug: doc.slug,
    title: doc.title,
    subtitle: doc.subtitle,
    description: doc.description,
    image: doc.image,
    icon: doc.icon,
    detailedContent: doc.detailedContent as DivisionDetailedContent,
  });
}

export async function getDivisionById(id: string): Promise<Division | null> {
  await connect();
  const mongoose = await import("mongoose");
  const ObjectId = mongoose.default.Types.ObjectId;
  if (!ObjectId.isValid(id)) return null;
  const doc = await DivisionModel.findById(id).lean().exec();
  if (!doc) return null;
  return toDivision({
    _id: doc._id,
    slug: doc.slug,
    title: doc.title,
    subtitle: doc.subtitle,
    description: doc.description,
    image: doc.image,
    icon: doc.icon,
    detailedContent: doc.detailedContent as DivisionDetailedContent,
  });
}

export type CreateDivisionInput = Omit<Division, "id">;
export type UpdateDivisionInput = Partial<CreateDivisionInput>;

export async function createDivision(
  data: CreateDivisionInput
): Promise<{ success: true; id: string } | { success: false; error: string }> {
  try {
    await connect();
    const doc = await DivisionModel.create({
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      image: data.image,
      icon: data.icon,
      detailedContent: data.detailedContent,
    });
    revalidatePath("/admin", "layout");
    revalidatePath("/admin/divisions");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    revalidatePath("/divisions/[slug]", "page");
    const session = await getSessionFromCookies();
    if (session?.email) {
      await createAuditEntry({
        action: "create",
        resource: "division",
        resourceId: doc._id.toString(),
        details: data.title,
        email: session.email,
      });
    }
    return { success: true, id: doc._id.toString() };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create division";
    return { success: false, error: message };
  }
}

export async function updateDivision(
  id: string,
  data: UpdateDivisionInput
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    await connect();
    const mongoose = await import("mongoose");
    const ObjectId = mongoose.default.Types.ObjectId;
    if (!ObjectId.isValid(id)) return { success: false, error: "Invalid id" };
    const update: Record<string, unknown> = {};
    if (data.slug != null) update.slug = data.slug;
    if (data.title != null) update.title = data.title;
    if (data.subtitle != null) update.subtitle = data.subtitle;
    if (data.description != null) update.description = data.description;
    if (data.image != null) update.image = data.image;
    if (data.icon != null) update.icon = data.icon;
    if (data.detailedContent != null) update.detailedContent = data.detailedContent;
    const result = await DivisionModel.updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );
    if (result.matchedCount === 0) {
      return { success: false, error: "Division not found" };
    }
    revalidatePath("/admin", "layout");
    revalidatePath("/admin/divisions");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    revalidatePath("/divisions/[slug]", "page");
    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to update division";
    return { success: false, error: message };
  }
}

export async function deleteDivision(
  id: string
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    await connect();
    const mongoose = await import("mongoose");
    const ObjectId = mongoose.default.Types.ObjectId;
    if (!ObjectId.isValid(id)) return { success: false, error: "Invalid id" };
    const result = await DivisionModel.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return { success: false, error: "Division not found" };
    }
    revalidatePath("/admin", "layout");
    revalidatePath("/admin/divisions");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    revalidatePath("/divisions/[slug]", "page");
    const session = await getSessionFromCookies();
    if (session?.email) {
      await createAuditEntry({
        action: "delete",
        resource: "division",
        resourceId: id,
        details: "Division deleted",
        email: session.email,
      });
    }
    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to delete division";
    return { success: false, error: message };
  }
}
