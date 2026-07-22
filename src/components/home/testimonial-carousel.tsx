"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { FadeIn } from "@/components/home/fade-in"
import { BogaCircles } from "@/components/brand/boga-circles"

const testimonials = [
  {
    id: "t1",
    name: "Andrea Morales",
    role: "Organizadora de eventos",
    company: "Eventos Épicos",
    text: "¡Me encanta el servicio de BOGA, es super bueno! La limpieza y la puntualidad son inmejorables. Mis eventos nunca habían lucido tan profesionales.",
    stars: 5,
  },
  {
    id: "t2",
    name: "Carlos Mendoza",
    role: "Productor",
    company: "Festivales del Valle",
    text: "Mi evento salió súper bien, gracias a BOGA. Servicio impecable de principio a fin. Recomendados al 100%.",
    stars: 5,
  },
  {
    id: "t3",
    name: "Laura Gómez",
    role: "Gerente de logística",
    company: "Corpomedios",
    text: "Hemos trabajado con BOGA en más de 10 eventos y nunca nos han fallado. La calidad de sus unidades y la atención del equipo son excepcionales.",
    stars: 5,
  },
  {
    id: "t4",
    name: "Felipe Rojas",
    role: "Coordinador",
    company: "Alcaldía de Medellín",
    text: "Para eventos institucionales, BOGA es nuestra primera opción. Instalación rápida, equipos impecables y un equipo muy profesional.",
    stars: 5,
  },
  {
    id: "t5",
    name: "María José Restrepo",
    role: "Wedding Planner",
    company: "Bodas Soñadas",
    text: "Los baños VIP de BOGA transforman la experiencia de los invitados. Recibimos muchísimos cumplidos. ¡Altamente recomendados!",
    stars: 5,
  },
]

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1)
      setCurrent(index)
    },
    [current]
  )

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  // Auto-play cada 5 segundos
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isPaused, next])

  const t = testimonials[current]

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  }

  return (
    <section className="relative overflow-hidden bg-[var(--boga-surface-canvas)] py-16 md:py-24">
      {/* Fondo decorativo */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, var(--boga-lima-500) 0%, transparent 50%), radial-gradient(circle at 80% 50%, var(--boga-electric-500) 0%, transparent 50%)",
        }}
      />

      <div className="container-boga">
        <FadeIn className="mb-12 text-center">
          <span className="mb-3 inline-flex items-center gap-2 text-caption uppercase tracking-wider text-boga-electric-500">
            <BogaCircles size="s" tone="electric" />
            Testimonios
          </span>
          <h2 className="font-sans text-heading-lg text-boga-text-primary md:text-display-md">
            ¿Qué dice la gente de BOGA?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-boga-text-secondary">
            Experiencias reales de quienes han confiado en nosotros
          </p>
        </FadeIn>

        {/* Carrusel */}
        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative flex h-[400px] items-center overflow-hidden rounded-2xl border border-[var(--boga-border-subtle)] bg-[var(--boga-surface-elevated)] p-8 shadow-[var(--boga-shadow-2)] md:h-[360px] md:p-12">
            <Quote className="absolute right-6 top-6 h-12 w-12 text-[var(--boga-lima-500)]/10" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex w-full flex-col"
              >
                {/* Estrellas */}
                <div className="mb-5 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < t.stars
                          ? "fill-[var(--boga-lima-500)] text-[var(--boga-lima-500)]"
                          : "text-[var(--boga-text-muted)]"
                      }`}
                    />
                  ))}
                </div>

                {/* Testimonio */}
                <blockquote className="flex-1 text-lg leading-relaxed text-[var(--boga-text-primary)] md:text-xl">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                {/* Autor */}
                <div className="mt-8 flex items-center gap-4 border-t border-[var(--boga-border-subtle)] pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--boga-electric-50)] text-base font-bold text-[var(--boga-electric-500)]">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--boga-text-primary)]">
                      {t.name}
                    </p>
                    <p className="text-xs text-[var(--boga-text-tertiary)]">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controles de navegación */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--boga-border-subtle)] text-[var(--boga-text-secondary)] transition-colors hover:border-[var(--boga-electric-500)] hover:text-[var(--boga-electric-500)]"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-[var(--boga-electric-500)]"
                      : "w-2 bg-[var(--boga-border-subtle)] hover:bg-[var(--boga-electric-300)]"
                  }`}
                  aria-label={`Ir al testimonio ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--boga-border-subtle)] text-[var(--boga-text-secondary)] transition-colors hover:border-[var(--boga-electric-500)] hover:text-[var(--boga-electric-500)]"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-3 text-center text-xs text-[var(--boga-text-tertiary)]">
            {current + 1} / {testimonials.length}
          </p>
        </div>
      </div>
    </section>
  )
}
