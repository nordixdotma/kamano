"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import type { Product } from "@/lib/products"
import Link from "next/link"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
      >
        {/* Image container with fixed aspect ratio - smaller for 4 columns */}
        <div className="relative h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden">
          <Image
            src={product.mainImage || "/placeholder.svg"}
            alt={product.name}
            className="transition-transform duration-700 ease-in-out group-hover:scale-110 object-cover object-center"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 25vw, 25vw"
          />
          <div
            className={`absolute inset-0 bg-red-500/70 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="px-2 py-1 bg-white text-red-500 rounded-md text-xs font-medium hover:bg-gray-100 transition-colors">
              عرض التفاصيل
            </span>
          </div>
        </div>

        {/* Content container - more compact */}
        <div className="p-2 sm:p-3 flex-grow flex flex-col">
          {/* Product name */}
          <h3 className="text-xs sm:text-sm font-bold text-red-500 mb-1 text-right line-clamp-2">{product.name}</h3>

          {/* Price section with old/new pricing */}
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-1">
              <div className="text-right">
                <p className="text-sm text-gray-400 line-through">{product.oldPrice}</p>
                <p className="text-base sm:text-lg text-red-500 font-bold">{product.newPrice}</p>
              </div>

              {/* Stock indicator */}
              {product.inStock ? (
                <span className="text-[10px] text-green-600 bg-green-50 px-1 py-0.5 rounded-full">متوفر</span>
              ) : (
                <span className="text-[10px] text-red-600 bg-red-50 px-1 py-0.5 rounded-full">غير متوفر</span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
