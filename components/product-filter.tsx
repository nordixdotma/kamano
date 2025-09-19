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
      className={`md:bg-white md:rounded-xl md:shadow-md p-3 md:p-4 mb-4 md:mb-8 transition-all duration-700 transform relative z-30 ${
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
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 font-medium rounded-lg text-sm px-4 py-2.5 transition-colors flex items-center justify-center w-2/12"
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
            onClick={() => toggleDropdown("category")}
            className={`w-full flex items-center justify-between px-3 py-2 border ${
              filters.category !== "جميع الفئات" ? "border-red-500 bg-red-50" : "border-gray-200"
            } rounded-lg text-right text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors`}
          >
            <div className="flex items-center">
              {filters.category !== "جميع الفئات" && (
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    resetFilter("category")
                  }}
                  className="ml-1 text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </div>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen.category ? "rotate-180" : ""}`} />
            </div>
            <div className="flex items-center">
              <span className="truncate text-xs md:text-sm">{filters.category}</span>
              <Grid3X3 className="w-4 h-4 mr-2 text-gray-500" />
            </div>
          </button>

          {dropdownOpen.category && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <button
                className={`w-full text-right px-3 py-2 text-sm hover:bg-gray-100 ${
                  filters.category === "جميع الفئات" ? "bg-red-50 font-medium" : ""
                }`}
                onClick={() => setFilter("category", "جميع الفئات")}
              >
                جميع الفئات
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`w-full text-right px-3 py-2 text-sm hover:bg-gray-100 ${
                    filters.category === category ? "bg-red-50 font-medium" : ""
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
            onClick={() => toggleDropdown("brand")}
            className={`w-full flex items-center justify-between px-3 py-2 border ${
              filters.brand !== "جميع العلامات" ? "border-red-500 bg-red-50" : "border-gray-200"
            } rounded-lg text-right text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors`}
          >
            <div className="flex items-center">
              {filters.brand !== "جميع العلامات" && (
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    resetFilter("brand")
                  }}
                  className="ml-1 text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </div>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen.brand ? "rotate-180" : ""}`} />
            </div>
            <div className="flex items-center">
              <span className="truncate text-xs md:text-sm">{filters.brand}</span>
              <Smartphone className="w-4 h-4 mr-2 text-gray-500" />
            </div>
          </button>

          {dropdownOpen.brand && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <button
                className={`w-full text-right px-3 py-2 text-sm hover:bg-gray-100 ${
                  filters.brand === "جميع العلامات" ? "bg-red-50 font-medium" : ""
                }`}
                onClick={() => setFilter("brand", "جميع العلامات")}
              >
                جميع العلامات
              </button>
              {brands.map((brand) => (
                <button
                  key={brand}
                  className={`w-full text-right px-3 py-2 text-sm hover:bg-gray-100 ${
                    filters.brand === brand ? "bg-red-50 font-medium" : ""
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
            onClick={() => toggleDropdown("price")}
            className={`w-full flex items-center justify-between px-3 py-2 border ${
              filters.price !== "جميع الأسعار" ? "border-red-500 bg-red-50" : "border-gray-200"
            } rounded-lg text-right text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors`}
          >
            <div className="flex items-center">
              {filters.price !== "جميع الأسعار" && (
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    resetFilter("price")
                  }}
                  className="ml-1 text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </div>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen.price ? "rotate-180" : ""}`} />
            </div>
            <div className="flex items-center">
              <span className="truncate text-xs md:text-sm">{filters.price}</span>
              <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
            </div>
          </button>

          {dropdownOpen.price && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              {getPriceRanges().map((price) => (
                <button
                  key={price}
                  className={`w-full text-right px-3 py-2 text-sm hover:bg-gray-100 ${
                    filters.price === price ? "bg-red-50 font-medium" : ""
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
            onClick={() => toggleDropdown("sort")}
            className={`w-full flex items-center justify-between px-3 py-2 border ${
              filters.sort !== "الأحدث" ? "border-red-500 bg-red-50" : "border-gray-200"
            } rounded-lg text-right text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors`}
          >
            <div className="flex items-center">
              {filters.sort !== "الأحدث" && (
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    resetFilter("sort")
                  }}
                  className="ml-1 text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </div>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen.sort ? "rotate-180" : ""}`} />
            </div>
            <div className="flex items-center">
              <span className="truncate text-xs md:text-sm">{filters.sort}</span>
              <Clock className="w-4 h-4 mr-2 text-gray-500" />
            </div>
          </button>

          {dropdownOpen.sort && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              {getSortOptions().map((sort) => (
                <button
                  key={sort}
                  className={`w-full text-right px-3 py-2 text-sm hover:bg-gray-100 ${
                    filters.sort === sort ? "bg-red-50 font-medium" : ""
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
