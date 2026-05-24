import type { Metadata } from "next";
import { Inter, Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased text-foreground pb-20 md:pb-0" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
