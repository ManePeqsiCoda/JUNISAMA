"use client"

import { FadeIn } from "./fade-in"
import { Sparkles, Eye, Target } from "lucide-react"

const values = [
  { name: "EXCELENCIA", description: "Valor guía que impulsa cada operación." },
  { name: "INTEGRIDAD", description: "Honestidad y transparencia en cada servicio." },
  { name: "LIMPIEZA", description: "Core del negocio, absolutamente no negociable." },
  { name: "CONFIANZA", description: "Tranquilidad para el cliente en cada evento." },
  { name: "MODERNIDAD", description: "Innovación, actualidad y tecnología al servicio." },
  { name: "SERVICIO", description: "Base de la relación con quienes confían en nosotros." },
]

export function BogaValues() {
  return (
    <section className="bg-boga-surface-muted py-16 md:py-24">
      <div className="container-boga">
        <FadeIn className="mb-12 text-center">
          <span className="mb-3 inline-flex items-center gap-2 text-caption uppercase tracking-wider text-boga-electric-500">
            <span className="boga-circles--s boga-circles--electric">
              <span className="circle" />
              <span className="circle" />
              <span className="circle" />
            </span>
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
            <div className="rounded-2xl bg-boga-surface-elevated p-6 shadow-boga-2 md:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-boga-electric-50 text-boga-electric-500">
                <Target className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-boga-text-primary">Misión</h3>
              <p className="mt-2 text-boga-text-secondary">
                Brindar un acompañamiento humano y personalizado, donde la limpieza
                y la modernidad son nuestra firma.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="rounded-2xl bg-boga-surface-elevated p-6 shadow-boga-2 md:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-boga-electric-50 text-boga-electric-500">
                <Eye className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-boga-text-primary">Visión</h3>
              <p className="mt-2 text-boga-text-secondary">
                Consolidarnos como el referente nacional de calidad y elegancia en
                servicios sanitarios móviles.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-16 text-center">
          <span className="mb-3 inline-flex items-center gap-2 text-caption uppercase tracking-wider text-boga-electric-500">
            <span className="boga-circles--s boga-circles--electric">
              <span className="circle" />
              <span className="circle" />
              <span className="circle" />
            </span>
            Valores
          </span>
          <h3 className="font-sans text-heading-md text-boga-text-primary">
            Lo que nos mueve
          </h3>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <FadeIn key={value.name} delay={index * 0.05}>
              <div className="group relative overflow-hidden rounded-2xl border border-boga-border-subtle bg-boga-surface-elevated p-6 shadow-boga-2 transition-all hover:-translate-y-1 hover:border-boga-electric-500/30 hover:shadow-boga-3">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-boga-lima-500/15 text-boga-lima-600">
                  <Sparkles className="h-6 w-6" aria-hidden="true" />
                </div>
                <h4 className="text-base font-bold uppercase tracking-wider text-boga-text-primary">
                  {value.name}
                </h4>
                <p className="mt-2 text-sm text-boga-text-secondary">
                  {value.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
