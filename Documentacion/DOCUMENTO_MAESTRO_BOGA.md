# DOCUMENTO MAESTRO — PROYECTO BOGA

> **Versión:** 1.0  
> **Fecha:** Julio 2026  
> **Propósito:** Documento unificado que consolida el estado real del código, el sistema de diseño, el panel administración/cotizador y los planes de implementación del proyecto BOGA.

---

## ÍNDICE

1. [VISIÓN DEL PROYECTO](#1-visión-del-proyecto)
2. [STACK TECNOLÓGICO](#2-stack-tecnológico)
3. [SISTEMA DE DISEÑO BOGA](#3-sistema-de-diseño-boga)
4. [ESTRUCTURA DEL PROYECTO](#4-estructura-del-proyecto)
5. [SITIO PÚBLICO — PÁGINAS Y COMPONENTES](#5-sitio-público--páginas-y-componentes)
6. [PANEL ADMIN — PÁGINAS Y COMPONENTES](#6-panel-admin--páginas-y-componentes)
7. [MÓDULO COTIZADOR](#7-módulo-cotizador)
8. [API ROUTES](#8-api-routes)
9. [PERSISTENCIA Y ESTADO](#9-persistencia-y-estado)
10. [AUTENTICACIÓN](#10-autenticación)
11. [LO IMPLEMENTADO VS LO DOCUMENTADO](#11-lo-implementado-vs-lo-documentado)
12. [PLAN DE IMPLEMENTACIÓN — PRÓXIMOS PASOS](#12-plan-de-implementación--próximos-pasos)
13. [RUTA DE DOCUMENTOS RELACIONADOS](#13-ruta-de-documentos-relacionados)

---

## 1. VISIÓN DEL PROYECTO

**BOGA — Ingeniería Portátil** es una empresa colombiana de alquiler de baños portátiles, unidades sanitarias y servicios de operación para eventos (conciertos, festivales, bodas, eventos corporativos, obras). El proyecto web es un sitio corporativo completo con:

- **Sitio público** (24 rutas): catálogo de servicios, cotizador público, galería de eventos, blog de clientes, FAQ, contacto, páginas legales.
- **Panel de administración** (14 rutas): dashboard con KPIs, CRUD de cotizaciones, catálogo, clientes, solicitudes, eventos, configuración.
- **Sistema de cotización** completo: cálculo de tarifas, costos operativos, márgenes, descuentos por bundle, generación de PDF, envío por email y WhatsApp.

---

## 2. STACK TECNOLÓGICO

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| **Next.js** | 16.2.10 (App Router) | Framework principal |
| **React** | 19.2.4 | UI |
| **TypeScript** | ^5 | Tipado estricto |
| **Tailwind CSS** | v4 | Estilos utilitarios |
| **shadcn/ui** | 26 componentes | UI base (botones, cards, tabs, diálogos, etc.) |
| **Framer Motion** | 12.42.2 | Animaciones |
| **Prisma** | 6.19.3 | ORM (configurado, pendiente de DB real) |
| **NextAuth** | ^5.0.0-beta.31 | Autenticación (configurado, pendiente de DB) |
| **Zod** | ^4.4.3 | Validación de formularios |
| **jsPDF** | 4.2.1 | Generación de PDF |
| **Nodemailer** | 7.0.13 | Envío de emails |
| **React Hook Form** | 7.81.0 | Manejo de formularios |
| **TanStack Table** | 8.21.3 | Tablas de datos |
| **Lucide React** | 1.24.0 | Iconografía |
| **Sonner** | 2.0.7 | Toast notifications |
| **date-fns** | 4.4.0 | Manejo de fechas |
| **bcryptjs** | 3.0.3 | Encriptación (preparado) |

---

## 3. SISTEMA DE DISEÑO BOGA

### 3.1 Paleta de Colores

| Color | Token | HEX | Uso |
|-------|-------|-----|-----|
| **Azul Eléctrico** | `--color-boga-electric-500` | `#2c4df2` | Primario, dominante |
| **Azul Profundo** | `--color-boga-deep-500` | `#1b1341` | Base oscura |
| **Amarillo Lima** | `--color-boga-lima-500` | `#daf73a` | Acento |
| **Blanco** | `--color-white` | `#ffffff` | Neutro |
| **Gris Plata** | `--color-boga-neutral-500` | `#8a849d` | Neutro profesional |
| **Crema** | `--color-boga-cream` | `#e9eac1` | Neutro cálido |

Cada color tiene escala **50-950** (mezcla con blanco → negro). Definida en `globals.css` con `@theme inline`.

### 3.2 Superficies

| Token | Dark | Light |
|-------|------|-------|
| `--boga-surface-canvas` | `#0a0a14` | `#f8f8fa` |
| `--boga-surface-elevated` | `#12121e` | `#ffffff` |
| `--boga-surface-floating` | `#1a1a2e` | `#ffffff` |
| `--boga-surface-inset` | `#06060e` | `#f0eff4` |
| `--boga-surface-muted` | `#1e1e32` | `#f3f3f7` |
| `--boga-surface-dark` | `#0d0d1a` | `#1b1341` |
| `--boga-surface-hero` | `gradiente` | `gradiente` |

### 3.3 Texto

| Token | Light | Dark |
|-------|-------|------|
| `--boga-text-primary` | `#272331` | `#e8e6ed` |
| `--boga-text-secondary` | `#544e63` | `#b0acc0` |
| `--boga-text-tertiary` | `#8a849d` | `#76718d` |
| `--boga-text-inverted` | `#ffffff` | `#ffffff` |
| `--boga-text-on-lima` | `#1b1341` | `#1b1341` |

### 3.4 Tipografía

- **Familia principal:** Montserrat (display + body)
- **Fallback:** ui-sans-serif, system-ui, -apple-system, sans-serif
- **Google Fonts:** `Montserrat:wght@300;400;500;600;700;900`
- **Escala:** Ratio Major Third (1.25), base 16px
  - `display-3xl`: 5.5rem (88px) — Hero "BOGA"
  - `display-2xl` a `display-lg`: 72px → 48px
  - `heading-1` a `heading-5`: 36px → 18px
  - `body-lg`/`body-md`/`body-sm`: 18px / 16px / 14px
  - `caption`: 12px, `overline`: 11px

### 3.5 Elemento Signature: 3 Círculos BOGA

- 2 llenos + 1 vacío (contorno)
- Presentes en: loading, transiciones, bullets, favicon, hero decorativo, wizard de cotización, footer

### 3.6 Componentes CSS (clases utilitarias)

Definidos en `globals.css`:
- `.container-boga` — max-width 1280px, padding responsive
- `.btn-primary` — lima pill con hover/active
- `.btn-emergency` — rojo pulsante con keyframe pulse
- `.card-product` — sombra, hover:translateY(-4px)
- `.stat-number` — números grandes en lima
- `.marquee-container` — animación infinita 30s
- `.boga-circles` — decoración de 3 círculos

### 3.7 Tema Admin (Dark)

- Activado vía `[data-admin-theme="dark"]` en el layout admin
- Sidebar 260px fijo + contenido principal

---

## 4. ESTRUCTURA DEL PROYECTO

```
BOGAweb/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (metadata, fonts, providers)
│   │   ├── page.tsx                  # Home
│   │   ├── globals.css               # Design System (~1305 líneas)
│   │   ├── sitemap.ts                # Sitemap dinámico
│   │   ├── robots.ts                 # Robots.txt
│   │   ├── design-system/            # Página de referencia de diseño
│   │   ├── servicios/                # Catálogo público + detalle slug
│   │   ├── cotizacion/               # Cotizador público (QuoteWizard 3 pasos)
│   │   ├── cotizar/                  # Redirige a /cotizacion
│   │   ├── quienes-somos/            # Página "Nosotros"
│   │   ├── galeria/                  # Galería con grid + lightbox
│   │   ├── clientes/                 # Página de clientes
│   │   ├── contacto/                 # Formulario de contacto
│   │   ├── faq/                      # Preguntas frecuentes (acordeón)
│   │   ├── privacidad/               # Política de privacidad
│   │   ├── terminos/                 # Términos y condiciones
│   │   ├── cookies/                  # Política de cookies
│   │   ├── api/cotizacion/enviar/    # API route: email + WhatsApp
│   │   └── admin/                    # Panel de administración (14 rutas)
│   ├── components/
│   │   ├── admin/                    # 12 componentes del panel admin
│   │   ├── brand/                    # 4 componentes de marca BOGA
│   │   ├── home/                     # 8 secciones del home
│   │   ├── layout/                   # 7 componentes de layout
│   │   ├── pricing/                  # 2 componentes de precios
│   │   ├── ui/                       # 26 componentes shadcn/ui
│   │   └── *.tsx                     # Componentes sueltos (logo, product-card, etc.)
│   ├── data/
│   │   └── events.ts                 # 35+ eventos de galería
│   ├── lib/
│   │   ├── cotizador/                # Módulo de cotización (4 archivos)
│   │   ├── email/                    # Módulo de email (2 archivos)
│   │   ├── mocks/                    # Datos mock del cotizador
│   │   ├── auth.ts                   # verifyAdminCredentials
│   │   ├── auth-mock.tsx             # AuthMockProvider + useAuthMock
│   │   ├── mocks.ts                  # Datos mock principales
│   │   ├── seo.ts                    # SEO + JSON-LD generators
│   │   ├── site.ts                   # Configuración del sitio (BOGA)
│   │   ├── slugify.ts                # slugify utility
│   │   └── utils.ts                  # cn() utility
│   └── types/
│       └── cotizador-boga.ts         # Tipos del módulo cotizador
├── public/                           # Archivos estáticos
├── prisma/                           # Schema Prisma (pendiente de DB)
├── Documentacion/                    # Documentación del proyecto
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 5. SITIO PÚBLICO — PÁGINAS Y COMPONENTES

### 5.1 Páginas Implementadas (24 rutas)

| Ruta | Archivo | Estado |
|------|---------|--------|
| `/` | `page.tsx` | ✅ Home completo |
| `/servicios` | `servicios/page.tsx` | ✅ Catálogo con filtros |
| `/servicios/[slug]` | `servicios/[slug]/page.tsx` | ✅ Detalle de servicio |
| `/cotizacion` | `cotizacion/page.tsx` | ✅ Wizard 3 pasos |
| `/cotizar` | `cotizar/page.tsx` | ✅ Redirect |
| `/quienes-somos` | `quienes-somos/page.tsx` | ✅ Story |
| `/galeria` | `galeria/page.tsx` | ✅ Grid + lightbox |
| `/clientes` | `clientes/page.tsx` | ✅ Clientes |
| `/contacto` | `contacto/page.tsx` | ✅ Formulario |
| `/faq` | `faq/page.tsx` | ✅ Acordeón |
| `/design-system` | `design-system/page.tsx` | ✅ Referencia viva |
| `/privacidad` | `privacidad/page.tsx` | ✅ Política |
| `/terminos` | `terminos/page.tsx` | ✅ TyC |
| `/cookies` | `cookies/page.tsx` | ✅ Cookies |

### 5.2 Componentes del Home (8)

- **Hero** — Gradiente electric/deep, wordmark BOGA display-3xl, CTAs duales, stats
- **BogaValues** — Valores de marca con iconos
- **FeaturedProducts** — Grid de 4 productos destacados
- **WhyUs** — Sección "Por qué nosotros"
- **Testimonials** — Testimonios de clientes
- **Clients** — Logos de clientes
- **Contact** — Sección de contacto con CTA
- **FadeIn** — Wrapper de animación framer-motion

### 5.3 Componentes de Layout (7)

- **Navbar** — Fondo blanco con blur al scrollear, CTA lima pill, emergencia rojo pulsante, menú mobile
- **Footer** — Fondo deep-500, grid 4 columnas, datos de contacto, redes sociales
- **WhatsAppButton** — Botón flotante de WhatsApp
- **EmergencyButton** — Botón flotante de emergencia (rojo pulsante)
- **ThemeToggle** — Toggle dark/light mode
- **AdminLink** — Acceso rápido al admin
- **Logo** — Componente Logo BOGA

### 5.4 Componentes de Marca (4)

- **BogaCircles** — 3 círculos decorativos (firma visual)
- **BogaDecor** — Decoraciones de marca
- **PageHero** — Hero genérico para páginas internas
- **SedesCoverage** — Mapa/cobertura de sedes

---

## 6. PANEL ADMIN — PÁGINAS Y COMPONENTES

### 6.1 Páginas Implementadas (14 rutas)

| Ruta | Archivo | Descripción | Estado |
|------|---------|-------------|--------|
| `/admin` | `page.tsx` | Dashboard: KPIs, chart estados, cotizaciones recientes | ✅ |
| `/admin/login` | `page.tsx` | Login con auth mock + autocompletar demo | ✅ |
| `/admin/cotizaciones` | `page.tsx` | Listado con filtros, pipeline, búsqueda | ✅ |
| `/admin/cotizaciones/nueva` | `page.tsx` | Constructor de cotización (PaqueteBuilder) | ✅ |
| `/admin/cotizaciones/[id]` | `page.tsx` | Detalle: tabla items, PDF, cambio estado | ✅ |
| `/admin/productos` | `page.tsx` | CRUD catálogo + editor tarifas | ✅ |
| `/admin/paquetes` | `page.tsx` | Plantillas reutilizables | ✅ |
| `/admin/clientes` | `page.tsx` | CRUD con búsqueda + paginación | ✅ |
| `/admin/clientes/[id]` | `page.tsx` | Detalle cliente con historial | ✅ |
| `/admin/solicitudes` | `page.tsx` | Bandeja solicitudes públicas | ✅ |
| `/admin/eventos` | `page.tsx` | Portafolio (tabla + grid) | ✅ |
| `/admin/configuracion` | `page.tsx` | Config general del sitio | ✅ |
| `/admin/config` | `page.tsx` | Redirect → configuracion | ✅ |
| `/admin/layout` | `layout.tsx` | Layout: sidebar + header + auth guard + tema dark | ✅ |

### 6.2 Componentes Admin (12)

| Componente | Archivo | Descripción |
|-----------|---------|-------------|
| **PaqueteBuilder** | `paquete-builder.tsx` (~800 lns) | Núcleo: selector tarifas, cantidades, margen, descuento, PDF |
| **CatalogoTarifaEditor** | `catalogo-tarifa-editor.tsx` (~500 lns) | CRUD tarifas por producto |
| **CotizadorKpis** | `cotizador-kpis.tsx` | KPIs del dashboard |
| **KpiCard** | `kpi-card.tsx` | Tarjeta KPI reutilizable |
| **CotizacionesStatusChart** | `cotizaciones-status-chart.tsx` | Barras por estado |
| **RecentCotizaciones** | `recent-cotizaciones.tsx` | Tabla cotizaciones recientes |
| **StatusBadge** | `status-badge.tsx` | Badge de estado |
| **ClienteForm** | `cliente-form.tsx` | Drawer crear/editar clientes |
| **EventoPortafolioForm** | `evento-portafolio-form.tsx` | Drawer crear/editar eventos |
| **CotizacionWizard** | `cotizacion-wizard.tsx` | Re-exporta PaqueteBuilder |
| **ProductoForm** | `producto-form.tsx` | Legacy (productos públicos) |
| **EventoForm** | `evento-form.tsx` | Legacy (eventos públicos) |

### 6.3 Layout Admin (2)

| Componente | Archivo | Descripción |
|-----------|---------|-------------|
| **AdminSidebar** | `admin-sidebar.tsx` | Sidebar fijo 260px con navegación |
| **AdminHeader** | `admin-header.tsx` | Header responsive con menú mobile (Sheet) |

---

## 7. MÓDULO COTIZADOR

### 7.1 Tipos TypeScript (`src/types/cotizador-boga.ts`)

```typescript
// Entidades principales
CatalogItem     → Producto/servicio del catálogo
Tarifa          → Precio + costos de un producto
CostoOperativo  → Desglose de costo individual
ItemEnPaquete   → Item seleccionado en cotización
PaqueteEvento   → Cotización armada
SolicitudPublica → Solicitud del formulario público
ClienteEvento   → Datos del cliente

// Enums
CategoriaCatalogo   → "banos-portatiles" | "lavamanos" | etc.
UnidadCobro         → "dia" | "evento" | "unidad" | "turno_8h" | "turno_12h"
EstadoCotizacionPaquete → "borrador" | "enviada" | "en_revision" | "aceptada" | "rechazada" | "vencida"
TipoEventoCotizador → "festival" | "concierto" | "feria" | "corporativo" | "boda" | "privado" | "obra"
```

### 7.2 Lógica de Negocio (`src/lib/cotizador/`)

| Archivo | Funciones | Propósito |
|---------|-----------|-----------|
| `calc.ts` | `calcularPaquete()`, `normalizarTarifa()`, `formatCOP()`, `precioDesdeMargen()`, `subtotalLinea()`, `nextNumeroCotizacion()`, `margenStatus()` | Cálculos de costos, precios, márgenes, formato moneda |
| `storage.ts` | `getCatalogo()`, `saveCatalogo()`, `getPaquetes()`, `getCotizaciones()`, `getPlantillas()`, `upsertPaquete()`, `getSolicitudes()`, `addSolicitud()` | Persistencia localStorage con versionado |
| `public-pricing.ts` | `calcularCarritoPublico()`, `isBundleTrigger()` | Bundle discount (30% off con productos ancla) |
| `pdf.ts` | `exportPaquetePdf()` | PDF con jsPDF + jspdf-autotable |

### 7.3 Mock Data (`src/lib/mocks/cotizador-boga.ts`)

Catálogo con **10 productos** con tarifas y costos realistas:

| # | Producto | Categoría | Tarifas | Rango Margen |
|---|----------|-----------|---------|-------------|
| 1 | Baño Portátil VIP | Baños portátiles | Por día, Fin de semana | 48-51% |
| 2 | Baño Estándar | Baños portátiles | Por día | 35% |
| 3 | Baño Discapacitados | Baños portátiles | Por día | 40% |
| 4 | Baño Eléctrico | Baños portátiles | Por día | 38% |
| 5 | Lavamanos Portátil | Lavamanos | Por evento | 42% |
| 6 | Tráiler de Lujo | Tráilers | Fin de semana | 55% |
| 7 | Puntos Ecológicos | Puntos ecológicos | Por día | 37% |
| 8 | Operarios Certificados | Servicios operación | Turno 8h, Turno 12h | 30-33% |
| 9 | Mantenimiento 24/7 | Servicios operación | Por día | 41% |
| 10 | Insumos Biodegradables | Insumos | Por unidad | 25% |

**3 Plantillas de paquete:** Festival Starter, VIP Wedding, Corporativo 500  
**2 Cotizaciones demo** + **1 Solicitud demo**

### 7.4 Reglas de Negocio (implementadas en código)

| ID | Regla | Estado |
|----|-------|--------|
| RN-01 | Número correlativo `BOGA-YYYY-NNNN` | ✅ `nextNumeroCotizacion()` |
| RN-02 | Validez default 15 días | ✅ Constante `VALIDEZ_DEFAULT = 15` |
| RN-03 | Margen ≥ 25% → OK | ✅ `MARGEN_WARNING = 25` |
| RN-04 | Margen < 25% → warning | ✅ `margenStatus()` devuelve "warning" |
| RN-05 | Margen < 15% → bloqueo | ✅ `MARGEN_BLOQUEO = 15` |
| RN-06 | Margen negativo → alerta roja | ✅ `margenStatus()` devuelve "error" |
| RN-07 | PDF sin costos internos | ✅ Tabla muestra solo precios |
| RN-08 | Bundle discount 30% (VIP + Discapacitados + Tráiler) | ✅ `isBundleTrigger()` |
| RN-09 | Catálogo con versionado | ✅ `CATALOGO_VERSION = "boga-1"` |

### 7.5 Cotizador Público (`/cotizacion`)

- **QuoteWizard**: 3 pasos (Productos → Detalles evento → Contacto)
- Bundle pricing automático
- Envío vía API route + almacenamiento en localStorage
- Pantalla de éxito con referencia y botón WhatsApp

---

## 8. API ROUTES

| Ruta | Método | Función |
|------|--------|---------|
| `/api/cotizacion/enviar` | POST | Recibe cotización pública, envía email SMTP (condicional), guarda en solicitudes, devuelve URL WhatsApp |

---

## 9. PERSISTENCIA Y ESTADO

| Dato | Medio | Clave |
|------|-------|-------|
| Catálogo de productos | `localStorage` | `boga-catalogo-v1` |
| Paquetes/Cotizaciones | `localStorage` | `boga-paquetes` |
| Solicitudes públicas | `localStorage` | `boga-solicitudes` |
| Sesión admin | `sessionStorage` | `boga-admin-auth` |
| Prefill solicitud→cotización | `sessionStorage` | `boga-solicitud-prefill-*` |
| Configuración dark mode | `localStorage` (next-themes) | Tema persistente |

**No hay base de datos real.** Prisma está configurado pero no hay migraciones aplicadas. Todo el estado es mock/localStorage.

---

## 10. AUTENTICACIÓN

### 10.1 Admin (Mock)

- **Credenciales:** `admin@boga.com.co` / `Boga2025!`
- **Mecanismo:** `AuthMockProvider` + `useAuthMock()` con `sessionStorage`
- **Guard:** AdminLayout verifica `status === "unauthenticated"` y redirige a `/admin/login`
- **next-auth** está en `package.json` pero no integrado (preparado para futuro)

### 10.2 Público

- Sin autenticación. Todo el contenido es público.

---

## 11. LO IMPLEMENTADO VS LO DOCUMENTADO

### 11.1 Lo que el código tiene pero la documentación no refleja

| Aspecto | En documentación | En código real |
|---------|-----------------|----------------|
| Panel admin completo | Solo plan/fases | ✅ **12 rutas + dashboard + CRUDs** |
| Constructor cotizaciones | Mencionado como "futuro" | ✅ **PaqueteBuilder de ~800 líneas funcional** |
| Editor tarifas | Solo diseño conceptual | ✅ **CatalogoTarifaEditor de ~500 líneas** |
| Dashboard admin | No mencionado | ✅ **KPIs, charts, cotizaciones recientes** |
| CRUD clientes | No mencionado | ✅ **Clientes con búsqueda + paginación + detalle** |
| CRUD eventos | No mencionado | ✅ **Portafolio con tabla+grid** |
| Bandeja solicitudes | No mencionado | ✅ **Solicitudes + convertir a cotización** |
| Configuración admin | No mencionado | ✅ **Formulario de configuración del sitio** |
| PDF | En plan (Fase D) | ✅ **Exportación PDF funcional con jsPDF** |
| Email SMTP | No mencionado | ✅ **Nodemailer configurado condicionalmente** |
| Bundle pricing | No mencionado | ✅ **30% descuento con productos ancla** |
| Persistencia localStorage | No mencionado | ✅ **Seed automático con versionado** |
| 10 productos catálogo | 8 en documentación | ✅ **10 con tarifas y costos detallados** |
| Auth mock | No mencionado | ✅ **Login con sessionStorage + guard** |
| Componentes shadcn/ui | Mencionados como "futuro" | ✅ **26 componentes instalados y funcionales** |
| Tema admin dark | Solo diseño conceptual | ✅ **Implementado con `data-admin-theme`** |
| Galería con 35+ eventos | No mencionado | ✅ **Base de datos de eventos real** |
| SEO JSON-LD | No mencionado | ✅ **Organization + LocalBusiness + WebSite + Breadcrumb** |
| Framer Motion animaciones | No mencionado | ✅ **FadeIn + transiciones** |
| 24 rutas públicas | No contabilizado | ✅ **Todas implementadas** |

### 11.2 Lo que la documentación menciona pero el código no tiene

| Aspecto | Documentado en | Estado |
|---------|---------------|--------|
| Base de datos real (Prisma) | PLAN_INTEGRACION + MODELO_DATOS | ⏳ Schema existe, pero sin migraciones aplicadas |
| Autenticación real (NextAuth) | PLAN_IMPLEMENTACION_FASES | ⏳ En package.json, no integrado |
| Roles y permisos | REGLAS_NEGOCIO | ❌ No implementado |
| Webhooks / pasarela de pago | PLAN_IMPLEMENTACION_FASES | ❌ No implementado |
| Reportes avanzados / analytics | DOCUMENTO_MAESTRO_PANEL_ADMIN | ❌ No implementado |
| Plan de entrega (cronograma D-14, D-10...) | PLAN_IMPLEMENTACION_FASES (Fase F) | ❌ No implementado |
| Integración RR Kotizador | REFERENCIA_RR_KOTIZADOR | ❌ No integrado (solución externa documentada) |
| Imágenes reales de productos | plan-implementacion-boga.md (Fase 7) | ❌ Pendiente (uso de placeholders) |
| Logo oficial del cliente | Varios documentos | ❌ Pendiente de recibir |

---

## 12. PLAN DE IMPLEMENTACIÓN — PRÓXIMOS PASOS

### Prioridad Alta (Mejoras sobre lo existente)

- [ ] **Migrar mocks a base de datos real** — Aplicar migraciones Prisma, conectar NextAuth
- [ ] **Autenticación real** — Integrar next-auth con PrismaAdapter y bcryptjs
- [ ] **Cargar imágenes reales de productos** — Fotos de baños VIP, estándar, etc.
- [ ] **Hero foto/video real** — Reemplazar gradiente actual con contenido multimedia
- [ ] **Galería con fotos reales** — Fotos de eventos atendidos
- [ ] **Logo oficial BOGA** — Reemplazar placeholder actual
- [ ] **OG image profesional** — Para redes sociales
- [ ] **Renombrar referencias a "Junisama"** — Donde aún existan en el código

### Prioridad Media (Funcionalidades nuevas)

- [ ] **Roles y permisos** — Admin, vendedor, operador
- [ ] **Notificaciones** — Alertas de nuevas solicitudes
- [ ] **Reportes** — Excel/CSV export, analytics por período
- [ ] **Plan de entrega** — Cronograma D-14, D-10, D-2, D-0, D+N, D+1, D+3
- [ ] **Notas internas obligatorias** — Para descuentos > 10%
- [ ] **Historial de cambios** — Versiones de tarifas

### Prioridad Baja (Mejoras de experiencia)

- [ ] **Modo oscuro admin** — Completar cobertura en todas las pantallas
- [ ] **Paginación server-side** — Cuando haya DB
- [ ] **Búsqueda con debounce** — En listados grandes
- [ ] **Loading states con 3 círculos BOGA** — Consistencia visual
- [ ] **Tests** — Unitarios e integración

---

## 13. RUTA DE DOCUMENTOS RELACIONADOS

### Documentos en `/Documentacion/`

| Archivo | Contenido |
|---------|-----------|
| `design-system-boga.md` | Design system oficial (~1670 líneas) |
| `plan-implementacion-boga.md` | Plan de implementación del rebrand (~4500 líneas) |
| `brand-kit-boga-auditoria.md` | Brand kit y auditoría de marca |
| `mapa-de-cambios.md` | Mapa de cambios del rebrand |
| `auditoria-estado-actual.md` | Auditoría del estado actual del sitio |
| `PLAN_INTEGRACION_COTIZADOR_BOGA.md` | Plan de integración del cotizador (~1065 líneas) |
| `_MIGRADO_A_BOGA.md` | Nota de migración de archivos |

### Documentos en `/Documentacion/Panel_Admin_Cotizador/`

| Archivo | Contenido |
|---------|-----------|
| `DOCUMENTO_MAESTRO_PANEL_ADMIN_BOGA.md` | Maestro del panel admin (190 líneas, alcance limitado al cotizador) |
| `_INDICE.md` | Índice de la carpeta |
| `MODELO_DATOS_COTIZADOR_BOGA.md` | Modelo de datos (entidades y relaciones) |
| `REGLAS_NEGOCIO_COTIZACION.md` | Reglas de negocio completas |
| `PATRONES_UI_ADMIN.md` | Patrones de UI para el admin |
| `PLAN_IMPLEMENTACION_FASES.md` | Plan de fases detallado |
| `REFERENCIA_RR_KOTIZADOR.md` | Referencia de RR Kotizador (solución externa) |

### Documentos en `/Documentacion/junisama-auditoria-rediseno/`

| Archivo | Contenido |
|---------|-----------|
| `README.md` | Índice de la carpeta de auditoría |
| `PROMPT-MAESTRO-KIMI-CODE.md` | Prompt maestro para Kimi Code |
| `auditoria-estado-actual.md` | Auditoría técnica pre-rebrand |
| `mapa-de-cambios.md` | Mapa de cambios |
| `01-auditoria-tecnica/auditoria-tecnica.md` | Auditoría técnica detallada |
| `02-auditoria-contenido/` | Auditoría de contenido y riesgo de marca |
| `03-direccion-diseno/direccion-diseno-uiux.md` | Dirección de diseño UI/UX |
| `04-plan-tecnico/plan-tecnico-implementacion.md` | Plan técnico de implementación |
| `05-qa-final/qa-final-checklist.md` | Checklist de QA final |
| `99-recursos/plan-general.md` | Plan general del proyecto |
| `00-brand-kit-boga/brand-kit-boga-auditoria.md` | Brand Kit BOGA |

---

> **Nota:** Este documento fue generado mediante exploración exhaustiva del código real del proyecto (`src/`), contrastado con la documentación existente en `Documentacion/`. Refleja el estado real al momento de su creación.
