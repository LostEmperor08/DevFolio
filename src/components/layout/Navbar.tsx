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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
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
        transition={{ duration: designTokens.animation.duration.normal, ease: designTokens.animation.ease.outExpo }}
        className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center p-4 transition-all duration-300 pointer-events-none"
      >
        <nav
          className={cn(
            "flex items-center justify-between w-full max-w-[1200px] rounded-full px-4 py-2.5 transition-all duration-500 pointer-events-auto",
            isScrolled
              ? "glass-panel shadow-2xl scale-[0.98] border border-white/10 backdrop-blur-xl"
              : "bg-transparent border border-transparent scale-100"
          )}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <MagneticButton variant="ghost" className="p-0 h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
                <span className="font-bold text-sm tracking-tighter">OS</span>
              </MagneticButton>
            </Link>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors inline-block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link 
                href="/contact" 
                className="px-4 py-2 rounded-full text-sm font-medium text-accent-purple hover:text-white hover:bg-white/10 transition-colors inline-flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5" /> Support
              </Link>
            </li>
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 transition-colors"
              title="Search (⌘K)"
            >
              <Search className="w-4 h-4" />
            </button>
            <button 
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 transition-colors"
              title="Toggle Theme"
            >
              <Moon className="w-4 h-4" />
            </button>
            <a href={profile.personal.resumeUrl} target="_blank" rel="noopener noreferrer" className="hidden sm:block">
              <MagneticButton className="px-5 py-2 rounded-full text-sm flex items-center gap-2 bg-foreground text-background hover:bg-zinc-200">
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </MagneticButton>
            </a>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="fixed inset-0 z-[50] flex flex-col justify-center items-center bg-black/80 backdrop-blur-2xl p-6"
          >
            <nav className="flex flex-col items-center gap-8 w-full max-w-sm">
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
                    className="text-4xl font-bold tracking-tighter text-white hover:text-accent-blue transition-colors"
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
                  className="text-4xl font-bold tracking-tighter text-accent-purple hover:text-accent-purple/80 transition-colors flex items-center gap-3"
                >
                  <Heart className="w-8 h-8" /> Support
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (NAV_LINKS.length + 1) * 0.1 + 0.1 }}
                className="mt-8 flex items-center gap-4 w-full"
              >
                 <a href={profile.personal.resumeUrl} target="_blank" rel="noopener noreferrer" className="flex-1 w-full">
                    <button className="w-full py-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200">
                      <FileText className="w-4 h-4" /> Resume
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
