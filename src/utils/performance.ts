/**
 * Performance Monitoring Utilities
 * Wrappers for measuring Web Vitals or custom timing metrics.
 */

export function reportWebVitals(metric: any) {
  // In production, this can send data to analytics
  if (process.env.NODE_ENV !== "production") {
    console.log(metric);
  }
}

export function measureInteraction(name: string, callback: () => void) {
  const start = performance.now();
  callback();
  const end = performance.now();
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Performance] ${name} took ${end - start}ms`);
  }
}
