import { siteConfig } from "@/lib/site"

export type QuoteEmailPayload = {
  referencia: string
  nombre: string
  empresa?: string
  email: string
  telefono: string
  ciudad: string
  tipoEvento: string
  fechaEvento: string
  fechaFinEvento?: string
  duracionDias?: number
  ubicacion?: string
  asistentes?: string
  productos: Array<{ nombre: string; cantidad: number }>
  notas?: string
}

export function buildWhatsAppQuoteMessage(data: QuoteEmailPayload) {
  const fechas =
    data.fechaFinEvento && data.fechaFinEvento !== data.fechaEvento
      ? `${data.fechaEvento} → ${data.fechaFinEvento}`
      : data.fechaEvento

  const productos = data.productos
    .map((p) => `• ${p.nombre} x${p.cantidad}`)
    .join("\n")

  return [
    `Hola, ¿cómo estás? Te escribo por una cotización. Esta es la referencia: ${data.referencia}`,
    "",
    `Nombre: ${data.nombre}`,
    data.empresa ? `Empresa: ${data.empresa}` : null,
    `Teléfono: ${data.telefono}`,
    `Email: ${data.email}`,
    `Ciudad: ${data.ciudad}`,
    `Tipo de evento: ${data.tipoEvento}`,
    `Fechas: ${fechas}`,
    data.duracionDias ? `Duración: ${data.duracionDias} días` : null,
    data.ubicacion ? `Ubicación: ${data.ubicacion}` : null,
    data.asistentes ? `Asistentes: ${data.asistentes}` : null,
    "",
    "Productos:",
    productos || "• Sin detalle",
    data.notas ? `\nNotas: ${data.notas}` : null,
  ]
    .filter((line) => line != null)
    .join("\n")
}

export function buildWhatsAppQuoteUrl(data: QuoteEmailPayload) {
  const text = buildWhatsAppQuoteMessage(data)
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

export function buildQuoteConfirmationEmailHtml(
  data: QuoteEmailPayload,
  whatsappUrl: string
) {
  const fechas =
    data.fechaFinEvento && data.fechaFinEvento !== data.fechaEvento
      ? `${data.fechaEvento} → ${data.fechaFinEvento}`
      : data.fechaEvento

  const productosRows = data.productos
    .map(
      (p) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e8eaf0;color:#1b1341;font-size:14px;">
          ${escapeHtml(p.nombre)}
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #e8eaf0;color:#1b1341;font-size:14px;text-align:right;">
          x${p.cantidad}
        </td>
      </tr>`
    )
    .join("")

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cotización ${escapeHtml(data.referencia)} — BOGA</title>
</head>
<body style="margin:0;padding:0;background:#f4f5f8;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f5f8;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 28px rgba(27,19,65,0.08);">
          <tr>
            <td style="background:#1b1341;padding:28px 28px 22px;">
              <div style="display:inline-block;background:#daf73a;color:#1b1341;font-weight:800;font-size:14px;letter-spacing:0.08em;padding:6px 10px;border-radius:8px;">
                BOGA
              </div>
              <h1 style="margin:16px 0 6px;color:#ffffff;font-size:24px;line-height:1.25;">
                Ya recibimos tu cotización
              </h1>
              <p style="margin:0;color:rgba(255,255,255,0.82);font-size:14px;">
                Ingeniería Portátil · Elevamos el estándar de tus eventos
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px;">
              <p style="margin:0 0 16px;color:#1b1341;font-size:15px;line-height:1.55;">
                Hola <strong>${escapeHtml(data.nombre)}</strong>, gracias por escribirnos.
                Este es el resumen de tu solicitud. Nos pondremos en contacto contigo
                en menos de 24 horas.
              </p>

              <div style="background:#f0f3fe;border:1px solid #abb8fa;border-radius:12px;padding:14px 16px;margin:0 0 22px;">
                <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#2541ce;font-weight:700;">
                  Número de referencia
                </div>
                <div style="margin-top:4px;font-size:22px;font-weight:800;color:#1b1341;letter-spacing:0.02em;">
                  ${escapeHtml(data.referencia)}
                </div>
              </div>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:18px;">
                <tr>
                  <td style="padding:8px 0;color:#667085;font-size:13px;width:38%;">Tipo de evento</td>
                  <td style="padding:8px 0;color:#1b1341;font-size:14px;font-weight:600;">${escapeHtml(data.tipoEvento)}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#667085;font-size:13px;">Fechas</td>
                  <td style="padding:8px 0;color:#1b1341;font-size:14px;font-weight:600;">${escapeHtml(fechas)}</td>
                </tr>
                ${
                  data.duracionDias
                    ? `<tr>
                  <td style="padding:8px 0;color:#667085;font-size:13px;">Duración</td>
                  <td style="padding:8px 0;color:#1b1341;font-size:14px;font-weight:600;">${data.duracionDias} días</td>
                </tr>`
                    : ""
                }
                <tr>
                  <td style="padding:8px 0;color:#667085;font-size:13px;">Ciudad</td>
                  <td style="padding:8px 0;color:#1b1341;font-size:14px;font-weight:600;">${escapeHtml(data.ciudad)}</td>
                </tr>
                ${
                  data.ubicacion
                    ? `<tr>
                  <td style="padding:8px 0;color:#667085;font-size:13px;">Ubicación</td>
                  <td style="padding:8px 0;color:#1b1341;font-size:14px;font-weight:600;">${escapeHtml(data.ubicacion)}</td>
                </tr>`
                    : ""
                }
              </table>

              <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#667085;font-weight:700;margin:0 0 8px;">
                Productos solicitados
              </div>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e8eaf0;border-radius:12px;overflow:hidden;margin-bottom:24px;">
                ${productosRows || `<tr><td style="padding:12px;color:#667085;font-size:14px;">Sin productos detallados</td></tr>`}
              </table>

              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto 10px;">
                <tr>
                  <td align="center" style="border-radius:999px;background:#25D366;">
                    <a href="${escapeHtml(whatsappUrl)}"
                       style="display:inline-block;padding:14px 22px;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;">
                      Continuar en WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0;text-align:center;color:#667085;font-size:12px;line-height:1.45;">
                Al abrir WhatsApp se enviará un mensaje con tu referencia
                <strong>${escapeHtml(data.referencia)}</strong> al equipo BOGA.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:#1b1341;padding:18px 28px;text-align:center;">
              <div style="height:3px;width:56px;background:#daf73a;border-radius:999px;margin:0 auto 12px;"></div>
              <p style="margin:0 0 4px;color:#ffffff;font-size:13px;font-weight:700;">
                ${escapeHtml(siteConfig.fullName)}
              </p>
              <p style="margin:0;color:rgba(255,255,255,0.7);font-size:12px;">
                ${escapeHtml(siteConfig.phone)} · ${escapeHtml(siteConfig.email)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function buildQuoteConfirmationEmailText(
  data: QuoteEmailPayload,
  whatsappUrl: string
) {
  return [
    `BOGA — Ya recibimos tu cotización`,
    ``,
    `Hola ${data.nombre},`,
    `Gracias por tu solicitud. Nos pondremos en contacto en menos de 24 horas.`,
    ``,
    `Referencia: ${data.referencia}`,
    `Tipo de evento: ${data.tipoEvento}`,
    `Fechas: ${data.fechaEvento}${data.fechaFinEvento ? ` → ${data.fechaFinEvento}` : ""}`,
    data.duracionDias ? `Duración: ${data.duracionDias} días` : null,
    `Ciudad: ${data.ciudad}`,
    ``,
    `Continúa por WhatsApp: ${whatsappUrl}`,
  ]
    .filter((line) => line != null)
    .join("\n")
}
