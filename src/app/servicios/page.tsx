import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "@/components/home/fade-in"
import { PageHero } from "@/components/brand/page-hero"
import { BogaCircles } from "@/components/brand/boga-circles"
import { ServiceCatalog } from "./service-catalog"
import { productos, categorias } from "@/lib/mocks"
import { ShieldCheck, MapPin, Award } from "lucide-react"
import {
  seoConfig,
  generateOpenGraph,
  generateTwitterCard,
  generateBreadcrumbJsonLd,
} from "@/lib/seo"

export const metadata: Metadata = {
  title: seoConfig.servicios.title,
  description: seoConfig.servicios.description,
  keywords: seoConfig.servicios.keywords,
  alternates: { canonical: "/servicios" },
  openGraph: generateOpenGraph("servicios", "/servicios"),
  twitter: generateTwitterCard("servicios"),
}

const differentiators = [
  {
    icon: ShieldCheck,
    title: "ISO 14001 Certificado",
    description: "Cumplimiento ambiental en cada operación.",
  },
  {
    icon: MapPin,
    title: "Cobertura nacional",
    description: "Sedes en Medellín y Bogotá, operación en todo Colombia.",
  },
  {
    icon: Award,
    title: "Personal certificado",
    description: "Técnicos capacitados en higiene industrial y atención al cliente.",
  },
]

export default function ServiciosPage() {
  const activeServicios = productos
    .filter((p) => p.estado === "ACTIVO")
    .sort((a, b) => a.orden - b.orden)

  const activeCategorias = categorias.sort((a, b) => a.orden - b.orden)

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/servicios" },
  ])

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Servicios BOGA",
    provider: {
      "@type": "Organization",
      name: "BOGA Ingeniería Portátil",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Infraestructura sanitaria portátil",
      itemListElement: activeServicios.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.nombre,
          description: item.descripcionCorta,
          url: `https://boga.com.co/servicios/${item.slug}`,
        },
      })),
    },
  }

  return (
    <div className="min-h-screen bg-boga-surface-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, serviceJsonLd]),
        }}
      />

      <PageHero
        overline="Catálogo"
        title="Nuestros Servicios"
        description="Soluciones sanitarias portátiles para eventos, obras y proyectos industriales"
      />

      <ServiceCatalog
        servicios={activeServicios}
        categorias={activeCategorias}
      />

      <section className="bg-boga-surface-muted py-16 lg:py-24">
        <div className="container-boga">
          <FadeIn className="mb-12 text-center">
            <span className="mb-3 inline-flex items-center gap-2 text-caption uppercase tracking-wider text-boga-electric-500">
              <BogaCircles size="s" tone="electric" />
              Diferenciales
            </span>
            <h2 className="text-2xl font-bold text-boga-text-primary md:text-3xl">
              ¿Por qué confiar en nuestros servicios?
            </h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-3">
            {differentiators.map((diff, index) => {
              const Icon = diff.icon
              return (
                <FadeIn key={diff.title} delay={index * 0.1}>
                  <Card className="h-full border-boga-border-subtle bg-boga-surface-elevated text-center shadow-boga-2">
                    <CardContent className="p-6">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-boga-electric-500/30 text-boga-electric-500">
                        <Icon className="h-7 w-7" strokeWidth={1.75} />
                      </div>
                      <h3 className="text-lg font-bold text-boga-text-primary">
                        {diff.title}
                      </h3>
                      <p className="mt-2 text-sm text-boga-text-secondary">
                        {diff.description}
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
