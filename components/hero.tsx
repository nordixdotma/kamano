"use client"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Hero() {
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    // Calculate header height (banner + header)
    setHeaderHeight(96)
  }, [])

  const marginTop = typeof window !== "undefined" && window.innerWidth > 1024 ? 48 : headerHeight;

  return (
    <div className="flex justify-center w-full bg-white">
      <section
        id="home"
        className="relative max-w-7xl w-full overflow-hidden cursor-pointer"
        style={{ marginTop: `${marginTop}px` }}
        onClick={() => {
          // Scroll to products section when hero is clicked
          const productsSection = document.getElementById("products")
          if (productsSection) {
            productsSection.scrollIntoView({ behavior: "smooth" })
          }
        }}
      >
        <div className="relative aspect-[16/9] w-full">
          <Image
            src="/hero.png"
            alt="متجر الإلكترونيات - أحدث التقنيات والأجهزة"
            className="object-contain hover:scale-105 transition-transform duration-700"
            priority
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            quality={90}
          />
        </div>
      </section>
    </div>
  )
}
