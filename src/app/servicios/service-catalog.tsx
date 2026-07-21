"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ProductGrid } from "@/components/product-grid"
import type { Producto, Categoria } from "@/lib/mocks"
import { buttonVariants } from "@/components/ui/button"
import { FadeIn } from "@/components/home/fade-in"
import { cn } from "@/lib/utils"
import { ArrowRight, Tag } from "lucide-react"
import { PriceVisibilityToggle } from "@/components/pricing/price-visibility"
import { getPaquetesComoProductos } from "@/lib/cotizador/storage"

interface ServiceCatalogProps {
  servicios: Producto[]
  categorias: Categoria[]
}

export function ServiceCatalog({ servicios, categorias }: ServiceCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>("todos")
  const [planes, setPlanes] = useState<Producto[]>([])

  useEffect(() => {
    try {
      setPlanes(getPaquetesComoProductos())
    } catch {
      // Silently fail if storage is unavailable
    }
  }, [])

  // Merge planes into the main list
  const todosLosServicios = [...servicios, ...planes]

  const filtered =
    activeCategory === "todos"
      ? todosLosServicios
      : todosLosServicios.filter((p) => p.categoria.slug === activeCategory)

  // Add "Planes" category to the list
  const allCategorias = categorias.some((c) => c.slug === "planes")
    ? categorias
    : [
        ...categorias,
        {
          id: "cat_5",
          slug: "planes",
          nombre: "Planes",
          descripcion: "Paquetes promocionales y combos",
          icono: "Tag",
          orden: 5,
        },
      ]

  return (
    <section className="container-boga relative z-10 -mt-8 pb-20">
      <FadeIn>
        <div className="mb-10 flex flex-wrap justify-center gap-2 rounded-2xl bg-boga-surface-elevated p-3 shadow-boga-2">
          <button
            type="button"
            onClick={() => setActiveCategory("todos")}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === "todos"
                ? "bg-boga-electric-500 text-boga-text-on-electric"
                : "text-boga-text-secondary hover:bg-boga-surface-muted"
            )}
          >
            Todos
          </button>
          {allCategorias.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setActiveCategory(cat.slug)}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                activeCategory === cat.slug
                  ? "bg-boga-electric-500 text-boga-text-on-electric"
                  : "text-boga-text-secondary hover:bg-boga-surface-muted"
              )}
            >
              {cat.nombre}
            </button>
          ))}
        </div>
      </FadeIn>

      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="sr-only">Catálogo de servicios</h2>
        <p className="text-sm text-boga-text-tertiary">
          Precios de referencia · prototipo
        </p>
        <PriceVisibilityToggle showLabel size="sm" />
      </div>

      {planes.length > 0 && activeCategory === "todos" && (
        <FadeIn className="mb-8">
          <div className="rounded-2xl border border-boga-electric-500/20 bg-boga-electric-500/5 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-medium text-boga-electric-600">
              <Tag className="h-4 w-4" />
              <span>
                ¡Paquetes promocionales disponibles! Ahorra en combos especiales.
              </span>
            </div>
          </div>
        </FadeIn>
      )}

      <ProductGrid productos={filtered} columns={3} />

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-boga-text-tertiary">No hay servicios en esta categoría.</p>
        </div>
      )}

      <FadeIn delay={0.2} className="mt-16 text-center">
        <div className="rounded-2xl bg-boga-surface-muted px-6 py-10 md:px-12">
          <h2 className="text-xl font-bold text-boga-text-primary md:text-2xl">
            ¿Necesitas una solución personalizada?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-boga-text-secondary">
            Contáctanos y diseñamos juntos la infraestructura sanitaria ideal
            para tu evento.
          </p>
          <Link
            href="/cotizacion"
            className={cn(
              buttonVariants({ size: "lg" }),
              "btn-primary mt-6 px-8"
            )}
          >
            Contáctanos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </FadeIn>
    </section>
  )
}
