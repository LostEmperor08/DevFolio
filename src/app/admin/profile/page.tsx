import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { ProfileForm } from "@/components/admin/forms/ProfileForm";
import { prisma } from "@/lib/prisma";

export default async function ProfileAdminPage() {
  const profile = await prisma.profile.findFirst();

  return (
    <div className="max-w-4xl">
      <AdminPageHeader
        title="Profile Details"
        description="Manage your core identity, location, and availability across the portfolio."
      />

      <div className="glass-panel rounded-3xl border border-white/5 p-6">
        <ProfileForm initialData={profile} />
      </div>
    </div>
  );
}
