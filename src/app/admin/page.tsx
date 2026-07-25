import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  FolderGit2,
  FileText,
  Mail,
  Activity,
  Eye,
  ArrowRight,
  ShieldCheck,
  Download,
  AlertTriangle,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const [projectsCount, blogsCount, unreadMessages, recentAuditLogs, settings, visitorsCount] =
    await Promise.all([
      prisma.project.count(),
      prisma.blogPost.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.siteSettings.findFirst(),
      prisma.visitorLog.count(),
    ]);

  return (
    <div className="max-w-6xl space-y-8">
      <AdminPageHeader
        title="Command Center"
        description="Overview of your portfolio's operations and content."
      />

      {/* Global Alerts */}
      {settings?.maintenanceMode && (
        <div className="flex items-center gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-6 py-4 text-amber-500">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <div>
            <p className="text-sm font-bold">Maintenance Mode Active</p>
            <p className="text-xs opacity-80">The public site is currently hidden from visitors.</p>
          </div>
        </div>
      )}

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="glass-panel group relative overflow-hidden rounded-3xl border border-white/5 p-6">
          <div className="absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
            <FolderGit2 className="h-16 w-16" />
          </div>
          <p className="text-muted-foreground relative z-10 mb-2 text-sm font-medium">
            Total Projects
          </p>
          <h3 className="relative z-10 text-4xl font-bold text-white">{projectsCount}</h3>
          <Link href="/admin/projects" className="absolute inset-0 z-20" />
        </div>

        <div className="glass-panel group relative overflow-hidden rounded-3xl border border-white/5 p-6">
          <div className="absolute top-0 right-0 p-4 text-amber-500 opacity-10 transition-opacity group-hover:opacity-20">
            <FileText className="h-16 w-16" />
          </div>
          <p className="text-muted-foreground relative z-10 mb-2 text-sm font-medium">
            Published Blogs
          </p>
          <h3 className="relative z-10 text-4xl font-bold text-white">{blogsCount}</h3>
          <Link href="/admin/blog" className="absolute inset-0 z-20" />
        </div>

        <div
          className={`group relative overflow-hidden rounded-3xl border p-6 transition-colors ${unreadMessages > 0 ? "bg-accent-blue/10 border-accent-blue/20" : "glass-panel border-white/5"}`}
        >
          <div className="text-accent-blue absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
            <Mail className="h-16 w-16" />
          </div>
          <p
            className={`relative z-10 mb-2 text-sm font-medium ${unreadMessages > 0 ? "text-accent-blue/80" : "text-muted-foreground"}`}
          >
            Unread Messages
          </p>
          <h3
            className={`relative z-10 text-4xl font-bold ${unreadMessages > 0 ? "text-accent-blue" : "text-white"}`}
          >
            {unreadMessages}
          </h3>
          <Link href="/admin/inbox" className="absolute inset-0 z-20" />
        </div>

        <div className="glass-panel group relative overflow-hidden rounded-3xl border border-white/5 p-6">
          <div className="absolute top-0 right-0 p-4 text-emerald-400 opacity-10 transition-opacity group-hover:opacity-20">
            <Activity className="h-16 w-16" />
          </div>
          <p className="text-muted-foreground relative z-10 mb-2 text-sm font-medium">
            Total Pageviews
          </p>
          <h3 className="relative z-10 text-4xl font-bold text-white">{visitorsCount}</h3>
          <p className="text-muted-foreground relative z-10 mt-2 text-xs">
            {settings?.enableAnalytics ? "Native Analytics Active" : "Native Analytics Inactive"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Quick Actions & Operations */}
        <div className="space-y-6 lg:col-span-1">
          <div className="glass-panel rounded-3xl border border-white/5 p-6">
            <h3 className="mb-4 font-bold text-white">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/admin/projects/new"
                className="group flex items-center justify-between rounded-xl bg-white/5 p-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <span className="flex items-center gap-2">
                  <FolderGit2 className="text-accent-blue h-4 w-4" /> Create Project
                </span>
                <ArrowRight className="text-muted-foreground h-4 w-4 transition-colors group-hover:text-white" />
              </Link>
              <Link
                href="/admin/blog/new"
                className="group flex items-center justify-between rounded-xl bg-white/5 p-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-amber-500" /> Write Article
                </span>
                <ArrowRight className="text-muted-foreground h-4 w-4 transition-colors group-hover:text-white" />
              </Link>
              <Link
                href="/admin/health"
                className="group flex items-center justify-between rounded-xl bg-white/5 p-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" /> System Health
                </span>
                <ArrowRight className="text-muted-foreground h-4 w-4 transition-colors group-hover:text-white" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Audit Log */}
        <div className="lg:col-span-2">
          <div className="glass-panel h-full rounded-3xl border border-white/5 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-bold text-white">Recent Activity</h3>
              <span className="text-muted-foreground font-mono text-xs">System Audit Log</span>
            </div>

            <div className="space-y-4">
              {recentAuditLogs.length === 0 ? (
                <div className="text-muted-foreground py-8 text-center text-sm">
                  No recent activity.
                </div>
              ) : (
                recentAuditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 p-3 text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                          log.action === "CREATE"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : log.action === "UPDATE"
                              ? "bg-accent-blue/10 text-accent-blue"
                              : log.action === "DELETE"
                                ? "bg-red-500/10 text-red-400"
                                : log.action === "LOGIN"
                                  ? "bg-purple-500/10 text-purple-400"
                                  : "bg-white/10 text-white"
                        }`}
                      >
                        {log.action}
                      </span>
                      <span className="font-medium text-white">{log.entity}</span>
                      <span className="text-muted-foreground hidden md:inline">
                        {log.entityId || ""}
                      </span>
                    </div>
                    <div className="text-muted-foreground text-right font-mono text-xs">
                      {new Date(log.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
