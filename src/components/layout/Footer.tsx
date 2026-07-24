"use client";

import { profile } from "@/config/profile";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/50 backdrop-blur-xl relative z-10">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
          
          <div className="md:col-span-2 pr-8">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-lg mb-8 tracking-tighter">
              OS
            </div>
            <p className="text-muted-foreground text-base max-w-sm mb-8 leading-relaxed">
              Designed and engineered by {profile.personal.name}. {profile.personal.tagline}
            </p>
            <p className="text-xs text-muted-foreground/40 font-mono">
              © {new Date().getFullYear()} {profile.personal.name}. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-8 tracking-wide">Navigation</h4>
            <ul className="space-y-4 text-sm text-muted-foreground font-medium">
              <li><Link href="/#about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-8 tracking-wide">Connect</h4>
            <ul className="space-y-4 text-sm text-muted-foreground font-medium">
              {Object.values(profile.social).map((social) => (
                <li key={social.label}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors group">
                    {social.label} <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${profile.personal.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors group">
                  Email <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="w-full mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-muted-foreground/30">
            SYSTEM VERSION: 3.0.0
          </div>
          <div className="text-xs font-mono text-muted-foreground/30">
            BUILT WITH NEXT.JS + TYPESCRIPT + TAILWIND CSS
          </div>
        </div>
      </div>
    </footer>
  );
}
