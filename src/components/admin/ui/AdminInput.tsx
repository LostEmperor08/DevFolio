import React, { forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  description?: string;
}

export const AdminInput = forwardRef<HTMLInputElement, AdminInputProps>(
  ({ className, label, error, description, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        <label className="text-muted-foreground text-sm font-medium">{label}</label>
        <input
          ref={ref}
          className={cn(
            "w-full rounded-xl border bg-white/5 px-4 py-3 text-white transition-all duration-300 focus:ring-2 focus:outline-none",
            error
              ? "border-red-500/50 focus:ring-red-500/50"
              : "focus:ring-accent-blue/50 focus:border-accent-blue/50 border-white/10",
            className
          )}
          {...props}
        />
        {description && !error && <p className="text-muted-foreground/70 text-xs">{description}</p>}
        {error && <p className="text-xs font-medium text-red-400">{error}</p>}
      </div>
    );
  }
);
AdminInput.displayName = "AdminInput";

export interface AdminTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  description?: string;
}

export const AdminTextarea = forwardRef<HTMLTextAreaElement, AdminTextareaProps>(
  ({ className, label, error, description, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        <label className="text-muted-foreground text-sm font-medium">{label}</label>
        <textarea
          ref={ref}
          className={cn(
            "min-h-[120px] w-full resize-y rounded-xl border bg-white/5 px-4 py-3 text-white transition-all duration-300 focus:ring-2 focus:outline-none",
            error
              ? "border-red-500/50 focus:ring-red-500/50"
              : "focus:ring-accent-blue/50 focus:border-accent-blue/50 border-white/10",
            className
          )}
          {...props}
        />
        {description && !error && <p className="text-muted-foreground/70 text-xs">{description}</p>}
        {error && <p className="text-xs font-medium text-red-400">{error}</p>}
      </div>
    );
  }
);
AdminTextarea.displayName = "AdminTextarea";
