import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { SocialForm } from "@/components/admin/forms/SocialForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditSocialPage({ params }: { params: { id: string } }) {
  const link = await prisma.socialLink.findUnique({ where: { id: params.id } });

  if (!link) notFound();

  return (
    <div className="max-w-3xl">
      <AdminPageHeader title="Edit Social Link" backHref="/admin/social" />
      <div className="glass-panel rounded-3xl border border-white/5 p-6">
        <SocialForm initialData={link} />
      </div>
    </div>
  );
}
