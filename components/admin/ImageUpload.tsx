"use client";

import { useRef, useState } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import api from "@/lib/axios";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

/**
 * Click or drag-and-drop image uploader. Sends the file to /api/upload
 * which stores it locally in /public/uploads and returns its URL.
 */
export default function ImageUpload({
  value,
  onChange,
  label = "Image",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const upload = async (file: File) => {
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await api.post("/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onChange(res.data.url);
    } catch (err) {
      setError((err as Error).message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleFile = (files: FileList | null) => {
    if (files && files[0]) upload(files[0]);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files)}
      />

      {value ? (
        <div className="group relative overflow-hidden rounded-xl border border-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt={label}
            className="h-48 w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-slate-900/0 opacity-0 transition-all group-hover:bg-slate-900/40 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-600"
            >
              <X size={13} className="inline" /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFile(e.dataTransfer.files);
          }}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-10 text-center transition-colors ${
            dragOver
              ? "border-sky-400 bg-sky-50"
              : "border-slate-200 bg-slate-50 hover:border-sky-300"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 size={24} className="animate-spin text-sky-500" />
              <p className="text-sm font-medium text-slate-500">Uploading…</p>
            </>
          ) : (
            <>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-sky-500 shadow-sm">
                <Upload size={20} />
              </div>
              <p className="text-sm font-medium text-slate-600">
                Click to upload or drag &amp; drop
              </p>
              <p className="text-xs text-slate-400">
                JPG, PNG, WEBP or GIF — up to 5 MB
              </p>
            </>
          )}
        </div>
      )}

      {error && <p className="mt-1.5 text-xs text-rose-500">{error}</p>}

      {/* Manual URL fallback */}
      <div className="mt-2 flex items-center gap-2">
        <ImageIcon size={13} className="text-slate-400" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="…or paste an image URL"
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 outline-none focus:border-sky-400"
        />
      </div>
    </div>
  );
}
