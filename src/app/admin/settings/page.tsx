import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { SettingsForm } from "@/components/admin/forms/SettingsForm";
import { prisma } from "@/lib/prisma";

export default async function SettingsAdminPage() {
  const settings = await prisma.siteSettings.findFirst();

  return (
    <div className="max-w-3xl">
      <AdminPageHeader
        title="SEO Settings"
        description="Manage your global SEO metadata and site URL."
      />

      <div className="glass-panel rounded-3xl border border-white/5 p-6">
        <SettingsForm initialData={settings} />
      </div>
    </div>
  );
}
