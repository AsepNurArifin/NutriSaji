"use client";

import * as React from "react";
import {
  MapPin,
  Clock,
  MessageCircle,
  Utensils,
  AlertTriangle,
  ShieldCheck,
  Star,
  Phone,
  Menu as MenuIcon,
  X,
  ChevronDown,
  Flame,
  Baby,
  Soup,
  ImageOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

/* ─────────────────────────────────────────────────────────────────────────────
   DATA LAYER — All prices, ingredients, and descriptions are IMMUTABLE
   and rendered server-transparently per Simetri Informasi requirement.
───────────────────────────────────────────────────────────────────────────── */

interface MenuItem {
  id: string;
  name: string;
  price: number;
  badge: string;
  badgeIcon: React.ReactNode;
  badgeClass: string;
  ingredients: string;
  description: string;
}

const menuItems: MenuItem[] = [
  {
    id: "signature-tori-paitan",
    name: "Signature Tori Paitan",
    price: 35000,
    badge: "Best Seller",
    badgeIcon: <Star className="h-3 w-3" />,
    badgeClass: "bg-red-600 text-white border-red-600",
    ingredients:
      "Mie lurus kecil, kuah kaldu ayam pekat 8 jam, ayam chashu halal, jamur kikurage, daun bawang, nori.",
    description:
      "Ramen signature kami. Kaldu kolagen ayam yang direbus 8 jam menghasilkan kuah creamy kental penuh umami — gurih tanpa MSG.",
  },
  {
    id: "spicy-tantanmen",
    name: "Spicy Tantanmen",
    price: 38000,
    badge: "Pedas Nendang",
    badgeIcon: <Flame className="h-3 w-3" />,
    badgeClass: "bg-orange-600 text-white border-orange-600",
    ingredients:
      "Mie keriting tebal, kuah kaldu ayam pedas, daging ayam cincang berbumbu, pak choy, wijen sangrai, cabai kering.",
    description:
      "Varian pedas dengan bumbu tantanmen otentik. Level kepedasan sudah fixed dan tidak bisa dikurangi — harap diperhatikan.",
  },
  {
    id: "shoyu-ramen",
    name: "Shoyu Ramen Classic",
    price: 32000,
    badge: "Aman untuk Anak",
    badgeIcon: <Baby className="h-3 w-3" />,
    badgeClass: "bg-emerald-600 text-white border-emerald-600",
    ingredients:
      "Mie lurus kecil, kuah kaldu ayam shoyu halal, telur ajitama setengah matang, nori, jagung manis, daun bawang.",
    description:
      "Ramen berkuah bening ringan dengan kecap Jepang halal. Rasa lembut — cocok untuk semua usia termasuk anak-anak.",
  },
  {
    id: "tori-paitan-double",
    name: "Tori Paitan Double Chashu",
    price: 45000,
    badge: "Porsi Sultan",
    badgeIcon: <Soup className="h-3 w-3" />,
    badgeClass: "bg-amber-600 text-white border-amber-600",
    ingredients:
      "Mie lurus kecil, kuah kaldu ayam pekat 8 jam, ayam chashu halal DOUBLE, telur ajitama, jamur kikurage, daun bawang, nori 2 lembar.",
    description:
      "Versi premium dari Signature kami. Porsi chashu digandakan untuk Anda yang ingin lebih puas. Kuah tetap sama pekatnya.",
  },
  {
    id: "gyoza-set",
    name: "Gyoza Ayam (5 pcs)",
    price: 18000,
    badge: "Side Dish",
    badgeIcon: <Utensils className="h-3 w-3" />,
    badgeClass: "bg-slate-600 text-white border-slate-600",
    ingredients:
      "Kulit gyoza tipis, isian daging ayam cincang halal, kol, daun bawang, jahe, minyak wijen. Disajikan dengan saus ponzu.",
    description:
      "Pelengkap ramen Anda. Digoreng setengah kukus (pan-fried) hingga bagian bawah renyah keemasan.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   WHATSAPP CONFIG
───────────────────────────────────────────────────────────────────────────── */

const WA_PHONE = "628111222333";
const WA_TEXT =
  "Halo RamenPaitan, saya sudah membaca menu secara transparan di website. Saya ingin memesan untuk pesanan Self-Pickup (Ambil Sendiri). Berikut detail pesanan saya: ...";

function getWhatsAppUrl(): string {
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_TEXT)}`;
}

/* ─────────────────────────────────────────────────────────────────────────────
   OPERATIONAL DATA
───────────────────────────────────────────────────────────────────────────── */

function getStoreStatus(): { isOpen: boolean; label: string } {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon
  const hour = now.getHours();

  if (day === 1) return { isOpen: false, label: "Tutup (Senin Libur)" };
  if (hour >= 16 && hour < 22) return { isOpen: true, label: "Buka Sekarang" };
  return { isOpen: false, label: "Tutup" };
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function LandingPage() {
  // Consent Vault state
  const [consentOpen, setConsentOpen] = React.useState(false);
  const [trackingConsent, setTrackingConsent] = React.useState<boolean | null>(null);

  // Mobile nav state
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  // Store status
  const storeStatus = getStoreStatus();

  // Auto-open Consent Vault after 3 seconds
  React.useEffect(() => {
    const stored = localStorage.getItem("ramenpaitan_consent");
    if (stored !== null) {
      setTrackingConsent(stored === "true");
      return; // Already answered — don't show again
    }
    const timer = setTimeout(() => setConsentOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleConsentAccept = () => {
    setTrackingConsent(true);
    localStorage.setItem("ramenpaitan_consent", "true");
    setConsentOpen(false);
  };

  const handleConsentReject = () => {
    setTrackingConsent(false);
    localStorage.setItem("ramenpaitan_consent", "false");
    setConsentOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1 — STICKY NAVIGATION HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          {/* Logo */}
          <a
            href="#"
            className="text-lg font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5"
          >
            <span className="text-red-600">🍜</span> RamenPaitan.Plg
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a
              href="#menu"
              className="hover:text-red-600 transition-colors"
            >
              Menu &amp; Harga
            </a>
            <a
              href="#lokasi"
              className="hover:text-red-600 transition-colors"
            >
              Lokasi Stand
            </a>
            <a
              href="#pesan"
              className="hover:text-red-600 transition-colors"
            >
              <span className="inline-flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" /> Pesan WA
              </span>
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 -mr-2 text-slate-700"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle navigation"
          >
            {mobileNavOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileNavOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-2">
            <a
              href="#menu"
              className="block text-sm font-medium text-slate-700 py-1.5 hover:text-red-600"
              onClick={() => setMobileNavOpen(false)}
            >
              Menu &amp; Harga
            </a>
            <a
              href="#lokasi"
              className="block text-sm font-medium text-slate-700 py-1.5 hover:text-red-600"
              onClick={() => setMobileNavOpen(false)}
            >
              Lokasi Stand
            </a>
            <a
              href="#pesan"
              className="block text-sm font-medium text-slate-700 py-1.5 hover:text-red-600"
              onClick={() => setMobileNavOpen(false)}
            >
              Pesan WA
            </a>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2 — HERO (Awareness & Siddiq)
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-gradient-to-br from-stone-50 via-orange-50/30 to-stone-50 py-16 sm:py-20 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left — Copy */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 text-xs font-semibold text-emerald-700">
                  <ShieldCheck className="h-3.5 w-3.5" /> 100% Halal — Tanpa
                  Mirin &amp; Sake
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                  Autentik Jepang,{" "}
                  <span className="text-red-600">100% Halal</span>{" "}
                  Palembang.
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg">
                  Kaldu ayam kolagen direbus 8 jam. Tanpa Mirin, Tanpa Sake,
                  Tanpa Kompromi. Kunjungi stand kami atau pesan via WhatsApp
                  untuk ambil sendiri (Self-Pickup).
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="#menu"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-lg font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 h-11 px-8 text-base bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20"
                  >
                    Lihat Menu &amp; Harga
                  </a>
                  <a
                    href="#lokasi"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-lg font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 h-11 px-8 text-base border border-slate-300 text-slate-700 hover:bg-slate-100 bg-white shadow-sm"
                  >
                    <MapPin className="h-4 w-4 mr-1.5" /> Lokasi Stand
                  </a>
                </div>
              </div>

              {/* Right — Image Placeholder */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-amber-100 via-orange-100 to-red-50 rounded-2xl border-2 border-dashed border-amber-300 flex flex-col items-center justify-center text-center p-8 shadow-inner">
                <ImageOff className="h-12 w-12 text-amber-400 mb-3" />
                <p className="text-sm font-bold text-amber-700">
                  Actual Photo of Tori Paitan Ramen
                </p>
                <p className="text-xs text-amber-600 mt-1">
                  (No Stock Images — Foto asli produk akan ditampilkan di sini)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 3 — TRANSPARENCY CATALOG (Consideration & Gharar Prevention)
        ═══════════════════════════════════════════════════════════════════ */}
        <section
          id="menu"
          className="py-16 sm:py-20 bg-white"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center space-y-2 mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Menu &amp; Simetri Informasi
              </h2>
              <p className="text-sm text-slate-500 max-w-xl mx-auto">
                Semua harga, bahan, dan deskripsi ditampilkan secara lengkap
                tanpa ada yang disembunyikan. Prinsip Zero Gharar.
              </p>
            </div>

            {/* Menu Card Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <Card
                  key={item.id}
                  className="flex flex-col border-slate-200 hover:shadow-md transition-shadow duration-200"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base font-bold text-slate-900">
                        {item.name}
                      </CardTitle>
                      <Badge
                        className={`${item.badgeClass} text-[10px] px-2 py-0.5 whitespace-nowrap flex items-center gap-1`}
                      >
                        {item.badgeIcon} {item.badge}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs text-slate-500 leading-relaxed mt-1">
                      {item.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-3">
                    {/* Price — completely transparent */}
                    <div className="bg-stone-50 border border-stone-200 rounded-lg p-3">
                      <p className="text-2xl font-extrabold text-red-600 tracking-tight">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Sudah termasuk PB1 10%. Bebas biaya siluman.
                      </p>
                    </div>

                    {/* Ingredients — Simetri Informasi */}
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Komposisi Bahan Lengkap:
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.ingredients}
                      </p>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-3 border-t border-stone-100">
                    <a
                      href="#pesan"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 h-8 px-3 text-xs w-full text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 bg-white shadow-sm"
                    >
                      <MessageCircle className="h-3.5 w-3.5 mr-1" /> Pesan
                      via WhatsApp
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Service Limitation Alert */}
            <div className="mt-10 bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-amber-800">
                  Keterbatasan Layanan Kami
                </h3>
                <p className="text-xs text-amber-700 leading-relaxed mt-1">
                  Demi menjaga kualitas mie agar tidak lembek, kami{" "}
                  <strong>tidak menggunakan ojek online pihak ketiga</strong>.
                  Pemesanan online hanya untuk{" "}
                  <strong>Self-Pickup (Ambil di tempat)</strong>. Mie dan kuah
                  akan dipisah dalam kemasan terpisah untuk menjaga tekstur.
                </p>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-10 max-w-2xl mx-auto">
              <h3 className="text-center text-lg font-bold text-slate-900 mb-4">
                Pertanyaan Umum
              </h3>
              <Accordion defaultValue="item-1" className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="space-y-0 divide-y divide-slate-100">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-sm font-semibold text-slate-800 px-5">
                      Apakah benar 100% Halal tanpa alkohol sama sekali?
                    </AccordionTrigger>
                    <AccordionContent className="text-xs text-slate-600 leading-relaxed px-5 pb-4">
                      Ya. Kami tidak menggunakan Mirin, Sake, atau bahan apapun
                      yang mengandung alkohol. Kaldu kami murni dari tulang dan
                      daging ayam yang direbus selama 8 jam. Kecap shoyu kami
                      menggunakan kecap Jepang non-alkohol yang telah
                      disertifikasi halal.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-sm font-semibold text-slate-800 px-5">
                      Kenapa tidak tersedia delivery via ojek online?
                    </AccordionTrigger>
                    <AccordionContent className="text-xs text-slate-600 leading-relaxed px-5 pb-4">
                      Mie ramen kami menggunakan mie segar yang akan menyerap
                      kuah dan menjadi lembek dalam hitungan menit. Kami tidak
                      ingin Anda menerima produk di bawah standar. Untuk
                      self-pickup, kami memisahkan mie dan kuah agar tetap
                      optimal saat disajikan di rumah Anda.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-sm font-semibold text-slate-800 px-5">
                      Apa yang dimaksud &quot;Harga sudah termasuk PB1 10%&quot;?
                    </AccordionTrigger>
                    <AccordionContent className="text-xs text-slate-600 leading-relaxed px-5 pb-4">
                      PB1 (Pajak Bangunan 1) adalah pajak restoran sebesar 10%
                      yang dikenakan oleh pemerintah. Harga yang tertera di menu
                      kami sudah termasuk pajak ini — tidak ada biaya tambahan
                      tersembunyi saat Anda membayar.
                    </AccordionContent>
                  </AccordionItem>
                </div>
              </Accordion>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 4 — OPERATIONAL TRANSPARENCY & LOCATION
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="lokasi" className="py-16 sm:py-20 bg-stone-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-2 mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Lokasi &amp; Jam Operasional
              </h2>
              <p className="text-sm text-slate-500">
                Informasi lengkap lokasi stand kami untuk kunjungan atau
                self-pickup.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="border-slate-200 shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                    {/* Left — Address */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                          <MapPin className="h-4.5 w-4.5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                            Alamat Stand
                          </p>
                          <p className="text-sm font-semibold text-slate-900">
                            Jl. Sudirman (Samping X), Palembang.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                          <Clock className="h-4.5 w-4.5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                            Jam Operasional
                          </p>
                          <p className="text-sm font-semibold text-slate-900">
                            Buka: 16:00 – 22:00 WIB
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Tutup setiap hari Senin.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right — Live Status */}
                    <div className="p-6 flex flex-col items-center justify-center text-center space-y-3 bg-slate-50/50">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Status Saat Ini
                      </p>
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold ${
                          storeStatus.isOpen
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-full animate-pulse-dot ${
                            storeStatus.isOpen ? "bg-emerald-500" : "bg-red-500"
                          }`}
                        />
                        {storeStatus.label}
                      </div>
                      <p className="text-[10px] text-slate-400">
                        Status berdasarkan waktu perangkat Anda.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 5 — ETHICAL CONVERSION (WhatsApp CTA)
        ═══════════════════════════════════════════════════════════════════ */}
        <section
          id="pesan"
          className="py-16 sm:py-20 bg-gradient-to-br from-red-600 via-red-600 to-orange-600"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Pesan Sekarang via WhatsApp
            </h2>
            <p className="text-sm sm:text-base text-red-100 max-w-lg mx-auto leading-relaxed">
              Klik tombol di bawah untuk langsung terhubung ke WhatsApp kami.
              Sampaikan pesanan Anda dan ambil langsung di stand kami
              (Self-Pickup).
            </p>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap bg-white text-red-600 hover:bg-red-50 font-extrabold text-base px-8 py-6 shadow-xl shadow-red-900/20 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              <MessageCircle className="h-5 w-5 mr-2" /> Pesan via WhatsApp
            </a>

            <p className="text-[11px] text-red-200">
              Anda akan diarahkan ke WhatsApp dengan template pesan otomatis.
              <br />
              Tidak ada transaksi uang di website ini — pembayaran dilakukan
              langsung di stand.
            </p>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════ */}
      <footer className="bg-slate-900 text-slate-400 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 text-xs">
            <div className="space-y-2">
              <p className="font-bold text-white text-sm">🍜 RamenPaitan.Plg</p>
              <p className="leading-relaxed">
                Ramen Tori Paitan 100% Halal di Palembang. Kaldu kolagen ayam 8
                jam tanpa alkohol.
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-slate-300">Lokasi</p>
              <p>Jl. Sudirman (Samping X), Palembang</p>
              <p>Buka 16:00 – 22:00 WIB (Tutup Senin)</p>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-slate-300">Kontak</p>
              <p>WhatsApp: +62 811-1222-333</p>
              <p>Instagram: @ramenpaitan.plg</p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800 text-center text-[10px] text-slate-500 space-y-1">
            <p>&copy; 2024 RamenPaitan.Plg. Seluruh harga dan informasi bahan di halaman ini bersifat transparan dan mengikat.</p>
            <p>Halaman ini tidak memproses transaksi keuangan apapun.</p>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6 — CONSENT VAULT (Data Ethics Dialog)
      ═══════════════════════════════════════════════════════════════════ */}
      <Dialog open={consentOpen} onOpenChange={setConsentOpen}>
        <DialogContent className="sm:max-w-md bg-white border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-slate-900">
              Persetujuan Pelacakan Digital
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 leading-relaxed">
              Kami tidak melacak data Anda secara diam-diam. Izinkan kami
              menggunakan analitik anonim hanya untuk mengukur efektivitas klik
              tombol WhatsApp kami?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto text-xs font-semibold"
              onClick={handleConsentReject}
            >
              Tolak Semua
            </Button>
            <Button
              size="sm"
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
              onClick={handleConsentAccept}
            >
              Saya Izinkan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
