"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { sfx } from "@/lib/audio";
import { SakuraLogo } from "@/components/icons/SakuraLogo";

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname() || "/";

  // When on secret admin routes, show minimal top bar
  if (pathname.startsWith("/admin")) {
    return (
      <header className="pt-8 md:pt-12 pb-10 px-4 md:px-0 flex justify-between items-center border-b border-zinc-900 mb-8">
        <Link
          href="/"
          aria-label="Home"
          className="group flex items-center gap-2.5"
          onClick={() => sfx.playMechanicalSwitch()}
          onMouseEnter={() => sfx.playSynthHum()}
        >
          <div className="relative h-7 w-7 rounded-full border border-zinc-800 group-hover:border-red-500/80 transition-colors shadow-[0_0_12px_rgba(239,68,68,0.25)] bg-zinc-950/90 p-0.5 flex items-center justify-center flex-shrink-0">
            <SakuraLogo className="w-full h-full group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="text-sm sm:text-base font-semibold tracking-tight text-white group-hover:text-red-400 transition-colors">
            Samarth Patil
          </span>
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            href="/"
            onClick={() => sfx.playMechanicalSwitch()}
            onMouseEnter={() => sfx.playSynthHum()}
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
    <header className="sticky top-4 z-50 my-4 flex items-center justify-between px-3 sm:px-5 py-2 rounded-full bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/80 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]">
      <Link
        href="/"
        aria-label="Home"
        className="group flex items-center gap-2.5 pl-1"
        onClick={() => sfx.playMechanicalSwitch()}
        onMouseEnter={() => sfx.playSynthHum()}
      >
        <div className="relative h-7 w-7 rounded-full border border-zinc-800 group-hover:border-red-500/80 transition-colors shadow-[0_0_12px_rgba(239,68,68,0.25)] bg-zinc-950/90 p-0.5 flex items-center justify-center flex-shrink-0">
          <SakuraLogo className="w-full h-full group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="hidden sm:flex flex-col">
          <span className="text-xs sm:text-sm font-semibold tracking-tight text-white group-hover:text-red-400 transition-colors">
            Samarth Patil
          </span>
        </div>
      </Link>

      <nav className="flex items-center gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => sfx.playMechanicalSwitch()}
              onMouseEnter={() => sfx.playSynthHum()}
              className={`relative px-3 py-1.5 text-xs font-mono font-medium rounded-full transition-colors duration-200 ${
                isActive ? "text-red-400 font-semibold" : "text-zinc-400 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav-pill"
                  className="absolute inset-0 rounded-full bg-zinc-900 border border-zinc-700/60 shadow-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
