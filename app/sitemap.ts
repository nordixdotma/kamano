import type { MetadataRoute } from "next"
import { getAllProducts } from "@/lib/products"

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts()

  const productUrls = products.map((product) => ({
    url: `https://riadphone.com/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const categoryUrls = ["هواتف-ذكية", "أجهزة-كمبيوتر", "تلفزيونات", "إكسسوارات"].map((category) => ({
    url: `https://riadphone.com/category/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [
    {
      url: "https://riadphone.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...categoryUrls,
    ...productUrls,
  ]
}
