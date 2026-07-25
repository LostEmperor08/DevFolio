"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { uploadMedia } from "@/app/actions/media.actions";
import { AdminButton } from "../ui/AdminButton";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function ImageUploaderModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith("image/")) {
        setFile(droppedFile);
        setPreview(URL.createObjectURL(droppedFile));
      } else {
        toast.error("Please drop an image file.");
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadMedia(formData);

      if (res.success) {
        toast.success("Image uploaded to Vercel Blob!");
        setIsOpen(false);
        setFile(null);
        setPreview(null);
        router.refresh();
      } else {
        toast.error("Upload failed: " + res.error);
      }
    } catch (e: any) {
      toast.error("Upload error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <AdminButton onClick={() => setIsOpen(true)}>
        <Upload className="mr-2 h-4 w-4" /> Upload Image
      </AdminButton>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="animate-in fade-in zoom-in-95 relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0a0a0a] p-6">
            <button
              onClick={() => {
                setIsOpen(false);
                setFile(null);
                setPreview(null);
              }}
              className="text-muted-foreground absolute top-4 right-4 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="mb-6 text-xl font-bold text-white">Upload Media</h2>

            {!preview ? (
              <div
                className={`cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-colors ${isDragging ? "border-accent-blue bg-accent-blue/5" : "border-white/10 hover:border-white/20 hover:bg-white/5"} `}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
                <ImageIcon className="text-muted-foreground mx-auto mb-4 h-10 w-10" />
                <p className="mb-1 text-sm font-medium text-white">Click or drag image to upload</p>
                <p className="text-muted-foreground text-xs">PNG, JPG, WEBP, GIF up to 5MB</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black/50">
                  <Image src={preview} alt="Preview" fill className="object-contain" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="max-w-[200px] truncate text-white">{file?.name}</span>
                  <button
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <AdminButton variant="ghost" onClick={() => setIsOpen(false)} disabled={isUploading}>
                Cancel
              </AdminButton>
              <AdminButton
                onClick={handleUpload}
                disabled={!file || isUploading}
                isLoading={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload to Vercel"}
              </AdminButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
