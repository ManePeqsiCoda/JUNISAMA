import { ProductCard } from "./product-card"
import type { Producto } from "@/lib/mocks"

interface ProductGridProps {
  productos: Producto[]
  className?: string
  columns?: 2 | 3 | 4
}

export function ProductGrid({ productos, className, columns = 3 }: ProductGridProps) {
  const columnClass =
    columns === 2
      ? "md:grid-cols-2"
      : columns === 4
        ? "md:grid-cols-2 lg:grid-cols-4"
        : "md:grid-cols-2 lg:grid-cols-3"

  return (
    <div
      className={
        className ||
        `grid grid-cols-1 gap-6 ${columnClass}`
      }
    >
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  )
}
