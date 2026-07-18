import type { CatalogItem, PaqueteEvento } from "@/types/cotizador-boga"
import { formatCOP } from "@/lib/cotizador/calc"
import { siteConfig } from "@/lib/site"

export async function exportPaquetePdf(
  paquete: PaqueteEvento,
  catalogo: CatalogItem[]
) {
  const { jsPDF } = await import("jspdf")
  const autoTable = (await import("jspdf-autotable")).default

  const doc = new jsPDF()
  const margin = 16

  doc.setFillColor(44, 77, 242) // electric
  doc.rect(0, 0, 210, 28, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text("BOGA", margin, 14)
  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.text("INGENIERÍA PORTÁTIL", margin, 21)
  doc.setFontSize(8)
  doc.text(siteConfig.tagline, 120, 18)

  doc.setTextColor(27, 19, 65)
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text("Propuesta de cotización", margin, 40)

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(60, 60, 60)
  let y = 48
  doc.text(`Nº ${paquete.numero}`, margin, y)
  y += 6
  doc.text(paquete.nombre, margin, y)
  y += 6
  if (paquete.cliente) {
    doc.text(
      `Cliente: ${paquete.cliente.nombre}${
        paquete.cliente.empresa ? ` — ${paquete.cliente.empresa}` : ""
      }`,
      margin,
      y
    )
    y += 5
    doc.text(
      `${paquete.cliente.email} · ${paquete.cliente.telefono} · ${paquete.cliente.ciudad}`,
      margin,
      y
    )
    y += 5
  }
  if (paquete.fechaEvento) {
    doc.text(`Fecha del evento: ${paquete.fechaEvento}`, margin, y)
    y += 5
  }
  if (paquete.tipoEvento) {
    doc.text(`Tipo: ${paquete.tipoEvento}`, margin, y)
    y += 5
  }

  const rows = paquete.items.map((it) => {
    const item = catalogo.find((c) => c.id === it.catalogItemId)
    const tarifa = item?.tarifas.find((t) => t.id === it.tarifaId)
    const unit = tarifa?.precioCliente ?? 0
    const sub = unit * Math.max(1, it.cantidad)
    return [
      item?.nombre ?? "—",
      tarifa?.nombre ?? "—",
      String(it.cantidad),
      formatCOP(unit),
      formatCOP(sub),
    ]
  })

  autoTable(doc, {
    startY: y + 4,
    head: [["Producto", "Tarifa", "Cant.", "P. unit.", "Subtotal"]],
    body: rows,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: {
      fillColor: [44, 77, 242],
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: { fillColor: [245, 246, 250] },
    margin: { left: margin, right: margin },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finalY = ((doc as any).lastAutoTable?.finalY as number) ?? y + 40
  let ty = finalY + 10

  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(44, 77, 242)
  doc.text(`Total: ${formatCOP(paquete.precioCliente)}`, margin, ty)
  ty += 8

  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(80, 80, 80)
  doc.text(
    `Validez: ${paquete.validezDias} días desde la emisión.`,
    margin,
    ty
  )
  ty += 5
  doc.text(
    `Contacto: ${siteConfig.email} · ${siteConfig.phone}`,
    margin,
    ty
  )
  ty += 12

  // 3 círculos lima decorativos
  doc.setFillColor(218, 247, 58)
  doc.circle(margin + 3, ty, 2.5, "F")
  doc.circle(margin + 10, ty, 2.5, "F")
  doc.setDrawColor(218, 247, 58)
  doc.setLineWidth(0.8)
  doc.circle(margin + 17, ty, 2.5, "S")

  doc.setFontSize(8)
  doc.setTextColor(140, 140, 140)
  doc.text(
    "Este documento no incluye costos operativos internos.",
    margin,
    285
  )

  doc.save(`${paquete.numero}.pdf`)
}
