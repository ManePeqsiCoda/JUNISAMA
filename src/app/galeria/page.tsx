import type { Metadata } from "next"
import { eventos } from "@/lib/mocks"
import { GalleryGrid } from "./gallery-grid"
import {
  seoConfig,
  generateOpenGraph,
  generateTwitterCard,
  generateBreadcrumbJsonLd,
} from "@/lib/seo"

export const metadata: Metadata = {
  title: seoConfig.galeria.title,
  description: seoConfig.galeria.description,
  keywords: seoConfig.galeria.keywords,
  alternates: { canonical: "/galeria" },
  openGraph: generateOpenGraph("galeria", "/galeria"),
  twitter: generateTwitterCard("galeria"),
}

export default function GaleriaPage() {
  const publicEventos = eventos
    .filter((e) => e.estado === "PUBLICADO")
    .sort((a, b) => b.anio - a.anio)

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Galería", path: "/galeria" },
  ])

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <GalleryGrid eventos={publicEventos} />
    </div>
  )
}
