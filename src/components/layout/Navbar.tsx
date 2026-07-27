"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Search, Moon, FileText, Heart, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { designTokens } from "@/lib/design";
import { MagneticButton } from "../ui/MagneticButton";

import { profile } from "@/config/profile";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const pathname = usePathname() || "/";
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCommandPaletteOpen } = useAppStore();

  let brandTitle = "Samarth's DevFolio";
  if (pathname.startsWith("/blog")) {
    brandTitle = "Samarth's Blog";
  } else if (pathname.startsWith("/projects")) {
    brandTitle = "Samarth's Projects";
  } else if (pathname.startsWith("/contact")) {
    brandTitle = "Contact Samarth";
  }

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide navbar when scrolling down, show when scrolling up
    if (latest > previous && latest > 150 && !mobileMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{
          duration: designTokens.animation.duration.normal,
          ease: designTokens.animation.ease.outExpo,
        }}
        className="pointer-events-none fixed top-0 right-0 left-0 z-[60] flex items-center justify-center p-4 transition-all duration-300"
      >
        <nav
          className={cn(
            "pointer-events-auto flex w-full max-w-[1250px] items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500",
            isScrolled
              ? "glass-panel scale-[0.98] border border-white/20 bg-black/90 shadow-2xl backdrop-blur-md md:bg-black/80 md:backdrop-blur-2xl"
              : "scale-100 border border-white/10 bg-black/80 shadow-lg backdrop-blur-md md:bg-black/60 md:backdrop-blur-xl"
          )}
        >
          {/* Logo & Brand */}
          <div className="flex shrink-0 items-center gap-3">
            <Link href="/" className="group flex items-center gap-3">
              <div className="border-accent-blue/40 relative h-10 w-10 overflow-hidden rounded-full border-2 shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={profile.personal.avatar || "/images/avatar.jpg"}
                  alt="Avatar Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="group-hover:text-accent-blue text-base font-bold tracking-tight text-white transition-colors sm:text-lg">
                {brandTitle}
              </span>
            </Link>
          </div>

          {/* Desktop Nav Menus (Always Visible on sm and above) */}
          <ul className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-1 shadow-inner backdrop-blur-md sm:flex">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={cn(
                      "inline-block rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300",
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                        : "text-muted-foreground hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href={profile.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground inline-block rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white"
              >
                Resume
              </a>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-accent-purple inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white"
              >
                <Heart className="h-3.5 w-3.5" /> Support
              </Link>
            </li>
          </ul>

          {/* Right Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="text-muted-foreground hover:text-foreground hidden h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 transition-colors hover:bg-white/10 md:flex"
              title="Search (⌘K)"
            >
              <Search className="h-4 w-4" />
            </button>
            <a
              href={profile.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:block"
            >
              <MagneticButton className="flex items-center gap-2 rounded-full bg-gradient-to-r from-white to-zinc-200 px-5 py-2 text-sm font-semibold text-black shadow-md hover:from-zinc-100 hover:to-zinc-300">
                <FileText className="h-4 w-4" />
                <span>Resume PDF</span>
              </MagneticButton>
            </a>

            {/* Mobile Menu Toggle (Visible on screens smaller than sm) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:hidden"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Full Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[50] flex flex-col items-center justify-center bg-black/80 p-6 backdrop-blur-2xl"
          >
            <nav className="flex w-full max-w-sm flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-accent-blue text-4xl font-bold tracking-tighter text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.1 + 0.1 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-accent-purple hover:text-accent-purple/80 flex items-center gap-3 text-4xl font-bold tracking-tighter transition-colors"
                >
                  <Heart className="h-8 w-8" /> Support
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (NAV_LINKS.length + 1) * 0.1 + 0.1 }}
                className="mt-8 flex w-full items-center gap-4"
              >
                <a
                  href={profile.personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex-1"
                >
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-4 text-sm font-medium text-black hover:bg-zinc-200">
                    <FileText className="h-4 w-4" /> Resume
                  </button>
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
