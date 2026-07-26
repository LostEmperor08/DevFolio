"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Search, Moon, FileText, Heart, Menu, X } from "lucide-react";
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
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCommandPaletteOpen } = useAppStore();

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
            "pointer-events-auto flex w-full max-w-[1200px] items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500",
            isScrolled
              ? "glass-panel scale-[0.98] border border-white/10 shadow-2xl backdrop-blur-xl"
              : "scale-100 border border-transparent bg-transparent"
          )}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white/20 shadow-md transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={profile.personal.avatar || "/images/avatar.jpg"}
                  alt="Avatar Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="group-hover:text-accent-blue text-base font-bold tracking-tight text-white transition-colors">
                Developer OS
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <ul className="hidden items-center gap-1 rounded-full border border-white/5 bg-white/5 p-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground inline-block rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="text-accent-purple inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white"
              >
                <Heart className="h-3.5 w-3.5" /> Support
              </Link>
            </li>
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="text-muted-foreground hover:text-foreground hidden h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10 sm:flex"
              title="Search (⌘K)"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              className="text-muted-foreground hover:text-foreground hidden h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10 sm:flex"
              title="Toggle Theme"
            >
              <Moon className="h-4 w-4" />
            </button>
            <a
              href={profile.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block"
            >
              <MagneticButton className="bg-foreground text-background flex items-center gap-2 rounded-full px-5 py-2 text-sm hover:bg-zinc-200">
                <FileText className="h-4 w-4" />
                <span>Resume</span>
              </MagneticButton>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-muted-foreground hover:text-foreground flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10 md:hidden"
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
