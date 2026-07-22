"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Mail, MessageCircle, ExternalLink } from "lucide-react"
import { siteConfig } from "@/lib/site"
import { formatCOP } from "@/lib/cotizador/calc"

/*
 * Simulacion visual de correo para demo.
 * El envio real requiere conectar un proveedor de correo (Resend o nodemailer)
 * en una fase posterior.
 */

export type EmailType = "confirmacion-solicitud" | "cotizacion-enviada"

export interface EmailPreviewData {
  nombre: string
  email: string
  numeroReferencia?: string
  numeroCotizacion?: string
  precioCliente?: number
  whatsappUrl?: string
}

interface EmailPreviewDialogProps {
  tipo: EmailType
  data: EmailPreviewData
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function EmailPreviewDialog({
  tipo,
  data,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: EmailPreviewDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen
  const setOpen = isControlled ? (controlledOnOpenChange ?? (() => {})) : setInternalOpen

  const subject =
    tipo === "confirmacion-solicitud"
      ? `Recibimos tu cotizacion -- ${data.numeroReferencia ?? ""}`
      : `Tu cotizacion BOGA esta lista -- ${data.numeroCotizacion ?? ""}`

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Vista previa de correo</DialogTitle>
          <DialogDescription>
            Esta es una simulacion visual del correo que se enviaria.
            El envio real no esta implementado.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="border-b bg-muted/40 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-boga-electric-500">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold">BOGA Banos Portatiles</p>
                <p className="text-xs text-muted-foreground">cotizaciones@bogabanos.com</p>
              </div>
            </div>
          </div>

          <div className="border-b bg-white px-5 py-3">
            <p className="text-xs text-muted-foreground">Asunto:</p>
            <p className="text-sm font-medium">{subject}</p>
          </div>

          <div className="space-y-4 bg-white px-5 py-6">
            {tipo === "confirmacion-solicitud" ? (
              <ConfirmacionSolicitudBody data={data} />
            ) : (
              <CotizacionEnviadaBody data={data} />
            )}

            <div className="border-t pt-4 text-xs text-muted-foreground">
              <p>Este correo es generado automaticamente. No respondas a este mensaje.</p>
              <p className="mt-0.5">(c) BOGA Banos Portatiles - Todos los derechos reservados.</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-boga-electric-200 bg-boga-electric-50 px-4 py-3 text-xs text-boga-electric-700">
          <p className="font-medium">Simulacion visual para demo</p>
          <p>El envio real de correos no esta conectado. Para habilitarlo, configura
            un proveedor como Resend o nodemailer y conecta el endpoint de API.</p>
        </div>

        <DialogClose>
          <div className="w-full">
            <Button variant="outline" className="w-full">
              Cerrar
            </Button>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

function ConfirmacionSolicitudBody({ data }: { data: EmailPreviewData }) {
  return (
    <>
      <p className="text-sm">
        Hola <strong>{data.nombre}</strong>, somos BOGA.
      </p>
      <p className="text-sm">
        Recibimos tu solicitud de cotizacion
        <span className="font-mono font-bold"> {data.numeroReferencia}</span>.
      </p>
      <p className="text-sm">
        En las proximas horas te enviaremos el detalle por este medio.
      </p>
      <p className="text-sm text-muted-foreground">
        Si tienes preguntas, respondenos este correo o escribenos por WhatsApp.
      </p>
    </>
  )
}

function CotizacionEnviadaBody({ data }: { data: EmailPreviewData }) {
  const total = data.precioCliente ?? 0
  const waUrl =
    data.whatsappUrl ??
    `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hola, tengo la cotizacion ${data.numeroCotizacion ?? ""} y quiero revisar los detalles.`)}`

  return (
    <>
      <p className="text-sm">
        Hola <strong>{data.nombre}</strong>, tu cotizacion
        <span className="font-mono font-bold"> {data.numeroCotizacion}</span>
        por <strong>{formatCOP(total)}</strong> esta lista.
      </p>
      <p className="text-sm">
        Puedes ver el detalle completo por WhatsApp o ingresar a tu portal para
        crear tu contrasena y revisar el estado de tu cotizacion.
      </p>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1ebe57]"
        >
          <MessageCircle className="h-4 w-4" />
          Ver por WhatsApp
        </a>
        <a
          href="/portal/login"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
        >
          <ExternalLink className="h-4 w-4" />
          Entrar al portal
        </a>
      </div>

      <p className="text-xs text-muted-foreground">
        *El enlace al portal estara disponible cuando se implemente la autenticacion
        de clientes.
      </p>
    </>
  )
}
