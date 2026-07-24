import { Loader2 } from "lucide-react";
import { designTokens } from "@/lib/design";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 w-full min-h-[200px] rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
      <Loader2 
        className="w-8 h-8 text-accent-blue animate-spin mb-4" 
        style={{ animationDuration: designTokens.animation.duration.slow + "s" }}
      />
      <p className="text-sm font-mono text-muted-foreground animate-pulse">
        {message}
      </p>
    </div>
  );
}
