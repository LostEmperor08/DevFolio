"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, CheckCircle2, Sparkles, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import { sfx } from "@/lib/audio";
import { toast } from "sonner";

interface HoldToDispatchProps {
  email: string;
  github: string;
  linkedin?: string;
  x?: string;
  instagram?: string;
}

export function HoldToDispatch({
  email,
  github,
  linkedin,
  x,
  instagram,
}: HoldToDispatchProps) {
  const [formData, setFormData] = useState({ name: "", senderEmail: "", message: "" });
  const [chargeProgress, setChargeProgress] = useState(0); // 0 to 100
  const [isHolding, setIsHolding] = useState(false);
  const [isDispatched, setIsDispatched] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Charge loop when button is held
  useEffect(() => {
    if (isHolding && !isDispatched) {
      const interval = 25; // ms
      const step = 100 / (1200 / interval); // 1.2s to 100%

      timerRef.current = setInterval(() => {
        setChargeProgress((prev) => {
          const next = prev + step;
          sfx.playChargeStep(Math.min(1, next / 100));

          if (next >= 100) {
            clearInterval(timerRef.current!);
            setIsHolding(false);
            setIsDispatched(true);
            sfx.playDispatchSuccess();
            toast.success("Message Dispatched! 🚀", {
              description: `Notification routed to ${email}`,
            });
            return 100;
          }
          return next;
        });
      }, interval);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (!isDispatched) {
        // Drain smoothly
        const drain = setInterval(() => {
          setChargeProgress((prev) => {
            if (prev <= 0) {
              clearInterval(drain);
              return 0;
            }
            return Math.max(0, prev - 8);
          });
        }, 20);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHolding, isDispatched, email]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    if (isDispatched) return;
    setIsHolding(true);
  };

  const handlePointerUp = () => {
    setIsHolding(false);
  };

  const resetForm = () => {
    setIsDispatched(false);
    setChargeProgress(0);
    setFormData({ name: "", senderEmail: "", message: "" });
    sfx.playMechanicalSwitch();
  };

  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            Instant Dispatch Console
          </h2>
          <p className="text-zinc-400 text-xs font-mono mt-0.5">
            Hold button to charge & fire your transmission directly
          </p>
        </div>

        {/* Quick Socials */}
        <div className="flex items-center gap-1.5">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              onClick={() => sfx.playMechanicalSwitch()}
              className="p-2 rounded-full border border-zinc-800 hover:border-red-500/50 bg-zinc-900/60 text-zinc-400 hover:text-white transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              onClick={() => sfx.playMechanicalSwitch()}
              className="p-2 rounded-full border border-zinc-800 hover:border-red-500/50 bg-zinc-900/60 text-zinc-400 hover:text-white transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {x && (
            <a
              href={x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              onClick={() => sfx.playMechanicalSwitch()}
              className="p-2 rounded-full border border-zinc-800 hover:border-red-500/50 bg-zinc-900/60 text-zinc-400 hover:text-white transition-colors"
            >
              <XIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              onClick={() => sfx.playMechanicalSwitch()}
              className="p-2 rounded-full border border-zinc-800 hover:border-red-500/50 bg-zinc-900/60 text-zinc-400 hover:text-white transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {isDispatched ? (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-red-950/60 border border-red-500 flex items-center justify-center shadow-[0_0_24px_rgba(239,68,68,0.5)]">
            <CheckCircle2 className="w-8 h-8 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Transmission Delivered</h3>
            <p className="text-zinc-400 text-xs font-mono mt-1">
              Thank you! I will review your note and respond back shortly.
            </p>
          </div>
          <button
            onClick={resetForm}
            className="text-xs font-mono text-red-400 hover:underline pt-2"
          >
            Send another dispatch
          </button>
        </div>
      ) : (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Alex Vance"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-red-500/70 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                Your Email
              </label>
              <input
                type="email"
                placeholder="alex@systems.io"
                value={formData.senderEmail}
                onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-red-500/70 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-zinc-400 mb-1">
              Project Specification / Collaboration Idea
            </label>
            <textarea
              rows={4}
              placeholder="Hey Samarth, let's collaborate on high-concurrency systems or Web3 utility..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-red-500/70 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* HOLD TO DISPATCH BUTTON */}
          <div className="pt-2">
            <button
              type="button"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="relative w-full overflow-hidden rounded-xl border border-red-500/50 bg-zinc-900/90 py-3.5 px-6 font-mono text-xs font-semibold text-white shadow-xl transition-transform active:scale-[0.98] select-none touch-none cursor-pointer"
            >
              {/* Charge Progress Fill Bar */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-80 transition-all duration-75 pointer-events-none"
                style={{
                  width: `${chargeProgress}%`,
                }}
              />

              <div className="relative z-10 flex items-center justify-center gap-2">
                <Send
                  className={`w-4 h-4 transition-transform ${
                    isHolding ? "translate-x-1 -translate-y-1 text-white" : "text-red-400"
                  }`}
                />
                <span>
                  {isHolding
                    ? `Charging... ${Math.round(chargeProgress)}%`
                    : "Hold to Dispatch Message (Press & Hold)"}
                </span>
              </div>
            </button>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mt-2 px-1">
              <span>Direct routing: {email}</span>
              <span>1.2s tactile hold required</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
