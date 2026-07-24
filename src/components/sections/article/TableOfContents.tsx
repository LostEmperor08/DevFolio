"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export function TableOfContents({ toc }: { toc: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!toc || toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [toc]);

  if (!toc || toc.length === 0) return null;

  return (
    <motion.nav 
      variants={motionPresets.fadeUp}
      initial="initial"
      animate="animate"
      className="hidden lg:block space-y-4"
    >
      <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-white/50 mb-6">
        On this page
      </h4>
      <ul className="space-y-3 border-l border-white/10">
        {toc.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li 
              key={item.id} 
              className="relative"
              style={{ paddingLeft: `${(item.level - 2) * 1 + 1}rem` }}
            >
              {/* Active Indicator Line */}
              {isActive && (
                <motion.div 
                  layoutId="active-toc"
                  className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-accent-blue"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <a 
                href={`#${item.id}`}
                className={`block text-sm transition-colors duration-200 ${
                  isActive 
                    ? "text-accent-blue font-medium" 
                    : "text-muted-foreground hover:text-white"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                  // Update URL hash without jumping
                  window.history.pushState(null, "", `#${item.id}`);
                  setActiveId(item.id);
                }}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
