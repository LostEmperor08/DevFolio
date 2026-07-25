"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  BarChart,
  Settings,
  LogOut,
  Mail,
  Activity,
  TerminalSquare,
} from "lucide-react";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import { CommandPalette } from "@/components/admin/ui/CommandPalette";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/inbox", label: "Inbox", icon: Mail },
  { href: "/admin/profile", label: "Profile", icon: User },
  { href: "/admin/projects", label: "Projects", icon: FolderGit2 },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/skills", label: "Skills & Exp", icon: BarChart },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/operations", label: "Operations", icon: TerminalSquare },
  { href: "/admin/health", label: "System Health", icon: Activity },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-black">
      {mounted && <CommandPalette />}
      <Toaster theme="dark" position="bottom-right" className="font-mono text-sm" />
      {/* Sidebar */}
      <aside className="sticky top-0 flex hidden h-screen w-64 flex-col border-r border-white/5 bg-black/50 backdrop-blur-xl md:flex">
        <div className="flex items-center gap-3 border-b border-white/5 p-6">
          <div className="bg-accent-blue/20 border-accent-blue/50 flex h-8 w-8 items-center justify-center rounded-lg border">
            <span className="text-accent-blue text-sm font-bold">S</span>
          </div>
          <span className="font-mono font-medium tracking-tight text-white">Samarth OS</span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <span
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${isActive ? "bg-white/10 text-white" : "text-muted-foreground hover:bg-white/5 hover:text-white"}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/5 p-4">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 transition-all hover:bg-red-400/10"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/5 bg-black/50 px-6 backdrop-blur-xl">
          <div className="text-muted-foreground flex items-center gap-2 font-mono text-sm">
            {pathname}
            <span className="hidden rounded-md bg-white/5 px-2 py-0.5 text-[10px] tracking-widest uppercase lg:block">
              ⌘K
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
            >
              View Site
            </Link>
          </div>
        </header>

        <div className="relative flex-1 overflow-y-auto p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
