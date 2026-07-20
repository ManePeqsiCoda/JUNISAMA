"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { FadeIn } from "@/components/home/fade-in"
import { BogaCircles } from "@/components/brand/boga-circles"
import { BogaDecor } from "@/components/brand/boga-decor"
import { cn } from "@/lib/utils"
import {
  Sparkles,
  Zap,
  Smile,
  Droplets,
  Bath,
  HandHelping,
  Wrench,
  Leaf,
  Recycle,
  Wind,
  MapPin,
  ExternalLink,
  Truck,
  Clock,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react"

const commitments = [
  {
    id: "higiene",
    icon: Sparkles,
    title: "Altos estándares de higiene",
    description:
      "Protocolos de limpieza y desinfección certificados para garantizar la salud de los usuarios en cada evento.",
    detail:
      "Cada unidad se prepara con checklist de higiene, reposición de insumos y control de calidad antes del montaje.",
    image: "/images/quienes-somos/compromiso-higiene.jpg",
    accent: "from-boga-electric-500/90 to-boga-deep-500/90",
  },
  {
    id: "eficiencia",
    icon: Zap,
    title: "Máxima eficiencia",
    description:
      "Logística optimizada, tiempos de respuesta rápidos y operación sin contratiempos.",
    detail:
      "Rutas planificadas, flota propia y turnos flexibles para que la infraestructura sanitaria nunca detenga tu producción.",
    image: "/images/quienes-somos/compromiso-logistica.jpg",
    accent: "from-boga-lima-500/90 to-boga-electric-600/90",
  },
  {
    id: "experiencia",
    icon: Smile,
    title: "Experiencia superior",
    description:
      "Atención cercana y profesional para que tu evento u obra transcurra sin preocupaciones.",
    detail:
      "Acompañamos ferias, conciertos y obras de alto perfil con el mismo estándar de servicio impecable.",
    image: "/images/quienes-somos/compromiso-experiencia.jpg",
    accent: "from-boga-deep-500/90 to-boga-electric-500/90",
  },
]

const equipment = [
  {
    icon: Bath,
    label: "Baños portátiles",
    description: "VIP, estándar, eléctricos e inclusivos para cualquier aforo.",
    image: "/images/products/bano-vip-photo.jpg",
    href: "/servicios/bano-vip",
  },
  {
    icon: Droplets,
    label: "Duchas y lavamanos",
    description: "Módulos de higiene complementarios para obras y festivales.",
    image: "/images/products/lavamanos-photo.jpg",
    href: "/servicios/lavamanos",
  },
  {
    icon: Truck,
    label: "Trailer de lujo",
    description: "Experiencia premium con acabados de alto nivel.",
    image: "/images/products/trailer-lujo-photo.jpg",
    href: "/servicios/trailer-lujo",
  },
  {
    icon: HandHelping,
    label: "Operarios en campo",
    description: "Personal capacitado para operación continua 24/7.",
    image: "/images/products/operarios-photo.jpg",
    href: "/servicios/operarios",
  },
  {
    icon: Recycle,
    label: "Puntos ecológicos",
    description: "Gestión de residuos alineada a tu plan de sostenibilidad.",
    image: "/images/products/puntos-ecologicos-photo.jpg",
    href: "/servicios/puntos-ecologicos",
  },
  {
    icon: Wrench,
    label: "Equipos especializados",
    description: "Soluciones a medida para condiciones exigentes.",
    image: "/images/products/electricos-photo.jpg",
    href: "/servicios/electricos",
  },
]

const environmental = [
  {
    icon: Leaf,
    title: "Insumos biodegradables",
    description:
      "Papel, jabones y desinfectantes amigables con el medio ambiente.",
    color: "bg-boga-lima-500/20 text-boga-lima-500 border-boga-lima-500/40",
  },
  {
    icon: Recycle,
    title: "Descomposición responsable",
    description:
      "Procesos que minimizan el impacto ambiental de los residuos sanitarios.",
    color:
      "bg-boga-electric-500/15 text-boga-electric-400 border-boga-electric-500/40",
  },
  {
    icon: Wind,
    title: "Eliminación de olores",
    description:
      "Tecnología de neutralización para espacios frescos y limpios.",
    color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
  },
]

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

const techHighlights = [
  { icon: Truck, label: "Unidades vactor" },
  { icon: Clock, label: "Cobertura 24/7" },
  { icon: ShieldCheck, label: "Mantenimiento preventivo" },
]

export function QuienesSomosStory() {
  const [activeCommitment, setActiveCommitment] = useState(commitments[0].id)
  const active =
    commitments.find((c) => c.id === activeCommitment) ?? commitments[0]
  const ActiveIcon = active.icon

  return (
    <>
      {/* —— Compromiso: scrollytelling + hover —— */}
      <section className="relative overflow-hidden bg-boga-surface-muted py-20 lg:py-28">
        <BogaDecor
          variant="bubbles"
          tone="electric"
          className="absolute -left-10 top-10 h-48 w-48 opacity-30"
        />
        <div className="container-boga relative z-10">
          <FadeIn className="mb-14 max-w-2xl">
            <span className="mb-3 inline-flex items-center gap-2 text-caption uppercase tracking-wider text-boga-electric-500">
              <BogaCircles size="s" tone="electric" />
              Compromiso
            </span>
            <h2 className="text-3xl font-extrabold text-boga-text-primary md:text-4xl">
              Nuestro Compromiso
            </h2>
            <p className="mt-3 text-lg text-boga-text-secondary">
              Tres pilares que guían cada montaje. Explora cada uno: la imagen
              y el detalle responden a tu interacción.
            </p>
          </FadeIn>

          <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="relative order-2 min-h-[320px] lg:order-1 lg:min-h-[480px] lg:sticky lg:top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 overflow-hidden rounded-3xl"
                >
                  <Image
                    src={active.image}
                    alt={active.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-t",
                      active.accent
                    )}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
                      <ActiveIcon className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <p className="text-xl font-bold text-white md:text-2xl">
                      {active.title}
                    </p>
                    <p className="mt-2 max-w-md text-sm text-white/85 md:text-base">
                      {active.detail}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="order-1 space-y-4 lg:order-2">
              {commitments.map((item, index) => {
                const Icon = item.icon
                const isActive = item.id === activeCommitment
                return (
                  <FadeIn key={item.id} delay={index * 0.08}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveCommitment(item.id)}
                      onFocus={() => setActiveCommitment(item.id)}
                      onClick={() => setActiveCommitment(item.id)}
                      className={cn(
                        "group w-full rounded-2xl border p-5 text-left transition-all duration-300",
                        isActive
                          ? "border-boga-electric-500 bg-boga-surface-elevated shadow-boga-3"
                          : "border-boga-border-subtle bg-boga-surface-elevated/60 hover:border-boga-electric-500/40 hover:shadow-boga-2"
                      )}
                    >
                      <div className="flex gap-4">
                        <span
                          className={cn(
                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-colors",
                            isActive
                              ? "border-boga-lima-500 bg-boga-lima-500 text-boga-text-on-lima"
                              : "border-boga-electric-500/30 text-boga-electric-500 group-hover:border-boga-lima-500/50"
                          )}
                        >
                          <Icon className="h-6 w-6" strokeWidth={1.75} />
                        </span>
                        <div>
                          <h3 className="text-lg font-bold text-boga-text-primary">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm text-boga-text-secondary">
                            {item.description}
                          </p>
                          <motion.p
                            initial={false}
                            animate={{
                              height: isActive ? "auto" : 0,
                              opacity: isActive ? 1 : 0,
                              marginTop: isActive ? 8 : 0,
                            }}
                            className="overflow-hidden text-sm font-medium text-boga-electric-500"
                          >
                            {item.detail}
                          </motion.p>
                        </div>
                      </div>
                    </button>
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* —— Equipos: grid interactivo —— */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, var(--boga-electric-500), transparent 40%), radial-gradient(circle at 80% 70%, var(--boga-lima-500), transparent 35%)",
          }}
          aria-hidden
        />
        <div className="container-boga relative z-10">
          <FadeIn className="mb-12 text-center">
            <span className="mb-3 inline-flex items-center gap-2 text-caption uppercase tracking-wider text-boga-electric-500">
              <BogaCircles size="s" tone="electric" />
              Flota
            </span>
            <h2 className="text-3xl font-extrabold text-boga-text-primary md:text-4xl">
              Equipos Disponibles
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-boga-text-secondary">
              Una flota diversa lista para montarse. Pasa el cursor y descubre
              cada línea de servicio.
            </p>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {equipment.map((item, index) => {
              const Icon = item.icon
              return (
                <FadeIn key={item.label} delay={index * 0.06}>
                  <Link
                    href={item.href}
                    className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-boga-surface-muted shadow-boga-2"
                  >
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-boga-deep-500 via-boga-deep-500/40 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
                    <motion.div
                      className="absolute -right-8 -top-8 h-28 w-28 rounded-full border border-boga-lima-500/40 bg-boga-lima-500/10"
                      animate={{ rotate: [0, 12, 0] }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      aria-hidden
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <span className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-boga-lima-500 text-boga-text-on-lima transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <h3 className="text-lg font-bold text-white">
                        {item.label}
                      </h3>
                      <p className="mt-1 text-sm text-white/75 transition-all duration-300 group-hover:text-white">
                        {item.description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-boga-lima-500 opacity-0 transition-opacity group-hover:opacity-100">
                        Ver servicio
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* —— Servicio técnico —— */}
      <section className="relative overflow-hidden bg-boga-deep-500 py-20 lg:py-28">
        <BogaDecor
          variant="waves"
          tone="lima"
          className="absolute left-8 top-10 h-10 w-24 opacity-30"
        />
        <motion.div
          className="pointer-events-none absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-boga-electric-500/20 blur-3xl"
          animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          aria-hidden
        />
        <div className="container-boga relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn direction="left">
              <div className="space-y-5">
                <span className="inline-flex items-center gap-2 text-caption uppercase tracking-wider text-boga-lima-500">
                  <BogaCircles size="s" tone="lima" />
                  Operación
                </span>
                <h2 className="text-3xl font-extrabold text-boga-text-inverted md:text-4xl">
                  Servicio Técnico
                </h2>
                <p className="text-boga-text-inverted/75">
                  Nuestro equipo de mantenimiento cuenta con vehículos tipo
                  vactor y unidades móviles equipadas para atender cualquier
                  situación en campo. Realizamos limpieza profunda,
                  desinfección, reposición de insumos y revisión técnica
                  preventiva.
                </p>
                <p className="text-boga-text-inverted/75">
                  Operamos con turnos flexibles y cobertura 24/7, asegurando
                  que tu evento u obra nunca se detenga por problemas de
                  infraestructura sanitaria.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {techHighlights.map((h) => {
                    const Icon = h.icon
                    return (
                      <span
                        key={h.label}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/90"
                      >
                        <Icon className="h-4 w-4 text-boga-lima-500" />
                        {h.label}
                      </span>
                    )
                  })}
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-white/10">
                <Image
                  src="/images/quienes-somos/servicio-tecnico.jpg"
                  alt="Técnico BOGA en operación de campo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-boga-deep-500/50 via-transparent to-boga-lima-500/10" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* —— Ambiental —— */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0">
          <Image
            src="/images/quienes-somos/ambiental-fondo.jpg"
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-boga-surface-canvas via-boga-surface-canvas/95 to-boga-surface-canvas" />
        </div>
        <div className="container-boga relative z-10">
          <FadeIn className="mb-14 text-center">
            <span className="mb-3 inline-flex items-center gap-2 text-caption uppercase tracking-wider text-boga-lima-500">
              <BogaCircles size="s" tone="lima" />
              Sostenibilidad
            </span>
            <h2 className="text-3xl font-extrabold text-boga-text-primary md:text-4xl">
              Compromiso Ambiental
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-boga-text-secondary">
              Prácticas sostenibles que cuidan el entorno sin comprometer la
              calidad del servicio.
            </p>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {environmental.map((item, index) => {
              const Icon = item.icon
              return (
                <FadeIn key={item.title} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="relative h-full overflow-hidden rounded-3xl border border-boga-border-subtle bg-boga-surface-elevated/90 p-6 shadow-boga-2 backdrop-blur-sm"
                  >
                    <motion.div
                      className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-boga-lima-500/10"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{
                        duration: 4 + index,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      aria-hidden
                    />
                    <span
                      className={cn(
                        "relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border",
                        item.color
                      )}
                    >
                      <Icon className="h-7 w-7" strokeWidth={1.75} />
                    </span>
                    <h3 className="relative mt-5 text-lg font-bold text-boga-text-primary">
                      {item.title}
                    </h3>
                    <p className="relative mt-2 text-sm text-boga-text-secondary">
                      {item.description}
                    </p>
                  </motion.div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* —— Sedes: split vertical + fotos clickeables —— */}
      <section className="bg-boga-surface-muted py-20 lg:py-28">
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
              Presencia operativa en las dos principales ciudades del país.
              Toca la imagen para abrir cómo llegar en Google Maps.
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
    </>
  )
}
