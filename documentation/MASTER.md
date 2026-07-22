# BOGAweb — Documento Maestro del Proyecto

> **Versión:** 0.1.0
> **Fecha:** 22 de julio de 2026
> **Stack:** Next.js 16.2.10 / React 19.2.4 / TypeScript 5 / Tailwind CSS 4 / vitest 4.1.10
> **Estado:** Prototipo funcional con datos mock. Toda la persistencia es en localStorage (sin BD real).

---

## Índice

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Stack Tecnológico](#2-stack-tecnológico)
3. [Estructura del Proyecto](#3-estructura-del-proyecto)
4. [Sistema de Rutas (App Router)](#4-sistema-de-rutas-app-router)
5. [Sección Pública (Clientes)](#5-sección-pública-clientes)
6. [Panel de Administración](#6-panel-de-administración)
7. [Sistema de Cotizador (Cotizador BOGA)](#7-sistema-de-cotizador-cotizador-boga)
8. [Sistema deTransporte](#8-sistema-de-transporte)
9. [Sistema de Precios Públicos](#9-sistema-de-precios-públicos)
10. [Sistema de Componentes](#10-sistema-de-componentes)
11. [Mock Data & Almacenamiento](#11-mock-data--almacenamiento)
12. [Autenticación](#12-autenticación)
13. [Diseño Visual / Brand Kit](#13-diseño-visual--brand-kit)
14. [Pruebas](#14-pruebas)
15. [Configuración y Scripts](#15-configuración-y-scripts)
16. [Observaciones y Deuda Técnica](#16-observaciones-y-deuda-técnica)

---

## 1. Resumen Ejecutivo

BOGAweb es una aplicación web full-stack para **BOGA Baños Portátiles**, una empresa colombiana de alquiler de soluciones sanitarias móviles para eventos. La plataforma tiene dos caras:

- **Cara pública (10 rutas):** Sitio web corporativo con landing page, catálogo de servicios, detalle de producto, ¿Quiénes somos?, galería de eventos, FAQ, cotizador público, contacto, y páginas legales.
- **Panel de administración (13 rutas):** Dashboard con KPIs, gestión de clientes, gestión de cotizaciones (creación/edición/envío/PDF), editor de cotizaciones con desglose de costos, margen y transporte, gestión de eventos/portafolio, gestión de paquetes promocionales, administración del catálogo de productos con tarifas y costos operativos, bandeja de solicitudes públicas, y configuración del sitio.

### Estado actual

- **Prototipo funcional**. Todos los datos son mock (no hay base de datos real).
- La persistencia se maneja enteramente en localStorage del navegador.
- Hay dependencias instaladas para Prisma, NextAuth y Nodemailer, pero **ninguna está operativa** — no hay esquemas de BD, ni adaptadores de autenticación real, ni envío de correos funcional.
- Existe un archivo prisma/schema.prisma con un esquema de base de datos definido, pero no hay migraciones aplicadas ni conexión a BD.

---

## 2. Stack Tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Next.js | 16.2.10 (Turbopack) |
| UI Library | React | 19.2.4 |
| Lenguaje | TypeScript | ^5 |
| Estilos | Tailwind CSS | v4 |
| Animaciones | Framer Motion | 12.42.2 |
| Formularios | react-hook-form + @hookform/resolvers + Zod | ^7.81 / ^5.4 / ^4.4 |
| Tablas | @tanstack/react-table | ^8.21 |
| UI Base (Select, etc.) | @base-ui/react (Base UI) | ^1.6 |
| Iconos | lucide-react | ^1.24 |
| Fechas | date-fns | ^4.4 |
| PDF | jspdf + jspdf-autotable | ^4.2 / ^5.0 |
| Notificaciones | sonner | ^2.0 |
| Tema | next-themes | ^0.4 |
| Testing | vitest | ^4.1.10 |
| Linting | ESLint ^9 + eslint-config-next | 16.2.10 |

### Dependencias instaladas pero NO operativas

| Dependencia | Propósito | Estado |
|---|---|---|
| Prisma / @prisma/client | ORM / BD | Instalado, hay schema pero sin migraciones ni conexión |
| @auth/prisma-adapter | Auth adapter para Prisma | Instalado, no se usa |
| next-auth | Autenticación real | Instalado, se usa un mock (useAuthMock) en lugar del real |
| bcryptjs | Hash de contraseñas | Instalado, no se usa |
| nodemailer / @types/nodemailer | Envío de correos | Instalado, no se usa |
| ts-node | Ejecución de TypeScript | Instalado, para seed de Prisma |
| shadcn | Componentes CLI | Instalado como dependencia, componentes ya extraídos |

---

## 3. Estructura del Proyecto

### Directorio raíz

`
BOGAweb/
+-- prisma/                    # Schema + seed de BD (no operativo)
+-- public/                    # Archivos estáticos (imágenes, PDFs)
+-- src/
|   +-- app/                   # App Router (rutas + layouts)
|   +-- components/            # Componentes React
|   |   +-- admin/             # Componentes del panel admin
|   |   +-- brand/             # Componentes de marca (logo, decoraciones)
|   |   +-- home/              # Componentes de la landing page
|   |   +-- layout/            # Layout components (navbar, footer, etc.)
|   |   +-- pricing/           # Componentes de precios públicos
|   |   +-- ui/                # shadcn/ui wrappers
|   |   +-- providers.tsx      # Provider principal
|   |   +-- (otros: logo, product-card, etc.)
|   +-- lib/                   # Lógica de negocio y utilidades
|   |   +-- cotizador/         # Motor de cotizaciones (core)
|   |   +-- mocks/             # Datos mock
|   |   +-- auth-mock.ts       # Mock de autenticación
|   |   +-- mocks.ts           # Re-export central de mocks + tipos legacy
|   |   +-- seo.ts             # Configuración SEO
|   |   +-- site-config.ts     # Configuración del sitio
|   +-- types/                 # Tipos del sistema de cotización
|   |   cotizador-boga.ts      # Tipos core del cotizador
|   +-- data/                  # Datos estáticos
|   |   events.ts              # Datos de eventos (galería)
+-- documentation/            # Documentación (este archivo)
+-- Config files (package.json, tsconfig, next.config, tailwind, vitest,...)
`

### Archivos fuente: 128 archivos en src/ (estimado)

---
## 4. Sistema de Rutas (App Router)

### Layouts (2)

| Ruta | Archivo | Tipo | Descripcion |
|---|---|---|---|
| `/` | `src/app/layout.tsx` | Server | Layout raiz: HTML, Providers, JSON-LD, fuentes, metadata global |
| `/admin/*` | `src/app/admin/layout.tsx` | Client | Layout admin: guardia de autenticacion, sidebar, header, tema oscuro/claro |

### Rutas publicas (page.tsx - 15 archivos)

| Ruta | Archivo | Tipo | Descripcion |
|---|---|---|---|
| `/` | `page.tsx` | Server | Landing page: hero, marquee clientes, testimonios, valores, productos destacados, why-us, contacto. |
| `/servicios` | `servicios/page.tsx` | Server | Catalogo de servicios con filtros por categoria, grid de productos activos. |
| `/servicios/[slug]` | `servicios/[slug]/page.tsx` | Server (dinamico) | Detalle de producto: hero, specs, precio, galeria, relacionados, SEO dinamico. |
| `/quienes-somos` | `quienes-somos/page.tsx` | Server | Pagina corporativa con historia de la empresa. |
| `/galeria` | `galeria/page.tsx` | Server | Galeria de fotos de eventos. |
| `/faq` | `faq/page.tsx` | Server | Preguntas frecuentes con acordeon por categoria y FAQPage JSON-LD. |
| `/cotizar` | `cotizar/page.tsx` | Server | Pagina legacy/placeholder para cotizar. |
| `/cotizacion` | `cotizacion/page.tsx` | Server | Wizard de solicitud de cotizacion publica con QuoteWizard. |
| `/contacto` | `contacto/page.tsx` | Server | Formulario de contacto. |
| `/clientes` | `clientes/page.tsx` | Server | Pagina publica de clientes (stats, logos, eventos destacados). |
| `/terminos` | `terminos/page.tsx` | Server | Terminos y condiciones legales. |
| `/privacidad` | `privacidad/page.tsx` | Server | Politica de privacidad. |
| `/cookies` | `cookies/page.tsx` | Server | Politica de cookies. |
| `/design-system` | `design-system/page.tsx` | Server | Sistema de diseno interno (no indexable). |

### Rutas de administracion (page.tsx - 14 archivos)

| Ruta | Archivo | Tipo | Descripcion |
|---|---|---|---|
| `/admin` | `admin/page.tsx` | Server | Dashboard con KPIs, grafico, tabla de cotizaciones recientes, feed de actividad. |
| `/admin/login` | `admin/login/page.tsx` | Client | Login con email/password, Zod validation, demo autofill. |
| `/admin/clientes` | `admin/clientes/page.tsx` | Client | CRUD de clientes: tabla searchable/paginada, filtros, drawer de edicion. |
| `/admin/clientes/[id]` | `admin/clientes/[id]/page.tsx` | Server | Detalle de cliente con historial de cotizaciones. |
| `/admin/cotizaciones` | `admin/cotizaciones/page.tsx` | Client | Lista de cotizaciones: busqueda, filtros, KPIs, duplicado con versionado. |
| `/admin/cotizaciones/[id]` | `admin/cotizaciones/[id]/page.tsx` | Client | Detalle de cotizacion: info, totales, items, estado, PDF, duplicar. |
| `/admin/cotizaciones/nueva` | `admin/cotizaciones/nueva/page.tsx` | Client | Editor/creador de cotizaciones via PaqueteBuilder (?id= para editar, ?solicitudId= para prellenar). |
| `/admin/eventos` | `admin/eventos/page.tsx` | Client | Gestion de eventos/portafolio: tabla/grid, filtros, drawer de edicion. |
| `/admin/paquetes` | `admin/paquetes/page.tsx` | Client | CRUD de paquetes promocionales con editor inline y calculo en tiempo real. |
| `/admin/productos` | `admin/productos/page.tsx` | Client | Catalogo de productos con tarifas y costos operativos. |
| `/admin/solicitudes` | `admin/solicitudes/page.tsx` | Client | Bandeja de solicitudes publicas: convertir a cotizacion, descartar. |
| `/admin/solicitudes/[id]` | `admin/solicitudes/[id]/page.tsx` | Client | Detalle de solicitud publica con acciones. |
| `/admin/configuracion` | `admin/configuracion/page.tsx` | Client | Formulario de configuracion del sitio (negocio, redes sociales, SEO). |
| `/admin/config` | `admin/config/page.tsx` | Server | Redirige a /admin/configuracion. |

### Jerarquia de Layouts

```
Root Layout (/ layout.tsx)
  +-- HTML, Providers, JSON-LD, fuentes, metadata
  +-- <Providers> -- ThemeProvider + AuthMock + PriceVisibility
  |   +-- (public) <Navbar /> + <Footer /> + <WhatsAppButton />
  |   +-- <main>
  |       +-- Public pages (/)
  |       +-- Admin Layout (/admin/* layout.tsx)
  |           +-- Auth guard + sidebar + header
  |           +-- Admin pages
```

## 5. Seccion Publica (Clientes)

### 5.1 Componentes de la landing page

| Componente | Archivo | Descripcion |
|---|---|---|
| `Hero` | `components/home/hero.tsx` | Hero principal con titulo, subtitulo, CTA y Framer Motion background. |
| `ClientMarquee` | `components/client-marquee.tsx` | Carrusel infinito de logos/nombres de clientes. |
| `TestimonialCarousel` | `components/home/testimonial-carousel.tsx` | Carrusel de testimonios con altura fija (400px mobile, 360px desktop) y contenido centrado verticalmente. |
| `BogaValues` | `components/home/boga-values.tsx` | Seccion Mision/Vision con layout interactivo orbit. Tarjetas de igual altura con texto centrado. |
| `ProductGrid` | `components/product-grid.tsx` | Grid de productos destacados (max 4). |
| `ProductCard` | `components/product-card.tsx` | Tarjeta de producto con imagen, specs, precio. |
| `WhyUs` | `components/home/why-us.tsx` | Seccion de diferenciadores con carrusel auto-rotante. |
| `Contact` | `components/home/contact.tsx` | Seccion de contacto con formulario (fetch a API). |
| `FadeIn` | `components/home/fade-in.tsx` | Wrapper de animacion scroll-triggered (Framer Motion). |
| `BogaCircles` | `components/brand/boga-circles.tsx` | Elemento decorativo de 3 circulos caracteristico de la marca. |
| `BogaDecor` | `components/brand/boga-decor.tsx` | Decoraciones SVG (ondas, flechas, barras, burbujas) + fondo diagonal. |
| `BogaDiagonal` | `components/brand/boga-decor.tsx` | Fondo con division diagonal (exportado separadamente). |
| `PageHero` | `components/brand/page-hero.tsx` | Hero reutilizable para paginas internas. |
| `Logo` | `components/logo.tsx` | Logo de BOGA con variantes light/dark. |

### 5.2 Layout components (publicos)

| Componente | Archivo | Descripcion |
|---|---|---|
| `Navbar` | `components/layout/navbar.tsx` | Navbar responsivo con mega-menu, enlaces a servicios/quienes-somos/galeria/FAQ/contacto. |
| `Footer` | `components/layout/footer.tsx` | Footer completo: mapa, logo, servicios, contacto, redes, CTA, copyright, paginas legales. |
| `WhatsAppButton` | `components/layout/whatsapp-button.tsx` | Boton flotante de WhatsApp con chat conversacional completo. |
| `EmergencyButton` | `components/layout/emergency-button.tsx` | Boton de emergencia con dialogo de 2 pasos + redireccion WhatsApp. |
| `ThemeToggle` | `components/layout/theme-toggle.tsx` | Alternador de tema claro/oscuro. |

### 5.3 Sistema de Precios Publicos

| Componente/Modulo | Archivo | Descripcion |
|---|---|---|
| `PriceVisibilityProvider` | `components/pricing/price-visibility.tsx` | Contexto React + localStorage para toggle global de mostrar/ocultar precios. |
| `PriceDisplay` | `components/pricing/price-visibility.tsx` | Componente que muestra precio condicionalmente segun el estado de visibilidad. |
| `PriceVisibilityToggle` | `components/pricing/price-visibility.tsx` | Boton de toggle mostrar/ocultar precios. |
| `ProductPriceBlock` | `components/pricing/product-price-block.tsx` | Bloque de precio con hint de descuento por paquete. |
| `calcularCarritoPublico()` | `lib/cotizador/public-pricing.ts` | Calculo de carrito publico: descuento por paquete (bundle) del 30% si incluye productos ancla. |
| `isBundleTrigger()` | `lib/cotizador/public-pricing.ts` | Verifica si un slug activa el descuento por paquete. |

#### Reglas del descuento por paquete (Bundle)

- **Productos ancla:** `bano-vip`, `discapacitados`, `trailer-lujo`
- Si el carrito incluye AL MENOS UNO de estos, **TODO el carrito** recibe 30% de descuento.
- Varios anclas no acumulan descuento: siempre un unico 30%.
- Formula: `precioFinal = round(precioLista * 0.7)`

### 5.4 Cotizador publico (QuoteWizard)

**Archivo:** `src/app/cotizacion/quote-wizard.tsx` (~1025 lineas)

Componente cliente de varios pasos para que el publico solicite una cotizacion:

1. **Seleccion de productos:** Catalogo con checkboxes y ajuste de cantidad.
2. **Datos del evento:** Tipo, fecha, ciudad, asistentes, ubicacion.
3. **Datos de contacto:** Nombre, email, telefono, empresa, notas.
4. **Resumen y envio:** Tabla de productos seleccionados, boton de enviar.

Al enviar, crea una `SolicitudPublica` via `addSolicitud()` y la persiste en localStorage.

## 6. Panel de Administracion

### 6.1 Layout admin

**Archivo:** `src/app/admin/layout.tsx`

El layout admin utiliza `useAuthMock` para proteger todas las rutas admin. Si el usuario no esta autenticado, redirige a `/admin/login`. Incluye:

- `AdminSidebar` (`components/layout/admin-sidebar.tsx`): Sidebar fijo izquierdo con enlaces a todas las secciones del panel.
- `AdminHeader` (`components/layout/admin-header.tsx`): Header superior sticky con boton de menu mobile (sheet), tema oscuro/claro, info del usuario y boton de logout.
- La pagina de login se renderiza SIN sidebar ni header.

### 6.2 Dashboard (/admin)

**Archivo:** `src/app/admin/page.tsx` (server component)

Muestra:
- 4 tarjetas KPI: cotizaciones del mes, ingreso estimado, pendientes, clientes activos.
- `CotizadorKpis` (componente con calculos financieros).
- `CotizacionesStatusChart` (grafico de distribucion de estados).
- Tabla de cotizaciones recientes.
- Feed de actividad.

### 6.3 Autenticacion (/admin/login)

**Archivo:** `src/app/admin/login/page.tsx` + `src/lib/auth-mock.ts`

- `useAuthMock` es un hook que simula autenticacion con datos hardcodeados.
- Credenciales demo: `admin@boga.co` / `admin123`.
- El formulario usa `react-hook-form` + `zod` para validacion.
- Boton de autofill de credenciales demo.
- Toggle de visibilidad de contrasena.

### 6.4 Gestion de Clientes (/admin/clientes)

| Componente | Archivo | Descripcion |
|---|---|---|
| `ClienteForm` | `components/admin/cliente-form.tsx` | Formulario en drawer para crear/editar cliente (react-hook-form + Zod). |
| Lista | `admin/clientes/page.tsx` | Tabla con busqueda, filtros por estado/ciudad, paginacion, acciones. |
| Detalle | `admin/clientes/[id]/page.tsx` | Info del cliente + historial de cotizaciones. |

### 6.5 Gestion de Cotizaciones

#### 6.5.1 Lista de cotizaciones (/admin/cotizaciones)

**Archivo:** `src/app/admin/cotizaciones/page.tsx`

- Tabla con busqueda, filtros por estado (Borrador/Enviada/Aceptada/Rechazada/Vencida).
- 3 tarjetas KPI: Pipeline (suma de precios de enviadas), Margen promedio, Nuevas solicitudes.
- Boton de duplicar: versiona la cotizacion con sufijo numerico (v2, v3...).
- Click en fila navega al detalle.
- Cotizaciones enviadas/aceptadas: el boton "Editar" cambia a "Crear copia editable".

#### 6.5.2 Detalle de cotizacion (/admin/cotizaciones/[id])

**Archivo:** `src/app/admin/cotizaciones/[id]/page.tsx`

- Tarjeta de informacion del cliente.
- Tarjeta de totales: costo operativo, transporte, precio cliente, margen (% y COP).
- Tabla de items con precio unitario, cantidad, subtotal y margen por linea.
- Botones de accion segun estado: Enviar (borrador), Aceptar/Rechazar (enviada), Duplicar (aceptada o rechazada).
- Exportacion a PDF via `exportPaquetePdf` (jspdf + autotable).

#### 6.5.3 Editor de cotizaciones (/admin/cotizaciones/nueva)

**Archivo:** `src/app/admin/cotizaciones/nueva/page.tsx`

- Wrapper que recibe `?id=` (editar existente) o `?solicitudId=` (prellenar desde solicitud publica).
- Renderiza `<PaqueteBuilder />`.

### 6.6 PaqueteBuilder (Componente Principal)

**Archivo:** `src/components/admin/paquete-builder.tsx` (~848 lineas)

Este es el componente mas complejo del proyecto. Es un editor completo de cotizaciones que gestiona ~18 estados:

#### Estados y secciones:

1. **Datos del cliente:** nombre, empresa, email, telefono, ciudad.
2. **Datos del evento:** tipo, fecha, duracion, asistentes, ubicacion.
3. **Items del paquete:** catalogo navegable con busqueda, seleccion de items, ajuste de cantidad, seleccion de tarifa.
4. **Descuento y margen:** slider de descuento (0-100%), calculo automatico de precio, margen, ganancia. Boton de margen objetivo (`precioDesdeMargen`).
5. **Desglose de costos:** tabla de costos operativos, subtotales, totales.
6. **Transporte:** componente `<TransporteCostos />` integrado en el bloque de costos.
7. **Notas internas y validez (dias).**
8. **Acciones:** Guardar borrador, Guardar y enviar, Exportar PDF.

#### Logica de margen:
- `MARGEN_BLOQUEO = 15%`: No permite guardar si el margen es menor.
- `MARGEN_WARNING = 25%`: Muestra advertencia si el margen esta entre 15% y 25%.
- `DESCUENTO_NOTAS_MIN = 10%`: Descuentos >10% requieren nota interna obligatoria.

### 6.7 Catalogos y Productos

#### 6.7.1 Catalogo de productos (/admin/productos)

**Archivo:** `src/app/admin/productos/page.tsx`

- Tabla de todos los items del catalogo con busqueda.
- Muestra: imagen, nombre/slug, categoria, tarifas activas, margen promedio, precio inicial, estado activo/inactivo.
- Boton de editar abre `CatalogoTarifaEditor`.

#### 6.7.2 Editor de Catalogo y Tarifas

**Archivo:** `src/components/admin/catalogo-tarifa-editor.tsx` (~505 lineas)

- Editor en drawer con pestanas: Informacion general, Tarifas.
- Las tarifas tienen desglose de costos operativos editables (concepto, cantidad, costo unitario).
- Calculo automatico de costo total, precio cliente sugerido, margen y ganancia por tarifa.

#### 6.7.3 Otros formularios CRUD

| Componente | Archivo | Uso |
|---|---|---|
| `ProductoForm` | `components/admin/producto-form.tsx` | Editor de producto del catalogo legacy (react-hook-form). |
| `EventoForm` | `components/admin/evento-form.tsx` | Editor de eventos (datos, imagen, testimonio). |
| `EventoPortafolioForm` | `components/admin/evento-portafolio-form.tsx` | Editor de portafolio de eventos con galeria de imagenes. |

### 6.8 Paquetes Promocionales (/admin/paquetes)

**Archivo:** `src/app/admin/paquetes/page.tsx`

- Grid de tarjetas con paquetes promocionales.
- Editor inline (`PaqueteEditor`) con: explorador de catalogo por categoria, seleccion con checkboxes, ajuste de cantidad, control de descuento y margen, resumen financiero en tiempo real.
- Validacion de margen minimo y descuento con nota interna.

### 6.9 Solicitudes Publicas (/admin/solicitudes)

**Archivo:** `src/app/admin/solicitudes/page.tsx` + `[id]/page.tsx`

- Bandeja de entrada con solicitudes de cotizacion generadas desde `/cotizacion`.
- Accion "Convertir": guarda datos en `sessionStorage` y redirige a `/admin/cotizaciones/nueva?solicitudId=...`.
- Accion "Descartar": cambia estado a `descartada`.
- Estados: `nueva`, `convertida`, `descartada`.
- Detalle con toda la informacion de la solicitud y boton "Reabrir" si esta descartada/convertida.

### 6.10 Eventos (/admin/eventos)

**Archivo:** `src/app/admin/eventos/page.tsx`

- Vista tabla/grid, busqueda, filtros por ano y tipo, paginacion.
- Drawer de edicion, dialogo de archivar, testimonios/rating en grid.

### 6.11 Configuracion (/admin/configuracion)

**Archivo:** `src/app/admin/configuracion/page.tsx`

- Formulario con validacion Zod dividido en 3 secciones:
  1. **Informacion del negocio:** nombre, telefonos, direcciones, WhatsApp.
  2. **Redes sociales:** Instagram, LinkedIn, mensaje default de WhatsApp.
  3. **SEO:** titulo, descripcion, script de analytics.
- Boton de guardar deshabilitado hasta que haya cambios sucios (dirty state).

## 7. Sistema de Cotizador (Cotizador BOGA)

### 7.1 Arquitectura General

El cotizador es el corazon del proyecto. Contiene dos modelos de datos paralelos:

1. **Modelo legacy** (`Cotizacion`, `CotizacionItem`, `Cliente`, `Producto`, `Categoria` en `src/lib/mocks.ts`) - usado por el dashboard, clientes, cotizaciones antiguas.
2. **Modelo cotizador** (`PaqueteEvento`, `CatalogItem`, `Tarifa`, `CostoOperativo`, `ItemEnPaquete`, `SolicitudPublica` en `src/types/cotizador-boga.ts`) - usado por el editor de cotizaciones, transporte, y solicitudes.

### 7.2 Diagrama de Entidades (Modelo Cotizador)

```
CatalogItem (producto/servicio)
  |-- id: string (ej. "prod-vip")
  |-- slug: string (ej. "bano-vip")
  |-- nombre: string
  |-- categoria: CategoriaCatalogo
  |-- tarifas: Tarifa[]
  |     |-- id, nombre, descripcion, incluye[]
  |     |-- costos: CostoOperativo[]
  |     |     |-- concepto, cantidad, unidad, costoUnitario, costoTotal
  |     |-- costoTotal (suma de costos)
  |     |-- precioCliente, margenPorcentaje, ganancia
  |     |-- unidadCobro: UnidadCobro ("dia"|"evento"|"turno_8h"|"turno_12h"|"unidad")
  |-- activo, orden, badge?, specs[], imagen?

ItemEnPaquete (linea de cotizacion)
  |-- catalogItemId: string (ref CatalogItem.id)
  |-- tarifaId: string (ref Tarifa.id)
  |-- cantidad: number
  |-- nota?: string

PaqueteEvento (cotizacion)
  |-- id, numero (BOGA-YYYY-NNNN)
  |-- nombre, tipoEvento?, cliente?: ClienteEvento
  |-- fechaEvento?, duracionDias?, asistentesEstimados?
  |-- items: ItemEnPaquete[]
  |-- costoTotal, precioCliente, margenPorcentaje, ganancia
  |-- descuentoPorcentaje?
  |-- estado: EstadoCotizacionPaquete (borrador|enviada|en_revision|aceptada|rechazada|vencida)
  |-- origen: "admin"|"formulario_publico"
  |-- validezDias, notasInternas?
  |-- creadoEn, actualizadoEn
  |-- transporte?: { sede, numCamiones, costoTotal }

SolicitudPublica (solicitud de cotizacion)
  |-- id, fullName, company?, email, phone
  |-- eventType, eventDate, city, attendees?
  |-- productSlugs: string[]
  |-- notes?, estado (nueva|convertida|descartada)
  |-- paqueteId?, recibidoEn
```

### 7.3 Motor de Calculo (`src/lib/cotizador/calc.ts`)

#### Constantes de umbral

| Constante | Valor | Proposito |
|---|---|---|
| `MARGEN_WARNING` | 25 | Por debajo de 25% muestra advertencia amarilla |
| `MARGEN_BLOQUEO` | 15 | Por debajo de 15% bloquea el guardado |
| `DESCUENTO_NOTAS_MIN` | 10 | Descuentos mayores a 10% requieren nota interna |

#### Formulario de calculo (`calcularPaquete`)

```
Por cada ItemEnPaquete:
  q = max(1, cantidad)
  d = factorDias(tarifa.unidadCobro, duracionDias)
  // factorDias: si unidadCobro=="dia" -> max(1, duracionDias), si no -> 1
  costoTotal += tarifa.costoTotal * q * d
  precioBruto += tarifa.precioCliente * q * d

desc = clamp(0, 100, descuentoPorcentaje)
precioCliente = round(precioBruto * (1 - desc / 100))
ganancia = max(0, precioCliente - costoTotal)
margenPorcentaje = precioCliente > 0 ? round(ganancia / precioCliente * 100) : 0
```

#### Precio desde margen (`precioDesdeMargen`)

```
precioCliente = round(costoTotal / (1 - margenObjetivo / 100))
// margen clamp: [0, 99]
```

#### Numeracion de cotizaciones (`nextNumeroCotizacion`)

Formato: `BOGA-{YYYY}-{NNNN}`
- Escanea numeros existentes con el prefijo del ano actual.
- Encuentra el sufijo maximo, incrementa en 1, rellena a 4 digitos.
- Ejemplo: `BOGA-2026-0001`, `BOGA-2026-0002`

#### Estado del margen (`margenStatus`)

| Margen | Status | Comportamiento |
|---|---|---|
| >= 25% | `"ok"` | Normal |
| 15-24% | `"warning"` | Se permite guardar con advertencia |
| < 15% | `"blocked"` | No se permite guardar |

### 7.4 Capa de Almacenamiento (`src/lib/cotizador/storage.ts`)

#### Keys de localStorage

| Key | Tipo de dato | Seed inicial |
|---|---|---|
| `boga-catalogo-v1` | `CatalogItem[]` | `DEFAULT_CATALOGO` |
| `boga-catalogo-version` | `string` | `"boga-1"` |
| `boga-paquetes` | `PaqueteEvento[]` | `COTIZACIONES_DEMO` |
| `boga-solicitudes` | `SolicitudPublica[]` | `SOLICITUDES_DEMO` |

#### Operaciones CRUD

| Funcion | Operacion | Descripcion |
|---|---|---|
| `getCatalogo()` | Read | Retorna catalogo, asegurando version. |
| `saveCatalogo(c)` | Write | Persiste catalogo + version. |
| `getPaquetes()` | Read | Retorna paquetes, seed si vacio. |
| `savePaquetes(p)` | Write | Persiste todos los paquetes. |
| `getCotizaciones()` | Read | Alias de getPaquetes(). |
| `getPaqueteById(id)` | Read | Busca por ID. |
| `upsertPaquete(p)` | Write | Inserta o actualiza: recalcula totales + transporte. |
| `getSolicitudes()` | Read | Retorna solicitudes, seed si vacio. |
| `saveSolicitudes(s)` | Write | Persiste solicitudes. |
| `getSolicitudById(id)` | Read | Busca solicitud por ID. |
| `addSolicitud(s)` | Write | Agrega al inicio de la lista. |
| `updateSolicitud(id, patch)` | Write | Actualizacion parcial de solicitud. |
| `generateId(prefix)` | Util | Genera IDs tipo `prefix_timestamp_random`. |
| `getPaquetesComoProductos()` | Read | Convierte PaqueteEvento[] a Producto[] para exhibicion publica. |

#### Flujo de `upsertPaquete`

1. Obtiene paquetes actuales + catalogo.
2. Llama `calcularPaquete(items, catalogo, descuento, duracionDias)` -> totales.
3. Extrae `ciudad` del `cliente.ciudad` y llama `calcularTransporte(items, ciudad)` -> transporte.
4. Mergea totales + transporte en el paquete.
5. Actualiza `actualizadoEn`.
6. Si existe ID -> actualiza in-place; si no -> inserta al inicio.
7. Persiste via `savePaquetes`.

## 8. Sistema de Transporte

### 8.1 Configuracion (`src/lib/cotizador/transport-config.ts`)

| Constante | Valor | Descripcion |
|---|---|---|
| `TRUCK_CAPACITY_SLOTS` | 30 | Capacidad maxima de un camion en slots. |
| `ITEM_TRANSPORT_TYPES` | `Record<string, ItemTransporte>` | Mapeo de catalogItemId a configuracion de transporte. |
| `CIUDAD_SEDE` | `Record<string, Sede>` | Mapa de ~20 ciudades colombianas a su sede mas cercana. |
| `ROUTE_COSTS` | `Record<Sede, Record<string, number>>` | Costos por ruta: solo Medellin-Manizales = $500.000 COP. |
| `SEDES` | `["Medellin", "Bogota"]` | Sedes de despacho disponibles. |
| `TRANSPORT_ITEM_LABELS` | `Record<string, string>` | Etiquetas legibles para items en el desglose de transporte. |

#### Items con capacidad de transporte

| catalogItemId | max_unidades_solo | slots_por_unidad | Capacidad total (slots) |
|---|---|---|---|
| `prod-vip` | 3 | 10 | 30 |
| `prod-estandar` | 6 | 5 | 30 |
| `prod-accesible` | 3 | 10 | 30 |
| `prod-electrico` | 3 | 10 | 30 |
| `prod-lavamanos` | 4 | 7.5 | 30 |
| `prod-eco` | 10 | 3 | 30 |

#### Items que NO aplican para transporte en camion

| catalogItemId | Motivo |
|---|---|
| `prod-operarios` | Transporte de personal (bus/vehiculo individual), no calculable por slots. |
| `svc-mantenimiento` | Servicio, no carga fisica. |
| `svc-insumos` | Insumos livianos, no requieren camion dedicado. |
| `prod-trailer` | El costo de transporte del trailer ya esta incluido en su tarifa (movilizacion). |

### 8.2 Motor de Calculo (`src/lib/cotizador/transporte.ts`)

#### Algoritmo de empaquetado: First-Fit Decreasing (FFD)

1. **seleccionarSede(ciudad):** Busca la ciudad en `CIUDAD_SEDE`. Retorna "Medellin", "Bogota", o null con advertencia.
2. **itemsAUnidades(items):** Convierte items cotizados en unidades normalizadas (slots). Solo incluye items transportables (los que tienen `slots_por_unidad`). Items `no_aplica_transporte_camion` se omiten sin advertencia.
3. **empacarCamiones(unidades):** Ordena unidades por slots descendente. Para cada unidad, busca el primer camion donde `espacio_usado + slots <= 30`. Si no cabe, crea nuevo camion.
4. **calcularCostoRuta(sede, ciudad, numCamiones):** Busca `ROUTE_COSTS[sede][ciudad]`. Multiplica por numCamiones. Retorna advertencia si no hay costo configurado.
5. **calcularTransporte(items, ciudadEvento):** Orquesta todo el flujo. Retorna `{ sede, camiones[], costoTotal, advertencias[] }`.

#### Casos de prueba cubiertos (24 tests en transporte.test.ts)

| # | Descripcion | Resultado esperado |
|---|---|---|
| 1 | 6 banos estandar solos | 1 camion (30/30 slots), $500K |
| 2 | 6 banos + 2 lavamanos + 3 ecopuntos | 2 camiones, $1M |
| 3 | Items con cantidad 0 | Ignorados, 0 camiones |
| 4 | Ciudad desconocida | sede=null, advertencia |
| 5 | Ruta sin costo (Bogota->Cali) | Advertencia, no error |
| 6 | Item sin config de transporte | Advertencia |
| 7 | 3 banos accesibles | 1 camion, $500K, sin advertencia |
| 8 | Operarios + Mantenimiento con estandar | Solo estandar en camion, sin advertencias de operarios/mantenimiento |

### 8.3 Componente UI (`src/components/admin/transporte-costos.tsx`)

- Renderiza un bloque colapsable dentro del desglose de costos en PaqueteBuilder.
- Muestra: sede seleccionada, numero de camiones, costo total.
- Al expandir: detalle de cada camion (items por camion con etiquetas legibles, slots usados).
- Advertencias: ciudad desconocida, ruta sin costo, items sin configurar.

---

## 9. Sistema de Precios Publicos

**Archivo:** `src/lib/cotizador/public-pricing.ts`

#### Bundle Discount (Descuento por paquete)

- `BUNDLE_DISCOUNT_RATE = 0.30` (30%)
- `BUNDLE_TRIGGER_SLUGS = new Set(["bano-vip", "discapacitados", "trailer-lujo"])`
- Si el carrito incluye al menos uno de estos slugs, todo el carrito recibe 30% de descuento.
- No acumulable por multiples anclas.

#### Tipos publicos

| Tipo | Campos |
|---|---|
| `PublicCartLineInput` | `producto: Producto, cantidad: number` |
| `PublicCartLine` | `productoId, slug, nombre, cantidad, unidadMedida, precioUnitarioLista, precioUnitarioFinal, subtotalLista, subtotalFinal, aplicaDescuento, esAncla` |
| `PublicCartTotals` | `lines[], hasBundleTrigger, subtotalLista, descuentoTotal, total` |

---

## 10. Sistema de Componentes

### 10.1 Componentes de UI base (shadcn/ui)

Ubicados en `src/components/ui/`. Importados via cli shadcn. Incluyen:

`button`, `card`, `input`, `label`, `textarea`, `select`, `badge`, `separator`, `dialog`, `table`, `checkbox`, `sheet`, `alert`, `sonner` (toast), `skeleton`

### 10.2 Componentes del Brand Kit (`components/brand/`)

| Componente | Archivo | Descripcion |
|---|---|---|
| `BogaCircles` | `boga-circles.tsx` | 3 circulos concenctricos, sello visual de BOGA. Variante `sm`/`md`/`lg`. |
| `BogaDecor` | `boga-decor.tsx` | SVG decorativos: ondas, flechas, barras, burbujas. + `BogaDiagonal` (fondo dividido). |
| `PageHero` | `page-hero.tsx` | Hero reutilizable con titulo, subtitulo, breadcrumbs, imagen de fondo y decoraciones. |
| `SedesCoverage` | `sedes-coverage.tsx` | Mapa y lista de ciudades de cobertura. |

### 10.3 Componentes de Layout

| Componente | Archivo | Lineas | Descripcion |
|---|---|---|---|
| `Navbar` | `layout/navbar.tsx` | ~150 | Navbar responsivo con mega-menu, enlaces, scroll effect. |
| `Footer` | `layout/footer.tsx` | ~150 | Footer completo: logo, servicios, contacto, mapa, redes, CTA, copyright. |
| `AdminSidebar` | `layout/admin-sidebar.tsx` | ~120 | Sidebar fijo izquierdo con iconos y enlaces, colapsable en mobile. |
| `AdminHeader` | `layout/admin-header.tsx` | ~80 | Header admin con menu mobile sheet, theme toggle, user info. |
| `WhatsAppButton` | `layout/whatsapp-button.tsx` | ~200 | Boton flotante con chat conversacional completo. |
| `EmergencyButton` | `layout/emergency-button.tsx` | ~120 | Dialogo de 2 pasos para solicitar ayuda de emergencia. |
| `ThemeToggle` | `layout/theme-toggle.tsx` | ~30 | Alternador de tema. |

### 10.4 Componentes Home (Landing Page)

| Componente | Archivo | Descripcion |
|---|---|---|
| `Hero` | `home/hero.tsx` | Hero principal con animaciones Framer Motion. |
| `BogaValues` | `home/boga-values.tsx` | Cards Mision/Vision con layout interactivo orbit. Altura fija e igual, texto centrado verticalmente. |
| `WhyUs` | `home/why-us.tsx` | Carrusel de diferenciadores con auto-rotacion. |
| `TestimonialCarousel` | `home/testimonial-carousel.tsx` | Carrusel de testimonios con altura constante (400px mobile, 360px desktop), contenido centrado. |
| `Clients` | `home/clients.tsx` | Seccion de clientes con estadisticas y grid. |
| `FeaturedProducts` | `home/featured-products.tsx` | Grid de productos destacados. |
| `Contact` | `home/contact.tsx` | Formulario de contacto con fetch. |
| `Testimonials` | `home/testimonials.tsx` | Seccion de testimonios con estrellas. |

### 10.5 Componentes Admin (Core)

| Componente | Archivo | Lineas | Descripcion |
|---|---|---|---|
| `PaqueteBuilder` | `admin/paquete-builder.tsx` | ~848 | Editor completo de cotizaciones (componente mas grande del proyecto). |
| `CatalogoTarifaEditor` | `admin/catalogo-tarifa-editor.tsx` | ~505 | Editor de catalogo y tarifas con costos operativos. |
| `TransporteCostos` | `admin/transporte-costos.tsx` | ~117 | Bloque de costos de transporte colapsable. |
| `KpiCard` | `admin/kpi-card.tsx` | ~20 | Tarjeta de KPI reutilizable. |
| `CotizadorKpis` | `admin/cotizador-kpis.tsx` | ~60 | Calculos financieros agregados. |
| `CotizacionesStatusChart` | `admin/cotizaciones-status-chart.tsx` | ~80 | Grafico de distribucion de estados. |
| `RecentCotizaciones` | `admin/recent-cotizaciones.tsx` | ~50 | Tabla de cotizaciones recientes. |
| `StatusBadge` | `admin/status-badge.tsx` | ~30 | Badge de estado con colores. |
| `ClienteForm` | `admin/cliente-form.tsx` | ~120 | Formulario de cliente en drawer. |
| `ProductoForm` | `admin/producto-form.tsx` | ~100 | Formulario de producto legacy. |
| `EventoForm` | `admin/evento-form.tsx` | ~100 | Formulario de evento. |
| `EventoPortafolioForm` | `admin/evento-portafolio-form.tsx` | ~120 | Formulario de portafolio de eventos. |

---

## 11. Mock Data & Almacenamiento

### 11.1 Catalogo de Productos (10 items)

| ID | Slug | Nombre | Categoria | Tarifas | Precio x dia (desde) |
|---|---|---|---|---|---|
| `prod-vip` | `bano-vip` | Bano Portatil VIP | banos-portatiles | 2 (dia, fin de semana) | $320,000 |
| `prod-estandar` | `bano-estandar` | Bano Portatil Estandar | banos-portatiles | 1 (dia) | $145,000 |
| `prod-accesible` | `discapacitados` | Bano para Discapacitados | banos-portatiles | 1 (dia) | $210,000 |
| `prod-electrico` | `electricos` | Bano Portatil Electrico | banos-portatiles | 1 (dia) | $250,000 |
| `prod-lavamanos` | `lavamanos` | Lavamanos Aquastand/Aquapop | lavamanos | 1 (dia) | $110,000 |
| `prod-trailer` | `trailer-lujo` | Trailer de Lujo | trailers | 1 (evento) | $2,800,000 |
| `prod-eco` | `puntos-ecologicos` | Puntos Ecologicos | puntos-ecologicos | 1 (dia) | $75,000 |
| `prod-operarios` | `operarios` | Servicio de Operarios | servicios-operacion | 2 (8h, 12h) | $180,000 (turno 8h) |
| `svc-mantenimiento` | `mantenimiento` | Mantenimiento 24/7 | servicios-operacion | 1 (evento) | $1,400,000 |
| `svc-insumos` | `insumos-eco` | Insumos Biodegradables | insumos | 1 (dia) | $150,000 |

### 11.2 Demo Cotizaciones (2)

1. **Feria de Manizales 2026:** 5 items (banos estandar, vip, discapacitados, lavamanos, electricos), 8000 asistentes, estado `enviada`, origen `admin`.
2. **Boda Hacienda El Retiro:** 3 items (banos estandar, lavamanos, electricos), 180 asistentes, estado `borrador`, origen `formulario_publico`.

### 11.3 Demo Solicitud Publica (1)

- **Andres Quintero:** Core Festival, Bogota, 12,000 asistentes, 4 productos, estado `nueva`.

## 12. Autenticacion

### 12.1 Mock de Autenticacion (`src/lib/auth-mock.ts`)

El proyecto utiliza un mock de autenticacion en lugar de next-auth real.

```typescript
// Interfaz AuthUser
{
  id: "1",
  email: "admin@boga.co",
  nombre: "Admin BOGA",
  rol: "ADMIN",
}

// Hook useAuthMock()
{
  user: AuthUser | null,
  status: "loading" | "authenticated" | "unauthenticated",
  signIn: (email, password) => Promise<{ ok, error? }>,
  signOut: () => void,
}
```

- Credenciales demo: `admin@boga.co` / `admin123`
- El estado de autenticacion se persiste en un state de React (se pierde al recargar).
- NOTA: next-auth y @auth/prisma-adapter estan instalados pero no operativos.

### 12.2 Provider (`src/components/providers.tsx`)

El provider principal envuelve la aplicacion en: `ThemeProvider` > `AuthMockProvider` > `PriceVisibilityProvider`.
Ademas, condicionalmente renderiza Navbar, Footer y WhatsAppButton en rutas publicas (no admin).

---

## 13. Diseno Visual / Brand Kit

### 13.1 Paleta de Colores

Definida en `src/app/globals.css` con variables CSS personalizadas. El proyecto soporta modo claro y oscuro.

| Variable | Claro | Oscuro | Uso |
|---|---|---|---|
| `--boga-brand` | `#2563EB` (azul) | `#3B82F6` | Color primario de marca |
| `--boga-electric` | `#F59E0B` (ambar) | `#FBBF24` | Acentos y detalles |
| `--boga-surface-canvas` | `#FAFAFA` | `#0A0A0A` | Fondo general |
| `--boga-surface-elevated` | `#FFFFFF` | `#18181B` | Tarjetas y contenedores |
| `--boga-surface-inset` | `#F4F4F5` | `#09090B` | Inputs y fondos empotrados |
| `--boga-border-default` | `#E4E4E7` | `#27272A` | Bordes |
| `--boga-shadow-1` a `--boga-shadow-5` | - | - | Sombras progresivas |

### 13.2 Tipografia

- **Fuente principal:** Montserrat (variable), cargada desde Google Fonts en `layout.tsx`.
- Escala de variables tipograficas definidas en `globals.css`.

### 13.3 Elementos de Marca

| Elemento | Descripcion |
|---|---|
| `Logo` | Componente React con variantes light/dark. |
| `BogaCircles` | 3 circulos concentricos como sello visual. Tamanos sm/md/lg. |
| `BogaDecor` | Ondas, flechas, barras, burbujas decorativas. |
| `BogaDiagonal` | Fondo dividido diagonalmente. |
| `PageHero` | Hero reutilizable con imagen de fondo, breadcrumbs, gradiente. |

### 13.4 Modo Oscuro

- Implementado con `next-themes`.
- El admin layout tiene su propio toggle de tema.
- Los inputs en modo oscuro usan `--boga-border-default` como color de borde (contraste mejorado).

---

## 14. Pruebas

### 14.1 Framework

- **Vitest v4.1.10**, configurado en `vitest.config.ts` con alias de paths (`@/` -> `./src`).

### 14.2 Test Suite Actual

Un unico archivo de pruebas: `src/lib/cotizador/transporte.test.ts`

**24 tests** cubriendo:
- `seleccionarSede` (5 tests): ciudad conocida, ciudad desconocida, undefined, empty string.
- `itemsAUnidades` (4 tests): cantidad 0, conversion 6 banos, sin config, no_aplica_transporte_camion.
- `empacarCamiones` (3 tests): 30 slots exactos, FFD multi-item, array vacio.
- `calcularCostoRuta` (4 tests): ruta conocida, 2 camiones, Bogota sin rutas, ruta desconocida.
- `calcularTransporte integration` (8 tests): 6 casos de aceptacion + 2 nuevos (accesible, operarios/mantenimiento).

### 14.3 Scripts

```bash
npm test        # vitest run (una vez)
npm run test:watch  # vitest (modo watch)
```

---

## 15. Configuracion y Scripts

### 15.1 package.json scripts

| Script | Comando | Proposito |
|---|---|---|
| `dev` | `next dev` | Servidor de desarrollo con Turbopack. |
| `build` | `next build` | Build de produccion. |
| `start` | `next start` | Iniciar servidor de produccion. |
| `lint` | `eslint` | Linter. |
| `test` | `vitest run` | Ejecutar tests una vez. |
| `test:watch` | `vitest` | Tests en modo watch. |
| `prisma:seed` | `ts-node prisma/seed.ts` | Seed de BD (no operativo). |
| `prisma:generate` | `prisma generate` | Generar cliente Prisma (no operativo). |
| `prisma:migrate` | `prisma migrate dev` | Migraciones (no operativo). |

### 15.2 Archivos de Configuracion

| Archivo | Proposito |
|---|---|
| `tsconfig.json` | TypeScript config: paths `@/*` -> `./src/*`, JSX react-jsx, strict mode. |
| `next.config.ts` | Next.js config (minima). |
| `tailwind.config.ts` (o postcss) | Tailwind CSS v4 config via PostCSS. |
| `vitest.config.ts` | Vitest config con alias de paths. |
| `.eslintrc` (o eslint.config) | ESLint config. |
| `.gitignore` | Ignora node_modules, .next, coverage, etc. |

---

## 16. Observaciones y Deuda Tecnica

### 16.1 Deuda Tecnica Conocida

1. **Dos modelos de datos paralelos:** `Cotizacion`/`Producto` (legacy) y `PaqueteEvento`/`CatalogItem` (nuevo). Esto causa duplicacion de tipos y posible inconsistencia. El nuevo es el que se usa en el editor; el legacy persiste en dashboard y clientes.

2. **Persistencia solo en localStorage:** Todos los datos se pierden al limpiar el navegador. No hay sincronizacion multi-dispositivo ni backup. Las operaciones CRUD son sincronas y no escalan.

3. **Prisma/BD instalados pero no operativos:** Hay schema, seed script, y dependencias, pero no hay migraciones aplicadas ni conexion a BD configurada. El schema puede estar desactualizado vs. el modelo de datos actual.

4. **Autenticacion mock:** No hay sesion real, JWT, ni proteccion de rutas real en el servidor. La "autenticacion" es solo un estado de React que se pierde al recargar.

5. **next-auth instalado pero no usado:** Las dependencias de autenticacion real estan presentes pero el proyecto usa un mock.

6. **nodemailer instalado pero no usado:** No hay envio real de correos. Los formularios (contacto, cotizacion) solo persisten en localStorage.

7. **Sin pruebas del calculo financiero:** El core `calcularPaquete` en `calc.ts` no tiene tests unitarios. Solo hay tests para el modulo de transporte.

8. **Componente PaqueteBuilder demasiado grande:** ~848 lineas con ~18 estados. Seria candidato a refactor en componentes mas pequenos.

9. **Sin i18n:** Todo el texto esta en espanol hardcodeado. Sin soporte para otros idiomas.

10. **Imagenes de productos:** Usan rutas placeholder (`/images/products/bano-vip-photo.jpg`). Muchas probablemente no existen en `public/`.

11. **Sin PWA/offline support:** No hay service worker ni manifest.

12. **Sin analiticas reales:** El script de analytics en la configuracion es un placeholder.

13. **Sin rate limiting ni proteccion CSRF** en formularios publicos.

14. **Codigo duplicado entre modelos:** `getCotizaciones()` es un alias de `getPaquetes()`. Hay dos definiciones separadas de tipos de cliente/Cotizacion.

15. **El diseno responsive tiene areas mejorables:** Algunas tablas admin en mobile, el sidebar en pantallas pequenas.

### 16.2 Proximos Pasos Recomendados

1. Migrar de localStorage a base de datos real (Prisma + PostgreSQL/SQLite).
2. Implementar autenticacion real con next-auth.
3. Unificar los dos modelos de datos en uno solo (migrar tipos legacy al nuevo modelo).
4. Agregar pruebas unitarias para `calcularPaquete` y `calcularCarritoPublico`.
5. Implementar envio real de correos (confirmacion de cotizacion, notificaciones).
6. Agregar carga de imagenes real para productos y eventos.
7. Refactorizar `PaqueteBuilder` en subcomponentes mas pequenos.
8. Configurar CI/CD (GitHub Actions para tests + deploy).
9. Agregar paginacion del lado del servidor para tablas grandes.
10. Implementar exportacion de cotizaciones a Excel/CSV ademas de PDF.
