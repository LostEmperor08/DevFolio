import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { prisma } from "@/lib/prisma";
import { OperationsClient } from "@/components/admin/operations/OperationsClient";

export default async function OperationsAdminPage() {
  const settings = await prisma.siteSettings.findFirst();

  return (
    <div className="max-w-6xl space-y-6">
      <AdminPageHeader
        title="Operations"
        description="Manage site caching, database backups, and maintenance mode."
      />

      <OperationsClient initialMaintenanceMode={settings?.maintenanceMode || false} />
    </div>
  );
}
