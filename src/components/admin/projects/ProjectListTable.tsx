"use client";

import { useState, useOptimistic, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Edit2, Search, ArrowUpDown, GripVertical, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reorder } from "framer-motion";
import { toast } from "sonner";
import { deleteProject } from "@/app/actions/project.actions"; // Need bulk action really, but we'll loop for now
import { AdminButton } from "../ui/AdminButton";
import { AdminModal } from "../ui/AdminModal";

export function ProjectListTable({
  initialProjects,
  total,
  currentPage,
  currentQuery,
  currentSort,
}: any) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [projects, setProjects] = useState(initialProjects);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Optimistic UI for ordering
  const [optimisticProjects, addOptimisticProjects] = useOptimistic(
    projects,
    (state, newOrder: any[]) => newOrder
  );

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    if (name !== "page") params.set("page", "1"); // reset page on new search/sort
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
    if (selectedIds.size === optimisticProjects.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(optimisticProjects.map((p: any) => p.id)));
  };

  const handleReorder = async (newOrder: any[]) => {
    if (currentSort !== "manual")
      return toast.error("Must be in Manual sort mode to drag-and-drop.");

    startTransition(() => {
      addOptimisticProjects(newOrder);
    });

    // In reality, call a Server Action `reorderProjects(newOrder.map(p => p.id))`
    toast.success("Order updated");
  };

  const handleBulkDelete = async () => {
    try {
      // For speed, just looping. In prod, build a `deleteProjects(ids)` action.
      for (const id of Array.from(selectedIds)) {
        await deleteProject(id);
      }
      toast.success(`Deleted ${selectedIds.size} projects`);
      setSelectedIds(new Set());
      setIsDeleteModalOpen(false);
      router.refresh();
    } catch (e) {
      toast.error("Failed to delete some projects");
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
            placeholder="Search projects..."
            defaultValue={currentQuery}
            onChange={(e) => {
              // Simple debounce without extra library
              setTimeout(() => handleSearch(e), 500);
            }}
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
            <option value="createdAt">Sort: Newest</option>
            <option value="manual">Sort: Manual (Drag)</option>
            <option value="title">Sort: Title</option>
          </select>
        </div>
      </div>

      {/* Table Area */}
      <div className="glass-panel overflow-hidden rounded-3xl border border-white/5">
        <div className="w-full text-left text-sm text-white">
          {/* Header */}
          <div className="text-muted-foreground flex items-center border-b border-white/5 bg-white/5 px-6 py-4 font-medium">
            <div className="w-8 shrink-0">
              <input
                type="checkbox"
                checked={selectedIds.size > 0 && selectedIds.size === optimisticProjects.length}
                onChange={toggleSelectAll}
                className="accent-accent-blue h-4 w-4 rounded border-white/20 bg-white/5"
              />
            </div>
            <div className="w-8 shrink-0"></div>
            <div className="min-w-[200px] flex-1">Project</div>
            <div className="hidden w-32 md:block">Category</div>
            <div className="hidden w-24 sm:block">Status</div>
            <div className="w-24 text-right">Actions</div>
          </div>

          {/* Body (Reorderable) */}
          <Reorder.Group
            axis="y"
            values={optimisticProjects}
            onReorder={handleReorder}
            className="divide-y divide-white/5"
          >
            {optimisticProjects.length === 0 ? (
              <div className="text-muted-foreground px-6 py-8 text-center">No projects found.</div>
            ) : (
              optimisticProjects.map((project: any) => (
                <Reorder.Item
                  key={project.id}
                  value={project}
                  dragListener={currentSort === "manual"}
                  className="flex items-center bg-transparent px-6 py-4 transition-colors hover:bg-white/5"
                >
                  <div className="w-8 shrink-0">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(project.id)}
                      onChange={() => toggleSelect(project.id)}
                      className="accent-accent-blue h-4 w-4 rounded border-white/20 bg-white/5"
                    />
                  </div>
                  <div className="text-muted-foreground w-8 shrink-0 cursor-grab active:cursor-grabbing">
                    {currentSort === "manual" && <GripVertical className="h-4 w-4" />}
                  </div>
                  <div className="flex min-w-[200px] flex-1 items-center gap-4">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white/10">
                      <Image src={project.previewImage} alt="" fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-white">{project.title}</div>
                      <div className="text-muted-foreground text-xs">{project.slug}</div>
                    </div>
                  </div>
                  <div className="hidden w-32 md:block">{project.category}</div>
                  <div className="hidden w-24 sm:block">
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium tracking-wider text-white uppercase">
                      {project.status}
                    </span>
                  </div>
                  <div className="w-24 text-right">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="text-accent-blue inline-flex items-center transition-colors hover:text-white"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Link>
                  </div>
                </Reorder.Item>
              ))
            )}
          </Reorder.Group>
        </div>
      </div>

      <AdminModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleBulkDelete}
        title="Delete Projects"
        description={`Are you sure you want to permanently delete ${selectedIds.size} projects?`}
        confirmText="Delete"
        isDestructive
      />
    </div>
  );
}
