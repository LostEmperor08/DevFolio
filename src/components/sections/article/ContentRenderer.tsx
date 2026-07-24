import { ContentBlock } from "@/types";

export function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <article className="prose prose-invert prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-accent-blue prose-p:leading-relaxed prose-p:text-white/80">
      {blocks.map((block) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={block.id} className="mb-8">
                {block.text}
              </p>
            );
          
          case "heading":
            const HeadingTag = `h${block.level || 2}` as any;
            // Create an id for the heading so TOC anchor links work
            const id = block.text?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            return (
              <HeadingTag key={block.id} id={id} className="mt-16 mb-6 scroll-mt-32 text-white">
                {block.text}
              </HeadingTag>
            );
          
          case "callout":
            const bgColors = {
              info: "bg-blue-950/30 border-blue-500/20",
              warning: "bg-yellow-950/30 border-yellow-500/20",
              success: "bg-green-950/30 border-green-500/20",
              danger: "bg-red-950/30 border-red-500/20",
            };
            const colorClass = bgColors[block.variant || "info"];
            return (
              <div key={block.id} className={`p-6 rounded-2xl border ${colorClass} my-8`}>
                {block.title && <h4 className="text-lg font-bold text-white mb-2 !mt-0">{block.title}</h4>}
                <p className="text-base text-white/80 !mb-0">{block.text}</p>
              </div>
            );
          
          case "code":
            return (
              <div key={block.id} className="my-8 rounded-2xl overflow-hidden border border-white/10 bg-[#0d1117]">
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
                   <span className="text-xs font-mono text-muted-foreground">{block.language}</span>
                   <button className="text-xs font-mono text-muted-foreground hover:text-white transition-colors">Copy</button>
                </div>
                <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed text-white/90">
                  <code>{block.code}</code>
                </pre>
              </div>
            );
            
          case "quote":
             return (
               <blockquote key={block.id} className="border-l-4 border-accent-blue pl-6 my-10 italic text-2xl text-white/70">
                 "{block.text}"
                 {block.author && <footer className="text-base text-muted-foreground mt-4 not-italic">— {block.author}</footer>}
               </blockquote>
             );

          case "divider":
             return <hr key={block.id} className="my-16 border-white/10" />;

          default:
            return null;
        }
      })}
    </article>
  );
}
