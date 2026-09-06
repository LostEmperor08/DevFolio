"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname() || "/";

  // When on secret admin routes, show minimal top bar with back to site
  if (pathname.startsWith("/admin")) {
    return (
      <header className="pt-8 md:pt-12 pb-10 px-4 md:px-0 flex justify-between items-center border-b border-zinc-900 mb-8">
        <Link href="/" aria-label="Home" className="group flex items-center gap-2.5">
          <div className="relative h-7 w-7 rounded-full overflow-hidden border border-zinc-800 group-hover:border-red-500/70 transition-colors shadow-[0_0_10px_rgba(239,68,68,0.15)] bg-zinc-950 flex-shrink-0">
            <Image
              src="/images/profile-logo.jpg"
              alt="Samarth Patil"
              width={28}
              height={28}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>
          <span className="text-sm sm:text-base font-semibold tracking-tight text-white group-hover:text-red-400 transition-colors">
            Samarth Patil
          </span>
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            href="/"
            className="text-zinc-500 hover:text-zinc-300 text-sm tracking-tighter font-mono font-semibold transition-colors"
          >
            ← View Site
          </Link>
          <span className="text-red-500 text-xs font-mono">admin</span>
        </div>
      </header>
    );
  }

  return (
    <header className="pt-8 md:pt-16 pb-16 px-4 md:px-0 flex justify-between items-center">
      <Link href="/" aria-label="Home" className="group flex items-center gap-2.5">
        <div className="relative h-8 w-8 rounded-full overflow-hidden border border-zinc-800 group-hover:border-red-500/70 transition-colors shadow-[0_0_10px_rgba(239,68,68,0.15)] bg-zinc-950 flex-shrink-0">
          <Image
            src="/images/profile-logo.jpg"
            alt="Samarth Patil"
            width={32}
            height={32}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <span className="text-sm sm:text-base font-semibold tracking-tight text-white group-hover:text-red-400 transition-colors">
          Samarth Patil
        </span>
      </Link>
      <nav className="flex gap-4 sm:gap-6">
        <Link
          href="/"
          className={`text-sm tracking-tighter font-mono font-semibold transition-colors ${
            pathname === "/"
              ? "text-red-400 font-bold"
              : "text-zinc-400 hover:text-red-400"
          }`}
        >
          Home
        </Link>
        <Link
          href="/posts"
          className={`text-sm tracking-tighter font-mono font-semibold transition-colors ${
            pathname.startsWith("/posts")
              ? "text-red-400 font-bold"
              : "text-zinc-400 hover:text-red-400"
          }`}
        >
          Writing
        </Link>
        <Link
          href="/contact"
          className={`text-sm tracking-tighter font-mono font-semibold transition-colors ${
            pathname === "/contact"
              ? "text-red-400 font-bold"
              : "text-zinc-400 hover:text-red-400"
          }`}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
