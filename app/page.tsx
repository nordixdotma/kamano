import Hero from "@/components/hero"
import FeaturedProducts from "@/components/featured-products"
import WhatsAppButton from "@/components/whatsapp-button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ViewCounter from "@/components/view-counter"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f9f7f4]">
      <Header />
      <Hero />
      <FeaturedProducts />
      <Footer />
      <ViewCounter />
      <WhatsAppButton />
    </main>
  )
}
