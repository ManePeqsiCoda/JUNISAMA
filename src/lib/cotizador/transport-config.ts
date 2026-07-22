"use client";

export const TRUCK_CAPACITY_SLOTS = 30;

export interface TransportItemType {
  max_unidades_solo: number;
  slots_por_unidad: number;
}

export type NoAplicaTransporteCamion = { tipo: "no_aplica_transporte_camion" };

export type ItemTransporte = TransportItemType | NoAplicaTransporteCamion;

export const ITEM_TRANSPORT_TYPES: Record<string, ItemTransporte> = {
  "prod-vip": { max_unidades_solo: 3, slots_por_unidad: 10 },
  "prod-estandar": { max_unidades_solo: 6, slots_por_unidad: 5 },
  "prod-accesible": { max_unidades_solo: 3, slots_por_unidad: 10 },
  "prod-electrico": { max_unidades_solo: 3, slots_por_unidad: 10 },
  "prod-lavamanos": { max_unidades_solo: 4, slots_por_unidad: 7.5 },
  "prod-eco": { max_unidades_solo: 10, slots_por_unidad: 3 },
  "prod-operarios": { tipo: "no_aplica_transporte_camion" },
  "svc-mantenimiento": { tipo: "no_aplica_transporte_camion" },
  "svc-insumos": { tipo: "no_aplica_transporte_camion" },
  "prod-trailer": { tipo: "no_aplica_transporte_camion" },
};

export const SEDES = ["Medellin", "Bogota"] as const;
export type Sede = (typeof SEDES)[number];

export const CIUDAD_SEDE: Record<string, Sede> = {
  Manizales: "Medellin",
  "Medellin": "Medellin",
  Envigado: "Medellin",
  Itagui: "Medellin",
  Bello: "Medellin",
  Rionegro: "Medellin",
  Pereira: "Medellin",
  Armenia: "Medellin",
  Cali: "Bogota",
  "Bogota": "Bogota",
  "Chia": "Bogota",
  Mosquera: "Bogota",
  Soacha: "Bogota",
  Tunja: "Bogota",
  Ibague: "Bogota",
  Villavicencio: "Bogota",
  Barranquilla: "Bogota",
  Cartagena: "Bogota",
  SantaMarta: "Bogota",
  Bucaramanga: "Bogota",
  Cucuta: "Bogota",
};

// Valores estimados para demo — validar con costos reales de BOGA antes de produccion
export const ROUTE_COSTS: Record<string, Record<string, number>> = {
  "Medellin": {
    Manizales: 500000,
    Medellin: 0,
    Envigado: 100000,
    Itagui: 100000,
    Bello: 100000,
    Rionegro: 200000,
    Pereira: 550000,
    Armenia: 600000,
  },
  "Bogota": {
    Bogota: 0,
    Chia: 150000,
    Mosquera: 100000,
    Soacha: 100000,
    Tunja: 400000,
    Ibague: 450000,
    Villavicencio: 350000,
    Cali: 800000,
    Barranquilla: 1200000,
    Cartagena: 1300000,
    SantaMarta: 1200000,
    Bucaramanga: 700000,
    Cucuta: 900000,
  },
};

export const TRANSPORT_ITEM_LABELS: Record<string, string> = {
  "prod-vip": "Baño VIP",
  "prod-estandar": "Baño estándar",
  "prod-accesible": "Baño accesible",
  "prod-electrico": "Baño eléctrico",
  "prod-lavamanos": "Lavamanos portátil",
  "prod-eco": "Punto ecológico",
};
