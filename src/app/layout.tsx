import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundAtmosphere } from "@/components/effects/BackgroundAtmosphere";
import { PersonaProvider } from "@/context/PersonaContext";
import { Toaster } from "sonner";

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
    default: "Samarth Patil",
  },
  description:
    "Personal portfolio of Samarth Patil — ISE student building scalable software systems.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#060608] text-white antialiased selection:bg-red-950 selection:text-red-200 min-h-screen flex flex-col relative`}
      >
        <PersonaProvider>
          <BackgroundAtmosphere />
          <Toaster richColors position="bottom-right" theme="dark" />
          <div className="relative z-10 max-w-3xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col justify-between">
            <div>
              <Navbar />
              {children}
            </div>
            <Footer />
          </div>
        </PersonaProvider>
      </body>
    </html>
  );
}



