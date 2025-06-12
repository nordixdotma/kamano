"use client"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Hero() {
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    // Calculate header height (banner + header)
    // Banner: py-3 = 24px, Header: py-3 = 24px, plus some padding
    setHeaderHeight(96) // Approximate total height of banner + header
  }, [])

  return (
    <div className="flex justify-center w-full mt-10">
      <section
        id="home"
        className="relative max-w-7xl w-full overflow-hidden cursor-pointer"
        style={{ height: "500px", marginTop: `${headerHeight}px` }}
        onClick={() => {
          // Scroll to products section when hero is clicked
          const productsSection = document.getElementById("products")
          if (productsSection) {
            productsSection.scrollIntoView({ behavior: "smooth" })
          }
        }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="متجر الإلكترونيات - أحدث التقنيات والأجهزة"
            className="object-cover hover:scale-105 transition-transform duration-700"
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
