"use client";

import {
  TRUCK_CAPACITY_SLOTS,
  ITEM_TRANSPORT_TYPES,
  CIUDAD_SEDE,
  ROUTE_COSTS,
} from "@/lib/cotizador/transport-config";
import type { Sede } from "@/lib/cotizador/transport-config";
import type { ItemEnPaquete } from "@/types/cotizador-boga";

export interface UnidadTransporte {
  catalogItemId: string;
  slots: number;
}

export interface Camion {
  espacio_usado: number;
  items: UnidadTransporte[];
}

export interface ResultadoTransporte {
  sede: Sede | null;
  camiones: Camion[];
  costoTotal: number;
  advertencias: string[];
}

/**
 * Retorna true si el item tiene configuracion de transporte fisico (ocupa slots en un camion).
 */
function esItemTransportable(catalogItemId: string): boolean {
  const cfg = ITEM_TRANSPORT_TYPES[catalogItemId];
  if (!cfg) return false;
  return "slots_por_unidad" in cfg;
}

/**
 * Retorna true si el item esta explicitamente marcado como no aplica transporte camion.
 */
function esNoAplicaTransporte(catalogItemId: string): boolean {
  const cfg = ITEM_TRANSPORT_TYPES[catalogItemId];
  if (!cfg) return false;
  return "tipo" in cfg && cfg.tipo === "no_aplica_transporte_camion";
}

/**
 * Selecciona la sede de despacho mas cercana a la ciudad del evento.
 */
export function seleccionarSede(ciudad: string | undefined): { sede: Sede | null; advertencia?: string } {
  if (!ciudad || !ciudad.trim()) {
    return { sede: null, advertencia: "No se ha definido una ciudad del evento." };
  }
  const normalized = ciudad.trim();
  const sede = CIUDAD_SEDE[normalized];
  if (!sede) {
    return {
      sede: null,
      advertencia: `No conocemos la sede mas cercana para "${normalized}". Asigna la sede manualmente o agrega la ciudad a la configuracion.`,
    };
  }
  return { sede };
}

/**
 * Convierte los items de la cotizacion en unidades normalizadas para el camion.
 * Solo incluye items que tienen capacidad fisica (transportables).
 * Items marcados como no_aplica_transporte_camion se omiten silenciosamente.
 */
export function itemsAUnidades(items: ItemEnPaquete[]): UnidadTransporte[] {
  const unidades: UnidadTransporte[] = [];
  for (const it of items) {
    if (!it.cantidad || it.cantidad <= 0) continue;
    if (!esItemTransportable(it.catalogItemId)) continue;
    const cfg = ITEM_TRANSPORT_TYPES[it.catalogItemId];
    if (!cfg || !("slots_por_unidad" in cfg)) continue;
    for (let i = 0; i < it.cantidad; i++) {
      unidades.push({ catalogItemId: it.catalogItemId, slots: cfg.slots_por_unidad });
    }
  }
  return unidades;
}

/**
 * Empaca unidades en camiones usando First-Fit Decreasing.
 */
export function empacarCamiones(unidades: UnidadTransporte[]): Camion[] {
  if (unidades.length === 0) return [];

  const sorted = [...unidades].sort((a, b) => b.slots - a.slots);
  const camiones: Camion[] = [];

  for (const unidad of sorted) {
    let colocada = false;
    for (const camion of camiones) {
      if (camion.espacio_usado + unidad.slots <= TRUCK_CAPACITY_SLOTS) {
        camion.items.push(unidad);
        camion.espacio_usado += unidad.slots;
        colocada = true;
        break;
      }
    }
    if (!colocada) {
      camiones.push({ espacio_usado: unidad.slots, items: [unidad] });
    }
  }

  return camiones;
}

/**
 * Calcula el costo total de transporte para una ruta.
 */
export function calcularCostoRuta(sede: Sede, ciudad: string, numCamiones: number): { costo: number; advertencia?: string } {
  const costosPorSede = ROUTE_COSTS[sede];
  if (!costosPorSede) {
    return { costo: 0, advertencia: `No hay costos configurados para la sede "${sede}".` };
  }
  const costoPorCamion = costosPorSede[ciudad];
  if (costoPorCamion == null) {
    return { costo: 0, advertencia: `Ruta ${sede} -> ${ciudad} sin costo configurado. Costo de ruta pendiente de definir.` };
  }
  return { costo: costoPorCamion * numCamiones };
}

/**
 * Funcion principal: calcula el transporte completo para una cotizacion.
 */
export function calcularTransporte(items: ItemEnPaquete[], ciudadEvento: string | undefined): ResultadoTransporte {
  const advertencias: string[] = [];

  const { sede, advertencia: sedeAdv } = seleccionarSede(ciudadEvento);
  if (sedeAdv) advertencias.push(sedeAdv);
  if (!sede) {
    return { sede: null, camiones: [], costoTotal: 0, advertencias };
  }

  const unidades = itemsAUnidades(items);
  const camiones = empacarCamiones(unidades);

  // Solo advertir de items que faltan completamente en la configuracion
  // (no estan en ITEM_TRANSPORT_TYPES en absoluto -- ni como transportables ni como no_aplica)
  const sinConfig = new Set<string>();
  for (const it of items) {
    if (it.cantidad > 0 && ITEM_TRANSPORT_TYPES[it.catalogItemId] === undefined) {
      sinConfig.add(it.catalogItemId);
    }
  }
  for (const id of sinConfig) {
    advertencias.push(`Item "${id}" no tiene capacidad de transporte configurada. Se ignoro para el calculo.`);
  }

  if (camiones.length === 0) {
    return { sede, camiones: [], costoTotal: 0, advertencias };
  }

  const ciudad = (ciudadEvento ?? "").trim();
  const { costo, advertencia: costoAdv } = calcularCostoRuta(sede, ciudad, camiones.length);
  if (costoAdv) advertencias.push(costoAdv);

  return { sede, camiones, costoTotal: costo, advertencias };
}
