"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "./fade-in"
import { Quote, Star } from "lucide-react"
import type { Evento } from "@/lib/mocks"

interface TestimonialsProps {
  eventos: Evento[]
}

export function Testimonials({ eventos }: TestimonialsProps) {
  const testimonials = eventos
    .filter((e) => e.testimonio && e.nombreTestimonio)
    .slice(0, 3)

  return (
    <section className="bg-[var(--boga-surface-muted)] py-16 md:py-24">
      <div className="container mx-auto px-4 lg:px-6">
        <FadeIn className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-[var(--boga-text-primary)] md:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--boga-text-secondary)]">
            Experiencias reales de quienes han confiado en BOGA
          </p>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={testimonial.id} delay={index * 0.1}>
              <Card className="relative h-full border-[var(--boga-border-subtle)] bg-[var(--boga-surface-elevated)] shadow-[var(--boga-shadow-2)]">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-[var(--boga-lima-500)]/20" />
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-4 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < (testimonial.estrellasTestimonio || 5)
                            ? "fill-[var(--boga-lima-500)] text-[var(--boga-lima-500)]"
                            : "text-[var(--boga-text-muted)]"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="flex-1 text-[var(--boga-text-secondary)]">
                    &ldquo;{testimonial.testimonio}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--boga-electric-50)] text-sm font-bold text-[var(--boga-electric-500)]">
                      {testimonial.nombreTestimonio?.charAt(0) || "C"}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--boga-text-primary)]">
                        {testimonial.nombreTestimonio}
                      </p>
                      <p className="text-xs text-[var(--boga-text-tertiary)]">
                        {testimonial.cargoTestimonio}, {testimonial.nombre}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
