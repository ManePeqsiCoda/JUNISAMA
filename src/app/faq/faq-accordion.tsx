"use client"

import { useState } from "react"
import type { Faq } from "@/lib/mocks"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FadeIn } from "@/components/home/fade-in"
import { cn } from "@/lib/utils"

interface FaqAccordionProps {
  faqs: Faq[]
  categories: string[]
  categoryLabels: Record<string, string>
}

export function FaqAccordion({
  faqs,
  categories,
  categoryLabels,
}: FaqAccordionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("TODOS")

  const filteredFaqs =
    activeCategory === "TODOS"
      ? faqs
      : faqs.filter((f) => f.categoria === activeCategory)

  return (
    <>
      <FadeIn>
        <div className="mb-8 flex flex-wrap justify-center gap-2 rounded-2xl bg-boga-surface-elevated p-3 shadow-boga-3">
          <button
            type="button"
            onClick={() => setActiveCategory("TODOS")}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === "TODOS"
                ? "bg-boga-electric-500 text-boga-text-on-electric"
                : "text-boga-text-secondary hover:bg-boga-surface-muted"
            )}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                activeCategory === cat
                  ? "bg-boga-electric-500 text-boga-text-on-electric"
                  : "text-boga-text-secondary hover:bg-boga-surface-muted"
              )}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="rounded-2xl border border-boga-border-subtle bg-boga-surface-elevated p-4 shadow-boga-2 md:p-6">
          <Accordion>
            {filteredFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-base font-semibold text-boga-text-primary hover:text-boga-electric-500">
                  {faq.pregunta}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-boga-text-secondary">{faq.respuesta}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFaqs.length === 0 && (
            <p className="py-8 text-center text-boga-text-tertiary">
              No hay preguntas en esta categoría.
            </p>
          )}
        </div>
      </FadeIn>
    </>
  )
}
