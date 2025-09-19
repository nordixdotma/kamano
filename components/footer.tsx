import Link from "next/link"
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  const categories = ["هواتف ذكية", "أجهزة كمبيوتر محمولة", "سماعات", "تلفزيونات", "ساعات ذكية"]

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#122f5b] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-right">
            <Link href="/" className="inline-block">
              <span className="text-2xl md:text-3xl font-serif font-bold text-white">كامانو</span>
            </Link>
            <p className="mt-4 text-sm text-white/80 leading-relaxed">
              متجرك الموثوق للإلكترونيات في المغرب. نقدم أحدث الأجهزة التقنية بأفضل الأسعار مع ضمان الجودة والخدمة
              المتميزة.
            </p>

            {/* Special Offer Banner */}
            <div className="mt-4 p-3 bg-white/10 rounded-lg border border-white/20">
              <p className="text-sm font-medium text-white">🎉 عرض خاص: التوصيل مجاناً في جميع أنحاء المغرب</p>
            </div>
          </div>

          {/* Categories */}
          <div className="text-right">
            <h3 className="text-lg font-bold text-white mb-4">فئات المنتجات</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/category/${encodeURIComponent(category)}`}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-right">
            <h3 className="text-lg font-bold text-white mb-4">تواصل معنا</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-start">
                <span className="text-white/80 text-sm ml-3">+212 7 04 74 90 27</span>
                <Phone size={16} className="text-white/60" />
              </div>
              <div className="flex items-center justify-start">
                <span className="text-white/80 text-sm ml-3">kamano.store@gmail.com</span>
                <Mail size={16} className="text-white/60" />
              </div>
              <div className="flex items-start justify-start">
                <span className="text-white/80 text-sm ml-3 text-right">المغرب، مرتيل</span>
                <MapPin size={16} className="text-white/60 mt-0.5" />
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4 space-x-reverse justify-start mt-6">
              <a
                href="https://facebook.com/kamano.store"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="فيسبوك"
              >
                <Facebook size={18} className="text-white" />
              </a>
              <a
                href="https://instagram.com/kamano.store"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="إنستغرام"
              >
                <Instagram size={18} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Simplified */}
        <div className="border-t border-white/20 mt-10 pt-6 text-center">
          <p className="text-sm text-white/60">© {currentYear} كامانو. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}
