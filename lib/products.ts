// Updated Product interface for tech products with old/new pricing
export interface Product {
  id: number
  name: string
  category: string
  brand?: string
  oldPrice: string // Original price (crossed out)
  newPrice: string // Current discounted price
  materials: string[]
  sizes: string[]
  colors: string[]
  mainImage: string
  images: string[]
  inStock: boolean
  specifications?: Record<string, string> // For tech specs
}

export const products: Product[] = [
  {
    id: 1,
    name: "Samsung Galaxy S24 Ultra",
    category: "هواتف ذكية",
    brand: "Samsung",
    oldPrice: "15000 درهم",
    newPrice: "12500 درهم",
    materials: [],
    sizes: ["256GB", "512GB", "1TB"],
    colors: ["أسود", "رمادي", "ذهبي"],
    mainImage: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500&h=500&fit=crop",
    ],
    inStock: true,
    specifications: {
      الشاشة: "6.8 بوصة Dynamic AMOLED",
      المعالج: "Snapdragon 8 Gen 3",
      الذاكرة: "12GB RAM",
      الكاميرا: "200MP + 50MP + 12MP + 10MP",
    },
  },
  {
    id: 2,
    name: "MacBook Pro 14",
    category: "أجهزة كمبيوتر محمولة",
    brand: "Apple",
    oldPrice: "25000 درهم",
    newPrice: "22000 درهم",
    materials: [],
    sizes: ["M3", "M3 Pro", "M3 Max"],
    colors: ["رمادي فضائي", "فضي"],
    mainImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500&h=500&fit=crop",
    ],
    inStock: true,
    specifications: {
      الشاشة: "14.2 بوصة Liquid Retina XDR",
      المعالج: "Apple M3",
      الذاكرة: "8GB - 128GB",
      التخزين: "512GB - 8TB SSD",
    },
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    category: "سماعات",
    brand: "Sony",
    oldPrice: "4500 درهم",
    newPrice: "3200 درهم",
    materials: [],
    sizes: ["مقاس واحد"],
    colors: ["أسود", "فضي"],
    mainImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
    ],
    inStock: true,
    specifications: {
      "نوع الاتصال": "Bluetooth 5.2",
      "إلغاء الضوضاء": "نشط",
      "عمر البطارية": "30 ساعة",
      "الشحن السريع": "3 دقائق = 3 ساعات",
    },
  },
  {
    id: 5,
    name: "Samsung 65 QLED 4K TV",
    category: "تلفزيونات",
    brand: "Samsung",
    oldPrice: "12000 درهم",
    newPrice: "9500 درهم",
    materials: [],
    sizes: ["55 بوصة", "65 بوصة", "75 بوصة"],
    colors: ["أسود"],
    mainImage: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1552975084-6e027cd345c2?w=500&h=500&fit=crop",
    ],
    inStock: true,
    specifications: {
      الدقة: "4K Ultra HD",
      "تقنية العرض": "QLED",
      "معدل التحديث": "120Hz",
      النظام: "Tizen OS",
    },
  },
  {
    id: 7,
    name: "iPhone 15 Pro Max",
    category: "هواتف ذكية",
    brand: "Apple",
    oldPrice: "16000 درهم",
    newPrice: "14200 درهم",
    materials: [],
    sizes: ["256GB", "512GB", "1TB"],
    colors: ["تيتانيوم طبيعي", "تيتانيوم أزرق", "تيتانيوم أبيض", "تيتانيوم أسود"],
    mainImage: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1592286130927-570c1113d46d?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=500&h=500&fit=crop",
    ],
    inStock: true,
    specifications: {
      الشاشة: "6.7 بوصة Super Retina XDR",
      المعالج: "A17 Pro",
      الكاميرا: "48MP + 12MP + 12MP",
      المواد: "إطار تيتانيوم",
    },
  },
  {
    id: 8,
    name: "Dell XPS 13",
    category: "أجهزة كمبيوتر محمولة",
    brand: "Dell",
    oldPrice: "14000 درهم",
    newPrice: "11800 درهم",
    materials: [],
    sizes: ["Intel i5", "Intel i7"],
    colors: ["فضي", "أسود"],
    mainImage: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&h=500&fit=crop",
    ],
    inStock: true,
    specifications: {
      الشاشة: "13.4 بوصة InfinityEdge",
      المعالج: "Intel Core i7-1360P",
      الذاكرة: "16GB LPDDR5",
      التخزين: "512GB SSD",
    },
  },
  {
    id: 9,
    name: "AirPods Pro 2",
    category: "سماعات",
    brand: "Apple",
    oldPrice: "3200 درهم",
    newPrice: "2650 درهم",
    materials: [],
    sizes: ["مقاس واحد"],
    colors: ["أبيض"],
    mainImage: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop",
    ],
    inStock: true,
    specifications: {
      "إلغاء الضوضاء": "نشط",
      الشريحة: "H2",
      "عمر البطارية": "6 ساعات + 24 ساعة مع العلبة",
      "مقاومة الماء": "IPX4",
    },
  },
  {
    id: 11,
    name: "Samsung Galaxy Watch 6",
    category: "ساعات ذكية",
    brand: "Samsung",
    oldPrice: "3500 درهم",
    newPrice: "2800 درهم",
    materials: [],
    sizes: ["40mm", "44mm"],
    colors: ["أسود", "فضي", "ذهبي"],
    mainImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop",
    ],
    inStock: true,
    specifications: {
      الشاشة: "Super AMOLED",
      المعالج: "Exynos W930",
      "مقاومة الماء": "5ATM + IP68",
      "عمر البطارية": "40 ساعة",
    },
  },
  {
    id: 12,
    name: "LG OLED C3 55",
    category: "تلفزيونات",
    brand: "LG",
    oldPrice: "15000 درهم",
    newPrice: "12500 درهم",
    materials: [],
    sizes: ["55 بوصة", "65 بوصة", "77 بوصة"],
    colors: ["أسود"],
    mainImage: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1601944177325-f8867652837f?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
    ],
    inStock: true,
    specifications: {
      "تقنية العرض": "OLED evo",
      المعالج: "α9 Gen6 AI",
      "معدل التحديث": "120Hz",
      HDR: "Dolby Vision IQ",
    },
  },
]

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id)
}
