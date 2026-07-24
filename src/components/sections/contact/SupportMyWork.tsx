"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { profile } from "@/config/profile";
import { Coffee, Copy, CheckCircle2, Wallet, AlertTriangle } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";

export function SupportMyWork() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  return (
    <section className="w-full max-w-[1200px] px-6 py-32 relative z-10 mx-auto border-t border-white/5 mt-16">
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
        <div>
          <motion.h2 
            variants={motionPresets.fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4"
          >
            Support my work.
          </motion.h2>
          <motion.p 
            variants={motionPresets.fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="text-muted-foreground text-lg max-w-xl"
          >
            If you find my open-source projects or articles helpful, consider supporting my late-night coding sessions.
          </motion.p>
        </div>
        
        <motion.div 
          variants={motionPresets.scaleIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="flex flex-wrap gap-4"
        >
          <a href={profile.support.githubSponsors} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2ea043]/10 text-[#2ea043] border border-[#2ea043]/20 hover:bg-[#2ea043]/20 transition-colors font-medium">
            <IconBrandGithub className="w-5 h-5" /> Sponsor
          </a>
          <a href={profile.support.buyMeACoffee} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFDD00]/10 text-[#FFDD00] border border-[#FFDD00]/20 hover:bg-[#FFDD00]/20 transition-colors font-medium">
            <Coffee className="w-5 h-5" /> Buy me a coffee
          </a>
        </motion.div>
      </div>

      <motion.div
        variants={motionPresets.fadeUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="p-8 rounded-3xl glass-panel border border-white/10"
      >
        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-white/10">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-accent-blue" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Crypto Support</h3>
            <p className="text-sm text-muted-foreground">Accepting contributions on major networks.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.support.crypto.map((wallet) => (
            <div key={wallet.network} className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-white/20 transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-white font-medium">{wallet.label}</span>
                  <span className="text-xs font-mono text-muted-foreground bg-white/5 px-2 py-1 rounded-md">{wallet.network}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <code className="flex-1 block truncate text-sm text-muted-foreground font-mono bg-white/5 p-3 rounded-lg">
                  {wallet.address}
                </code>
                <button 
                  onClick={() => handleCopy(wallet.address)}
                  className="w-12 h-12 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/10 shrink-0 relative overflow-hidden"
                  aria-label="Copy address"
                >
                  <AnimatePresence mode="wait">
                    {copiedAddress === wallet.address ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="text-emerald-500"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="text-muted-foreground group-hover:text-white"
                      >
                        <Copy className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500/80 text-sm">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-yellow-500" />
          <p>Please verify the network and address before sending any funds. Incorrect networks may result in permanent loss of funds.</p>
        </div>
      </motion.div>
    </section>
  );
}
