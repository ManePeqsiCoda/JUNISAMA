# Modelo de datos — Cotizador BOGA

> Adaptación de `RR_Kotizador/src/types/index.ts` al dominio BOGA.
> **Archivo destino sugerido:** `src/types/cotizador.ts`

---

## 1. Categorías

```ts
export type CategoriaCatalogo =
  | "Productos"           // baños, lavamanos, tráiler
  | "Servicios"           // alquiler, mantenimiento, operarios
  | "Paquetes"            // combos predefinidos (opcional)
  | "Insumos";            // biodegradables, consumibles

export type TipoEvento =
  | "festival"
  | "concierto"
  | "feria"
  | "corporativo"
  | "boda"
  | "privado"
  | "obra";
```

---

## 2. Catálogo (equivalente a Servicio + Plan)

```ts
export interface CostoItem {
  concepto: string;       // ej. "Transporte ida/vuelta"
  cantidad: number;
  unidad: string;         // "días", "unidades", "evento", "mes"
  costoUnitario: number;  // COP
  costoTotal: number;
  observacion?: string;
}

export interface Tarifa {
  id: string;
  nombre: string;           // ej. "Tarifa por día — evento estándar"
  descripcion: string;
  itemsIncluidos: string[]; // ej. "Limpieza diaria", "Instalación incluida"
  costos: CostoItem[];
  costoTotal: number;
  precioVenta: number;
  margenPorcentaje: number;
  ganancia: number;
  unidadCobro: "dia" | "evento" | "unidad" | "mes";
  validado?: boolean;
}

export interface ItemCatalogo {
  id: string;
  nombre: string;           // ej. "Baño Portátil VIP"
  slug: string;             // ej. "bano-vip"
  descripcion: string;
  categoria: CategoriaCatalogo;
  icono: string;            // lucide icon name
  imagen?: string;          // path público
  specs?: { label: string; value: string }[];
  tarifas: Tarifa[];
  activo: boolean;
  orden?: number;
}
```

---

## 3. Cotización (equivalente a Combo)

```ts
export interface ItemEnCotizacion {
  itemCatalogoId: string;
  tarifaId: string;
  cantidad: number;         // días, unidades, etc.
  notas?: string;
}

export type EstadoCotizacion =
  | "borrador"
  | "enviada"
  | "en_revision"
  | "aceptada"
  | "rechazada"
  | "vencida";

export interface ClienteCotizacion {
  nombre: string;
  empresa?: string;
  email: string;
  telefono: string;
  ciudad: string;
  tipoEvento?: TipoEvento;
  fechaEvento?: string;
  asistentesEstimados?: number;
}

export interface Cotizacion {
  id: string;
  numero: string;           // ej. "BOGA-2026-0042"
  nombre: string;           // ej. "Festival Manizales — 50 baños VIP"
  descripcion?: string;
  cliente: ClienteCotizacion;
  items: ItemEnCotizacion[];
  costoTotal: number;
  precioVenta: number;
  margenPorcentaje: number;
  ganancia: number;
  estado: EstadoCotizacion;
  origen: "admin" | "formulario_publico";
  notasInternas?: string;
  validezDias: number;      // default 15
  creadoEn: string;
  actualizadoEn: string;
  enviadoEn?: string;
}
```

---

## 4. Solicitud pública (desde `/cotizacion`)

```ts
export interface SolicitudCotizacion {
  id: string;
  // Campos del wizard público (Zod schema existente)
  fullName: string;
  company?: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  city: string;
  attendees?: string;
  products: string[];       // slugs seleccionados
  notes?: string;
  estado: "nueva" | "convertida" | "descartada";
  cotizacionId?: string;    // si se convirtió en Cotizacion formal
  recibidoEn: string;
}
```

---

## 5. Persistencia (claves / tablas)

### MVP con API + DB

| Entidad | Tabla / colección |
|---------|-------------------|
| ItemCatalogo | `catalogo_items` |
| Tarifa | `catalogo_tarifas` |
| Cotizacion | `cotizaciones` |
| SolicitudCotizacion | `solicitudes_cotizacion` |

### Referencia Kotizador (solo prototipo)

```ts
const STORAGE_KEYS = {
  catalogo: "boga-catalogo-v1",
  catalogoVersion: "boga-catalogo-version",
  cotizaciones: "boga-cotizaciones",
  solicitudes: "boga-solicitudes",
};
```

---

## 6. Funciones de negocio (patrón `utils.ts`)

```ts
// Equivalente a normalizarPlan() del Kotizador
function normalizarTarifa(tarifa: Tarifa): Tarifa {
  const costoTotal = tarifa.costos.reduce((s, c) => s + c.costoTotal, 0);
  const ganancia = Math.max(0, tarifa.precioVenta - costoTotal);
  const margenPorcentaje =
    tarifa.precioVenta > 0
      ? Math.round((ganancia / tarifa.precioVenta) * 100)
      : 0;
  return { ...tarifa, costoTotal, ganancia, margenPorcentaje };
}

function calcularCotizacion(
  items: ItemEnCotizacion[],
  catalogo: ItemCatalogo[]
): Pick<Cotizacion, "costoTotal" | "precioVenta" | "ganancia" | "margenPorcentaje"> {
  // Sumar costoTotal y precioVenta × cantidad por ítem
}
```

---

## 7. Seed inicial (`DEFAULT_CATALOGO`)

Estructura mínima — poblar con tarifas reales acordadas con BOGA:

```ts
export const DEFAULT_CATALOGO: ItemCatalogo[] = [
  {
    id: "prod-1",
    nombre: "Baño Portátil VIP",
    slug: "bano-vip",
    descripcion: "Unidad premium con acabados de lujo para eventos exclusivos.",
    categoria: "Productos",
    icono: "Star",
    activo: true,
    tarifas: [
      {
        id: "tar-1",
        nombre: "Por día — evento",
        descripcion: "Alquiler diario incluye instalación y retiro.",
        itemsIncluidos: ["Instalación", "Retiro", "1 limpieza diaria"],
        costos: [],
        costoTotal: 0,
        precioVenta: 0,  // ← definir con BOGA
        margenPorcentaje: 0,
        ganancia: 0,
        unidadCobro: "dia",
      },
    ],
  },
  // ... repetir para 8 productos + 4 servicios
];
```

---

## 8. Validaciones Zod (cotización pública)

Reutilizar schema existente en `components/quote-form.tsx` y extender:

```ts
const solicitudSchema = z.object({
  fullName: z.string().min(2),
  company: z.string().optional().default(""),
  email: z.string().email(),
  phone: z.string().min(7),
  eventType: z.string().min(1),
  eventDate: z.string().min(1),
  city: z.string().min(1),
  attendees: z.string().optional().default(""),
  products: z.array(z.string()).min(1),
  notes: z.string().optional().default(""),
});
```

---

*Ver implementación de referencia: `../../RR_Kotizador/src/lib/utils.ts` y `src/types/index.ts`*
