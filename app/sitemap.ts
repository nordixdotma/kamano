import type { MetadataRoute } from "next"
import { getAllProducts } from "@/lib/products"

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts()

  const productUrls = products.map((product) => ({
    url: `https://riadphone.store/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const categoryUrls = ["هواتف-ذكية", "أجهزة-كمبيوتر", "تلفزيونات", "إكسسوارات"].map((category) => ({
    url: `https://riadphone.store/category/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [
    {
      url: "https://riadphone.store",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...categoryUrls,
    ...productUrls,
  ]
}
