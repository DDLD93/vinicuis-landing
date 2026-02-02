"use server";

import connect from "@/lib/mongodb";
import { AuditLogModel, toAuditLogEntry, type AuditLogEntry } from "@/lib/models/AuditLog";

export type CreateAuditInput = {
  action: string;
  resource: string;
  resourceId?: string;
  details?: string;
  email: string;
};

/** Write an audit log entry. Use for user actions (CRUD); login/logout are not audited. */
export async function createAuditEntry(input: CreateAuditInput): Promise<void> {
  try {
    await connect();
    await AuditLogModel.create({
      action: input.action,
      email: input.email,
      resource: input.resource,
      resourceId: input.resourceId,
      details: input.details,
    });
  } catch (err) {
    console.error("Audit log write failed:", err);
  }
}

export type GetAuditLogsOptions = {
  limit?: number;
  offset?: number;
  action?: string;
  email?: string;
};

export async function getAuditLogs(
  options: GetAuditLogsOptions = {}
): Promise<AuditLogEntry[]> {
  try {
    await connect();
    const { limit = 100, offset = 0, action, email } = options;
    const filter: Record<string, unknown> = {};
    if (action) filter.action = action;
    if (email) filter.email = { $regex: email, $options: "i" };
    const docs = await AuditLogModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .lean()
      .exec();
    return docs.map((d) =>
      toAuditLogEntry({
        _id: d._id,
        action: d.action,
        email: d.email,
        resource: d.resource,
        resourceId: d.resourceId,
        details: d.details,
        createdAt: d.createdAt,
      })
    );
  } catch {
    return [];
  }
}
