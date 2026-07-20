"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { eventTypeLabels, type Event } from "@/data/events"
import { cn } from "@/lib/utils"

const AUTO_MS = 4500

export type GallerySlide = {
  src: string
  title: string
  years: number[]
  type: Event["type"]
  eventId: string
  albumIndex: number
  albumTotal: number
}

interface GalleryLightboxProps {
  slides: GallerySlide[]
  startIndex: number
  open: boolean
  onClose: () => void
}

export function GalleryLightbox({
  slides,
  startIndex,
  open,
  onClose,
}: GalleryLightboxProps) {
  const [index, setIndex] = useState(startIndex)
  const [paused, setPaused] = useState(false)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    if (open) setIndex(startIndex)
  }, [open, startIndex])

  const goTo = useCallback(
    (next: number, dir: number) => {
      if (slides.length === 0) return
      setDirection(dir)
      setIndex((next + slides.length) % slides.length)
    },
    [slides.length]
  )

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose, next, prev])

  useEffect(() => {
    if (!open || paused || slides.length <= 1) return
    const id = window.setInterval(() => {
      setDirection(1)
      setIndex((i) => (i + 1) % slides.length)
    }, AUTO_MS)
    return () => window.clearInterval(id)
  }, [open, paused, slides.length, index])

  if (!open || slides.length === 0) return null

  const slide = slides[index]
  const progress = ((index % slides.length) + 1) / slides.length

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/92 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Álbum: ${slide.title}`}
      onClick={onClose}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-20 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="Cerrar"
      >
        <X className="size-5" />
      </button>

      <div
        className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center px-4 py-16 sm:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-4 w-full max-w-5xl">
          <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/15">
            <motion.div
              key={index}
              className="h-full bg-boga-lima-500"
              initial={{ width: "0%" }}
              animate={{ width: paused ? `${progress * 100}%` : "100%" }}
              transition={
                paused
                  ? { duration: 0 }
                  : { duration: AUTO_MS / 1000, ease: "linear" }
              }
            />
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full max-w-5xl overflow-hidden rounded-xl bg-black sm:aspect-video">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${slide.eventId}-${slide.albumIndex}-${slide.src}`}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d > 0 ? 48 : -48 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d > 0 ? -48 : 48 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={slide.src}
                alt={`${slide.title} — imagen ${slide.albumIndex + 1} de ${slide.albumTotal}`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white transition-colors hover:bg-black/70 sm:left-4"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white transition-colors hover:bg-black/70 sm:right-4"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}
        </div>

        <div className="mt-5 w-full max-w-5xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-boga-lima-500">
            {eventTypeLabels[slide.type]} · {slide.years.join(", ")}
          </p>
          <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
            {slide.title}
          </h2>
          <p className="mt-1 text-sm text-white/65">
            Foto {slide.albumIndex + 1} de {slide.albumTotal}
            {slides.length > slide.albumTotal
              ? ` · ${index + 1}/${slides.length} en galería`
              : null}
          </p>
        </div>

        {slides.length > 1 && (
          <div className="mt-4 flex max-w-5xl flex-wrap justify-center gap-1.5">
            {slides.map((s, i) => (
              <button
                key={`${s.eventId}-${s.albumIndex}-${i}`}
                type="button"
                onClick={() => goTo(i, i > index ? 1 : -1)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index
                    ? "w-6 bg-boga-lima-500"
                    : "w-1.5 bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Ir a imagen ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function buildGallerySlides(eventos: Event[]): GallerySlide[] {
  return eventos.flatMap((evento) => {
    const album =
      evento.album && evento.album.length > 0 ? evento.album : [evento.image]
    return album.map((src, albumIndex) => ({
      src,
      title: evento.name,
      years: evento.years,
      type: evento.type,
      eventId: evento.id,
      albumIndex,
      albumTotal: album.length,
    }))
  })
}
