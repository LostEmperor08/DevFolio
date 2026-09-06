import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
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
    default: "Samarth Patil",
  },
  description:
    "Personal portfolio of Samarth Patil — ISE student building scalable software systems.",
  icons: {
    icon: "/images/profile-logo.jpg",
    apple: "/images/profile-logo.jpg",
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
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased selection:bg-red-950 selection:text-red-200 min-h-screen flex flex-col`}
      >
        <div className="max-w-2xl lg:max-w-xl mx-auto w-full flex-1 flex flex-col justify-between">
          <div>
            <Navbar />
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
