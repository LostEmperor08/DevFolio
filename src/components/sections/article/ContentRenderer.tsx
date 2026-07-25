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
    <div className="max-w-[800px] space-y-12">
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
              className="prose prose-invert prose-lg prose-headings:font-bold prose-a:text-accent-blue hover:prose-a:text-white prose-a:transition-colors prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-img:rounded-3xl prose-img:border prose-img:border-white/10 max-w-none"
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
                className="text-muted-foreground text-lg leading-relaxed"
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
                  className="mt-16 mb-8 scroll-mt-32 text-3xl font-bold tracking-tight text-white md:text-4xl"
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
                className="glass-panel relative my-8 overflow-hidden rounded-2xl border border-white/10"
              >
                <div className="flex items-center border-b border-white/5 bg-white/5 px-4 py-2">
                  <span className="text-muted-foreground font-mono text-xs uppercase">
                    {block.language}
                  </span>
                </div>
                <pre className="overflow-x-auto p-6 font-mono text-sm text-white/90">
                  <code>{block.code}</code>
                </pre>
              </motion.div>
            );

          // Additional legacy block types could be handled here...

          default:
            return null;
        }
      })}
    </div>
  );
}
