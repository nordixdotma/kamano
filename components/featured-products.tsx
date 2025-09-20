"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import ProductGrid from "./product-grid"
import { products } from "@/lib/products"
import EmptyProductState from "./empty-product-state"
import { useState, useMemo } from "react"
import ProductFilter from "./product-filter"

interface FeaturedProductsProps {
  categoryFilter?: string
}

export default function FeaturedProducts({ categoryFilter }: FeaturedProductsProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<{
    categories: string[]
    brands: string[]
    priceRange: { min: number; max: number }
    sortBy: string
  }>({
    categories: [],
    brands: [],
    priceRange: { min: 0, max: 50000 },
    sortBy: "newest",
  })

  // Extract unique categories and brands
  const categories = [...new Set(products.map((p) => p.category))]
  const brands = [...new Set(products.map((p) => p.brand).filter((brand): brand is string => Boolean(brand)))]

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Category filter (from URL or filter)
      if (categoryFilter && product.category !== categoryFilter) {
        return false
      }

      // Search filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }

      // Category filter from filters
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }

      // Brand filter
      if (filters.brands.length > 0 && (!product.brand || !filters.brands.includes(product.brand))) {
        return false
      }

      // Price filter
      const price = Number.parseInt(product.newPrice.replace(/\D/g, ""))
      if (price < filters.priceRange.min || price > filters.priceRange.max) {
        return false
      }

      return true
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return Number.parseInt(a.newPrice.replace(/\D/g, "")) - Number.parseInt(b.newPrice.replace(/\D/g, ""))
        case "price-high":
          return Number.parseInt(b.newPrice.replace(/\D/g, "")) - Number.parseInt(a.newPrice.replace(/\D/g, ""))
        case "name":
          return a.name.localeCompare(b.name, "ar")
        case "brand":
          return (a.brand || "").localeCompare(b.brand || "", "ar")
        case "newest":
        default:
          return b.id - a.id
      }
    })

    return filtered
  }, [filters, searchTerm, categoryFilter])

  const sectionTitle = categoryFilter ? `منتجات ${categoryFilter}` : "جميع المنتجات"

  return (
    <section id="products" className=" mt-20 py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#122f5b] mb-3">{sectionTitle}</h2>
          <div className="w-16 sm:w-24 h-1 bg-[#122f5b] mx-auto mb-4"></div>
          <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
            اكتشف أحدث التقنيات والأجهزة الإلكترونية بأفضل الأسعار
          </p>
        </motion.div>

        <ProductFilter
          onFilterChange={setFilters}
          onSearchChange={setSearchTerm}
          categories={categories}
          brands={brands}
          totalProducts={
            categoryFilter ? products.filter((p) => p.category === categoryFilter).length : products.length
          }
          filteredCount={filteredProducts.length}
          categoryFilter={categoryFilter}
        />

        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <EmptyProductState
              title="لا توجد منتجات"
              message="لم يتم العثور على منتجات تطابق الفلاتر المحددة. جرب تعديل الفلاتر أو مسحها."
              showLink={false}
              compact={true}
            />
          </motion.div>
        )}
      </div>
    </section>
  )
}
