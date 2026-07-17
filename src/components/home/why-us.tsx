"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "./fade-in"
import { ShieldCheck, Clock, MapPin, Leaf } from "lucide-react"
import { BogaCircles } from "@/components/brand/boga-circles"
import { BogaDecor } from "@/components/brand/boga-decor"

const reasons = [
  {
    title: "Estándar de excelencia",
    description: "Procesos validados y operación impecable en cada evento.",
    icon: ShieldCheck,
  },
  {
    title: "Operación 24/7",
    description: "Soporte técnico permanente durante todo el evento.",
    icon: Clock,
  },
  {
    title: "Cobertura nacional",
    description: "Sedes operativas en Medellín y Bogotá para toda Colombia.",
    icon: MapPin,
  },
  {
    title: "Insumos eco-friendly",
    description: "Compromiso real con el medio ambiente y la sostenibilidad.",
    icon: Leaf,
  },
]

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-[var(--boga-deep-500)] py-16 md:py-24">
      <BogaDecor
        variant="waves"
        tone="lima"
        className="absolute left-6 top-8 h-10 w-24 opacity-30"
      />
      <div className="container-boga relative z-10">
        <FadeIn className="mb-12 text-center">
          <span className="mb-3 inline-flex items-center gap-2 text-caption uppercase tracking-wider text-[var(--boga-lima-500)]">
            <BogaCircles size="s" tone="lima" />
            Por qué BOGA
          </span>
          <h2 className="text-2xl font-bold text-white md:text-4xl">
            La diferencia BOGA
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/70">
            Más de una década respaldando los eventos más importantes del país
          </p>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <FadeIn key={reason.title} delay={index * 0.1}>
                <Card className="h-full border-white/10 bg-white/5 text-white backdrop-blur-sm transition-all hover:border-[var(--boga-lima-500)]/30 hover:bg-white/10">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--boga-lima-500)]/40 text-[var(--boga-lima-500)]">
                      <Icon className="h-7 w-7" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/70">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
