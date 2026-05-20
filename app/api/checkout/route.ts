import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Define pricing structures server-side to prevent client tampering
const PLAN_PRICES: Record<string, number> = {
  "weight-control": 75000,
  "balanced-fit": 85000,
  "muscle-builder": 105000,
};

const ZONE_SURCHARGES: Record<string, number> = {
  "zone-1": 0,
  "zone-2": 10000,
  "zone-3": 15000,
};

// Strict payload schema using Zod
const checkoutSchema = z.object({
  planId: z.string().refine((val) => Object.keys(PLAN_PRICES).includes(val), {
    message: "Paket diet yang dipilih tidak valid",
  }),
  durationDays: z.number().refine((val) => [5, 10, 20].includes(val), {
    message: "Durasi berlangganan harus 5, 10, atau 20 hari",
  }),
  zoneId: z.string().refine((val) => Object.keys(ZONE_SURCHARGES).includes(val), {
    message: "Wilayah pengantaran tidak valid",
  }),
  customerName: z.string().min(2, "Nama minimal terdiri dari 2 karakter"),
  customerPhone: z.string().min(8, "Nomor WhatsApp minimal terdiri dari 8 karakter"),
  customerAddress: z.string().min(10, "Alamat lengkap minimal terdiri dari 10 karakter"),
  // @ts-ignore
  ijabQabul: z.literal(true, {
    errorMap: () => ({ message: "Persetujuan Ijab Qabul mutlak diperlukan" }),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const result = checkoutSchema.safeParse(body);
    
    if (!result.success) {
      const formattedErrors = result.error.issues.map((issue) => {
        let message = issue.message;
        if (issue.path[0] === "ijabQabul") {
          message = "Persetujuan Ijab Qabul mutlak diperlukan";
        }
        return {
          field: issue.path[0],
          message,
        };
      });
      
      return NextResponse.json(
        { 
          success: false, 
          message: "Validasi data gagal", 
          errors: formattedErrors 
        }, 
        { status: 400 }
      );
    }

    const data = result.data;
    
    // Server-side financial calculations
    const pricePerDay = PLAN_PRICES[data.planId];
    const surchargePerDay = ZONE_SURCHARGES[data.zoneId];
    
    const subtotal = pricePerDay * data.durationDays;
    const shippingTotal = surchargePerDay * data.durationDays;
    const taxTotal = Math.round(subtotal * 0.11); // 11% PPN
    const grandTotal = subtotal + shippingTotal + taxTotal;

    // Simulate successful order persistence (e.g. database save)
    console.log("[Checkout API] Order received successfully:", {
      customerName: data.customerName,
      planId: data.planId,
      durationDays: data.durationDays,
      grandTotal,
      ijabQabul: data.ijabQabul,
    });

    return NextResponse.json({
      success: true,
      message: "Akad Salam / Istishna' berhasil disepakati dan dicatat.",
      data: {
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        planId: data.planId,
        durationDays: data.durationDays,
        subtotal,
        shippingTotal,
        taxTotal,
        grandTotal,
        contractType: "Salam / Istishna'",
      }
    });

  } catch (error) {
    console.error("[Checkout API Error]", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Terjadi kesalahan server internal" 
      }, 
      { status: 500 }
    );
  }
}
