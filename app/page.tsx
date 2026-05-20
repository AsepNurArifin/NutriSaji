"use client";

import * as React from "react";
import {
  MapPin,
  Clock,
  MessageCircle,
  Utensils,
  AlertTriangle,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Star,
  Phone,
  Menu as MenuIcon,
  X,
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
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* ─────────────────────────────────────────────────────────────────────────────
   DATA LAYER
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
      "Ramen signature kami. Kaldu kolagen ayam yang direbus 8 jam menghasilkan kuah creamy kental penuh umami — gurih alami.",
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
      "Varian pedas dengan wijen gurih dan bumbu tantanmen otentik. Level pedas tidak dapat dikustomisasi.",
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
      "Ramen kuah shoyu bening yang ringan. Cita rasa umami halus yang sangat disukai anak-anak dan keluarga.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   ANATOMI HALAL COMPARISON DATA
───────────────────────────────────────────────────────────────────────────── */

interface ComparisonRow {
  component: string;
  haramSpec: string;
  halalSpec: string;
}

const comparisonData: ComparisonRow[] = [
  {
    component: "Kaldu (Broth)",
    haramSpec: "Tonkotsu (Tulang Babi) / Pengental sintetis & MSG berlebih.",
    halalSpec: "Tori Paitan. Tulang ayam segar bersertifikat potong syar'i direbus selama 8 jam hingga kolagen alami mengental.",
  },
  {
    component: "Umami & Manis",
    haramSpec: "Mirin & Sake (Alkohol) untuk aroma manis-gurih khas Jepang.",
    halalSpec: "Reduksi sari apel fuji matang, kaldu jamur shiitake kering, dan madu hutan murni.",
  },
  {
    component: "Minyak Gurih (Oil)",
    haramSpec: "Lard (Minyak Babi) untuk menghasilkan rasa berminyak yang gurih di bibir.",
    halalSpec: "Chicken Schmaltz (Minyak lemak kulit ayam yang dicairkan perlahan dengan suhu rendah).",
  },
  {
    component: "Shoyu (Kecap Asin)",
    haramSpec: "Kecap asin fermentasi konvensional dengan residu alkohol/etanol.",
    halalSpec: "Shoyu 100% tersertifikasi Halal MUI dengan kadar alkohol 0.0% sejak awal proses.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   WHATSAPP CONFIG
───────────────────────────────────────────────────────────────────────────── */

const WA_URL =
  "https://wa.me/628111222333?text=Halo%20RamenPaitan%2C%20saya%20sudah%20membaca%20anatomi%20halal%20di%20website.%20Saya%20ingin%20memesan%20untuk%20Ambil%20Sendiri...";

export default function LandingPage() {
  const [consentOpen, setConsentOpen] = React.useState(false);
  const [trackingConsent, setTrackingConsent] = React.useState<boolean | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  // Status Buka/Tutup
  const [currentStatus, setCurrentStatus] = React.useState<{ open: boolean; text: string }>({
    open: false,
    text: "Memuat Status...",
  });

  // Load consent settings after 3 seconds
  React.useEffect(() => {
    const getStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 1 = Senin
      const hour = now.getHours();
      if (day === 1) return { open: false, text: "Tutup (Senin Libur)" };
      if (hour >= 16 && hour < 22) return { open: true, text: "Buka Sekarang (16:00 - 22:00)" };
      return { open: false, text: "Tutup (Buka 16:00 - 22:00)" };
    };
    setCurrentStatus(getStatus());

    const stored = localStorage.getItem("ramen_consent_allowed");
    if (stored !== null) {
      setTrackingConsent(stored === "true");
      return;
    }
    const timer = setTimeout(() => {
      setConsentOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleConsent = (allow: boolean) => {
    setTrackingConsent(allow);
    localStorage.setItem("ramen_consent_allowed", allow ? "true" : "false");
    setConsentOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-stone-50 text-slate-900 font-sans">
      {/* HEADER NAV */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <a href="#" className="font-extrabold text-base tracking-tight flex items-center gap-2">
            <span className="text-red-600">🍜</span> RamenPaitan.Plg
          </a>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <a href="#anatomi" className="hover:text-red-600 transition-colors">Bukti Halal</a>
            <a href="#menu" className="hover:text-red-600 transition-colors">Menu &amp; Harga</a>
            <a href="#lokasi" className="hover:text-red-600 transition-colors">Lokasi Stand</a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="hover:text-red-600 text-red-600 flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" /> Pesan WA
            </a>
          </nav>

          <button 
            className="md:hidden p-2 -mr-2 text-slate-700"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileNavOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-2 font-semibold">
            <a href="#anatomi" className="block py-1.5 text-slate-700" onClick={() => setMobileNavOpen(false)}>Bukti Halal</a>
            <a href="#menu" className="block py-1.5 text-slate-700" onClick={() => setMobileNavOpen(false)}>Menu &amp; Harga</a>
            <a href="#lokasi" className="block py-1.5 text-slate-700" onClick={() => setMobileNavOpen(false)}>Lokasi Stand</a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="block py-1.5 text-red-600" onClick={() => setMobileNavOpen(false)}>Pesan WA</a>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-orange-50/50 to-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column (Aggressive Honesty) */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold text-emerald-700">
                <ShieldCheck className="h-4 w-4" /> 100% Halal Tanpa Keraguan (Syubhat)
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Ramen Autentik Jepang.<br />
                <span className="text-red-600">100% Halal Tanpa Syubhat.</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Kami membongkar anatomi ramen. Tanpa Babi, Tanpa Lard, Tanpa Mirin, Tanpa Sake. Rasa umami maksimal berasal dari bahan-bahan yang 100% thayyib.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="#anatomi"
                  className="inline-flex items-center justify-center rounded-lg font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 h-11 px-8 text-base bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/10"
                >
                  Lihat Bukti Halal Kami
                </a>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 h-11 px-8 text-base border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 shadow-xs"
                >
                  Pesan via WhatsApp
                </a>
              </div>
            </div>

            {/* Right Column (Image Placeholder) */}
            <div className="relative aspect-[4/3] bg-amber-50 border-2 border-dashed border-amber-300 rounded-2xl flex flex-col items-center justify-center text-center p-6 shadow-inner">
              <ImageOff className="h-10 w-10 text-amber-400 mb-3" />
              <p className="text-sm font-bold text-amber-800">Actual Photo of Tori Paitan Ramen</p>
              <p className="text-xs text-amber-600/80 mt-1 max-w-xs leading-normal">
                (No Stock Images — Foto asli hidangan ramen langsung dari kedai kami di Palembang)
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CORE FEATURE: ANATOMI HALAL TRANSPARENCY MATRIX */}
      <section id="anatomi" className="py-16 sm:py-20 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Dekonstruksi Kaldu: Kenapa Kami Berbeda?
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto leading-normal">
              Kami memisahkan syubhat dan haram secara radikal, menggantinya dengan bahan alami bersertifikasi halal demi ketenangan bersantap Anda.
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-hidden border border-slate-200 rounded-xl bg-stone-50/50">
            <Table>
              <TableHeader className="bg-slate-100/80">
                <TableRow>
                  <TableHead className="w-1/4">Bagian Menu</TableHead>
                  <TableHead className="w-3/8 text-red-700 bg-red-50/40">Haram / Syubhat Tradisional</TableHead>
                  <TableHead className="w-3/8 text-emerald-800 bg-emerald-50/30">Solusi Halal RamenPaitan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-bold text-slate-950 text-xs sm:text-sm">{row.component}</TableCell>
                    <TableCell className="bg-red-50/10">
                      <div className="flex gap-2 items-start text-xs sm:text-sm text-slate-700">
                        <XCircle className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                        <span>{row.haramSpec}</span>
                      </div>
                    </TableCell>
                    <TableCell className="bg-emerald-50/10">
                      <div className="flex gap-2 items-start text-xs sm:text-sm text-slate-950 font-medium">
                        <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{row.halalSpec}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

        </div>
      </section>

      {/* TRANSPARENCY CATALOG (MENU) */}
      <section id="menu" className="py-16 sm:py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Menu &amp; Simetri Informasi
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto leading-normal">
              Harga nett transparan tanpa biaya siluman. Rincian bahan tertulis lengkap.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Card key={item.id} className="flex flex-col border-slate-200 bg-white">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base font-bold text-slate-950">{item.name}</CardTitle>
                    <Badge className={`${item.badgeClass} text-[10px] px-2 py-0.5 whitespace-nowrap flex items-center gap-1 shrink-0`}>
                      {item.badgeIcon} {item.badge}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 space-y-3">
                  <div className="bg-stone-50 border border-stone-200 rounded-lg p-3">
                    <p className="text-2xl font-extrabold text-red-600 tracking-tight">
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Harga sudah termasuk Pajak Restoran (PB1). Tidak ada biaya siluman.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Komposisi:</p>
                    <p className="text-xs text-slate-700 leading-relaxed">{item.ingredients}</p>
                  </div>
                </CardContent>

                <CardFooter className="pt-3 border-t border-stone-100">
                  <a
                    href="#pesan"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 h-8 px-3 text-xs w-full text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 bg-white shadow-xs"
                  >
                    <MessageCircle className="h-3.5 w-3.5 mr-1.5" /> Pesan via WhatsApp
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* DELIVER ALERT (GHARAR PREVENTION) */}
          <div className="mt-10 max-w-3xl mx-auto bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-3.5 items-start">
            <AlertTriangle className="h-5.5 w-5.5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-amber-800">Batas Layanan Kami</h3>
              <p className="text-xs text-amber-700 leading-relaxed">
                Mie ramen segar cepat mengembang jika didiamkan lama, dan kuah harus dinikmati panas. Kami <strong>TIDAK bekerja sama dengan Ojek Online pihak ketiga</strong> untuk menjaga mutu rasa. Kami hanya melayani <strong>Makan di Tempat (Dine-in)</strong> dan <strong>Ambil Sendiri (Self-Pickup)</strong> dengan pemesanan di muka via WhatsApp.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* OPERATIONAL INFO */}
      <section id="lokasi" className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto items-center">
            
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Kunjungi Kedai Kami</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Kami menyajikan semangkuk ramen panas dari dapur terbuka kami. Proses pembuatan bersih, transparan, dan dapat disaksikan langsung di tempat.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="h-9 w-9 bg-red-50 rounded-lg flex items-center justify-center text-red-600 shrink-0">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Alamat Kedai</p>
                    <p className="text-sm font-bold text-slate-900">Jl. Sudirman (Samping X), Palembang.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="h-9 w-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 shrink-0">
                    <Clock className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Waktu Buka</p>
                    <p className="text-sm font-bold text-slate-900">Selasa - Minggu: 16:00 - 22:00 WIB</p>
                    <p className="text-xs text-slate-500">Tutup setiap hari Senin.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-stone-50 border border-slate-200 p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status Kedai Hari Ini</p>
              
              <div className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-extrabold border ${
                currentStatus.open 
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                  : "bg-red-50 text-red-700 border-red-200"
              }`}>
                <span className={`h-2.5 w-2.5 rounded-full ${currentStatus.open ? "bg-emerald-500 animate-pulse-dot" : "bg-red-500"}`} />
                {currentStatus.text}
              </div>
              <p className="text-[10px] text-slate-400">
                Pemesanan WhatsApp hanya dilayani saat jam operasional di atas berjalan.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CONVERSION (WHATSAPP) */}
      <section id="pesan" className="py-16 sm:py-20 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Pesan Self-Pickup via WhatsApp</h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto leading-relaxed">
            Klik tombol di bawah untuk memesan ramen. Ambil sendiri ke kedai kami agar kualitas rasa mie dan kehangatan kaldu tetap terjaga sempurna.
          </p>

          <div className="pt-2">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-extrabold text-base px-8 py-6 rounded-xl shadow-xl shadow-red-900/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              <MessageCircle className="h-5.5 w-5.5 mr-2" /> Hubungi WhatsApp Kami
            </a>
          </div>
          
          <p className="text-[11px] text-slate-500 leading-normal">
            Pemesanan aman &amp; halal tanpa melalui portal transaksi pihak ketiga.
            <br />
            Pembayaran tunai/non-tunai dilakukan saat Anda mengambil ramen di stand.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-10 border-t border-slate-900 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-extrabold text-white text-sm">🍜 RamenPaitan.Plg</p>
            <p className="leading-relaxed">Kedai Ramen Tori Paitan 100% Halal Tanpa Syubhat. Palembang.</p>
          </div>
          <p className="text-center md:text-right text-[10px] text-slate-600 leading-normal max-w-xs">
            Seluruh data bahan, nutrisi, dan harga yang tertera bersifat transparan sebagai bentuk komitmen syariah kami terhadap kejelasan akad jual beli.
          </p>
        </div>
      </footer>

      {/* CONSENT VAULT DIALOG */}
      <Dialog open={consentOpen} onOpenChange={setConsentOpen}>
        <DialogContent className="sm:max-w-md bg-white border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-slate-950">
              Persetujuan Pelacakan Digital
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 leading-relaxed">
              Kami menghormati privasi Anda. Izinkan kami merekam statistik anonim (tanpa identitas pribadi) hanya untuk memantau tombol WhatsApp yang diklik pengunjung?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-end">
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto text-xs font-semibold text-slate-600"
              onClick={() => handleConsent(false)}
            >
              Tolak Semua
            </Button>
            <Button
              size="sm"
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white text-xs font-semibold sm:ml-2"
              onClick={() => handleConsent(true)}
            >
              Saya Izinkan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
