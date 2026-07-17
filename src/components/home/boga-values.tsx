"use client"

import { motion } from "framer-motion"
import { FadeIn } from "./fade-in"
import { Target, Eye } from "lucide-react"
import { BogaCircles } from "@/components/brand/boga-circles"
import { BogaDecor } from "@/components/brand/boga-decor"
import { cn } from "@/lib/utils"

const values = [
  { name: "EXCELENCIA", description: "Valor guía que impulsa cada operación.", angle: -90 },
  { name: "INTEGRIDAD", description: "Honestidad y transparencia en cada servicio.", angle: -150 },
  { name: "LIMPIEZA", description: "Core del negocio, absolutamente no negociable.", angle: -210 },
  { name: "SERVICIO", description: "Base de la relación con quienes confían en nosotros.", angle: 90 },
  { name: "CONFIANZA", description: "Tranquilidad para el cliente en cada evento.", angle: 30 },
  { name: "MODERNIDAD", description: "Innovación, actualidad y tecnología al servicio.", angle: -30 },
]

export function BogaValues() {
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

      {/* VALORES — arco sobre azul eléctrico (brand kit pág. 5) */}
      <section className="relative overflow-hidden bg-boga-electric-500 py-20 md:py-28">
        <BogaDecor
          variant="bubbles"
          tone="white"
          className="absolute -left-10 top-0 h-64 w-64 opacity-40"
        />
        <BogaDecor
          variant="waves"
          tone="lima"
          className="absolute right-6 top-8 h-12 w-28 opacity-50"
        />
        <BogaDecor
          variant="arrows"
          tone="lima"
          className="absolute bottom-8 left-8 h-16 w-16 opacity-40"
        />

        <div className="container-boga relative z-10">
          <FadeIn className="mb-4 text-center md:mb-0">
            <div className="mb-4 flex justify-center">
              <BogaCircles size="s" tone="lima" />
            </div>
            <h2 className="font-sans text-display-md font-black uppercase tracking-wide text-boga-lima-500 md:text-display-lg">
              Valores
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/80">
              Lo que nos mueve en cada operación
            </p>
          </FadeIn>

          {/* Desktop: arco radial */}
          <div className="relative mx-auto mt-8 hidden aspect-square max-w-xl lg:block">
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
              <BogaCircles size="l" tone="lima" />
            </div>
            {values.map((value, index) => {
              const radius = 42
              const rad = (value.angle * Math.PI) / 180
              const x = 50 + radius * Math.cos(rad)
              const y = 50 + radius * Math.sin(rad)
              return (
                <motion.div
                  key={value.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="absolute flex h-[7.5rem] w-[7.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/25 bg-white/10 px-3 text-center shadow-boga-2 backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:bg-white/15"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-boga-lima-500">
                    {value.name}
                  </span>
                  <span className="mt-1 text-[10px] leading-snug text-white/75">
                    {value.description}
                  </span>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile / tablet: grid */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
            {values.map((value, index) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={cn(
                  "flex min-h-[8rem] flex-col items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-8 text-center backdrop-blur-sm"
                )}
              >
                <span className="text-sm font-bold uppercase tracking-wider text-boga-lima-500">
                  {value.name}
                </span>
                <span className="mt-2 text-xs text-white/75">{value.description}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
