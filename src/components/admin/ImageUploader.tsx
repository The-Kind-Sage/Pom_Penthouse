import React, { useState } from "react";
import { X } from "lucide-react";

interface Props {
  value?: string[];
  min?: number;
  max?: number;
  onChange?: (urls: string[]) => void;
}

export default function ImageUploader({ value = [], min = 3, max = 5, onChange }: Props) {
  const [urls, setUrls] = useState<string[]>(value || []);
  const [loading, setLoading] = useState(false);

  const sync = (next: string[]) => {
    setUrls(next);
    onChange?.(next);
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || !files.length) return;
    const toUpload = Array.from(files).slice(0, Math.max(0, max - urls.length));
    if (!toUpload.length) return;
    setLoading(true);
    try {
      const uploaded: string[] = [];
      for (const file of toUpload) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("folder", "rooms");
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (res.ok && data.url) uploaded.push(data.url);
      }
      sync([...urls, ...uploaded].slice(0, max));
    } catch (e) {
      // swallow — parent will handle validation
    } finally {
      setLoading(false);
    }
  };

  const remove = (i: number) => {
    const next = urls.filter((_, idx) => idx !== i);
    sync(next);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Photos</label>
        <span className="text-xs text-foreground/60">(Upload {min}–{max})</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {urls.map((u, i) => (
          <div key={u} className="relative w-28 h-20 rounded-md overflow-hidden border">
            <img src={u} alt={`img-${i}`} className="object-cover w-full h-full" />
            <button onClick={() => remove(i)} className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full">
              <X className="size-3" />
            </button>
          </div>
        ))}
        {urls.length < max && (
          <label className="w-28 h-20 flex items-center justify-center rounded-md border cursor-pointer bg-muted/30">
            <input type="file" accept="image/*" multiple onChange={(e) => handleFiles(e.target.files)} className="hidden" />
            <div className="text-sm text-foreground/70">{loading ? "Uploading..." : "Add"}</div>
          </label>
        )}
      </div>
      {urls.length < min && <p className="text-xs text-red-500">Please upload at least {min} photos.</p>}
    </div>
  );
}
