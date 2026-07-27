"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Block {
  type: string;
  text?: string | null;
  level?: number | null;
  url?: string | null;
  caption?: string | null;
  language?: string | null;
  code?: string | null;
  items?: string[];
  style?: string | null;
}

export function ContentRenderer({ blocks }: { blocks: Block[] }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="max-w-[850px] space-y-10 font-sans">
      {blocks.map((block, index) => {
        // Handle the new Markdown blocks from the CMS
        if (block.type === "markdown" && block.text) {
          return (
            <motion.div
              key={index}
              variants={motionPresets.fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="prose prose-invert prose-lg md:prose-xl prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-a:text-cyan-400 hover:prose-a:text-white prose-a:transition-colors prose-pre:bg-slate-950 prose-pre:border prose-pre:border-white/15 prose-pre:rounded-2xl prose-pre:shadow-2xl prose-img:rounded-3xl prose-img:border prose-img:border-white/15 prose-img:shadow-2xl prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:bg-white/5 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-white/90 prose-strong:text-white prose-li:text-muted-foreground prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{block.text}</ReactMarkdown>
            </motion.div>
          );
        }

        // Handle legacy hardcoded blocks (paragraph, heading, etc)
        switch (block.type) {
          case "paragraph":
            return (
              <motion.p
                key={index}
                variants={motionPresets.fadeUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                className="text-muted-foreground text-lg leading-relaxed font-light md:text-xl"
              >
                {block.text}
              </motion.p>
            );

          case "heading":
            const Tag = `h${block.level || 2}` as any;
            const id = block.text?.toLowerCase().replace(/\s+/g, "-");
            return (
              <motion.div
                key={index}
                variants={motionPresets.fadeUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
              >
                <Tag
                  id={id}
                  className="mt-16 mb-6 scroll-mt-32 border-b border-white/10 pb-4 text-3xl font-bold tracking-tight text-white md:text-4xl"
                >
                  {block.text}
                </Tag>
              </motion.div>
            );

          case "code":
            return (
              <motion.div
                key={index}
                variants={motionPresets.fadeUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                className="glass-panel relative my-10 overflow-hidden rounded-2xl border border-white/15 bg-slate-950/90 shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <span className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="font-mono text-xs font-semibold tracking-wider text-cyan-400 uppercase">
                    {block.language || "terminal"}
                  </span>
                </div>
                <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed text-white/90">
                  <code>{block.code}</code>
                </pre>
              </motion.div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
