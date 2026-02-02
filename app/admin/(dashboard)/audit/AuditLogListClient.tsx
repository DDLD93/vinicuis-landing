"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, RefreshCw } from "lucide-react";
import type { AuditLogEntry } from "@/lib/models/AuditLog";

interface AuditLogListClientProps {
  initialEntries: AuditLogEntry[];
}

const ACTION_LABELS: Record<string, string> = {
  login: "Login",
  logout: "Logout",
  create: "Create",
  update: "Update",
  delete: "Delete",
};

const RESOURCE_LABELS: Record<string, string> = {
  auth: "Auth",
  division: "Division",
  news: "News",
  gallery: "Gallery",
  career: "Career",
};

export default function AuditLogListClient({
  initialEntries: entries,
}: AuditLogListClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [filterAction, setFilterAction] = useState<string>("");
  const [filterEmail, setFilterEmail] = useState("");

  const filteredEntries = entries.filter((e) => {
    if (filterAction && e.action !== filterAction) return false;
    if (filterEmail && !e.email.toLowerCase().includes(filterEmail.toLowerCase())) return false;
    return true;
  });

  const actions = Array.from(new Set(entries.map((e) => e.action))).sort();
  const resources = Array.from(new Set(entries.map((e) => e.resource))).sort();

  const refresh = () => {
    startTransition(() => router.refresh());
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      dateStyle: "short",
      timeStyle: "medium",
    });
  };

  return (
    <div className="min-h-full bg-slate-50 dark:bg-slate-950/50">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              Audit Log
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              Who logged in and what they did
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={refresh}
            disabled={isPending}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg transition-all hover:shadow-md disabled:opacity-60"
          >
            <RefreshCw className={`w-5 h-5 ${isPending ? "animate-spin" : ""}`} />
            Refresh
          </motion.button>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by email..."
              value={filterEmail}
              onChange={(e) => setFilterEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All actions</option>
            {actions.map((a) => (
              <option key={a} value={a}>
                {ACTION_LABELS[a] ?? a}
              </option>
            ))}
          </select>
        </div>
      </motion.header>

      <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/80">
                <th className="text-left px-4 py-3 font-semibold text-slate-900 dark:text-white">
                  Time
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-900 dark:text-white">
                  User
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-900 dark:text-white">
                  Action
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-900 dark:text-white">
                  Resource
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-900 dark:text-white">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry, index) => (
                <motion.tr
                  key={entry.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className="border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    {formatDate(entry.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-slate-900 dark:text-white font-medium">
                    {entry.email}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                        entry.action === "login"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : entry.action === "logout"
                            ? "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"
                            : entry.action === "create"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                              : entry.action === "update"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                : entry.action === "delete"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                  : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {ACTION_LABELS[entry.action] ?? entry.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                    {RESOURCE_LABELS[entry.resource] ?? entry.resource}
                    {entry.resourceId && (
                      <span className="text-slate-500 dark:text-slate-400 text-xs ml-1">
                        ({entry.resourceId.slice(-6)})
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                    {entry.details ?? "—"}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEntries.length === 0 && (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">
            No audit entries found
          </div>
        )}
      </div>
    </div>
  );
}
