import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import Image from "next/image";
import { ImageUploaderModal } from "@/components/admin/media/ImageUploaderModal";
import { CopyButton } from "@/components/admin/media/CopyButton";
import { list } from "@vercel/blob";

export default async function MediaPage() {
  let files: { name: string; url: string; date: Date }[] = [];

  try {
    // If BLOB_READ_WRITE_TOKEN is not set, this will throw
    const { blobs } = await list();
    files = blobs
      .map((blob) => ({
        name: blob.pathname,
        url: blob.url,
        date: blob.uploadedAt,
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  } catch (error) {
    console.error("Failed to list blobs", error);
  }

  return (
    <div className="max-w-6xl">
      <AdminPageHeader
        title="Media Library"
        description="Upload and manage images via Vercel Blob."
        action={<ImageUploaderModal />}
      />

      {files.length === 0 ? (
        <div className="glass-panel rounded-3xl border border-white/5 p-12 text-center">
          <p className="text-muted-foreground mb-2">No media files found or Blob token missing.</p>
          <p className="text-muted-foreground/50 text-xs">
            Make sure BLOB_READ_WRITE_TOKEN is set in your .env
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {files.map((file) => (
            <div
              key={file.url}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-white/5 bg-white/5"
            >
              <Image
                src={file.url}
                alt={file.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                <CopyButton text={file.url} />
                <span className="w-[80%] truncate text-center text-xs text-white/70">
                  {file.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
