import mongoose from "mongoose";

export interface AuditLogEntry {
  id: string;
  action: string;
  email: string;
  resource: string;
  resourceId?: string;
  details?: string;
  createdAt: string;
}

const AuditLogSchema = new mongoose.Schema<{
  action: string;
  email: string;
  resource: string;
  resourceId?: string;
  details?: string;
}>(
  {
    action: { type: String, required: true },
    email: { type: String, required: true },
    resource: { type: String, required: true },
    resourceId: { type: String, default: undefined },
    details: { type: String, default: undefined },
  },
  { timestamps: true }
);

// Index for listing by createdAt desc and filtering
AuditLogSchema.index({ createdAt: -1 });
AuditLogSchema.index({ email: 1, createdAt: -1 });
AuditLogSchema.index({ action: 1, createdAt: -1 });

export const AuditLogModel =
  mongoose.models.AuditLog ?? mongoose.model("AuditLog", AuditLogSchema);

export function toAuditLogEntry(doc: {
  _id: mongoose.Types.ObjectId;
  action: string;
  email: string;
  resource: string;
  resourceId?: string;
  details?: string;
  createdAt: Date | string;
}): AuditLogEntry {
  return {
    id: doc._id.toString(),
    action: doc.action,
    email: doc.email,
    resource: doc.resource,
    resourceId: doc.resourceId,
    details: doc.details,
    createdAt:
      typeof doc.createdAt === "string"
        ? doc.createdAt
        : doc.createdAt.toISOString(),
  };
}
