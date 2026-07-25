"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  Search,
  FolderGit2,
  FileText,
  User,
  Settings,
  Image as ImageIcon,
  Mail,
  TerminalSquare,
  Activity,
} from "lucide-react";
import { clsx } from "clsx";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[10vh] backdrop-blur-md">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f] shadow-2xl">
        <Command className="w-full" shouldFilter={true} loop>
          <div className="flex h-14 items-center border-b border-white/5 px-4">
            <Search className="text-muted-foreground mr-3 h-5 w-5 shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Type a command or search..."
              className="placeholder:text-muted-foreground h-full flex-1 border-none bg-transparent text-base text-white outline-none"
            />
            <span className="text-muted-foreground ml-2 shrink-0 rounded-md border border-white/10 px-2 py-0.5 text-xs">
              ESC to close
            </span>
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="text-muted-foreground p-6 text-center text-sm">
              No results found.
            </Command.Empty>

            <Command.Group
              heading="Create New"
              className="text-muted-foreground px-2 py-2 text-xs font-medium"
            >
              <Command.Item
                onSelect={() => handleSelect("/admin/projects/new")}
                className="aria-selected:bg-accent-blue/10 mt-1 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 transition-colors aria-selected:text-white"
              >
                <FolderGit2 className="text-accent-blue h-4 w-4" /> <span>New Project</span>
              </Command.Item>
              <Command.Item
                onSelect={() => handleSelect("/admin/blog/new")}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 transition-colors aria-selected:bg-amber-500/10 aria-selected:text-white"
              >
                <FileText className="h-4 w-4 text-amber-500" /> <span>Write Article</span>
              </Command.Item>
            </Command.Group>

            <Command.Group
              heading="Navigation"
              className="text-muted-foreground mt-2 border-t border-white/5 px-2 py-2 text-xs font-medium"
            >
              <Command.Item
                onSelect={() => handleSelect("/admin/inbox")}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors aria-selected:bg-white/10 aria-selected:text-white"
              >
                <Mail className="h-4 w-4" /> <span>Inbox</span>
              </Command.Item>
              <Command.Item
                onSelect={() => handleSelect("/admin/profile")}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors aria-selected:bg-white/10 aria-selected:text-white"
              >
                <User className="h-4 w-4" /> <span>Profile</span>
              </Command.Item>
              <Command.Item
                onSelect={() => handleSelect("/admin/projects")}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors aria-selected:bg-white/10 aria-selected:text-white"
              >
                <FolderGit2 className="h-4 w-4" /> <span>Projects</span>
              </Command.Item>
              <Command.Item
                onSelect={() => handleSelect("/admin/blog")}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors aria-selected:bg-white/10 aria-selected:text-white"
              >
                <FileText className="h-4 w-4" /> <span>Blog</span>
              </Command.Item>
              <Command.Item
                onSelect={() => handleSelect("/admin/media")}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors aria-selected:bg-white/10 aria-selected:text-white"
              >
                <ImageIcon className="h-4 w-4" /> <span>Media Library</span>
              </Command.Item>
              <Command.Item
                onSelect={() => handleSelect("/admin/operations")}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors aria-selected:bg-white/10 aria-selected:text-white"
              >
                <TerminalSquare className="h-4 w-4" /> <span>Operations</span>
              </Command.Item>
              <Command.Item
                onSelect={() => handleSelect("/admin/health")}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors aria-selected:bg-white/10 aria-selected:text-white"
              >
                <Activity className="h-4 w-4" /> <span>System Health</span>
              </Command.Item>
              <Command.Item
                onSelect={() => handleSelect("/admin/settings")}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors aria-selected:bg-white/10 aria-selected:text-white"
              >
                <Settings className="h-4 w-4" /> <span>Settings</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>

        {/* Global overlay click to close isn't perfectly supported by raw CMDK out of the box so we hook ESC instead */}
        <div className="absolute inset-0 -z-10" onClick={() => setOpen(false)} />
      </div>
    </div>
  );
}
