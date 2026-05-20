import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Nutri Saji — Premium Tori Paitan Ramen 100% Halal Palembang",
  description:
    "Ramen Tori Paitan autentik Jepang, 100% Halal. Kaldu ayam kolagen direbus 8 jam. Tanpa Mirin, Tanpa Sake. Kunjungi stand kami di Palembang atau pesan via WhatsApp untuk Self-Pickup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#FDF8F0] text-[#1A1A1A] antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
