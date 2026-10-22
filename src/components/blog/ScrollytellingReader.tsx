"use client";

import React, { useState } from "react";
import { BlogPostData } from "@/lib/content";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  Code2,
  Bookmark,
  Calendar,
  Clock,
  ArrowLeft,
  X,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { sfx } from "@/lib/audio";

interface ScrollytellingReaderProps {
  post: BlogPostData;
}

// Interactive code steps for Code Morphing demo
const CODE_STEPS = [
  {
    title: "V1: Centralized Custodial Architecture",
    version: "v1.0-legacy",
    desc: "Single point of failure: user private keys held by centralized database with middleman API gates.",
    code: `// Traditional Centralized API
async function transferAsset(user, amount) {
  // Reliance on centralized bank API
  const auth = await BankAPI.authorize(user.token);
  if (!auth.valid) throw new Error("Blocked");
  
  // Single database row update (opaque)
  await Database.execute(
    "UPDATE accounts SET balance = balance - ? WHERE id = ?",
    [amount, user.id]
  );
  return { status: "pending_clearance", fee: 0.05 };
}`,
    highlight: [3, 8],
  },
  {
    title: "V2: Smart Contract Automated Settlement",
    version: "v2.0-web3",
    desc: "Decentralized execution: atomic smart contract ensures zero middleman and deterministic state transition.",
    code: `// Modern Decentralized TON Smart Contract
() recv_internal(int my_balance, int msg_value, cell in_msg_full, slice in_msg_body) impure {
  ;; Cryptographic verification of user ownership
  slice sender = parse_sender_address(in_msg_full);
  throw_unless(401, check_signature(sender, in_msg_body));
  
  ;; Atomic zero-middleman state settlement
  save_data(sender, in_msg_body~load_coins());
  send_raw_message(msg, 64); ;; Instant on-chain dispatch
}`,
    highlight: [4, 7],
  },
  {
    title: "V3: High-Throughput Batch Sharding",
    version: "v3.0-scale",
    desc: "Massive scalability: asynchronous actor-model workchains processing concurrent state updates.",
    code: `// Scalable Multi-Shard Routing Engine
() route_shard_batch(cell batch_tree) impure inline {
  ;; Parallel actor-model sharded message queue
  while (~ cell_null?(batch_tree)) {
    var (next_shard, message) = batch_tree.pop_leaf();
    send_external_out(next_shard, message);
  }
  ;; Deterministic 55,000 TPS workchain execution
  commit();
}`,
    highlight: [4, 8],
  },
];

// Curated interactive margin notes
const MARGIN_NOTES: Record<string, { title: string; content: string }> = {
  defi: {
    title: "Side Note · DeFi Latency Realities",
    content:
      "Most people think DeFi is slow, but modern L1s and Telegram TON achieve sub-second finality with asynchronous actor sharding.",
  },
  rwa: {
    title: "Architectural Footnote · RWA Tokenization",
    content:
      "Tokenizing real assets requires off-chain legal wrappers paired with on-chain cryptographic proofs (Zk-proofs & decentralized oracles).",
  },
  identity: {
    title: "Philosophy · Self-Sovereign Identity (SSI)",
    content:
      "Why rent your reputation from big tech when public-key cryptography gives you mathematical ownership of your handle forever?",
  },
  fragment: {
    title: "System Insight · Fragment Marketplace",
    content:
      "Telegram's Fragment platform runs entirely on smart contracts, auctioning usernames directly on the TON blockchain with instant cryptographic settlements.",
  },
};

export function ScrollytellingReader({ post }: ScrollytellingReaderProps) {
  const [spotlightActive, setSpotlightActive] = useState(false);
  const [activeCodeStep, setActiveCodeStep] = useState(0);
  const [activeMarginNote, setActiveMarginNote] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const totalWords = post.content.join(" ").split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(totalWords / 180));

  return (
    <article className="space-y-8">
      {/* Top Navigation & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <Link
          href="/blog"
          onClick={() => sfx.playMechanicalSwitch()}
          onMouseEnter={() => sfx.playSynthHum()}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-red-400 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to All Writing</span>
        </Link>

        {/* Spotlight Reading Mode Toggle */}
        <button
          onClick={() => {
            setSpotlightActive((prev) => !prev);
            sfx.playMechanicalSwitch();
          }}
          onMouseEnter={() => sfx.playSynthHum()}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 border ${
            spotlightActive
              ? "bg-red-950/60 border-red-500/60 text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.3)]"
              : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white"
          }`}
        >
          <Lightbulb className={`w-3.5 h-3.5 ${spotlightActive ? "text-red-400" : ""}`} />
          <span>Spotlight Reading: {spotlightActive ? "ON" : "OFF"}</span>
        </button>
      </div>

      {/* Article Header Card */}
      <header className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-red-950/40 border border-red-800/40 text-red-400 font-medium">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            <time dateTime={post.date}>{post.date}</time>
          </span>
          <span className="text-zinc-600">•</span>
          <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            {readingTime} min read
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white leading-tight">
          {post.title}
        </h1>

        <p className="text-zinc-300 text-base sm:text-lg leading-relaxed border-t border-zinc-800/60 pt-4">
          {post.description}
        </p>
      </header>

      {/* Interactive Code Morphing Stage */}
      <section className="rounded-2xl border border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-red-400" />
            <span className="text-xs font-mono font-medium text-white">
              Step-by-Step Code Morphing Engine
            </span>
          </div>

          {/* Version Switcher Tabs */}
          <div className="flex items-center gap-1.5">
            {CODE_STEPS.map((step, idx) => (
              <button
                key={step.version}
                onClick={() => {
                  setActiveCodeStep(idx);
                  sfx.playPaperRustle();
                }}
                onMouseEnter={() => sfx.playSynthHum()}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                  activeCodeStep === idx
                    ? "bg-red-950/60 border border-red-700/60 text-red-300 font-semibold"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                {step.version}
              </button>
            ))}
          </div>
        </div>

        <p className="text-zinc-400 text-xs font-mono">
          {CODE_STEPS[activeCodeStep].desc}
        </p>

        {/* Animated Code Block */}
        <div className="relative rounded-xl border border-zinc-800 bg-[#070709] p-4 overflow-x-auto font-mono text-xs text-zinc-300 shadow-inner">
          <AnimatePresence mode="wait">
            <motion.pre
              key={activeCodeStep}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="leading-relaxed whitespace-pre"
            >
              <code>{CODE_STEPS[activeCodeStep].code}</code>
            </motion.pre>
          </AnimatePresence>
        </div>
      </section>

      {/* Scrollytelling Body Content with Interactive Margin Notes */}
      <section className="relative rounded-2xl border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-md p-6 sm:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="text-zinc-300 text-base sm:text-lg leading-relaxed space-y-6">
          {post.content.map((paragraph, index) => {
            if (paragraph.startsWith("### ")) {
              return (
                <h2
                  key={index}
                  className="font-semibold text-xl sm:text-2xl tracking-tight text-white pt-6 pb-2 border-b border-zinc-800/60"
                >
                  {paragraph.replace("### ", "")}
                </h2>
              );
            }

            return (
              <p
                key={index}
                className={`transition-all duration-300 rounded-lg p-2 ${
                  spotlightActive
                    ? "hover:bg-zinc-900/60 hover:text-white opacity-40 hover:opacity-100 hover:shadow-lg"
                    : ""
                }`}
              >
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Interactive Margin Notes Strip */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono text-zinc-400">
            <Bookmark className="w-3.5 h-3.5 text-red-400" />
            <span>Interactive Margin Notes (Click to inspect side-thoughts)</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(MARGIN_NOTES).map(([key, note]) => (
              <button
                key={key}
                onClick={() => {
                  setActiveMarginNote(note);
                  sfx.playPaperRustle();
                }}
                onMouseEnter={() => sfx.playSynthHum()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border border-zinc-800 hover:border-red-500/50 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all"
              >
                <Sparkles className="w-3 h-3 text-red-400" />
                <span>{note.title.replace(" · ", ": ")}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pop-up Margin Note Modal/Drawer */}
        <AnimatePresence>
          {activeMarginNote && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="mt-6 p-4 rounded-xl border border-red-900/50 bg-zinc-950/95 shadow-2xl backdrop-blur-xl relative"
            >
              <button
                onClick={() => {
                  setActiveMarginNote(null);
                  sfx.playMechanicalSwitch();
                }}
                className="absolute top-3 right-3 text-zinc-400 hover:text-white p-1"
                aria-label="Close margin note"
              >
                <X className="w-4 h-4" />
              </button>
              <h4 className="text-xs font-mono font-semibold text-red-400 mb-1.5">
                {activeMarginNote.title}
              </h4>
              <p className="text-sm font-mono text-zinc-300 leading-relaxed pr-6">
                {activeMarginNote.content}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </article>
  );
}
