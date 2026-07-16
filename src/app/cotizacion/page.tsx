import type { Metadata } from "next"
import { productos } from "@/lib/mocks"
import { QuoteWizard } from "./quote-wizard"
import {
  seoConfig,
  generateOpenGraph,
  generateTwitterCard,
  generateBreadcrumbJsonLd,
} from "@/lib/seo"

export const metadata: Metadata = {
  title: seoConfig.cotizacion.title,
  description: seoConfig.cotizacion.description,
  keywords: seoConfig.cotizacion.keywords,
  alternates: { canonical: "/cotizacion" },
  openGraph: generateOpenGraph("cotizacion", "/cotizacion"),
  twitter: generateTwitterCard("cotizacion"),
}

export default function CotizacionPage() {
  const activeProductos = productos
    .filter((p) => p.estado === "ACTIVO")
    .sort((a, b) => a.orden - b.orden)

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Cotización", path: "/cotizacion" },
  ])

  return (
    <div className="min-h-screen bg-boga-surface-muted">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <QuoteWizard productos={activeProductos} />
    </div>
  )
}
