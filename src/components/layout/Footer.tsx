"use client";

import { usePathname } from "next/navigation";
import { sfx } from "@/lib/audio";

export function Footer() {
  const pathname = usePathname() || "/";

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-zinc-800/80 py-8 text-zinc-500 font-mono text-xs tracking-tight flex flex-col sm:flex-row gap-3 justify-between items-center mt-12 mb-6">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500/70" />
        <p>© 2026 / Samarth Patil · LostEmperor08</p>
      </div>
      <p>
        <a
          href="https://github.com/LostEmperor08"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sfx.playClick()}
          onMouseEnter={() => sfx.playHover()}
          className="hover:text-red-400 transition-colors"
        >
          View Source ↗
        </a>
      </p>
    </footer>
  );
}

