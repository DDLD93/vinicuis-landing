"use client";

import { useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Search, Eye, Save, Briefcase } from "lucide-react";
import type { JobPosting } from "@/lib/models/JobPosting";
import {
  createJobPosting,
  updateJobPosting,
  deleteJobPosting,
} from "@/lib/actions/career";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

const DIVISIONS = [
  "Defense & Security",
  "Infrastructure",
  "Aviation",
  "Technology",
  "Automobile",
  "Agro-Industrial",
  "Pharmaceuticals",
  "Sports",
  "Corporate",
];

const emptyJob: Omit<JobPosting, "id" | "createdAt"> = {
  title: "",
  division: "",
  description: "",
  location: "",
  applicationEmail: "",
  isActive: true,
};

interface CareersListClientProps {
  initialJobs: JobPosting[];
}

export default function CareersListClient({
  initialJobs: jobs,
}: CareersListClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [viewJob, setViewJob] = useState<JobPosting | null>(null);
  const [editJob, setEditJob] = useState<JobPosting | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState<JobPosting>({
    ...emptyJob,
    id: "",
    createdAt: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.division.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.location?.toLowerCase() ?? "").includes(searchQuery.toLowerCase())
  );

  const handleCreateOpen = () => {
    setError(null);
    setFormData({ ...emptyJob, id: "", createdAt: "" });
    setCreateOpen(true);
  };

  const handleEditOpen = (job: JobPosting) => {
    setError(null);
    setFormData({ ...job });
    setEditJob(job);
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "isActive") {
      setFormData((prev) => ({ ...prev, isActive: (e.target as HTMLInputElement).checked }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const result = await createJobPosting({
      title: formData.title,
      division: formData.division,
      description: formData.description,
      location: formData.location ?? "",
      applicationEmail: formData.applicationEmail ?? "",
      isActive: formData.isActive,
    });
    setIsSubmitting(false);
    if (result.success) {
      setCreateOpen(false);
      startTransition(() => router.refresh());
      toast({ title: "Success", description: "Job posting created." });
    } else {
      setError(result.error);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editJob) return;
    setError(null);
    setIsSubmitting(true);
    const result = await updateJobPosting(editJob.id, {
      title: formData.title,
      division: formData.division,
      description: formData.description,
      location: formData.location ?? "",
      applicationEmail: formData.applicationEmail ?? "",
      isActive: formData.isActive,
    });
    setIsSubmitting(false);
    if (result.success) {
      setEditJob(null);
      startTransition(() => router.refresh());
      toast({ title: "Success", description: "Job posting updated." });
    } else {
      setError(result.error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setError(null);
    const result = await deleteJobPosting(deleteId);
    if (result.success) {
      setDeleteId(null);
      startTransition(() => router.refresh());
      toast({ title: "Success", description: "Job posting deleted." });
    } else {
      setError(result.error);
      setDeleteId(null);
    }
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
              Careers Management
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              Manage job postings, application settings, and careers page content
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCreateOpen}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg transition-all hover:shadow-md"
          >
            <Plus className="w-5 h-5" />
            Add Job Posting
          </motion.button>
        </div>
        {error && (
          <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-200">
            <span>{error}</span>
            <button type="button" onClick={() => setError(null)} className="shrink-0 rounded p-1 hover:bg-red-200 dark:hover:bg-red-900/50" aria-label="Dismiss">×</button>
          </div>
        )}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search job postings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </motion.header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all"
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
                    {job.title}
                  </h3>
                  <p className="text-xs text-primary font-medium">{job.division}</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-2 mb-2">
                {job.description}
              </p>
              {job.location && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Location: {job.location}</p>
              )}
              <div className="flex items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setViewJob(job)} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
                  <Eye className="w-4 h-4" /> View
                </button>
                <button type="button" onClick={() => handleEditOpen(job)} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button type="button" onClick={() => setDeleteId(job.id)} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-medium">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm p-12 text-center">
          <p className="text-slate-500 dark:text-slate-400">No job postings found. Add one to get started.</p>
        </div>
      )}

      {/* Create Modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <DialogHeader><DialogTitle>Add Job Posting</DialogTitle></DialogHeader>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">Title *</label>
              <input type="text" name="title" value={formData.title} onChange={handleFormChange} required className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20" placeholder="Job title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">Division *</label>
              <select name="division" value={formData.division} onChange={handleFormChange} required className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20">
                <option value="">Select</option>
                {DIVISIONS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">Description *</label>
              <textarea name="description" value={formData.description} onChange={handleFormChange} required rows={4} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 resize-none" placeholder="Job description" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">Location (optional)</label>
              <input type="text" name="location" value={formData.location ?? ""} onChange={handleFormChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20" placeholder="e.g. Abuja" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">Application email (optional)</label>
              <input type="email" name="applicationEmail" value={formData.applicationEmail ?? ""} onChange={handleFormChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20" placeholder="careers@example.com" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="create-active" name="isActive" checked={formData.isActive} onChange={handleFormChange} className="rounded border-slate-300" />
              <label htmlFor="create-active" className="text-sm text-slate-700 dark:text-slate-300">Active (visible on careers page)</label>
            </div>
            <DialogFooter>
              <button type="button" onClick={() => setCreateOpen(false)} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"><Save className="w-4 h-4" /> {isSubmitting ? "Saving..." : "Save"}</button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={!!editJob} onOpenChange={(open) => !open && setEditJob(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <DialogHeader><DialogTitle>Edit Job Posting</DialogTitle></DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">Title *</label>
              <input type="text" name="title" value={formData.title} onChange={handleFormChange} required className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">Division *</label>
              <select name="division" value={formData.division} onChange={handleFormChange} required className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20">
                {DIVISIONS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">Description *</label>
              <textarea name="description" value={formData.description} onChange={handleFormChange} required rows={4} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">Location (optional)</label>
              <input type="text" name="location" value={formData.location ?? ""} onChange={handleFormChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">Application email (optional)</label>
              <input type="email" name="applicationEmail" value={formData.applicationEmail ?? ""} onChange={handleFormChange} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="edit-active" name="isActive" checked={formData.isActive} onChange={handleFormChange} className="rounded border-slate-300" />
              <label htmlFor="edit-active" className="text-sm text-slate-700 dark:text-slate-300">Active</label>
            </div>
            <DialogFooter>
              <button type="button" onClick={() => setEditJob(null)} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"><Save className="w-4 h-4" /> {isSubmitting ? "Saving..." : "Update"}</button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={!!viewJob} onOpenChange={(open) => !open && setViewJob(null)}>
        <DialogContent className="max-w-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <DialogHeader><DialogTitle>View Job Posting</DialogTitle></DialogHeader>
          {viewJob && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{viewJob.title}</h2>
                  <p className="text-sm text-primary font-medium">{viewJob.division}</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{viewJob.description}</p>
              {viewJob.location && <p className="text-sm text-slate-500 dark:text-slate-400">Location: {viewJob.location}</p>}
              {viewJob.applicationEmail && <p className="text-sm text-slate-500 dark:text-slate-400">Apply to: {viewJob.applicationEmail}</p>}
              <p className="text-xs text-slate-400">{viewJob.isActive ? "Visible on careers page" : "Hidden"}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => { if (!open) { setDeleteId(null); setError(null); } }}>
        <AlertDialogContent className="border-slate-200 dark:border-slate-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete job posting?</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this job posting? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 text-white hover:bg-red-700">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
