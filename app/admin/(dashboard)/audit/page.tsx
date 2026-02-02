import { getAuditLogs } from "@/lib/actions/audit";
import AuditLogListClient from "./AuditLogListClient";

export default async function AuditLogPage() {
  let entries;
  try {
    entries = await getAuditLogs({ limit: 200 });
  } catch {
    entries = [];
  }
  return <AuditLogListClient initialEntries={entries} />;
}
