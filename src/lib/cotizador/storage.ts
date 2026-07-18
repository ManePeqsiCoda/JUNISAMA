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
  PLANTILLAS_PAQUETE,
  SOLICITUDES_DEMO,
} from "@/lib/mocks/cotizador-boga"
import { calcularPaquete } from "@/lib/cotizador/calc"

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
    const seed = [...COTIZACIONES_DEMO, ...PLANTILLAS_PAQUETE]
    writeJSON(KEY_PAQUETES, seed)
    return seed
  }
  return stored
}

export function savePaquetes(paquetes: PaqueteEvento[]) {
  writeJSON(KEY_PAQUETES, paquetes)
}

export function getCotizaciones(): PaqueteEvento[] {
  return getPaquetes().filter((p) => !p.esPlantilla)
}

export function getPlantillas(): PaqueteEvento[] {
  return getPaquetes().filter((p) => p.esPlantilla)
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
  const next = {
    ...paquete,
    ...totales,
    actualizadoEn: new Date().toISOString(),
  }
  if (idx >= 0) all[idx] = next
  else all.unshift(next)
  savePaquetes(all)
  return next
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
  all.unshift(solicitud)
  saveSolicitudes(all)
  return solicitud
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
