import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { prisma } from "@/lib/prisma";
import { list } from "@vercel/blob";
import { CheckCircle2, XCircle, Activity } from "lucide-react";

async function checkDatabase() {
  const start = performance.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    const latency = (performance.now() - start).toFixed(0);
    return { status: "healthy", latency: `${latency}ms` };
  } catch (e: any) {
    return { status: "error", error: e.message };
  }
}

async function checkBlob() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return { status: "missing_token" };
  try {
    const start = performance.now();
    await list({ limit: 1 });
    const latency = (performance.now() - start).toFixed(0);
    return { status: "healthy", latency: `${latency}ms` };
  } catch (e: any) {
    return { status: "error", error: e.message };
  }
}

export default async function HealthAdminPage() {
  const dbHealth = await checkDatabase();
  const blobHealth = await checkBlob();

  const envVars = [
    { name: "DATABASE_URL", present: !!process.env.DATABASE_URL },
    { name: "AUTH_SECRET", present: !!process.env.AUTH_SECRET },
    { name: "BLOB_READ_WRITE_TOKEN", present: !!process.env.BLOB_READ_WRITE_TOKEN },
    { name: "NODE_ENV", present: !!process.env.NODE_ENV, value: process.env.NODE_ENV },
  ];

  return (
    <div className="max-w-4xl space-y-6">
      <AdminPageHeader
        title="System Health"
        description="Monitor database connections, storage providers, and environment configuration."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Services Status */}
        <div className="glass-panel space-y-6 rounded-3xl border border-white/5 p-6">
          <h3 className="flex items-center gap-2 font-bold text-white">
            <Activity className="text-accent-blue h-5 w-5" /> Services
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
              <div>
                <div className="font-medium text-white">PostgreSQL Database</div>
                <div className="text-muted-foreground mt-1 text-xs">
                  {dbHealth.status === "healthy"
                    ? `Latency: ${dbHealth.latency}`
                    : "Connection failed"}
                </div>
              </div>
              <div>
                {dbHealth.status === "healthy" ? (
                  <div className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" /> Healthy
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm font-medium text-red-400">
                    <XCircle className="h-4 w-4" /> Error
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
              <div>
                <div className="font-medium text-white">Vercel Blob Storage</div>
                <div className="text-muted-foreground mt-1 text-xs">
                  {blobHealth.status === "healthy"
                    ? `Latency: ${blobHealth.latency}`
                    : blobHealth.status === "missing_token"
                      ? "Missing BLOB_READ_WRITE_TOKEN"
                      : "Connection failed"}
                </div>
              </div>
              <div>
                {blobHealth.status === "healthy" ? (
                  <div className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" /> Healthy
                  </div>
                ) : blobHealth.status === "missing_token" ? (
                  <div className="flex items-center gap-2 text-sm font-medium text-amber-500">
                    <XCircle className="h-4 w-4" /> Setup Required
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm font-medium text-red-400">
                    <XCircle className="h-4 w-4" /> Error
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Environment Variables */}
        <div className="glass-panel space-y-6 rounded-3xl border border-white/5 p-6">
          <h3 className="font-bold text-white">Environment Configuration</h3>

          <div className="space-y-2">
            {envVars.map((env) => (
              <div
                key={env.name}
                className="flex items-center justify-between border-b border-white/5 p-3 last:border-0"
              >
                <code className="text-muted-foreground text-xs">{env.name}</code>
                <div className="flex items-center gap-2">
                  {env.value && <span className="px-2 text-xs text-white/50">{env.value}</span>}
                  {env.present ? (
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
