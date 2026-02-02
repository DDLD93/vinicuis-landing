"use server";

import { revalidatePath } from "next/cache";
import connect from "@/lib/mongodb";
import {
  JobPostingModel,
  toJobPosting,
  type JobPosting,
} from "@/lib/models/JobPosting";
import { getSessionFromCookies } from "@/lib/auth";
import { createAuditEntry } from "@/lib/actions/audit";

export async function getJobPostings(options?: {
  limit?: number;
  activeOnly?: boolean;
}): Promise<JobPosting[]> {
  await connect();
  const query = options?.activeOnly
    ? JobPostingModel.find({ isActive: true }).sort({ createdAt: -1 })
    : JobPostingModel.find().sort({ createdAt: -1 });
  if (options?.limit) {
    query.limit(options.limit);
  }
  const docs = await query.lean().exec();
  return docs.map((d) =>
    toJobPosting({
      _id: d._id,
      title: d.title,
      division: d.division,
      description: d.description,
      location: d.location,
      applicationEmail: d.applicationEmail,
      isActive: d.isActive ?? true,
      createdAt: d.createdAt,
    })
  );
}

export async function getJobPostingById(
  id: string
): Promise<JobPosting | null> {
  await connect();
  const mongoose = await import("mongoose");
  const ObjectId = mongoose.default.Types.ObjectId;
  if (!ObjectId.isValid(id)) return null;
  const doc = await JobPostingModel.findById(id).lean().exec();
  if (!doc) return null;
  return toJobPosting({
    _id: doc._id,
    title: doc.title,
    division: doc.division,
    description: doc.description,
    location: doc.location,
    applicationEmail: doc.applicationEmail,
    isActive: doc.isActive ?? true,
    createdAt: doc.createdAt,
  });
}

export type CreateJobPostingInput = Omit<JobPosting, "id" | "createdAt">;
export type UpdateJobPostingInput = Partial<CreateJobPostingInput>;

export async function createJobPosting(
  data: CreateJobPostingInput
): Promise<{ success: true; id: string } | { success: false; error: string }> {
  try {
    await connect();
    const doc = await JobPostingModel.create({
      title: data.title,
      division: data.division,
      description: data.description,
      location: data.location ?? "",
      applicationEmail: data.applicationEmail ?? "",
      isActive: data.isActive ?? true,
    });
    revalidatePath("/admin", "layout");
    revalidatePath("/admin/careers");
    revalidatePath("/careers");
    const session = await getSessionFromCookies();
    if (session?.email) {
      await createAuditEntry({
        action: "create",
        resource: "career",
        resourceId: doc._id.toString(),
        details: data.title,
        email: session.email,
      });
    }
    return { success: true, id: doc._id.toString() };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create job posting";
    return { success: false, error: message };
  }
}

export async function updateJobPosting(
  id: string,
  data: UpdateJobPostingInput
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    await connect();
    const mongoose = await import("mongoose");
    const ObjectId = mongoose.default.Types.ObjectId;
    if (!ObjectId.isValid(id)) return { success: false, error: "Invalid id" };
    const update: Record<string, unknown> = {};
    if (data.title != null) update.title = data.title;
    if (data.division != null) update.division = data.division;
    if (data.description != null) update.description = data.description;
    if (data.location !== undefined) update.location = data.location ?? "";
    if (data.applicationEmail !== undefined) update.applicationEmail = data.applicationEmail ?? "";
    if (data.isActive !== undefined) update.isActive = data.isActive;
    const result = await JobPostingModel.updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );
    if (result.matchedCount === 0) {
      return { success: false, error: "Job posting not found" };
    }
    revalidatePath("/admin/careers");
    revalidatePath("/careers");
    const session = await getSessionFromCookies();
    if (session?.email) {
      await createAuditEntry({
        action: "update",
        resource: "career",
        resourceId: id,
        details: data.title ?? undefined,
        email: session.email,
      });
    }
    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to update job posting";
    return { success: false, error: message };
  }
}

export async function deleteJobPosting(
  id: string
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    await connect();
    const mongoose = await import("mongoose");
    const ObjectId = mongoose.default.Types.ObjectId;
    if (!ObjectId.isValid(id)) return { success: false, error: "Invalid id" };
    const result = await JobPostingModel.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return { success: false, error: "Job posting not found" };
    }
    revalidatePath("/admin", "layout");
    revalidatePath("/admin/careers");
    revalidatePath("/careers");
    const session = await getSessionFromCookies();
    if (session?.email) {
      await createAuditEntry({
        action: "delete",
        resource: "career",
        resourceId: id,
        details: "Job posting deleted",
        email: session.email,
      });
    }
    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to delete job posting";
    return { success: false, error: message };
  }
}
