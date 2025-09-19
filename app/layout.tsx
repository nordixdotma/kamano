import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Changa } from "next/font/google"
import { CartProvider } from "@/lib/cart-context"
import CartModal from "@/components/cart-modal"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"

const changa = Changa({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-changa",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Riad Phone",
  description:
    "اكتشف أحدث الأجهزة الإلكترونية والتقنيات بأفضل الأسعار في المغرب. هواتف ذكية، أجهزة كمبيوتر، تلفزيونات وأكثر.",
  keywords: ["إلكترونيات", "هواتف ذكية", "أجهزة كمبيوتر", "تلفزيونات", "تقنية", "المغرب", "أفضل الأسعار"],
  openGraph: {
    title: "Riad Phone",
    description: "اكتشف أحدث الأجهزة الإلكترونية والتقنيات بأفضل الأسعار في المغرب.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=2080&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "متجر التقنية",
      },
    ],
    locale: "ar_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Riad Phone",
    description: "اكتشف أحدث الأجهزة الإلكترونية والتقنيات بأفضل الأسعار في المغرب.",
    images: ["https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=2080&auto=format&fit=crop"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body className={`${changa.variable} font-changa`}>
        <Suspense fallback={null}>
          <CartProvider>
            {children}
            <CartModal />
          </CartProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
