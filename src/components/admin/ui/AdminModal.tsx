"use client";

import { X } from "lucide-react";
import { AdminButton } from "./AdminButton";
import { useEffect } from "react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
}

export function AdminModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  isDestructive = false,
  isLoading = false,
}: AdminModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in-95 relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 duration-200">
        <button
          onClick={onClose}
          className="text-muted-foreground absolute top-4 right-4 transition-colors hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-2 text-xl font-bold text-white">{title}</h2>
        <p className="text-muted-foreground mb-6 text-sm">{description}</p>

        <div className="flex justify-end gap-3">
          <AdminButton variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </AdminButton>
          <AdminButton
            variant={isDestructive ? "danger" : "primary"}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </AdminButton>
        </div>
      </div>
    </div>
  );
}
