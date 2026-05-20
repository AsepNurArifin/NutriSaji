import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { TrackingConsentProvider } from "@/context/tracking-consent";
import { Analytics } from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NutriSaji - Catering Diet Sehat Terukur | 100% Akad Transparan",
  description: "Layanan catering harian sehat dengan kalori presisi, bebas bahan pengawet, rincian alergen lengkap, tanpa biaya tersembunyi, dan akad jual beli syariah transparan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <TrackingConsentProvider>
          <Analytics />
          {children}
        </TrackingConsentProvider>
      </body>
    </html>
  );
}
