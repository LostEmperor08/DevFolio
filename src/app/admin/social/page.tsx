import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit2 } from "lucide-react";

export default async function SocialAdminPage() {
  const links = await prisma.socialLink.findMany();

  return (
    <div className="max-w-5xl">
      <AdminPageHeader
        title="Social Links"
        description="Manage your social media presence."
        action={
          <Link href="/admin/social/new">
            <AdminButton>
              <Plus className="mr-2 h-4 w-4" /> Add Link
            </AdminButton>
          </Link>
        }
      />

      <div className="glass-panel overflow-hidden rounded-3xl border border-white/5">
        <table className="w-full text-left text-sm text-white">
          <thead className="text-muted-foreground bg-white/5">
            <tr>
              <th className="px-6 py-4 font-medium">Platform</th>
              <th className="px-6 py-4 font-medium">Label</th>
              <th className="px-6 py-4 font-medium">URL</th>
              <th className="px-6 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {links.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-muted-foreground px-6 py-8 text-center">
                  No links found.
                </td>
              </tr>
            ) : (
              links.map((link) => (
                <tr key={link.id} className="transition-colors hover:bg-white/5">
                  <td className="px-6 py-4">{link.platform}</td>
                  <td className="px-6 py-4">{link.label}</td>
                  <td className="text-muted-foreground max-w-[200px] truncate px-6 py-4">
                    {link.url}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/social/${link.id}`}
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
    </div>
  );
}
