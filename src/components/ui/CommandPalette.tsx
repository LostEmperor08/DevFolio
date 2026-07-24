"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { Command } from "cmdk";
import { Search, Monitor, Moon, Volume2, VolumeX, Code2, User, Terminal } from "lucide-react";
import { designTokens } from "@/lib/design";

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, soundEnabled, toggleSound } = useAppStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandPaletteOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: designTokens.animation.duration.fast, ease: designTokens.animation.ease.outExpo }}
            className="relative z-10 w-full max-w-xl bg-zinc-950/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden glass-panel"
          >
            <Command 
              className="w-full flex flex-col"
              filter={(value, search) => {
                if (value.toLowerCase().includes(search.toLowerCase())) return 1;
                return 0;
              }}
            >
              <div className="flex items-center px-4 border-b border-white/10">
                <Search className="w-5 h-5 text-muted-foreground mr-2" />
                <Command.Input 
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent border-none outline-none py-4 text-foreground placeholder:text-muted-foreground font-mono text-sm"
                />
              </div>

              <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-none">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground font-mono">
                  Command not found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="text-xs font-mono text-muted-foreground/70 px-2 py-2">
                  <Command.Item onSelect={() => { window.location.hash = "#hero"; setCommandPaletteOpen(false); }} className="flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-white/10 rounded-md cursor-pointer transition-colors aria-selected:bg-white/10">
                    <Monitor className="w-4 h-4 text-accent-blue" /> Go to Home
                  </Command.Item>
                  <Command.Item onSelect={() => { window.location.hash = "#about"; setCommandPaletteOpen(false); }} className="flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-white/10 rounded-md cursor-pointer transition-colors aria-selected:bg-white/10">
                    <User className="w-4 h-4 text-accent-blue" /> Go to About
                  </Command.Item>
                  <Command.Item onSelect={() => { window.location.hash = "#projects"; setCommandPaletteOpen(false); }} className="flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-white/10 rounded-md cursor-pointer transition-colors aria-selected:bg-white/10">
                    <Code2 className="w-4 h-4 text-accent-blue" /> Go to Projects
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Preferences" className="text-xs font-mono text-muted-foreground/70 px-2 py-2 mt-2">
                  <Command.Item onSelect={() => { setCommandPaletteOpen(false); }} className="flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-white/10 rounded-md cursor-pointer transition-colors aria-selected:bg-white/10">
                    <Moon className="w-4 h-4 text-accent-purple" /> Toggle Dark Mode
                  </Command.Item>
                  <Command.Item onSelect={() => { toggleSound(); setCommandPaletteOpen(false); }} className="flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-white/10 rounded-md cursor-pointer transition-colors aria-selected:bg-white/10">
                    {soundEnabled ? <VolumeX className="w-4 h-4 text-accent-purple" /> : <Volume2 className="w-4 h-4 text-accent-purple" />} Toggle UI Sounds
                  </Command.Item>
                </Command.Group>
                
                <Command.Group heading="System (Easter Eggs)" className="text-xs font-mono text-muted-foreground/70 px-2 py-2 mt-2">
                  <Command.Item onSelect={() => { alert("Self-destruct sequence initiated... (Just kidding)"); setCommandPaletteOpen(false); }} className="flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-md cursor-pointer transition-colors aria-selected:bg-red-500/20 aria-selected:text-red-300">
                    <Terminal className="w-4 h-4" /> Initiate Self-Destruct
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
