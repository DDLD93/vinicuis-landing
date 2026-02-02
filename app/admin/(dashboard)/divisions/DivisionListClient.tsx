"use client";

import { useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Eye,
  Save,
  Shield,
  Building2,
  Plane,
  Server,
  Car,
  Wheat,
  Pill,
  Trophy,
} from "lucide-react";
import type { Division, DivisionKeyService } from "@/lib/models/Division";
import {
  createDivision,
  updateDivision,
  deleteDivision,
} from "@/lib/actions/division";
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

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Building2,
  Plane,
  Server,
  Car,
  Wheat,
  Pill,
  Trophy,
};

const ICON_OPTIONS = [
  "Shield",
  "Building2",
  "Plane",
  "Server",
  "Car",
  "Wheat",
  "Pill",
  "Trophy",
];

const emptyDetailedContent = {
  headline: "",
  introduction: "",
  keyServices: [] as DivisionKeyService[],
  overview: "",
  clientele: "",
};

const emptyDivision: Omit<Division, "id"> = {
  slug: "",
  title: "",
  subtitle: "",
  description: "",
  image: "",
  icon: "Shield",
  detailedContent: { ...emptyDetailedContent },
};

interface DivisionListClientProps {
  initialDivisions: Division[];
}

export default function DivisionListClient({
  initialDivisions: divisions,
}: DivisionListClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [viewDivision, setViewDivision] = useState<Division | null>(null);
  const [editDivision, setEditDivision] = useState<Division | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Division>({
    ...emptyDivision,
    id: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const objectUrl = URL.createObjectURL(file);
    setImagePreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return objectUrl;
    });
    setIsUploading(true);
    try {
      const form = new FormData();
      form.append("image", file);
      form.append("type", "division");
      const res = await fetch("/api/upload", { method: "POST", body: form });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Upload failed");
      }
      const data = await res.json();
      setFormData((prev) => ({ ...prev, image: data.url }));
      setImagePreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
    } finally {
      setIsUploading(false);
    }
  };

  const filteredDivisions = divisions.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateOpen = () => {
    setError(null);
    setImagePreviewUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return null; });
    setFormData({
      ...emptyDivision,
      detailedContent: { ...emptyDetailedContent },
      id: "",
    });
    setCreateOpen(true);
  };

  const handleEditOpen = (division: Division) => {
    setError(null);
    setImagePreviewUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return null; });
    setFormData({
      ...division,
      detailedContent: {
        ...division.detailedContent,
        keyServices: division.detailedContent.keyServices ?? [],
        clientele: division.detailedContent.clientele ?? "",
      },
    });
    setEditDivision(division);
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("detail.")) {
      const key = name.replace("detail.", "") as keyof typeof formData.detailedContent;
      setFormData((prev) => ({
        ...prev,
        detailedContent: {
          ...prev.detailedContent,
          [key]: value,
        },
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setKeyService = (index: number, field: "title" | "description", value: string) => {
    setFormData((prev) => {
      const keyServices = [...(prev.detailedContent.keyServices ?? [])];
      if (!keyServices[index]) keyServices[index] = { title: "", description: "" };
      keyServices[index] = { ...keyServices[index], [field]: value };
      return {
        ...prev,
        detailedContent: { ...prev.detailedContent, keyServices },
      };
    });
  };

  const addKeyService = () => {
    setFormData((prev) => ({
      ...prev,
      detailedContent: {
        ...prev.detailedContent,
        keyServices: [...(prev.detailedContent.keyServices ?? []), { title: "", description: "" }],
      },
    }));
  };

  const removeKeyService = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      detailedContent: {
        ...prev.detailedContent,
        keyServices: prev.detailedContent.keyServices.filter((_, i) => i !== index),
      },
    }));
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const result = await createDivision({
      slug: formData.slug,
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      image: formData.image,
      icon: formData.icon,
      detailedContent: {
        headline: formData.detailedContent.headline,
        introduction: formData.detailedContent.introduction,
        keyServices: formData.detailedContent.keyServices ?? [],
        overview: formData.detailedContent.overview,
        clientele: formData.detailedContent.clientele || undefined,
      },
    });
    setIsSubmitting(false);
    if (result.success) {
      setCreateOpen(false);
      startTransition(() => router.refresh());
      toast({ title: "Success", description: "Division created." });
    } else {
      setError(result.error);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editDivision) return;
    setError(null);
    setIsSubmitting(true);
    const result = await updateDivision(editDivision.id, {
      slug: formData.slug,
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      image: formData.image,
      icon: formData.icon,
      detailedContent: {
        headline: formData.detailedContent.headline,
        introduction: formData.detailedContent.introduction,
        keyServices: formData.detailedContent.keyServices ?? [],
        overview: formData.detailedContent.overview,
        clientele: formData.detailedContent.clientele || undefined,
      },
    });
    setIsSubmitting(false);
    if (result.success) {
      setEditDivision(null);
      startTransition(() => router.refresh());
      toast({ title: "Success", description: "Division updated." });
    } else {
      setError(result.error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setError(null);
    const result = await deleteDivision(deleteId);
    if (result.success) {
      setDeleteId(null);
      startTransition(() => router.refresh());
      toast({ title: "Success", description: "Division deleted." });
    } else {
      setError(result.error);
      setDeleteId(null);
    }
  };

  const renderFormFields = (isEdit: boolean) => (
    <>
      <div>
        <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">Slug *</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleFormChange}
          required
          placeholder="e.g. defense-security"
          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleFormChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">Subtitle *</label>
        <input
          type="text"
          name="subtitle"
          value={formData.subtitle}
          onChange={handleFormChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleFormChange}
          required
          rows={2}
          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">Image *</label>
        {(formData.image || imagePreviewUrl) && (
          <div className="mb-3 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 aspect-video max-h-48 w-full">
            <img src={formData.image || imagePreviewUrl!} alt="Preview" className="w-full h-full object-contain" />
          </div>
        )}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
          disabled={isUploading}
        />
        {isUploading && <p className="text-xs text-slate-500 mt-1">Uploading...</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">Icon *</label>
        <select
          name="icon"
          value={formData.icon}
          onChange={handleFormChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20"
        >
          {ICON_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">Detail: Headline *</label>
        <input
          type="text"
          name="detail.headline"
          value={formData.detailedContent.headline}
          onChange={handleFormChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">Detail: Introduction *</label>
        <textarea
          name="detail.introduction"
          value={formData.detailedContent.introduction}
          onChange={handleFormChange}
          required
          rows={2}
          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 resize-none"
        />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-slate-900 dark:text-white">Key Services</label>
          <button type="button" onClick={addKeyService} className="text-xs text-primary hover:underline">+ Add</button>
        </div>
        {(formData.detailedContent.keyServices ?? []).map((svc, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Title"
              value={svc.title}
              onChange={(e) => setKeyService(i, "title", e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
            />
            <input
              type="text"
              placeholder="Description"
              value={svc.description}
              onChange={(e) => setKeyService(i, "description", e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
            />
            <button type="button" onClick={() => removeKeyService(i)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded p-2">×</button>
          </div>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">Detail: Overview *</label>
        <textarea
          name="detail.overview"
          value={formData.detailedContent.overview}
          onChange={handleFormChange}
          required
          rows={3}
          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">Detail: Clientele (optional)</label>
        <input
          type="text"
          name="detail.clientele"
          value={formData.detailedContent.clientele ?? ""}
          onChange={handleFormChange}
          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </>
  );

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
              Divisions Management
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              Manage your core business divisions and content
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCreateOpen}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg transition-all hover:shadow-md"
          >
            <Plus className="w-5 h-5" />
            Add Division
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
            placeholder="Search divisions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </motion.header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredDivisions.map((division, index) => {
          const Icon = ICON_MAP[division.icon] ?? Shield;
          return (
            <motion.div
              key={division.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="relative h-40 overflow-hidden">
                <img src={division.image} alt={division.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 w-10 h-10 bg-primary/90 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <p className="text-xs font-medium text-primary mb-2">{division.subtitle}</p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{division.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-2 mb-4">{division.description}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Slug: {division.slug}</p>
                <div className="flex items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button type="button" onClick={() => setViewDivision(division)} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
                    <Eye className="w-4 h-4" /> View
                  </button>
                  <button type="button" onClick={() => handleEditOpen(division)} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                  <button type="button" onClick={() => setDeleteId(division.id)} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-medium">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredDivisions.length === 0 && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm p-12 text-center">
          <p className="text-slate-500 dark:text-slate-400">No divisions found. Add one or run the seed script.</p>
        </div>
      )}

      {/* Create Modal */}
      <Dialog
        open={createOpen}
        onOpenChange={(open) => {
          if (!open) setImagePreviewUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return null; });
          setCreateOpen(open);
        }}
      >
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <DialogHeader><DialogTitle>Add New Division</DialogTitle></DialogHeader>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            {renderFormFields(false)}
            <DialogFooter>
              <button type="button" onClick={() => { setImagePreviewUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return null; }); setCreateOpen(false); }} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">Cancel</button>
              <button type="submit" disabled={isSubmitting || !formData.image} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">
                <Save className="w-4 h-4" /> {isSubmitting ? "Saving..." : "Save"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog
        open={!!editDivision}
        onOpenChange={(open) => {
          if (!open) {
            setImagePreviewUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return null; });
            setEditDivision(null);
          }
        }}
      >
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <DialogHeader><DialogTitle>Edit Division</DialogTitle></DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            {renderFormFields(true)}
            <DialogFooter>
              <button type="button" onClick={() => { setImagePreviewUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return null; }); setEditDivision(null); }} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">
                <Save className="w-4 h-4" /> {isSubmitting ? "Saving..." : "Update"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={!!viewDivision} onOpenChange={(open) => !open && setViewDivision(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <DialogHeader><DialogTitle>View Division</DialogTitle></DialogHeader>
          {viewDivision && (() => {
            const Icon = ICON_MAP[viewDivision.icon] ?? Shield;
            return (
              <div className="space-y-4">
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <img src={viewDivision.image} alt={viewDivision.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 w-10 h-10 bg-primary/90 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
                <p className="text-xs font-medium text-primary">{viewDivision.subtitle}</p>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{viewDivision.title}</h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{viewDivision.description}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Slug: {viewDivision.slug}</p>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">{viewDivision.detailedContent.headline}</p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{viewDivision.detailedContent.introduction}</p>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => { if (!open) { setDeleteId(null); setError(null); } }}>
        <AlertDialogContent className="border-slate-200 dark:border-slate-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete division?</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this division? This action cannot be undone.</AlertDialogDescription>
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
