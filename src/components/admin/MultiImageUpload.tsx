import { useState, useRef } from "react";
import { Upload, X, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

type MultiImageUploadProps = {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  maxImages?: number;
};

function compressImage(file: File, maxWidth = 1200, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let w = img.width;
        let h = img.height;
        if (w > maxWidth) {
          h = (h * maxWidth) / w;
          w = maxWidth;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function MultiImageUpload({ value, onChange, label = "Images", maxImages = 10 }: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image too large (max 5MB)");
      return;
    }
    if (value.length >= maxImages) {
      toast.error(`Max ${maxImages} images allowed`);
      return;
    }
    setUploading(true);
    try {
      const dataUrl = await compressImage(file);
      onChange([...value, dataUrl]);
      toast.success("Image added");
    } catch {
      toast.error("Failed to process image");
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const canAddMore = value.length < maxImages;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium block">{label} ({value.length}/{maxImages})</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {value.map((url, i) => (
          <div key={i} className="relative w-full rounded-xl overflow-hidden border group">
            <img src={url} alt={`${label} ${i + 1}`} className="w-full h-32 object-cover" />
            <button type="button" onClick={() => removeImage(i)}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/70 hover:bg-red-500 text-white transition opacity-0 group-hover:opacity-100">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      {canAddMore && (
        <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
          className="w-full h-24 rounded-xl border-2 border-dashed border-border hover:border-gold/50 transition flex flex-col items-center justify-center gap-2 text-foreground/40 hover:text-foreground/70 disabled:opacity-50">
          {uploading ? <Loader2 className="size-5 animate-spin" /> : <Plus className="size-5" />}
          <span className="text-xs">{uploading ? "Processing..." : "Add Image"}</span>
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
}
