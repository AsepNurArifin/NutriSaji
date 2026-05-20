import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RamenPaitan.Plg — Ramen Tori Paitan 100% Halal Palembang",
  description:
    "Ramen Tori Paitan autentik Jepang, 100% Halal. Kaldu ayam kolagen direbus 8 jam. Tanpa Mirin, Tanpa Sake. Kunjungi stand kami di Palembang atau pesan via WhatsApp untuk Self-Pickup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-stone-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
