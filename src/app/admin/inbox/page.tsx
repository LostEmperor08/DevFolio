import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { prisma } from "@/lib/prisma";
import { InboxList } from "@/components/admin/inbox/InboxList";

export default async function InboxAdminPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl space-y-6">
      <AdminPageHeader title="Inbox" description="Read and manage contact form submissions." />

      <InboxList initialMessages={messages} />
    </div>
  );
}
