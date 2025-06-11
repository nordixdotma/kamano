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
    <section
      id="home"
      className="relative w-full overflow-hidden cursor-pointer"
      style={{ height: `calc(100vh - ${headerHeight}px)`, marginTop: `${headerHeight}px` }}
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
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="متجر الإلكترونيات - أحدث التقنيات والأجهزة"
          className="object-cover hover:scale-105 transition-transform duration-700"
          priority
          fill
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* Optional: Add a subtle hover effect indicator */}
      <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 z-10" />
    </section>
  )
}
