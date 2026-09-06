"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname() || "/";

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="px-4 md:px-0 border-t border-zinc-800/80 py-8 text-zinc-500 font-mono text-xs tracking-tight flex justify-between items-center mt-12">
      <p>© 2025 / Samarth Patil</p>
      <p>
        <a
          href="https://github.com/LostEmperor08"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-400 transition-colors"
        >
          View Source
        </a>
      </p>
    </footer>
  );
}
