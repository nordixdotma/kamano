"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, ChevronDown, Smartphone, DollarSign, Grid3X3, Clock } from "lucide-react"

interface FilterOptions {
  categories: string[]
  brands: string[]
  priceRange: {
    min: number
    max: number
  }
  sortBy: string
}

interface ProductFilterProps {
  onFilterChange: (filters: FilterOptions) => void
  onSearchChange: (search: string) => void
  categories: string[]
  brands: string[]
  totalProducts: number
  filteredCount: number
}

type FilterType = "category" | "brand" | "price" | "sort"

interface FilterState {
  category: string
  brand: string
  price: string
  sort: string
}

interface DropdownState {
  category: boolean
  brand: boolean
  price: boolean
  sort: boolean
}

export default function ProductFilter({
  onFilterChange,
  onSearchChange,
  categories,
  brands,
  totalProducts,
  filteredCount,
}: ProductFilterProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    category: "جميع الفئات",
    brand: "جميع العلامات",
    price: "جميع الأسعار",
    sort: "الأحدث",
  })

  const [dropdownOpen, setDropdownOpen] = useState<DropdownState>({
    category: false,
    brand: false,
    price: false,
    sort: false,
  })

  const dropdownRefs = {
    category: useRef<HTMLDivElement>(null),
    brand: useRef<HTMLDivElement>(null),
    price: useRef<HTMLDivElement>(null),
    sort: useRef<HTMLDivElement>(null),
  }

  // Check if any filter is applied
  const hasActiveFilters =
    filters.category !== "جميع الفئات" ||
    filters.brand !== "جميع العلامات" ||
    filters.price !== "جميع الأسعار" ||
    searchTerm !== ""

  // Get price ranges
  const getPriceRanges = () => [
    "جميع الأسعار",
    "أقل من 2000 درهم",
    "2000 - 5000 درهم",
    "5000 - 10000 درهم",
    "10000 - 15000 درهم",
    "15000 - 25000 درهم",
    "أكثر من 25000 درهم",
  ]

  // Get sort options
  const getSortOptions = () => [
    "الأحدث",
    "السعر: من الأقل للأعلى",
    "السعر: من الأعلى للأقل",
    "الاسم: أ-ي",
    "العلامة التجارية",
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    const handleClickOutside = (event: any) => {
      Object.keys(dropdownRefs).forEach((key) => {
        const ref = dropdownRefs[key as FilterType]
        if (ref.current && !ref.current.contains(event.target)) {
          setDropdownOpen((prev) => ({ ...prev, [key]: false }))
        }
      })
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Update filters when they change
  useEffect(() => {
    const filterOptions: FilterOptions = {
      categories: filters.category === "جميع الفئات" ? [] : [filters.category],
      brands: filters.brand === "جميع العلامات" ? [] : [filters.brand],
      priceRange: getPriceRangeFromString(filters.price),
      sortBy: getSortValueFromString(filters.sort),
    }
    onFilterChange(filterOptions)
  }, [filters, onFilterChange])

  useEffect(() => {
    onSearchChange(searchTerm)
  }, [searchTerm, onSearchChange])

  const getPriceRangeFromString = (priceString: string) => {
    switch (priceString) {
      case "أقل من 2000 درهم":
        return { min: 0, max: 2000 }
      case "2000 - 5000 درهم":
        return { min: 2000, max: 5000 }
      case "5000 - 10000 درهم":
        return { min: 5000, max: 10000 }
      case "10000 - 15000 درهم":
        return { min: 10000, max: 15000 }
      case "15000 - 25000 درهم":
        return { min: 15000, max: 25000 }
      case "أكثر من 25000 درهم":
        return { min: 25000, max: 50000 }
      default:
        return { min: 0, max: 50000 }
    }
  }

  const getSortValueFromString = (sortString: string) => {
    switch (sortString) {
      case "السعر: من الأقل للأعلى":
        return "price-low"
      case "السعر: من الأعلى للأقل":
        return "price-high"
      case "الاسم: أ-ي":
        return "name"
      case "العلامة التجارية":
        return "brand"
      default:
        return "newest"
    }
  }

  const toggleDropdown = (dropdown: FilterType) => {
    setDropdownOpen((prev) => {
      const newState = { ...prev }
      Object.keys(newState).forEach((key) => {
        newState[key as FilterType] = key === dropdown ? !prev[key as FilterType] : false
      })
      return newState
    })
  }

  const setFilter = (type: FilterType, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }))
    setDropdownOpen((prev) => ({ ...prev, [type]: false }))
  }

  const resetFilters = () => {
    setFilters({
      category: "جميع الفئات",
      brand: "جميع العلامات",
      price: "جميع الأسعار",
      sort: "الأحدث",
    })
    setSearchTerm("")
  }

  const resetFilter = (type: FilterType) => {
    const defaultValues = {
      category: "جميع الفئات",
      brand: "جميع العلامات",
      price: "جميع الأسعار",
      sort: "الأحدث",
    }
    setFilters((prev) => ({ ...prev, [type]: defaultValues[type] }))
  }

  return (
    <div
      className={`md:bg-white md:rounded-md border border-[#122f5b]/30 p-3 md:p-4 mb-4 md:mb-8 transition-all duration-700 transform relative z-30 ${
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
    >
      {/* Search and Reset Filters */}
      <div className="flex gap-3 mb-4 transition-all duration-300 ease-in-out">
        <div className={`relative transition-all duration-500 ease-in-out ${hasActiveFilters ? "w-10/12" : "w-full"}`}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="ابحث عن المنتجات..."
            className="w-full pl-10 pr-3 py-2 border border-[#122f5b]/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#122f5b] focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#122f5b] hover:text-[#0f1f3d] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="bg-primary text-[#122f5b] hover:bg-gray-100 hover:text-[#0f1f3d] font-medium rounded-sm text-sm px-4 py-2.5 transition-colors flex items-center justify-center w-2/12"
            aria-label="مسح جميع الفلاتر"
          >
            <X className="w-4 h-4 mr-1.5" />
            <span className="hidden md:inline">مسح الكل</span>
            <span className="md:hidden">مسح</span>
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600 mb-4 text-right">
        عرض {filteredCount} من {totalProducts} منتج
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Category Filter */}
        <div className="relative" ref={dropdownRefs.category}>
          <button
            type="button"
            onClick={() => toggleDropdown("category")}
            className={`w-full flex items-center justify-between px-3 py-2 border ${
              filters.category !== "جميع الفئات" ? "border-[#122f5b] bg-[#122f5b]/10" : "border-[#122f5b]/30"
            } rounded-sm text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#122f5b] focus:border-transparent transition-colors`}
            aria-expanded={dropdownOpen.category}
            aria-haspopup="listbox"
            aria-label="اختيار الفئة"
          >
            <div className="flex items-center">
              {filters.category !== "جميع الفئات" && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    resetFilter("category")
                  }}
                  className="ml-1 text-[#122f5b] hover:text-[#0f1f3d] cursor-pointer"
                  aria-label="مسح فلتر الفئة"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen.category ? "rotate-180" : ""}`} />
            </div>
            <div className="flex items-center">
              <span className="truncate text-xs md:text-sm">{filters.category}</span>
              <Grid3X3 className="w-4 h-4 mr-2 text-gray-500" />
            </div>
          </button>

          {dropdownOpen.category && (
            <div
              className="absolute z-50 mt-1 w-full bg-white border border-[#122f5b]/30 rounded-sm shadow-lg max-h-60 overflow-y-auto"
              role="listbox"
            >
              <button
                type="button"
                role="option"
                aria-selected={filters.category === "جميع الفئات"}
                className={`w-full text-right px-3 py-2 text-sm hover:bg-gray-100 ${
                  filters.category === "جميع الفئات" ? "bg-[#122f5b]/10 font-medium" : ""
                }`}
                onClick={() => setFilter("category", "جميع الفئات")}
              >
                جميع الفئات
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  role="option"
                  aria-selected={filters.category === category}
                  className={`w-full text-right px-3 py-2 text-sm hover:bg-gray-100 ${
                    filters.category === category ? "bg-[#122f5b]/10 font-medium" : ""
                  }`}
                  onClick={() => setFilter("category", category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Brand Filter */}
        <div className="relative" ref={dropdownRefs.brand}>
          <button
            type="button"
            onClick={() => toggleDropdown("brand")}
            className={`w-full flex items-center justify-between px-3 py-2 border ${
              filters.brand !== "جميع العلامات" ? "border-[#122f5b] bg-[#122f5b]/10" : "border-[#122f5b]/30"
            } rounded-sm text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#122f5b] focus:border-transparent transition-colors`}
            aria-expanded={dropdownOpen.brand}
            aria-haspopup="listbox"
            aria-label="اختيار العلامة التجارية"
          >
            <div className="flex items-center">
              {filters.brand !== "جميع العلامات" && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    resetFilter("brand")
                  }}
                  className="ml-1 text-[#122f5b] hover:text-[#0f1f3d] cursor-pointer"
                  aria-label="مسح فلتر العلامة التجارية"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen.brand ? "rotate-180" : ""}`} />
            </div>
            <div className="flex items-center">
              <span className="truncate text-xs md:text-sm">{filters.brand}</span>
              <Smartphone className="w-4 h-4 mr-2 text-gray-500" />
            </div>
          </button>

          {dropdownOpen.brand && (
            <div
              className="absolute z-50 mt-1 w-full bg-white border border-[#122f5b]/30 rounded-sm shadow-lg max-h-60 overflow-y-auto"
              role="listbox"
            >
              <button
                type="button"
                role="option"
                aria-selected={filters.brand === "جميع العلامات"}
                className={`w-full text-right px-3 py-2 text-sm hover:bg-gray-100 ${
                  filters.brand === "جميع العلامات" ? "bg-[#122f5b]/10 font-medium" : ""
                }`}
                onClick={() => setFilter("brand", "جميع العلامات")}
              >
                جميع العلامات
              </button>
              {brands.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  role="option"
                  aria-selected={filters.brand === brand}
                  className={`w-full text-right px-3 py-2 text-sm hover:bg-gray-100 ${
                    filters.brand === brand ? "bg-[#122f5b]/10 font-medium" : ""
                  }`}
                  onClick={() => setFilter("brand", brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div className="relative" ref={dropdownRefs.price}>
          <button
            type="button"
            onClick={() => toggleDropdown("price")}
            className={`w-full flex items-center justify-between px-3 py-2 border ${
              filters.price !== "جميع الأسعار" ? "border-[#122f5b] bg-[#122f5b]/10" : "border-[#122f5b]/30"
            } rounded-sm text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#122f5b] focus:border-transparent transition-colors`}
            aria-expanded={dropdownOpen.price}
            aria-haspopup="listbox"
            aria-label="اختيار نطاق السعر"
          >
            <div className="flex items-center">
              {filters.price !== "جميع الأسعار" && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    resetFilter("price")
                  }}
                  className="ml-1 text-[#122f5b] hover:text-[#0f1f3d] cursor-pointer"
                  aria-label="مسح فلتر السعر"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen.price ? "rotate-180" : ""}`} />
            </div>
            <div className="flex items-center">
              <span className="truncate text-xs md:text-sm">{filters.price}</span>
              <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
            </div>
          </button>

          {dropdownOpen.price && (
            <div
              className="absolute z-50 mt-1 w-full bg-white border border-[#122f5b]/30 rounded-sm shadow-lg"
              role="listbox"
            >
              {getPriceRanges().map((price) => (
                <button
                  key={price}
                  type="button"
                  role="option"
                  aria-selected={filters.price === price}
                  className={`w-full text-right px-3 py-2 text-sm hover:bg-gray-100 ${
                    filters.price === price ? "bg-[#122f5b]/10 font-medium" : ""
                  }`}
                  onClick={() => setFilter("price", price)}
                >
                  {price}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort Filter */}
        <div className="relative" ref={dropdownRefs.sort}>
          <button
            type="button"
            onClick={() => toggleDropdown("sort")}
            className={`w-full flex items-center justify-between px-3 py-2 border ${
              filters.sort !== "الأحدث" ? "border-[#122f5b] bg-[#122f5b]/10" : "border-[#122f5b]/30"
            } rounded-sm text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#122f5b] focus:border-transparent transition-colors`}
            aria-expanded={dropdownOpen.sort}
            aria-haspopup="listbox"
            aria-label="اختيار طريقة الترتيب"
          >
            <div className="flex items-center">
              {filters.sort !== "الأحدث" && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    resetFilter("sort")
                  }}
                  className="ml-1 text-[#122f5b] hover:text-[#0f1f3d] cursor-pointer"
                  aria-label="مسح فلتر الترتيب"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen.sort ? "rotate-180" : ""}`} />
            </div>
            <div className="flex items-center">
              <span className="truncate text-xs md:text-sm">{filters.sort}</span>
              <Clock className="w-4 h-4 mr-2 text-gray-500" />
            </div>
          </button>

          {dropdownOpen.sort && (
            <div
              className="absolute z-50 mt-1 w-full bg-white border border-[#122f5b]/30 rounded-sm shadow-lg"
              role="listbox"
            >
              {getSortOptions().map((sort) => (
                <button
                  key={sort}
                  type="button"
                  role="option"
                  aria-selected={filters.sort === sort}
                  className={`w-full text-right px-3 py-2 text-sm hover:bg-gray-100 ${
                    filters.sort === sort ? "bg-[#122f5b]/10 font-medium" : ""
                  }`}
                  onClick={() => setFilter("sort", sort)}
                >
                  {sort}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
