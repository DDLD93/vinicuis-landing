import mongoose from "mongoose";

export interface JobPosting {
  id: string;
  title: string;
  division: string;
  description: string;
  location?: string;
  applicationEmail?: string;
  isActive: boolean;
  createdAt: string;
}

const JobPostingSchema = new mongoose.Schema<{
  title: string;
  division: string;
  description: string;
  location?: string;
  applicationEmail?: string;
  isActive: boolean;
}>(
  {
    title: { type: String, required: true },
    division: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, default: "" },
    applicationEmail: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const JobPostingModel =
  mongoose.models.JobPosting ?? mongoose.model("JobPosting", JobPostingSchema);

export function toJobPosting(doc: {
  _id: mongoose.Types.ObjectId;
  title: string;
  division: string;
  description: string;
  location?: string;
  applicationEmail?: string;
  isActive: boolean;
  createdAt: Date;
}): JobPosting {
  return {
    id: doc._id.toString(),
    title: doc.title,
    division: doc.division,
    description: doc.description,
    location: doc.location || undefined,
    applicationEmail: doc.applicationEmail || undefined,
    isActive: doc.isActive ?? true,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : String(doc.createdAt),
  };
}
