# DOCUMENTO MAESTRO — Panel Admin Cotizador BOGA

> **Versión:** 1.0  
> **Fecha:** 17/07/2026  
> **Proyecto:** BOGA (rebrand Junisama → Ingeniería Portátil)  
> **Referencia:** RR Kotizador (RR Plan Maestro)

---

## 1. Resumen ejecutivo

BOGA necesita en su **panel admin** (`/admin/*`) un módulo equivalente al **RR Kotizador**: gestionar catálogo de productos/servicios, definir tarifas con costos y márgenes, armar **paquetes de cotización** y generar **PDFs profesionales** para clientes de eventos.

Hoy BOGA ya tiene:
- Login admin (`/admin/login`)
- Formulario público de cotización (`/cotizacion`) con wizard Zod
- Tema admin BOGA (`[data-admin-theme="dark"]` — azul `#2c4df2` + lima `#daf73a`)

Lo que falta (patrón Kotizador):
- **CRUD de catálogo** desde admin (productos, servicios, tarifas)
- **Constructor de cotización** interno (seleccionar ítems → calcular total)
- **Persistencia** del catálogo (API/DB o JSON; Kotizador usa `localStorage`)
- **Export PDF** de propuesta
- **Bandeja de cotizaciones** recibidas desde el formulario público

---

## 2. Problema que resuelve

| Problema BOGA | Solución (patrón Kotizador) |
|---------------|----------------------------|
| Precios en Excel/WhatsApp, inconsistentes | Catálogo central con tarifas oficiales |
| Cotizar eventos manualmente | Constructor: productos + servicios + cantidades |
| Comercial no ve margen real | Desglose de costos + margen % por tarifa |
| Propuestas poco profesionales | PDF export (jspdf + html2canvas) |
| Formulario web desconectado del admin | Bandeja: cotizaciones públicas → admin |

---

## 3. Equivalencias Kotizador → BOGA

| RR Kotizador | BOGA Admin Cotizador |
|--------------|----------------------|
| `Servicio` | **Producto** (baño VIP, estándar…) o **Servicio** (operarios, mantenimiento) |
| `PlanServicio` | **Tarifa** (por día, por evento, por unidad/mes) |
| `Combo` | **Paquete cotización** (ítems seleccionados para un evento) |
| `AdminModal` | **Admin catálogo** (`/admin/catalogo`) |
| `CreateCombo` | **Nueva cotización** (`/admin/cotizaciones/nueva`) |
| `Combos.tsx` | **Listado cotizaciones** (`/admin/cotizaciones`) |
| Formulario `/cotizacion` | Entrada pública → **Bandeja** admin |
| `CronogramaEngine` | **Fase 2:** plan de entrega del evento (instalación → operación → retiro) |

---

## 4. Catálogo inicial BOGA (seed)

### Productos (8)

| Producto | Slug | Categoría |
|----------|------|-----------|
| Baño Portátil VIP | `bano-vip` | Productos |
| Baño Portátil Estándar | `bano-estandar` | Productos |
| Baños para Discapacitados | `discapacitados` | Productos |
| Baños Portátiles Eléctricos | `electricos` | Productos |
| Lavamanos Aquastand / Aquapop | `lavamanos` | Productos |
| Tráiler de Lujo | `trailer-lujo` | Productos |
| Puntos Ecológicos | `puntos-ecologicos` | Productos |
| Servicio de Operarios | `operarios` | Productos |

### Servicios (4)

| Servicio | Slug |
|----------|------|
| Alquiler de Unidades | `alquiler` |
| Mantenimiento Especializado 24/7 | `mantenimiento` |
| Operarios Certificados | `operarios-servicio` |
| Insumos Biodegradables | `insumos-eco` |

> Tarifas concretas: definir con BOGA / Finanzas. Kotizador usa `DEFAULT_SERVICES` en `utils.ts` como patrón de seed.

---

## 5. Arquitectura propuesta

```
/admin
├── login                    ← ya existe
├── dashboard                ← ya existe (ampliar widgets)
├── catalogo                 ← NUEVO (CRUD productos/servicios/tarifas)
│   └── [id]/editar
├── cotizaciones             ← NUEVO (listado + estados)
│   ├── nueva                ← constructor tipo CreateCombo
│   └── [id]                 ← detalle + PDF + notas
└── solicitudes              ← NUEVO (desde formulario público /cotizacion)

src/
├── types/cotizador.ts       ← tipos BOGA (ver MODELO_DATOS)
├── lib/catalogo.ts          ← get/save catálogo, normalizarTarifa()
├── lib/cotizaciones.ts      ← CRUD cotizaciones
├── components/admin/catalogo/
├── components/admin/cotizaciones/
└── app/api/                 ← preferible vs localStorage en producción
    ├── catalogo/route.ts
    └── cotizaciones/route.ts
```

### Persistencia recomendada

| Entorno | Estrategia |
|---------|------------|
| MVP / prototipo | JSON en servidor o Supabase/Firebase (BOGA ya puede usar backend) |
| Referencia Kotizador | `localStorage` — **no usar en producción BOGA** (multi-usuario) |
| Producción | API + DB (PostgreSQL/Supabase) con auth admin existente |

---

## 6. Funcionalidades por fase

### Fase 1 — Catálogo admin (MVP)
- [ ] CRUD productos y servicios
- [ ] Tarifas con: items incluidos, costos desglosados, precio venta, margen
- [ ] Búsqueda y filtro por categoría
- [ ] Seed con 8 productos + 4 servicios

### Fase 2 — Constructor de cotización
- [ ] Seleccionar productos/servicios + cantidades (días, unidades)
- [ ] Cálculo automático costo total / precio / margen
- [ ] Guardar cotización con datos del cliente
- [ ] Export PDF con branding BOGA

### Fase 3 — Integración formulario público
- [ ] POST `/cotizacion` → bandeja admin
- [ ] Estados: nueva → en revisión → enviada → aceptada / rechazada
- [ ] Convertir solicitud pública en cotización formal

### Fase 4 — Plan de entrega (opcional)
- [ ] Adaptar `cronograma-engine.ts`: hitos evento (instalación D-2, operación, retiro D+1)
- [ ] Ver `../../RR_Kotizador/PLAN_CRONOGRAMA_AUTOMATICO.md` como referencia de motor

---

## 7. UI / Design system

- Tema admin BOGA: `[data-admin-theme="dark"]` en `globals.css`
- Tokens: `--admin-primary: #2c4df2`, `--admin-accent: #daf73a`
- Componentes: reutilizar shadcn/ui del proyecto Junisama/BOGA
- Patrones visuales Kotizador: tabs Servicios/Editor, cards con desglose costos, badges margen

Ver **`PATRONES_UI_ADMIN.md`** y **`../design-system-boga.md`**.

---

## 8. Seguridad

1. **No** credenciales en DOM (ya documentado en plan técnico Junisama §11)
2. Validar admin en **API routes** (server-side), no solo `sessionStorage`
3. Cotizaciones con datos personales: cumplir política privacidad BOGA
4. PDFs: no incluir costos internos — solo precio cliente

---

## 9. Archivos Kotizador más relevantes (leer en este orden)

| Prioridad | Archivo Kotizador |
|-----------|-------------------|
| ⭐⭐⭐ | `src/components/AdminModal.tsx` |
| ⭐⭐⭐ | `src/lib/utils.ts` (`DEFAULT_SERVICES`, `normalizarPlan`, persistencia) |
| ⭐⭐⭐ | `src/types/index.ts` |
| ⭐⭐ | `src/pages/CreateCombo.tsx` |
| ⭐⭐ | `src/pages/Combos.tsx` |
| ⭐ | `src/lib/cronograma-engine.ts` (fase 4) |

---

## 10. Comandos de referencia

```bash
# Kotizador (referencia)
cd "../../RR_Kotizador"
npm install && npm run dev

# BOGA (cuando exista repo clonado)
cd "../"  # raíz proyecto BOGA
npm install && npm run dev
```

---

*Documento para RR ALIADOS — implementación BOGA. Basado en RR Kotizador v57.*
