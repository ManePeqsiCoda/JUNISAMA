"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Check, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Producto } from "@/lib/mocks"

interface ProductCardProps {
  producto: Producto
  className?: string
}

// Mapeo de imágenes reales según el plan técnico.
// TODO: Subir las fotos a /public/images/products/ para reemplazar el placeholder.
function getProductImagePath(slug: string): string {
  return `/images/products/${slug}.jpg`
}

function ProductImagePlaceholder({ producto }: { producto: Producto }) {
  const specs = (producto.especificaciones as Record<string, string> | undefined) || {}
  const firstSpec = Object.entries(specs)[0]

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 p-6 text-center">
      <span className="font-outfit text-sm font-semibold text-neutral-600">
        {producto.nombre}
      </span>
      {firstSpec && (
        <span className="mt-1 text-xs text-neutral-500">
          {firstSpec[0]}: {firstSpec[1]}
        </span>
      )}
      {/* TODO: Reemplazar por foto real del producto (mín. 800x600px) */}
    </div>
  )
}

export function ProductCard({ producto, className }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const specs = (producto.especificaciones as Record<string, string> | undefined) || {}
  const specEntries = Object.entries(specs).slice(0, 3)

  const imagePath = getProductImagePath(producto.slug)

  return (
    <Link
      href={`/productos/${producto.slug}`}
      className={cn(
        "card-product group block",
        className
      )}
    >
      {/* Imagen con aspect ratio 4:3 */}
      <div className="card-product__image relative">
        {!imageError ? (
          <Image
            src={imagePath}
            alt={`Fotografía de ${producto.nombre}`}
            fill
            className={cn(
              "object-cover transition-opacity duration-500",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <ProductImagePlaceholder producto={producto} />
        )}

        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
            <span className="text-sm font-medium text-neutral-500">{producto.nombre}</span>
          </div>
        )}

        {/* Badge flotante */}
        {producto.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold text-white">
            {producto.badge}
          </span>
        )}

        {/* Overlay en hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Contenido */}
      <div className="p-6">
        <h3 className="font-outfit text-heading-sm text-secondary-800 transition-colors group-hover:text-primary-500">
          {producto.nombre}
        </h3>
        <p className="mt-2 line-clamp-2 text-body-sm text-neutral-500">
          {producto.descripcionCorta}
        </p>

        {/* Specs técnicos inline */}
        {specEntries.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {specEntries.map(([label, value]) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-600"
              >
                <Check className="h-3 w-3 text-primary-500" aria-hidden="true" />
                {value}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-500 transition-all group-hover:gap-2">
          Ver detalles
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
    </Link>
  )
}
