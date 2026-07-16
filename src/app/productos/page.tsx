import type { Metadata } from "next"
import { productos, categorias } from "@/lib/mocks"
import { ProductCatalog } from "./product-catalog"
import {
  seoConfig,
  generateOpenGraph,
  generateTwitterCard,
  generateBreadcrumbJsonLd,
} from "@/lib/seo"

export const metadata: Metadata = {
  title: seoConfig.productos.title,
  description: seoConfig.productos.description,
  keywords: seoConfig.productos.keywords,
  alternates: { canonical: "/productos" },
  openGraph: generateOpenGraph("productos", "/productos"),
  twitter: generateTwitterCard("productos"),
}

export default function ProductosPage() {
  const activeProductos = productos
    .filter((p) => p.estado === "ACTIVO")
    .sort((a, b) => a.orden - b.orden)

  const activeCategorias = categorias.sort((a, b) => a.orden - b.orden)

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Productos", path: "/productos" },
  ])

  return (
    <div className="min-h-screen bg-boga-surface-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-boga-deep-500 pb-16 pt-32">
        <div className="container mx-auto px-4 text-center lg:px-6">
          <h1 className="text-3xl font-extrabold text-boga-text-inverted md:text-5xl">
            Nuestros Productos
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-boga-text-inverted/70">
            Soluciones sanitarias portátiles para todo tipo de evento
          </p>
        </div>
      </section>

      <ProductCatalog productos={activeProductos} categorias={activeCategorias} />
    </div>
  )
}
