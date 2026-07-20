"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Target,
  Eye,
  Sparkles,
  ShieldCheck,
  Droplets,
  HeartHandshake,
  Handshake,
  Cpu,
} from "lucide-react"
import { FadeIn } from "./fade-in"
import { BogaCircles } from "@/components/brand/boga-circles"
import { BogaDecor } from "@/components/brand/boga-decor"
import { cn } from "@/lib/utils"

const values = [
  {
    name: "EXCELENCIA",
    description: "Valor guía que impulsa cada operación.",
    detail:
      "Cada montaje, cada entrega y cada detalle se miden con el mismo estándar: impecable.",
    angle: -90,
    icon: Sparkles,
  },
  {
    name: "INTEGRIDAD",
    description: "Honestidad y transparencia en cada servicio.",
    detail:
      "Cumplimos lo que prometemos. Sin letras pequeñas, con claridad de punta a punta.",
    angle: -150,
    icon: ShieldCheck,
  },
  {
    name: "LIMPIEZA",
    description: "Core del negocio, absolutamente no negociable.",
    detail:
      "La higiene define nuestra firma. Es el punto de partida de toda experiencia BOGA.",
    angle: -210,
    icon: Droplets,
  },
  {
    name: "SERVICIO",
    description: "Base de la relación con quienes confían en nosotros.",
    detail:
      "Acompañamos el evento como si fuera propio: presencia, respuesta y cuidado humano.",
    angle: 90,
    icon: HeartHandshake,
  },
  {
    name: "CONFIANZA",
    description: "Tranquilidad para el cliente en cada evento.",
    detail:
      "Sabes que llegamos a tiempo, operamos limpio y resolvemos antes de que se note.",
    angle: 30,
    icon: Handshake,
  },
  {
    name: "MODERNIDAD",
    description: "Innovación, actualidad y tecnología al servicio.",
    detail:
      "Equipos, procesos y presentación al día: infraestructura que eleva la imagen del evento.",
    angle: -30,
    icon: Cpu,
  },
] as const

function ValueOrbitCard({
  value,
  index,
  active,
  onFocus,
  onBlur,
}: {
  value: (typeof values)[number]
  index: number
  active: boolean
  onFocus: () => void
  onBlur: () => void
}) {
  const Icon = value.icon
  const radius = 38
  const rad = (value.angle * Math.PI) / 180
  const x = 50 + radius * Math.cos(rad)
  const y = 50 + radius * Math.sin(rad)

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 22,
        delay: 0.08 + index * 0.07,
      }}
      whileHover={{ scale: 1.14, zIndex: 30 }}
      whileFocus={{ scale: 1.14, zIndex: 30 }}
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label={`${value.name}: ${value.description}`}
      className={cn(
        "group absolute z-10 flex h-[10.5rem] w-[10.5rem] -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center justify-center rounded-full border px-4 text-center outline-none transition-[box-shadow,background-color,border-color] duration-300 xl:h-[11.5rem] xl:w-[11.5rem]",
        active
          ? "border-boga-lima-500/80 bg-boga-deep-500/55 shadow-[0_0_0_1px_rgba(218,247,58,0.35),0_18px_40px_rgba(27,19,65,0.35)] backdrop-blur-md"
          : "border-white/30 bg-white/12 shadow-boga-3 backdrop-blur-sm hover:border-boga-lima-400/70 hover:bg-boga-deep-500/45"
      )}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <span
        className={cn(
          "mb-2 flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300",
          active
            ? "border-boga-lima-500 bg-boga-lima-500 text-boga-deep-500"
            : "border-boga-lima-500/50 bg-boga-lima-500/15 text-boga-lima-500 group-hover:border-boga-lima-500 group-hover:bg-boga-lima-500 group-hover:text-boga-deep-500"
        )}
      >
        <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      </span>
      <span className="font-sans text-[0.8rem] font-black uppercase tracking-[0.14em] text-boga-lima-500 xl:text-sm">
        {value.name}
      </span>
      <span
        className={cn(
          "mt-1.5 max-w-[9rem] text-[0.7rem] leading-snug transition-colors duration-300 xl:text-xs",
          active ? "text-white" : "text-white/80 group-hover:text-white"
        )}
      >
        {value.description}
      </span>
    </motion.button>
  )
}

export function BogaValues() {
  const [activeName, setActiveName] = useState<string | null>(null)
  const activeValue = values.find((v) => v.name === activeName) ?? null

  return (
    <>
      {/* ADN — misión / visión */}
      <section className="bg-boga-surface-muted py-16 md:py-24">
        <div className="container-boga">
          <FadeIn className="mb-12 text-center">
            <span className="mb-3 inline-flex items-center gap-2 text-caption uppercase tracking-wider text-boga-electric-500">
              <BogaCircles size="s" tone="electric" />
              La Marca
            </span>
            <h2 className="font-sans text-heading-lg text-boga-text-primary md:text-display-md">
              ADN BOGA
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-boga-text-secondary">
              Más que infraestructura, creamos experiencias limpias, modernas y
              confiables.
            </p>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2">
            <FadeIn direction="left">
              <div className="rounded-2xl border border-boga-border-subtle bg-boga-surface-elevated p-6 shadow-boga-2 md:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-boga-electric-500 text-boga-electric-500">
                  <Target className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-boga-text-primary">Misión</h3>
                <p className="mt-2 text-boga-text-secondary">
                  Brindar un acompañamiento humano y personalizado, donde la limpieza
                  y la modernidad son nuestra firma.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="rounded-2xl border border-boga-border-subtle bg-boga-surface-elevated p-6 shadow-boga-2 md:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-boga-electric-500 text-boga-electric-500">
                  <Eye className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-boga-text-primary">Visión</h3>
                <p className="mt-2 text-boga-text-secondary">
                  Consolidarnos como el referente nacional de calidad y elegancia en
                  servicios sanitarios móviles.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* VALORES — órbita interactiva */}
      <section className="relative overflow-hidden bg-boga-electric-500 py-20 md:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(27,19,65,0.45) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <BogaDecor
          variant="bubbles"
          tone="white"
          className="absolute -left-16 -top-8 h-72 w-72 opacity-30"
        />
        <BogaDecor
          variant="waves"
          tone="lima"
          className="absolute right-8 top-10 h-14 w-32 opacity-45"
        />
        <BogaDecor
          variant="arrows"
          tone="lima"
          className="absolute bottom-10 left-10 h-16 w-16 opacity-35"
        />

        <div className="container-boga relative z-10">
          <FadeIn className="text-center">
            <div className="mb-4 flex justify-center">
              <BogaCircles size="m" tone="lima" />
            </div>
            <h2 className="font-sans text-display-md font-black uppercase tracking-wide text-boga-lima-500 md:text-display-lg">
              Valores
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-white/90 md:text-lg">
              Lo que nos mueve en cada operación. Pasa el cursor para explorarlos.
            </p>
          </FadeIn>

          {/* Desktop / large: órbita */}
          <div className="relative mx-auto mt-6 hidden min-h-[36rem] w-full max-w-4xl lg:block xl:min-h-[40rem]">
            {/* Anillos orbitales */}
            <motion.div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-boga-lima-500/25"
              animate={{ rotate: -360 }}
              transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
            />

            {/* Núcleo central */}
            <div className="absolute left-1/2 top-1/2 z-20 flex w-[13rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center xl:w-[15rem]">
              <motion.div
                className="flex h-[11.5rem] w-[11.5rem] flex-col items-center justify-center rounded-full border-2 border-boga-lima-500/60 bg-boga-deep-500/50 px-5 text-center shadow-[0_0_48px_rgba(218,247,58,0.18)] backdrop-blur-md xl:h-[13rem] xl:w-[13rem]"
                animate={{
                  boxShadow: [
                    "0 0 32px rgba(218,247,58,0.12)",
                    "0 0 56px rgba(218,247,58,0.28)",
                    "0 0 32px rgba(218,247,58,0.12)",
                  ],
                }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <AnimatePresence mode="wait">
                  {activeValue ? (
                    <motion.div
                      key={activeValue.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22 }}
                      className="px-1"
                    >
                      <p className="text-[0.7rem] font-black uppercase tracking-[0.18em] text-boga-lima-500">
                        {activeValue.name}
                      </p>
                      <p className="mt-2 text-[0.8rem] leading-snug text-white xl:text-sm">
                        {activeValue.detail}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center"
                    >
                      <BogaCircles size="l" tone="lima" />
                      <p className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/75">
                        Explora un valor
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {values.map((value, index) => (
              <ValueOrbitCard
                key={value.name}
                value={value}
                index={index}
                active={activeName === value.name}
                onFocus={() => setActiveName(value.name)}
                onBlur={() => setActiveName(null)}
              />
            ))}
          </div>

          {/* Mobile / tablet: grid ampliado */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.article
                  key={value.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/25 bg-white/12 p-6 text-left shadow-boga-3 backdrop-blur-sm transition-colors hover:border-boga-lima-400/70 hover:bg-boga-deep-500/40"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-boga-lima-500/60 bg-boga-lima-500/20 text-boga-lima-500 transition-colors group-hover:bg-boga-lima-500 group-hover:text-boga-deep-500">
                      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <h3 className="font-sans text-base font-black uppercase tracking-[0.12em] text-boga-lima-500">
                      {value.name}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-white/90">
                    {value.description}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70 transition-colors group-hover:text-white/90">
                    {value.detail}
                  </p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
