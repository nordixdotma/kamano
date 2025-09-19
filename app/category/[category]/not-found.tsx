import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CategoryNotFound() {
  return (
    <main className="min-h-screen bg-white">
      <Header forceWhite={true} />
      <div className="pt-32 pb-16 flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#122f5b] mb-4">الفئة غير موجودة</h1>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          لم نتمكن من العثور على الفئة التي تبحث عنها. قد تكون محذوفة أو أن الرابط غير صحيح.
        </p>
        <Link href="/" className="px-6 py-3 bg-[#122f5b] text-white rounded-md hover:bg-[#0f1f3d] transition-colors">
          العودة للرئيسية
        </Link>
      </div>
      <Footer />
    </main>
  )
}
