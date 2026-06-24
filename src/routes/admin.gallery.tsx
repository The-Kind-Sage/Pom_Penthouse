import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { useGalleryImages, useAddGalleryImage, useRemoveGalleryImage } from "@/lib/hooks";
import { Upload, Plus, Trash2, Image as ImageIcon, Link } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/gallery")({
  component: GalleryPage,
});

function GalleryPage() {
  const { data: images, isLoading } = useGalleryImages();
  const addImage = useAddGalleryImage();
  const removeImage = useRemoveGalleryImage();
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "pom-penthouse/gallery");
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Upload failed");
      await addImage.mutateAsync({ url: data.url, label });
      toast.success("Image added to gallery");
      setLabel("");
      if (fileRef.current) fileRef.current.value = "";
    } catch (err: any) {
      toast.error(err?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleAddUrl = async () => {
    if (!url.trim()) return;
    try {
      await addImage.mutateAsync({ url: url.trim(), label });
      toast.success("Image added to gallery");
      setUrl("");
      setLabel("");
    } catch {
      toast.error("Failed to add image");
    }
  };

  const handleRemove = async (index: number) => {
    try {
      await removeImage.mutateAsync(index);
      toast.success("Image removed from gallery");
    } catch {
      toast.error("Failed to remove image");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Gallery</h1>
          <p className="text-sm text-foreground/60">Manage website gallery images</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="flex items-center gap-2 text-sm border rounded-lg px-3 py-2 hover:bg-muted transition"
          >
            <Link size={14} /> {showUrlInput ? "Upload File" : "Paste URL"}
          </button>
        </div>
      </div>

      <div className="bg-background border rounded-xl p-6">
        {showUrlInput ? (
          <div className="space-y-4 max-w-xl">
            <h3 className="font-medium">Paste Image URL</h3>
            <input
              placeholder="Image label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm"
            />
            <input
              placeholder="https://example.com/image.jpg"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm"
            />
            <button onClick={handleAddUrl} disabled={addImage.isPending} className="btn-primary text-sm py-2 px-4 disabled:opacity-50 flex items-center gap-2">
              <Plus className="size-4" /> Add Image
            </button>
          </div>
        ) : (
          <div className="space-y-4 max-w-xl">
            <h3 className="font-medium">Upload Image</h3>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gold file:text-black file:text-xs file:font-semibold file:uppercase file:tracking-wider file:cursor-pointer"
            />
            <input
              placeholder="Label (optional)"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm"
            />
            <button onClick={handleUpload} disabled={uploading} className="btn-primary text-sm py-2 px-4 disabled:opacity-50 flex items-center gap-2">
              <Upload className="size-4" /> {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        )}
      </div>

      <div className="bg-background border rounded-xl p-6">
        <h3 className="font-medium mb-4">Gallery Images ({images?.length || 0})</h3>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : !images?.length ? (
          <div className="flex flex-col items-center gap-3 py-12 text-muted-foreground">
            <ImageIcon className="size-10" />
            <p className="text-sm">No images yet. Upload or paste URLs above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted">
                <img src={img.url} alt={img.label} className="size-full object-cover" />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/40" />
                {img.label && (
                  <span className="absolute bottom-2 left-2 right-2 text-xs text-white opacity-0 transition group-hover:opacity-100 truncate">
                    {img.label}
                  </span>
                )}
                <button
                  onClick={() => handleRemove(i)}
                  className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-red-500/80 text-white opacity-0 transition hover:bg-red-600 group-hover:opacity-100"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
