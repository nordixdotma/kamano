"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/lib/cart-context"
import { products } from "@/lib/products"

interface HeaderProps {
  forceWhite?: boolean
}

export default function Header({ forceWhite = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(forceWhite)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0)
  const [showBanner, setShowBanner] = useState(true)
  const headerRef = useRef<HTMLElement>(null)
  const { totalItems, openCart } = useCart()

  // Get unique categories
  const categories = [...new Set(products.map((p) => p.category))]

  useEffect(() => {
    const updateDimensions = () => {
      setWindowHeight(window.innerHeight)
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(forceWhite || scrollY > 10)
      setShowBanner(scrollY < 50) // Hide banner when scrolling down
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [forceWhite])

  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const menuVariants = {
    closed: { x: "-100%", opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 30 },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: { ease: "easeInOut" as const, duration: 0.3 },
    },
  }

  const menuItemVariants = {
    closed: { x: 20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  }

  const bannerVariants = {
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" as const },
    },
    hidden: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" as const },
    },
  }

  const menuItems = [{ name: "الرئيسية", href: "/" }]

  const bannerText = "🔥التوصيل مجاني وسريع في شمال المغرب"

  return (
    <>
      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-40">
        <motion.div
          variants={bannerVariants}
          animate={showBanner ? "visible" : "hidden"}
          className="bg-black text-white overflow-hidden"
        >
          <div className="relative h-8 flex items-center">
            <motion.div
              className="flex whitespace-nowrap"
              animate={{
                x: [0, 1000], // scrolls left → right
              }}
              transition={{
                x: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 15,
                  ease: "linear",
                },
              }}
            >
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="flex items-center px-8">
                  <span className="text-sm font-medium">{bannerText}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            isScrolled ? "bg-white backdrop-blur-md shadow-sm py-2" : "bg-transparent py-5 md:py-6",
          )}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              {/* Mobile Menu Button - Left */}
              <div className="md:hidden">
                <button
                  type="button"
                  className={cn(
                    "py-2 transition-colors",
                    isScrolled ? "text-[#122f5b] hover:bg-[#ffec35]/10" : "text-black hover:bg-white/10",
                  )}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="القائمة"
                  aria-expanded={isMenuOpen}
                >
                  <Menu size={24} />
                </button>
              </div>

              {/* Mobile Logo - Centered */}
              <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
                <Link href="/" className="flex items-center">
                  <img src="/logo.png" alt="شعار الموقع" className="h-10 w-auto transition-opacity duration-300" />
                </Link>
              </div>

              {/* Desktop Logo and Navigation Container */}
              <div className="hidden md:flex items-center space-x-4 space-x-reverse">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                  <img
                    src="/logo.png"
                    alt="شعار الموقع"
                    className="h-10 md:h-14 w-auto transition-opacity duration-300"
                  />
                </Link>
              </div>

              <nav className="hidden md:flex items-center space-x-8 space-x-reverse flex-1 justify-center">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-base relative group transition-colors font-medium hover:text-[#ffec35]",
                      isScrolled ? "text-black" : "text-black",
                    )}
                  >
                    {item.name}
                    <span
                      className={cn(
                        "absolute -bottom-1 right-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-[#ffec35]",
                      )}
                    />
                  </Link>
                ))}

                {/* Direct Category Links */}
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/category/${encodeURIComponent(category)}`}
                    className={cn(
                      "text-base relative group transition-colors font-medium hover:text-[#ffec35]",
                      isScrolled ? "text-black" : "text-black",
                    )}
                  >
                    {category}
                    <span
                      className={cn(
                        "absolute -bottom-1 right-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-[#ffec35]",
                      )}
                    />
                  </Link>
                ))}
              </nav>

              <div className="flex items-center space-x-4 space-x-reverse">
                {/* Desktop Action Icons - Shopping Bag */}
                <div className="hidden md:flex items-center space-x-4 space-x-reverse">
                  <button
                    type="button"
                    onClick={openCart}
                    className={cn(
                      "transition-colors relative hover:text-[#ffec35]",
                      isScrolled ? "text-black" : "text-black",
                    )}
                    aria-label="السلة"
                  >
                    <ShoppingBag size={20} />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#ffec35] text-black text-xs flex items-center justify-center cart-counter font-bold">
                        {totalItems}
                      </span>
                    )}
                  </button>
                </div>

                {/* Mobile Icons */}
                <div className="flex items-center space-x-3 space-x-reverse md:hidden">
                  <button
                    type="button"
                    onClick={openCart}
                    className={cn(
                      "relative transition-colors hover:text-[#ffec35]",
                      isScrolled ? "text-black" : "text-black",
                    )}
                    aria-label="السلة"
                  >
                    <ShoppingBag size={20} />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#ffec35] text-black text-xs flex items-center justify-center cart-counter font-bold">
                        {totalItems}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black z-50 md:hidden"
                onClick={() => setIsMenuOpen(false)}
                style={{ height: windowHeight }}
              />

              <motion.div
                initial="closed"
                animate="open"
                exit="exit"
                variants={menuVariants}
                className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white shadow-xl z-50 md:hidden mobile-menu-height"
              >
                <div className="flex flex-col h-full">
                  {/* Menu Header */}
                  <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <img src="/logo.png" alt="شعار الموقع" className="h-12 w-auto" />
                    <button
                      type="button"
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 hover:bg-[#ffec35]/10 transition-colors"
                      aria-label="إغلاق القائمة"
                    >
                      <X size={24} className="text-[#122f5b]" />
                    </button>
                  </div>

                  {/* Menu Items */}
                  <div className="flex-1 overflow-y-auto py-6 px-5">
                    <nav className="space-y-6">
                      {menuItems.map((item, i) => (
                        <motion.div
                          key={item.name}
                          custom={i}
                          variants={menuItemVariants}
                          initial="closed"
                          animate="open"
                        >
                          <Link
                            href={item.href}
                            className="block text-[#ffec35] hover:text-[#e6d42f] hover:bg-[#ffec35]/5 transition-colors font-medium py-3 px-0 text-lg text-right"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </motion.div>
                      ))}

                      {/* Mobile Categories */}
                      <motion.div custom={menuItems.length} variants={menuItemVariants} initial="closed" animate="open">
                        <div className="text-black font-medium py-3 px-0 text-lg text-right border-b border-gray-200">
                          الفئات
                        </div>
                        <div className="space-y-2 mt-2">
                          {categories.map((category) => (
                            <Link
                              key={category}
                              href={`/category/${encodeURIComponent(category)}`}
                              className="block text-gray-600 hover:text-[#ffec35] hover:bg-[#ffec35]/5 transition-colors py-2 px-4 rounded-md text-right"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {category}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    </nav>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
