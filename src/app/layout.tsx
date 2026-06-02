import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nurnex — Verified Hiring Platform",
  description:
    "Stop Applying. Start Getting Invited. Verified candidates. Real recruiters. No resume noise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
