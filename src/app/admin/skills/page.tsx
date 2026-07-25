import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { SkillForm } from "@/components/admin/forms/SkillForm";
import { ExperienceForm } from "@/components/admin/forms/ExperienceForm";
import { prisma } from "@/lib/prisma";

export default async function SkillsAdminPage() {
  const skills = await prisma.skill.findMany();
  const experience = await prisma.experience.findMany();

  return (
    <div className="max-w-6xl space-y-12">
      <AdminPageHeader
        title="Resume & Skills"
        description="Manage your professional experience and technical competencies."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Experience Section */}
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl border border-white/5 p-6">
            <h3 className="mb-6 text-xl font-bold text-white">Add Experience</h3>
            <ExperienceForm />
          </div>

          <div className="space-y-4">
            <h4 className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
              Current Experience
            </h4>
            {experience.map((exp) => (
              <div key={exp.id} className="rounded-2xl border border-white/5 bg-white/5 p-4">
                <div className="font-bold text-white">{exp.title}</div>
                <div className="text-accent-blue text-sm">
                  {exp.organization} • {exp.duration}
                </div>
              </div>
            ))}
            {experience.length === 0 && (
              <div className="text-muted-foreground text-sm">No experience added yet.</div>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl border border-white/5 p-6">
            <h3 className="mb-6 text-xl font-bold text-white">Add Skill Category</h3>
            <SkillForm />
          </div>

          <div className="space-y-4">
            <h4 className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
              Current Skills
            </h4>
            {skills.map((skill) => (
              <div key={skill.id} className="rounded-2xl border border-white/5 bg-white/5 p-4">
                <div className="font-bold text-white">{skill.title}</div>
                <div className="text-muted-foreground text-sm">{skill.category}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skill.skills.map((s) => (
                    <span key={s} className="rounded-md bg-white/10 px-2 py-0.5 text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {skills.length === 0 && (
              <div className="text-muted-foreground text-sm">No skills added yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
