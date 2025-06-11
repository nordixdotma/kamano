"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/lib/cart-context"
import { products } from "@/lib/products"

interface HeaderProps {
  forceWhite?: boolean
}

export default function Header({ forceWhite = false }: HeaderProps) {
  const { totalItems, openCart } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // Get unique categories
  const categories = [...new Set(products.map((p) => p.category))]

  // Handle scroll events to hide/show scrolling banner
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll locking for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflow = "hidden"
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || "0", 10) * -1)
      }
    }

    return () => {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

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
    closed: { x: "100%", opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { ease: "easeInOut", duration: 0.3 },
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

  const menuItems = [{ name: "الرئيسية", href: "/" }]

  const marqueeText = "عرض خاص: التوصيل بالمجان ف كل أنحاء المغرب، والدفع عند الاستلام، اسرع واطلب الآن"

  return (
    <>
      {/* Simple Scrolling Banner - Always visible */}
      {!isScrolled && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-500 py-3">
          <div className="marquee-container">
            <div className="marquee-content text-white text-sm md:text-base font-bold tracking-wider">
              {/* Repeat the text multiple times to ensure continuous scrolling */}
              {marqueeText} &nbsp;&nbsp;&nbsp; {marqueeText} &nbsp;&nbsp;&nbsp; {marqueeText} &nbsp;&nbsp;&nbsp;
              {marqueeText} &nbsp;&nbsp;&nbsp; {marqueeText} &nbsp;&nbsp;&nbsp; {marqueeText} &nbsp;&nbsp;&nbsp;
              {marqueeText} &nbsp;&nbsp;&nbsp; {marqueeText} &nbsp;&nbsp;&nbsp; {marqueeText} &nbsp;&nbsp;&nbsp;
              {marqueeText} &nbsp;&nbsp;&nbsp; {marqueeText} &nbsp;&nbsp;&nbsp; {marqueeText} &nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </div>
      )}

      {/* Header - Dynamic positioning based on scroll */}
      <header
        ref={headerRef}
        className={`fixed left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-md py-3 transition-all duration-300 ${
          isScrolled ? "top-0" : "top-12"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="w-32 h-8 md:w-40 md:h-10 relative">
                <div className="w-full h-full rounded flex items-center justify-center text-sm font-bold bg-red-500 text-white">
                  شعار الموقع
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base relative group transition-colors font-medium text-red-500 hover:text-red-600"
                >
                  {item.name}
                  <span className="absolute -bottom-1 right-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-red-500"></span>
                </Link>
              ))}

              {/* Direct Category Links */}
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${encodeURIComponent(category)}`}
                  className="text-base relative group transition-colors font-medium text-red-500 hover:text-red-600"
                >
                  {category}
                  <span className="absolute -bottom-1 right-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-red-500"></span>
                </Link>
              ))}
            </nav>

            {/* Desktop Action Icons */}
            <div className="hidden md:flex items-center">
              <button
                className="transition-colors relative text-red-500 hover:text-red-600"
                onClick={openCart}
                aria-label="السلة"
              >
                <ShoppingBag size={20} />
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-4 space-x-reverse md:hidden">
              <button
                className="relative transition-colors text-red-500 hover:text-red-600"
                onClick={openCart}
                aria-label="السلة"
              >
                <ShoppingBag size={20} />
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              </button>
              <button
                className="p-2 rounded-md transition-colors text-red-500 hover:bg-red-500/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="القائمة"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - Full screen height with higher z-index */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed z-[80] md:hidden"
              style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                height: "100vh",
                width: "100vw",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              initial="closed"
              animate="open"
              exit="exit"
              variants={menuVariants}
              className="fixed right-0 w-4/5 max-w-sm bg-white shadow-xl z-[90] md:hidden"
              style={{
                top: 0,
                bottom: 0,
                height: "100vh",
              }}
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-red-500">القائمة</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-md hover:bg-red-500/10 transition-colors"
                    aria-label="إغلاق القائمة"
                  >
                    <X size={24} className="text-red-500" />
                  </button>
                </div>

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
                          className="block text-red-500 hover:text-red-600 hover:bg-red-500/5 transition-colors font-medium py-3 px-4 rounded-md text-lg text-right"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}

                    {/* Mobile Categories */}
                    <motion.div custom={1} variants={menuItemVariants} initial="closed" animate="open">
                      <div className="text-red-500 font-medium py-3 px-4 text-lg text-right border-b border-gray-200">
                        الفئات
                      </div>
                      <div className="space-y-2 mt-2">
                        {categories.map((category) => (
                          <Link
                            key={category}
                            href={`/category/${encodeURIComponent(category)}`}
                            className="block text-gray-600 hover:text-red-600 hover:bg-red-500/5 transition-colors py-2 px-6 rounded-md text-right"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  </nav>
                </div>

                <div className="p-5 border-t border-gray-100">
                  <div className="flex space-x-4 space-x-reverse justify-center">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                      aria-label="فيسبوك"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-500"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a
                      href="https://instagram.com/tierrablanca.ma"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                      aria-label="إنستغرام"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-500"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
