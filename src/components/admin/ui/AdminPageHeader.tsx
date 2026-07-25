import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  action?: React.ReactNode;
}

export function AdminPageHeader({
  title,
  description,
  backHref,
  backLabel = "Back",
  action,
}: AdminPageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-start">
      <div>
        {backHref && (
          <Link
            href={backHref}
            className="text-muted-foreground group mb-4 inline-flex items-center text-sm transition-colors hover:text-white"
          >
            <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {backLabel}
          </Link>
        )}
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-white md:text-3xl">{title}</h1>
        {description && <p className="text-muted-foreground max-w-xl text-sm">{description}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
