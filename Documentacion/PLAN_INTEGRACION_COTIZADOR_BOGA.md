# PLAN DE INTEGRACIÓN — Cotizador tipo RR Kotizador en Admin BOGA

> **Versión:** 1.0  
> **Fecha:** 17/07/2026  
> **Estado:** Documento maestro de integración (prototipo)  
> **Audiencia:** Dev / Kimi Code / lead frontend  
> **No es un copy-paste.** Es una adaptación de capacidades del Kotizador al dominio, brand kit y admin ya existentes de BOGA.

---

## 0. Lectura previa obligatoria

| Documento | Por qué |
|-----------|---------|
| `../brand-kit-boga-auditoria.md` | Identidad: logo, HEX, tipografía, 3 círculos, tono |
| `../design-system-boga.md` | Tokens, motion, componentes, superficies |
| `../mapa-de-cambios.md` §5 (Panel Admin) | Qué ya existe en admin y qué se ADAPTA |
| `../auditoria-estado-actual.md` | Inventario del prototipo (8 productos, wizard público) |
| `../../RR_Kotizador/DOCUMENTO_MAESTRO_RR_KOTIZADOR.md` | Qué hace el Kotizador y por qué |
| `../../RR_Kotizador/src/pages/CreateCombo.tsx` | Flujo combos (lógica a adaptar) |
| `../../RR_Kotizador/src/components/AdminModal.tsx` | CRUD catálogo con costos |
| `../../RR_Kotizador/src/types/index.ts` | Modelo Servicio/Plan/Combo |

---

## 1. Qué se busca lograr (comprensión del problema)

### 1.1 El negocio BOGA (no es una agencia digital)

BOGA es **Ingeniería Portátil**: alquiler de baños portátiles, lavamanos, tráileres y servicios de operación para **eventos** (festivales, conciertos, bodas, ferias, corporativos). El cliente típico es un organizador de eventos que necesita:

1. Elegir unidades (VIP, estándar, accesibles…)
2. Sumar servicios (operarios, mantenimiento, insumos)
3. Recibir una **propuesta clara** en COP con cantidades por día/evento
4. Confiar en que “nada falla” (ISO, 24/7, instalación y retiro)

El Kotizador de RR Aliados cotiza **servicios de agencia** (video, redes, web) en planes mensuales.  
BOGA cotiza **unidades + servicios de evento** en tarifas por **día / evento / turno**.

### 1.2 Qué aporta el Kotizador (capacidades, no UI)

| Capacidad Kotizador | Valor para BOGA | Traducción BOGA |
|---------------------|-----------------|-----------------|
| Catálogo con planes y costos internos | Comercial ve margen real | Catálogo productos/servicios + **tarifas** con desglose de costos |
| Constructor de **combos** | Empaquetar oferta rápida | Constructor de **paquetes de evento** (combo BOGA) |
| Cálculo costo / precio / margen | Evitar cotizar a pérdida | Totales vivos en admin |
| Admin CRUD de servicios | Actualizar precios sin redeploy | Ampliar `/admin/productos` + tarifas |
| Persistencia versionada | Cache no se queda viejo | `CATALOGO_VERSION` en mocks |
| PDF / export | Propuesta profesional | PDF BOGA (sin costos internos al cliente) |
| Cronograma 6 meses | (opcional) | Plan de entrega del **evento** (D-2 → D+1), no 6 meses |

### 1.3 Qué BOGA ya tiene (no reinventar)

Del `mapa-de-cambios.md` y la auditoría, el prototipo **ya incluye**:

| Existente | Ruta / archivo | Acción |
|-----------|----------------|--------|
| Login admin | `/admin/login` | Conservar + endurecer auth |
| Dashboard KPIs | `/admin` | Ampliar widgets (paquetes, márgenes) |
| CRUD Productos | `/admin/productos` + `producto-form.tsx` | **Ampliar** con tarifas/costos estilo Kotizador |
| CRUD Cotizaciones | `/admin/cotizaciones`, `/nueva`, `[id]` | **Evolucionar** con constructor de paquetes |
| CotizacionWizard | `cotizacion-wizard.tsx` | **Refactor** hacia patrón CreateCombo |
| Clientes | `/admin/clientes` | Conservar; vincular a cotizaciones |
| Eventos admin | `/admin/eventos` | Conservar |
| Wizard público | `/cotizacion` (3 pasos) | Conservar; alimentar bandeja admin |
| Mocks | `src/lib/mocks.ts` | **Reescribir** con datos BOGA + estructura combo |
| Tema admin dark | `[data-admin-theme="dark"]` | Aplicar tokens BOGA (azul + lima) |
| AdminHeader / AdminSidebar | layout | Añadir nav: **Paquetes**, ampliar Cotizaciones |

### 1.4 Principio de integración

```
NO: clonar RR Kotizador (Vite SPA dark-gold) dentro de BOGA.
SÍ:  tomar la LÓGICA de combos + costos + márgenes
     e integrarla en el admin Next.js existente,
     con UI 100% design system BOGA y mocks del dominio sanitario/eventos.
```

---

## 2. Vocabulario de dominio (traducción obligatoria)

Usar siempre lenguaje BOGA en UI y código. Evitar “servicio de video”, “plan mensual RR”, “Plan Maestro”.

| Término Kotizador | Término BOGA (UI) | Término código sugerido |
|-------------------|-------------------|-------------------------|
| Servicio | Producto o Servicio operativo | `CatalogItem` |
| Plan | Tarifa | `Tarifa` |
| Combo | **Paquete de evento** | `PaqueteEvento` |
| Crear combo | Nueva cotización / Armar paquete | — |
| Costo interno | Costo operativo (solo admin) | `costoTotal` |
| Precio venta | Precio al cliente | `precioCliente` |
| Margen % | Margen | `margenPorcentaje` |
| Items incluidos | Incluye | `incluye` |
| Cronograma 6 meses | Plan de entrega del evento | `PlanEntregaEvento` (fase 2) |
| AdminModal | Editor de catálogo | páginas `/admin/productos` |

**Copy de interfaz (tono brand kit):**

- Tagline de contexto: *“Elevamos el estándar de tus eventos.”*
- CTA primario admin: lima `#daf73a` sobre texto `#1b1341`
- Submarca en header admin: *INGENIERÍA PORTÁTIL* (tracking amplio, weight 300)
- Loading: 3 círculos BOGA (2 llenos + 1 vacío)

---

## 3. Modelo mental del “Combo BOGA”

### 3.1 Qué es un Paquete de Evento

Un **Paquete de Evento** = selección de **tarifas** de productos/servicios + **cantidades** (unidades × días o turnos) + datos del evento/cliente + totales.

Ejemplos reales de negocio (mocks):

| Nombre paquete | Contenido típico | Tipo evento |
|----------------|------------------|-------------|
| Festival Starter | 20 Estándar + 4 Accesibles + 6 Lavamanos + Operarios 2 turnos | Festival |
| VIP Wedding | 4 VIP + 2 Lavamanos + Tráiler Lujo + Insumos eco | Boda |
| Corporativo 500 | 15 Estándar + 2 VIP + Mantenimiento 24/7 | Corporativo |
| Obra Compacta | 8 Estándar + Operarios 1 turno | Obra |

Esto es el equivalente funcional de “Presencia Digital” / “Growth Pack” del Kotizador, pero **en unidades sanitarias**, no en reels.

### 3.2 Flujo usuario admin (objetivo)

```
1. Comercial entra a /admin/cotizaciones/nueva
2. Completa datos del evento (cliente, fecha, ciudad, tipo, asistentes)
3. En el catálogo (izquierda) selecciona tarifas de productos/servicios
4. Ajusta cantidades (unidades, días, turnos)
5. Ve a la derecha: costo interno | precio cliente | margen %
6. Opcional: aplica descuento paquete (con alerta si margen < mínimo)
7. Guarda como borrador → envía PDF al cliente → marca "enviada"
8. Si vino de /cotizacion pública: convierte solicitud → paquete prellenado
```

### 3.3 Relación con CotizacionWizard existente

`cotizacion-wizard.tsx` **no se tira**. Se evoluciona:

| Antes (inferido) | Después (integración) |
|------------------|----------------------|
| Selección simple de productos | Selección de **tarifas** con cantidades (patrón CreateCombo) |
| Precio base plano | Precio + costo + margen recalculado |
| Sin “paquetes guardados” | Paquetes reutilizables (plantillas) + cotizaciones por cliente |
| Hex literales ganancia/pérdida | Tokens `--boga-success-*` / `--boga-error-*` / lima |

---

## 4. Modelo de datos (mocks-first para el prototipo)

Archivo canónico: **`src/lib/mocks/cotizador-boga.ts`**  
(o ampliar `src/lib/mocks.ts` con secciones nuevas — una sola fuente de verdad).

### 4.1 Tipos TypeScript

```ts
// src/types/cotizador-boga.ts

export type CategoriaCatalogo =
  | "banos-portatiles"
  | "lavamanos"
  | "puntos-ecologicos"
  | "trailers"
  | "servicios-operacion"
  | "insumos";

export type UnidadCobro = "dia" | "evento" | "unidad" | "turno_8h" | "turno_12h";

export type TipoEvento =
  | "festival" | "concierto" | "feria" | "corporativo"
  | "boda" | "privado" | "obra";

export interface CostoOperativo {
  concepto: string;       // "Transporte ida/vuelta", "Limpieza diaria"
  cantidad: number;
  unidad: string;
  costoUnitario: number;  // COP
  costoTotal: number;
}

export interface Tarifa {
  id: string;
  nombre: string;         // "Tarifa día — evento estándar"
  descripcion: string;
  incluye: string[];
  costos: CostoOperativo[];
  costoTotal: number;
  precioCliente: number;
  margenPorcentaje: number;
  ganancia: number;
  unidadCobro: UnidadCobro;
  activa: boolean;
}

export interface CatalogItem {
  id: string;
  slug: string;           // mantener slugs SEO existentes
  nombre: string;
  descripcion: string;
  categoria: CategoriaCatalogo;
  badge?: "Premium" | "Más popular" | "Inclusivo" | "Tecnología" | "Alto volumen" | "Sostenible";
  icono: string;          // lucide o icono BOGA lineal
  imagen?: string;
  specs: { label: string; value: string }[];
  tarifas: Tarifa[];
  activo: boolean;
  orden: number;
}

export interface ItemEnPaquete {
  catalogItemId: string;
  tarifaId: string;
  cantidad: number;       // unidades, días o turnos según unidadCobro
  nota?: string;
}

export type EstadoCotizacion =
  | "borrador" | "enviada" | "en_revision"
  | "aceptada" | "rechazada" | "vencida";

export interface ClienteEvento {
  nombre: string;
  empresa?: string;
  email: string;
  telefono: string;
  ciudad: string;
}

export interface PaqueteEvento {
  id: string;
  numero: string;         // BOGA-2026-0001
  nombre: string;         // "Festival Manizales — 50 unidades"
  esPlantilla: boolean;   // true = combo reutilizable; false = cotización de cliente
  tipoEvento?: TipoEvento;
  cliente?: ClienteEvento;
  fechaEvento?: string;
  asistentesEstimados?: number;
  items: ItemEnPaquete[];
  costoTotal: number;
  precioCliente: number;
  margenPorcentaje: number;
  ganancia: number;
  descuentoPorcentaje?: number;
  estado: EstadoCotizacion;
  origen: "admin" | "formulario_publico" | "plantilla";
  validezDias: number;    // default 15
  notasInternas?: string;
  creadoEn: string;
  actualizadoEn: string;
}

export interface SolicitudPublica {
  id: string;
  fullName: string;
  company?: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  city: string;
  attendees?: string;
  productSlugs: string[];
  notes?: string;
  estado: "nueva" | "convertida" | "descartada";
  paqueteId?: string;
  recibidoEn: string;
}
```

### 4.2 Funciones de negocio (portar lógica, no UI)

```ts
// src/lib/cotizador/calc.ts — inspirado en normalizarPlan() del Kotizador

export function normalizarTarifa(t: Tarifa): Tarifa {
  const costoTotal = t.costos.reduce((s, c) => s + c.costoTotal, 0);
  const ganancia = Math.max(0, t.precioCliente - costoTotal);
  const margenPorcentaje =
    t.precioCliente > 0 ? Math.round((ganancia / t.precioCliente) * 100) : 0;
  return { ...t, costoTotal, ganancia, margenPorcentaje };
}

export function calcularPaquete(
  items: ItemEnPaquete[],
  catalogo: CatalogItem[]
) {
  let costoTotal = 0;
  let precioCliente = 0;
  for (const it of items) {
    const item = catalogo.find((c) => c.id === it.catalogItemId);
    const tarifa = item?.tarifas.find((t) => t.id === it.tarifaId);
    if (!tarifa) continue;
    const q = Math.max(1, it.cantidad);
    costoTotal += tarifa.costoTotal * q;
    precioCliente += tarifa.precioCliente * q;
  }
  const ganancia = Math.max(0, precioCliente - costoTotal);
  const margenPorcentaje =
    precioCliente > 0 ? Math.round((ganancia / precioCliente) * 100) : 0;
  return { costoTotal, precioCliente, ganancia, margenPorcentaje };
}

export function formatCOP(v: number) {
  return "$" + v.toLocaleString("es-CO") + " COP";
}
```

### 4.3 Seed / mocks exhaustivos (adaptados al prototipo BOGA)

Precios mock — **placeholders comerciales** para prototipo (marcar `// MOCK — validar con BOGA`). Margen objetivo demo ~35–55%.

#### Catálogo (8 productos + 4 servicios)

```ts
export const CATALOGO_VERSION = "boga-1";

export const DEFAULT_CATALOGO: CatalogItem[] = [
  {
    id: "prod-vip",
    slug: "bano-vip",
    nombre: "Baño Portátil VIP",
    descripcion: "Unidad premium con acabados de lujo para eventos exclusivos.",
    categoria: "banos-portatiles",
    badge: "Premium",
    icono: "Sparkles",
    specs: [
      { label: "Capacidad", value: "Hasta 200 usos/día" },
      { label: "Material", value: "Acero inoxidable" },
      { label: "Extras", value: "Espejo, lavamanos, iluminación" },
    ],
    activo: true,
    orden: 1,
    tarifas: [
      {
        id: "tar-vip-dia",
        nombre: "Por día — evento",
        descripcion: "Alquiler diario con instalación y retiro incluidos.",
        incluye: ["Instalación", "Retiro", "1 limpieza diaria", "Insumos básicos"],
        costos: [
          { concepto: "Amortización unidad VIP", cantidad: 1, unidad: "día", costoUnitario: 85000, costoTotal: 85000 },
          { concepto: "Logística instalación/retiro", cantidad: 1, unidad: "viaje", costoUnitario: 45000, costoTotal: 45000 },
          { concepto: "Limpieza diaria", cantidad: 1, unidad: "día", costoUnitario: 35000, costoTotal: 35000 },
        ],
        costoTotal: 165000,
        precioCliente: 320000,
        margenPorcentaje: 48,
        ganancia: 155000,
        unidadCobro: "dia",
        activa: true,
      },
      {
        id: "tar-vip-finde",
        nombre: "Fin de semana (vie–dom)",
        descripcion: "Tarifa paquete 3 días para bodas y festivales.",
        incluye: ["3 días de operación", "Instalación", "Retiro", "Limpieza diaria"],
        costos: [
          { concepto: "Amortización 3 días", cantidad: 3, unidad: "día", costoUnitario: 85000, costoTotal: 255000 },
          { concepto: "Logística", cantidad: 1, unidad: "viaje", costoUnitario: 55000, costoTotal: 55000 },
          { concepto: "Limpieza", cantidad: 3, unidad: "día", costoUnitario: 35000, costoTotal: 105000 },
        ],
        costoTotal: 415000,
        precioCliente: 850000,
        margenPorcentaje: 51,
        ganancia: 435000,
        unidadCobro: "evento",
        activa: true,
      },
    ],
  },
  {
    id: "prod-estandar",
    slug: "bano-estandar",
    nombre: "Baño Portátil Estándar",
    descripcion: "Solución práctica para obras y eventos masivos.",
    categoria: "banos-portatiles",
    badge: "Más popular",
    icono: "Box",
    specs: [
      { label: "Capacidad", value: "Hasta 150 usos/día" },
      { label: "Material", value: "Polietileno HD" },
    ],
    activo: true,
    orden: 2,
    tarifas: [
      {
        id: "tar-std-dia",
        nombre: "Por día — evento",
        descripcion: "Tarifa unitaria diaria.",
        incluye: ["Instalación", "Retiro", "Limpieza diaria"],
        costos: [
          { concepto: "Amortización unidad", cantidad: 1, unidad: "día", costoUnitario: 35000, costoTotal: 35000 },
          { concepto: "Logística prorrateada", cantidad: 1, unidad: "día", costoUnitario: 15000, costoTotal: 15000 },
          { concepto: "Limpieza", cantidad: 1, unidad: "día", costoUnitario: 20000, costoTotal: 20000 },
        ],
        costoTotal: 70000,
        precioCliente: 145000,
        margenPorcentaje: 52,
        ganancia: 75000,
        unidadCobro: "dia",
        activa: true,
      },
    ],
  },
  {
    id: "prod-accesible",
    slug: "discapacitados",
    nombre: "Baño para Discapacitados",
    descripcion: "Unidad accesible con normativas de inclusión.",
    categoria: "banos-portatiles",
    badge: "Inclusivo",
    icono: "Accessibility",
    specs: [{ label: "Normativa", value: "Accesibilidad NTC" }],
    activo: true,
    orden: 3,
    tarifas: [
      {
        id: "tar-acc-dia",
        nombre: "Por día — evento",
        descripcion: "Incluye rampa y espacio interior ampliado.",
        incluye: ["Instalación", "Retiro", "Limpieza diaria", "Rampa"],
        costos: [
          { concepto: "Amortización unidad accesible", cantidad: 1, unidad: "día", costoUnitario: 55000, costoTotal: 55000 },
          { concepto: "Logística", cantidad: 1, unidad: "día", costoUnitario: 25000, costoTotal: 25000 },
          { concepto: "Limpieza", cantidad: 1, unidad: "día", costoUnitario: 25000, costoTotal: 25000 },
        ],
        costoTotal: 105000,
        precioCliente: 210000,
        margenPorcentaje: 50,
        ganancia: 105000,
        unidadCobro: "dia",
        activa: true,
      },
    ],
  },
  {
    id: "prod-electrico",
    slug: "electricos",
    nombre: "Baño Portátil Eléctrico",
    descripcion: "Iluminación y climatización para operación nocturna.",
    categoria: "banos-portatiles",
    badge: "Tecnología",
    icono: "Zap",
    specs: [{ label: "Extras", value: "Iluminación LED, ventilación" }],
    activo: true,
    orden: 4,
    tarifas: [
      {
        id: "tar-elec-dia",
        nombre: "Por día — evento",
        incluye: ["Instalación", "Retiro", "Energía estimada", "Limpieza"],
        descripcion: "Requiere punto de energía en sitio.",
        costos: [
          { concepto: "Amortización + energía", cantidad: 1, unidad: "día", costoUnitario: 70000, costoTotal: 70000 },
          { concepto: "Logística", cantidad: 1, unidad: "día", costoUnitario: 25000, costoTotal: 25000 },
          { concepto: "Limpieza", cantidad: 1, unidad: "día", costoUnitario: 25000, costoTotal: 25000 },
        ],
        costoTotal: 120000,
        precioCliente: 250000,
        margenPorcentaje: 52,
        ganancia: 130000,
        unidadCobro: "dia",
        activa: true,
      },
    ],
  },
  {
    id: "prod-lavamanos",
    slug: "lavamanos",
    nombre: "Lavamanos Aquastand / Aquapop",
    descripcion: "Estaciones de lavado de alto volumen.",
    categoria: "lavamanos",
    badge: "Alto volumen",
    icono: "Droplets",
    specs: [{ label: "Uso", value: "Alto tráfico" }],
    activo: true,
    orden: 5,
    tarifas: [
      {
        id: "tar-lava-dia",
        nombre: "Por día — evento",
        incluye: ["Instalación", "Retiro", "Reposición agua/jabón"],
        descripcion: "Ideal junto a baterías de baños.",
        costos: [
          { concepto: "Amortización estación", cantidad: 1, unidad: "día", costoUnitario: 25000, costoTotal: 25000 },
          { concepto: "Insumos agua/jabón", cantidad: 1, unidad: "día", costoUnitario: 15000, costoTotal: 15000 },
          { concepto: "Logística", cantidad: 1, unidad: "día", costoUnitario: 10000, costoTotal: 10000 },
        ],
        costoTotal: 50000,
        precioCliente: 110000,
        margenPorcentaje: 55,
        ganancia: 60000,
        unidadCobro: "dia",
        activa: true,
      },
    ],
  },
  {
    id: "prod-trailer",
    slug: "trailer-lujo",
    nombre: "Tráiler de Lujo",
    descripcion: "Múltiples cabinas climatizadas para grandes eventos.",
    categoria: "trailers",
    badge: "Premium",
    icono: "Truck",
    specs: [
      { label: "Cabinas", value: "4–8" },
      { label: "Clima", value: "A/C incluido" },
    ],
    activo: true,
    orden: 6,
    tarifas: [
      {
        id: "tar-trail-evento",
        nombre: "Por evento (hasta 3 días)",
        incluye: ["Transporte especial", "Instalación", "Operario dedicado", "Retiro"],
        descripcion: "Incluye movilización de tráiler.",
        costos: [
          { concepto: "Movilización tráiler", cantidad: 1, unidad: "viaje", costoUnitario: 450000, costoTotal: 450000 },
          { concepto: "Amortización 3 días", cantidad: 3, unidad: "día", costoUnitario: 180000, costoTotal: 540000 },
          { concepto: "Operario dedicado", cantidad: 3, unidad: "día", costoUnitario: 120000, costoTotal: 360000 },
        ],
        costoTotal: 1350000,
        precioCliente: 2800000,
        margenPorcentaje: 52,
        ganancia: 1450000,
        unidadCobro: "evento",
        activa: true,
      },
    ],
  },
  {
    id: "prod-eco",
    slug: "puntos-ecologicos",
    nombre: "Puntos Ecológicos",
    descripcion: "Estaciones de reciclaje y compostaje para eventos sostenibles.",
    categoria: "puntos-ecologicos",
    badge: "Sostenible",
    icono: "Leaf",
    specs: [{ label: "Fracciones", value: "3–4 contenedores" }],
    activo: true,
    orden: 7,
    tarifas: [
      {
        id: "tar-eco-dia",
        nombre: "Por día — evento",
        incluye: ["Instalación", "Retiro", "Señalética"],
        descripcion: "Complemento ESG para festivales.",
        costos: [
          { concepto: "Amortización punto", cantidad: 1, unidad: "día", costoUnitario: 20000, costoTotal: 20000 },
          { concepto: "Logística", cantidad: 1, unidad: "día", costoUnitario: 12000, costoTotal: 12000 },
        ],
        costoTotal: 32000,
        precioCliente: 75000,
        margenPorcentaje: 57,
        ganancia: 43000,
        unidadCobro: "dia",
        activa: true,
      },
    ],
  },
  {
    id: "prod-operarios",
    slug: "operarios",
    nombre: "Servicio de Operarios",
    descripcion: "Personal certificado en sitio durante el evento.",
    categoria: "servicios-operacion",
    badge: undefined,
    icono: "Users",
    specs: [{ label: "Turnos", value: "8h / 12h" }],
    activo: true,
    orden: 8,
    tarifas: [
      {
        id: "tar-op-8h",
        nombre: "Turno 8 horas",
        incluye: ["Uniforme", "Supervisión", "Kit básico"],
        descripcion: "1 operario certificado por turno.",
        costos: [
          { concepto: "Honorarios operario", cantidad: 1, unidad: "turno", costoUnitario: 90000, costoTotal: 90000 },
          { concepto: "Uniforme/kit", cantidad: 1, unidad: "turno", costoUnitario: 15000, costoTotal: 15000 },
        ],
        costoTotal: 105000,
        precioCliente: 180000,
        margenPorcentaje: 42,
        ganancia: 75000,
        unidadCobro: "turno_8h",
        activa: true,
      },
      {
        id: "tar-op-12h",
        nombre: "Turno 12 horas",
        incluye: ["Uniforme", "Supervisión", "Kit básico"],
        descripcion: "Cobertura extendida para festivales.",
        costos: [
          { concepto: "Honorarios operario", cantidad: 1, unidad: "turno", costoUnitario: 130000, costoTotal: 130000 },
          { concepto: "Uniforme/kit", cantidad: 1, unidad: "turno", costoUnitario: 15000, costoTotal: 15000 },
        ],
        costoTotal: 145000,
        precioCliente: 250000,
        margenPorcentaje: 42,
        ganancia: 105000,
        unidadCobro: "turno_12h",
        activa: true,
      },
    ],
  },
  // --- Servicios (página /servicios) como ítems cotizables ---
  {
    id: "svc-mantenimiento",
    slug: "mantenimiento",
    nombre: "Mantenimiento Especializado 24/7",
    descripcion: "Protocolo de higiene industrial y respuesta inmediata.",
    categoria: "servicios-operacion",
    icono: "Wrench",
    specs: [],
    activo: true,
    orden: 9,
    tarifas: [
      {
        id: "tar-mant-evento",
        nombre: "Cobertura evento (hasta 3 días)",
        incluye: ["Limpieza profunda", "Reposición insumos", "Monitoreo"],
        descripcion: "Complemento obligatorio en festivales >1000 personas.",
        costos: [
          { concepto: "Cuadrilla mantenimiento", cantidad: 3, unidad: "día", costoUnitario: 200000, costoTotal: 600000 },
          { concepto: "Insumos", cantidad: 1, unidad: "paquete", costoUnitario: 150000, costoTotal: 150000 },
        ],
        costoTotal: 750000,
        precioCliente: 1400000,
        margenPorcentaje: 46,
        ganancia: 650000,
        unidadCobro: "evento",
        activa: true,
      },
    ],
  },
  {
    id: "svc-insumos",
    slug: "insumos-eco",
    nombre: "Insumos Biodegradables",
    descripcion: "Papel, jabón y desinfectantes eco-friendly.",
    categoria: "insumos",
    icono: "Leaf",
    specs: [],
    activo: true,
    orden: 10,
    tarifas: [
      {
        id: "tar-insumo-paquete",
        nombre: "Paquete por 10 unidades/día",
        incluye: ["Papel eco", "Jabón bio", "Sanitizante"],
        descripcion: "Escala con cantidad de baños.",
        costos: [
          { concepto: "Insumos eco", cantidad: 1, unidad: "paquete", costoUnitario: 80000, costoTotal: 80000 },
        ],
        costoTotal: 80000,
        precioCliente: 150000,
        margenPorcentaje: 47,
        ganancia: 70000,
        unidadCobro: "dia",
        activa: true,
      },
    ],
  },
];
```

#### Plantillas de paquete (equivalente DEFAULT_COMBOS)

```ts
export const PLANTILLAS_PAQUETE: PaqueteEvento[] = [
  {
    id: "pkg-festival-starter",
    numero: "PLANTILLA-01",
    nombre: "Festival Starter",
    esPlantilla: true,
    tipoEvento: "festival",
    items: [
      { catalogItemId: "prod-estandar", tarifaId: "tar-std-dia", cantidad: 20 },
      { catalogItemId: "prod-accesible", tarifaId: "tar-acc-dia", cantidad: 4 },
      { catalogItemId: "prod-lavamanos", tarifaId: "tar-lava-dia", cantidad: 6 },
      { catalogItemId: "prod-operarios", tarifaId: "tar-op-12h", cantidad: 4 },
      { catalogItemId: "svc-mantenimiento", tarifaId: "tar-mant-evento", cantidad: 1 },
    ],
    // totales se recalculan con calcularPaquete() al cargar
    costoTotal: 0,
    precioCliente: 0,
    margenPorcentaje: 0,
    ganancia: 0,
    estado: "borrador",
    origen: "plantilla",
    validezDias: 15,
    creadoEn: "2026-07-01T00:00:00.000Z",
    actualizadoEn: "2026-07-01T00:00:00.000Z",
  },
  {
    id: "pkg-vip-wedding",
    numero: "PLANTILLA-02",
    nombre: "VIP Wedding",
    esPlantilla: true,
    tipoEvento: "boda",
    items: [
      { catalogItemId: "prod-vip", tarifaId: "tar-vip-finde", cantidad: 4 },
      { catalogItemId: "prod-lavamanos", tarifaId: "tar-lava-dia", cantidad: 2 },
      { catalogItemId: "prod-trailer", tarifaId: "tar-trail-evento", cantidad: 1 },
      { catalogItemId: "svc-insumos", tarifaId: "tar-insumo-paquete", cantidad: 3 },
    ],
    costoTotal: 0,
    precioCliente: 0,
    margenPorcentaje: 0,
    ganancia: 0,
    estado: "borrador",
    origen: "plantilla",
    validezDias: 15,
    creadoEn: "2026-07-01T00:00:00.000Z",
    actualizadoEn: "2026-07-01T00:00:00.000Z",
  },
  {
    id: "pkg-corp-500",
    numero: "PLANTILLA-03",
    nombre: "Corporativo 500",
    esPlantilla: true,
    tipoEvento: "corporativo",
    items: [
      { catalogItemId: "prod-estandar", tarifaId: "tar-std-dia", cantidad: 15 },
      { catalogItemId: "prod-vip", tarifaId: "tar-vip-dia", cantidad: 2 },
      { catalogItemId: "prod-accesible", tarifaId: "tar-acc-dia", cantidad: 2 },
      { catalogItemId: "svc-mantenimiento", tarifaId: "tar-mant-evento", cantidad: 1 },
    ],
    costoTotal: 0,
    precioCliente: 0,
    margenPorcentaje: 0,
    ganancia: 0,
    estado: "borrador",
    origen: "plantilla",
    validezDias: 15,
    creadoEn: "2026-07-01T00:00:00.000Z",
    actualizadoEn: "2026-07-01T00:00:00.000Z",
  },
];
```

#### Cotizaciones de ejemplo (para dashboard)

```ts
export const COTIZACIONES_DEMO: PaqueteEvento[] = [
  {
    id: "cot-001",
    numero: "BOGA-2026-0001",
    nombre: "Feria de Manizales 2026",
    esPlantilla: false,
    tipoEvento: "feria",
    cliente: {
      nombre: "Laura Méndez",
      empresa: "Eventos Andinos SAS",
      email: "laura@eventosandinos.co",
      telefono: "+57 300 555 0101",
      ciudad: "Manizales",
    },
    fechaEvento: "2026-01-10",
    asistentesEstimados: 8000,
    items: [/* clonar Festival Starter + ajustar */],
    costoTotal: 4200000,
    precioCliente: 7800000,
    margenPorcentaje: 46,
    ganancia: 3600000,
    estado: "enviada",
    origen: "admin",
    validezDias: 15,
    creadoEn: "2026-07-10T14:00:00.000Z",
    actualizadoEn: "2026-07-12T09:00:00.000Z",
  },
  {
    id: "cot-002",
    numero: "BOGA-2026-0002",
    nombre: "Boda Hacienda El Retiro",
    esPlantilla: false,
    tipoEvento: "boda",
    cliente: {
      nombre: "Camila Restrepo",
      empresa: "Wedding Collective",
      email: "camila@weddingco.co",
      telefono: "+57 310 444 0202",
      ciudad: "Medellín",
    },
    fechaEvento: "2026-08-22",
    asistentesEstimados: 180,
    items: [],
    costoTotal: 3100000,
    precioCliente: 6200000,
    margenPorcentaje: 50,
    ganancia: 3100000,
    estado: "borrador",
    origen: "formulario_publico",
    validezDias: 15,
    creadoEn: "2026-07-15T11:00:00.000Z",
    actualizadoEn: "2026-07-15T11:00:00.000Z",
  },
];
```

#### Solicitudes públicas demo

```ts
export const SOLICITUDES_DEMO: SolicitudPublica[] = [
  {
    id: "sol-001",
    fullName: "Andrés Quintero",
    company: "Core Festival",
    email: "ops@corefest.co",
    phone: "+57 320 111 0303",
    eventType: "festival",
    eventDate: "2026-09-05",
    city: "Bogotá",
    attendees: "12000",
    productSlugs: ["bano-estandar", "discapacitados", "lavamanos", "operarios"],
    notes: "Necesitamos cobertura 3 días + emergencia 24/7",
    estado: "nueva",
    recibidoEn: "2026-07-16T18:30:00.000Z",
  },
];
```

**Persistencia prototipo:** `localStorage` keys `boga-catalogo-v1`, `boga-paquetes`, `boga-solicitudes` + check `CATALOGO_VERSION` (patrón Kotizador). En producción futura → API/DB.

---

## 5. Adaptación UI / Brand Kit (anti copy-paste)

### 5.1 Prohibido (look Kotizador)

| Kotizador | Por qué no en BOGA |
|-----------|-------------------|
| Fondo `#0a0a0a` + acento `#c9a84c` (gold) | Brand BOGA es azul eléctrico + lima |
| Tipografía display “PLAN MAESTRO” / mono gold | Montserrat + tracking *INGENIERÍA PORTÁTIL* |
| SPA sin sidebar admin | BOGA usa AdminSidebar 260px |
| Cards con borde duro gold | Superficies BOGA: shadow tint `#1b1341`, sin borde duro |
| Labels “Combo / Servicios RR” | “Paquete de evento / Catálogo BOGA” |

### 5.2 Tokens obligatorios en admin cotizador

```css
[data-admin-theme="dark"] {
  --admin-primary: #2c4df2;       /* --boga-electric-500 */
  --admin-primary-hover: #2541ce; /* --boga-electric-600 */
  --admin-accent: #daf73a;        /* --boga-lima-500 */
  --admin-accent-hover: #b9d231;  /* --boga-lima-600 */
  --admin-bg: #0a0a0a;
  --admin-bg-elevated: #141414;
  --admin-bg-surface: #1a1a1a;
  --admin-border: rgba(27, 19, 65, 0.3);
  --admin-text: #e5e5e5;
  --admin-text-muted: #8a849d;    /* gris plata BOGA */
  --admin-success: #6bc935;
  --admin-error: #f05252;
}
```

### 5.3 Mapeo visual CreateCombo → Constructor BOGA

| Elemento CreateCombo | Implementación BOGA |
|----------------------|---------------------|
| Checkbox gold | Checkbox lima `#daf73a` / check `#1b1341` |
| Tag categoría gold | Badge `bg-electric-500/10 text-electric-400` |
| Card seleccionada border gold | `border-lima-500/50 bg-lima-500/5` + shadow-2 |
| Totales “Costo rojo / Precio” | Costo: muted; Precio: lima; Margen: badge success/warning |
| Botón Guardar gold | CTA lima `rounded-full`, texto deep |
| Search input dark | `surface-inset` / admin elevated + focus ring electric |
| Iconos lucide gold | Iconos lineales BOGA o lucide en lima/electric |
| Loading | 3 círculos BOGA (pulse stagger 200ms) |

### 5.4 Layout dentro del admin existente

```
AdminSidebar
  Dashboard
  Productos          ← CRUD + tarifas/costos (AdminModal logic)
  Paquetes           ← NUEVO: plantillas reutilizables (combos)
  Cotizaciones       ← listado + /nueva (constructor)
  Solicitudes        ← NUEVO: bandeja /cotizacion pública
  Clientes
  Eventos
  Configuración
```

Constructor `/admin/cotizaciones/nueva` — layout 2 columnas (desktop):

```
┌─ 60% Catálogo ─────────────────┬─ 40% Resumen ──────────────┐
│ [Buscar…] [chips categoría]    │ DATOS DEL EVENTO           │
│                                │ Cliente · Fecha · Ciudad   │
│ ▸ Baño VIP                     │                            │
│   ☐ Por día $320.000           │ Ítems seleccionados        │
│   ☐ Fin de semana $850.000     │ · VIP × 4 finde            │
│ ▸ Baño Estándar                │ · Estándar × 20 días       │
│   ☑ Por día $145.000  [qty 20] │                            │
│                                │ Costo op.   $X (toggle)    │
│                                │ Precio      $Y  (lima)     │
│                                │ Margen      48% (badge)    │
│                                │ [Plantilla▼] [PDF] [Guardar]│
└────────────────────────────────┴────────────────────────────┘
```

### 5.5 PDF cliente (brand BOGA)

**Incluir:** logo completo clara/oscura, tagline, datos evento, tabla ítems (nombre, cantidad, precio unit., subtotal), total en electric, validez 15 días, tel emergencia, email.

**Excluir:** costos operativos, margen %, notas internas.

Decoración sutil: 3 círculos lima en footer PDF (opcional).

---

## 6. Reglas de negocio BOGA (cotizador)

| ID | Regla |
|----|-------|
| B-01 | Slugs de producto **no cambian** (`bano-vip`, etc.) — SEO y bookmarks |
| B-02 | Margen < 25% → alerta warning; < 15% → bloquear envío PDF |
| B-03 | PDF nunca muestra costos internos |
| B-04 | Descuento > 10% exige `notasInternas` |
| B-05 | Cotización `aceptada` es inmutable → duplicar |
| B-06 | Número `BOGA-YYYY-NNNN` correlativo |
| B-07 | Formulario público crea `SolicitudPublica`, no cotización formal |
| B-08 | Plantillas (`esPlantilla: true`) no tienen cliente; al usar clonar a cotización |
| B-09 | Cantidad mínima 1; unidadCobro dicta label del input (días / unidades / turnos) |
| B-10 | Precios mock marcados hasta validación con cliente BOGA |
| B-11 | No publicar cotizaciones sin aprobación (prospecto en negociación) |

---

## 7. Arquitectura de archivos (integración en repo BOGA)

```
src/
├── types/cotizador-boga.ts
├── lib/
│   ├── mocks.ts                    ← actualizar nombreSitio BOGA; importar seeds
│   ├── mocks/cotizador-boga.ts     ← DEFAULT_CATALOGO, PLANTILLAS, demos
│   └── cotizador/
│       ├── calc.ts                 ← normalizarTarifa, calcularPaquete, formatCOP
│       ├── storage.ts              ← get/save + CATALOGO_VERSION
│       └── pdf.ts                  ← export PDF branding BOGA
├── components/admin/
│   ├── cotizacion-wizard.tsx       ← REFACTOR (no delete)
│   ├── paquete-builder.tsx         ← NUEVO (lógica CreateCombo adaptada)
│   ├── catalogo-tarifa-editor.tsx  ← NUEVO (lógica AdminModal planes/costos)
│   ├── paquete-card.tsx
│   ├── solicitud-row.tsx
│   └── ... (kpi-card, status-badge → tokens BOGA)
├── app/admin/
│   ├── productos/                  ← ampliar form con tarifas
│   ├── paquetes/                   ← NUEVO listado plantillas
│   │   └── page.tsx
│   ├── cotizaciones/
│   │   ├── page.tsx
│   │   ├── nueva/page.tsx          ← PaqueteBuilder
│   │   └── [id]/page.tsx
│   └── solicitudes/page.tsx        ← NUEVO bandeja
```

---

## 8. Plan de fases (ejecución)

### Fase 0 — Alineación (0.5 día)
- [ ] Confirmar con stakeholder: nombres “Paquete” vs “Combo” en UI
- [ ] Congelar slugs y lista de 8+4 ítems
- [ ] Revisar márgenes mock vs precios reales (si hay Excel BOGA)

### Fase 1 — Datos y cálculo (1–2 días)
- [ ] `types/cotizador-boga.ts`
- [ ] `mocks/cotizador-boga.ts` con seed completo
- [ ] `calc.ts` + tests unitarios de margen
- [ ] `storage.ts` con versionado
- [ ] Actualizar `mocks.ts` / `siteConfig` a BOGA (sin romper páginas públicas)

### Fase 2 — Catálogo admin con tarifas (2–3 días)
- [ ] Extender `producto-form.tsx` / editor: tarifas, incluye, costos
- [ ] Recálculo margen en vivo (`normalizarTarifa`)
- [ ] Listado productos muestra # tarifas + margen promedio
- [ ] UI 100% tokens admin BOGA

### Fase 3 — Constructor de paquetes (3–4 días) ★ núcleo
- [ ] `PaqueteBuilder` (patrón CreateCombo): catálogo + resumen
- [ ] Datos evento + cliente
- [ ] Cantidades por `unidadCobro`
- [ ] Toggle “mostrar costos operativos”
- [ ] Guardar / duplicar / editar
- [ ] Plantillas: “Usar plantilla Festival Starter”
- [ ] Integrar en `/admin/cotizaciones/nueva` (refactor wizard)

### Fase 4 — Listados, PDF, bandeja (2–3 días)
- [ ] Cards cotizaciones con badges estado (tokens)
- [ ] `/admin/paquetes` plantillas
- [ ] `/admin/solicitudes` + convertir → borrador
- [ ] PDF cliente branding BOGA
- [ ] KPIs dashboard: pipeline, margen promedio, solicitudes nuevas

### Fase 5 — Pulido brand + QA (1–2 días)
- [ ] Loading 3 círculos, motion tokens, focus rings
- [ ] Mobile del constructor
- [ ] Checklist: no hex gold/naranja Junisama en pantallas nuevas
- [ ] Checklist: wizard público `/cotizacion` sigue funcionando
- [ ] Documentar en `_HISTORIAL.md`

### Fase 6 — Plan de entrega evento (opcional)
- [ ] Adaptar ideas de `PLAN_CRONOGRAMA_AUTOMATICO.md` a hitos:
  - D-14 anticipo · D-2 instalación · D-0 operación · D+1 retiro · D+3 informe

---

## 9. Criterios de aceptación (definición de “hecho”)

1. Desde admin se puede armar un paquete con ≥3 tarifas distintas y ver costo/precio/margen correctos.
2. Una plantilla “Festival Starter” se clona en cotización con cliente en < 3 clics.
3. El editor de producto permite agregar tarifa con 2+ costos y recalcula margen.
4. El PDF descargado muestra logo BOGA, ítems y total — **sin** costos internos.
5. Una solicitud del wizard público aparece en `/admin/solicitudes` y se convierte en borrador.
6. Cero referencias visuales a gold `#c9a84c` o naranja `#e85d24` en las pantallas nuevas.
7. `/productos` público sigue leyendo los mismos slugs; no se rompe SEO.
8. Auth admin sigue protegiendo rutas; sin credenciales en DOM.

---

## 10. Matriz de riesgos

| Riesgo | Mitigación |
|--------|------------|
| Romper CotizacionWizard actual | Refactor incremental; feature flag `USE_PAQUETE_BUILDER` |
| Precios mock tomados como reales | Banner “MOCK — validar con BOGA” en admin + comentarios en seed |
| Copy-paste visual del Kotizador | Design review contra `design-system-boga.md` §8 |
| localStorage insuficiente multi-usuario | Aceptable en prototipo; documentar migración API |
| Confusión Producto vs Servicio | Categorías claras + chips filtro en builder |
| Prospecto sin contrato | No publicar admin en producción cliente sin OK |

---

## 11. Resumen ejecutivo para el equipo

**Qué queremos:** que el comercial de BOGA arme **paquetes de evento** (combos) eligiendo **tarifas** de baños/servicios, vea **margen**, guarde plantillas, y genere **PDF** con marca BOGA — dentro del **panel admin Next.js** que ya existe.

**Qué no queremos:** una segunda app Vite dark-gold, ni menús “Plan Maestro”, ni planes mensuales de agencia digital.

**Cómo:** portar la **lógica** de `CreateCombo` + `AdminModal` + `normalizarPlan` + versionado de catálogo; reescribir **mocks** al dominio sanitario; pintar todo con **azul `#2c4df2` + lima `#daf73a` + Montserrat + 3 círculos**.

---

## 12. Índice de documentos relacionados

| Doc | Rol |
|-----|-----|
| Este archivo | **Plan de integración exhaustivo** |
| `MODELO_DATOS_COTIZADOR_BOGA.md` | Detalle tipos (complementario) |
| `PATRONES_UI_ADMIN.md` | Wireframes UI |
| `REGLAS_NEGOCIO_COTIZACION.md` | Reglas comerciales |
| `REFERENCIA_RR_KOTIZADOR.md` | Mapa archivo→archivo |
| `PLAN_IMPLEMENTACION_FASES.md` | Checklist tareas cortas |
| `DOCUMENTO_MAESTRO_PANEL_ADMIN_BOGA.md` | Visión corta |

---

*Documento generado para RR ALIADOS — implementación prototipo BOGA. Basado en auditoría BOGA + RR Kotizador (repo ManePeqsiCoda/RR_KOTIZADOR).*
