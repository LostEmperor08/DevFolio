"use client";

import { useEffect, useState } from "react";
import { Copy, Check, Volume2, VolumeX, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { sfx } from "@/lib/audio";

interface LivePresenceProps {
  email: string;
}

export function LivePresence({ email }: LivePresenceProps) {
  const [istTime, setIstTime] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [soundActive, setSoundActive] = useState<boolean>(true);

  // Synchronize IST Clock (UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setIstTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync SFX state
  useEffect(() => {
    setSoundActive(sfx.isEnabled());
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      sfx.playSuccess();
      toast.success("Email copied to clipboard!", {
        description: email,
        duration: 2500,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy email.");
    }
  };

  const toggleSound = () => {
    const nextState = sfx.toggle();
    setSoundActive(nextState);
    toast(nextState ? "Sound FX Enabled 🔊" : "Sound FX Muted 🔇", {
      duration: 1500,
    });
  };

  // Keyboard shortcut: Press 'C' to copy email
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === "c" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        // Ignore if user is currently typing in an input or textarea
        const activeTag = document.activeElement?.tagName.toLowerCase();
        if (activeTag === "input" || activeTag === "textarea" || (document.activeElement as HTMLElement)?.isContentEditable) {
          return;
        }
        e.preventDefault();
        handleCopyEmail();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [email]);

  return (
    <div className="w-full mb-8 space-y-3">
      {/* Top Status Bar with Live IST time and SFX toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono py-2.5 px-3.5 rounded-lg border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-zinc-300 font-medium">Bangalore, IN</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400 font-semibold tracking-wider">
            {istTime || "14:00:00"} <span className="text-zinc-500 text-[10px]">IST</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Copy Email Pill */}
          <button
            onClick={handleCopyEmail}
            onMouseEnter={() => sfx.playHover()}
            title="Click or press 'C' to copy email"
            className="group flex items-center gap-1.5 px-2.5 py-1 rounded border border-zinc-800 hover:border-red-500/50 bg-zinc-900/60 hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all duration-200"
          >
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3 text-zinc-400 group-hover:text-red-400 transition-colors" />
            )}
            <span className="text-[11px] font-medium hidden sm:inline">{email}</span>
            <span className="text-[11px] font-medium sm:hidden">Copy</span>
            <kbd className="hidden md:inline-block ml-1 px-1 py-0.2 bg-zinc-800 border border-zinc-700/60 rounded text-[9px] text-zinc-400 font-semibold group-hover:border-red-500/40">
              C
            </kbd>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundActive ? "Mute audio effects" : "Enable tactile sound effects"}
            className="p-1.5 rounded border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
          >
            {soundActive ? (
              <Volume2 className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
            )}
          </button>
        </div>
      </div>

      {/* Focus & Engineering Activity Ticker */}
      <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-zinc-400 bg-red-950/20 border border-red-900/30 rounded-md">
        <Sparkles className="w-3.5 h-3.5 text-red-400 flex-shrink-0 animate-pulse" />
        <span className="truncate">
          <strong className="text-red-300 font-medium">Active Focus:</strong> Engineering high-throughput distributed systems, C++, and Web3 utility architectures.
        </span>
      </div>
    </div>
  );
}
