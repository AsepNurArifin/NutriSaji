"use client";

import * as React from "react";
import Image from "next/image";
import { 
  Activity, 
  AlertCircle, 
  Calendar, 
  Check, 
  CheckCircle2, 
  Clock, 
  Heart, 
  Info, 
  Lock, 
  MapPin, 
  RotateCcw, 
  ShieldCheck, 
  ShoppingBag, 
  Utensils, 
  Sparkles,
  Cookie,
  User,
  Phone,
  Home as HomeIcon
} from "lucide-react";

// Component imports
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dialog, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter,
  DialogClose 
} from "@/components/ui/dialog";
import { useTrackingConsent } from "@/context/tracking-consent";

// Define TypeScript interfaces for our states and plans
interface Plan {
  id: string;
  name: string;
  pricePerDay: number;
  calories: string;
  macros: {
    protein: string;
    carbs: string;
    fats: string;
  };
  allergens: string;
  ingredients: string;
  description: string;
}

const mealPlans: Plan[] = [
  {
    id: "weight-control",
    name: "Weight Control (Diet Defisit Kalori)",
    pricePerDay: 75000,
    calories: "1250 - 1350 kcal",
    macros: {
      protein: "90g - 95g",
      carbs: "100g - 110g",
      fats: "40g - 45g"
    },
    allergens: "Mengandung gluten, produk kedelai. Dapat mengandung jejak kacang tanah.",
    ingredients: "Dada ayam tanpa kulit, beras cokelat organik, brokoli panggang, wortel kukus, tahu organik, minyak zaitun ekstra murni, garam laut minimal.",
    description: "Diformulasikan secara ilmiah untuk penurunan berat badan bertahap dengan rasa kenyang lebih lama berkat kandungan protein dan serat tinggi."
  },
  {
    id: "balanced-fit",
    name: "Balanced Fit (Energi & Kebugaran Harian)",
    pricePerDay: 85000,
    calories: "1750 - 1850 kcal",
    macros: {
      protein: "105g - 110g",
      carbs: "190g - 200g",
      fats: "55g - 60g"
    },
    allergens: "Mengandung ikan, telur, gluten.",
    ingredients: "Fillet ikan dori panggang, telur rebus organik, nasi merah, asparagus tumis, kembang kol, minyak kelapa murni, bawang putih, rempah segar.",
    description: "Menu nutrisi seimbang untuk menjaga kebugaran tubuh, produktivitas kerja, dan memelihara berat badan ideal tanpa fluktuasi energi."
  },
  {
    id: "muscle-builder",
    name: "Muscle Builder (Pertumbuhan Massa Otot)",
    pricePerDay: 105000,
    calories: "2350 - 2450 kcal",
    macros: {
      protein: "155g - 165g",
      carbs: "270g - 280g",
      fats: "70g - 75g"
    },
    allergens: "Mengandung dairy (susu), telur, kedelai, gluten.",
    ingredients: "Daging sapi rendah lemak panggang, dada ayam bumbu madu, putih telur, ubi jalar panggang, brokoli, keju rendah lemak, chia seeds.",
    description: "Kepadatan kalori dan protein optimal untuk mendukung pemulihan serat otot pasca latihan intensif dan percepatan hipertrofi otot sehat."
  }
];

const deliveryZones = [
  { id: "zone-1", name: "Jakarta Pusat & Jakarta Selatan", surcharge: 0, desc: "Gratis Ongkos Kirim" },
  { id: "zone-2", name: "Jakarta Barat & Jakarta Timur", surcharge: 10000, desc: "+Rp 10.000 / Hari" },
  { id: "zone-3", name: "Jakarta Utara", surcharge: 15000, desc: "+Rp 15.000 / Hari" }
];

export default function LandingPage() {
  // Consent Vault state & context hooks
  const { trackingConsent, setTrackingConsent } = useTrackingConsent();
  const [cookieConsentOpen, setCookieConsentOpen] = React.useState(false);
  const [functionalCookies, setFunctionalCookies] = React.useState(false);
  const [analyticsCookies, setAnalyticsCookies] = React.useState(false);
  
  // Checkout & Calculator states
  const [selectedPlanId, setSelectedPlanId] = React.useState("weight-control");
  const [durationDays, setDurationDays] = React.useState(5); // 5, 10, or 20 days
  const [selectedZoneId, setSelectedZoneId] = React.useState("zone-1");
  
  // Customer details
  const [customerName, setCustomerName] = React.useState("");
  const [customerPhone, setCustomerPhone] = React.useState("");
  const [customerAddress, setCustomerAddress] = React.useState("");
  
  // Ijab Qabul agreement
  const [ijabChecked, setIjabChecked] = React.useState(false);
  
  // Transaction Modal & API State
  const [checkoutSuccessOpen, setCheckoutSuccessOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [serverReceipt, setServerReceipt] = React.useState<{
    subtotal: number;
    shippingTotal: number;
    taxTotal: number;
    grandTotal: number;
    contractType: string;
  } | null>(null);

  // Trigger cookie consent 3 seconds after load
  React.useEffect(() => {
    const hasConsented = localStorage.getItem("nutrisaji_consent_set");
    if (!hasConsented) {
      const timer = setTimeout(() => {
        setCookieConsentOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      // Load previous values from localStorage & global context
      setFunctionalCookies(localStorage.getItem("nutrisaji_functional") === "true");
      setAnalyticsCookies(trackingConsent === true);
    }
  }, [trackingConsent]);

  const handleCookieSave = (acceptAll = false) => {
    const functional = acceptAll ? true : functionalCookies;
    const analytics = acceptAll ? true : analyticsCookies;
    
    setFunctionalCookies(functional);
    setAnalyticsCookies(analytics);
    setTrackingConsent(analytics);
    
    setCookieConsentOpen(false);
  };

  const handleCookieReject = () => {
    setFunctionalCookies(false);
    setAnalyticsCookies(false);
    setTrackingConsent(false);
    
    setCookieConsentOpen(false);
  };

  // Find active data objects
  const selectedPlan = mealPlans.find((p) => p.id === selectedPlanId) || mealPlans[0];
  const selectedZone = deliveryZones.find((z) => z.id === selectedZoneId) || deliveryZones[0];

  // Pricing calculations (for optimistic UI render)
  const subtotal = selectedPlan.pricePerDay * durationDays;
  const shippingTotal = selectedZone.surcharge * durationDays;
  const taxRate = 0.11; // 11% PPN (Pajak Pertambahan Nilai)
  const taxTotal = Math.round(subtotal * taxRate);
  const grandTotal = subtotal + shippingTotal + taxTotal;

  // Checkout submission to backend API
  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert("Mohon lengkapi data diri Anda terlebih dahulu.");
      return;
    }
    if (!ijabChecked) {
      alert("Anda harus menyetujui akad pembelian sebelum melanjutkan.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: selectedPlanId,
          durationDays,
          zoneId: selectedZoneId,
          customerName,
          customerPhone,
          customerAddress,
          ijabQabul: ijabChecked,
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        const errMsg = result.errors 
          ? result.errors.map((err: any) => err.message).join("\n") 
          : result.message;
        alert(`Gagal memproses pesanan:\n${errMsg}`);
      } else {
        setServerReceipt(result.data);
        setCheckoutSuccessOpen(true);
      }
    } catch (error) {
      console.error("Network error on checkout:", error);
      alert("Terjadi kesalahan koneksi saat memproses pesanan. Silakan coba kembali.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCheckoutSuccessOpen(false);
    setIjabChecked(false);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
    setServerReceipt(null);
  };

  return (
    <div className="flex-1 bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200 dark:bg-stone-900/80 dark:border-stone-850 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 bg-emerald-600 dark:bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
              <Utensils className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-emerald-800 dark:text-emerald-400">NutriSaji</span>
              <span className="text-[10px] block font-medium -mt-1 text-stone-500 dark:text-stone-400">Catering Sehat Syariah</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600 dark:text-stone-300">
            <a href="#about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Prinsip Kami</a>
            <a href="#plans" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Menu & Nutrisi</a>
            <a href="#faq" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Batas Konsumsi</a>
            <a href="#order" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Kalkulator Harga</a>
          </nav>

          <div>
            <Button 
              variant="outline" 
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
              onClick={() => {
                const element = document.getElementById("order");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Pesan Sekarang
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        
        {/* HERO SECTION */}
        <section id="about" className="py-12 md:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            
            {/* Copywriter Column */}
            <div className="md:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-semibold dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>100% Akad Salam / Istishna' (Pemesanan di Muka)</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-tight">
                Catering Diet Harian dengan <span className="text-emerald-600 dark:text-emerald-400">Nutrisi Terukur</span> & Bebas Bahan Pengawet
              </h1>
              
              <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                NutriSaji berkomitmen menyajikan masakan sehat apa adanya. Kami menyusun porsi berdasarkan hitungan kalori riil, menuliskan alergen secara detail, dan menghindari pemanis buatan maupun zat pengawet. Kami percaya transaksi yang berkah berawal dari transparansi informasi sepenuhnya tanpa ada yang disembunyikan.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button 
                  size="lg" 
                  className="bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm dark:bg-emerald-500 dark:hover:bg-emerald-400"
                  onClick={() => {
                    const element = document.getElementById("plans");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Lihat Menu & Nutrisi
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-stone-300 hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-900"
                  onClick={() => {
                    const element = document.getElementById("faq");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Pahami Kelemahan & Batasan
                </Button>
              </div>

              {/* Factual Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200 dark:border-stone-800">
                <div>
                  <h4 className="text-emerald-700 dark:text-emerald-400 font-bold text-xl sm:text-2xl">Bebas MSG</h4>
                  <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400">Hanya bumbu alami pilihan</p>
                </div>
                <div>
                  <h4 className="text-emerald-700 dark:text-emerald-400 font-bold text-xl sm:text-2xl">24 Jam</h4>
                  <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400">Batas konsumsi kesegaran masakan</p>
                </div>
                <div>
                  <h4 className="text-emerald-700 dark:text-emerald-400 font-bold text-xl sm:text-2xl">Akurasi Makro</h4>
                  <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400">Dihitung ahli gizi tersertifikasi</p>
                </div>
              </div>
            </div>
            
            {/* Visual Column */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-md border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900">
                <Image
                  src="/healthy_meal_prep.png"
                  alt="Realistic NutriSaji Diet Meal Container"
                  fill
                  sizes="(max-w-768px) 100vw, 400px"
                  className="object-cover"
                  priority
                />
                
                {/* Image Ethics Tag */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-xs px-3 py-1.5 rounded-lg text-[10px] text-stone-200 text-center font-medium">
                  Strictly actual product photo, no stock images
                </div>
              </div>
              <p className="text-[11px] text-stone-400 mt-2.5 text-center italic max-w-sm">
                *Foto di atas menggambarkan tata letak riil sayur, protein, karbohidrat, dan wadah bersekat yang dikirimkan kepada pelanggan kami.
              </p>
            </div>
            
          </div>
        </section>

        {/* CONSIDERATION & INFORMATION SYMMETRY SECTION */}
        <section id="plans" className="py-16 bg-stone-100 dark:bg-stone-900 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
                Pilih Rencana Diet Sesuai Kebutuhan Tubuh Anda
              </h2>
              <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base">
                Setiap menu diproduksi harian secara presisi. Berikut adalah detail lengkap informasi gizi, daftar bahan baku, dan peringatan alergen pada setiap paket.
              </p>
            </div>

            {/* Plan Cards Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {mealPlans.map((plan) => (
                <Card key={plan.id} className="flex flex-col h-full hover:shadow-md transition-shadow relative overflow-hidden">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-stone-800 dark:text-stone-200">{plan.name}</CardTitle>
                    <CardDescription className="text-xs text-stone-500 dark:text-stone-400 mt-1 min-h-[32px]">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1 space-y-4">
                    {/* Calories & Macros Badge container */}
                    <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100/50 dark:border-emerald-900/30">
                      <div className="flex justify-between items-center pb-2 border-b border-emerald-100/50 dark:border-emerald-900/30">
                        <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">Total Energi</span>
                        <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{plan.calories}</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-center pt-2 text-xs">
                        <div>
                          <p className="text-[10px] text-stone-400">Protein</p>
                          <p className="font-semibold text-stone-700 dark:text-stone-300">{plan.macros.protein}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-stone-400">Karbo</p>
                          <p className="font-semibold text-stone-700 dark:text-stone-300">{plan.macros.carbs}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-stone-400">Lemak</p>
                          <p className="font-semibold text-stone-700 dark:text-stone-300">{plan.macros.fats}</p>
                        </div>
                      </div>
                    </div>

                    {/* Ingredients detail */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1">
                        <Utensils className="h-3 w-3" /> Bahan Baku Utama
                      </h4>
                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                        {plan.ingredients}
                      </p>
                    </div>

                    {/* Allergen Warning */}
                    <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 rounded-lg flex gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-[11px] font-bold text-amber-800 dark:text-amber-400">Peringatan Alergen:</h5>
                        <p className="text-[11px] text-amber-700 dark:text-amber-400/90 leading-tight">
                          {plan.allergens}
                        </p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-4 border-t border-stone-100 dark:border-stone-850 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-stone-400">Harga per Hari</p>
                      <p className="text-lg font-extrabold text-stone-900 dark:text-white">
                        Rp {plan.pricePerDay.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <Button 
                      onClick={() => {
                        setSelectedPlanId(plan.id);
                        const element = document.getElementById("order");
                        element?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={selectedPlanId === plan.id 
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white" 
                        : "bg-stone-900 hover:bg-stone-800 text-stone-100 dark:bg-stone-800 dark:hover:bg-stone-700"}
                      size="sm"
                    >
                      {selectedPlanId === plan.id ? "Terpilih" : "Pilih Paket"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Accordion For Flaws & Limitations */}
            <div id="faq" className="mt-16 max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-stone-900 dark:text-white">
                  Keterbatasan & Flaws Layanan Kami (Gharar Prevention)
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Untuk kejujuran transaksi penuh, mohon pahami keterbatasan fisik dan operasional layanan kami sebelum membeli.
                </p>
              </div>

              <Accordion defaultValue="item-1" className="bg-white dark:bg-stone-950 p-4 rounded-xl border border-stone-200 dark:border-stone-850 shadow-xs">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-xs sm:text-sm font-semibold">
                    1. Masa Kadaluarsa Masakan Singkat (Maksimal 24 Jam)
                  </AccordionTrigger>
                  <AccordionContent className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
                    Karena masakan kami dimasak harian dan diracik tanpa zat pengawet sintesis, daya tahan makanan sangat terbatas. Produk **wajib dikonsumsi dalam waktu 24 jam** sejak waktu serah terima kurir. Simpan di mesin pendingin (chiller) pada suhu 2-4°C jika tidak dikonsumsi langsung, dan hangatkan kembali selama 2-3 menit sebelum disantap. Kerusakan masakan akibat kelalaian penyimpanan di luar tanggung jawab kami.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-xs sm:text-sm font-semibold">
                    2. Jadwal & Batasan Pengiriman Wilayah
                  </AccordionTrigger>
                  <AccordionContent className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
                    Kami hanya melakukan pengiriman pada hari kerja (**Senin hingga Jumat**) pada slot pagi hari (**pukul 06.00 WIB - 09.00 WIB**). Kami tidak menyediakan pengiriman pada hari Sabtu, Minggu, dan libur nasional. Area pengantaran kami terbatas di wilayah administrasi DKI Jakarta saja. Mohon memastikan ada penerima di lokasi pada jam tersebut agar makanan tidak berada di suhu ruang terlalu lama.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-xs sm:text-sm font-semibold">
                    3. Ketiadaan Kustomisasi Menu & Tingkat Pedas
                  </AccordionTrigger>
                  <AccordionContent className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
                    Untuk menjamin konsistensi nutrisi kalori makro serta kelancaran dapur bersih kami, menu masakan harian tidak dapat dikustomisasi (misal: meminta pengurangan garam secara personal, penggantian jenis sayuran tertentu, atau penambahan tingkat pedas). Silakan periksa detail alergen pada tiap rencana diet secara hati-hati sebelum membeli.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-xs sm:text-sm font-semibold">
                    4. Program Wadah & Pengembalian Tas Insulasi
                  </AccordionTrigger>
                  <AccordionContent className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
                    Guna meminimalkan sampah plastik berlebih, kami meminjamkan tas insulasi termal selama masa berlangganan. Pelanggan berkewajiban mengembalikan tas insulasi yang lama kepada kurir kami saat kurir mengantarkan masakan baru di hari berikutnya. Jika tas rusak atau hilang berturut-turut, kami mengenakan denda penggantian sebesar Rp 50.000 per tas.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

          </div>
        </section>

        {/* CHECKOUT & IJAB QABUL SECTION */}
        <section id="order" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Form & Calculator Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-white">
                  Kalkulator Pemesanan & Form Pelanggan
                </h2>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  Hitung secara transparan rencana langganan Anda. Masukkan data diri dengan benar untuk kebutuhan pengiriman kurir harian.
                </p>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="space-y-6 bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-850 shadow-xs">
                
                {/* 1. Plan Selector */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-stone-700 dark:text-stone-300 block">
                    Pilih Paket Diet:
                  </label>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {mealPlans.map((plan) => (
                      <button
                        type="button"
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`p-3 rounded-lg border text-left text-xs transition-all flex flex-col justify-between min-h-[96px] ${
                          selectedPlanId === plan.id
                            ? "border-emerald-600 bg-emerald-50/40 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/20 dark:text-emerald-300"
                            : "border-stone-200 hover:border-stone-300 dark:border-stone-800 dark:hover:border-stone-700 text-stone-600 dark:text-stone-300"
                        }`}
                      >
                        <span className="font-bold block text-xs">{plan.name.split(" (")[0]}</span>
                        <span className="text-[10px] text-stone-400 block mt-1">{plan.calories}</span>
                        <span className="font-extrabold text-sm block mt-2 text-stone-900 dark:text-white">
                          Rp {plan.pricePerDay.toLocaleString("id-ID")}/hari
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Duration Selector */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-stone-700 dark:text-stone-300 block">
                    Durasi Berlangganan (Hari Kerja):
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[5, 10, 20].map((days) => (
                      <button
                        type="button"
                        key={days}
                        onClick={() => setDurationDays(days)}
                        className={`py-2 px-4 rounded-lg border text-center text-xs font-semibold transition-all ${
                          durationDays === days
                            ? "border-emerald-600 bg-emerald-50/40 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/20 dark:text-emerald-300"
                            : "border-stone-200 hover:border-stone-300 dark:border-stone-800 dark:hover:border-stone-700 text-stone-600 dark:text-stone-300"
                        }`}
                      >
                        {days} Hari {days === 5 && "(1 Minggu)"} {days === 10 && "(2 Minggu)"} {days === 20 && "(4 Minggu)"}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-stone-400">
                    *Hanya dikirimkan pada hari kerja (Senin s.d. Jumat).
                  </p>
                </div>

                {/* 3. Delivery Zone Selector */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-stone-700 dark:text-stone-300 block">
                    Wilayah Pengantaran (DKI Jakarta):
                  </label>
                  <div className="space-y-2">
                    {deliveryZones.map((zone) => (
                      <button
                        type="button"
                        key={zone.id}
                        onClick={() => setSelectedZoneId(zone.id)}
                        className={`w-full p-3 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                          selectedZoneId === zone.id
                            ? "border-emerald-600 bg-emerald-50/40 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/20 dark:text-emerald-300"
                            : "border-stone-200 hover:border-stone-300 dark:border-stone-800 dark:hover:border-stone-700 text-stone-600 dark:text-stone-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          <span className="font-semibold">{zone.name}</span>
                        </div>
                        <span className="font-bold text-stone-500 dark:text-stone-400">{zone.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Customer Details Input */}
                <div className="space-y-3 pt-3 border-t border-stone-100 dark:border-stone-850">
                  <h4 className="text-sm font-bold text-stone-800 dark:text-stone-200">Data Pengiriman & Pemesan</h4>
                  
                  <div className="space-y-2.5">
                    <div>
                      <label className="text-[11px] font-bold text-stone-500 dark:text-stone-400 block mb-1">
                        Nama Lengkap
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Masukkan nama lengkap sesuai identitas"
                          className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:border-stone-800 dark:bg-stone-950 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-stone-500 dark:text-stone-400 block mb-1">
                        Nomor WhatsApp Aktif
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="Contoh: 081234567890"
                          className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:border-stone-800 dark:bg-stone-950 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-stone-500 dark:text-stone-400 block mb-1">
                        Alamat Lengkap Pengiriman
                      </label>
                      <div className="relative">
                        <HomeIcon className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                        <textarea
                          required
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          placeholder="Tuliskan nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan, dan detail petunjuk kurir"
                          rows={3}
                          className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:border-stone-800 dark:bg-stone-950 dark:text-white resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Syariah Akad / Ijab Qabul Consent Checkbox */}
                <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 rounded-lg space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Checkbox
                      id="ijab-qabul"
                      checked={ijabChecked}
                      onCheckedChange={(val) => setIjabChecked(val)}
                      required
                      className="mt-0.5"
                    />
                    <label htmlFor="ijab-qabul" className="text-[11px] sm:text-xs text-emerald-900 dark:text-emerald-300 leading-normal cursor-pointer select-none">
                      <strong>Saya memahami detail nutrisi, total harga, dan menyetujui akad pembelian ini</strong>
                    </label>
                  </div>
                  
                  <div className="text-[10px] text-emerald-800/80 dark:text-emerald-400/80 pl-6 border-l border-emerald-200 dark:border-emerald-900">
                    <p className="font-semibold flex items-center gap-1 mb-0.5">
                      <Lock className="h-3 w-3" /> Akad Salam / Istishna' (Pemesanan di Muka):
                    </p>
                    <p>
                      Pembeli secara sadar menyetujui pemesanan dan pembayaran di muka untuk jasa pembuatan katering harian dengan spesifikasi nutrisi yang telah dijabarkan. Akad ini mengikat hak dan kewajiban kedua belah pihak secara transparan.
                    </p>
                  </div>
                </div>

                {/* Submit Action Button */}
                <Button
                  type="submit"
                  className="w-full text-white font-bold h-11"
                  disabled={!ijabChecked || isSubmitting}
                >
                  {isSubmitting ? "Memproses Akad..." : `Bayar & Selesaikan Akad (Rp ${grandTotal.toLocaleString("id-ID")})`}
                </Button>
              </form>
            </div>

            {/* Price Detail Summary Column */}
            <div className="lg:col-span-5 bg-stone-100 dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-850 space-y-6">
              <h3 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                Rincian Transaksi Transparan
              </h3>

              <div className="space-y-4">
                <div className="space-y-2 border-b border-stone-200 dark:border-stone-800 pb-4">
                  <div className="flex justify-between text-xs text-stone-500 dark:text-stone-400">
                    <span>Paket Diet</span>
                    <span className="font-semibold text-stone-700 dark:text-stone-300">{selectedPlan.name.split(" (")[0]}</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-500 dark:text-stone-400">
                    <span>Harga Satuan Harian</span>
                    <span className="font-semibold text-stone-700 dark:text-stone-300">Rp {selectedPlan.pricePerDay.toLocaleString("id-ID")} / hari</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-500 dark:text-stone-400">
                    <span>Jumlah Hari Pengiriman</span>
                    <span className="font-semibold text-stone-700 dark:text-stone-300">{durationDays} Hari Kerja</span>
                  </div>
                </div>

                <div className="space-y-2.5 border-b border-stone-200 dark:border-stone-800 pb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-500 dark:text-stone-400">Subtotal Layanan</span>
                    <span className="font-bold text-stone-800 dark:text-stone-200">Rp {subtotal.toLocaleString("id-ID")}</span>
                  </div>
                  
                  <div className="flex justify-between text-xs">
                    <div className="flex items-center gap-1 text-stone-500 dark:text-stone-400">
                      <span>Biaya Pengiriman</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-stone-200 dark:bg-stone-800 rounded font-medium">Zona {selectedZoneId.split("-")[1]}</span>
                    </div>
                    <span className="font-bold text-stone-800 dark:text-stone-200">
                      {shippingTotal === 0 ? "Gratis" : `Rp ${shippingTotal.toLocaleString("id-ID")}`}
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-400 -mt-1 leading-normal">
                    *Pengiriman dilakukan kurir internal berinsulasi termal khusus dari dapur kami di Kebayoran Baru, Jaksel.
                  </p>

                  <div className="flex justify-between text-xs">
                    <div className="flex items-center gap-1 text-stone-500 dark:text-stone-400">
                      <span>Pajak PPN Resmi (11%)</span>
                    </div>
                    <span className="font-bold text-stone-800 dark:text-stone-200">Rp {taxTotal.toLocaleString("id-ID")}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-bold text-stone-800 dark:text-stone-200">Total Biaya Akhir (Nett)</span>
                  <span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400">
                    Rp {grandTotal.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="p-3 bg-amber-50/40 dark:bg-amber-950/10 rounded-lg border border-amber-200/40 dark:border-amber-900/20 text-[10px] text-amber-800 dark:text-amber-400 leading-normal">
                  <p className="font-bold mb-0.5">Garansi Transparansi Harga:</p>
                  Kami menjamin nominal di atas adalah harga akhir yang Anda bayar. Tidak ada biaya kemasan tambahan, surcharge pembayaran gateway, atau asuransi siluman yang ditambahkan pada langkah pembayaran akhir.
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                  <Utensils className="h-4.5 w-4.5" />
                </div>
                <span className="font-bold text-base text-white tracking-tight">NutriSaji</span>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">
                Pionir catering sehat di Indonesia yang memadukan keahlian ahli gizi klinis dengan integritas akad syariah tanpa manipulasi.
              </p>
            </div>
            
            <div>
              <h4 className="text-xs font-bold uppercase text-stone-300 tracking-wider mb-3">Tautan Halaman</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#about" className="hover:underline">Prinsip E-Bisnis</a></li>
                <li><a href="#plans" className="hover:underline">Menu Diet</a></li>
                <li><a href="#faq" className="hover:underline">Batas & Flaws</a></li>
                <li><a href="#order" className="hover:underline">Pesan Sekarang</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase text-stone-300 tracking-wider mb-3">Operasional</h4>
              <ul className="space-y-2 text-xs text-stone-500">
                <li className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Dapur Aktif: Senin-Jumat</li>
                <li className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Pengiriman: 06.00 - 09.00</li>
                <li className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> DKI Jakarta</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase text-stone-300 tracking-wider mb-3">Pernyataan Etika</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Kami berkomitmen 100% bebas dari teknik kelabu pemasaran (dark patterns). Segala klaim didasarkan pada riset nutrisi empiris nyata.
              </p>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-stone-800 text-center text-xs text-stone-600 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>&copy; {new Date().getFullYear()} NutriSaji (PT Nutrisi Saji Indonesia). Hak cipta dilindungi undang-undang.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setCookieConsentOpen(true)} 
                className="hover:underline text-[11px] text-stone-500 flex items-center gap-1"
              >
                <Cookie className="h-3.5 w-3.5" /> Kelola Cookie Pelacakan
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* DIALOG 1: ORDER SUCCESS & IJAB QABUL CONFIRMATION */}
      <Dialog open={checkoutSuccessOpen} onOpenChange={setCheckoutSuccessOpen}>
        <div className="text-center space-y-4 py-4">
          <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-950 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center text-stone-900 dark:text-white">
              Ijab Qabul Diterima secara Sah!
            </DialogTitle>
            <DialogDescription className="text-center text-xs text-stone-500 dark:text-stone-400">
              Transaksi akad Salam / Istishna' (Pemesanan di Muka) berhasil disepakati dan dicatat.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 text-left text-xs space-y-2.5">
            <div className="flex justify-between font-bold pb-2 border-b border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-250">
              <span>Rincian Pembelian:</span>
              <span className="text-emerald-700 dark:text-emerald-400">Halal / Sah (Akad {serverReceipt?.contractType || "Salam / Istishna'"})</span>
            </div>
            
            <div className="grid grid-cols-2 gap-y-1.5 text-stone-600 dark:text-stone-300">
              <span className="text-stone-400">Pelanggan:</span>
              <span className="font-semibold text-right">{customerName}</span>

              <span className="text-stone-400">No. Kontak WhatsApp:</span>
              <span className="font-semibold text-right">{customerPhone}</span>
              
              <span className="text-stone-400">Rencana Paket:</span>
              <span className="font-semibold text-right">{selectedPlan.name.split(" (")[0]}</span>
              
              <span className="text-stone-400">Durasi Layanan:</span>
              <span className="font-semibold text-right">{durationDays} Hari Kerja</span>
              
              <span className="text-stone-400">Total Transaksi:</span>
              <span className="font-extrabold text-emerald-700 dark:text-emerald-400 text-right">
                Rp {(serverReceipt?.grandTotal ?? grandTotal).toLocaleString("id-ID")}
              </span>
            </div>

            <div className="p-2.5 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 rounded-lg text-[10px] text-emerald-800 dark:text-emerald-400 italic">
              &ldquo;Saya terima pesanan di muka makanan diet sehat {selectedPlan.name.split(" (")[0]} untuk {durationDays} hari pengantaran seharga Rp {(serverReceipt?.grandTotal ?? grandTotal).toLocaleString("id-ID")} net dengan akad Salam / Istishna' halal penuh.&rdquo;
            </div>
          </div>

          <p className="text-xs text-stone-500 dark:text-stone-400">
            Kurir kami akan menghubungi WhatsApp Anda dalam 1 jam untuk konfirmasi alamat peta dan jadwal kirim perdana hari Senin besok. Rincian nota syariah PDF telah kami kirimkan ke kontak Anda. Terima kasih atas kepercayaan Anda.
          </p>

          <DialogFooter className="pt-2">
            <Button onClick={resetForm} className="w-full bg-emerald-600 text-white hover:bg-emerald-500">
              Tutup & Selesai
            </Button>
          </DialogFooter>
        </div>
      </Dialog>

      {/* DIALOG 2: INFORMED CONSENT VAULT (DATA PRIVACY) */}
      <Dialog open={cookieConsentOpen} onOpenChange={setCookieConsentOpen}>
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 bg-emerald-100 dark:bg-emerald-950 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Cookie className="h-5.5 w-5.5" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-stone-900 dark:text-white">
                Kubah Persetujuan Data (Consent Vault)
              </DialogTitle>
              <DialogDescription className="text-xs text-stone-500 dark:text-stone-400">
                Pilih data pelacakan yang bersedia Anda bagikan demi kenyamanan website.
              </DialogDescription>
            </div>
          </div>

          <div className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed space-y-2.5 border-y border-stone-200 dark:border-stone-800 py-3.5">
            <p>
              Sesuai dengan nilai <strong>keadilan (Adl)</strong> dan <strong>kejujuran (Siddiq)</strong>, kami berkomitmen untuk tidak memasang tracker iklan bertarget jahat atau membagikan riwayat diet Anda kepada pihak ketiga manapun untuk manipulasi komersial.
            </p>
            <p>
              Jika Anda menutup dialog ini secara langsung tanpa memilih apapun, kami secara otomatis menetapkan status persetujuan data pada tingkat **Zero Tracking** (benar-benar tanpa pelacakan).
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors">
                <Checkbox
                  id="functional-cookies"
                  checked={functionalCookies}
                  onCheckedChange={(val) => setFunctionalCookies(val)}
                  className="mt-0.5"
                />
                <div className="space-y-0.5 cursor-pointer">
                  <label htmlFor="functional-cookies" className="text-xs font-bold text-stone-850 dark:text-stone-200">
                    Cookie Fungsional Website
                  </label>
                  <p className="text-[10px] text-stone-400 leading-tight">
                    Digunakan untuk menyimpan preferensi paket dan durasi di kalkulator Anda saat me-refresh halaman.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors">
                <Checkbox
                  id="analytics-cookies"
                  checked={analyticsCookies}
                  onCheckedChange={(val) => setAnalyticsCookies(val)}
                  className="mt-0.5"
                />
                <div className="space-y-0.5 cursor-pointer">
                  <label htmlFor="analytics-cookies" className="text-xs font-bold text-stone-850 dark:text-stone-200">
                    Pelacakan Analisis Anonim
                  </label>
                  <p className="text-[10px] text-stone-400 leading-tight">
                    Membantu kami mengetahui jumlah pengunjung dan kecepatan muat situs secara agregat tanpa melacak identitas personal Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 justify-end text-xs">
            <Button 
              variant="outline" 
              onClick={handleCookieReject}
              className="border-stone-200 hover:bg-stone-150 text-stone-700 dark:border-stone-800 dark:hover:bg-stone-900 dark:text-stone-300"
            >
              Tolak Pelacakan (Zero Tracking)
            </Button>
            <Button 
              onClick={() => handleCookieSave()}
              className="bg-stone-900 text-stone-100 hover:bg-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700"
            >
              Simpan Pilihan Saya
            </Button>
            <Button 
              onClick={() => handleCookieSave(true)}
              className="bg-emerald-600 text-white hover:bg-emerald-500"
            >
              Setujui Semua
            </Button>
          </div>

          <DialogClose onClick={handleCookieReject} />
        </div>
      </Dialog>

    </div>
  );
}
