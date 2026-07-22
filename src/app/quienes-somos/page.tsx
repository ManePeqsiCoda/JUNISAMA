import type { Metadata } from "next"
import Image from "next/image"
import { PageHero } from "@/components/brand/page-hero"
import { BogaCircles } from "@/components/brand/boga-circles"
import { BogaDecor } from "@/components/brand/boga-decor"
import { QuienesSomosStory } from "@/app/quienes-somos/quienes-somos-story"
import {
  seoConfig,
  generateOpenGraph,
  generateTwitterCard,
  generateBreadcrumbJsonLd,
} from "@/lib/seo"

export const metadata: Metadata = {
  title: seoConfig["quienes-somos"].title,
  description: seoConfig["quienes-somos"].description,
  keywords: seoConfig["quienes-somos"].keywords,
  alternates: { canonical: "/quienes-somos" },
  openGraph: generateOpenGraph("quienes-somos", "/quienes-somos"),
  twitter: generateTwitterCard("quienes-somos"),
}

export default function QuienesSomosPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Quiénes Somos", path: "/quienes-somos" },
  ])

  return (
    <div className="min-h-screen bg-boga-surface-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHero
        overline="Más de 10 años de experiencia"
        title="Nuestra Empresa"
        description="Infraestructura sanitaria industrial con respaldo, tecnología y compromiso ambiental"
      />

      {/* Historia — se conserva el storytelling sticky que ya funciona */}
      <section className="container-boga relative py-16 lg:py-24">
        <BogaDecor
          variant="bubbles"
          tone="electric"
          className="absolute right-0 top-8 h-40 w-40 opacity-40"
        />
        <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="order-1 lg:sticky lg:top-24">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-boga-surface-muted">
              <Image
                src="/images/quienes-somos/equipo.jpg"
                alt="Equipo BOGA"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          <div className="order-2 space-y-5 lg:py-12">
            <span className="inline-flex items-center gap-2 text-caption uppercase tracking-wider text-boga-electric-500">
              <BogaCircles size="s" tone="electric" />
              Trayectoria
            </span>
            <h2 className="text-2xl font-bold text-boga-text-primary md:text-3xl">
              Nuestra Empresa
            </h2>
            <p className="text-boga-text-secondary">
              Somos una empresa especializada en el alquiler y operación de
              unidades sanitarias portátiles para eventos de diversa magnitud.
              Desde conciertos masivos y ferias corporativas hasta obras de
              construcción y campamentos industriales, brindamos soluciones
              confiables que cumplen con los más altos estándares de higiene y
              servicio.
            </p>
            <p className="text-boga-text-secondary">
              Con más de una década de trayectoria en Colombia, hemos
              acompañado eventos icónicos como la Feria de las Flores,
              conciertos internacionales y visitas de alto perfil. Nuestra
              flota, nuestro equipo humano y nuestros protocolos están
              preparados para responder con eficiencia y profesionalismo.
            </p>
            <p className="text-boga-text-secondary">
              Nuestro compromiso es garantizar la satisfacción de nuestros
              clientes a través de un servicio integral, desde la instalación
              hasta el retiro de las unidades, con atención personalizada y
              soporte técnico disponible las 24 horas del día.
            </p>
            <p className="text-boga-text-secondary">
              Creemos que cada evento merece una experiencia sanitaria digna,
              segura y sostenible. Por eso invertimos continuamente en
              tecnología, capacitación y procesos que elevan el estándar de la
              industria.
            </p>
          </div>
        </div>
      </section>

      <QuienesSomosStory />
    </div>
  )
}
