"use client"

import Image from "next/image"
import { ExternalLink, MapPin } from "lucide-react"
import { FadeIn } from "@/components/home/fade-in"
import { BogaCircles } from "@/components/brand/boga-circles"
import { cn } from "@/lib/utils"

const sedes = [
  {
    city: "Medellín",
    title: "Nuestra sede en Medellín",
    address: "Calle 13 sur #51C-54",
    landmark: "Zona Guayabal · cerca de la Autopista Sur",
    description:
      "Operamos desde Guayabal, a pocos minutos de la Autopista Sur y del Aeropuerto Olaya Herrera. Una ubicación estratégica para salir rápido a eventos en el Valle de Aburrá y el suroccidente antioqueño.",
    image: "/images/quienes-somos/sede-medellin.jpg",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Calle+13+sur+%2351C-54,+Medell%C3%ADn,+Antioquia,+Colombia",
  },
  {
    city: "Bogotá",
    title: "Nuestra sede en Bogotá",
    address: "Cra 58b bis #131A 51",
    landmark: "Suba · cerca de la Autopista Norte",
    description:
      "Nuestra base en el norte de Bogotá, en Suba, cerca de la Autopista Norte y la Calle 127. Ideal para cubrir ferias, conciertos y obras en la capital y la sabana con respuesta ágil.",
    image: "/images/quienes-somos/sede-bogota.jpg",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Cra+58b+bis+%23131A+51,+Bogot%C3%A1,+Colombia",
  },
]

interface SedesCoverageProps {
  className?: string
  /** Fondo de sección; por defecto muted como en Quiénes Somos */
  tone?: "muted" | "canvas"
}

export function SedesCoverage({
  className,
  tone = "muted",
}: SedesCoverageProps) {
  return (
    <section
      className={cn(
        "py-20 lg:py-28",
        tone === "muted" ? "bg-boga-surface-muted" : "bg-boga-surface-canvas",
        className
      )}
    >
      <div className="container-boga">
        <FadeIn className="mb-14 text-center">
          <span className="mb-3 inline-flex items-center gap-2 text-caption uppercase tracking-wider text-boga-electric-500">
            <BogaCircles size="s" tone="electric" />
            Cobertura
          </span>
          <h2 className="text-3xl font-extrabold text-boga-text-primary md:text-4xl">
            Nuestras Sedes
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-boga-text-secondary">
            Presencia operativa en las dos principales ciudades del país. Toca
            la imagen para abrir cómo llegar en Google Maps.
          </p>
        </FadeIn>

        <div className="flex flex-col gap-10 lg:gap-14">
          {sedes.map((sede, index) => (
            <FadeIn key={sede.city} delay={index * 0.1}>
              <article
                className={cn(
                  "grid overflow-hidden rounded-3xl border border-boga-border-subtle bg-boga-surface-elevated shadow-boga-3 lg:grid-cols-2",
                  index % 2 === 1 && "lg:[&>*:first-child]:order-2"
                )}
              >
                <a
                  href={sede.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-[16/11] lg:aspect-auto lg:min-h-[340px]"
                  aria-label={`Cómo llegar a la sede BOGA en ${sede.city}`}
                >
                  <Image
                    src={sede.image}
                    alt={`Vista representativa de ${sede.city}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-boga-deep-500/80 via-boga-deep-500/20 to-transparent" />
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-boga-lima-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-boga-text-on-lima transition-transform group-hover:scale-105">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Cómo llegar
                  </span>
                </a>
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-boga-electric-500">
                    <MapPin className="h-3.5 w-3.5" />
                    {sede.landmark}
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold text-boga-text-primary md:text-3xl">
                    {sede.title}
                  </h3>
                  <p className="mt-1 font-medium text-boga-text-secondary">
                    {sede.address}
                  </p>
                  <p className="mt-4 text-boga-text-secondary">
                    {sede.description}
                  </p>
                  <a
                    href={sede.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-boga-electric-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-boga-electric-600"
                  >
                    Abrir indicaciones
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
