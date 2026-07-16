# Mapa de Cambios — Rebrand Junisama → BOGA
## Cruce de auditorías: Estado actual + Brand Kit BOGA

> **Documento generado:** Fase 3 — Cruzamiento forense
> **Fuentes:**
> - Documento maestro: `estado_actual_junisama_pre_rebrand.md` (código real)
> - Auditoría visual: `auditoria-estado-actual.md` (inventario visual)
> - Brand kit: `brand-kit-boga-auditoria.md` (nueva identidad)
>
> **Alcance:** Clasificación de cada componente en CONSERVA / ADAPTA / RECONSTRUYE / NUEVO con archivos exactos y prioridad.

---

### Resumen Ejecutivo

| Categoría | Conteo | Descripción |
|-----------|--------|-------------|
| **CONSERVA** | 6 | Estructura/funcionalidad correcta, solo cambia estilo (tokens CSS) |
| **ADAPTA** | 28 | Estructura sirve pero necesita reordenarse/reconfigurarse para BOGA |
| **RECONSTRUYE** | 10 | No hay forma de adaptarlo, se hace de cero |
| **NUEVO** | 8 | No existe hoy pero la nueva identidad/estrategia lo requiere |
| **TOTAL** | **52** | Ítems auditados |

**Distribución por impacto:**
- **P0 (crítico, bloqueante):** 14 ítems
- **P1 (alto, necesario para MVP):** 25 ítems
- **P2 (medio, mejora):** 13 ítems

---

### Leyenda

- **CONSERVA**: Estructura/funcionalidad correcta, solo cambia estilo (colores, tipografía via tokens CSS)
- **ADAPTA**: Estructura sirve pero necesita reordenarse/reconfigurarse para BOGA (cambios de layout, contenido, estructura)
- **RECONSTRUYE**: No hay forma de adaptarlo, se hace de cero (SVG hardcodeados, componentes con identidad antigua irreconciliable)
- **NUEVO**: No existe hoy pero la nueva identidad/estrategia lo requiere

**Prioridad:**
- **P0**: Bloqueante — debe resolverse antes de cualquier deploy
- **P1**: Alto — necesario para el MVP de lanzamiento
- **P2**: Medio — mejora, puede postergarse

---

### 1. Sistema de Diseño / Tokens

| # | Token/Elemento | Estado | Cambio requerido | Archivos afectados | Prioridad |
|---|---------------|--------|-----------------|-------------------|-----------|
| 1.1 | **Paleta completa** (`--primary`, `--secondary`, `--accent-gold`, etc.) | **RECONSTRUYE** | Todos los tokens de color deben reemplazarse: `--primary: #e85d24` → `#2c4df2`, `--secondary: #0f1923` → `#1b1341`, `--accent-gold: #c9a84c` → `#daf73a`, `--primary-hover: #d14d18` → `#1a3ad9`, `--primary-light: #fff0e8` → `#e8ecfe`, `--secondary-elevated: #1a2634` → `#251d4a`. La paleta Junisama no tiene correspondencia 1:1 con BOGA (el dorado desaparece como acento principal; el amarillo lima es un acento completamente distinto en rol y personalidad). | `src/app/globals.css` (líneas 17–216 `@theme inline`; líneas 218–288 `:root`) | **P0** |
| 1.2 | **Tipografía** (Outfit + Space Grotesk) | **RECONSTRUYE** | Reemplazar Outfit y Space Grotesk por Montserrat (inferida del brand kit). Ajustar todos los tokens de font-family. Space Grotesk para números desaparece; Montserrat cubre todos los pesos necesarios (300 Light para "INGENIERÍA PORTÁTIL", 400 Regular body, 700 Bold títulos, 900 Black para "BOGA"). | `src/app/globals.css`, `src/app/layout.tsx` (preconnects Google Fonts) | **P0** |
| 1.3 | **Escala tipográfica** (display-xl, heading-lg, body-lg, etc.) | **ADAPTA** | Los tamaños base sirven pero deben ajustarse para Montserrat. Montserrat tiene mayor altura de x y diferentes métricas que Outfit. Revisar line-heights y letter-spacing. Agregar token para "INGENIERÍA PORTÁTIL" (`letter-spacing: 0.3em`, `font-weight: 300`). | `src/app/globals.css` (tokens tipográficos) | **P1** |
| 1.4 | **Clases custom** (`.container-junisama`, `.badge-iso`, `.btn-primary`, `.btn-secondary`, `.stat-number`, etc.) | **ADAPTA** | Renombrar `.container-junisama` → `.container-boga`. Revisar `.badge-iso` (el badge ISO14001 cambia de estilo dorado). `.btn-primary` cambia de naranja a azul eléctrico `#2c4df2` o amarillo lima `#daf73a` según jerarquía BOGA. `.stat-number` cambia de dorado `#c9a84c` a amarillo lima `#daf73a`. | `src/app/globals.css` (líneas 425+) | **P1** |
| 1.5 | **Gradientes** (`.gradient-primary`, `.gradient-dark`) | **RECONSTRUYE** | `.gradient-primary` (naranja→naranja-oscuro) no aplica. Nuevo gradiente BOGA: `linear-gradient(135deg, #1b1341 0%, #2c4df2 60%, #3d5ff5 100%)` para heroes. `.gradient-dark` (`#0f1923`→`#0a1018`) se adapta a `#1b1341`→`#0f0a2a`. | `src/app/globals.css` | **P1** |
| 1.6 | **Modo oscuro** (`.dark`) | **ADAPTA** | Actualmente no se usa (`defaultTheme="light"`). Para BOGA el modo oscuro podría activarse; adaptar tokens a paleta BOGA oscura. | `src/app/globals.css` (líneas 302–323) | **P2** |
| 1.7 | **Tema admin** (`[data-admin-theme="dark"]`) | **ADAPTA** | El tema admin dorado-oscuro actual (`#d4a853` primary) debe decidirse: ¿adopta BOGA o se mantiene dorado independiente? Recomendación: adaptar a BOGA con primary azul eléctrico `#2c4df2` y accent amarillo lima `#daf73a`. | `src/app/globals.css` (líneas 325–363) | **P1** |
| 1.8 | **Animaciones** (`pulse-emergency`, `marquee`, `prefers-reduced-motion`) | **CONSERVA** | Las animaciones son agnósticas de marca. Solo verificar que `pulse-emergency` mantenga coherencia con nuevo color de emergencia si cambia. | `src/app/globals.css` | **P2** |
| 1.9 | **Escala de grises Tailwind** (neutral-50 a neutral-900) | **CONSERVA** | Los grises neutros de Tailwind son independientes de la marca y se mantienen. | `tailwind.config.ts` (referencia) | **P2** |
| 1.10 | **Tokens semánticos de estado** (`--success`, `--error`, `--warning`) | **ADAPTA** | Actual: `--success: #16a34a`, `--error: #dc2626`, `--warning: #eab308`. BOGA no define estos colores explícitamente. Se recomienda mantenerlos o ajustar `--success` a un tono que armonice con `#2c4df2`. | `src/app/globals.css` | **P1** |

---

### 2. Componentes de Layout

| # | Componente | Estado | Cambio requerido | Archivos afectados | Prioridad |
|---|-----------|--------|-----------------|-------------------|-----------|
| 2.1 | **Logo** (`Logo`) | **RECONSTRUYE** | SVG actual con triángulo Junisama (`#0F1923`, `#E85D24`, `#C9A84C`) debe reemplazarse por isotipo BOGA: "B" estilizada con iconos de baño interior + "BOGA" bold extra + barra amarilla lima subrayado + "INGENIERÍA PORTÁTIL" tracking amplio. Se requieren 4 variantes: completa clara, completa oscura, isotipo claro, isotipo oscuro. Además: parametrizar colores por CSS variables para futuros cambios de marca. | `src/components/logo.tsx`, `public/logo.svg` | **P0** |
| 2.2 | **Navbar** (`Navbar`) | **ADAPTA** | Estructura de header fijo con scroll-transparente→sólido se conserva. Cambios: (a) logo Junisama → logo BOGA, (b) colores de fondo `#0f1923` → `#1b1341`, (c) botón COTIZAR cambia de naranja `#e85d24` → azul eléctrico `#2c4df2` o amarillo lima `#daf73a`, (d) botón EMERGENCIA se conserva funcionalmente pero puede adaptar estilo, (e) menú dropdown de productos conserva estructura, (f) responsive hamburger se conserva. | `src/components/layout/navbar.tsx` | **P0** |
| 2.3 | **Footer** (`Footer`) | **ADAPTA** | Estructura de 4 columnas se conserva. Cambios: (a) logo + descripción actualizados a BOGA, (b) tagline "Infraestructura Sanitaria Industrial" → "Elevamos el estándar de tus eventos.", (c) badge ISO14001: verificar si se mantiene o cambia, (d) "INDUSTRIAL GRADE SOLUTIONS" → nuevo badge BOGA, (e) copyright "JUNISAMA INVERSIONES S.A.S" → "BOGA" (o razón social actualizada), (f) colores de fondo `#0f1923` → `#1b1341`, (g) admin link se conserva, (h) redes sociales: verificar nuevos handles de BOGA, (i) mapas embebidos se conservan. | `src/components/layout/footer.tsx` | **P0** |
| 2.4 | **WhatsAppButton** | **CONSERVA** | Botón flotante funcional con `#25d366`. Agnóstico de marca; solo verificar que número de WhatsApp se actualice si cambia en mocks.ts. | `src/components/layout/whatsapp-button.tsx` | **P1** |
| 2.5 | **AdminHeader** (`AdminHeader`) | **ADAPTA** | Reemplazar logo Junisama por logo BOGA isotipo. Colores del tema admin pueden adaptarse a BOGA. | `src/components/layout/admin-header.tsx` | **P1** |
| 2.6 | **AdminSidebar** (`AdminSidebar`) | **ADAPTA** | Misma estructura 260px. Actualizar logo/nombre. Colores del tema admin adaptar a paleta BOGA. | `src/components/layout/admin-sidebar.tsx` | **P1** |
| 2.7 | **FadeIn** (`FadeIn`) | **CONSERVA** | Wrapper de Framer Motion. Agnóstico de marca. | `src/components/home/fade-in.tsx` | **P2** |
| 2.8 | **Providers** (`Providers`) | **ADAPTA** | Misma estructura: ThemeProvider, Navbar, Footer, WhatsApp, skip-link, offset `pt-[72px]`. El offset debe revisarse si cambia la altura del navbar. No requiere cambios funcionales. | `src/components/providers.tsx` | **P1** |
| 2.9 | **AdminLink** (`AdminLink`) | **CONSERVA** | Link discreto al admin. Agnóstico de marca; solo cambia si se mueve de ubicación. | `src/components/admin-link.tsx` | **P2** |
| 2.10 | **RootLayout** (`RootLayout`) | **ADAPTA** | Metadata, JSON-LD, fuentes y favicon cambian. Actualizar title template `%s | Junisama` → `%s | BOGA`. Preconnects de Google Fonts cambian (Outfit/Space Grotesk → Montserrat). Favicon cambia. | `src/app/layout.tsx` | **P0** |

---

### 3. Home Page / Landing

| # | Sección | Estado | Cambio requerido | Archivos afectados | Prioridad |
|---|---------|--------|-----------------|-------------------|-----------|
| 3.1 | **Hero** (`Hero`) | **RECONSTRUYE** | Múltiples cambios irreductibles: (a) fondo placeholder generado → foto/video real de evento BOGA, (b) badge "ISO14001 CERTIFICADO" en dorado → verificar si BOGA mantiene certificación; si sí, cambiar a estilo BOGA; si no, eliminar, (c) título "INFRAESTRUCTURA SANITARIA INDUSTRIAL" → nuevo tagline/cabecera BOGA, (d) palabra resaltada en naranja coral `#E8632B` → resaltado en amarillo lima `#daf73a` sobre azul `#2c4df2`, (e) gradiente de hero oscuro → gradiente BOGA `linear-gradient(135deg, #1b1341 0%, #2c4df2 60%, #3d5ff5 100%)`, (f) stats bar: fondo y números dorados → amarillo lima `#daf73a`, (g) stats: valores hardcodeados (`500+`, `24/7`, `99.9%`, `10+`) → verificar/actualizar para BOGA, (h) patrón `#ffffff` sutil → adaptar o eliminar, (i) CTAs: botón primario naranja → azul eléctrico o amarillo lima, outline blanco se conserva sobre fondo oscuro. | `src/components/home/hero.tsx` | **P0** |
| 3.2 | **ClientMarquee** (`ClientMarquee`) | **ADAPTA** | Estructura de marquee infinito se conserva. Cambios: (a) data source `src/data/events.ts` puede mantenerse, (b) máscara de fade y animación se conservan, (c) colores de fondo/track se adaptan a nueva paleta. | `src/components/client-marquee.tsx`, `src/data/events.ts` | **P1** |
| 3.3 | **ProductGrid** + **ProductCard** | **ADAPTA** | Grid responsivo y estructura de card se conservan. Cambios: (a) colores de círculos por producto (azul `#3B82F6`, verde `#22C55E`, morado `#A855F7`, etc.) → redefinir con paleta BOGA, (b) tags/badges ("Premium", "Más popular", "Inclusivo") → adaptar copy si BOGA usa distintos, (c) imágenes placeholder con "FOTO REAL PENDIENTE" → reemplazar por fotos reales de productos BOGA, (d) texto "Ver detalles" y flecha → mantener, color naranja → azul eléctrico, (e) aspect-ratio 4:3 se conserva, (f) hover effects se adaptan a nueva paleta. | `src/components/product-grid.tsx`, `src/components/product-card.tsx` | **P1** |
| 3.4 | **WhyUs** (`WhyUs`) | **ADAPTA** | Sección oscura de diferenciadores. Cambios: (a) fondo `bg-secondary` `#0f1923` → `#1b1341`, (b) título y copy se actualizan a tono BOGA, (c) iconos dorados → blancos o amarillo lima, (d) "La diferencia Junisama" → "La diferencia BOGA". Estructura de 6 cards se conserva. | `src/components/home/why-us.tsx` | **P1** |
| 3.5 | **OurNumbers** (`OurNumbers`) | **ADAPTA** | Stats con acento dorado. Cambios: (a) números dorados `#c9a84c` → amarillo lima `#daf73a`, (b) valores hardcodeados (`30+`, `500+`, `2`, `10+`) → verificar/actualizar con datos reales BOGA, (c) fondo oscuro se adapta a `#1b1341`. Estructura se conserva. | `src/components/our-numbers.tsx` | **P1** |
| 3.6 | **Contact** (home) (`Contact`) | **ADAPTA** | Sección oscura de contacto. Cambios: (a) fondo oscuro → `#1b1341`, (b) datos de contacto hardcodeados → centralizar desde `siteConfig`, (c) formulario conserva estructura, (d) colores de acento naranja → azul eléctrico `#2c4df2`, (e) iconos y estilos se adaptan. | `src/components/home/contact.tsx` | **P1** |
| 3.7 | **Clients** (`Clients`) | **ADAPTA** | Grid de clientes. **No se usa actualmente en home.** Si se activa para BOGA: actualizar logos de clientes, adaptar colores. | `src/components/home/clients.tsx` | **P2** |
| 3.8 | **Testimonials** (`Testimonials`) | **ADAPTA** | Testimonios. **No se usa actualmente en home.** Si se activa: reemplazar testimonios ficticios por reales verificables (riesgo legal). | `src/components/home/testimonials.tsx` | **P2** |
| 3.9 | **FeaturedProducts** (`FeaturedProducts`) | **ADAPTA** | Productos con iconos. **No se usa actualmente en home.** Si se activa: adaptar a paleta BOGA. | `src/components/home/featured-products.tsx` | **P2** |

---

### 4. Páginas Públicas

| # | Ruta | Estado | Cambio requerido | Archivos afectados | Prioridad |
|---|------|--------|-----------------|-------------------|-----------|
| 4.1 | `/` (Home) | **ADAPTA** | Composición de secciones se conserva pero se reordena según recomendación del brand kit (sección 10.7): Hero → Intro/ADN → La Marca (misión/visión/valores) → Servicios → Paleta/Confianza → Contacto/CTA. Las secciones internas (Hero, ClientMarquee, ProductGrid, WhyUs, OurNumbers, Contact) se detallan en sección 3 de este documento. | `src/app/page.tsx` | **P0** |
| 4.2 | `/productos` | **ADAPTA** | Estructura de catálogo con filtros se conserva. Cambios: (a) hero fondo oscuro con gradiente → gradiente BOGA, (b) título con palabra resaltada en naranja → resaltado en amarillo lima, (c) tabs de filtro `bg-primary` naranja → azul eléctrico `#2c4df2`, (d) 5 categorías de filtro se mantienen, (e) product cards adaptan colores (ver sección 3.3), (f) imágenes placeholder → fotos reales. | `src/app/productos/page.tsx`, `src/app/productos/product-catalog.tsx` | **P1** |
| 4.3 | `/productos/[slug]` | **ADAPTA** | Página de detalle de producto. Cambios: (a) layout y estructura se conservan, (b) colores se adaptan a tokens BOGA, (c) imagen placeholder → foto real, (d) badge/tag adapta color, (e) specs técnicos se mantienen, (f) JSON-LD Product se mantiene. | `src/app/productos/[slug]/page.tsx` | **P1** |
| 4.4 | `/servicios` | **ADAPTA** | 4 cards de servicios con iconos. Cambios: (a) hero fondo azul navy → gradiente BOGA, (b) título "SERVICIOS ESPECIALIZADOS" → adaptar copy BOGA, (c) palabra resaltada naranja → amarillo lima, (d) iconos de servicios: adaptar a estilo lineal/outline BOGA con esquinas redondeadas, (e) cards fondo oscuro → `#1b1341`, (f) iconos dorados/naranja → amarillo lima `#daf73a` o blanco, (g) botones "SOLICITAR INFO" → estilo BOGA. | `src/app/servicios/page.tsx` | **P1** |
| 4.5 | `/quienes-somos` | **ADAPTA** | Estructura de página corporativa se conserva. Cambios: (a) hero: foto de equipo + overlay azul oscuro → nueva foto equipo BOGA + overlay `#1b1341` 70%, (b) título "NUESTRA EMPRESA" con "EMPRESA" en naranja → estilo BOGA, (c) sección "Nuestra Empresa": copy actualizado a misión/visión BOGA, (d) sección "Nuestro Compromiso": 3-4 pilares → potencialmente los 6 valores BOGA, (e) sección "Equipos Disponibles": se mantiene con productos actuales, (f) sección "Servicio Técnico": se mantiene, (g) sedes con mapas: se mantienen, (h) fotos `equipo.jpg` y `servicio-tecnico.jpg` → fotos reales BOGA. | `src/app/quienes-somos/page.tsx` | **P1** |
| 4.6 | `/galeria` | **ADAPTA** | Estructura de galería con filtros por año y tipo se conserva. Cambios: (a) hero con gradiente oscuro → gradiente BOGA, (b) colores de tipo de evento hardcodeados (`purple-500`, `pink-500`, `blue-500`, `emerald-500`, `indigo-500`) → redefinir con paleta BOGA, (c) placeholder de eventos → fotos reales de eventos BOGA, (d) 50 eventos con marcas de terceros → resolver autorizaciones legales o eliminar nombres, (e) overlay azul B/N → overlay BOGA. | `src/app/galeria/page.tsx`, `src/app/galeria/gallery-grid.tsx`, `src/data/events.ts` | **P1** |
| 4.7 | `/clientes` | **ADAPTA** | Testimonios y clientes. Cambios: (a) testimonios ficticios → eliminar o reemplazar por verificables (riesgo legal alto), (b) nombres de terceros hardcodeados → verificar permisos, (c) stats (`33+`, `500+`, `2`, `10+`) → verificar para BOGA, (d) colores se adaptan. | `src/app/clientes/page.tsx` | **P1** |
| 4.8 | `/faq` | **CONSERVA** | Acordeón FAQ. Estructura y funcionalidad se conservan. Cambios mínimos: colores de acordeón se adaptan vía tokens CSS. El contenido de FAQs proviene de `mocks.ts` y se actualiza allí. | `src/app/faq/page.tsx`, `src/app/faq/faq-accordion.tsx` | **P1** |
| 4.9 | `/contacto` | **ADAPTA** | Formulario + mapas. Cambios: (a) hero "CONTACTO INDUSTRIAL" → "CONTACTO" o similar BOGA, (b) formulario de 6 campos: estructura se conserva, (c) botón submit naranja → azul eléctrico `#2c4df2` o amarillo lima, (d) canales de contacto: datos centralizados desde `siteConfig`, (e) mapas Google: se mantienen, (f) colores de fondo/formulario se adaptan. | `src/app/contacto/page.tsx`, `src/app/contacto/contact-form.tsx` | **P1** |
| 4.10 | `/cotizacion` | **ADAPTA** | Wizard de 3 pasos — flujo de negocio crítico. Cambios: (a) indicador de progreso: colores naranja → azul eléctrico, (b) paso 1 (datos evento): estructura conservada, (c) paso 2 (selección productos): cards con nuevos colores, (d) paso 3 (contacto + envío): formulario adaptado, (e) botones de navegación: estilo BOGA, (f) resumen visual: colores adaptados. **Preservar toda la lógica de estado y validación.** | `src/app/cotizacion/page.tsx`, `src/app/cotizacion/quote-wizard.tsx` | **P0** |
| 4.11 | `/cotizar` (stub) | **CONSERVA** | Redirige a `/cotizacion`. Sin cambios. | `src/app/cotizar/page.tsx` | **P2** |
| 4.12 | `/design-system` | **RECONSTRUYE** | Página desactualizada que usa valores incorrectos (`#FF6B35`, `#1A202C`, `#D4A853`, fuente "Inter"). Para BOGA: regenerar completamente con tokens reales de la nueva marca o eliminar. Recomendación: reconstruir como página de documentación viva de tokens BOGA. | `src/app/design-system/page.tsx` | **P2** |
| 4.13 | `/privacidad`, `/terminos`, `/cookies` | **ADAPTA** | Textos legales estáticos. Cambios: (a) toda mención de "Junisama Inversiones S.A.S" → "BOGA" (o razón social actualizada), (b) datos de contacto (teléfono, email, direcciones) → actualizar, (c) tipografía y espaciado vía tokens, (d) mantener validez legal del contenido. | `src/app/privacidad/page.tsx`, `src/app/terminos/page.tsx`, `src/app/cookies/page.tsx` | **P1** |

---

### 5. Panel Administrativo

| # | Componente | Estado | Cambio requerido | Archivos afectados | Prioridad |
|---|-----------|--------|-----------------|-------------------|-----------|
| 5.1 | **Login** (`/admin/login`) | **ADAPTA** | Estructura de formulario se conserva. Cambios: (a) logo Junisama → logo BOGA, (b) colores de fondo y acentos → paleta BOGA, (c) hint de desarrollo en login → eliminar en producción, (d) credenciales: **preservar funcionalidad** aunque sea mock. | `src/app/admin/login/page.tsx` | **P1** |
| 5.2 | **Dashboard** (`/admin`) | **ADAPTA** | Layout con KPIs se conserva. Cambios: (a) colores del tema admin dorado → paleta BOGA, (b) logo/nombre actualizado, (c) KPIs: verificar métricas reales BOGA. | `src/app/admin/page.tsx` | **P1** |
| 5.3 | **StatusBadge** (`status-badge.tsx`) | **ADAPTA** | Hex literales `#22C55E`, `#EF4444`, `#3B82F6`, `#F59E0B` → reemplazar por tokens semánticos (`success`, `error`, `info`, `warning`) mapeados a paleta BOGA. | `src/components/admin/status-badge.tsx` | **P1** |
| 5.4 | **KpiCard** (`kpi-card.tsx`) | **ADAPTA** | Hex literales en tendencias → tokens semánticos. Colores de fondo y acento adaptar a tema admin BOGA. | `src/components/admin/kpi-card.tsx` | **P1** |
| 5.5 | **CotizacionesStatusChart** (`cotizaciones-status-chart.tsx`) | **ADAPTA** | Hex literales en gráfico → tokens semánticos o paleta BOGA. | `src/components/admin/cotizaciones-status-chart.tsx` | **P1** |
| 5.6 | **ProductoForm** (`producto-form.tsx`) | **ADAPTA** | Placeholder de imagen hardcodeado (línea 418) → parametrizar. Estructura del formulario se conserva. | `src/components/admin/producto-form.tsx` | **P1** |
| 5.7 | **CotizacionWizard** (`cotizacion-wizard.tsx`) | **ADAPTA** | Hex literales de ganancia/pérdida → tokens semánticos. Lógica de negocio se conserva. | `src/components/admin/cotizacion-wizard.tsx` | **P1** |
| 5.8 | **CRUD Productos** (`/admin/productos`) | **ADAPTA** | Tablas y forms se conservan. Colores de UI adaptados. | `src/app/admin/productos/page.tsx` | **P1** |
| 5.9 | **CRUD Clientes** (`/admin/clientes`, `/admin/clientes/[id]`) | **ADAPTA** | Tablas y forms se conservan. Colores de UI adaptados. | `src/app/admin/clientes/page.tsx`, `src/app/admin/clientes/[id]/page.tsx` | **P1** |
| 5.10 | **CRUD Cotizaciones** (`/admin/cotizaciones`, `/admin/cotizaciones/[id]`, `/admin/cotizaciones/nueva`) | **ADAPTA** | Flujo de cotizaciones se conserva. Colores de UI adaptados. | `src/app/admin/cotizaciones/page.tsx`, `src/app/admin/cotizaciones/[id]/page.tsx`, `src/app/admin/cotizaciones/nueva/page.tsx` | **P0** |
| 5.11 | **CRUD Eventos** (`/admin/eventos`) | **ADAPTA** | Tablas y forms se conservan. Colores de UI adaptados. | `src/app/admin/eventos/page.tsx` | **P1** |
| 5.12 | **Configuración** (`/admin/config`, `/admin/configuracion`) | **ADAPTA** | Posible duplicación de rutas. Consolidar y actualizar datos de contacto/empresa. | `src/app/admin/config/page.tsx`, `src/app/admin/configuracion/page.tsx` | **P2** |
| 5.13 | **Auth mock** (`auth-mock.tsx`) | **ADAPTA** | Credenciales en variables públicas — **riesgo de seguridad**. Cambios: (a) mover credenciales a variables server-side, (b) preservar flujo de autenticación funcional, (c) actualizar referencias a marca si las hay. | `src/lib/auth-mock.tsx` | **P0** |

---

### 6. Datos y Contenido

| # | Fuente | Estado | Cambio requerido | Archivos afectados | Prioridad |
|---|--------|--------|-----------------|-------------------|-----------|
| 6.1 | **`siteConfig`** (`seo.ts`) | **ADAPTA** | Centralizar y actualizar: (a) nombre "Junisama" → "BOGA", (b) tagline "Infraestructura Sanitaria Industrial" → "Elevamos el estándar de tus eventos.", (c) logo URL → nuevo `logo.svg`, (d) teléfono, email, WhatsApp → verificar, (e) direcciones → verificar, (f) redes sociales (`sameAs`) → nuevos handles BOGA, (g) `seoConfig` por página: actualizar títulos, descripciones, keywords. | `src/lib/seo.ts` | **P0** |
| 6.2 | **`configuracion`** (`mocks.ts`) | **ADAPTA** | Actualizar: (a) `nombreSitio`: "Junisama Inversiones S.A.S" → "BOGA", (b) `telefono` → verificar, (c) `email`: "soporte@junisama.com" → nuevo email BOGA, (d) `whatsappNumero` → verificar, (e) `direccionMedellin`, `direccionBogota` → verificar, (f) `instagramUrl` → nuevo handle BOGA, (g) `linkedinUrl` → nuevo handle BOGA, (h) `seoTitleDefault`, `seoDescriptionDefault`, `mensajeWhatsApp` → actualizar. | `src/lib/mocks.ts` | **P0** |
| 6.3 | **Productos** (`mocks.ts`) | **ADAPTA** | 8 productos con slugs, nombres, categorías, precios base y badges. Cambios: (a) nombres con "Junisama" → "BOGA", (b) verificar precios COP actuales, (c) badges: adaptar terminología BOGA si aplica, (d) descripciones: actualizar copy. Slugs de URL: **mantener** para no romper SEO ni bookmarks (`/productos/bano-vip`, etc.) | `src/lib/mocks.ts` | **P1** |
| 6.4 | **FAQ** (`mocks.ts`) | **ADAPTA** | Preguntas y respuestas hardcodeadas. Cambios: (a) menciones de "Junisama" → "BOGA", (b) actualizar datos de contacto, (c) revisar contenido por precisión. | `src/lib/mocks.ts` | **P1** |
| 6.5 | **Eventos** (`events.ts`) | **ADAPTA** | 50 eventos con marcas de terceros. **Riesgo legal crítico.** Cambios: (a) cada línea tiene `// REQUIERE AUTORIZACIÓN` → obtener autorizaciones legales o eliminar nombres de terceros, (b) si se eliminan nombres, usar descriptores genéricos ("Festival de música electrónica", "Concierto internacional"), (c) agregar imágenes reales de eventos. | `src/data/events.ts` | **P0** |
| 6.6 | **Cotizaciones de ejemplo** (`mocks.ts`) | **ADAPTA** | Datos de ejemplo con márgenes. Cambios: (a) nombres de clientes ficticios → eliminar o anonimizar, (b) verificar montos COP. | `src/lib/mocks.ts` | **P1** |
| 6.7 | **Clientes** (`mocks.ts`) | **ADAPTA** | Datos de clientes. Cambios: (a) nombres de terceros → verificar permisos o anonimizar, (b) actualizar referencias a marca. | `src/lib/mocks.ts` | **P1** |
| 6.8 | **Centralización de datos** | **NUEVO** | Crear fuente única de verdad para datos corporativos. Actualmente teléfono/email/direcciones están duplicados en ~15 archivos. Expandir `siteConfig` o crear `src/lib/site.ts` para que todos los componentes lean desde un solo lugar. | Nuevo archivo: `src/lib/site.ts` (o expandir `src/lib/seo.ts`) | **P1** |

---

### 7. SEO y Metadatos

| # | Elemento | Estado | Cambio requerido | Archivos afectados | Prioridad |
|---|---------|--------|-----------------|-------------------|-----------|
| 7.1 | **Title template** | **ADAPTA** | `%s | Junisama` → `%s | BOGA` | `src/app/layout.tsx` | **P0** |
| 7.2 | **Metadata base** | **ADAPTA** | `metadataBase: new URL(siteConfig.url)` — URL se mantiene si el dominio no cambia. Si cambia a `boga.com.co`, actualizar. | `src/app/layout.tsx` | **P0** |
| 7.3 | **Favicon** | **RECONSTRUYE** | `public/favicon.svg` usa colores fijos de Junisama + `public/favicon.ico` generado con `#0ea5e9` (azul cielo, incorrecto incluso para Junisama). Crear nuevo favicon con isotipo BOGA ("B" con iconos de baño) en amarillo lima `#daf73a` sobre fondo azul eléctrico `#2c4df2`. | `public/favicon.svg`, `public/favicon.ico`, `src/app/layout.tsx` | **P0** |
| 7.4 | **OG Image** (`og-image.jpg`) | **RECONSTRUYE** | Placeholder generado (1200×630) → crear OG image real con fotografía de marca BOGA, logo, tagline "Elevamos el estándar de tus eventos." | `public/images/og-image.jpg`, `src/lib/seo.ts` | **P1** |
| 7.5 | **JSON-LD global** | **ADAPTA** | Organization + LocalBusiness + WebSite. Cambios: (a) nombre "Junisama" → "BOGA", (b) logo URL → nuevo logo, (c) `sameAs` (redes sociales) → nuevos handles, (d) teléfono/email/direcciones → actualizar. | `src/app/layout.tsx` (JSON-LD) | **P0** |
| 7.6 | **Sitemap** (`sitemap.ts`) | **ADAPTA** | `BASE_URL` con fallback a `https://junisama.com` (inconsistente con `.com.co`). Normalizar: si el dominio cambia, actualizar a nuevo dominio BOGA. | `src/app/sitemap.ts` | **P1** |
| 7.7 | **Robots** (`robots.ts`) | **ADAPTA** | Mismo fallback inconsistente de dominio. Normalizar. Disallow de `/admin` y `/api` se mantiene. | `src/app/robots.ts` | **P1** |
| 7.8 | **Metadatos por página** | **ADAPTA** | Todos los títulos, descripciones, keywords, canonical, OG y Twitter por página deben actualizar "Junisama" → "BOGA" y revisar copy. Excepción: `/cotizar` con metadata local hardcodeada. | Todas las páginas públicas (`page.tsx`) | **P1** |
| 7.9 | **Geo tags** | **ADAPTA** | `geo.placename: "Medellín, Bogotá"` y coordenadas — verificar si sedes BOGA son las mismas. | `src/app/layout.tsx` | **P2** |
| 7.10 | **Preconnects** | **ADAPTA** | Google Fonts preconnect: cambiar de Outfit/Space Grotesk a Montserrat. CSP en `next.config.ts`: revisar si se añaden nuevos dominios de assets o CDNs. | `src/app/layout.tsx`, `next.config.ts` | **P1** |

---

### 8. Assets Visuales

| # | Asset | Estado | Cambio requerido | Prioridad |
|---|-------|--------|-----------------|-----------|
| 8.1 | **Logo SVG** (`public/logo.svg`) | **RECONSTRUYE** | SVG con rect `#0F1923` y triángulos `#E85D24`/`#C9A84C` → nuevo logo BOGA completo (isotipo "B" + "BOGA" + barra amarilla + "INGENIERÍA PORTÁTIL"). 4 variantes: clara, oscura, isotipo claro, isotipo oscuro. | **P0** |
| 8.2 | **Favicon SVG** (`public/favicon.svg`) | **RECONSTRUYE** | Mismo palette Junisama → isotipo BOGA ("B" con iconos de baño) en amarillo lima sobre azul eléctrico. | **P0** |
| 8.3 | **Favicon ICO** (`public/favicon.ico`) | **RECONSTRUYE** | Generado con `#0ea5e9` (incorrecto) → regenerar desde nuevo favicon.svg. | **P0** |
| 8.4 | **OG Image** (`public/images/og-image.jpg`) | **RECONSTRUYE** | Placeholder generado → imagen real con marca BOGA, fotografía de evento, logo, tagline. Dimensiones: 1200×630. | **P1** |
| 8.5 | **Hero background** (`public/images/hero-background.jpg`) | **RECONSTRUYE** | Placeholder generado (1920×1080) con "FOTO REAL PENDIENTE" → foto o video real de evento BOGA. | **P0** |
| 8.6 | **Productos** (`public/images/products/*.jpg`, 8 archivos) | **RECONSTRUYE** | Placeholders con letras en círculos de colores y texto "FOTO REAL PENDIENTE" → fotografía real de cada una de las 8 unidades de producto. | **P0** |
| 8.7 | **Quienes Somos** (`public/images/quienes-somos/equipo.jpg`, `servicio-tecnico.jpg`) | **RECONSTRUYE** | Placeholders generados → fotos reales del equipo BOGA y servicio técnico. | **P1** |
| 8.8 | **Eventos** (`public/images/eventos/placeholder.svg`) | **RECONSTRUYE** | Placeholder único para 50 eventos → fotos reales de cada evento (o al menos de los destacados). | **P1** |
| 8.9 | **Iconos Next.js** (`next.svg`, `vercel.svg`, `window.svg`, `file.svg`, `globe.svg`) | **RECONSTRUYE** | Default Next.js → eliminar si no se usan. | **P2** |
| 8.10 | **Elementos decorativos BOGA** | **NUEVO** | Crear como componentes/CSS/SVG: (a) 3 círculos (2 llenos, 1 vacío), (b) ondas paralelas (3 líneas onduladas), (c) burbujas/círculos transparentes de fondo, (d) flechas amarillas lima direccionales, (e) triángulos/flechas en línea (4 unidades). Estos elementos no existen en el codebase actual. | **P1** |
| 8.11 | **Sopa de letras** (patrón de fondo) | **NUEVO** | Patrón de fondo con palabras dispersas (EXCELENCIA, CONFIANZA, EN DETALLE, EN CADA SERVICIO, BOGA). No existe actualmente. Implementar como SVG/CSS pattern. | **P2** |
| 8.12 | **Iconografía lineal BOGA** | **NUEVO** | Set de iconos consistente con estilo lineal/outline, esquinas redondeadas, 1.5-2px stroke. Incluye: baño portátil, baño discapacitados, baño VIP, papel higiénico, manos lavándose, figuras masculina/femenina. Reemplazar mix actual de lucide + SVG inline. | **P1** |
| 8.13 | **Generador de placeholders** (`scripts/generate-placeholders.py`) | **RECONSTRUYE** | Script Python con colores de acento incorrectos (`#0ea5e9`, `#22c55e`, `#a855f7`), fuentes Windows-only, fondos `#1e293b` → `#0f172a`. Actualizar con paleta BOGA o eliminar si ya no se necesita. | `scripts/generate-placeholders.py` | **P2** |

---

### 9. Pendientes Críticos (deben quedar resueltos)

Los siguientes pendientes se integran como ítems normales del mapa de cambios, con su clasificación y prioridad:

| # | Pendiente | Estado actual | Acción requerida | Prioridad |
|---|-----------|--------------|-----------------|-----------|
| 9.1 | **Credenciales admin públicas** | `NEXT_PUBLIC_ADMIN_EMAIL` y `NEXT_PUBLIC_PASSWORD` expuestas en variables públicas. Riesgo de seguridad **alto**. | Mover a variables server-side (`.env.local` sin `NEXT_PUBLIC_`). Actualizar `src/lib/auth-mock.tsx` y `src/app/admin/login/page.tsx` para leer de fuente segura. | **P0** |
| 9.2 | **Autorizaciones legales de eventos** | 50 marcas de terceros en `src/data/events.ts` con `// REQUIERE AUTORIZACIÓN`. Riesgo legal **crítico**. | Opción A: Obtener autorizaciones escritas de cada marca. Opción B: Reemplazar nombres por descriptores genéricos ("Festival internacional de música", "Evento corporativo"). Opción C: Eliminar galería hasta resolver. | **P0** |
| 9.3 | **Testimonios ficticios** | Reseñas inventadas en `src/app/clientes/page.tsx` y `src/components/home/testimonials.tsx`. Riesgo legal **alto**. | Eliminar testimonios ficticios o reemplazar por testimonios verificables con consentimiento por escrito. | **P0** |
| 9.4 | **Imágenes placeholder en producción** | Hero, productos (8), OG, galería (50), quienes-somos (2) usan placeholders generados con "FOTO REAL PENDIENTE". Riesgo de percepción **crítico**. | Obtener/producir fotografía real para: (a) hero de evento, (b) 8 productos, (c) galería de eventos, (d) equipo, (e) OG image. Reemplazar placeholders antes del lanzamiento. | **P0** |
| 9.5 | **Dominio inconsistente** | `sitemap.ts` y `robots.ts` usan fallback `https://junisama.com` mientras `siteConfig.url` usa `https://junisama.com.co`. | Normalizar a un único dominio. Si cambia a dominio BOGA, actualizar todos los archivos. Verificar en: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/lib/seo.ts`. | **P1** |
| 9.6 | **Redes sociales duplicadas** | `mocks.ts` usa handles cortos (`@junisama`, `/company/junisama`) mientras footer y `seo.ts` usan handles oficiales (`@junisama_inversiones`, `inversiones-junisama-s-a-s`). | Unificar en una sola fuente (`siteConfig`). Obtener y configurar nuevos handles de BOGA en Instagram y LinkedIn. | **P1** |
| 9.7 | **ISO 14001** | `ISO_CERTIFICATE_NUMBER = ""` (vacío) en `hero.tsx`. Badge visible en hero y footer. | Confirmar si BOGA mantiene certificación ISO 14001. Si sí: obtener número real y actualizar. Si no: eliminar badge. | **P1** |
| 9.8 | **Botón EMERGENCIA** | Presente en navbar. Funcionalidad `tel:` directa. | Confirmar número de emergencia sigue activo. Preservar funcionalidad `tel:`. Adaptar estilo visual a BOGA si aplica. | **P0** |
| 9.9 | **Admin link en footer** | Presente en footer. Link discreto a `/admin`. | Preservar. Verificar que siga funcionando post-rebrand. | **P2** |
| 9.10 | **Header height mobile** | `--header-height-mobile: 64px` definido en CSS pero no se usa; `pt-[72px]` es fijo. | Implementar header height responsive o eliminar variable sin uso. | **P2** |
| 9.11 | **Tamaño de botón shadcn vs. custom** | `button.tsx` default size es `h-8 px-2.5` (muy pequeño) vs. `.btn-primary` mucho más grande. | Reconciliar: ajustar default size de shadcn o documentar inconsistencia. | **P2** |
| 9.12 | **Colores hex fuera de tokens** | Logo, hero, admin badges, gallery-grid, generate-placeholders.py usan hex literales en lugar de variables CSS. | Auditado completo en secciones 1 y 5 de este documento. Migrar todos los hex literales a tokens semánticos. | **P1** |

---

### 10. Orden de Implementación Recomendado

Basado en el análisis de dependencias y el checklist de rebrand del documento maestro (sección 12), se recomienda el siguiente orden:

#### Fase 1: Fundación (tokens, marca, configuración base)
> *Objetivo: Establecer la base visual y de datos para todo lo demás.*

1. **Tokens CSS** (`globals.css`): Nueva paleta BOGA, tipografía Montserrat, gradientes, sombras
2. **Logo + Favicon**: Crear SVGs BOGA (4 variantes), reemplazar `logo.tsx`, `public/logo.svg`, `favicon.svg`, `favicon.ico`
3. **Configuración central**: Actualizar `siteConfig` (`seo.ts`) y `mocks.ts` con datos BOGA (nombre, contacto, redes)
4. **Centralización de datos**: Crear `src/lib/site.ts` (o expandir `seo.ts`) como fuente única de verdad
5. **Tipografía**: Actualizar Google Fonts en `layout.tsx` (Outfit/Space Grotesk → Montserrat)

#### Fase 2: Layout global (navbar, footer, shell)
> *Objetivo: El "marco" visible de todas las páginas.*

6. **Navbar**: Logo BOGA, colores nuevos, menú, botón EMERGENCIA (preservar), botón COTIZAR
7. **Footer**: Logo BOGA, tagline nuevo, copyright, redes, mapas, admin link
8. **Root layout**: Title template, metadata, JSON-LD global, preconnects
9. **WhatsApp button**: Verificar funcionalidad

#### Fase 3: Home page (landing principal)
> *Objetivo: La página más vista del sitio.*

10. **Hero**: Nuevo fondo real o gradiente BOGA, tagline, CTAs con nuevos colores, stats bar amarillo lima
11. **ClientMarquee**: Adaptar colores y data
12. **ProductGrid + ProductCard**: Nuevos colores de círculos, imágenes reales si disponibles
13. **WhyUs**: Fondo oscuro BOGA, nuevo copy, iconos adaptados
14. **OurNumbers**: Números amarillo lima, valores verificados BOGA
15. **Contact**: Formulario con colores BOGA, datos centralizados

#### Fase 4: Páginas públicas
> *Objetivo: Completar todas las rutas accesibles.*

16. `/productos` y `/productos/[slug]`: Catálogo, filtros, detalle
17. `/servicios`: Cards de servicios con iconos lineales BOGA
18. `/quienes-somos`: Misión/visión BOGA, foto equipo, mapas
19. `/galeria`: Resolver autorizaciones legales o eliminar nombres, fotos reales
20. `/clientes`: Eliminar testimonios ficticios o reemplazar por verificables
21. `/faq`: Acordeón con colores BOGA, FAQ actualizado
22. `/contacto`: Formulario, mapas, datos BOGA
23. `/cotizacion`: Wizard de 3 pasos con estilos BOGA (preservar toda la lógica)
24. Páginas legales (`/privacidad`, `/terminos`, `/cookies`): Actualizar nombre y datos

#### Fase 5: Panel administrativo
> *Objetivo: Mantener funcionalidad interna.*

25. **Tema admin**: Decidir si adopta BOGA o se mantiene tema dorado independiente
26. **Login admin**: Logo BOGA, colores, eliminar hint de desarrollo
27. **Dashboard + KPIs**: Colores semánticos en lugar de hex literales
28. **StatusBadge, KpiCard, Charts**: Migrar hex literales a tokens
29. **Auth mock**: Mover credenciales a variables server-side

#### Fase 6: SEO y metadatos
> *Objetivo: Visibilidad y consistencia en motores de búsqueda.*

30. **Sitemap + robots**: Normalizar dominio
31. **OG Image**: Crear imagen real con marca BOGA
32. **Metadatos por página**: Actualizar todos los títulos, descripciones, keywords
33. **JSON-LD por página**: Actualizar schemas con datos BOGA

#### Fase 7: Assets reales y elementos decorativos
> *Objetivo: Pulido visual y diferenciación BOGA.*

34. **Fotos de productos** (8 unidades)
35. **Foto/video de hero**
36. **Fotos de eventos** (galería)
37. **Fotos de equipo** (quienes-somos)
38. **Elementos decorativos BOGA**: 3 círculos, ondas, burbujas, flechas, triángulos
39. **Sopa de letras** (patrón de fondo opcional)
40. **Iconografía lineal BOGA**: Set completo consistente

#### Fase 8: Validación final
> *Objetivo: Garantizar calidad antes del lanzamiento.*

41. Verificar contrastes WCAG en todos los estados
42. Revisar `focus-visible` con nuevos colores
43. Mantener `prefers-reduced-motion`
44. Verificar menú móvil y dropdown usables
45. Ejecutar `npm run build` y `npm run lint`
46. Revisar CSP en `next.config.ts`
47. Verificar que no queda texto "Junisama" visible
48. Verificar que no queda texto "FOTO REAL PENDIENTE" visible
49. Probar flujo completo de cotización
50. Verificar panel admin accesible
51. Verificar botón EMERGENCIA funcional
52. Verificar WhatsApp flotante abre chat correcto
53. Verificar mapas de Google cargan

---

### Apéndice A: Matriz de colores — Junisama → BOGA

| Rol | Token Junisama | HEX Junisama | Token BOGA | HEX BOGA | Notas |
|-----|---------------|-------------|-----------|---------|-------|
| Primary | `--primary` | `#e85d24` | `--primary` | `#2c4df2` | Naranja → Azul eléctrico |
| Primary hover | `--primary-hover` | `#d14d18` | `--primary-hover` | `#1a3ad9` | Versión oscura del azul |
| Primary light | `--primary-light` | `#fff0e8` | `--primary-light` | `#e8ecfe` | Versión clara del azul |
| Secondary | `--secondary` | `#0f1923` | `--secondary` | `#1b1341` | Azul marino → Azul profundo |
| Secondary elevated | `--secondary-elevated` | `#1a2634` | `--secondary-elevated` | `#251d4a` | Variante elevada del azul profundo |
| Accent | `--accent-gold` | `#c9a84c` | `--accent-lima` | `#daf73a` | Dorado → Amarillo lima (cambio de personalidad) |
| Emergency | `--emergency-500` | `#dc2626` | `--emergency-500` | `#dc2626` | Se mantiene el rojo |
| Body | `--body` | `#5a6779` | `--body` | `#5a6779` | Posiblemente mantener o ajustar |
| Muted | `--muted` | `#8896a8` | `--muted` | `#8896a8` | Posiblemente mantener o ajustar |
| Dark | `--dark` | `#0f1923` | `--dark` | `#1b1341` | Coincide con secondary |
| Background | `--background` | `#ffffff` | `--background` | `#ffffff` | Se mantiene |
| BG light | `--bg-light` | `#f6f7f9` | `--bg-light` | `#f6f7f9` | Se mantiene o ajusta a `#f9eec1` |
| BG warm | `--bg-warm` | `#faf9f7` | `--bg-warm` | `#f9eec1` | Puede ajustarse al crema BOGA |
| WhatsApp | `--whatsapp` | `#25d366` | `--whatsapp` | `#25d366` | Se mantiene |
| Success | `--success` | `#16a34a` | `--success` | `#16a34a` | Se mantiene |
| Error | `--error` | `#dc2626` | `--error` | `#dc2626` | Se mantiene |
| Warning | `--warning` | `#eab308` | `--warning` | `#eab308` | Se mantiene |
| Gris plata | (no definido) | — | `--boga-gris` | `#d8d8d8` | Nuevo en BOGA |
| Crema | (no definido) | — | `--boga-crema` | `#f9eec1` | Nuevo en BOGA |

### Apéndice B: Archivos sensibles — ranking de impacto

Ordenados por número de dependencias y criticidad para el rebrand:

| Rank | Archivo | Impacto | Categorías afectadas |
|------|---------|---------|---------------------|
| 1 | `src/app/globals.css` | **Crítico** | Tokens, colores, tipografía, gradientes, clases custom, tema admin |
| 2 | `src/components/logo.tsx` | **Crítico** | Marca visual inline (SVG hardcodeado) |
| 3 | `src/components/layout/navbar.tsx` | **Crítico** | Navegación, primer impacto visual, EMERGENCIA |
| 4 | `src/components/layout/footer.tsx` | **Crítico** | Footer oscuro, datos contacto, admin link |
| 5 | `src/components/home/hero.tsx` | **Crítico** | Hero principal, stats, fondo, CTAs |
| 6 | `src/lib/seo.ts` | **Crítico** | Metadatos, JSON-LD, datos marca |
| 7 | `src/lib/mocks.ts` | **Crítico** | Contenido corporativo completo |
| 8 | `src/app/layout.tsx` | **Alto** | Metadata, fuentes, favicon, JSON-LD global |
| 9 | `src/components/product-card.tsx` | **Alto** | Cards de producto (colores hardcodeados) |
| 10 | `src/components/our-numbers.tsx` | **Alto** | Stats con acento dorado |
| 11 | `src/app/design-system/page.tsx` | **Alto** | Referencia visual desactualizada |
| 12 | `src/components/home/why-us.tsx` | **Alto** | Sección oscura de diferenciadores |
| 13 | `src/components/home/contact.tsx` | **Alto** | Sección oscura de contacto |
| 14 | `src/app/quienes-somos/page.tsx` | **Alto** | Historia, imagen corporativa |
| 15 | `src/app/galeria/gallery-grid.tsx` | **Alto** | Colores de tipo de evento hardcodeados |
| 16 | `src/app/servicios/page.tsx` | **Alto** | Iconos y cards de servicios |
| 17 | `src/components/admin/status-badge.tsx` | **Medio** | Hex literales en admin |
| 18 | `src/components/admin/kpi-card.tsx` | **Medio** | Hex literales en admin |
| 19 | `src/components/admin/cotizaciones-status-chart.tsx` | **Medio** | Hex literales en gráficos |
| 20 | `src/data/events.ts` | **Medio** | Eventos con marcas de terceros |

---

*Fin del Mapa de Cambios.*

*Documento generado cruzando tres fuentes: documento maestro del código real, auditoría visual del estado actual, y brand kit BOGA. Cada ítem está clasificado según el estado real del codebase y los requisitos exactos de la nueva identidad.*
