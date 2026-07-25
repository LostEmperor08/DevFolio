import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { SocialForm } from "@/components/admin/forms/SocialForm";

export default function NewSocialPage() {
  return (
    <div className="max-w-3xl">
      <AdminPageHeader title="Add Social Link" backHref="/admin/social" />
      <div className="glass-panel rounded-3xl border border-white/5 p-6">
        <SocialForm />
      </div>
    </div>
  );
}
