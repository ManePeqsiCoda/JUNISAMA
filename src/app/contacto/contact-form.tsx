"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FadeIn } from "@/components/home/fade-in"
import { PageHero } from "@/components/brand/page-hero"
import { BogaCircles } from "@/components/brand/boga-circles"
import { SedesCoverage } from "@/components/brand/sedes-coverage"
import { siteConfig } from "@/lib/site"
import {
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Loader2,
  CheckCircle2,
} from "lucide-react"

const contactSchema = z.object({
  nombre: z.string().min(2, "El nombre es requerido"),
  empresa: z.string().optional(),
  email: z.string().email("Ingresa un correo válido"),
  telefono: z.string().min(7, "El teléfono debe tener al menos 7 dígitos"),
  tipoEvento: z.string().optional(),
  fechaAproximada: z.string().optional(),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
})

type ContactForm = z.infer<typeof contactSchema>

const contactInfo = [
  {
    icon: Phone,
    label: "Línea directa",
    value: siteConfig.phone,
    href: `tel:+${siteConfig.phoneRaw}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat inmediato",
    href: `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`,
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Atención 24/7",
    href: undefined,
  },
]

const tipoEventoOptions = [
  "Concierto / Festival",
  "Feria / Corferias",
  "Evento corporativo",
  "Obra / Construcción",
  "Boda / Evento social",
  "Gubernamental",
  "Otro",
]

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle")

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    setStatus("loading")

    try {
      // Simulated API call — no backend in static prototype
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStatus("success")
      reset()
      toast.success(`Gracias ${data.nombre}`, {
        description: "Tu mensaje fue recibido. Te responderemos en menos de 24 horas.",
      })
      setTimeout(() => setStatus("idle"), 5000)
    } catch {
      setStatus("error")
      toast.error("No pudimos enviar tu mensaje", {
        description: "Por favor intenta de nuevo o contáctanos por WhatsApp.",
      })
    }
  }

  return (
    <div className="min-h-screen bg-boga-surface-canvas">
      <PageHero
        overline="Contacto"
        title="Contacto"
        description="Estamos listos para atender tu evento u obra en cualquier parte de Colombia"
      />

      <section className="container-boga relative z-10 -mt-8 pb-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <FadeIn direction="left">
            <Card className="border-boga-border-subtle bg-boga-surface-elevated shadow-boga-4">
              <CardContent className="p-6 md:p-8">
                <span className="mb-4 inline-flex items-center gap-2 text-caption uppercase tracking-wider text-boga-electric-500">
                  <BogaCircles size="s" tone="electric" />
                  Escríbenos
                </span>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">
                        Nombre completo <span className="text-boga-error-500">*</span>
                      </Label>
                      <Input
                        id="nombre"
                        placeholder="Tu nombre"
                        {...register("nombre")}
                        aria-invalid={errors.nombre ? "true" : "false"}
                      />
                      {errors.nombre && (
                        <p className="text-xs text-boga-error-500">
                          {errors.nombre.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="empresa">Empresa</Label>
                      <Input
                        id="empresa"
                        placeholder="Nombre de tu empresa"
                        {...register("empresa")}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Correo electrónico <span className="text-boga-error-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        {...register("email")}
                        aria-invalid={errors.email ? "true" : "false"}
                      />
                      {errors.email && (
                        <p className="text-xs text-boga-error-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono">
                        Teléfono <span className="text-boga-error-500">*</span>
                      </Label>
                      <Input
                        id="telefono"
                        type="tel"
                        placeholder="350 708 9584"
                        {...register("telefono")}
                        aria-invalid={errors.telefono ? "true" : "false"}
                      />
                      {errors.telefono && (
                        <p className="text-xs text-boga-error-500">
                          {errors.telefono.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="tipoEvento">Tipo de evento</Label>
                      <Controller
                        name="tipoEvento"
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger id="tipoEvento" className="w-full">
                              <SelectValue placeholder="Selecciona" />
                            </SelectTrigger>
                            <SelectContent>
                              {tipoEventoOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fechaAproximada">Fecha aproximada</Label>
                      <Input
                        id="fechaAproximada"
                        type="date"
                        {...register("fechaAproximada")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje">
                      Mensaje <span className="text-boga-error-500">*</span>
                    </Label>
                    <Textarea
                      id="mensaje"
                      placeholder="Cuéntanos sobre tu evento o proyecto..."
                      rows={4}
                      {...register("mensaje")}
                      aria-invalid={errors.mensaje ? "true" : "false"}
                    />
                    {errors.mensaje && (
                      <p className="text-xs text-boga-error-500">
                        {errors.mensaje.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="btn-primary w-full"
                    size="lg"
                  >
                    {status === "loading" && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {status === "success"
                      ? "Mensaje enviado"
                      : "Enviar mensaje"}
                  </Button>

                  {status === "success" && (
                    <div className="flex items-start gap-2 rounded-lg bg-boga-success-50 p-3 text-sm text-boga-success-600">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                      Gracias por contactarnos. Te responderemos en menos de 24
                      horas.
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Contact info */}
          <FadeIn direction="right">
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {contactInfo.map((item) => {
                  const Icon = item.icon
                  const content = (
                    <>
                      <Icon
                        className="mb-3 h-6 w-6 text-boga-electric-500"
                        strokeWidth={1.75}
                      />
                      <p className="text-xs font-medium uppercase tracking-wider text-boga-text-tertiary">
                        {item.label}
                      </p>
                      <p className="mt-1 font-semibold text-boga-lima-600">
                        {item.value}
                      </p>
                    </>
                  )
                  return item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="block rounded-xl border border-boga-border-default bg-boga-surface-elevated p-5 shadow-boga-2 transition-all hover:-translate-y-1 hover:border-boga-electric-500/30 hover:shadow-boga-3"
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={item.label}
                      className="rounded-xl border border-boga-border-default bg-boga-surface-elevated p-5 shadow-boga-2"
                    >
                      {content}
                    </div>
                  )
                })}
              </div>

            </div>
          </FadeIn>
        </div>
      </section>

      <SedesCoverage tone="canvas" />
    </div>
  )
}
