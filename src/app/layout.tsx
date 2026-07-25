import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Background } from "@/components/layout/Background";
import { SoundEffectManager } from "@/components/providers/SoundEffectManager";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Samarth Patil",
    default: "Samarth Patil | Senior Frontend Architect",
  },
  description:
    "Award-winning developer portfolio and digital experience. Engineering premium digital ecosystems.",
  keywords: [
    "Samarth Patil",
    "Frontend Architect",
    "React Developer",
    "Next.js",
    "Creative Developer",
    "Portfolio",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://samarth.dev",
    title: "Samarth Patil | Senior Frontend Architect",
    description: "Award-winning developer portfolio and digital experience.",
    siteName: "Samarth OS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samarth Patil | Senior Frontend Architect",
    description: "Award-winning developer portfolio and digital experience.",
  },
};

import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";
import { VisitorTracker } from "@/components/analytics/VisitorTracker";
import { prisma } from "@/lib/prisma";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await prisma.siteSettings.findFirst();

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
          {/* JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Samarth Patil",
                url: "https://samarth.dev",
                jobTitle: "Senior Frontend Architect",
                sameAs: [
                  "https://github.com/samarth",
                  "https://twitter.com/samarth",
                  "https://linkedin.com/in/samarth",
                ],
              }),
            }}
          />
          <SmoothScrollProvider>
            <LoadingScreen />
            <ScrollProgress />
            <CustomCursor />
            <Background />
            <SoundEffectManager />
            <CommandPalette />
            <Navbar />
            {children}
            <Footer />
            <AnalyticsProvider />
            <VisitorTracker enabled={settings?.enableAnalytics || false} />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
