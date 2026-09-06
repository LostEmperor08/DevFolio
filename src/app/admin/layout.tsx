"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { logoutAdmin } from "@/app/actions/admin.actions";
import { LogOut, ExternalLink } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return (
      <div className="text-white pb-16">
        <Toaster theme="dark" position="bottom-right" richColors />
        {children}
      </div>
    );
  }

  return (
    <div className="text-white selection:bg-red-950 selection:text-red-200 pb-16">
      <Toaster theme="dark" position="bottom-right" richColors />
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-900">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-zinc-500">admin /</span>
          <span className="font-mono text-xs text-red-500">cms</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <span>View Site</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </Link>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-red-400 transition-colors bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-2.5 py-1 rounded"
            >
              <LogOut className="h-3 w-3" />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </div>
      {children}
    </div>
  );
}
