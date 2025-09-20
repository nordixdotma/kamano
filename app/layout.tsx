import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Changa } from "next/font/google"
import { CartProvider } from "@/lib/cart-context"
import CartModal from "@/components/cart-modal"
import { Analytics } from "@vercel/analytics/react"
import { Analytics as NextAnalytics } from "@vercel/analytics/next"
import { Suspense } from "react"

const changa = Changa({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-changa",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Riad Phone - أحدث الأجهزة الإلكترونية بأفضل الأسعار في المغرب",
  description:
    "اكتشف أحدث الأجهزة الإلكترونية والتقنيات بأفضل الأسعار في المغرب. هواتف ذكية، أجهزة كمبيوتر، تلفزيونات وأكثر. توصيل مجاني لجميع أنحاء المملكة.",
  keywords: [
    "إلكترونيات",
    "هواتف ذكية",
    "أجهزة كمبيوتر",
    "تلفزيونات",
    "تقنية",
    "المغرب",
    "أفضل الأسعار",
    "رياض فون",
    "Riad Phone",
    "توصيل مجاني",
    "أجهزة أصلية",
    "ضمان",
  ],
  authors: [{ name: "Riad Phone" }],
  creator: "Riad Phone",
  publisher: "Riad Phone",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://riadphone.store",
  },
  openGraph: {
    title: "Riad Phone - أحدث الأجهزة الإلكترونية بأفضل الأسعار في المغرب",
    description: "اكتشف أحدث الأجهزة الإلكترونية والتقنيات بأفضل الأسعار في المغرب. توصيل مجاني لجميع أنحاء المملكة.",
    url: "https://riadphone.store",
    siteName: "Riad Phone",
    images: [
      {
        url: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=2080&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "متجر رياض فون للتقنية",
      },
    ],
    locale: "ar_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Riad Phone - أحدث الأجهزة الإلكترونية بأفضل الأسعار في المغرب",
    description: "اكتشف أحدث الأجهزة الإلكترونية والتقنيات بأفضل الأسعار في المغرب. توصيل مجاني لجميع أنحاء المملكة.",
    images: ["https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=2080&auto=format&fit=crop"],
  },
  other: {
    "google-site-verification": "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" translate="no">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
        <meta name="google" content="notranslate" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "Riad Phone",
              description: "متجر الأجهزة الإلكترونية والتقنيات الحديثة في المغرب",
              url: "https://riadphone.store",
              telephone: "+212704749027",
              address: {
                "@type": "PostalAddress",
                addressCountry: "MA",
                addressLocality: "المغرب",
              },
              openingHours: "Mo-Su 09:00-22:00",
              priceRange: "$$",
              acceptedPaymentMethod: ["Cash", "CreditCard"],
              currenciesAccepted: "MAD",
            }),
          }}
        />
      </head>
      <body className={`${changa.variable} font-changa`}>
        <Suspense fallback={null}>
          <CartProvider>
            {children}
            <CartModal />
          </CartProvider>
        </Suspense>
        <Analytics />
        <NextAnalytics />
      </body>
    </html>
  )
}
