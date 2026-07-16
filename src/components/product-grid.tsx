import { ProductCard } from "./product-card"
import type { Producto } from "@/lib/mocks"

interface ProductGridProps {
  productos: Producto[]
  className?: string
  columns?: 3 | 4
}

export function ProductGrid({ productos, className, columns = 3 }: ProductGridProps) {
  return (
    <div
      className={
        className ||
        `grid grid-cols-1 gap-[var(--boga-grid-gap)] md:grid-cols-2 ${
          columns === 4
            ? "lg:grid-cols-4"
            : "lg:grid-cols-3"
        }`
      }
    >
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  )
}
