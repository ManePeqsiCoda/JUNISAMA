import type {
  CatalogItem,
  ItemEnPaquete,
  Tarifa,
} from "@/types/cotizador-boga"

export const MARGEN_WARNING = 25
export const MARGEN_BLOQUEO = 15
export const DESCUENTO_NOTAS_MIN = 10

export function normalizarTarifa(t: Tarifa): Tarifa {
  const costos = t.costos.map((c) => ({
    ...c,
    costoTotal: Math.max(0, c.cantidad) * Math.max(0, c.costoUnitario),
  }))
  const costoTotal = costos.reduce((s, c) => s + c.costoTotal, 0)
  const ganancia = Math.max(0, t.precioCliente - costoTotal)
  const margenPorcentaje =
    t.precioCliente > 0 ? Math.round((ganancia / t.precioCliente) * 100) : 0
  return { ...t, costos, costoTotal, ganancia, margenPorcentaje }
}

/** Factor de días: aplica a tarifas diarias; evento/turno/unidad no se multiplican. */
function factorDias(unidadCobro: string, dias: number) {
  if (unidadCobro === "dia") return Math.max(1, dias)
  return 1
}

export function calcularPaquete(
  items: ItemEnPaquete[],
  catalogo: CatalogItem[],
  descuentoPorcentaje = 0,
  dias = 1
) {
  let costoTotal = 0
  let precioBruto = 0

  for (const it of items) {
    const item = catalogo.find((c) => c.id === it.catalogItemId)
    const tarifa = item?.tarifas.find((t) => t.id === it.tarifaId)
    if (!tarifa) continue
    const q = Math.max(1, it.cantidad)
    const d = factorDias(tarifa.unidadCobro, dias)
    costoTotal += tarifa.costoTotal * q * d
    precioBruto += tarifa.precioCliente * q * d
  }

  const desc = Math.min(100, Math.max(0, descuentoPorcentaje))
  const precioCliente = Math.round(precioBruto * (1 - desc / 100))
  const ganancia = Math.max(0, precioCliente - costoTotal)
  const margenPorcentaje =
    precioCliente > 0 ? Math.round((ganancia / precioCliente) * 100) : 0

  return { costoTotal, precioCliente, precioBruto, ganancia, margenPorcentaje }
}

/** Precio de venta a partir de costo y margen objetivo (%). */
export function precioDesdeMargen(costoTotal: number, margenPorcentaje: number) {
  const m = Math.min(99, Math.max(0, margenPorcentaje)) / 100
  if (m <= 0) return Math.round(costoTotal)
  if (m >= 0.99) return Math.round(costoTotal / 0.01)
  return Math.round(costoTotal / (1 - m))
}

export function subtotalLinea(
  precioUnitario: number,
  cantidad: number,
  unidadCobro: string,
  dias: number
) {
  return (
    precioUnitario *
    Math.max(1, cantidad) *
    factorDias(unidadCobro, dias)
  )
}

export function formatCOP(v: number) {
  return (
    "$" +
    Math.round(v).toLocaleString("es-CO") +
    " COP"
  )
}

export function nextNumeroCotizacion(
  existentes: { numero: string }[],
  year = new Date().getFullYear()
) {
  const prefix = `BOGA-${year}-`
  let max = 0
  for (const e of existentes) {
    if (!e.numero.startsWith(prefix)) continue
    const n = Number(e.numero.slice(prefix.length))
    if (!Number.isNaN(n)) max = Math.max(max, n)
  }
  return `${prefix}${String(max + 1).padStart(4, "0")}`
}

export function margenStatus(margen: number): "ok" | "warning" | "blocked" {
  if (margen < MARGEN_BLOQUEO) return "blocked"
  if (margen < MARGEN_WARNING) return "warning"
  return "ok"
}

export function labelUnidadCobro(_unidad?: string): string {
  return "Cantidad de unidades"
}
