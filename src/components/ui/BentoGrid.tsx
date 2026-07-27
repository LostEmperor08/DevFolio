import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function BentoGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto grid w-full auto-rows-auto grid-cols-1 gap-6 md:grid-cols-3 md:gap-8",
        className
      )}
    >
      {children}
    </div>
  );
}
