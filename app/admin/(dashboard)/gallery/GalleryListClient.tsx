"use client";

import { useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Search, Tag, Eye, Save, GripVertical, ChevronUp, ChevronDown, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/lib/models/Gallery";
import {
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "@/lib/actions/gallery";
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

const MAX_GALLERY_IMAGES = 20;
// Must stay under Vercel serverless request body limit (~4.5MB)
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

const CATEGORIES = [
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

const emptyItem: Omit<GalleryItem, "id"> = {
  title: "",
  category: "",
  image: "",
  images: [],
  description: "",
};

interface GalleryListClientProps {
  initialItems: GalleryItem[];
}

export default function GalleryListClient({
  initialItems: items,
}: GalleryListClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [viewItem, setViewItem] = useState<GalleryItem | null>(null);
  const [viewImageIndex, setViewImageIndex] = useState(0);
  const [editItem, setEditItem] = useState<GalleryItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState<GalleryItem>({
    ...emptyItem,
    id: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const uploadOneFile = async (file: File): Promise<string> => {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`Image too large. Max ${MAX_FILE_SIZE / 1024 / 1024}MB per file.`);
    }
    const form = new FormData();
    form.append("image", file);
    form.append("type", "gallery");
    const res = await fetch("/api/upload", { method: "POST", body: form });
    if (!res.ok) {
      if (res.status === 413) {
        throw new Error("Image too large. Max 4MB per file.");
      }
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Upload failed");
    }
    const data = await res.json();
    return data.url;
  };

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Max 4MB per image. Use a smaller or compressed image.",
        variant: "destructive",
      });
      return;
    }
    const currentCount = formData.images?.length ?? (formData.image ? 1 : 0);
    if (currentCount >= MAX_GALLERY_IMAGES) {
      toast({
        title: "Maximum images reached",
        description: `You can add up to ${MAX_GALLERY_IMAGES} images per item.`,
        variant: "destructive",
      });
      return;
    }
    setIsUploading(true);
    try {
      const url = await uploadOneFile(file);
      setFormData((prev) => {
        const images = [...(prev.images ?? (prev.image ? [prev.image] : [])), url];
        return { ...prev, images, image: images[0] };
      });
    } catch (err) {
      toast({
        title: "Upload failed",
        description: err instanceof Error ? err.message : "Could not upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleMultipleImageUpload = async (fileList: FileList | null) => {
    if (!fileList?.length) return;
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (!files.length) {
      toast({ title: "No images selected", description: "Please select image files (JPEG, PNG, WebP, GIF).", variant: "destructive" });
      return;
    }
    const underSize = files.filter((f) => f.size <= MAX_FILE_SIZE);
    const overCount = files.length - underSize.length;
    if (overCount > 0) {
      toast({
        title: "Some files too large",
        description: `${overCount} image(s) over 4MB were skipped. Max 4MB per file.`,
        variant: "destructive",
      });
    }
    const currentCount = formData.images?.length ?? (formData.image ? 1 : 0);
    if (currentCount >= MAX_GALLERY_IMAGES) {
      toast({
        title: "Maximum images reached",
        description: `You can add up to ${MAX_GALLERY_IMAGES} images per item.`,
        variant: "destructive",
      });
      return;
    }
    const remaining = MAX_GALLERY_IMAGES - currentCount;
    const toUpload = underSize.slice(0, remaining);
    if (underSize.length > remaining) {
      toast({
        title: "Some images skipped",
        description: `Only ${remaining} image(s) added. Maximum is ${MAX_GALLERY_IMAGES} per item.`,
        variant: "destructive",
      });
    }
    setIsUploading(true);
    try {
      const newUrls: string[] = [];
      for (const file of toUpload) {
        const url = await uploadOneFile(file);
        newUrls.push(url);
      }
      if (newUrls.length) {
        setFormData((prev) => {
          const images = [...(prev.images ?? (prev.image ? [prev.image] : [])), ...newUrls];
          return { ...prev, images, image: images[0] };
        });
      }
    } catch (err) {
      toast({
        title: "Upload failed",
        description: err instanceof Error ? err.message : "Could not upload image(s)",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImageAt = (index: number) => {
    setFormData((prev) => {
      const images = (prev.images ?? (prev.image ? [prev.image] : [])).filter((_, i) => i !== index);
      return { ...prev, images, image: images[0] ?? "" };
    });
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    setFormData((prev) => {
      const list = prev.images ?? (prev.image ? [prev.image] : []);
      if (list.length < 2) return prev;
      const next = [...list];
      const j = direction === "up" ? index - 1 : index + 1;
      if (j < 0 || j >= next.length) return prev;
      [next[index], next[j]] = [next[j], next[index]];
      return { ...prev, images: next, image: next[0] };
    });
  };

  const formImages = formData.images?.length ? formData.images : formData.image ? [formData.image] : [];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description?.toLowerCase() ?? "").includes(
        searchQuery.toLowerCase()
      )
  );

  const handleCreateOpen = () => {
    setError(null);
    setImagePreviewUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return null; });
    setFormData({ ...emptyItem, id: "" });
    setCreateOpen(true);
  };

  const handleEditOpen = (item: GalleryItem) => {
    setError(null);
    setFormData({
      ...item,
      images: item.images ?? (item.image ? [item.image] : []),
    });
    setEditItem(item);
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const images = formData.images?.length ? formData.images : formData.image ? [formData.image] : [];
    if (!images.length) {
      setError("At least one image is required.");
      return;
    }
    if (images.length > MAX_GALLERY_IMAGES) {
      setError(`Maximum ${MAX_GALLERY_IMAGES} images allowed per item.`);
      return;
    }
    setIsSubmitting(true);
    const result = await createGalleryItem({
      title: formData.title,
      category: formData.category,
      image: images[0],
      images,
      description: formData.description ?? "",
    });
    setIsSubmitting(false);
    if (result.success) {
      setCreateOpen(false);
      startTransition(() => router.refresh());
      toast({ title: "Success", description: "Gallery item created." });
    } else {
      setError("error" in result ? result.error : "Failed to create");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem) return;
    setError(null);
    const images = formData.images?.length ? formData.images : formData.image ? [formData.image] : [];
    if (!images.length) {
      setError("At least one image is required.");
      return;
    }
    if (images.length > MAX_GALLERY_IMAGES) {
      setError(`Maximum ${MAX_GALLERY_IMAGES} images allowed per item.`);
      return;
    }
    setIsSubmitting(true);
    const result = await updateGalleryItem(editItem.id, {
      title: formData.title,
      category: formData.category,
      image: images[0],
      images,
      description: formData.description ?? "",
    });
    setIsSubmitting(false);
    if (result.success) {
      setEditItem(null);
      router.refresh();
    } else {
      setError("error" in result ? result.error : "Failed to update");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setError(null);
    const result = await deleteGalleryItem(deleteId);
    if (result.success) {
      setDeleteId(null);
      startTransition(() => router.refresh());
      toast({ title: "Success", description: "Gallery item deleted." });
    } else {
      setError("error" in result ? result.error : "Failed to delete");
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
              Gallery Management
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              Manage your gallery images and content
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCreateOpen}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg transition-all hover:shadow-md"
          >
            <Plus className="w-5 h-5" />
            Add New Item
          </motion.button>
        </div>
        {error && (
          <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-200">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError(null)}
              className="shrink-0 rounded p-1 hover:bg-red-200 dark:hover:bg-red-900/50"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        )}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search gallery items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </motion.header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  <Tag className="w-3 h-3" />
                  {item.category}
                </span>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-2 mb-4">
                  {item.description}
                </p>
              )}
              <div className="flex items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => { setViewItem(item); setViewImageIndex(0); }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  type="button"
                  onClick={() => handleEditOpen(item)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteId(item.id)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm p-12 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            No gallery items found
          </p>
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
          <DialogHeader>
            <DialogTitle>Add New Gallery Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20"
                placeholder="Item title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Select</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                Note: First Image will be the Cover image 
              </label>
              {formImages.length > 0 && (
                <ul className="flex flex-wrap gap-2 mb-3">
                  {formImages.map((url, i) => (
                    <li key={`${url}-${i}`} className="relative group flex items-center gap-1">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shrink-0">
                        <img src={url} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <button type="button" onClick={() => moveImage(i, "up")} disabled={i === 0} className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40" aria-label="Move up"><ChevronUp className="w-4 h-4" /></button>
                        <button type="button" onClick={() => moveImage(i, "down")} disabled={i === formImages.length - 1} className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40" aria-label="Move down"><ChevronDown className="w-4 h-4" /></button>
                      </div>
                      <button type="button" onClick={() => removeImageAt(i)} className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs hover:bg-red-600" aria-label="Remove">×</button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  className="hidden"
                  id="create-gallery-images"
                  onChange={(e) => {
                    handleMultipleImageUpload(e.target.files);
                    e.target.value = "";
                  }}
                  disabled={isUploading || formImages.length >= MAX_GALLERY_IMAGES}
                />
                <label
                  htmlFor="create-gallery-images"
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-medium ${
                    isUploading || formImages.length >= MAX_GALLERY_IMAGES
                      ? "opacity-50 cursor-not-allowed pointer-events-none"
                      : "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <Plus className="w-4 h-4" /> Add image(s)
                </label>
                <span className="text-xs text-muted-foreground">Max 4MB per file</span>
                {isUploading && <span className="text-xs text-slate-500">Uploading...</span>}
                {formImages.length >= MAX_GALLERY_IMAGES && !isUploading && (
                  <span className="text-xs text-amber-600 dark:text-amber-400">Maximum {MAX_GALLERY_IMAGES} images.</span>
                )}
              </div>
              {formImages.length === 0 && !isUploading && (
                <p className="text-xs text-slate-500 mt-1">Select one or more images (JPEG, PNG, WebP, GIF). At least one required, max {MAX_GALLERY_IMAGES}.</p>
              )}
              {formImages.length > 0 && formImages.length < MAX_GALLERY_IMAGES && !isUploading && (
                <p className="text-xs text-slate-500 mt-1">{formImages.length} / {MAX_GALLERY_IMAGES} images</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description ?? ""}
                onChange={handleFormChange}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 resize-none"
                placeholder="Optional description"
              />
            </div>
            <DialogFooter>
              <button
                type="button"
                onClick={() => {
                  setImagePreviewUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return null; });
                  setCreateOpen(false);
                }}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || formImages.length === 0}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />{" "}
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog
        open={!!editItem}
        onOpenChange={(open) => {
          if (!open) {
            setImagePreviewUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return null; });
            setEditItem(null);
          }
        }}
      >
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <DialogHeader>
            <DialogTitle>Edit Gallery Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                Title *
              </label>
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
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                Note: First Image will be the Cover image 
              </label>
              {formImages.length > 0 && (
                <ul className="flex flex-wrap gap-2 mb-3">
                  {formImages.map((url, i) => (
                    <li key={`${url}-${i}`} className="relative group flex items-center gap-1">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shrink-0">
                        <img src={url} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <button type="button" onClick={() => moveImage(i, "up")} disabled={i === 0} className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40" aria-label="Move up"><ChevronUp className="w-4 h-4" /></button>
                        <button type="button" onClick={() => moveImage(i, "down")} disabled={i === formImages.length - 1} className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40" aria-label="Move down"><ChevronDown className="w-4 h-4" /></button>
                      </div>
                      <button type="button" onClick={() => removeImageAt(i)} className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs hover:bg-red-600" aria-label="Remove">×</button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  className="hidden"
                  id="edit-gallery-images"
                  onChange={(e) => {
                    handleMultipleImageUpload(e.target.files);
                    e.target.value = "";
                  }}
                  disabled={isUploading || formImages.length >= MAX_GALLERY_IMAGES}
                />
                <label
                  htmlFor="edit-gallery-images"
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-medium ${
                    isUploading || formImages.length >= MAX_GALLERY_IMAGES
                      ? "opacity-50 cursor-not-allowed pointer-events-none"
                      : "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <Plus className="w-4 h-4" /> Add image(s)
                </label>
                <span className="text-xs text-muted-foreground">Max 4MB per file</span>
                {isUploading && <span className="text-xs text-slate-500">Uploading...</span>}
                {formImages.length >= MAX_GALLERY_IMAGES && !isUploading && (
                  <span className="text-xs text-amber-600 dark:text-amber-400">Maximum {MAX_GALLERY_IMAGES} images.</span>
                )}
              </div>
              {formImages.length > 0 && formImages.length < MAX_GALLERY_IMAGES && !isUploading && (
                <p className="text-xs text-slate-500 mt-1">{formImages.length} / {MAX_GALLERY_IMAGES} images</p>
              )}
              {formImages.length === 0 && !isUploading && (
                <p className="text-xs text-slate-500 mt-1">At least one image required. Max {MAX_GALLERY_IMAGES}.</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description ?? ""}
                onChange={handleFormChange}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>
            <DialogFooter>
              <button
                type="button"
                onClick={() => setEditItem(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />{" "}
                {isSubmitting ? "Saving..." : "Update"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog
        open={!!viewItem}
        onOpenChange={(open) => {
          if (!open) {
            setViewItem(null);
            setViewImageIndex(0);
          }
        }}
      >
        <DialogContent className="max-w-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <DialogHeader>
            <DialogTitle className="sr-only">View Gallery Item</DialogTitle>
          </DialogHeader>
          {viewItem && (() => {
            const viewImages = viewItem.images?.length ? viewItem.images : (viewItem.image ? [viewItem.image] : []);
            const currentUrl = viewImages[viewImageIndex] ?? viewItem.image;
            const hasMultiple = viewImages.length > 1;
            return (
              <div className="space-y-4">
                <div className="relative h-64 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={currentUrl}
                    alt={`${viewItem.title} – image ${viewImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    <Tag className="w-3 h-3" /> {viewItem.category}
                  </span>
                  {hasMultiple && (
                    <>
                      <button
                        type="button"
                        onClick={() => setViewImageIndex((i) => (i - 1 + viewImages.length) % viewImages.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewImageIndex((i) => (i + 1) % viewImages.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {viewImages.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setViewImageIndex(i)}
                            className={`w-2 h-2 rounded-full transition-colors ${i === viewImageIndex ? "bg-white" : "bg-white/50 hover:bg-white/70"}`}
                            aria-label={`Image ${i + 1}`}
                          />
                        ))}
                      </div>
                      <span className="absolute top-3 right-3 text-xs text-white/90 bg-black/40 px-2 py-1 rounded">
                        {viewImageIndex + 1} / {viewImages.length}
                      </span>
                    </>
                  )}
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {viewItem.title}
                </h2>
                {viewItem.description && (
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {viewItem.description}
                  </p>
                )}
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteId(null);
            setError(null);
          }
        }}
      >
        <AlertDialogContent className="border-slate-200 dark:border-slate-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete gallery item?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this gallery item? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
