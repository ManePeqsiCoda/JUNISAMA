"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import type { Producto } from "@/lib/mocks"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FadeIn } from "@/components/home/fade-in"
import { cn } from "@/lib/utils"
import {
  Loader2,
  CheckCircle2,
  Check,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Trash2,
} from "lucide-react"

const tipoEventoOptions = [
  "Concierto",
  "Festival",
  "Feria",
  "Corporativo",
  "Boda",
  "Obra",
  "Otro",
]

const step1Schema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  empresa: z.string().optional(),
  email: z.string().email("Ingresa un correo electrónico válido"),
  telefono: z.string().min(7, "El teléfono debe tener al menos 7 dígitos"),
  tipoEvento: z.string().min(1, "Selecciona un tipo de evento"),
  fechaEvento: z.string().min(1, "Selecciona una fecha"),
  ciudad: z.string().min(2, "Indica la ciudad"),
  asistentes: z.number().int().optional(),
})

const step3Schema = z.object({
  duracionDias: z.number().int().optional(),
  ubicacionEvento: z.string().optional(),
  notasAdicionales: z.string().optional(),
  aceptaPrivacidad: z.boolean().refine((value) => value === true, {
    message: "Debes aceptar la política de privacidad",
  }),
})

type Step1Data = z.infer<typeof step1Schema>
type Step3Data = z.infer<typeof step3Schema>

interface QuoteItem {
  productoId: string
  cantidad: number
}

interface QuoteWizardProps {
  productos: Producto[]
}

export function QuoteWizard({ productos }: QuoteWizardProps) {
  const [step, setStep] = useState(1)
  const [items, setItems] = useState<QuoteItem[]>([])
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  )
  const [errorMessage, setErrorMessage] = useState("")

  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    control: controlStep1,
    formState: { errors: errorsStep1 },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      nombre: "",
      empresa: "",
      email: "",
      telefono: "",
      tipoEvento: "",
      fechaEvento: "",
      ciudad: "",
      asistentes: undefined,
    },
  })

  const {
    register: registerStep3,
    handleSubmit: handleSubmitStep3,
    control: controlStep3,
    formState: { errors: errorsStep3 },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
  })

  const toggleProduct = (productoId: string) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.productoId === productoId)
      if (exists) {
        return prev.filter((i) => i.productoId !== productoId)
      }
      return [...prev, { productoId, cantidad: 1 }]
    })
  }

  const updateQuantity = (productoId: string, cantidad: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.productoId === productoId ? { ...i, cantidad: Math.max(1, cantidad) } : i
      )
    )
  }

  const removeItem = (productoId: string) => {
    setItems((prev) => prev.filter((i) => i.productoId !== productoId))
  }

  const selectedItems = items
    .map((item) => ({
      ...item,
      producto: productos.find((p) => p.id === item.productoId)!,
    }))
    .filter((item) => item.producto)

  const onSubmitStep1 = () => {
    setStep(2)
  }

  const onSubmitStep2 = () => {
    if (items.length === 0) {
      setErrorMessage("Selecciona al menos un producto")
      return
    }
    setErrorMessage("")
    setStep(3)
  }

  const onSubmitStep3 = async (data: Step3Data) => {
    setStatus("loading")
    setErrorMessage("")

    const step1Data = {} as Step1Data
    const formValues = document.forms.namedItem("quote-form") as HTMLFormElement
    if (formValues) {
      const fd = new FormData(formValues)
      Object.assign(step1Data, {
        nombre: fd.get("nombre"),
        empresa: fd.get("empresa") || undefined,
        email: fd.get("email"),
        telefono: fd.get("telefono"),
        tipoEvento: fd.get("tipoEvento"),
        fechaEvento: fd.get("fechaEvento"),
        ciudad: fd.get("ciudad"),
        asistentes: fd.get("asistentes")
          ? Number(fd.get("asistentes"))
          : undefined,
      })
    }

    try {
      // Simulated API call — no backend in static prototype
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStatus("success")
      toast.success(`Cotización solicitada por ${step1Data.nombre || "Cliente"}`, {
        description: data.duracionDias
          ? `Duración: ${data.duracionDias} días. Te contactaremos en menos de 24 horas.`
          : "Te contactaremos en menos de 24 horas.",
      })
    } catch (error) {
      setStatus("error")
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Hubo un error. Por favor intenta de nuevo o contáctanos por WhatsApp."
      )
      toast.error("No pudimos enviar tu solicitud", {
        description: "Intenta de nuevo o contáctanos por WhatsApp.",
      })
    }
  }

  if (status === "success") {
    return (
      <section className="container mx-auto px-4 py-24 lg:px-6">
        <FadeIn>
          <Card className="mx-auto max-w-2xl border-boga-border-subtle bg-boga-surface-elevated shadow-boga-4">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-boga-success-50 text-boga-success-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-boga-text-primary">
                ¡Gracias por tu solicitud!
              </h2>
              <p className="mt-3 text-boga-text-secondary">
                Tu solicitud ha sido enviada. Te contactaremos en menos de 24
                horas.
              </p>
              <Link href="/" className={cn(buttonVariants(), "mt-6")}>
                Volver al inicio
              </Link>
            </CardContent>
          </Card>
        </FadeIn>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-24 lg:px-6">
      <FadeIn className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-boga-text-primary md:text-4xl">
          Solicitar Cotización
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-boga-text-secondary">
          Completa el formulario en 3 pasos y recibe una propuesta personalizada
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card className="mx-auto max-w-5xl border-boga-border-subtle bg-boga-surface-elevated shadow-boga-4">
          <CardContent className="p-6 md:p-8">
            {/* Step indicator — 3 círculos BOGA */}
            <StepIndicator currentStep={step} totalSteps={3} />

            <form id="quote-form" onSubmit={(e) => e.preventDefault()}>
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-boga-text-primary">
                    Paso 1: Datos de contacto
                  </h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre completo *</Label>
                      <Input
                        id="nombre"
                        {...registerStep1("nombre")}
                        aria-invalid={errorsStep1.nombre ? "true" : "false"}
                      />
                      {errorsStep1.nombre && (
                        <p className="flex items-center gap-1 text-xs text-boga-error-500" role="alert"><AlertCircle className="h-3 w-3" aria-hidden="true" />
                          {errorsStep1.nombre.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="empresa">Empresa</Label>
                      <Input id="empresa" {...registerStep1("empresa")} />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...registerStep1("email")}
                        aria-invalid={errorsStep1.email ? "true" : "false"}
                      />
                      {errorsStep1.email && (
                        <p className="flex items-center gap-1 text-xs text-boga-error-500" role="alert"><AlertCircle className="h-3 w-3" aria-hidden="true" />
                          {errorsStep1.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono *</Label>
                      <Input
                        id="telefono"
                        type="tel"
                        {...registerStep1("telefono")}
                        aria-invalid={errorsStep1.telefono ? "true" : "false"}
                      />
                      {errorsStep1.telefono && (
                        <p className="flex items-center gap-1 text-xs text-boga-error-500" role="alert"><AlertCircle className="h-3 w-3" aria-hidden="true" />
                          {errorsStep1.telefono.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="tipoEvento">Tipo de evento *</Label>
                      <Controller
                        name="tipoEvento"
                        control={controlStep1}
                        render={({ field }) => (
                          <Select
                        value={field.value || undefined}
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
                      {errorsStep1.tipoEvento && (
                        <p className="flex items-center gap-1 text-xs text-boga-error-500" role="alert"><AlertCircle className="h-3 w-3" aria-hidden="true" />
                          {errorsStep1.tipoEvento.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fechaEvento">Fecha del evento *</Label>
                      <Input
                        id="fechaEvento"
                        type="date"
                        {...registerStep1("fechaEvento")}
                        aria-invalid={errorsStep1.fechaEvento ? "true" : "false"}
                      />
                      {errorsStep1.fechaEvento && (
                        <p className="flex items-center gap-1 text-xs text-boga-error-500" role="alert"><AlertCircle className="h-3 w-3" aria-hidden="true" />
                          {errorsStep1.fechaEvento.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="ciudad">Ciudad *</Label>
                      <Input
                        id="ciudad"
                        {...registerStep1("ciudad")}
                        aria-invalid={errorsStep1.ciudad ? "true" : "false"}
                      />
                      {errorsStep1.ciudad && (
                        <p className="flex items-center gap-1 text-xs text-boga-error-500" role="alert"><AlertCircle className="h-3 w-3" aria-hidden="true" />
                          {errorsStep1.ciudad.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="asistentes">
                        Número aproximado de asistentes
                      </Label>
                      <Input
                        id="asistentes"
                        type="number"
                        {...registerStep1("asistentes", { valueAsNumber: true })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="button"
                      onClick={handleSubmitStep1(onSubmitStep1)}
                    >
                      Siguiente
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-boga-text-primary">
                    Paso 2: Selección de productos
                  </h2>

                  {errorMessage && (
                    <div className="flex items-start gap-2 rounded-lg bg-boga-error-50 p-3 text-sm text-boga-error-500">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      <div className="grid gap-4 sm:grid-cols-2">
                        {productos.map((producto) => {
                          const selected = items.find(
                            (i) => i.productoId === producto.id
                          )
                          return (
                            <div
                              key={producto.id}
                              className={cn(
                                "relative cursor-pointer rounded-xl border-2 p-4 transition-all",
                                selected
                                  ? "border-boga-electric-500 bg-boga-electric-50/30"
                                  : "border-boga-border-default bg-boga-surface-elevated hover:border-boga-electric-500/50"
                              )}
                              onClick={() => toggleProduct(producto.id)}
                            >
                              <div className="flex items-start gap-3">
                                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-boga-surface-muted">
                                  <Image
                                    src={producto.imagenPrincipal}
                                    alt={producto.nombre}
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                    loading="lazy"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-boga-text-primary">
                                    {producto.nombre}
                                  </h3>
                                  <p className="text-xs text-boga-text-secondary">
                                    {producto.descripcionCorta}
                                  </p>
                                </div>
                                <Checkbox checked={!!selected} />
                              </div>
                              {selected && (
                                <div
                                  className="mt-3 flex items-center gap-2"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Label
                                    htmlFor={`cantidad-${producto.id}`}
                                    className="text-xs"
                                  >
                                    Cantidad
                                  </Label>
                                  <Input
                                    id={`cantidad-${producto.id}`}
                                    type="number"
                                    min={1}
                                    value={selected.cantidad}
                                    onChange={(e) =>
                                      updateQuantity(
                                        producto.id,
                                        Number(e.target.value)
                                      )
                                    }
                                    className="w-20"
                                  />
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="rounded-xl border border-boga-border-subtle bg-boga-surface-muted p-4">
                      <h3 className="font-bold text-boga-text-primary">Resumen</h3>
                      {selectedItems.length === 0 ? (
                        <p className="mt-2 text-sm text-boga-text-tertiary">
                          Selecciona al menos un producto
                        </p>
                      ) : (
                        <ul className="mt-3 space-y-2">
                          {selectedItems.map((item) => (
                            <li
                              key={item.productoId}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="text-boga-text-secondary">
                                {item.producto.nombre} x{item.cantidad}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeItem(item.productoId)}
                                className="text-boga-text-tertiary hover:text-boga-error-500"
                                aria-label="Eliminar"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Anterior
                    </Button>
                    <Button type="button" onClick={onSubmitStep2}>
                      Siguiente
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-boga-text-primary">
                    Paso 3: Detalles y envío
                  </h2>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="duracionDias">
                        Duración del evento (días)
                      </Label>
                      <Input
                        id="duracionDias"
                        type="number"
                        min={1}
                        {...registerStep3("duracionDias", {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ubicacionEvento">
                        Ubicación / dirección
                      </Label>
                      <Input
                        id="ubicacionEvento"
                        {...registerStep3("ubicacionEvento")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notasAdicionales">Notas adicionales</Label>
                    <Textarea
                      id="notasAdicionales"
                      rows={4}
                      {...registerStep3("notasAdicionales")}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <Controller
                      name="aceptaPrivacidad"
                      control={controlStep3}
                      render={({ field }) => (
                        <Checkbox
                          id="aceptaPrivacidad"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <div>
                      <Label htmlFor="aceptaPrivacidad" className="font-normal">
                        Acepto la{" "}
                        <Link
                          href="/privacidad"
                          className="font-semibold text-boga-electric-500 hover:underline"
                        >
                          política de privacidad
                        </Link>
                      </Label>
                      {errorsStep3.aceptaPrivacidad && (
                        <p className="flex items-center gap-1 text-xs text-boga-error-500" role="alert"><AlertCircle className="h-3 w-3" aria-hidden="true" />
                          {errorsStep3.aceptaPrivacidad.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {status === "error" && (
                    <div className="flex items-start gap-2 rounded-lg bg-boga-error-50 p-3 text-sm text-boga-error-500">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      {errorMessage}
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(2)}
                      disabled={status === "loading"}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Anterior
                    </Button>
                    <Button
                      type="button"
                      onClick={handleSubmitStep3(onSubmitStep3)}
                      disabled={status === "loading"}
                    >
                      {status === "loading" && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Enviar cotización
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </FadeIn>
    </section>
  )
}

function StepIndicator({
  currentStep,
  totalSteps,
}: {
  currentStep: number
  totalSteps: number
}) {
  return (
    <div
      className="mb-10 flex items-center justify-center gap-3"
      aria-label={`Paso ${currentStep} de ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1
        const isActive = stepNum === currentStep
        const isCompleted = stepNum < currentStep

        return (
          <div key={stepNum} className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all",
                isActive &&
                  "bg-boga-lima-500 text-boga-text-on-lima ring-4 ring-boga-lima-500/30",
                isCompleted && "bg-boga-lima-500 text-boga-text-on-lima",
                !isActive && !isCompleted && "bg-boga-neutral-200 text-boga-neutral-500"
              )}
              aria-current={isActive ? "step" : undefined}
            >
              {isCompleted ? <Check className="h-5 w-5" /> : stepNum}
            </div>
            {stepNum < totalSteps && (
              <div
                className={cn(
                  "h-1 w-16 rounded-full transition-colors",
                  isCompleted ? "bg-boga-lima-500" : "bg-boga-neutral-200"
                )}
                aria-hidden="true"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
