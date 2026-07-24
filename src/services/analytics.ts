/**
 * Analytics Service
 * Centralizes all tracking and metric logic.
 */
export const analytics = {
  trackEvent: (eventName: string, properties?: Record<string, any>) => {
    // Implementation for Google Analytics, Plausible, or custom backend
    if (process.env.NODE_ENV !== "production") {
      console.log(`[Analytics] ${eventName}`, properties);
      return;
    }
    // TODO: Send to actual analytics provider
  },
  
  trackPageView: (url: string) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[Analytics] PageView: ${url}`);
      return;
    }
  }
};
