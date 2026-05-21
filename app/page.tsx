"use client";

import * as React from "react";
import Image from "next/image";
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
  ImageOff,
  ArrowRight,
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

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
  image: string;
}

const menuItems: MenuItem[] = [
  {
    id: "signature-tori-paitan",
    name: "Signature Tori Paitan",
    price: 35000,
    badge: "Best Seller",
    badgeIcon: <Star className="h-3 w-3" />,
    badgeClass: "bg-primary/10 text-primary border-primary/20",
    ingredients:
      "Mie lurus kecil, kuah kaldu ayam pekat 8 jam, ayam chashu halal, jamur kikurage, daun bawang, nori.",
    description:
      "Ramen signature kami. Kaldu kolagen ayam yang direbus 8 jam menghasilkan kuah creamy kental penuh umami — gurih alami.",
    image: "/images/ramen/ramen-bowl-angle.jpg",
  },
  {
    id: "spicy-tantanmen",
    name: "Spicy Tantanmen",
    price: 38000,
    badge: "Pedas Nendang",
    badgeIcon: <Flame className="h-3 w-3" />,
    badgeClass: "bg-primary/10 text-primary border-primary/20",
    ingredients:
      "Mie keriting tebal, kuah kaldu ayam pedas, daging ayam cincang berbumbu, pak choy, wijen sangrai, cabai kering.",
    description:
      "Varian pedas dengan wijen gurih dan bumbu tantanmen otentik. Level pedas tidak dapat dikustomisasi.",
    image: "/images/ramen/ramen-kitchen-result.jpg",
  },
  {
    id: "shoyu-ramen",
    name: "Shoyu Ramen Classic",
    price: 32000,
    badge: "Aman untuk Anak",
    badgeIcon: <Baby className="h-3 w-3" />,
    badgeClass: "bg-success-trust/10 text-success-trust border-success-trust/20",
    ingredients:
      "Mie lurus kecil, kuah kaldu ayam shoyu halal, telur ajitama setengah matang, nori, jagung manis, daun bawang.",
    description:
      "Ramen kuah shoyu bening yang ringan. Cita rasa umami halus yang sangat disukai anak-anak dan keluarga.",
    image: "/images/ramen/ramen-broth-closeup.jpg",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   ANATOMI HALAL COMPARISON DATA
───────────────────────────────────────────────────────────────────────────── */

interface ComparisonCardData {
  title: string;
  traditionalName: string;
  traditionalDesc: string;
  halalName: string;
  halalDesc: string;
}

const comparisonCards: ComparisonCardData[] = [
  {
    title: "Kaldu (Broth)",
    traditionalName: "Tonkotsu (Tulang Babi) & MSG",
    traditionalDesc: "Kaldu tulang babi atau pengental sintetis & MSG berlebih.",
    halalName: "Tori Paitan",
    halalDesc: "Tulang ayam segar bersertifikat syar'i yang direbus selama 8 jam hingga kolagen alami mengental.",
  },
  {
    title: "Rasa Gurih & Manis",
    traditionalName: "Mirin & Sake (Alkohol)",
    traditionalDesc: "Alkohol fermentasi yang digunakan untuk aroma manis-gurih dalam masakan Jepang.",
    halalName: "Reduksi Apel & Jamur Shiitake",
    halalDesc: "Reduksi ekstrak apel Fuji matang, kaldu jamur shiitake kering, dan madu hutan murni.",
  },
  {
    title: "Minyak Gurih (Rich Oil)",
    traditionalName: "Lard (Lemak Babi)",
    traditionalDesc: "Lemak babi yang digunakan untuk menciptakan rasa gurih berminyak standar pada ramen.",
    halalName: "Minyak Lemak Ayam (Schmaltz)",
    halalDesc: "Lemak kulit ayam yang dicairkan perlahan pada suhu rendah untuk rasa gurih yang bersih.",
  },
  {
    title: "Shoyu (Kecap Asin)",
    traditionalName: "Shoyu Konvensional",
    traditionalDesc: "Kecap asin fermentasi Jepang yang mengandung residu alkohol/etanol aktif.",
    halalName: "Shoyu Halal MUI",
    halalDesc: "Shoyu bersertifikat 100% Halal MUI dengan 0.0% kandungan alkohol sejak awal.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   INGREDIENTS GRID DATA
───────────────────────────────────────────────────────────────────────────── */

interface IngredientItem {
  icon: string;
  title: string;
  description: string;
}

const ingredientItems: IngredientItem[] = [
  {
    icon: "🍗",
    title: "Ayam Syar'i",
    description: "Tulang ayam segar bersertifikat, direbus selama 8 jam.",
  },
  {
    icon: "🍎",
    title: "Ekstrak Apel Fuji",
    description: "Rasa manis alami, tanpa alkohol fermentasi.",
  },
  {
    icon: "🍄",
    title: "Kaldu Shiitake",
    description: "Jamur shiitake kering premium untuk rasa gurih mendalam.",
  },
  {
    icon: "🍯",
    title: "Madu Hutan",
    description: "Pemanis alami murni tanpa proses tambahan.",
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

  // Image load states & fallbacks
  const [heroImageError, setHeroImageError] = React.useState(false);
  const [failedImages, setFailedImages] = React.useState<Record<string, boolean>>({});

  // Status Buka/Tutup
  const [currentStatus, setCurrentStatus] = React.useState<{ open: boolean; text: string }>({
    open: false,
    text: "Memuat Status...",
  });

  // Scroll reveal setup
  React.useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      const allElements = document.querySelectorAll(".reveal-on-scroll, .reveal-stagger");
      allElements.forEach((el) => el.classList.add("reveal-active"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            const children = entry.target.querySelectorAll(".reveal-stagger");
            children.forEach((child, index) => {
              (child as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
              child.classList.add("reveal-active");
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const revealTargets = document.querySelectorAll(".reveal-on-scroll");
    revealTargets.forEach((target) => observer.observe(target));

    return () => {
      revealTargets.forEach((target) => observer.unobserve(target));
    };
  }, []);

  // Time calculations and storage consent
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
    <div className="flex-1 flex flex-col bg-bg-warm text-text-primary font-sans relative">
      {/* HEADER NAV */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20 h-16 flex items-center justify-between">
          <a
            href="#"
            className="font-serif font-bold text-2xl tracking-tight text-secondary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md"
          >
            MenDa
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-text-muted">
            <a
              href="#anatomi"
              className="relative py-1 hover:text-accent transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              Bukti Halal
            </a>
            <a
              href="#menu"
              className="relative py-1 hover:text-accent transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              Menu &amp; Harga
            </a>
            <a
              href="#lokasi"
              className="relative py-1 hover:text-accent transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              Lokasi Stand
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary hover:text-[#A84A2D] transition-colors font-bold"
            >
              <Phone className="h-4 w-4" /> Pesan WA
            </a>
          </nav>

          <button
            className="md:hidden p-2 -mr-2 text-secondary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent rounded-lg"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle menu"
          >
            {mobileNavOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileNavOpen && (
          <div className="md:hidden bg-white border-t border-stone-200 px-6 py-4 space-y-3 font-semibold shadow-md">
            <a
              href="#anatomi"
              className="block py-2 text-secondary hover:text-primary transition-colors"
              onClick={() => setMobileNavOpen(false)}
            >
              Bukti Halal
            </a>
            <a
              href="#menu"
              className="block py-2 text-secondary hover:text-primary transition-colors"
              onClick={() => setMobileNavOpen(false)}
            >
              Menu &amp; Harga
            </a>
            <a
              href="#lokasi"
              className="block py-2 text-secondary hover:text-primary transition-colors"
              onClick={() => setMobileNavOpen(false)}
            >
              Lokasi Stand
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-primary font-bold hover:text-[#A84A2D] transition-colors"
              onClick={() => setMobileNavOpen(false)}
            >
              Pesan via WA
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION — FULL REDESIGN */}
      <section className="relative w-full h-[100vh] min-h-[600px] overflow-hidden flex items-end">
        {/* Background Visual (Image with requested styles) */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#2C3E50]">
          {!heroImageError ? (
            <Image
              src="/images/ramen/ramen-hero.jpg"
              alt="Mangkuk ramen Tori Paitan Nutri Saji — kaldu ayam creamy dengan topping chashu dan nori"
              fill
              priority
              className="object-cover object-center animate-hero-bg opacity-35"
              onError={() => setHeroImageError(true)}
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center animate-hero-bg opacity-35"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 60% 50%, #C75B39 0%, #2C3E50 80%)",
              }}
            />
          )}
          {/* Subtle Vignette at corners */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
        </div>

        {/* Full-bleed Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/90 via-secondary/65 to-secondary/25 z-10" />

        {/* Content Positioning (Left-aligned, bottom-left text block) */}
        <div className="relative z-20 w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20 pb-20 md:pb-24">
          <div className="max-w-[600px] space-y-6 text-left animate-hero-text">
            {/* Trust Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-accent" /> 100% Bersertifikat Halal
            </div>

            {/* H1 Headline */}
            <h1 className="text-[36px] sm:text-[48px] md:text-[56px] font-bold leading-[1.15] tracking-[-0.02em] text-white">
              Ramen <br />
              Tori Paitan 100% Halal Palembang
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-lg font-normal leading-[1.7] text-white/90">
              Kami membedah anatomi ramen secara transparan. Tanpa babi, tanpa lemak babi (lard), tanpa mirin, tanpa sake. Umami maksimal dari 100% bahan thayyib.
            </p>

            {/* Actions & Micro-text */}
            <div className="space-y-4 pt-2">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-[#A84A2D] active:scale-95 text-white font-bold text-base px-9 py-4 rounded-xl shadow-primary-btn hover:shadow-primary-btn-hover hover:scale-[1.03] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {/* WhatsApp Logo green color background inline path */}
                <svg
                  className="h-5 w-5 fill-current text-[#25D366]"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.022-.08-.085-.184-.245-.26-.159-.077-.945-.467-1.092-.518-.147-.052-.254-.078-.36.078-.106.156-.41.518-.5.618-.09.1-.18.112-.34.034a3.785 3.785 0 0 1-1.258-.777 4.148 4.148 0 0 1-.87-1.084c-.1-.173-.01-.266.075-.35.077-.076.16-.184.24-.277.078-.09.105-.15.158-.25.05-.1.025-.19-.012-.267-.038-.077-.36-.865-.492-1.183-.128-.31-.26-.268-.36-.273-.098-.005-.212-.005-.326-.005a.63.63 0 0 0-.457.213c-.156.17-.597.583-.597 1.42 0 .838.61 1.65.696 1.77.086.12 1.2 1.83 2.9 2.562.404.175.72.28 1.0.37.406.128.775.11 1.066.067.324-.047 1.002-.41 1.144-.807.142-.397.142-.736.1-.807zM12 2C6.477 2 2 6.477 2 12a9.96 9.96 0 0 0 1.956 5.922L2 22l4.238-1.895A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
                Pesan via WhatsApp
              </a>
              <span className="text-xs sm:text-sm text-white/70 block pl-1">
                Hanya ambil sendiri (self-pickup) — Dijamin hangat &amp; segar dari dapur terbuka kami.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* HALAL COMPARISON SECTION — TABLE REDESIGN */}
      <section
        id="anatomi"
        className="py-[50px] md:py-[70px] lg:py-[100px] bg-bg-warm border-y border-stone-200/80 reveal-on-scroll"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-[28px] md:text-[36px] font-semibold tracking-[-0.01em] text-secondary">
              Pemisahan Radikal Halal &amp; Syubhat
            </h2>
            <p className="text-base md:text-lg text-text-muted max-w-[700px] mx-auto leading-relaxed">
              Kami mengganti semua bahan haram dan syubhat dengan alternatif alami bersertifikat halal untuk ketenangan pikiran Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comparisonCards.map((card, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-8 shadow-secondary-card hover:shadow-secondary-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-stone-200/50 reveal-stagger"
              >
                {/* 4px top border - Left (Haram) uses red, Right (Halal) uses primary */}
                <div className="absolute top-0 inset-x-0 h-1 flex">
                  <div className="w-1/2 bg-error-warning-muted" />
                  <div className="w-1/2 bg-primary" />
                </div>

                <h3 className="text-xl font-bold text-secondary mb-6 border-b border-stone-100 pb-3">
                  {card.title}
                </h3>

                <div className="grid grid-cols-2 gap-6 divide-x divide-stone-100">
                  {/* Left Column (Traditional) */}
                  <div className="space-y-3.5 pr-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-error-warning-muted">
                      Ramen Biasa
                    </div>
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-red-50 text-error-warning-muted">
                      <XCircle className="h-4.5 w-4.5" />
                    </div>
                    <p className="text-[13px] font-semibold line-through text-text-muted leading-relaxed">
                      {card.traditionalName}
                    </p>
                    <p className="text-[12px] text-text-muted/80 leading-relaxed">
                      {card.traditionalDesc}
                    </p>
                  </div>

                  {/* Right Column (Nutri Saji) */}
                  <div className="space-y-3.5 pl-6">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-primary">
                      Nutri Saji
                    </div>
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-50 text-primary">
                      <CheckCircle className="h-4.5 w-4.5" />
                    </div>
                    <p className="text-[13px] font-bold text-text-primary leading-relaxed">
                      {card.halalName}
                    </p>
                    <p className="text-[12px] text-text-primary leading-relaxed">
                      {card.halalDesc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INGREDIENT TRANSPARENCY — ICON GRID */}
      <section className="py-[50px] md:py-[70px] lg:py-[100px] bg-white reveal-on-scroll">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-[28px] md:text-[36px] font-semibold tracking-[-0.01em] text-secondary">
              Bahan Baku di Mangkok Anda
            </h2>
            <p className="text-base md:text-lg text-text-muted max-w-[600px] mx-auto leading-relaxed">
              Setiap bahan baku alami, kehalalannya dapat dilacak, dan telah bersertifikat.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ingredientItems.map((item, idx) => (
              <div
                key={idx}
                className="text-center space-y-4 p-6 rounded-2xl hover:bg-stone-50/50 transition-colors duration-300 reveal-stagger"
              >
                <div className="h-16 w-16 rounded-full bg-bg-warm flex items-center justify-center text-3xl mx-auto shadow-inner">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-secondary">{item.title}</h3>
                <p className="text-sm text-text-muted max-w-[200px] mx-auto leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPARENCY CATALOG (MENU) */}
      <section
        id="menu"
        className="py-[50px] md:py-[70px] lg:py-[100px] bg-bg-warm border-t border-stone-200/80 reveal-on-scroll"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-[28px] md:text-[36px] font-semibold tracking-[-0.01em] text-secondary">
              Menu &amp; Simetri Informasi
            </h2>
            <p className="text-base md:text-lg text-text-muted max-w-[600px] mx-auto leading-relaxed">
              Harga nett transparan tanpa biaya siluman. Rincian bahan tertulis lengkap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <Card
                key={item.id}
                className="flex flex-col border-stone-200 bg-white rounded-2xl shadow-secondary-card hover:shadow-secondary-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden reveal-stagger"
              >
                {!failedImages[item.image] && (
                  <div className="relative w-full aspect-[4/3] bg-stone-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={() => setFailedImages((prev) => ({ ...prev, [item.image]: true }))}
                    />
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-xl font-bold text-secondary leading-tight">
                      {item.name}
                    </CardTitle>
                    <Badge
                      className={`${item.badgeClass} rounded-lg text-[10px] px-2.5 py-1 whitespace-nowrap flex items-center gap-1.5 shrink-0`}
                    >
                      {item.badgeIcon} {item.badge}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm text-text-muted mt-2 leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  <div className="bg-bg-warm border border-stone-200/60 rounded-xl p-4">
                    <p className="text-2xl font-extrabold text-primary tracking-tight">
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>
                    <p className="text-[10px] text-text-muted mt-1 leading-normal font-medium">
                      Harga sudah termasuk Pajak Restoran (PB1). Tidak ada biaya siluman.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                      Komposisi:
                    </p>
                    <p className="text-sm text-text-primary leading-relaxed">
                      {item.ingredients}
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 border-t border-stone-100">
                  <a
                    href="#pesan"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-xl font-bold transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent h-10 px-4 text-sm w-full text-primary border border-primary/20 hover:bg-orange-50/50 hover:border-primary/40 bg-white shadow-xs"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" /> Pesan via WhatsApp
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>

          <p className="text-center text-sm font-semibold text-text-muted mt-8">
            Harga sudah termasuk Pajak Restoran (PB1). Tidak ada biaya siluman.
          </p>

          {/* DELIVER ALERT (GHARAR PREVENTION) */}
          <div className="mt-12 max-w-[800px] mx-auto bg-amber-50 border border-amber-200/80 rounded-2xl p-6 flex gap-4 items-start reveal-stagger">
            <AlertTriangle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-secondary">Batas Layanan Kami</h3>
              <p className="text-sm text-text-primary leading-relaxed">
                Mie ramen segar cepat mengembang jika didiamkan lama, dan kuah harus dinikmati panas. Kami <strong>TIDAK bekerja sama dengan Ojek Online pihak ketiga</strong> untuk menjaga mutu rasa. Kami hanya melayani <strong>Makan di Tempat (Dine-in)</strong> dan <strong>Ambil Sendiri (Self-Pickup)</strong> dengan pemesanan di muka via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OPEN KITCHEN / TRANSPARENCY SECTION */}
      <section className="py-[50px] md:py-[70px] lg:py-[100px] bg-secondary text-white reveal-on-scroll">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            {/* Left Side (55% width on desktop) */}
            <div className="md:col-span-7 reveal-stagger">
              <div className="relative aspect-[4/3] bg-stone-850 rounded-2xl overflow-hidden border border-stone-700/80 shadow-inner group">
                <div className="absolute inset-0 bg-gradient-to-br from-stone-700 to-slate-900 opacity-90 transition-transform duration-500 group-hover:scale-105" />
                <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center p-8">
                  <Utensils className="h-12 w-12 text-accent mb-3 opacity-80" />
                  <p className="text-sm font-bold text-white uppercase tracking-wider">
                    Foto Kedai &amp; Dapur Terbuka
                  </p>
                  <p className="text-xs text-stone-300 mt-1">📸 Foto Asli Segera Hadir</p>
                </div>

                {/* Floating Badge */}
                <div className="absolute bottom-4 right-4 z-10 bg-white text-secondary font-bold text-xs px-4 py-2.5 rounded-lg shadow-kitchen-badge">
                  🔥 Dapur Terbuka — Saksikan Kami Memasak
                </div>
              </div>
            </div>

            {/* Right Side (45% width on desktop) */}
            <div className="md:col-span-5 space-y-6 text-left reveal-stagger">
              <div className="text-xs font-bold uppercase tracking-widest text-accent">
                Transparansi
              </div>
              <h2 className="text-[28px] md:text-[36px] font-semibold tracking-[-0.01em] text-white">
                Bersih, Transparan, Disaksikan Langsung
              </h2>
              <p className="text-base md:text-[18px] font-normal leading-[1.7] text-white/85">
                Kami menyajikan setiap mangkok hangat langsung dari dapur terbuka kami. Proses pengerjaan bersih, higienis, transparan, dan dapat disaksikan langsung.
              </p>

              <div className="space-y-4.5 pt-2 border-t border-stone-700/50">
                <div className="flex gap-3.5 items-start text-sm">
                  <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span>Jl. Sudirman (Samping X), Palembang</span>
                </div>
                <div className="flex gap-3.5 items-start text-sm">
                  <Clock className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-semibold text-white">Selasa — Minggu: 16:00 — 22:00 WIB</p>
                    <p className="text-xs text-white/60">Tutup setiap hari Senin.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPERATIONAL INFO STATUS */}
      <section id="lokasi" className="py-[50px] md:py-[70px] lg:py-[100px] bg-white reveal-on-scroll">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20">
          <div className="max-w-[600px] mx-auto text-center space-y-6">
            <h2 className="text-[28px] md:text-[36px] font-semibold tracking-[-0.01em] text-secondary">
              Status Kedai Hari Ini
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              Silakan periksa apakah stand kami sedang melayani pesanan saat ini.
            </p>

            <div
              className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-base font-bold border ${
                currentStatus.open
                  ? "bg-emerald-50 text-success-trust border-success-trust/20"
                  : "bg-red-50/50 text-error-warning-muted border-error-warning-muted/20"
              }`}
            >
              <span
                className={`h-3 w-3 rounded-full ${
                  currentStatus.open ? "bg-success-trust animate-pulse-dot" : "bg-error-warning-muted"
                }`}
              />
              {currentStatus.text}
            </div>

            <p className="text-xs text-text-muted">
              Pemesanan WhatsApp hanya dilayani saat jam operasional di atas berjalan.
            </p>
          </div>
        </div>
      </section>

      {/* ORDERING / CTA SECTION */}
      <section
        id="pesan"
        className="py-[100px] bg-bg-warm border-t border-stone-200/80 text-center reveal-on-scroll"
      >
        <div className="max-w-[700px] mx-auto px-6 md:px-10 lg:px-20 space-y-6">
          <h2 className="text-[28px] md:text-[36px] font-semibold tracking-[-0.01em] text-secondary">
            Siap Mencicipi Ramen Halal yang Sebenarnya?
          </h2>
          <p className="text-base md:text-lg text-text-primary leading-relaxed">
            Pemesanan melalui WhatsApp hanya dilayani selama jam operasional. Ambil di kedai kami untuk memastikan tekstur mie yang sempurna dan kaldu yang hangat.
          </p>

          <div className="pt-4 reveal-stagger">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-[#A84A2D] text-white font-semibold text-lg px-12 py-4.5 rounded-xl shadow-primary-cta hover:shadow-primary-cta-hover hover:scale-[1.05] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <svg
                className="h-6 w-6 fill-current text-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.022-.08-.085-.184-.245-.26-.159-.077-.945-.467-1.092-.518-.147-.052-.254-.078-.36.078-.106.156-.41.518-.5.618-.09.1-.18.112-.34.034a3.785 3.785 0 0 1-1.258-.777 4.148 4.148 0 0 1-.87-1.084c-.1-.173-.01-.266.075-.35.077-.076.16-.184.24-.277.078-.09.105-.15.158-.25.05-.1.025-.19-.012-.267-.038-.077-.36-.865-.492-1.183-.128-.31-.26-.268-.36-.273-.098-.005-.212-.005-.326-.005a.63.63 0 0 0-.457.213c-.156.17-.597.583-.597 1.42 0 .838.61 1.65.696 1.77.086.12 1.2 1.83 2.9 2.562.404.175.72.28 1.0.37.406.128.775.11 1.066.067.324-.047 1.002-.41 1.144-.807.142-.397.142-.736.1-.807zM12 2C6.477 2 2 6.477 2 12a9.96 9.96 0 0 0 1.956 5.922L2 22l4.238-1.895A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
              Hubungi Kami di WhatsApp
            </a>
          </div>

          <p className="text-xs md:text-sm text-text-muted leading-relaxed max-w-md mx-auto">
            Pemesanan aman &amp; halal. Tanpa perantara pihak ketiga. Pembayaran tunai/non-tunai langsung saat pengambilan.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-secondary text-white/70 py-12 border-t border-stone-800 text-sm">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-20 text-center space-y-4">
          <p className="font-serif font-bold text-white text-2xl">MenDa</p>
          <p className="text-white/60">100% Halal Tori Paitan Ramen, Palembang.</p>
          <p className="text-xs text-white/45 max-w-md mx-auto leading-relaxed">
            Seluruh data bahan, nutrisi, dan harga yang tertera bersifat transparan sebagai bentuk komitmen syariah kami terhadap kejelasan akad jual beli.
          </p>
          <p className="text-[11px] text-white/30 pt-4 border-t border-stone-800">
            &copy; 2026 MenDa. Hak cipta dilindungi undang-undang.
          </p>
        </div>
      </footer>

      {/* MOBILE STICKY CTA (CRITICAL) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-stone-200 shadow-sticky-cta z-30 flex items-center">
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-full flex items-center justify-between px-6 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent"
        >
          <div className="flex items-center gap-3">
            <svg
              className="h-7 w-7 fill-current text-[#25D366]"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.022-.08-.085-.184-.245-.26-.159-.077-.945-.467-1.092-.518-.147-.052-.254-.078-.36.078-.106.156-.41.518-.5.618-.09.1-.18.112-.34.034a3.785 3.785 0 0 1-1.258-.777 4.148 4.148 0 0 1-.87-1.084c-.1-.173-.01-.266.075-.35.077-.076.16-.184.24-.277.078-.09.105-.15.158-.25.05-.1.025-.19-.012-.267-.038-.077-.36-.865-.492-1.183-.128-.31-.26-.268-.36-.273-.098-.005-.212-.005-.326-.005a.63.63 0 0 0-.457.213c-.156.17-.597.583-.597 1.42 0 .838.61 1.65.696 1.77.086.12 1.2 1.83 2.9 2.562.404.175.72.28 1.0.37.406.128.775.11 1.066.067.324-.047 1.002-.41 1.144-.807.142-.397.142-.736.1-.807zM12 2C6.477 2 2 6.477 2 12a9.96 9.96 0 0 0 1.956 5.922L2 22l4.238-1.895A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
            </svg>
            <span className="text-base font-semibold text-secondary">
              Pesan Ramen Sekarang
            </span>
          </div>
          <ArrowRight className="h-5 w-5 text-secondary" />
        </a>
      </div>

      {/* CONSENT VAULT DIALOG */}
      <Dialog open={consentOpen} onOpenChange={setConsentOpen}>
        <DialogContent className="sm:max-w-md bg-white border-stone-200 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-secondary">
              Persetujuan Pelacakan Digital
            </DialogTitle>
            <DialogDescription className="text-xs text-text-muted leading-relaxed">
              Kami menghormati privasi Anda. Izinkan kami merekam statistik anonim (tanpa identitas pribadi) hanya untuk memantau tombol WhatsApp yang diklik pengunjung?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-end">
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto text-xs font-semibold text-text-muted"
              onClick={() => handleConsent(false)}
            >
              Tolak Semua
            </Button>
            <Button
              size="sm"
              className="w-full sm:w-auto bg-primary hover:bg-[#A84A2D] text-white text-xs font-semibold sm:ml-2"
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
