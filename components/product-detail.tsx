"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Truck, Minus, Plus, ShoppingBag, Check, ArrowLeft, ArrowRight } from "lucide-react"
import type { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "")
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "")
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  // For image gallery navigation
  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
  }

  // Handle keyboard navigation for gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextImage()
      } else if (e.key === "ArrowLeft") {
        prevImage()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    // Create a modified product with the current price
    const productToAdd = {
      ...product,
      price: product.newPrice, // Use the new price for cart
    }

    addItem(productToAdd, quantity, selectedSize, selectedColor)
    setIsAddedToCart(true)

    // Reset the "Added to Cart" message after 3 seconds
    setTimeout(() => {
      setIsAddedToCart(false)
    }, 3000)
  }

  const handleWhatsAppInquiry = () => {
    const phoneNumber = "+212704749027" // Replace with your WhatsApp number

    // Create a message with product details
    let message = `مرحباً، أنا مهتم بهذا المنتج:\n\n`
    message += `*${product.name}*\n`
    if (product.brand) {
      message += `العلامة التجارية: ${product.brand}\n`
    }
    message += `الفئة: ${product.category}\n`
    message += `السعر: ${product.newPrice}\n`

    // Add selected options if any
    if (selectedSize) {
      message += `المواصفات: ${selectedSize}\n`
    }
    if (selectedColor) {
      message += `اللون: ${selectedColor}\n`
    }

    message += `\nهل يمكنكم إعطائي المزيد من المعلومات؟`

    // Open WhatsApp with the message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-16 md:pb-24">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Product Images */}
        <div className="space-y-4">
          {/* Main Image Container */}
          <div className="relative aspect-square overflow-hidden rounded-xl border border-gray-100 bg-gray-50 shadow-sm md:max-w-[90%] lg:max-w-[80%] mx-auto">
            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors duration-200"
              aria-label="الصورة السابقة"
            >
              <ArrowLeft size={18} className="text-[#ffec35]" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors duration-200"
              aria-label="الصورة التالية"
            >
              <ArrowRight size={18} className="text-[#ffec35]" />
            </button>

            {/* Main Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full"
              >
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-white/80 px-3 py-1 rounded-full text-xs font-medium text-[#ffec35]">
              {selectedImage + 1} / {product.images.length}
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
            {product.images.map((image, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleThumbnailClick(index)}
                className={`relative overflow-hidden rounded-lg ${
                  selectedImage === index
                    ? "ring-2 ring-[#ffec35] ring-offset-2"
                    : "ring-1 ring-gray-200 hover:ring-[#ffec35]/50"
                } w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 transition-all duration-200 flex-shrink-0`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - منظر ${index + 1}`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 25vw, 10vw"
                />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="flex flex-col space-y-6">
          {/* Product Name, Brand and Pricing */}
          <div className="border-b border-gray-100 pb-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#122f5b] mb-2 text-right">
                {product.name}
              </h1>

              {/* Brand and Category */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-right">
                  {product.brand && <p className="text-gray-600 text-base">العلامة التجارية: {product.brand}</p>}
                  <p className="text-gray-600 text-sm">الفئة: {product.category}</p>
                </div>
              </div>

              {/* Pricing */}
              <div className="text-right mb-3">
                <p className="text-lg text-gray-400 line-through">{product.oldPrice}</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#122f5b]">{product.newPrice}</p>
                <p className="text-sm text-green-600 font-medium">
                  وفر{" "}
                  {Number.parseInt(product.oldPrice.replace(/\D/g, "")) -
                    Number.parseInt(product.newPrice.replace(/\D/g, ""))}{" "}
                  درهم
                </p>
              </div>
            </motion.div>

            {/* Stock Status */}
            <div className="mt-2">
              {product.inStock ? (
                <p className="text-green-600 text-sm flex items-center justify-end">
                  <Check size={16} className="ml-1" />
                  متوفر في المخزون
                </p>
              ) : (
                <p className="text-[#122f5b] text-sm flex items-center justify-end">
                  <span className="ml-1">•</span>
                  غير متوفر
                </p>
              )}
            </div>
          </div>

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="pt-2">
              <h3 className="text-lg font-bold text-gray-700 mb-3 text-right">المواصفات التقنية</h3>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">{value}</span>
                    <span className="font-medium text-gray-800 text-sm">{key}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Size/Storage Selection */}
          {product.sizes.length > 0 && (
            <div className="pt-2">
              <h3 className="text-sm font-medium text-gray-700 mb-2 text-right">الخيارات المتاحة</h3>
              <div className="flex flex-wrap gap-2 justify-end">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "bg-[#ffec35] text-black border-[#ffec35]"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                    disabled={!product.inStock}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div className="pt-2">
              <h3 className="text-sm font-medium text-gray-700 mb-2 text-right">الألوان المتاحة</h3>
              <div className="flex flex-wrap gap-3 justify-end">
                {product.colors.map((color) => {
                  // Map color names to actual color values for the UI
                  const colorMap: Record<string, string> = {
                    أبيض: "#ffffff",
                    أسود: "#333333",
                    رمادي: "#808080",
                    فضي: "#c0c0c0",
                    ذهبي: "#ffd700",
                    أزرق: "#4a90e2",
                    أحمر: "#ffec35",
                    أخضر: "#27ae60",
                    "رمادي فضائي": "#8c8c8c",
                    "تيتانيوم طبيعي": "#d4d4d4",
                    "تيتانيوم أزرق": "#6b8db5",
                    "تيتانيوم أبيض": "#f0f0f0",
                    "تيتانيوم أسود": "#2c2c2c",
                    "نيون أزرق/أحمر": "#4a90e2",
                    بلاتيني: "#e5e4e2",
                  }

                  const bgColor = colorMap[color] || "#ffffff"

                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all relative ${
                        selectedColor === color ? "ring-2 ring-[#ffec35] ring-offset-2" : "ring-1 ring-gray-200"
                      }`}
                      style={{ backgroundColor: bgColor }}
                      aria-label={`اختيار اللون ${color}`}
                      aria-describedby={`color-${color}-description`}
                      title={color}
                      disabled={!product.inStock}
                    >
                      <span className="sr-only">{color}</span>
                      {selectedColor === color && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="w-2 h-2 bg-white rounded-full shadow-sm"></span>
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
              <p className="text-sm text-gray-500 mt-2 text-right">اللون المختار: {selectedColor}</p>
            </div>
          )}

          {/* Shipping Information */}
          <div className="flex items-center border-l-4 border-green-500 pl-4 py-2 bg-green-100">
            <Truck size={18} className="text-green-500 mx-3" />
            <div>
              <p className="font-medium text-green-500">التوصيل متاح</p>
              <p className="text-xs text-gray-600">التوصيل متاح في جميع أنحاء المغرب</p>
            </div>
          </div>

          {/* Quantity Selector and Add to Cart */}
          <div className="pt-4">
            <div className="flex flex-col space-y-4">
              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  الكمية
                </label>
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={!product.inStock}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="زيادة الكمية"
                  >
                    <Plus size={16} />
                  </button>
                  <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-300 text-center">
                    {quantity}
                  </div>
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={!product.inStock}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="تقليل الكمية"
                  >
                    <Minus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div>
                <AnimatePresence mode="wait">
                  {isAddedToCart ? (
                    <motion.div
                      key="added"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="w-full bg-green-100 text-green-800 px-4 py-3 rounded-md flex items-center justify-center"
                    >
                      <Check size={18} className="ml-2" />
                      تم إضافته للسلة
                    </motion.div>
                  ) : (
                    <div className="flex gap-2">
                      <motion.button
                        key="add"
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                        className="flex-1 py-3 px-4 bg-[#ffec35] text-black rounded-md flex items-center justify-center hover:bg-[#e6d42f] transition-colors disabled:opacity-70 disabled:cursor-not-allowed font-bold"
                      >
                        <ShoppingBag size={18} className="ml-2" />
                        {product.inStock ? "إضافة للسلة" : "غير متوفر"}
                      </motion.button>

                      <motion.button
                        key="whatsapp"
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleWhatsAppInquiry}
                        className="py-3 px-4 bg-green-500 text-white rounded-md flex items-center justify-center hover:bg-green-600 transition-colors"
                        aria-label="استفسار عبر واتساب"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0"
                          className="text-white ml-2"
                        >
                          <path
                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                            fill="currentColor"
                          />
                        </svg>
                        واتساب
                      </motion.button>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
