"use client"

import { events } from "@/data/events"
import { cn } from "@/lib/utils"

interface ClientMarqueeProps {
  filterType?: string
  filterYear?: number
  className?: string
}

export function ClientMarquee({ filterType, filterYear, className }: ClientMarqueeProps) {
  const filtered = events.filter((e) => {
    if (filterType && e.type !== filterType) return false
    if (filterYear && !e.years.includes(filterYear)) return false
    return true
  })

  // Duplicar para efecto infinito sin gap visual
  const duplicated = [...filtered, ...filtered]

  return (
    <section
      className={cn("overflow-hidden bg-secondary-800 py-16 md:py-24", className)}
      aria-labelledby="clients-heading"
    >
      <div className="container-junisama mb-12 text-center">
        <span className="badge-iso mx-auto mb-4 inline-flex">
          Empresas y eventos que han confiado en nosotros
        </span>
        <h2
          id="clients-heading"
          className="font-outfit text-heading-lg text-white md:text-display-md"
        >
          Respaldo de las principales organizaciones del país
        </h2>
      </div>

      {/* Marquee Track 1 — izquierda a derecha */}
      <div className="marquee-container mb-6">
        <div className="marquee-track">
          {duplicated.map((event, i) => (
            <EventPill key={`${event.id}-${i}`} event={event} />
          ))}
        </div>
      </div>

      {/* Marquee Track 2 — derecha a izquierda (reversa) */}
      <div className="marquee-container">
        <div
          className="flex w-max"
          style={{ animation: "marquee-reverse 45s linear infinite" }}
        >
          {[...duplicated].reverse().map((event, i) => (
            <EventPill key={`${event.id}-rev-${i}`} event={event} variant="outline" />
          ))}
        </div>
      </div>
    </section>
  )
}

interface EventPillProps {
  event: (typeof events)[0]
  variant?: "filled" | "outline"
}

function EventPill({ event, variant = "filled" }: EventPillProps) {
  return (
    <div
      className={cn(
        "mx-3 flex-shrink-0 whitespace-nowrap rounded-full border px-6 py-3",
        variant === "filled"
          ? "border-white/10 bg-white/10 text-white"
          : "border-white/20 bg-transparent text-neutral-300"
      )}
    >
      <span className="font-outfit text-sm font-semibold">{event.name}</span>
      <span className="ml-3 text-xs text-neutral-400">{event.years.join(", ")}</span>
    </div>
  )
}
