import { notFound } from "next/navigation"
import { products } from "@/lib/products"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import FeaturedProducts from "@/components/featured-products"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = decodeURIComponent(params.category)

  // Check if category exists
  const categoryExists = products.some((product) => product.category === categoryName)

  if (!categoryExists) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <Header forceWhite={true} />
      <div className="pt-28 md:pt-32">
        <FeaturedProducts categoryFilter={categoryName} />
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
