import { ShoppingBag } from "lucide-react"

interface EmptyProductStateProps {
  title?: string
  message?: string
  showLink?: boolean
  compact?: boolean
}

export default function EmptyProductState({
  title = "Aucun Produit Trouvé",
  message = "Nous n'avons pas pu trouver de produits correspondant à vos critères.",
  showLink = false,
  compact = false,
}: EmptyProductStateProps) {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center bg-[#f9f7f4] rounded-lg border border-gray-200 ${
        compact ? "py-8" : "py-16"
      }`}
    >
      <div className="bg-[#122f5b]/10 p-4 rounded-full mb-4">
        <ShoppingBag className="w-8 h-8 text-[#122f5b]" />
      </div>
      <h3 className="text-xl font-serif font-semibold text-[#122f5b] mb-2">{title}</h3>
      <p className="text-gray-600 text-center max-w-md mb-6 px-4">{message}</p>
    </div>
  )
}
