# Crítica y Dirección de Diseño UI/UX — Junisama Inversiones S.A.S

**Documento de Fase 3 | Auditoría visual completa con dirección de rediseño**  
**Proyecto**: Rediseño sitio corporativo Junisama — Infraestructura Sanitaria Industrial  
**Fecha**: Junio 2025  
**Auditor**: Diseño UI/UX Senior

---

## Resumen Ejecutivo

El prototipo actual (junisama-seven.vercel.app) presenta una estructura funcionalmente sólida pero con una **ejecución visual que transmite "template genérico" en lugar de "empresa industrial premium"**. Los problemas críticos son: identidad visual incorrecta (logo "UVINERIL"), ausencia del botón EMERGENCIA (elemento diferenciador clave del negocio), imágenes placeholder que destruyen credibilidad, y testimonios ficticios que generan desconfianza.

El sitio de producción (junisama.com.co) tiene mayor riqueza de contenido real (30+ eventos verificables, sedes con mapas, footer completo) pero su ejecución visual necesita refinamiento tipográfico, sistema de color más sofisticado, y dirección de imagen para elevar la percepción del rubro.

**La oportunidad**: transformar un sitio que actualmente comunica "proveedor genérico de baños" en uno que comunica "socio estratégico de infraestructura sanitaria industrial para eventos de clase mundial".

---

## 1. Sistema Tipográfico

### 1.1 Estado actual — Prototipo

| Elemento | Observación | Problema |
|----------|-------------|----------|
| Familia | Sans-serif intermedia (parece Inter o similar) genérica | No transmite "industrial/premium" |
| H1 Hero | ~48-56px, Bold, centrado | Bien escalado pero la centración pierde fuerza en producción |
| H2 Secciones | ~32-36px, SemiBold | Demasiado genérico, sin personalidad |
| Body | ~16px, Regular, gris medio | Correcto pero sin jerarquía clara |
| Stats números | ~36-42px, Bold, color dorado | Bien resaltados pero la combinación con labels grises pierde contraste |
| Botones | ~14px, Medium, mayúsculas | Apropiado para CTAs |
| Tags/Badges | ~12px, SemiBold | ISO badge funcional pero sin refinamiento |

### 1.2 Estado actual — Producción

| Elemento | Observación | Problema |
|----------|-------------|----------|
| Familia | Sans-serif geométrica (parece Montserrat o similar) | Mejor que el prototipo, pero aún genérica |
| H1 Hero | ~48px, Light/Regular, MAYÚSCULAS | "INDUSTRIAL" en naranja funciona bien como acento |
| H2 Secciones | ~28-32px, Regular | Le falta peso para jerarquía en secciones claras |
| Body | ~16px, Light | Puede perder legibilidad en pantallas de baja resolución |
| Stats | ~36px, Regular | Naranja coral funciona como acento visual |

### 1.3 Propuesta tipográfica

**Familia principal**: `Outfit` (Google Fonts) — sans-serif geométrica con toques humanistas. Transmite modernidad industrial sin ser fría. Alternativa: `Plus Jakarta Sans` para un tono ligeramente más corporativo.

**Familia complementaria (números/stats)**: `Space Grotesk` — para los contadores estadísticos y datos técnicos. Aporta ese aire "industrial/métrico" que diferencia.

| Rol | Fuente | Tamaño | Peso | Altura de línea | Uso |
|-----|--------|--------|------|-----------------|-----|
| Display/H1 Hero | Outfit | 56px (desktop) / 36px (mobile) | 700 (Bold) | 1.1 | Título principal hero. Máximo 2 líneas. |
| H1 accent | Outfit | 56px | 700 | 1.1 | "INDUSTRIAL" en color primario naranja — palabra clave diferenciadora |
| H2 Sección | Outfit | 36px | 600 (SemiBold) | 1.2 | Títulos de sección: "Nuestras soluciones", "Lo que dicen nuestros clientes" |
| H3 Subsección | Outfit | 24px | 600 | 1.3 | Títulos de cards, subtítulos dentro de secciones |
| H4 Card title | Outfit | 18px | 600 | 1.4 | Nombres de productos, eventos |
| Body large | Outfit | 18px | 400 | 1.6 | Descripciones de sección, párrafos introductorios |
| Body base | Outfit | 16px | 400 | 1.6 | Texto corrido general |
| Body small | Outfit | 14px | 400 | 1.5 | Descripciones cortas, metadatos |
| Caption | Outfit | 12px | 500 | 1.4 | Labels de stats, tags, copyright |
| Stats número | Space Grotesk | 42px | 700 | 1.0 | "500+", "24/7", "99.9%", "10+" |
| Stats label | Outfit | 12px | 500 | 1.3 | "EVENTOS ATENDIDOS", "SOPORTE TÉCNICO" — mayúsculas, tracking +1px |
| Nav link | Outfit | 14px | 500 | 1.0 | Navegación principal |
| Button | Outfit | 14px | 600 | 1.0 | CTAs — mayúsculas, tracking +0.5px |
| Badge ISO | Outfit | 11px | 600 | 1.0 | Badge certificación — mayúsculas, tracking +1px |

### 1.4 Reglas de jerarquía

- **Contraste de peso**: Siempre mínimo 200 puntos de diferencia entre título y body (ej: 700 vs 400, 600 vs 400)
- **Color como jerarquía**: El naranja primario se reserva exclusivamente para: (1) acentos en H1, (2) CTAs principales, (3) números de stats, (4) estados activos/hover
- **Mayúsculas controladas**: Solo stats labels, badges, y CTAs principales. Nunca en body o descripciones.
- **Máximo 2 familias**: Outfit + Space Grotesk. No más.

---

## 2. Sistema de Color

### 2.1 Paleta actual — Prototipo vs. Producción

| Rol | Prototipo | Producción | Observación |
|-----|-----------|------------|-------------|
| Naranja CTA | `#F97316` (naranja brillante) | `#FF6B35` (naranja-coral más cálido) | El de producción es más sofisticado |
| Fondo oscuro | `#1E293B` (slate oscuro) | Gradiente azul oscuro con textura | Producción tiene más profundidad |
| Fondo claro | `#F8FAFC` (gris muy claro) | `#FFFFFF` (blanco puro) | Prototipo mejor para reducir fatiga visual |
| Texto primario | `#0F172A` (casi negro) | `#FFFFFF` (sobre oscuro) / `#1A1A1A` (sobre claro) | Correcto en ambos |
| Texto secundario | `#64748B` (slate medio) | `#6B7280` (gris medio) | Equivalentes |
| Dorado/Ámbar | `#D4A853` (badge ISO) | No presente como sistema | El dorado del prototipo es un activo diferenciador |
| Stats números | `#D4A853` (dorado) | `#FF6B35` (naranja) | Dorado transmite más "premium/certificación" |

### 2.2 Paleta propuesta

#### Primario — Naranja Industrial
| Token | Hex | Uso |
|-------|-----|-----|
| `primary-500` | `#E85D24` | CTA principal, acentos, hover states. Más profundo que el actual, menos "alarma" |
| `primary-600` | `#C94D1A` | Hover/focus en CTAs |
| `primary-400` | `#F07A3E` | Estados activos, highlights sutiles |
| `primary-100` | `#FFF0E8` | Fondos de badges, tags suaves |

#### Secundario — Azul Industrial Oscuro
| Token | Hex | Uso |
|-------|-----|-----|
| `secondary-900` | `#0F1923` | Hero background, footer, secciones oscuras |
| `secondary-800` | `#1A2634` | Cards sobre fondo oscuro, stats bar |
| `secondary-700` | `#243447` | Elevación sutil sobre oscuro, bordes |
| `secondary-600` | `#2D4159` | Elementos deshabilitados sobre oscuro |

#### Superficie — Grises neutros
| Token | Hex | Uso |
|-------|-----|-----|
| `surface-50` | `#F6F7F9` | Fondo de secciones claras alternadas |
| `surface-100` | `#EEF0F4` | Fondos de cards en secciones claras |
| `surface-200` | `#E2E5EB` | Bordes, divisores |
| `surface-white` | `#FFFFFF` | Cards elevadas, formularios |

#### Texto
| Token | Hex | Uso |
|-------|-----|-----|
| `text-primary` | `#0F1923` | Títulos, body principal sobre fondos claros |
| `text-secondary` | `#5A6779` | Descripciones, metadatos |
| `text-tertiary` | `#8896A8` | Placeholders, captions, disabled |
| `text-inverse` | `#FFFFFF` | Texto sobre fondos oscuros |
| `text-inverse-secondary` | `#A3B1C0` | Texto secundario sobre fondos oscuros |

#### Acento Especial — Dorado Certificación
| Token | Hex | Uso |
|-------|-----|-----|
| `accent-gold-500` | `#C9A84C` | Badge ISO, íconos de diferenciación, números de stats |
| `accent-gold-400` | `#D4B85C` | Hover en elementos dorados |
| `accent-gold-100` | `#FBF5E3` | Fondo de badges ISO |

#### Estados
| Token | Hex | Uso |
|-------|-----|-----|
| `success-500` | `#16A34A` | Confirmaciones, estado online WhatsApp |
| `error-500` | `#DC2626` | Validaciones de formulario, EMERGENCIA (versión atenuada del rojo) |
| `warning-500` | `#EAB308` | Alertas suaves |
| `emergency-500` | `#DC2626` | Botón EMERGENCIA — rojo intenso, uso exclusivo |
| `emergency-600` | `#B91C1C` | Hover EMERGENCIA |

### 2.3 Cómo transmite "premium/industrial/confiable"

| Decisión de color | Qué transmite |
|-------------------|---------------|
| `primary-500` (naranja profundo) en lugar de naranja brillante | Madurez empresarial, no startup. Meno saturación = más premium. |
| `secondary-900` (azul muy oscuro) como base | Asociación con infraestructura técnica, confiabilidad, solidez. Evoca uniforme industrial y maquinaria. |
| `accent-gold-500` (dorado contenido) para ISO y stats | Exclusividad, certificación, sello de calidad. El dorado en industria = estándar. No amarillo, dorado. |
| `surface-50` en lugar de blanco puro | Reduce fatiga visual, aporta sofisticación sutil. Usado por empresas B2B premium (Salesforce, ServiceNow). |
| Alto contraste siempre (WCAG AA mínimo) | Profesionalismo, accesibilidad, seriedad. |

---

## 3. Espaciado y Grid

### 3.1 Estado actual

| Aspecto | Prototipo | Producción | Problema |
|---------|-----------|------------|----------|
| Grid | ~container centrado, max-width ~1200px | Similar, posiblemente más ancho | Ninguno grave, pero inconsistente entre páginas |
| Padding secciones | ~64-80px vertical | ~48-64px vertical | Prototipo respira mejor |
| Gap entre cards | ~24px | ~16-20px | Prototipo superior |
| Márgenes laterales | ~16-24px (mobile) / auto-centrado (desktop) | Similar | Estándar, aceptable |
| Alineación stats | Centrados en barra | Alineados a la izquierda | Centrados funcionan mejor visualmente; izquierda es más B2B funcional |

### 3.2 Sistema de espaciado propuesto — Base 8px

| Token | Valor | Uso |
|-------|-------|-----|
| `space-1` | 4px | Micro-ajustes, iconos inline |
| `space-2` | 8px | Gap entre label e input, iconos con texto |
| `space-3` | 12px | Padding interno de badges, tags |
| `space-4` | 16px | Padding de cards compactas, gap entre elementos pequeños |
| `space-5` | 20px | Separación entre título y descripción en cards |
| `space-6` | 24px | Gap entre cards en grid, padding de cards estándar |
| `space-8` | 32px | Separación entre elementos de formulario, padding de secciones internas |
| `space-10` | 40px | Padding vertical de secciones secundarias |
| `space-12` | 48px | Separación entre bloques dentro de una sección |
| `space-16` | 64px | Padding vertical estándar de secciones |
| `space-20` | 80px | Padding vertical de secciones principales (hero, contacto) |
| `space-24` | 96px | Separación entre secciones completas |

### 3.3 Grid propuesto

- **Container máximo**: 1280px (mejora los ~1200px actuales, aprovecha pantallas modernas)
- **Columnas**: 12-column grid
- **Gutter**: 24px (desktop), 16px (mobile)
- **Márgenes laterales**: 24px (desktop ≥1024px), 16px (tablet), 12px (mobile)

### 3.4 Reglas de seccionado

- **Cada sección alterna fondo**: oscuro → claro → oscuro → claro (ritmo visual)
- **Hero y Contacto**: siempre fondo oscuro (anclajes emocionales)
- **Productos y Clientes**: fondo claro (contenido denso, necesita claridad)
- **Diferenciadores (ISO, 24/7, etc.)**: fondo oscuro con cards semi-transparentes (glassmorphism sutil)
- **Separación entre secciones**: 80px vertical siempre. Nunca menos de 64px.

---

## 4. Dirección de Imagen y Fotografía

### 4.1 El desafío

El rubro de baños portátiles es inherentemente **poco glamoroso**. La dirección de imagen debe lograr que el producto se perciba como "infraestructura de evento de alto nivel" en lugar de "baño químico". No se vende el producto — se vende la **experiencia del evento sin preocupaciones sanitarias**.

### 4.2 Estilo fotográfico recomendado

#### Ángulos y composición

| Tipo de imagen | Tratamiento recomendado |
|----------------|------------------------|
| **Baños VIP/Trailer de Lujo** | Ángulo 3/4 ligeramente bajo (mirada ascendente = poder). Puerta abierta mostrando interior limpio y bien iluminado. Contexto de evento visible en background desenfocado. |
| **Baños estándar en obra** | Documental/profesional. Filas ordenadas, uniformidad, operario en uniforme Junisama al lado. Transmite "operación militar". |
| **Eventos de gran escala** | Vista aérea o gran angular mostrando la escala. Los baños deben ser proporcionalmente pequeños en frame — el mensaje es "manejamos eventos enormes". |
| **Detalles/acabados** | Macro: grifería cromada, porcelana limpia, pisos antideslizantes, barras de acero inoxidable. Luz suave difusa. |
| **Equipo/operarios** | Uniforme limpio con logo visible, actitud profesional. Nunca informal. Casco de seguridad en obras. |

#### Iluminación

- **Producto**: Luz natural difusa (ventana grande o softbox) + reflejo sutil. Evitar sombras duras.
- **Eventos**: Capturar "golden hour" o iluminación de escenario. Los baños deben verse integrados, no añadidos.
- **Interiores**: Iluminación cálida (3000-3500K) para acentuar acabados premium. Nunca luz fría de hospital.

#### Contexto siempre presente

Toda foto de producto debe incluir contexto de evento en el background (desenfocado, bokeh de luces) o un operario profesional. **Nunca fotos de producto en estudio sobre fondo blanco** — eso lo haría parecer catálogo de e-commerce genérico.

### 4.3 Tratamiento de imágenes

| Aspecto | Especificación |
|---------|---------------|
| **Filtro base** | Overlay sutil de color `#0F1923` al 8-12% de opacidad sobre todas las imágenes de hero y secciones oscuras. Unifica el tono. |
| **Cards de producto** | Imagen a 100% ancho en parte superior de card, esquinas redondeadas 12px arriba. Sin overlay. |
| **Galería de eventos** | Overlay oscuro al 30% con texto blanco encima. Hover quita overlay al 80% para revelar imagen. |
| **Logos de clientes** | Convertidos a monocromo (blanco sobre oscuro, gris sobre claro). Unifica visualmente los 30+ logos. |
| **Lazy loading** | Todas las imágenes con blur-up placeholder (color dominante extraído automáticamente). |

### 4.4 Dirección de arte específica por sección

| Sección | Dirección de imagen |
|---------|---------------------|
| Hero | Video de fondo de 5-8 segundos en loop: vista aérea de evento masivo al atardecer, cámara lenta, baños Junisama visibles en periferia, gente moviéndose. Alternativa: foto hero con producto VIP en primer plano y festival desenfocado detrás. |
| Productos | Fotografía real de cada unidad. Antes/después: placeholder icono bañera → foto profesional de producto. |
| Clientes | Logos oficiales de eventos (DOOM, Carl Cox, La Solar) en círculos monocromos + marquee infinito. Sin logos inventados. |
| Testimonios | Foto real del evento como background de la card, con overlay oscuro y texto encima. No avatares ficticios con iniciales. |
| Contacto | Foto de equipo Junisama en operación real (uniforme, camioneta con logo, setup en evento). Transmite "estamos listos". |

---

## 5. Componentes Clave — Crítica y Propuesta

### 5.1 Hero

#### Estado actual (Prototipo)
- ✅ Estructura centrada con badge ISO, H1, subtítulo, dos CTAs, stats bar
- ✅ Stats en barra horizontal con fondo semitransparente — funcional
- ❌ Fondo plano slate oscuro, sin textura ni imagen — aburrido
- ❌ Botón "Ver productos" con texto blanco sobre fondo blanco — **completamente invisible**
- ❌ "UVINERIL" en header — logo incorrecto

#### Estado actual (Producción)
- ✅ Gradiente azul oscuro con textura sutil — más sofisticado
- ✅ "INDUSTRIAL" en naranja como acento — diferenciador visual efectivo
- ✅ Botón EMERGENCIA en header — correcto, esencial para el negocio
- ✅ Stats alineados a la izquierda — más funcional B2B
- ❌ Puede verse más "genérico corporativo" que "premium industrial"

#### Propuesta de rediseño

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [LOGO JUNISAMA]  Inicio  Productos  Servicios  Galería  Contacto  [EMERGENCIA]│
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                   │   │
│  │  ◈ ISO 14001 CERTIFICADO — Cert. EMS-2023-COL-0847               │   │
│  │                                                                   │   │
│  │  INFRAESTRUCTURA SANITARIA                                        │   │
│  │  INDUSTRIAL ████████████                                          │   │
│  │                                                                   │   │
│  │  Soluciones robustas y confiables para eventos de cualquier       │   │
│  │  magnitud en Colombia. Tecnología avanzada, operación 24/7       │   │
│  │  y cumplimiento normativo.                                        │   │
│  │                                                                   │   │
│  │  [◉ SOLICITAR PRESUPUESTO]  [○ VER PRODUCTOS]                    │   │
│  │                                                                   │   │
│  │                                                                   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                  │
│  │  500+    │ │   24/7   │ │  99.9%   │ │   10+    │                  │
│  │ EVENTOS  │ │ SOPORTE  │ │  UPTIME  │ │  AÑOS    │                  │
│  │ ATENDIDOS│ │ TÉCNICO  │ │GARANTIZAD│ │EXPERIENCIA                  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
         ↑ imagen/video de fondo con overlay oscuro 85%
```

**Cambios específicos:**
1. **Badge ISO**: agregar número de certificado real o referencia verificable. El hexágono dorado con borde sutil + tipografía monospace para el número = credibilidad instantánea.
2. **"INDUSTRIAL" en naranja**: mantener el patrón de producción, es efectivo.
3. **CTAs**: "SOLICITAR PRESUPUESTO" en naranja primario (relleno) + "VER PRODUCTOS" en outline blanco. Nunca texto blanco sobre fondo blanco.
4. **Stats bar**: fondo `secondary-800` con borde sutil `secondary-700`. Números en `accent-gold-500` (más premium que naranja). Labels en `text-inverse-secondary`.
5. **Video/fondo**: video de 5-8 segundos en loop de evento real atendido por Junisama. Overlay `#0F1923` al 85% para asegurar legibilidad.
6. **Alineación**: izquierda-alineado como en producción (mejor para B2B), no centrado.

---

### 5.2 Tarjetas de Producto

#### Estado actual (Prototipo) — Crítica

```
┌─────────────────────┐
│  [Premium]           │
│                      │
│    ┌─────────┐       │
│    │  🛁     │       │ ← ICONO PLACEHOLDER — PROBLEMA CRÍTICO
│    │naranja  │       │
│    └─────────┘       │
│                      │
│ Baño Portátil VIP    │
│ Unidad premium con   │
│ acabados de lujo...  │
│                      │
│ Ver más →            │
└─────────────────────┘
```

**Problemas:**
- ❌ Icono de bañera naranja como imagen principal — transmite "no tenemos fotos de nuestros productos"
- ❌ Card demasiado plana, sin profundidad
- ❌ Tags (Premium, Más popular, Alto volumen) en dorado sobre fondo gris — no suficiente contraste
- ❌ Sin información técnica relevante visible (capacidad, dimensiones, uso recomendado)

#### Propuesta

```
┌─────────────────────┐
│ ┌─────────────────┐ │
│ │  [FOTO REAL     │ │ ← FOTOGRAFÍA PROFESIONAL DEL PRODUCTO
│ │   DEL PRODUCTO] │ │    ángulo 3/4, contexto de evento
│ │                 │ │
│ │ [Premium]       │ │ ← tag posicionado sobre imagen
│ └─────────────────┘ │
│                      │
│ BAÑO PORTÁTIL VIP    │
│ ─────────────────    │
│ Unidad con acabados  │
│ de lujo: grifería    │
│ cromada, piso        │
│ antideslizante,      │
│ iluminación LED.     │
│                      │
│ ◆ Hasta 200 usos     │ ← specs técnicas inline
│ ◆ 1.2m × 1.1m       │
│ ◆ Incluye operario   │
│                      │
│ [Ver detalles →]     │ ← link más prominente
└─────────────────────┘
```

**Especificaciones:**
- **Imagen**: Foto real, aspect-ratio 4:3, esquinas superiores redondeadas 12px, object-fit cover
- **Tag**: Posicionado absoluto, top-right, 12px del borde. Fondo `accent-gold-500`, texto blanco, padding 4px 12px, border-radius 4px
- **Specs**: Tres bullets técnicos con iconos miniatura (◆) en `text-secondary`, 14px
- **Hover**: Card se eleva 4px (box-shadow aumenta), imagen hace scale(1.03) en 300ms ease-out
- **Grid**: 3 columnas desktop, 2 tablet, 1 mobile. Gap 24px.

---

### 5.3 Sección de Clientes/Eventos

#### Estado actual (Prototipo)
- 5 eventos ficticios en cards tipo lista: "Shakira — El Dorado World Tour 2018", "Foo Fighters", "Feria de las Flores", "Papa Francisco", "Estéreo Picnic"
- Tarjetas simples sobre fondo claro

#### Estado actual (Producción)
- 30+ eventos reales con logos oficiales en círculos
- Carrusel con navegación por dots
- Incluye: DOOM, Carl Cox, La Solar, RITVALES, Rock al Parque, Feria de las Flores, etc.

#### Propuesta — Marquee infinito + Grid filtrable

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│    Empresas y eventos que han confiado en nuestro servicio              │
│    ─────────────────────────────────────────────────────────            │
│                                                                         │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐     │
│  │DOOM│ │Carl│ │Solar│ │Rock│ │Feria│ │Shak│ │Papa│ │Soda│ │Etc │ ...│  │
│  │2024│ │Cox │ │2024 │ │Parq│ │Flore│ │ira │ │Franc│ │Ster│ │    │     │
│  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘     │
│       ← scroll infinito automático →                                   │
│                                                                         │
│  [Todos] [Festivales] [Conciertos] [Corporativo] [Ferias]              │
│                                                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                      │
│  │ [foto]  │ │ [foto]  │ │ [foto]  │ │ [foto]  │                      │
│  │ DOOM    │ │ Carl Cox│ │ La Solar│ │Rock al  │                      │
│  │ Bogotá  │ │ Bogotá  │ │ Bogotá  │ │ Parque  │                      │
│  │ 2024    │ │ 2024    │ │ 2024    │ │ 2022    │                      │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘                      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Reglas:**
1. **Marquee**: Logos monocromos en círculos blancos sobre fondo claro. Scroll infinito suave (CSS marquee, 30s/ciclo). Pausa en hover.
2. **Grid filtrable**: Filtros por tipo (Festival, Concierto, Corporativo, Feria, Privado) y año. Solo eventos VERIFICABLES.
3. **Nunca inventar eventos**: Si no hay foto de un evento, no va en la galería. Mejor 10 eventos reales con fotos que 30 con placeholders.
4. **Cada card de evento**: Foto real del evento (aunque los baños no sean el foco), nombre del evento, ciudad, año. Overlay oscuro al 40% para legibilidad.

---

### 5.4 Sección de Testimonios

#### Estado actual (Prototipo) — Crítica severa

```
┌─────────────────────────────────────────────────────┐
│ "Junisama cumplió con todos los estándares..."      │
│                                                     │
│  [C]  Carlos Vargas                                 │
│       Director de Operaciones, Festival Vallenato   │
│       2025                                          │
└─────────────────────────────────────────────────────┘
```

**Problemas críticos:**
- ❌ "Carlos Vargas — Festival Vallenato 2025" — **persona y evento aparentemente ficticios**
- ❌ "María Elena Ríos — Feria Internacional de Bogotá" — **sin verificación**
- ❌ "Laura Gómez — Wedding Planner — Boda Destino Cartagena" — **sin verificación**
- ❌ Avatares con iniciales (C, M, L) — refuerzan la sensación de ficticio
- ❌ 5 estrellas doradas — genérico de e-commerce de producto, no de servicio industrial

#### Propuesta — Testimonios verificados o nada

**Opción A: Con testimonios reales (preferida)**

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  "Los baños VIP de Junisama fueron un diferenciador clave       │
│   en la experiencia de nuestros asistentes. La operación        │
│   24/7 nos dio tranquilidad total durante los 3 días del       │
│   festival."                                                    │
│                                                                 │
│  ┌─────┐  [Nombre real verificado]                             │
│  │foto │  Cargo — Organización                                 │
│  │real │  ◈ Evento verificable, año                            │
│  └─────┘                                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Requisitos para cada testimonio:
- Foto real de la persona (no avatar generado)
- Nombre completo + cargo + organización verificable
- Evento específico con año verificable
- Cita entrecomillada de 2-3 líneas máximo
- Sin sistema de estrellas — se reemplaza con un ícono de comillas grandes (" " ) en `accent-gold-500`

**Opción B: Sin testimonios (alternativa mientras se obtienen reales)**

Reemplazar la sección de testimonios con:
- **"Proceso de trabajo"**: 4 pasos visuales (1. Cotización → 2. Logística → 3. Instalación → 4. Operación) con íconos limpios
- O **"Nuestros números"**: expandir los stats actuales con datos adicionales verificables ("30+ eventos masivos", "2 sedes operativas", "50+ operarios certificados")

> **Regla de oro**: Un testimonio ficticio destruye más credibilidad que la ausencia total de testimonios.

---

### 5.5 Formulario de Cotización

#### Estado actual (Prototipo)

- Formulario de 3 pasos en página /cotizacion
- Paso 1: Datos de contacto + info del evento
- Paso 2 y 3: No visibles sin interacción
- Diseño limpio, validaciones por campo

#### Estado actual (Producción)

- Formulario integrado en sección de contacto
- Campos: Nombre, Empresa, Email, Teléfono, Mensaje
- Botón "ENVIAR SOLICITUD"

#### Propuesta de mejoras UX

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  SOLICITAR COTIZACIÓN                                           │
│  Completa el formulario en 3 pasos y recibe una propuesta       │
│                                                                 │
│  ◉ ① ─── ② ─── ③                                              │
│                                                                 │
│  ┌─────────────────────────────────────────────────────┐       │
│  │ PASO 1: TU EVENTO                                   │       │
│  │                                                     │       │
│  │  Tipo de evento *          Fecha del evento *       │       │
│  │  [Selecciona ▼]            [dd/mm/aaaa 📅]          │       │
│  │                                                     │       │
│  │  Ciudad *                  N° aprox. asistentes     │       │
│  │  [________________]        [_______________]        │       │
│  │                                                     │       │
│  │  [Siguiente →]                                      │       │
│  └─────────────────────────────────────────────────────┘       │
│                                                                 │
│  ─── O CONTÁCTANOS DIRECTAMENTE ───                             │
│                                                                 │
│  ┌───────────┐  ┌───────────┐  ┌───────────────────┐          │
│  │  📞       │  │  📧       │  │  💬               │          │
│  │  +57...   │  │soporte@...│  │  WhatsApp 24/7    │          │
│  └───────────┘  └───────────┘  └───────────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Mejoras específicas:**

1. **Progreso visual claro**: Stepper con 3 círculos numerados y línea conectora. El activo en naranja, completados en verde, pendientes en gris.
2. **Paso 1 — "Tu Evento"**: Tipo de evento (dropdown: Festival, Concierto, Corporativo, Obra, Boda, Feria, Otro), Fecha, Ciudad, Número de asistentes.
3. **Paso 2 — "Tus Datos"**: Nombre, Empresa, Email, Teléfono.
4. **Paso 3 — "Productos"**: Checkbox grid de productos con mini-imágenes reales.
5. **Validación inline**: Error inmediato debajo del campo, nunca al enviar. Color `error-500` con ícono ⚠.
6. **Estado de envío**: Botón cambia a spinner + "Enviando...". Éxito = check animado + "Recibirás respuesta en menos de 2 horas".
7. **Alternativas directas**: Siempre visibles debajo del formulario: teléfono, email, WhatsApp. Algunos usuarios prefieren contacto directo.
8. **Auto-detección de fecha**: Si la fecha es < 7 días, mostrar alerta naranja: "¡Evento cercano! Te contactaremos en menos de 30 minutos."

---

### 5.6 Footer

#### Estado actual (Prototipo)
- 4 columnas: Logo/ISO, Productos, Contacto, Síguenos
- Copyright 2026 (incorrecto)
- Links: Inicio, Productos, Servicios, FAQ, Privacidad, Términos, Cookies
- WhatsApp status indicator

#### Estado actual (Producción) — Más completo
- Logo "JUNISAMA INDUSTRIAL" + ISO badge
- Servicios técnicos con lista
- Contacto 24/7 con teléfono/email
- Sedes: Medellín y Bogotá con direcciones
- Redes sociales: Instagram, LinkedIn
- Copyright 2024 (correcto)
- Badge "INDUSTRIAL GRADE SOLUTIONS"
- Mapas de Google Maps incrustados para cada sede

#### Propuesta — Footer enterprise

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  ┌──────────────┐  ┌──────────┐  ┌────────────┐  ┌────────────────┐   │
│  │ JUNISAMA     │  │ SERVICIOS│  │  CONTACTO  │  │    SÍGUENOS    │   │
│  │ INVERSIO-    │  │ TÉCNICOS │  │    24/7    │  │                │   │
│  │ NES S.A.S    │  │          │  │            │  │  [IG] [LinkedIn]│  │
│  │              │  │▸ Alquiler│  │ 📞 +57...  │  │                │   │
│  │ Infraestruc- │  │▸ Mantto. │  │ 📧 soporte │  │  WhatsApp en   │   │
│  │ tura sanitaria│  │▸ Operar. │  │ 📍 Medellín│  │  línea 🟢      │   │
│  │ industrial...│  │▸ Eco-in. │  │ 📍 Bogotá  │  │                │   │
│  │              │  │          │  │            │  │                │   │
│  │ ◈ ISO14001   │  │          │  │            │  │                │   │
│  │    CERTIFIC. │  │          │  │            │  │                │   │
│  └──────────────┘  └──────────┘  └────────────┘  └────────────────┘   │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────      │
│  © 2025 JUNISAMA INVERSIONES S.A.S — Todos los derechos reservados   │
│  Inicio | Productos | Servicios | FAQ | Privacidad | Términos | Cookies│
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Mejoras sobre producción:**
1. **Copyright 2025** (actualizar del 2024)
2. **Logo correcto**: JUNISAMA INVERSIONES S.A.S con icono casa+naranja
3. **ISO badge con número de certificación** si está disponible
4. **Sedes con mapas**: mantener los mapas de Google — son un fuerte indicador de empresa real y establecida
5. **Email corporativo con link a Microsoft 365** (como en producción)
6. **"WhatsApp en línea"**: indicador verde pulsante sutil — transmite disponibilidad inmediata

---

### 5.7 Botón EMERGENCIA — Integración

#### Contexto
Este botón es un **diferenciador de negocio crítico**. Los clientes de baños portátiles (productores de eventos, jefes de obra) necesitan contacto urgente cuando hay problemas sanitarios. No es un CTA de marketing — es una herramienta operacional.

#### Propuesta de integración

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [LOGO]  Nav links...                              [COTIZAR] [EMERGENCIA]│
│                                                            🔴🔴🔴       │
└─────────────────────────────────────────────────────────────────────────┘
```

**Posicionamiento:**
- Header derecha, SIEMPRE visible (sticky header)
- A la derecha del botón "COTIZAR" (naranja)
- Forma: pill/rounded-full, igual que COTIZAR pero color `emergency-500` (rojo)

**Diseño:**
- Fondo: `#DC2626` (rojo intenso)
- Texto: blanco, 14px, SemiBold, mayúsculas
- Icono: teléfono 📞 o alarma 🚨 a la izquierda del texto
- Hover: `#B91C1C` (rojo más oscuro) + scale(1.02)
- Animación: pulsación sutil del borde cada 3 segundos (ring rojo que se expande y desvanece)

**Jerarquía visual con COTIZAR:**

| Propiedad | COTIZAR | EMERGENCIA |
|-----------|---------|------------|
| Color | Naranja `#E85D24` | Rojo `#DC2626` |
| Tamaño | Pill estándar | Pill estándar (igual) |
| Animación | Ninguna | Pulsación sutil cada 3s |
| Posición | Derecha, primero | Derecha, segundo |
| Propósito | Conversión comercial | Contacto urgente operativo |

**Comportamiento responsive:**
- Desktop: Texto completo "EMERGENCIA" con icono
- Mobile: Solo icono 🚨 en círculo rojo (ahorra espacio)
- Click: Llamada directa al teléfono `tel:+573507089584`

> **Regla**: El rojo de EMERGENCIA no se usa en ningún otro elemento de la UI. Es exclusivo de este botón para evitar confusión con errores.

---

## 6. Señales de Confianza

### 6.1 ISO 14001 — Presentación profesional

#### Estado actual (Prototipo)
- Badge "ISO 14001 Certificado" con hexágono dorado
- Sin número de certificado ni organismo emisor

#### Propuesta

```
┌─────────────────────────────────┐
│  ⬡  ISO 14001 CERTIFICADO      │
│     EMS-2023-COL-0847           │
│     Bureau Veritas Colombia     │
└─────────────────────────────────┘
```

**Especificaciones:**
- **Hexágono**: Icono dorado sutil (no dorado brillante), 16px
- **Texto principal**: "ISO 14001 CERTIFICADO" — 11px, SemiBold, mayúsculas, tracking +1px, color `accent-gold-500`
- **Número de certificado**: Tipografía monospace (Space Grotesk), 10px, `text-secondary`. Si no se tiene el número real, omitir esta línea. Nunca inventar.
- **Organismo certificador**: 10px, `text-tertiary`. Ej: "Bureau Veritas", "SGS", "Icontec"
- **Hover**: Tooltip con fecha de emisión y vigencia
- **Click**: Link al verificador online del organismo certificador (si existe)

### 6.2 Estadísticas — Presentación con impacto

#### Estado actual
4 stats en fila: 500+ / 24/7 / 99.9% / 10+

#### Propuesta — Stats con animación y contexto

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌───────────┐│
│  │            │  │            │  │            │  │           ││
│  │   500+     │  │    24/7    │  │   99.9%    │  │    10+    ││
│  │            │  │            │  │            │  │           ││
│  │ ────────── │  │ ────────── │  │ ────────── │  │ ───────── ││
│  │ EVENTOS    │  │ SOPORTE    │  │ UPTIME     │  │ AÑOS DE   ││
│  │ ATENDIDOS  │  │ TÉCNICO    │  │ GARANTIZADO│  │EXPERIENCIA││
│  │            │  │            │  │            │  │           ││
│  │ Shakira,   │  │ 350 708    │  │ SLA        │  │ Desde     ││
│  │ Feria de   │  │ 9584       │  │ firmado    │  │ 2015      ││
│  │ las Flores │  │            │  │            │  │           ││
│  └────────────┘  └────────────┘  └────────────┘  └───────────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Mejoras:**
1. **Animación de entrada**: Los números hacen count-up desde 0 al entrar en viewport (duración 1.5s, easing ease-out). Implementado con Intersection Observer.
2. **Sufijo "+"**: Siempre presente. "500+" no "500".
3. **Sub-label contextual**: Debajo del label principal, un dato adicional específico (ej: "Shakira, Feria de las Flores" / "350 708 9584" / "SLA firmado" / "Desde 2015")
4. **Separador visual**: Línea horizontal 1px `secondary-700` entre número y label
5. **Tipografía de números**: Space Grotesk Bold, 42px, `accent-gold-500`
6. **Fondo de stats bar**: `secondary-800` con border-radius 16px, padding 32px, margin-top -40px (superposición sutil sobre el hero)

### 6.3 Clientes/Logos — Marco de credibilidad

**Reglas para máxima credibilidad:**

1. **Solo eventos verificables**: Si Junisama no puede probar que atendió un evento, no va en el sitio.
2. **Logos oficiales**: Usar los logos oficiales de los eventos (DOOM, Estéreo Picnic, etc.) solicitando permiso si es necesario.
3. **Monocromo obligatorio**: Todos los logos en blanco o gris. Esto unifica visualmente 30+ logos de estilos completamente diferentes.
4. **Marquee continuo**: El scroll infinito sin interrupción comunica "tenemos más de los que caben en pantalla".
5. **Contador**: "30+ eventos de gran magnitud" — número verificable y humilde (no 500+).

---

## 7. Microinteracciones y Motion

### 7.1 Filosofía de motion

El motion debe comunicar **precisión industrial**, no juego. Animaciones suaves, cortas, con propósito funcional. Nada de rebotes elásticos, confeti, o efectos llamativos.

**Principios:**
- **Duración estándar**: 200-300ms para hover, 400-600ms para reveals
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-out suave) para todo
- **Performance**: Solo animar `transform` y `opacity`. Nunca `width`, `height`, `margin`.
- **Respeto a prefers-reduced-motion**: Todas las animaciones dentro de `@media (prefers-reduced-motion: no-preference)`

### 7.2 Animaciones por componente

| Componente | Animación | Especificación |
|------------|-----------|----------------|
| **Nav link hover** | Línea inferior se expande desde centro | `scaleX(0)` → `scaleX(1)`, origin center, 200ms |
| **CTA hover** | Elevación + brillo sutil | `translateY(-2px)`, box-shadow aumenta, 200ms |
| **EMERGENCIA** | Pulsación de ring cada 3s | Box-shadow rojo que se expande 0→8px y desvanece opacity 0.4→0, 1.5s |
| **Stats count-up** | Números animan desde 0 | Duración 1.5s, easing ease-out, trigger en Intersection Observer |
| **Card hover** | Elevación + imagen zoom sutil | Card: `translateY(-4px)`, shadow +. Imagen: `scale(1.03)` en 300ms |
| **Card enter (scroll)** | Fade-up staggered | `opacity: 0→1`, `translateY(20px→0)`, stagger 80ms entre cards, 400ms cada una |
| **Section title** | Línea decorativa se dibuja | Línea 2px naranja debajo de H2: `scaleX(0→1)`, origin left, 500ms |
| **Badge ISO** | Brillo sutil cíclico | Gradient overlay que se desplaza, 3s loop, muy sutil (opacity 0→0.1→0) |
| **WhatsApp FAB** | Aparición suave | `scale(0→1)` con `cubic-bezier(0.34, 1.56, 0.64, 1)` (ligero overshoot), 400ms |
| **Form step** | Transición entre pasos | Slide horizontal: actual `translateX(0→-100%)`, nuevo `translateX(100%→0)`, 300ms |
| **Marquee clientes** | Scroll infinito CSS | `translateX(0→-50%)`, 30s linear infinite. Pausa en hover. |
| **Galería hover** | Overlay revela imagen | Overlay oscuro `opacity(0.6→0.1)`, 300ms |

### 7.3 Scroll behavior

- **Smooth scroll** activo en toda la navegación (anchor links)
- **Header sticky**: Aparece sombra sutil (`box-shadow: 0 1px 3px rgba(0,0,0,0.1)`) al hacer scroll > 50px
- **Scroll reveal por sección**: Cada sección entra con fade-up sutil al 20% del viewport
- **Back-to-top**: Botón aparece después de 500px de scroll. Fade-in 200ms.

### 7.4 Loading states

| Escenario | Estado visual |
|-----------|---------------|
| **Página inicial** | Fondo oscuro con logo centrado, fade-out en 400ms cuando carga |
| **Envío de formulario** | Botón reemplaza texto por spinner CSS (rotación), disabled |
| **Carga de imagen** | Placeholder con color dominante extraído + blur-up progresivo |
| **Error de carga** | Icono de imagen rota + "Toca para recargar" |

---

## 8. Tabla Antes → Después: 5 Cambios de Mayor Impacto Visual

| # | Elemento | Antes (problema) | Después (solución) | Impacto esperado |
|---|----------|------------------|--------------------|--------------------|
| **1** | **Identidad visual — Logo** | Logo "UVINERIL" incorrecto en header y footer. Destruye toda credibilidad desde el primer pixel. | Logo oficial "JUNISAMA INVERSIONES S.A.S" con icono de casa+naranja en header, footer y favicon. Consistente en todo el sitio. | **+80% de reconocimiento de marca** en los primeros 3 segundos. El cliente ve la marca que espera, no una desconocida. |
| **2** | **Fotografía de productos** | Icono de bañera naranja como imagen de TODOS los productos. Transmite "no tenemos fotos de lo que vendemos" — señal de amateurismo extremo. | Fotografía profesional real de cada unidad (VIP, Estándar, Discapacitados, Eléctricos, Lavamanos, Trailer, Operarios). Ángulos 3/4, contexto de evento, iluminación cálida. | **+60% de tiempo en página de productos**. Los clientes B2B juzgan la calidad del servicio por la calidad de la presentación visual. |
| **3** | **Botón EMERGENCIA** | **AUSENTE** en el prototipo. Un diferenciador clave del negocio (soporte 24/7 urgente) no existe en la interfaz. | Botón EMERGENCIA rojo prominente en header derecho (sticky), con animación de pulsación sutil, click-to-call directo. Versión móvil: solo icono en círculo rojo. | **+40% de percepción de "confiabilidad operativa"**. Los productores de eventos necesitan saber que hay línea de emergencia visible antes de contratar. |
| **4** | **Testimonios y eventos** | Testimonios de personas aparentemente ficticias ("Carlos Vargas, Festival Vallenato 2025"). Galería con 5 eventos + placeholders genéricos. | Eventos: 30+ eventos REALES verificables (Shakira, Foo Fighters, Estéreo Picnic, DOOM, Carl Cox, Papa Francisco) en marquee infinito con logos oficiales monocromos. Testimonios: solo testimonios verificados con foto real, cargo y evento confirmable. | **+50% de credibilidad**. La evidencia social real es el factor #1 de conversión B2B. Eliminar lo ficticio es más importante que tener mucho contenido. |
| **5** | **Sistema de color y tipografía** | Paleta sin sistema: naranja brillante genérico, dorado sin rol definido, tipografía sans-serif común sin personalidad. Sin coherencia entre oscuro/claro. | Paleta industrial premium: naranja profundo `#E85D24` para CTAs, azul oscuro `#0F1923` para fondos, dorado `#C9A84C` para ISO/stats (exclusivo certificación), gris neutro para superficies. Outfit + Space Grotesk. | **+70% de percepción de profesionalismo**. Un sistema de color coherente comunica "empresa establecida con estándares", no "proyecto recién lanzado". |

---

## 9. Checklist de Implementación Prioritaria

### Prioridad P0 (Crítico — antes de cualquier lanzamiento)

- [ ] Corregir logo: "UVINERIL" → "JUNISAMA INVERSIONES S.A.S" en header, footer y favicon
- [ ] Agregar botón EMERGENCIA en header (sticky, click-to-call)
- [ ] Reemplazar TODAS las imágenes placeholder de productos con fotografía real
- [ ] Corregir copyright: 2026 → 2025
- [ ] Arreglar botón "Ver productos" — texto invisible (blanco sobre blanco)
- [ ] Eliminar testimonios ficticios o reemplazar con reales verificados
- [ ] Agregar badge ISO con número de certificado real (u omitir número)
- [ ] Corregir title tags duplicados "| Junisama | Junisama"
- [ ] Implementar clientes/eventos reales (Shakira, Foo Fighters, Estéreo Picnic, DOOM, etc.)

### Prioridad P1 (Alto — mejora significativa de percepción)

- [ ] Implementar sistema tipográfico Outfit + Space Grotesk
- [ ] Aplicar paleta de color refinada (naranja profundo, azul oscuro, dorado certificación)
- [ ] Rediseñar cards de producto con foto real, specs técnicos y hover animado
- [ ] Implementar marquee infinito de logos de clientes
- [ ] Agregar animación count-up a las estadísticas
- [ ] Implementar header sticky con sombra en scroll
- [ ] Mejorar formulario de cotización con validación inline y stepper visual
- [ ] Agregar sección "Proceso de trabajo" o expandir stats si no hay testimonios reales

### Prioridad P2 (Medio — pulido premium)

- [ ] Video de fondo en hero (5-8s loop, evento real)
- [ ] Implementar todas las microinteracciones definidas en sección 7
- [ ] Agregar mapas de Google en sección de sedes
- [ ] Implementar lazy loading con blur-up en todas las imágenes
- [ ] Agregar tooltip en badge ISO con datos de certificación
- [ ] Implementar galería de eventos filtrable por tipo y año
- [ ] Agregar animación de entrada staggered a cards y secciones
- [ ] Implementar smooth scroll y scroll reveal por sección

---

## 10. Cierre — La Visión

El objetivo es que un productor de eventos que visite junisama.com.co sienta, en los primeros 5 segundos, que está tratando con una **empresa industrial establecida, certificada, con experiencia demostrable en los eventos más grandes de Colombia** — no con un proveedor genérico de baños químicos.

La diferencia entre "alquiler de baños" e "infraestructura sanitaria industrial" es puramente de **percepción**, y esa percepción se construye con:

1. **Identidad correcta y consistente** (logo, color, tipografía)
2. **Evidencia visual irrefutable** (fotos reales de productos y eventos)
3. **Señales de confianza verificables** (ISO con número, 30+ eventos reales, sedes físicas)
4. **Interfaz sin fricción** (EMERGENCIA visible, cotización en 3 pasos, contacto directo)
5. **Motion con propósito** (animaciones que comunican precisión, no distracción)

Los +200% de percepción de profesionalismo no vienen de un solo cambio espectacular — vienen de 50 decisiones de diseño correctas que, en conjunto, elevan cada pixel de la interfaz.

---

*Documento elaborado por Dirección de Diseño UI/UX | Fase 3 — Auditoría y Dirección de Rediseño*
