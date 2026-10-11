import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { MOTTO } from "@/lib/brand";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `Nurnex Consulting — ${MOTTO}`,
  description:
    "Microsoft analytics, automation, and cloud consulting — plus websites and iOS & Android apps — for Europe, Asia, and the Middle East. Power BI, Power Platform, Azure, AI readiness, and digital products.",
  keywords: [
    "Microsoft consulting",
    "Power BI",
    "Power Platform",
    "Azure",
    "data analytics",
    "automation",
    "website development",
    "iOS app development",
    "Android app development",
    "Nurnex",
  ],
  metadataBase: new URL("https://nurnex.com"),
  openGraph: {
    title: `Nurnex Consulting — ${MOTTO}`,
    description:
      "Microsoft analytics, automation, and cloud consulting — plus websites and iOS & Android apps — for Europe, Asia, and the Middle East.",
    type: "website",
    url: "https://nurnex.com",
    images: [
      {
        url: "/nurnex-og.png",
        width: 1200,
        height: 630,
        alt: `Nurnex Consulting — ${MOTTO}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Nurnex Consulting — ${MOTTO}`,
    description:
      "Microsoft analytics, automation, and cloud consulting — plus websites and iOS & Android apps.",
    images: ["/nurnex-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-copper focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
