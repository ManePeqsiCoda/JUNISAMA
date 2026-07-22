"use client"

import type {
  CatalogItem,
  PaqueteEvento,
  SolicitudPublica,
} from "@/types/cotizador-boga"
import {
  CATALOGO_VERSION,
  COTIZACIONES_DEMO,
  DEFAULT_CATALOGO,
  SOLICITUDES_DEMO,
} from "@/lib/mocks/cotizador-boga"
import { calcularPaquete, formatCOP, nextNumeroSolicitud } from "@/lib/cotizador/calc"
import { calcularTransporte } from "@/lib/cotizador/transporte"
import type { Producto } from "@/lib/mocks"

const KEY_CATALOGO = "boga-catalogo-v1"
const KEY_VERSION = "boga-catalogo-version"
const KEY_PAQUETES = "boga-paquetes"
const KEY_SOLICITUDES = "boga-solicitudes"

function canUseStorage() {
  return typeof window !== "undefined" && !!window.localStorage
}

function readJSON<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJSON(key: string, value: unknown) {
  if (!canUseStorage()) return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore quota / private mode
  }
}

function ensureCatalogVersion() {
  if (!canUseStorage()) return
  const stored = localStorage.getItem(KEY_VERSION)
  if (stored !== CATALOGO_VERSION) {
    localStorage.setItem(KEY_VERSION, CATALOGO_VERSION)
    localStorage.setItem(KEY_CATALOGO, JSON.stringify(DEFAULT_CATALOGO))
  }
}

export function getCatalogo(): CatalogItem[] {
  ensureCatalogVersion()
  return readJSON(KEY_CATALOGO, DEFAULT_CATALOGO)
}

export function saveCatalogo(catalogo: CatalogItem[]) {
  writeJSON(KEY_CATALOGO, catalogo)
  if (canUseStorage()) {
    localStorage.setItem(KEY_VERSION, CATALOGO_VERSION)
  }
}

export function getPaquetes(): PaqueteEvento[] {
  const stored = readJSON<PaqueteEvento[] | null>(KEY_PAQUETES, null)
  if (!stored) {
    const seed = [...COTIZACIONES_DEMO]
    writeJSON(KEY_PAQUETES, seed)
    return seed
  }
  return stored
}

export function savePaquetes(paquetes: PaqueteEvento[]) {
  writeJSON(KEY_PAQUETES, paquetes)
}

export function getCotizaciones(): PaqueteEvento[] {
  return getPaquetes()
}

export function getPaqueteById(id: string): PaqueteEvento | undefined {
  return getPaquetes().find((p) => p.id === id)
}

export function upsertPaquete(paquete: PaqueteEvento) {
  const all = getPaquetes()
  const idx = all.findIndex((p) => p.id === paquete.id)
  const catalogo = getCatalogo()
  const totales = calcularPaquete(
    paquete.items,
    catalogo,
    paquete.descuentoPorcentaje ?? 0,
    paquete.duracionDias ?? 1
  )

  // Calcular transporte
  const ciudad = paquete.cliente?.ciudad
  const transportResult = calcularTransporte(paquete.items, ciudad)

  const next = {
    ...paquete,
    ...totales,
    transporte: transportResult.sede
      ? {
          sede: transportResult.sede,
          numCamiones: transportResult.camiones.length,
          costoTotal: transportResult.costoTotal,
        }
      : undefined,
    actualizadoEn: new Date().toISOString(),
  }
  if (idx >= 0) all[idx] = next
  else all.unshift(next)
  savePaquetes(all)
  return next
}

export function getSolicitudById(id: string): SolicitudPublica | undefined {
  return getSolicitudes().find((s) => s.id === id)
}

export function getSolicitudes(): SolicitudPublica[] {
  const stored = readJSON<SolicitudPublica[] | null>(KEY_SOLICITUDES, null)
  if (!stored) {
    writeJSON(KEY_SOLICITUDES, SOLICITUDES_DEMO)
    return [...SOLICITUDES_DEMO]
  }
  return stored
}

export function saveSolicitudes(solicitudes: SolicitudPublica[]) {
  writeJSON(KEY_SOLICITUDES, solicitudes)
}

export function addSolicitud(solicitud: SolicitudPublica) {
  const all = getSolicitudes()
  const next = {
    ...solicitud,
    numeroReferencia: solicitud.numeroReferencia || nextNumeroSolicitud(all),
  }
  all.unshift(next)
  saveSolicitudes(all)
  return next
}

export function updateSolicitud(id: string, patch: Partial<SolicitudPublica>) {
  const all = getSolicitudes()
  const idx = all.findIndex((s) => s.id === id)
  if (idx < 0) return null
  all[idx] = { ...all[idx], ...patch }
  saveSolicitudes(all)
  return all[idx]
}

export function generateId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

/** Convierte paquetes a objetos Producto para mostrarlos en la sección Servicios */
export function getPaquetesComoProductos(): Producto[] {
  const planesCat: { id: string; slug: string; nombre: string; orden: number } = {
    id: "cat_5",
    slug: "planes",
    nombre: "Planes",
    orden: 5,
  }

  // Imágenes de eventos reales para asignar a cada plan
  const eventImages = [
    "/images/eventos/core-2025.jpg",
    "/images/eventos/festival-verano-2019.jpg",
    "/images/eventos/stereo-picnic-2018.jpg",
    "/images/eventos/feria-manizales-2025.jpg",
    "/images/eventos/rock-al-parque-2022.jpg",
    "/images/eventos/beyond-wonderland-2019.jpg",
    "/images/eventos/papa-francisco-2017.jpg",
    "/images/eventos/doom-2024.jpg",
  ]
  // También imágenes de productos
  const productImages = [
    "/images/products/bano-vip-photo.jpg",
    "/images/products/discapacitados-photo.jpg",
    "/images/products/electricos-photo.jpg",
    "/images/products/trailer-lujo-photo.jpg",
    "/images/products/puntos-ecologicos-photo.jpg",
    "/images/products/lavamanos-photo.jpg",
  ]

  const allImages = [...eventImages, ...productImages]

  const paquetes = getPaquetes().filter((p) => p.origen === "admin" || p.estado !== "borrador")

  return paquetes.map((p, i) => {
    const descuento = p.descuentoPorcentaje ?? 0
    const precioOriginal = descuento > 0
      ? Math.round(p.precioCliente / (1 - descuento / 100))
      : p.precioCliente

    // Imagen rotativa según el índice del paquete
    const imagen = allImages[i % allImages.length]

    return {
      id: `plan_${p.id}`,
      slug: `plan-${p.nombre.toLowerCase().replace(/\s+/g, "-")}`,
      nombre: p.nombre,
      nombreCorto: p.nombre,
      descripcion: p.notasInternas
        ? `${p.items.length} servicios incluidos. ${p.notasInternas}`
        : `Paquete de ${p.items.length} servicios para ${p.tipoEvento ?? "eventos"}.`,
      descripcionCorta: descuento > 0
        ? `Ahorras ${formatCOP(precioOriginal - p.precioCliente)}`
        : `Paquete de ${p.items.length} servicios. Precio especial.`,
      categoriaId: planesCat.id,
      categoria: { ...planesCat, descripcion: "Paquetes promocionales y combos", icono: "Package" },
      tipo: "PRODUCTO",
      badge: descuento > 0 ? `${descuento}% OFF` : "Paquete",
      imagenPrincipal: imagen,
      precioBase: p.precioCliente,
      unidadMedida: "día",
      destacado: true,
      orden: 50 + i,
      estado: "ACTIVO",
      especificaciones: {
        "Servicios incluidos": `${p.items.length} items`,
        "Tipo de evento": p.tipoEvento ?? "General",
        "Precio ref.": formatCOP(precioOriginal),
        "Validez": `${p.validezDias} días`,
      },
    }
  })
}
