import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { ProjectForm } from "@/components/admin/forms/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="max-w-4xl">
      <AdminPageHeader title="New Project" backHref="/admin/projects" />
      <div className="glass-panel rounded-3xl border border-white/5 p-6 md:p-8">
        <ProjectForm />
      </div>
    </div>
  );
}
