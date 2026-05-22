import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CollegeCompass — Discover & Compare Indian Colleges",
    template: "%s | CollegeCompass",
  },
  description:
    "Discover, compare, and predict admissions for 500+ Indian colleges. Get real data on fees, placements, NIRF rankings, and more.",
  keywords: [
    "Indian colleges",
    "college comparison",
    "NIRF ranking",
    "JEE colleges",
    "NEET colleges",
    "college predictor",
    "engineering colleges India",
    "IIT NIT admission",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "CollegeCompass",
    title: "CollegeCompass — Discover & Compare Indian Colleges",
    description:
      "Real data on 500+ Indian colleges. Search, compare, and predict your admission chances.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CollegeCompass",
    description: "Discover & Compare Indian Colleges",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
