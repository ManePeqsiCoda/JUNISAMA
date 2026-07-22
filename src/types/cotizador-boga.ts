export type CategoriaCatalogo =
  | "banos-portatiles"
  | "lavamanos"
  | "puntos-ecologicos"
  | "trailers"
  | "servicios-operacion"
  | "insumos"
  | "obras"

export type UnidadCobro = "dia" | "evento" | "unidad" | "turno_8h" | "turno_12h" | "mes"

export type TipoEventoCotizador =
  | "festival"
  | "concierto"
  | "feria"
  | "corporativo"
  | "boda"
  | "privado"
  | "obra"

export interface CostoOperativo {
  concepto: string
  cantidad: number
  unidad: string
  costoUnitario: number
  costoTotal: number
}

export interface Tarifa {
  id: string
  nombre: string
  descripcion: string
  incluye: string[]
  costos: CostoOperativo[]
  costoTotal: number
  precioCliente: number
  margenPorcentaje: number
  ganancia: number
  unidadCobro: UnidadCobro
  activa: boolean
}

export interface CatalogItem {
  id: string
  slug: string
  nombre: string
  descripcion: string
  categoria: CategoriaCatalogo
  badge?:
    | "Premium"
    | "Más popular"
    | "Inclusivo"
    | "Tecnología"
    | "Alto volumen"
    | "Sostenible"
  icono: string
  imagen?: string
  specs: { label: string; value: string }[]
  tarifas: Tarifa[]
  activo: boolean
  orden: number
}

export interface ItemEnPaquete {
  catalogItemId: string
  tarifaId: string
  cantidad: number
  nota?: string
}

export type EstadoCotizacionPaquete =
  | "borrador"
  | "enviada"
  | "en_revision"
  | "aceptada"
  | "rechazada"
  | "vencida"

export interface ClienteEvento {
  nombre: string
  empresa?: string
  email: string
  telefono: string
  ciudad: string
}

export interface PaqueteEvento {
  id: string
  numero: string
  nombre: string
  esPlantilla: boolean
  tipoEvento?: TipoEventoCotizador
  cliente?: ClienteEvento
  fechaEvento?: string
  duracionDias?: number
  asistentesEstimados?: number
  items: ItemEnPaquete[]
  costoTotal: number
  precioCliente: number
  margenPorcentaje: number
  ganancia: number
  descuentoPorcentaje?: number
  estado: EstadoCotizacionPaquete
  origen: "admin" | "formulario_publico"
  validezDias: number
  notasInternas?: string
  creadoEn: string
  actualizadoEn: string
  /** Resultado del calculo de transporte (interno, no se muestra al cliente) */
  transporte?: {
    sede: string | null
    numCamiones: number
    costoTotal: number
  }
}

export interface SolicitudPublica {
  id: string
  numeroReferencia: string
  fullName: string
  company?: string
  rut?: string
  email: string
  phone: string
  eventType: string
  eventDate: string
  city: string
  attendees?: string
  productSlugs: string[]
  notes?: string
  estado: "nueva" | "convertida" | "descartada"
  paqueteId?: string
  recibidoEn: string
}

export const CATEGORIA_LABELS: Record<CategoriaCatalogo, string> = {
  "banos-portatiles": "Baños portátiles",
  lavamanos: "Lavamanos",
  "puntos-ecologicos": "Puntos ecológicos",
  trailers: "Tráileres",
  "servicios-operacion": "Servicios de operación",
  insumos: "Insumos",
  obras: "Obras",
}

export const UNIDAD_COBRO_LABELS: Record<UnidadCobro, string> = {
  dia: "días",
  evento: "eventos",
  unidad: "unidades",
  turno_8h: "turnos 8h",
  turno_12h: "turnos 12h",
  mes: "meses",
}
