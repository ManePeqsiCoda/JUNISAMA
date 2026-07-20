import type { Producto } from "@/lib/mocks"
import { formatCOP } from "@/lib/cotizador/calc"

/** Descuento en productos complementarios cuando el carrito tiene baño / trailer / operarios. */
export const BUNDLE_DISCOUNT_RATE = 0.3

/**
 * Productos ancla: al estar en el carrito, los demás productos reciben 30% off.
 * Baños portátiles, trailer de lujo y servicio de operarios.
 */
export const BUNDLE_TRIGGER_SLUGS = new Set([
  "bano-vip",
  "bano-estandar",
  "discapacitados",
  "electricos",
  "trailer-lujo",
  "operarios",
])

export function isBundleTrigger(slug: string): boolean {
  return BUNDLE_TRIGGER_SLUGS.has(slug)
}

export type PublicCartLineInput = {
  producto: Producto
  cantidad: number
}

export type PublicCartLine = {
  productoId: string
  slug: string
  nombre: string
  cantidad: number
  unidadMedida: string
  precioUnitarioLista: number
  precioUnitarioFinal: number
  subtotalLista: number
  subtotalFinal: number
  aplicaDescuento: boolean
  esAncla: boolean
}

export type PublicCartTotals = {
  lines: PublicCartLine[]
  hasBundleTrigger: boolean
  subtotalLista: number
  descuentoTotal: number
  total: number
}

export function calcularCarritoPublico(
  items: PublicCartLineInput[]
): PublicCartTotals {
  const hasBundleTrigger = items.some((i) => isBundleTrigger(i.producto.slug))

  const lines: PublicCartLine[] = items.map((item) => {
    const precioUnitarioLista = Math.max(0, item.producto.precioBase ?? 0)
    const cantidad = Math.max(1, item.cantidad)
    const esAncla = isBundleTrigger(item.producto.slug)
    const aplicaDescuento = hasBundleTrigger && !esAncla
    const precioUnitarioFinal = aplicaDescuento
      ? Math.round(precioUnitarioLista * (1 - BUNDLE_DISCOUNT_RATE))
      : precioUnitarioLista
    const subtotalLista = precioUnitarioLista * cantidad
    const subtotalFinal = precioUnitarioFinal * cantidad

    return {
      productoId: item.producto.id,
      slug: item.producto.slug,
      nombre: item.producto.nombre,
      cantidad,
      unidadMedida: item.producto.unidadMedida,
      precioUnitarioLista,
      precioUnitarioFinal,
      subtotalLista,
      subtotalFinal,
      aplicaDescuento,
      esAncla,
    }
  })

  const subtotalLista = lines.reduce((s, l) => s + l.subtotalLista, 0)
  const total = lines.reduce((s, l) => s + l.subtotalFinal, 0)
  const descuentoTotal = Math.max(0, subtotalLista - total)

  return {
    lines,
    hasBundleTrigger,
    subtotalLista,
    descuentoTotal,
    total,
  }
}

export function formatPrecioPublico(v: number): string {
  return formatCOP(v)
}

export function labelUnidadPublica(unidad: string): string {
  const u = unidad.toLowerCase()
  if (u.includes("turno")) return "/turno"
  if (u.includes("día") || u.includes("dia")) return "/día"
  return "/unidad"
}
