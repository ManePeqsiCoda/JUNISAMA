"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site"
import { Button } from "@/components/ui/button"

type Role = "bot" | "user"

type ChatMessage = {
  id: string
  role: Role
  text: string
}

type TopicId = "cotizar" | "cobertura" | "disponibilidad"

type Topic = {
  id: TopicId
  label: string
  followUp: string
  options: string[]
  tip: (answer: string) => string
}

const TOPICS: Topic[] = [
  {
    id: "cotizar",
    label: "Quiero cotizar baños para un evento",
    followUp:
      "Perfecto. ¿Qué tipo de evento estás organizando? Así te oriento mejor antes de WhatsApp.",
    options: ["Concierto o festival", "Boda o corporativo", "Obra o feria"],
    tip: (answer) =>
      `Para ${answer.toLowerCase()}, normalmente combinamos unidades según aforo y duración. Puedes armar una solicitud en el cotizador o seguir con un asesor.`,
  },
  {
    id: "cobertura",
    label: "¿Llegan a mi ciudad y con cuánta anticipación?",
    followUp:
      "Claro. ¿Desde qué ciudad o región necesitas el servicio? Operamos con sedes en Medellín y Bogotá.",
    options: ["Medellín / Antioquia", "Bogotá / Cundinamarca", "Otra ciudad de Colombia"],
    tip: (answer) =>
      answer.includes("Otra")
        ? "Para otras ciudades coordinamos logística con anticipación. Un asesor te confirma tiempos exactos según ubicación y fecha."
        : `En ${answer} solemos tener mejor capacidad de respuesta. Aun así, conviene reservar con días de anticipación según el tamaño del evento.`,
  },
  {
    id: "disponibilidad",
    label: "Necesito saber disponibilidad o precios",
    followUp:
      "Entiendo. ¿Qué te interesa consultar primero? Así evitamos idas y vueltas en WhatsApp.",
    options: [
      "Disponibilidad en fechas concretas",
      "Rango de precios por servicio",
      "Paquete completo para mi evento",
    ],
    tip: (answer) =>
      `Sobre “${answer.toLowerCase()}”: el valor final depende de unidades, días y ubicación. Te dejo el cotizador o un asesor en WhatsApp con este contexto.`,
  },
]

function waUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function WhatsAppButton() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [topic, setTopic] = useState<Topic | null>(null)
  const [phase, setPhase] = useState<"topics" | "followup" | "ready">("topics")
  const [summary, setSummary] = useState("")
  const endRef = useRef<HTMLDivElement>(null)

  const resetChat = () => {
    setMessages([
      {
        id: uid(),
        role: "bot",
        text: "¿Cómo puedo ayudarte?",
      },
    ])
    setTopic(null)
    setPhase("topics")
    setSummary("")
  }

  useEffect(() => {
    if (open && messages.length === 0) resetChat()
  }, [open])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, phase])

  const push = (role: Role, text: string) => {
    setMessages((prev) => [...prev, { id: uid(), role, text }])
  }

  const handleTopic = (selected: Topic) => {
    setTopic(selected)
    push("user", selected.label)
    window.setTimeout(() => {
      push("bot", selected.followUp)
      setPhase("followup")
    }, 280)
  }

  const handleFollowUp = (answer: string) => {
    if (!topic) return
    push("user", answer)
    const tip = topic.tip(answer)
    const context = `Hola BOGA, vengo del asistente web.\nTema: ${topic.label}\nDetalle: ${answer}\n¿Me pueden orientar, por favor?`
    setSummary(context)
    window.setTimeout(() => {
      push("bot", tip)
      window.setTimeout(() => {
        push(
          "bot",
          "¿Antes de ir a WhatsApp, te puedo ayudar con esto? Puedes armar tu cotización en el sitio o seguir con un asesor."
        )
        setPhase("ready")
      }, 350)
    }, 280)
  }

  const openWhatsApp = (message?: string) => {
    const text =
      message ||
      summary ||
      siteConfig.whatsappMessage
    window.open(waUrl(text), "_blank", "noopener,noreferrer")
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Asistente BOGA"
          className="flex h-[min(32rem,calc(100vh-6.5rem))] w-[min(22.5rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-boga-border-subtle bg-boga-surface-elevated shadow-boga-4"
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-boga-deep-500 px-4 py-3 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-boga-lima-500 text-boga-deep-500">
              <Bot className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">Asistente BOGA</p>
              <p className="truncate text-xs text-white/70">
                Te ayudo primero · WhatsApp si lo necesitas
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Cerrar asistente"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-boga-surface-canvas px-3 py-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-2",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "bot" && (
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-boga-electric-500 text-white">
                    <Bot className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                )}
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                    msg.role === "bot"
                      ? "rounded-tl-md bg-boga-surface-elevated text-boga-text-primary shadow-boga-1"
                      : "rounded-tr-md bg-boga-electric-500 text-white"
                  )}
                >
                  {msg.text}
                </div>
                {msg.role === "user" && (
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-boga-deep-500 text-boga-lima-500">
                    <User className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                )}
              </div>
            ))}

            {phase === "topics" && (
              <div className="space-y-2 pl-9">
                {TOPICS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleTopic(t)}
                    className="block w-full rounded-xl border border-boga-border-subtle bg-boga-surface-elevated px-3 py-2.5 text-left text-sm font-medium text-boga-text-primary transition-colors hover:border-boga-electric-500 hover:bg-boga-electric-50"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}

            {phase === "followup" && topic && (
              <div className="space-y-2 pl-9">
                {topic.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleFollowUp(opt)}
                    className="block w-full rounded-xl border border-boga-border-subtle bg-boga-surface-elevated px-3 py-2.5 text-left text-sm font-medium text-boga-text-primary transition-colors hover:border-boga-lima-500 hover:bg-boga-lima-50"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {phase === "ready" && (
              <div className="space-y-2 pl-9">
                <Link
                  href="/cotizacion"
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-xl border border-boga-electric-500 bg-boga-electric-500 px-3 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-boga-electric-600"
                >
                  Armar cotización en el sitio
                </Link>
                <button
                  type="button"
                  onClick={() => openWhatsApp()}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#25D366] bg-[#25D366] px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe57]"
                >
                  <Send className="h-3.5 w-3.5" aria-hidden="true" />
                  Continuar en WhatsApp con este contexto
                </button>
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Footer: escape a WhatsApp */}
          <div className="border-t border-boga-border-subtle bg-boga-surface-elevated px-3 py-2.5">
            <button
              type="button"
              onClick={() =>
                openWhatsApp(
                  "Hola BOGA, prefiero escribir directamente por WhatsApp."
                )
              }
              className="w-full text-center text-xs font-medium text-boga-text-secondary underline-offset-2 transition-colors hover:text-boga-electric-500 hover:underline"
            >
              No, prefiero hablar por WhatsApp
            </button>
            {phase !== "topics" && (
              <button
                type="button"
                onClick={resetChat}
                className="mt-1.5 w-full text-center text-[0.65rem] text-boga-text-tertiary hover:text-boga-text-secondary"
              >
                Reiniciar conversación
              </button>
            )}
          </div>
        </div>
      )}

      <Button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Cerrar asistente BOGA" : "Abrir asistente BOGA"}
        className="relative h-14 w-14 rounded-full bg-whatsapp p-0 text-white shadow-lg transition-transform hover:scale-105 hover:bg-whatsapp hover:shadow-xl focus-visible:ring-whatsapp/50"
      >
        {!open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-30" />
        )}
        {open ? (
          <X className="relative h-7 w-7" />
        ) : (
          <MessageCircle className="relative h-7 w-7 fill-current" />
        )}
      </Button>
    </div>
  )
}
