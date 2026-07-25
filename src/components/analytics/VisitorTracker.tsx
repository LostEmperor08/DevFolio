"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { logVisit } from "@/app/actions/analytics.actions";

export function VisitorTracker({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();

  useEffect(() => {
    if (enabled && pathname && !pathname.startsWith("/admin")) {
      // Small delay to ensure we only log actual page views, not instant bounces
      const timer = setTimeout(() => {
        logVisit(pathname).catch(console.error);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [pathname, enabled]);

  return null;
}
