"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Edit2, Search, Trash2, Clock, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { deleteBlog } from "@/app/actions/blog.actions";
import { AdminButton } from "../ui/AdminButton";
import { AdminModal } from "../ui/AdminModal";

export function BlogListTable({
  initialBlogs,
  total,
  currentPage,
  currentQuery,
  currentSort,
}: any) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    if (name !== "page") params.set("page", "1");
    return params.toString();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(pathname + "?" + createQueryString("q", e.target.value));
  };

  const handleSort = (field: string) => {
    router.push(pathname + "?" + createQueryString("sort", field));
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === initialBlogs.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(initialBlogs.map((p: any) => p.id)));
  };

  const handleBulkDelete = async () => {
    setIsDeleting(true);
    try {
      for (const id of Array.from(selectedIds)) {
        await deleteBlog(id);
      }
      toast.success(`Deleted ${selectedIds.size} blogs`);
      setSelectedIds(new Set());
      setIsDeleteModalOpen(false);
      router.refresh();
    } catch (e) {
      toast.error("Failed to delete some blogs");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 md:flex-row">
        <div className="relative w-full max-w-sm">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles..."
            defaultValue={currentQuery}
            onChange={(e) => setTimeout(() => handleSearch(e), 500)}
            className="focus:border-accent-blue w-full rounded-xl border border-white/10 bg-black/50 py-2 pr-4 pl-9 text-sm text-white transition-colors focus:outline-none"
          />
        </div>

        <div className="flex gap-2">
          {selectedIds.size > 0 && (
            <AdminButton
              variant="danger"
              onClick={() => setIsDeleteModalOpen(true)}
              className="py-2"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete ({selectedIds.size})
            </AdminButton>
          )}
          <select
            onChange={(e) => handleSort(e.target.value)}
            defaultValue={currentSort}
            className="rounded-xl border border-white/10 bg-black/50 px-4 py-2 text-sm text-white focus:outline-none"
          >
            <option value="publishedDate">Sort: Publish Date</option>
            <option value="title">Sort: Title</option>
            <option value="category">Sort: Category</option>
          </select>
        </div>
      </div>

      {/* Table Area */}
      <div className="glass-panel overflow-hidden rounded-3xl border border-white/5">
        <table className="w-full text-left text-sm text-white">
          <thead className="text-muted-foreground border-b border-white/5 bg-white/5 font-medium">
            <tr>
              <th className="w-8 shrink-0 px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedIds.size > 0 && selectedIds.size === initialBlogs.length}
                  onChange={toggleSelectAll}
                  className="accent-accent-blue h-4 w-4 rounded border-white/20 bg-white/5"
                />
              </th>
              <th className="min-w-[200px] px-6 py-4">Article</th>
              <th className="hidden px-6 py-4 sm:table-cell">Status</th>
              <th className="hidden px-6 py-4 md:table-cell">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {initialBlogs.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-muted-foreground px-6 py-8 text-center">
                  No blogs found.
                </td>
              </tr>
            ) : (
              initialBlogs.map((blog: any) => (
                <tr key={blog.id} className="transition-colors hover:bg-white/5">
                  <td className="w-8 shrink-0 px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(blog.id)}
                      onChange={() => toggleSelect(blog.id)}
                      className="accent-accent-blue h-4 w-4 rounded border-white/20 bg-white/5"
                    />
                  </td>
                  <td className="flex items-center gap-4 px-6 py-4">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white/10">
                      <Image src={blog.coverImage} alt="" fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-bold">{blog.title}</div>
                      <div className="text-muted-foreground text-xs">{blog.slug}</div>
                    </div>
                  </td>
                  <td className="hidden px-6 py-4 sm:table-cell">
                    {blog.draft ? (
                      <span className="inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[10px] font-medium tracking-wider text-amber-500 uppercase">
                        <Clock className="mr-1 h-3 w-3" /> Draft
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium tracking-wider text-emerald-400 uppercase">
                        <BookOpen className="mr-1 h-3 w-3" /> Published
                      </span>
                    )}
                  </td>
                  <td className="text-muted-foreground hidden px-6 py-4 md:table-cell">
                    {blog.publishedDate}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/blog/${blog.id}`}
                      className="text-accent-blue inline-flex items-center transition-colors hover:text-white"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AdminModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleBulkDelete}
        title="Delete Articles"
        description={`Are you sure you want to permanently delete ${selectedIds.size} articles?`}
        confirmText="Delete"
        isDestructive
        isLoading={isDeleting}
      />
    </div>
  );
}
