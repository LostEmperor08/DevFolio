"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function AnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Determine which analytics are enabled
    const hasGoogleAnalytics = process.env.NEXT_PUBLIC_GA_ID;
    const hasPlausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    const hasPostHog = process.env.NEXT_PUBLIC_POSTHOG_KEY;

    if (hasGoogleAnalytics) {
      // Setup Google Analytics
    }

    if (hasPlausible) {
      // Setup Plausible
    }

    if (hasPostHog) {
      // Setup PostHog
    }
    
  }, [pathname, searchParams]);

  return null;
}

export function AnalyticsProvider() {
  return (
    <Suspense fallback={null}>
      <AnalyticsInner />
    </Suspense>
  );
}
