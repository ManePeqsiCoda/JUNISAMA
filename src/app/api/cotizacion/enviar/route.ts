import { NextResponse } from "next/server"
import { z } from "zod"
import { isSmtpConfigured, sendMail } from "@/lib/email/smtp"
import {
  buildQuoteConfirmationEmailHtml,
  buildQuoteConfirmationEmailText,
  buildWhatsAppQuoteUrl,
  type QuoteEmailPayload,
} from "@/lib/email/quote-templates"
import { siteConfig } from "@/lib/site"

const payloadSchema = z.object({
  referencia: z.string().min(3),
  nombre: z.string().min(2),
  empresa: z.string().optional(),
  email: z.string().email(),
  telefono: z.string().min(7),
  ciudad: z.string().min(2),
  tipoEvento: z.string().min(1),
  fechaEvento: z.string().min(1),
  fechaFinEvento: z.string().optional(),
  duracionDias: z.number().int().positive().optional(),
  ubicacion: z.string().optional(),
  asistentes: z.string().optional(),
  productos: z
    .array(
      z.object({
        nombre: z.string(),
        cantidad: z.number().int().positive(),
      })
    )
    .min(1),
  notas: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = payloadSchema.parse(body) as QuoteEmailPayload
    const whatsappUrl = buildWhatsAppQuoteUrl(data)

    let emailSent = false
    let emailSkippedReason: string | undefined

    if (!isSmtpConfigured()) {
      emailSkippedReason =
        "SMTP no configurado (prototipo). Completa las variables SMTP en .env"
      console.warn("[cotizacion/enviar]", emailSkippedReason)
    } else {
      await sendMail({
        to: data.email,
        subject: `BOGA · Cotización recibida — ${data.referencia}`,
        html: buildQuoteConfirmationEmailHtml(data, whatsappUrl),
        text: buildQuoteConfirmationEmailText(data, whatsappUrl),
        replyTo: siteConfig.email,
      })
      emailSent = true

      // Copia interna opcional (útil en prototipo / demo)
      if (process.env.SMTP_NOTIFY_TO) {
        await sendMail({
          to: process.env.SMTP_NOTIFY_TO,
          subject: `[BOGA] Nueva cotización ${data.referencia} — ${data.nombre}`,
          html: buildQuoteConfirmationEmailHtml(data, whatsappUrl),
          text: buildQuoteConfirmationEmailText(data, whatsappUrl),
          replyTo: data.email,
        })
      }
    }

    return NextResponse.json({
      ok: true,
      referencia: data.referencia,
      whatsappUrl,
      emailSent,
      emailSkippedReason,
    })
  } catch (error) {
    console.error("[cotizacion/enviar]", error)
    const message =
      error instanceof Error ? error.message : "No se pudo procesar la cotización"
    return NextResponse.json({ ok: false, error: message }, { status: 400 })
  }
}
