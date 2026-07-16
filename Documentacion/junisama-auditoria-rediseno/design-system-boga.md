# Design System Web BOGA
## De Brand Kit a Sistema de Diseño Digital

> **Version**: 1.0.0
> **Fecha**: 2026-07-18
> **Proyecto**: Rebrand Junisama → BOGA (Web Corporativa + Admin)
> **Stack**: Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript
> **Base**: Brand Kit BOGA auditado (paginas 1-11 del manual de identidad corporativa)

---

## Tabla de Contenidos

1. [Direction & Intent](#1-direction--intent)
2. [Domain Exploration](#2-domain-exploration)
3. [Tokens de Color](#3-tokens-de-color)
4. [Tipografia](#4-tipografia)
5. [Espaciado y Grid](#5-espaciado-y-grid)
6. [Radios y Elevacion](#6-radios-y-elevacion)
7. [Motion](#7-motion)
8. [Componentes](#8-componentes)
9. [Checks](#9-checks)
10. [Archivos a Modificar](#10-archivos-a-modificar)

---

## 1. Direction & Intent

### Who (Quien es el humano)

El usuario de boga.com.co es un **organizador de eventos** en Colombia: wedding planner, productor de festivales, coordinador de eventos corporativos, o particulares que celebran bodas/fiestas de alto nivel. Tiene entre 28-55 anos, vive en Medellin o Bogota, y su peor pesadilla es que los banos del evento fallen. Necesita confiar ciegamente en que el proveedor sanitario no sera un problema.

### What (Que debe hacer)

1. **Conocer** la marca en 3 segundos (hero: quien es BOGA, que hace, por que es diferente)
2. **Explorar** productos sin friccion (catalogo claro, fotos reales, comparacion)
3. **Cotizar** con confianza (wizard intuitivo, respuesta rapida)
4. **Contactar** en emergencia (boton siempre visible, telefono 24/7)
5. **Sentir** que BOGA entiende la presion de organizar un evento perfecto

### Feel (Como debe sentirse)

> **"Evento bien ejecutado traducido a pixeles"** — confiable como banco, fresco como festival.

La interfaz debe transmitir la misma sensacion que un servicio BOGA impecable en un evento de lujo: **nada falla, todo esta en su lugar, y hay un detalle fresco (el lima) que sorprende gratamente**.

| Emocion objetivo | Senal visual |
|------------------|--------------|
| **Confianza** | Azul electrico dominante, tipografia bold, numeros grandes, stats reales |
| **Frescura** | Lima en CTAs, acentos, badges — el "plot twist" visual |
| **Sofisticacion** | Azul profundo en fondos oscuros, tracking amplio "INGENIERIA PORTATIL" |
| **Limpieza** | Espacios generosos, superficies sin bordes duros, gris neutro con tinte azul |
| **Profesionalismo** | Estructura de grid rigurosa, componentes consistentes, motion fluido |

### Distribution (Distribucion cromatica)

- **60% neutros**: blancos, grises, superficies limpias (confianza, limpieza)
- **30% azul + profundo**: fondos de autoridad, textos, superficies oscuras (sofisticacion)
- **10% lima**: CTAs, acentos, badges, elementos decorativos (frescura, sorpresa)

### Depth (Profundidad)

**Surface-color strategy** — sombras sutiles que sugieren capas fisicas, nunca bordes duros.
Cada superficie tiene una temperatura de color distintiva:
- Canvas: neutro frio (fondo base)
- Elevated: ligeramente mas calida (cards, modales)
- Inset: ligeramente mas oscura (inputs, areas contenidas)

### Motion

Suave como agua. 300-400ms, easing `cubic-bezier(0.4, 0, 0.2, 1)`.
Nunca brusco, nunca lento. El motion refleja: "BOGA responde rapido pero nunca a las apuradas".

### Signature

Los **3 circulos BOGA** (2 llenos, 1 vacio) aparecen en loading states, transiciones, bullets de lista, marca de agua. Son el sello de autenticidad de la interfaz.

---

## 2. Domain Exploration

### Domain (5+ conceptos del negocio)

| # | Concepto | Significado para el usuario | Senal de interfaz |
|---|----------|----------------------------|-------------------|
| 1 | **Higiene** | "No me preocupo por la limpieza" | Superficies impecables, espacios generosos, nada amontonado |
| 2 | **Evento** | "Todo funciona sin que yo me encargue" | Flujo sin friccion, CTAs claros, numeros de contacto siempre visibles |
| 3 | **Portatil** | "Llegan, instalan, retiran — yo solo contrato" | Simplicidad en formularios, wizard de cotizacion de 3 pasos |
| 4 | **VIP/Premium** | "Mis invitados notan la diferencia" | Tipografia bold, stats dorados, imagenes de alta calidad |
| 5 | **ISO 9001** | "Cumplimos estandares internacionales" | Badge dorado, certificacion visible, confianza institucional |
| 6 | **24/7** | "Siempre disponibles, incluso en emergencia" | Boton de emergencia siempre visible, telefono en header |
| 7 | **Experiencia** | "Transforman una necesidad en algo memorable" | Animaciones fluidas, microinteracciones premium, detalles decorativos (3 circulos) |

### Color World (5+ colores con significado)

| Color | HEX | Mundo que evoca | Decision de uso |
|-------|-----|-----------------|-----------------|
| **Azul Electrico** | `#2c4df2` | Pureza del agua, seguridad tecnologica, confianza bancaria | Fondos principales, botones primarios, autoridad. Es el corazon visual. |
| **Azul Profundo** | `#1b1341` | Noche elegante, eventos privados, sofisticacion | Fondos oscuros alternativos, textos sobre blanco, eventos corporativos |
| **Amarillo Lima** | `#daf73a` | Energia de festival, frescura, juventud, "esto es diferente" | CTAs, acentos, isotipo, 3 circulos. El color que rompe lo corporativo. |
| **Blanco puro** | `#ffffff` | Limpieza extrema, espacios despejados, transparencia | Canvas base, texto sobre fondos oscuros, areas de descanso visual |
| **Gris plata BOGA** | `#8a849d` | Neutralidad profesional, sin distracciones | Texto secundario, bordes sutiles, placeholders. Tiene tinte azulado para cohesion. |
| **Crema/Lima claro** | `#f9eec1` | Calidez humana, acogimiento | Fondos alternativos sutiles, acentos ocasionales |

### Signature (Elemento distintivo)

> **Los 3 circulos BOGA**: 2 llenos + 1 vacio (contorno).
>
> Aparecen en: loading states, transiciones entre secciones, bullets de listas, marca de agua en fondos, indicadores de paso en el wizard, spinner del boton de cotizar.
>
> **Por que funciona**: Es un elemento del brand kit que nadie mas tiene. A una escala pequena lee como "tres puntos" (minimalista). A escala grande lee como decoracion de marca. Es escalable, memorable, y unico.

### Defaults Rechazados (3 exploraciones descartadas)

| # | Default rechazado | Por que | Que se usa en su lugar |
|---|-------------------|---------|------------------------|
| 1 | **Borde duro de 1px** (`border: 1px solid #e5e5e5`) | Rompe la sensacion organica de BOGA. La marca evoca agua, fluidez, burbujas — los bordes duros son lo opuesto. | Surface-color + sombra sutil. Las capas se distinguen por elevacion, no por linea. |
| 2 | **Sombra negra** (`box-shadow: 0 4px 6px rgba(0,0,0,0.1)`) | Las sombras negras son genericas. BOGA tiene una personalidad de color definida. | Sombra con tinte azul profundo (`rgba(27,19,65,0.08)`). Mantiene cohesion cromatica. |
| 3 | **Inter como fuente principal** | Inter es neutral, funcional, "sistema". BOGA necesita bold geometrico con personalidad. Las formas redondeadas de Montserrat (la "O" casi circular) coinciden con el logo. | Montserrat (Black/Bold/Regular/Light) con Poppins como fallback. Mantener la geometria redondeada del brand kit. |

---

## 3. Tokens de Color

### 3.1 Formula de Derivacion

Para cada color primario del brand kit, se deriva una escala completa 50-950 mediante mezcla lineal:

- **Base (500)**: Color original del brand kit
- **Tonos claros (50-400)**: Mezcla con blanco (`#ffffff`) en proporciones decrecientes
  - 50: 93% hacia blanco | 100: 80% | 200: 60% | 300: 40% | 400: 20%
- **Tonos oscuros (600-950)**: Mezcla con negro (`#000000`) en proporciones crecientes
  - 600: 15% hacia negro | 700: 30% | 800: 45% | 900: 60% | 950: 78%

```
mix(base, target, factor) = base + (target - base) * factor
```

### 3.2 Escala Azul Electrico (--boga-electric-*)

| Token | Valor HEX | Uso | Derivacion |
|-------|-----------|-----|------------|
| `--boga-electric-50` | `#f0f3fe` | Fondos de hover sutiles, badges info claros | 93% blanco |
| `--boga-electric-100` | `#d5dbfc` | Fondos de seleccion, highlights sutiles | 80% blanco |
| `--boga-electric-200` | `#abb8fa` | Bordes de foco suaves, estados hover | 60% blanco |
| `--boga-electric-300` | `#8094f7` | Links visitados, indicadores secundarios | 40% blanco |
| `--boga-electric-400` | `#5671f5` | Elementos de acento suave, badges | 20% blanco |
| `--boga-electric-500` | `#2c4df2` | **Color base**. Botones primarios, fondos hero, links | Color brand kit |
| `--boga-electric-600` | `#2541ce` | Hover de botones primarios, estados activos | 15% negro |
| `--boga-electric-700` | `#1f36a9` | Fondos oscuros de autoridad, header | 30% negro |
| `--boga-electric-800` | `#182a85` | Superficies muy oscuras, texturas | 45% negro |
| `--boga-electric-900` | `#121f61` | Texto sobre fondos claros (si se necesita azul oscuro) | 60% negro |
| `--boga-electric-950` | `#0a1135` | Fondos profundos, modales oscuros | 78% negro |

### 3.3 Escala Azul Profundo (--boga-deep-*)

| Token | Valor HEX | Uso | Derivacion |
|-------|-----------|-----|------------|
| `--boga-deep-50` | `#efeef2` | Fondos de seccion alternativa muy clara | 93% blanco |
| `--boga-deep-100` | `#d1d0d9` | Superficies de hover sobre fondos claros | 80% blanco |
| `--boga-deep-200` | `#a4a1b3` | Bordes sutiles sobre fondos oscuros | 60% blanco |
| `--boga-deep-300` | `#76718d` | Texto terciario, placeholders oscuros | 40% blanco |
| `--boga-deep-400` | `#494267` | Texto secundario sobre fondos claros | 20% blanco |
| `--boga-deep-500` | `#1b1341` | **Color base**. Texto principal, fondos oscuros | Color brand kit |
| `--boga-deep-600` | `#171037` | Hover sobre superficies oscuras | 15% negro |
| `--boga-deep-700` | `#130d2e` | Superficies oscuras de acento | 30% negro |
| `--boga-deep-800` | `#0f0a24` | Fondos de footer, secciones oscuras | 45% negro |
| `--boga-deep-900` | `#0b081a` | Fondos de maximo contraste | 60% negro |
| `--boga-deep-950` | `#06040e` | Fondo de modales, overlays oscuros | 78% negro |

### 3.4 Escala Lima BOGA (--boga-lima-*)

| Token | Valor HEX | Uso | Derivacion |
|-------|-----------|-----|------------|
| `--boga-lima-50` | `#fcfef1` | Fondos de badge lima muy sutiles | 93% blanco |
| `--boga-lima-100` | `#f8fdd8` | Fondos de seccion con tinte lima | 80% blanco |
| `--boga-lima-200` | `#f0fcb0` | Highlights de texto, fondos de acento | 60% blanco |
| `--boga-lima-300` | `#e9fa89` | Hover de badges lima, estados de acento | 40% blanco |
| `--boga-lima-400` | `#e1f961` | Badges de acento, indicadores suaves | 20% blanco |
| `--boga-lima-500` | `#daf73a` | **Color base**. CTAs, acentos, isotipo, 3 circulos | Color brand kit |
| `--boga-lima-600` | `#b9d231` | Hover de botones lima, acentos oscuros | 15% negro |
| `--boga-lima-700` | `#99ad29` | Texto sobre fondos lima claros | 30% negro |
| `--boga-lima-800` | `#788820` | Elementos decorativos oscuros | 45% negro |
| `--boga-lima-900` | `#576317` | Texto de acento sobre fondos claros | 60% negro |
| `--boga-lima-950` | `#30360d` | Fondos de acento muy oscuros | 78% negro |

### 3.5 Escala Neutra BOGA (--boga-neutral-*)

Escala derivada con **tinte azulado sutil** para mantener cohesion con la marca. No es gris puro.

| Token | Valor HEX | Uso |
|-------|-----------|-----|
| `--boga-neutral-50` | `#f8f8fa` | Canvas alternativo, fondos de seccion muy claros |
| `--boga-neutral-100` | `#f0eff4` | Superficies elevadas sutiles, fondos de card clara |
| `--boga-neutral-200` | `#e2e0e8` | Bordes muy sutiles, divisores, separadores |
| `--boga-neutral-300` | `#c8c5d2` | Bordes por defecto, inputs inactivos, placeholders |
| `--boga-neutral-400` | `#a8a3b8` | Texto deshabilitado, iconos inactivos |
| `--boga-neutral-500` | `#8a849d` | Texto terciario, captions, metadata |
| `--boga-neutral-600` | `#6e6780` | Texto secundario, labels, descripciones |
| `--boga-neutral-700` | `#544e63` | Texto secundario oscuro, subtitulos |
| `--boga-neutral-800` | `#3d3849` | Texto primario sobre fondos claros (headings) |
| `--boga-neutral-900` | `#272331` | Texto principal, titulos, cuerpo de lectura |
| `--boga-neutral-950` | `#17141e` | Texto de maximo contraste, fondos oscuros sutiles |

### 3.6 Superficies (Surfaces)

| Token | Valor | Uso | Justificacion |
|-------|-------|-----|---------------|
| `--boga-surface-canvas` | `#ffffff` | Fondo base de la pagina | Limpieza absoluta. El canvas es el "piso" impecable de un evento BOGA. |
| `--boga-surface-elevated` | `#ffffff` | Cards, modales, dropdowns (sobre canvas) | Blanco puro con sombra para diferenciacion. En tema oscuro: `#1b1341`. |
| `--boga-surface-floating` | `#ffffff` | Toasts, tooltips, popovers | Elementos que "flotan" sobre todo. Requieren sombra de nivel superior. |
| `--boga-surface-inset` | `#f0eff4` | Inputs, selects, areas contenidas | `#f0eff4` = `--boga-deep-50`. Superficie ligeramente hundida que invita a la interaccion. |
| `--boga-surface-muted` | `#f8f8fa` | Secciones alternadas, fondos de area | `#f8f8fa` = `--boga-neutral-50`. Diferenciacion sutil sin romper la armonia. |
| `--boga-surface-dark` | `#1b1341` | Footer, secciones oscuras, navbar | Azul profundo base. La sofisticacion de eventos corporativos. |
| `--boga-surface-hero` | `#2c4df2` | Hero principal, secciones de impacto | Azul electrico. El color que BOGA usa en su portada del manual. |

### 3.7 Texto

| Token | Valor | Uso | Ratio de contraste* |
|-------|-------|-----|---------------------|
| `--boga-text-primary` | `#272331` | Titulos, headings, texto principal sobre fondos claros | 15.4:1 sobre blanco (AAA) |
| `--boga-text-secondary` | `#544e63` | Subtitulos, descripciones, labels | 8.2:1 sobre blanco (AAA) |
| `--boga-text-tertiary` | `#8a849d` | Captions, metadata, timestamps | 4.1:1 sobre blanco (AA grande) |
| `--boga-text-muted` | `#a8a3b8` | Placeholders, texto deshabilitado | 3.0:1 (solo para decorativo) |
| `--boga-text-inverted` | `#ffffff` | Texto sobre fondos oscuros (hero, footer) | 7.5:1 sobre azul electrico (AAA) |
| `--boga-text-on-lima` | `#1b1341` | Texto sobre fondos lima | 13.2:1 sobre lima base (AAA) |
| `--boga-text-on-electric` | `#ffffff` | Texto sobre azul electrico | 7.5:1 (AAA) |

*Ratios calculados contra fondo tipico de uso.

### 3.8 Bordes

| Token | Valor | Uso |
|-------|-------|-----|
| `--boga-border-subtle` | `rgba(27, 19, 65, 0.06)` | Bordes de cards, separadores de seccion |
| `--boga-border-default` | `rgba(27, 19, 65, 0.12)` | Bordes de inputs, tabs, tablas |
| `--boga-border-strong` | `rgba(27, 19, 65, 0.24)` | Bordes de foco, estados activos, divisores importantes |
| `--boga-border-focus` | `#2c4df2` | Anillo de foco (focus-visible), estados de seleccion |
| `--boga-border-focus-ring` | `0 0 0 3px rgba(44, 77, 242, 0.25)` | Sombra de foco para accesibilidad |

**Justificacion**: Los bordes usan tinte azul profundo en lugar de negro para cohesion con la marca. En fondos oscuros, se invierten a `rgba(255,255,255,0.08/0.16/0.24)`.

### 3.9 Colores Semanticos

#### Exito (--boga-success-*)

| Token | Valor | Uso |
|-------|-------|-----|
| `--boga-success-50` | `#f5fdec` | Fondo de badge exito |
| `--boga-success-100` | `#e6fac7` | Fondo de alerta exito |
| `--boga-success-500` | `#6bc935` | Icono de exito, badge principal |
| `--boga-success-600` | `#4da828` | Hover de boton exito |
| `--boga-success-700` | `#36871e` | Texto sobre fondo exito claro |

#### Error (--boga-error-*)

| Token | Valor | Uso |
|-------|-------|-----|
| `--boga-error-50` | `#fdf2f2` | Fondo de badge error |
| `--boga-error-100` | `#fde8e8` | Fondo de alerta error |
| `--boga-error-500` | `#f05252` | Icono de error, badge principal |
| `--boga-error-600` | `#e02424` | Hover de boton error, boton emergencia |
| `--boga-error-700` | `#c81e1e` | Texto sobre fondo error claro |

#### Advertencia (--boga-warning-*)

| Token | Valor | Uso |
|-------|-------|-----|
| `--boga-warning-50` | `#fffbeb` | Fondo de badge warning |
| `--boga-warning-100` | `#fef3c7` | Fondo de alerta warning |
| `--boga-warning-500` | `#f59e0b` | Icono de warning, badge principal |
| `--boga-warning-600` | `#d97706` | Hover de boton warning |
| `--boga-warning-700` | `#b45309` | Texto sobre fondo warning claro |

#### Info (--boga-info-*)

| Token | Valor | Uso |
|-------|-------|-----|
| `--boga-info-50` | `#f0f3fe` | Fondo de badge info |
| `--boga-info-100` | `#d5dbfc` | Fondo de alerta info |
| `--boga-info-500` | `#2c4df2` | Icono de info, badge principal |
| `--boga-info-600` | `#2541ce` | Hover de boton info |
| `--boga-info-700` | `#1f36a9` | Texto sobre fondo info claro |

**Nota**: La escala info usa directamente la escala `--boga-electric-*` para coherencia.

### 3.10 CSS Custom Properties (listo para globals.css)

```css
:root {
  /* ===========================================
     ESCALA AZUL ELECTRICO
     =========================================== */
  --boga-electric-50: #f0f3fe;
  --boga-electric-100: #d5dbfc;
  --boga-electric-200: #abb8fa;
  --boga-electric-300: #8094f7;
  --boga-electric-400: #5671f5;
  --boga-electric-500: #2c4df2;
  --boga-electric-600: #2541ce;
  --boga-electric-700: #1f36a9;
  --boga-electric-800: #182a85;
  --boga-electric-900: #121f61;
  --boga-electric-950: #0a1135;

  /* ===========================================
     ESCALA AZUL PROFUNDO
     =========================================== */
  --boga-deep-50: #efeef2;
  --boga-deep-100: #d1d0d9;
  --boga-deep-200: #a4a1b3;
  --boga-deep-300: #76718d;
  --boga-deep-400: #494267;
  --boga-deep-500: #1b1341;
  --boga-deep-600: #171037;
  --boga-deep-700: #130d2e;
  --boga-deep-800: #0f0a24;
  --boga-deep-900: #0b081a;
  --boga-deep-950: #06040e;

  /* ===========================================
     ESCALA LIMA BOGA
     =========================================== */
  --boga-lima-50: #fcfef1;
  --boga-lima-100: #f8fdd8;
  --boga-lima-200: #f0fcb0;
  --boga-lima-300: #e9fa89;
  --boga-lima-400: #e1f961;
  --boga-lima-500: #daf73a;
  --boga-lima-600: #b9d231;
  --boga-lima-700: #99ad29;
  --boga-lima-800: #788820;
  --boga-lima-900: #576317;
  --boga-lima-950: #30360d;

  /* ===========================================
     ESCALA NEUTRA (tinte azulado)
     =========================================== */
  --boga-neutral-50: #f8f8fa;
  --boga-neutral-100: #f0eff4;
  --boga-neutral-200: #e2e0e8;
  --boga-neutral-300: #c8c5d2;
  --boga-neutral-400: #a8a3b8;
  --boga-neutral-500: #8a849d;
  --boga-neutral-600: #6e6780;
  --boga-neutral-700: #544e63;
  --boga-neutral-800: #3d3849;
  --boga-neutral-900: #272331;
  --boga-neutral-950: #17141e;

  /* ===========================================
     SUPERFICIES
     =========================================== */
  --boga-surface-canvas: #ffffff;
  --boga-surface-elevated: #ffffff;
  --boga-surface-floating: #ffffff;
  --boga-surface-inset: #f0eff4;
  --boga-surface-muted: #f8f8fa;
  --boga-surface-dark: #1b1341;
  --boga-surface-hero: #2c4df2;

  /* ===========================================
     TEXTO
     =========================================== */
  --boga-text-primary: #272331;
  --boga-text-secondary: #544e63;
  --boga-text-tertiary: #8a849d;
  --boga-text-muted: #a8a3b8;
  --boga-text-inverted: #ffffff;
  --boga-text-on-lima: #1b1341;
  --boga-text-on-electric: #ffffff;

  /* ===========================================
     BORDES
     =========================================== */
  --boga-border-subtle: rgba(27, 19, 65, 0.06);
  --boga-border-default: rgba(27, 19, 65, 0.12);
  --boga-border-strong: rgba(27, 19, 65, 0.24);
  --boga-border-focus: #2c4df2;
  --boga-border-focus-ring: 0 0 0 3px rgba(44, 77, 242, 0.25);

  /* ===========================================
     SEMANTICOS
     =========================================== */
  --boga-success-50: #f5fdec;
  --boga-success-100: #e6fac7;
  --boga-success-200: #d0f69f;
  --boga-success-300: #b0ed72;
  --boga-success-400: #8ede4f;
  --boga-success-500: #6bc935;
  --boga-success-600: #4da828;
  --boga-success-700: #36871e;
  --boga-success-800: #236d18;
  --boga-success-900: #155a11;
  --boga-success-950: #0a3d08;

  --boga-error-50: #fdf2f2;
  --boga-error-100: #fde8e8;
  --boga-error-200: #fbd5d5;
  --boga-error-300: #f8b4b4;
  --boga-error-400: #f98080;
  --boga-error-500: #f05252;
  --boga-error-600: #e02424;
  --boga-error-700: #c81e1e;
  --boga-error-800: #9b1c1c;
  --boga-error-900: #771d1d;
  --boga-error-950: #4a0d0d;

  --boga-warning-50: #fffbeb;
  --boga-warning-100: #fef3c7;
  --boga-warning-200: #fde68a;
  --boga-warning-300: #fcd34d;
  --boga-warning-400: #fbbf24;
  --boga-warning-500: #f59e0b;
  --boga-warning-600: #d97706;
  --boga-warning-700: #b45309;
  --boga-warning-800: #92400e;
  --boga-warning-900: #78350f;
  --boga-warning-950: #451a03;

  --boga-info-50: #f0f3fe;
  --boga-info-100: #d5dbfc;
  --boga-info-200: #abb8fa;
  --boga-info-300: #8094f7;
  --boga-info-400: #5671f5;
  --boga-info-500: #2c4df2;
  --boga-info-600: #2541ce;
  --boga-info-700: #1f36a9;
  --boga-info-800: #182a85;
  --boga-info-900: #121f61;
  --boga-info-950: #0a1135;
}
```


---

## 4. Tipografia

### 4.1 Familia y Pesos

| Atributo | Valor | Justificacion |
|----------|-------|---------------|
| **Familia principal** | `'Montserrat', 'Poppins', system-ui, -apple-system, sans-serif` | Montserrat es la tipografia inferida del brand kit (sans-serif geometrica redondeada). Poppins como fallback por compatibilidad geometrica. |
| **Familia display** | `'Montserrat', sans-serif` | Pesos 800-900, tracking negativo. Solo para heroes y headings grandes. |
| **Familia body** | `'Montserrat', system-ui, sans-serif` | Pesos 300-600, tracking normal. Para todo texto de lectura. |
| **Google Fonts URL** | `https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;900&display=swap` | Pesos: 300 (Light/INGENIERIA PORTATIL), 400 (Regular/body), 500 (Medium/captions), 600 (SemiBold/headings 3-5), 700 (Bold/headings 1-2), 900 (Black/display/hero). |

### 4.2 Escala Tipografica

Ratio: **1.25 (Major Third)**. Base: **16px (1rem)**.
Cada nivel multiplica/divide por 1.25.

| Token | Tamaño | Peso | Line-height | Letter-spacing | Uso | Uso en interfaz |
|-------|--------|------|-------------|----------------|-----|-----------------|
| `display-3xl` | `5.5rem` (88px) | 900 | 1.0 | -0.03em | Hero principal | "BOGA" en hero, mensaje principal de homepage |
| `display-2xl` | `4.5rem` (72px) | 900 | 1.05 | -0.02em | Hero secundario | Headings de seccion con maximo impacto |
| `display-xl` | `3.75rem` (60px) | 800 | 1.1 | -0.02em | Seccion hero | Titulos de pagina interna (productos, servicios) |
| `display-lg` | `3rem` (48px) | 800 | 1.15 | -0.01em | H1 | Titulo principal de contenido |
| `heading-1` | `2.25rem` (36px) | 700 | 1.2 | -0.01em | H2 seccion | Titulos de seccion en homepage ("Nuestros Productos", "Por que BOGA?") |
| `heading-2` | `1.875rem` (30px) | 700 | 1.25 | 0 | H3 | Subtitulos de seccion, titulos de card |
| `heading-3` | `1.5rem` (24px) | 600 | 1.3 | 0 | H4 tarjetas | Titulos dentro de cards, nombres de producto |
| `heading-4` | `1.25rem` (20px) | 600 | 1.35 | 0 | H5 | Labels de formulario, subtitulos compactos |
| `heading-5` | `1.125rem` (18px) | 600 | 1.4 | 0 | H6 | Navegacion, tabs, breadcrumbs |
| `body-lg` | `1.125rem` (18px) | 400 | 1.65 | 0 | Parrafos destacados | Descripciones de producto, texto introductorio |
| `body-md` | `1rem` (16px) | 400 | 1.6 | 0 | Parrafos estandar | Cuerpo de texto, descripciones, FAQ |
| `body-sm` | `0.875rem` (14px) | 400 | 1.55 | 0 | Textos pequeños | Metadata, captions, pie de card |
| `caption` | `0.75rem` (12px) | 500 | 1.5 | 0.08em | Labels uppercase | Badges, etiquetas de categoria, "PREMIUM", "ISO 9001" |
| `overline` | `0.6875rem` (11px) | 500 | 1.4 | 0.25em | Tracking amplio | "INGENIERIA PORTATIL", sub-marca, categorias de seccion |

### 4.3 Decisiones Tipograficas Clave

**Tracking negativo en display**: Los titulos grandes (display-*) usan letter-spacing negativo porque Montserrat Black es una fuente ancha. Sin tracking negativo, los titulos se sienten "desparramados". El brand kit usa "BOGA" con letras muy juntas.

**"INGENIERIA PORTATIL" con tracking amplio**: Es el elemento mas distintivo de la tipografia BOGA. El letter-spacing de 0.25em (4px a 16px base) crea ese efecto de sofisticacion inmediata. Es el contrapunto visual: el logo es bold y compacto, la sub-marca es light y espaciada.

**Line-height 1.6 en body**: Ligeramente mayor al estandar (1.5) porque BOGA es una marca de "respiracion". Los eventos bien ejecutados tienen espacio. El texto no debe sentirse apretado.

**Peso 600 para headings 3-5**: En lugar de 700, para que los headings pequenos no compitan visualmente con los grandes. La jerarquia se establece por tamano + peso combinados.

### 4.4 CSS Custom Properties (Tipografia)

```css
:root {
  /* Familia */
  --boga-font-display: 'Montserrat', sans-serif;
  --boga-font-body: 'Montserrat', 'Poppins', system-ui, -apple-system, sans-serif;

  /* Escala */
  --boga-text-display-3xl: 900 5.5rem/1.0 var(--boga-font-display);
  --boga-text-display-2xl: 900 4.5rem/1.05 var(--boga-font-display);
  --boga-text-display-xl: 800 3.75rem/1.1 var(--boga-font-display);
  --boga-text-display-lg: 800 3rem/1.15 var(--boga-font-display);
  --boga-text-heading-1: 700 2.25rem/1.2 var(--boga-font-body);
  --boga-text-heading-2: 700 1.875rem/1.25 var(--boga-font-body);
  --boga-text-heading-3: 600 1.5rem/1.3 var(--boga-font-body);
  --boga-text-heading-4: 600 1.25rem/1.35 var(--boga-font-body);
  --boga-text-heading-5: 600 1.125rem/1.4 var(--boga-font-body);
  --boga-text-body-lg: 400 1.125rem/1.65 var(--boga-font-body);
  --boga-text-body-md: 400 1rem/1.6 var(--boga-font-body);
  --boga-text-body-sm: 400 0.875rem/1.55 var(--boga-font-body);
  --boga-text-caption: 500 0.75rem/1.5 var(--boga-font-body);
  --boga-text-overline: 500 0.6875rem/1.4 var(--boga-font-body);

  /* Tracking */
  --boga-tracking-tight: -0.03em;
  --boga-tracking-tight-sm: -0.02em;
  --boga-tracking-tight-xs: -0.01em;
  --boga-tracking-normal: 0;
  --boga-tracking-wide: 0.08em;
  --boga-tracking-wider: 0.25em;
}
```

---

## 5. Espaciado y Grid

### 5.1 Sistema de Espaciado

**Unidad base: 4px** (0.25rem). Todo el espaciado es multiplo de 4.

| Token | Valor (rem) | Valor (px) | Uso tipico |
|-------|-------------|------------|------------|
| `space-0` | `0` | 0 | Sin espacio |
| `space-1` | `0.25rem` | 4px | Gap entre icono y texto, padding interno de badge |
| `space-2` | `0.5rem` | 8px | Padding de input compacto, gap de elementos juntos |
| `space-3` | `0.75rem` | 12px | Padding de boton, gap de cards en grid denso |
| `space-4` | `1rem` | 16px | Padding de card, gap de elementos relacionados |
| `space-5` | `1.25rem` | 20px | Padding horizontal de contenedor mobile |
| `space-6` | `1.5rem` | 24px | Padding de seccion interna, gap de grupo |
| `space-8` | `2rem` | 32px | Padding de seccion, gap entre bloques |
| `space-10` | `2.5rem` | 40px | Separacion entre componentes |
| `space-12` | `3rem` | 48px | Padding vertical de seccion |
| `space-16` | `4rem` | 64px | Separacion entre secciones (desktop) |
| `space-20` | `5rem` | 80px | Separacion grande entre secciones |
| `space-24` | `6rem` | 96px | Hero padding, secciones de impacto |

### 5.2 Breakpoints

| Nombre | Valor | Uso |
|--------|-------|-----|
| `sm` | `640px` | Tablets pequenas, ajustes de grid |
| `md` | `768px` | Tablets, menu hamburguesa → menu desktop |
| `lg` | `1024px` | Desktop, layout de 2+ columnas |
| `xl` | `1280px` | Desktop grande, contenedor maximo |
| `2xl` | `1536px` | Monitores ultra-wide, ajustes de escala |

### 5.3 Contenedor

```css
.container-boga {
  max-width: 1280px;           /* xl: max-w-xl */
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;          /* px-4 */
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container-boga {
    padding-left: 1.5rem;      /* sm:px-6 */
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container-boga {
    padding-left: 2rem;        /* lg:px-8 */
    padding-right: 2rem;
  }
}

@media (min-width: 1280px) {
  .container-boga {
    padding-left: 3rem;        /* xl:px-12 */
    padding-right: 3rem;
  }
}
```

**Justificacion**: Max-width 1280px porque BOGA es una marca que necesita "respirar". Un contenedor mas angosto (1024px) sentiria el sitio como un blog. Uno mas ancho (1440px) dispersaria el contenido en pantallas grandes. 1280px es el equilibrio para mostrar productos y contenido corporativo.

### 5.4 Grid

```
Sistema: 12 columnas
Gap: 16px (gap-4) → 24px (md:gap-6) → 32px (lg:gap-8)
```

| Breakpoint | Columnas | Gap | Uso |
|------------|----------|-----|-----|
| Mobile (<640px) | 1-2 (stack) | 16px | Productos en 1 col, stats en 2 col |
| Tablet (640-1023px) | 2-3 | 24px | Productos en 2 col, features en 3 col |
| Desktop (1024-1279px) | 3-4 | 32px | Productos en 3 col, grid completo |
| Large (1280px+) | 4 | 32px | Layout completo, maxima densidad |

**Justificacion**: 12 columnas porque es el estandar (flexible para 2, 3, 4, 6 columnas). El gap aumenta con el breakpoint porque en pantallas grandes el espacio negativo es tan importante como el contenido.

### 5.5 CSS Custom Properties (Espaciado)

```css
:root {
  --boga-space-0: 0;
  --boga-space-1: 0.25rem;   /* 4px */
  --boga-space-2: 0.5rem;    /* 8px */
  --boga-space-3: 0.75rem;   /* 12px */
  --boga-space-4: 1rem;      /* 16px */
  --boga-space-5: 1.25rem;   /* 20px */
  --boga-space-6: 1.5rem;    /* 24px */
  --boga-space-8: 2rem;      /* 32px */
  --boga-space-10: 2.5rem;   /* 40px */
  --boga-space-12: 3rem;     /* 48px */
  --boga-space-16: 4rem;     /* 64px */
  --boga-space-20: 5rem;     /* 80px */
  --boga-space-24: 6rem;     /* 96px */

  --boga-container-max: 1280px;
  --boga-grid-columns: 12;
  --boga-grid-gap: 1rem;
}

@media (min-width: 768px) {
  :root { --boga-grid-gap: 1.5rem; }
}

@media (min-width: 1024px) {
  :root { --boga-grid-gap: 2rem; }
}
```

---

## 6. Radios y Elevacion

### 6.1 Radios de Borde (Border Radius)

| Token | Valor | Uso | Justificacion |
|-------|-------|-----|---------------|
| `radius-none` | `0` | Tablas de datos, elementos de lista | Neutralidad funcional |
| `radius-xs` | `2px` | Badges compactos, chips | Casi cuadrado, solo para evitar bordes afilados |
| `radius-sm` | `4px` | Inputs, selects | Ligeramente redondeado, familiaridad de formulario |
| `radius-md` | `6px` | Botones secundarios, tabs | Moderadamente redondeado, el estandar BOGA |
| `radius-lg` | `8px` | Cards de producto, cards de contenido | Redondeado, amigable, coherente con iconos del brand |
| `radius-xl` | `12px` | Cards destacadas, modales | Redondeado generoso, para elementos que necesitan presencia |
| `radius-2xl` | `16px` | Modales, drawers, toasts | Muy redondeado, elementos flotantes |
| `radius-3xl` | `24px` | Hero containers, secciones especiales | Redondeado dramatico, para secciones de impacto |
| `radius-full` | `9999px` | Botones primarios (pill), avatares, badges ISO | Forma circular/pill. Usado en CTAs para destacar la accion |

**Justificacion**: BOGA es una marca de "limpieza + organicidad". Los bordes redondeados evocan las formas curvas del isotipo (la "B" organica/gota de agua). Nunca bordes cuadrados en elementos interactivos. El `radius-full` en CTAs es intencional: el boton "Cotizar" debe sentirse como una pildora de accion, no como un rectangulo.

### 6.2 Estrategia de Profundidad

**Decision: Surface-color + sombras sutiles** (NO bordes duros).

**Por que**: BOGA es una marca organica. El isotipo es una gota/burbuja. Los elementos decorativos son circulos y ondas. Los bordes duros de 1px son antiteticos a esta personalidad. La separacion visual se logra mediante:
1. Diferencia de color de superficie (surface-color)
2. Sombras sutiles que sugieren elevacion fisica
3. Espaciado generoso (aire entre elementos)

### 6.3 Sistema de Elevacion (Shadows)

Las sombras usan tinte **azul profundo** (`rgba(27, 19, 65, n)`) en lugar de negro puro. Esto mantiene cohesion cromatica y evita que las sombras se vean "sucias" sobre los fondos azulados de BOGA.

| Nivel | Nombre | Sombra | Uso | Justificacion |
|-------|--------|--------|-----|---------------|
| 0 | Flat | `none` | Canvas base, fondos planos | Sin elevacion, el "piso" del evento |
| 1 | Subtle | `0 1px 2px rgba(27, 19, 65, 0.06)` | Inputs, badges, pills | Casi invisible. Solo para despegar del fondo inset. |
| 2 | Default | `0 1px 3px rgba(27, 19, 65, 0.08), 0 1px 2px rgba(27, 19, 65, 0.04)` | Cards de producto, cards de contenido | La sombra estandar. Dos capas para suavidad. |
| 3 | Elevated | `0 4px 6px rgba(27, 19, 65, 0.08), 0 2px 4px rgba(27, 19, 65, 0.04)` | Cards hover, dropdowns, menus | Visible pero no intrusiva. Indica interaccion. |
| 4 | Prominent | `0 10px 15px rgba(27, 19, 65, 0.1), 0 4px 6px rgba(27, 19, 65, 0.05)` | Modales, drawers, overlays | Presencia clara. Elemento que demanda atencion. |
| 5 | Floating | `0 20px 25px rgba(27, 19, 65, 0.12), 0 10px 10px rgba(27, 19, 65, 0.04)` | Toasts, popovers, tooltips | Maxima elevacion. Elemento que "flota" sobre todo. |

### 6.4 Interacciones de Elevacion

| Estado | Elevacion | Transform | Uso |
|--------|-----------|-----------|-----|
| Default | Nivel 2 (card) | `translateY(0)` | Card en reposo |
| Hover | Nivel 3 (elevated) | `translateY(-4px)` | Card al pasar el mouse |
| Active | Nivel 1 (subtle) | `translateY(0) scale(0.98)` | Card al hacer click |
| Focus | Nivel 2 + ring | `translateY(0)` | Card con foco de teclado |

**Justificacion**: La card "salta" en hover porque BOGA es una marca que "eleva el estandar" (coherencia con el tagline). El `translateY(-4px)` es sutil pero perceptible. El `scale(0.98)` en active da feedback tactil.

### 6.5 CSS Custom Properties (Radios y Elevacion)

```css
:root {
  /* Radios */
  --boga-radius-none: 0;
  --boga-radius-xs: 2px;
  --boga-radius-sm: 4px;
  --boga-radius-md: 6px;
  --boga-radius-lg: 8px;
  --boga-radius-xl: 12px;
  --boga-radius-2xl: 16px;
  --boga-radius-3xl: 24px;
  --boga-radius-full: 9999px;

  /* Sombras */
  --boga-shadow-0: none;
  --boga-shadow-1: 0 1px 2px rgba(27, 19, 65, 0.06);
  --boga-shadow-2: 0 1px 3px rgba(27, 19, 65, 0.08), 0 1px 2px rgba(27, 19, 65, 0.04);
  --boga-shadow-3: 0 4px 6px rgba(27, 19, 65, 0.08), 0 2px 4px rgba(27, 19, 65, 0.04);
  --boga-shadow-4: 0 10px 15px rgba(27, 19, 65, 0.1), 0 4px 6px rgba(27, 19, 65, 0.05);
  --boga-shadow-5: 0 20px 25px rgba(27, 19, 65, 0.12), 0 10px 10px rgba(27, 19, 65, 0.04);

  /* Sombras para tema oscuro (mas sutiles) */
  --boga-shadow-dark-1: 0 1px 2px rgba(0, 0, 0, 0.2);
  --boga-shadow-dark-2: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.16);
  --boga-shadow-dark-3: 0 4px 6px rgba(0, 0, 0, 0.24), 0 2px 4px rgba(0, 0, 0, 0.16);
}
```

---

## 7. Motion

### 7.1 Filosofia de Motion

> **Justificacion**: BOGA es "seria/corporativa" en fondo pero "cercana/dinamica" en acento. El motion refleja esto: fluido como agua, nunca brusco.
>
> El agua es el elemento implicito de la marca (pureza del agua, burbujas, ondas). El motion debe sentirse como agua: sin friccion, sin golpes, natural.

### 7.2 Tokens de Motion

| Token | Valor | Uso |
|-------|-------|-----|
| `--boga-duration-instant` | `100ms` | Button press, toggle switch |
| `--boga-duration-fast` | `150ms` | Dropdown, menu, tooltip |
| `--boga-duration-normal` | `200ms` | Hover de botones/links, cambios de color |
| `--boga-duration-slow` | `300ms` | Modal, drawer, page transition |
| `--boga-duration-slower` | `400ms` | Hero entrance, seccion reveal |
| `--boga-easing-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | Easing por defecto. Suave, natural, "agua". |
| `--boga-easing-enter` | `cubic-bezier(0.23, 1, 0.32, 1)` | Entradas. Rapido al inicio, suave al final. |
| `--boga-easing-exit` | `cubic-bezier(0.55, 0, 1, 0.45)` | Salidas. Suave al inicio, rapido al final. |
| `--boga-easing-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Celebraciones, badges animados. Uso esporadico. |

### 7.3 Tabla de Interacciones

| Interaccion | Duracion | Easing | Justificacion |
|-------------|----------|--------|---------------|
| Button press (:active) | 100ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Tactil, instantaneo. El usuario necesita sentir que el boton "cedio". |
| Hover (buttons/links) | 200ms | `cubic-bezier(0.23, 1, 0.32, 1)` | Suave, premium. Mas rapido que 300ms (no se siente lento), mas lento que 100ms (no se siente brusco). |
| Dropdown/menu open | 150ms | `cubic-bezier(0.23, 1, 0.32, 1)` | Rapido, no bloquea. El usuario abrio un menu para actuar, no para admirar la animacion. |
| Modal/drawer open | 300ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Presente pero no intrusivo. El modal necesita atencion pero no asustar. |
| Modal/drawer close | 200ms | `cubic-bezier(0.55, 0, 1, 0.45)` | Mas rapido que la apertura. El usuario quiere volver al flujo. |
| Page transition | 400ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Fluido, "evento bien ejecutado". La transicion entre paginas debe sentirse como un cambio de escenario elegante. |
| Stagger (list items) | 50ms entre items | `cubic-bezier(0.23, 1, 0.32, 1)` | Cascada natural. Un arroyo que cae piedra por piedra, no una catarata. |
| Loading spinner (3 circulos) | 800ms/ciclo | `linear` | Los 3 circulos BOGA rotando. Linear para mantener consistencia angular. |
| Marquee infinito | 30s/ciclo | `linear` | Continuo, silencioso. No llama la atencion, solo informa. |
| Card hover (lift) | 200ms | `cubic-bezier(0.23, 1, 0.32, 1)` | "Elevamos el estandar" — la card literalmente se eleva. |
| Toast entrance | 300ms | `cubic-bezier(0.23, 1, 0.32, 1)` | Entrada suave. El toast llega sin interrumpir. |
| Toast exit | 200ms | `cubic-bezier(0.55, 0, 1, 0.45)` | Salida rapida. El usuario ya leyo el mensaje. |
| Scroll reveal (fade-up) | 400ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Elementos que aparecen al hacer scroll. Suave, no brusco. |

### 7.4 Press Feedback

```css
.boga-btn:active {
  transform: scale(0.97);
  transition: transform 100ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Regla**: Nunca `scale < 0.95`. Un boton que se encoge demasiado se siente "quebradizo". BOGA es robusto. 0.97 es el valor perfecto: feedback tactil sin fragilidad.

### 7.5 Stagger Pattern

```css
/* Items de lista aparecen en cascada */
.boga-stagger > * {
  animation: boga-fade-up 400ms cubic-bezier(0.4, 0, 0.2, 1) both;
}
.boga-stagger > *:nth-child(1) { animation-delay: 0ms; }
.boga-stagger > *:nth-child(2) { animation-delay: 50ms; }
.boga-stagger > *:nth-child(3) { animation-delay: 100ms; }
.boga-stagger > *:nth-child(4) { animation-delay: 150ms; }
.boga-stagger > *:nth-child(5) { animation-delay: 200ms; }
.boga-stagger > *:nth-child(6) { animation-delay: 250ms; }
/* ... continuar patron ... */

@keyframes boga-fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 7.6 Loading: Los 3 Circulos BOGA

```css
@keyframes boga-spin-circles {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes boga-pulse-circle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.5; transform: scale(0.8); }
}

.boga-loading-circles {
  display: flex;
  gap: 8px;
  align-items: center;
}

.boga-loading-circles .circle {
  width: 12px;
  height: 12px;
  border-radius: 9999px;
  background: var(--boga-lima-500);
  animation: boga-pulse-circle 800ms linear infinite;
}

.boga-loading-circles .circle:nth-child(1) { animation-delay: 0ms; }
.boga-loading-circles .circle:nth-child(2) { animation-delay: 200ms; animation: boga-pulse-circle 800ms linear infinite, none; border: 2px solid var(--boga-lima-500); background: transparent; } /* Circulo vacio */
.boga-loading-circles .circle:nth-child(3) { animation-delay: 400ms; }
```

**Variante**: Los circulos pueden usar `--boga-electric-500` sobre fondos claros, o `--boga-lima-500` sobre fondos oscuros.

### 7.7 Accesibilidad: prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  /* Excepcion: opacidad si se permite */
  .boga-fade-only {
    transition: opacity 200ms ease !important;
  }
}
```

**Regla**: Si el usuario prefiere reducir motion, eliminamos TODO el movimiento. Solo transiciones de opacidad para estados de foco/hover. Nunca omitir esta regla.

### 7.8 CSS Custom Properties (Motion)

```css
:root {
  --boga-duration-instant: 100ms;
  --boga-duration-fast: 150ms;
  --boga-duration-normal: 200ms;
  --boga-duration-slow: 300ms;
  --boga-duration-slower: 400ms;

  --boga-easing-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --boga-easing-enter: cubic-bezier(0.23, 1, 0.32, 1);
  --boga-easing-exit: cubic-bezier(0.55, 0, 1, 0.45);
  --boga-easing-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```


---

## 8. Componentes

---

### 8.1 Nav (Barra de Navegacion)

**Intent**: El organizador de eventos necesita orientarse rapidamente sin perderse. La nav debe ser un "ancla de confianza" — siempre visible, siempre clara, siempre accesible. El usuario debe sentir que "BOGA esta aqui" en cualquier momento.

**Hierarchy**: Logo BOGA a la izquierda (isotipo + wordmark en desktop, solo isotipo en mobile). Links de navegacion centrados/derecha. Boton "Cotizar" (lima) como CTA principal. Boton de emergencia (rojo) como accion secundaria critica.

**Palette**:
- Fondo: `--boga-surface-canvas` con `backdrop-filter: blur(12px)` y 95% opacidad (scrolled)
- Texto: `--boga-text-primary` (links), `--boga-text-secondary` (inactive)
- CTA: `--boga-lima-500` fondo, `--boga-text-on-lima` texto
- Emergencia: `--boga-error-600` fondo, `#ffffff` texto
- Sobre hero oscuro: fondo transparente → `--boga-deep-500` al scrollear

**Por que**: La nav necesita ser "invisible" sobre el hero (transparente) pero "presente" al scrollear (blur). El blur evita que el contenido se vea a traves de la nav (problema de legibilidad). El color blanco con blur es limpio, higienico, moderno — todo lo que BOGA representa.

**Depth**:
- Nivel 0 sobre hero (sin sombra)
- Nivel 2 al scrollear (`--boga-shadow-2`)
- Border-bottom: `1px solid var(--boga-border-subtle)` solo cuando esta scrolled
- Altura: 72px desktop, 64px mobile

**Por que**: La transicion de transparente a solida debe ser imperceptible pero reconfortable. El usuario nunca debe sentir que "algo cambio", solo que la nav siempre funciona.

**Surfaces**: `--boga-surface-canvas` con `background: rgba(255,255,255,0.95); backdrop-filter: blur(12px);`

**Typography**:
- Links: `var(--boga-text-body-sm)` (0.875rem / 400 / `--boga-text-primary`)
- CTA: `var(--boga-text-caption)` (0.75rem / 700 / uppercase / letter-spacing 0.05em)
- Logo wordmark: Montserrat 900, 1.5rem
- Sub-marca "INGENIERIA PORTATIL": `var(--boga-text-overline)` (0.6875rem / 500 / letter-spacing 0.25em)

**Por que**: Los links de navegacion usan body-sm porque la nav no es contenido, es herramienta. No debe competir visualmente con los headings de la pagina. El CTA usa caption uppercase porque es una accion, no una lectura.

**Spacing**:
- Padding horizontal: `var(--boga-space-6)` (24px) desktop, `var(--boga-space-4)` (16px) mobile
- Gap entre links: `var(--boga-space-8)` (32px)
- Gap CTA-emergencia: `var(--boga-space-3)` (12px)
- Padding CTA: `var(--boga-space-2) var(--boga-space-4)` (8px 16px)

**Por que**: Espaciado generoso entre links para facilitar el click (ley de Fitts). El CTA tiene padding suficiente para ser reconocible como boton, no como link.

**States**:
- Link hover: color cambia a `--boga-electric-500`, duracion 200ms
- Link active: `--boga-electric-600`
- Dropdown: se abre con 150ms ease-enter, items stagger 50ms
- Mobile menu: slide-in desde la derecha, 300ms, overlay `rgba(27,19,65,0.5)`

**Responsive**:
- Desktop (>1024px): Logo completo, links horizontales, CTA + emergencia visibles
- Tablet (768-1023px): Logo completo, hamburger menu, CTA visible
- Mobile (<768px): Isotipo solo, hamburger menu, CTA dentro del menu drawer

---

### 8.2 Hero

**Intent**: En 3 segundos, el visitante debe entender: "BOGA es ingenieria portatil de elite. Cotizo aqui.". El hero es la "primera impresion del evento" — si el hero falla, todo lo demas falla.

**Hierarchy**: 
1. Fondo azul electrico dominante (60% de la pantalla)
2. Wordmark "BOGA" en display-3xl blanco (900) — el elemento focal
3. "INGENIERIA PORTATIL" en overline blanco, tracking 0.25em — la sofisticacion
4. Tagline "Elevamos el estandar de tus eventos." en body-lg blanco — la promesa
5. CTA dual: "Cotizar ahora" (lima) + "Ver productos" (outline blanco)
6. Stats de confianza: "500+ eventos", "24/7", "ISO 9001", "10+ anos"
7. Elemento decorativo: 3 circulos BOGA en esquina

**Palette**:
- Fondo: `--boga-electric-500` (gradiente sutil: `--boga-deep-500` 0%, `--boga-electric-500` 50%, `--boga-electric-400` 100%)
- Texto: `--boga-text-inverted` (#ffffff)
- CTA primario: `--boga-lima-500` fondo, `--boga-text-on-lima` texto
- CTA secundario: transparente fondo, `#ffffff` texto, `2px solid rgba(255,255,255,0.4)` borde
- Stats: `--boga-lima-500` para numeros, `#ffffff` para labels

**Por que**: El fondo azul electrico es el corazon visual de BOGA (pagina 1 del manual). Los CTAs en lima son los unicos elementos de ese color en el hero, creando contraste cromatico maximo. Los stats usan lima para los numeros porque son "destellos de confianza".

**Depth**: 
- Nivel 0 (flat). El hero no tiene sombra, tiene gradiente.
- Overlay sutil: gradiente radial desde centro (mas claro) hacia bordes (mas oscuro)
- Decorativos: 3 circulos BOGA en esquina superior derecha (opacity 0.3), lineas onduladas sutiles

**Por que**: El hero es una superficie plana de impacto. No necesita sombra porque es el "fondo del escenario". Los decorativos (circulos, ondas) son elementos del brand kit que dan textura sin distraer.

**Surfaces**: `--boga-surface-hero` con gradiente.

**Typography**:
- "BOGA": `var(--boga-text-display-3xl)` (5.5rem / 900 / white / tracking -0.03em)
- "INGENIERIA PORTATIL": `var(--boga-text-overline)` (0.6875rem / 500 / white / tracking 0.25em)
- Tagline: `var(--boga-text-body-lg)` (1.125rem / 400 / white / 1.65 line-height)
- Stats numeros: `var(--boga-text-display-lg)` (3rem / 800 / `--boga-lima-500`)
- Stats labels: `var(--boga-text-caption)` (0.75rem / 500 / white / uppercase)

**Por que**: El display-3xl para "BOGA" porque es el momento de maximo impacto de la tipografia. En la portada del manual, "BOGA" ocupa casi toda la pagina. En la web, display-3xl (88px) reproduce esa sensacion sin ser excesivo.

**Spacing**:
- Padding vertical: `var(--boga-space-24)` (96px) top, `var(--boga-space-20)` (80px) bottom
- Padding horizontal: contenedor estandar
- Gap entre "BOGA" y "INGENIERIA PORTATIL": `var(--boga-space-2)` (8px)
- Gap entre tagline y CTAs: `var(--boga-space-8)` (32px)
- Gap entre CTAs: `var(--boga-space-4)` (16px)
- Gap entre stats: `var(--boga-space-12)` (48px)

**Por que**: Espaciado vertical generoso porque el hero necesita "respirar". Un hero apretado transmite apuro. Un hero espaciado transmite confianza. La separacion entre "BOGA" y "INGENIERIA PORTATIL" es pequena porque son un solo bloque visual.

**Responsive**:
- Mobile: display-3xl → display-xl (3.75rem), stats en 2x2 grid, CTAs apilados
- Stats: flex-wrap con justify-center

---

### 8.3 Product Card

**Intent**: El usuario necesira comparar productos rapidamente. La card debe responder a la pregunta "Que es?", "Para que evento?", "Cuanto cuesta?" en un vistazo.

**Hierarchy**:
1. Imagen del producto (aspect-ratio 4:3, ocupa 60% de la card)
2. Badge de categoria (ISO/"VIP"/"Premium"/"Inclusivo") — esquina superior izquierda de la imagen
3. Nombre del producto: `heading-3` (1.5rem / 600)
4. Descripcion corta: `body-sm` (0.875rem / 400 / `--boga-text-secondary`)
5. Precio: `heading-4` (1.25rem / 700 / `--boga-electric-500`)
6. CTA "Cotizar" — link/boton pequeno

**Palette**:
- Fondo: `--boga-surface-elevated` (blanco)
- Sombra: `--boga-shadow-2` (default), `--boga-shadow-3` (hover)
- Badge: `--boga-lima-500` fondo + `--boga-text-on-lima` texto ("VIP"/"Premium")
- Badge ISO: dorado `#c9a84c` fondo + texto oscuro (el ISO es un estandar universal)
- Badge "Inclusivo": `--boga-electric-500` fondo + blanco texto
- Nombre: `--boga-text-primary` (#272331)
- Descripcion: `--boga-text-secondary` (#544e63)
- Precio: `--boga-electric-500`
- Borde: `--boga-border-subtle`

**Por que**: El fondo blanco sobre el canvas (que tambien puede ser blanco) se diferencia por sombra, no por borde. El badge en lima es el unico elemento de color en la card, atrayendo la atencion a la categoria. El precio en azul electrico conecta con el CTA "Cotizar".

**Depth**:
- Nivel 2 (default): `--boga-shadow-2`
- Nivel 3 (hover): `--boga-shadow-3` + `translateY(-4px)`
- Border-radius: `--boga-radius-lg` (8px)
- Imagen: border-radius top 8px (coincide con card)

**Por que**: La card se eleva en hover porque BOGA "eleva el estandar". El `translateY(-4px)` es la microinteraccion que comunica "esto es mejor que la opcion basica". El radio 8px es coherente con las formas redondeadas del isotipo.

**Surfaces**: `--boga-surface-elevated` (blanco con sombra).

**Typography**:
- Nombre: `var(--boga-text-heading-3)` (1.5rem / 600 / `--boga-text-primary`)
- Descripcion: `var(--boga-text-body-sm)` (0.875rem / 400 / `--boga-text-secondary`)
- Precio: `var(--boga-text-heading-4)` (1.25rem / 700 / `--boga-electric-500`)
- Badge: `var(--boga-text-caption)` (0.75rem / 700 / uppercase)
- CTA: `var(--boga-text-body-sm)` (0.875rem / 600 / `--boga-electric-500`)

**Spacing**:
- Padding interno: `var(--boga-space-4)` (16px)
- Gap entre elementos: `var(--boga-space-2)` (8px)
- Gap imagen-contenido: 0 (la imagen toca el borde, el contenido tiene padding)

**Por que**: Padding de 16px es suficiente para que el contenido no se sienta apretado pero la card no crezca innecesariamente. La imagen toca el borde superior porque es mas limpio visualmente.

**States**:
- Hover: sombra nivel 3, translateY(-4px), duracion 200ms ease-enter
- Active: scale(0.98), duracion 100ms
- Focus: ring de `--boga-border-focus-ring`

---

### 8.4 Button

**Intent**: El boton es la accion. Debe ser inconfundible, clickable, y transmitir la importancia de la accion que representa.

#### Button Primary

**Hierarchy**: Texto centrado, padding generoso, forma pill (radius-full). Debe ser el elemento mas "invitador" a hacer click de toda la interfaz.

**Palette**:
- Fondo: `--boga-lima-500` (#daf73a)
- Texto: `--boga-text-on-lima` (#1b1341)
- Hover: `--boga-lima-600` (#b9d231) + sombra sutil
- Active: `--boga-lima-700` (#99ad29) + scale(0.97)
- Disabled: `--boga-neutral-200` fondo, `--boga-text-muted` texto

**Por que**: Fondo lima porque es el color de acento. Es el unico elemento que "grita" en la interfaz, y lo hace por una razon: convertir. El texto oscuro (#1b1341) sobre lima tiene ratio 13.2:1 (AAA). El hover oscurece ligeramente el lima para dar feedback.

**Depth**:
- Nivel 1: `--boga-shadow-1` (solo para darle "cuerpo")
- Hover: `--boga-shadow-2` (se eleva ligeramente)
- Border-radius: `--boga-radius-full` (pill)
- Padding: `var(--boga-space-3) var(--boga-space-6)` (12px 24px)

**Por que**: Forma pill porque es moderno, amigable, y diferente de los botones cuadrados genericos. El padding 12px 24px sigue la proporcion aurea aproximada (1:2) que es visualmente agradable.

**Typography**: `var(--boga-text-caption)` (0.75rem / 700 / uppercase / letter-spacing 0.05em)

**Por que**: Uppercase + bold + tracking amplio = comando visual. Un boton de accion no pide, ordena amablemente.

#### Button Secondary

**Palette**:
- Fondo: transparente
- Borde: `2px solid var(--boga-electric-500)`
- Texto: `--boga-electric-500`
- Hover: `--boga-electric-50` fondo
- Active: `--boga-electric-100` fondo

**Por que**: Outline en azul electrico sobre fondo claro. La accion secundaria es "explorar", no "convertir". El azul dice "confianza".

#### Button Tertiary (Ghost)

**Palette**:
- Fondo: transparente
- Texto: `--boga-electric-500`
- Hover: `--boga-electric-50` fondo
- Active: `--boga-electric-100` fondo

**Por que**: Sin borde, sin fondo. Para acciones de bajo impacto: "Ver mas", "Cancelar", "Volver". El hover con fondo sutil da feedback sin competir visualmente.

#### Button Loading

**Estado**: Texto oculto, spinner de 3 circulos BOGA centrado, fondo del boton se mantiene.
- Duracion de transicion a loading: 200ms (fade-out texto, fade-in circulos)
- Circulos: `--boga-lima-700` sobre fondo lima, o blanco sobre fondo oscuro

**Por que**: El spinner de 3 circulos BOGA refuerza la marca incluso en estados de espera. No es un spinner generico, es UNO DE BOGA.

#### Button Disabled

**Estado**: 
- Fondo: `--boga-neutral-200`
- Texto: `--boga-text-muted`
- Cursor: not-allowed
- Opacity: 0.6

---

### 8.5 Form Input

**Intent**: El usuario necesita llenar formularios de cotizacion y contacto sin friccion. El input debe sentirse "invitando a escribir", no como una pared.

**Hierarchy**: Label arriba, input abajo, mensaje de error debajo. La label es el guia, el input es el campo, el error es la correccion.

**Palette**:
- Fondo: `--boga-surface-inset` (#f0eff4)
- Borde: `1px solid transparent` (default), `1px solid var(--boga-border-focus)` (focus)
- Texto: `--boga-text-primary`
- Placeholder: `--boga-text-muted`
- Label: `--boga-text-secondary` + `var(--boga-text-caption)` uppercase
- Error: `--boga-error-500` borde + texto
- Icono (opcional): `--boga-text-tertiary`

**Por que**: Fondo inset (#f0eff4) porque el input es una "superficie hundida" que invita a la interaccion. El borde transparente por defecto mantiene la limpieza (surface-color strategy). Solo aparece borde en focus/error para comunicar estado. Esto reduce ruido visual.

**Depth**:
- Nivel: Inset (ligeramente hundido)
- Sombra interna sutil: `inset 0 1px 2px rgba(27, 19, 65, 0.04)`
- Border-radius: `--boga-radius-md` (6px)
- Padding: `var(--boga-space-3)` (12px) horizontal, `var(--boga-space-2)` (8px) vertical

**Por que**: Radio 6px porque es moderno sin ser exagerado. El padding horizontal de 12px da espacio al texto sin desperdiciar espacio. La sombra interna sutil refuerza la sensacion de "hundido".

**Surfaces**: `--boga-surface-inset` (#f0eff4).

**Typography**:
- Label: `var(--boga-text-caption)` (0.75rem / 500 / uppercase / letter-spacing 0.08em / `--boga-text-secondary`)
- Input: `var(--boga-text-body-md)` (1rem / 400 / `--boga-text-primary`)
- Error: `var(--boga-text-body-sm)` (0.875rem / 400 / `--boga-error-500`)
- Placeholder: `var(--boga-text-body-md)` (1rem / 400 / `--boga-text-muted`)

**Spacing**:
- Gap label-input: `var(--boga-space-1)` (4px)
- Gap input-error: `var(--boga-space-1)` (4px)
- Margin-bottom del grupo: `var(--boga-space-4)` (16px)

**States**:
- Default: fondo inset, borde transparente
- Hover: fondo ligeramente mas oscuro (`--boga-deep-100`), 150ms
- Focus: borde `--boga-border-focus`, ring `--boga-border-focus-ring`, fondo blanco
- Error: borde `--boga-error-500`, fondo `--boga-error-50`, texto error debajo
- Disabled: fondo `--boga-neutral-100`, texto `--boga-text-muted`, cursor not-allowed
- Valid: borde `--boga-success-500` (opcional), checkmark icon

**Select/Dropdown**: Mismo estilo que input, con chevron icon a la derecha. Dropdown list: `--boga-surface-floating` con `--boga-shadow-4`.

**Textarea**: Mismo estilo que input, pero con min-height de 120px y resize vertical.

---

### 8.6 Footer

**Intent**: El footer es la "despedida del evento". Debe dejar al usuario con la sensacion de que BOGA es profesional, accesible, y siempre disponible. Es tambien el ultimo CTA antes de irse.

**Hierarchy**:
1. CTA banner: "Listo para elevar tu evento?" + boton Cotizar (sobre fondo azul electrico)
2. Grid de 4 columnas: Logo+info, Productos, Servicios, Contacto
3. Barra inferior: Copyright, redes sociales, link admin

**Palette**:
- Fondo: `--boga-surface-dark` (#1b1341)
- Texto: `--boga-text-inverted` (blanco)
- Texto secundario: `rgba(255,255,255,0.7)`
- Links: `rgba(255,255,255,0.8)`, hover: blanco
- CTA banner: `--boga-electric-500` fondo
- Boton CTA: `--boga-lima-500` fondo
- Bordes: `rgba(255,255,255,0.1)`

**Por que**: Fondo azul profundo porque es el color de sofisticacion. El footer oscuro es "la noche despues del evento" — elegante, tranquilo, profesional. Los textos en blanco/blanquecino sobre azul profundo pasan WCAG AAA.

**Depth**:
- Nivel 0 (flat). El footer es una superficie continua.
- Separador de columnas: `1px solid rgba(255,255,255,0.1)`
- CTA banner: puede tener gradiente sutil `--boga-electric-500` → `--boga-electric-600`

**Surfaces**: `--boga-surface-dark` (#1b1341). CTA banner: `--boga-surface-hero`.

**Typography**:
- CTA heading: `var(--boga-text-heading-1)` (2.25rem / 700 / blanco)
- Column headings: `var(--boga-text-caption)` (0.75rem / 700 / uppercase / letter-spacing 0.08em / blanco)
- Links: `var(--boga-text-body-sm)` (0.875rem / 400 / `rgba(255,255,255,0.8)`)
- Info texto: `var(--boga-text-body-sm)` (0.875rem / 400 / `rgba(255,255,255,0.7)`)
- Copyright: `var(--boga-text-caption)` (0.75rem / 400 / `rgba(255,255,255,0.5)`)

**Spacing**:
- Padding CTA banner: `var(--boga-space-16)` (64px) vertical
- Padding footer: `var(--boga-space-16)` (64px) top, `var(--boga-space-8)` (32px) bottom
- Gap entre columnas: `var(--boga-space-8)` (32px)
- Gap links dentro de columna: `var(--boga-space-2)` (8px)

**Responsive**: 4 columnas → 2x2 grid (tablet) → 1 columna apilada (mobile). CTA banner texto centrado en mobile.

---

### 8.7 Stats / Numbers (Our Numbers)

**Intent**: Los numeros son la "prueba de confianza". Un organizador de eventos necesita ver datos duros antes de confiar. Los stats deben sentirse como un contador de evento exitoso.

**Hierarchy**:
1. Numero grande en display (ej: "30+")
2. Label debajo (ej: "anos de experiencia")
3. Icono decorativo opcional (3 circulos BOGA como separador)

**Palette**:
- Fondo: `--boga-surface-dark` (#1b1341) o `--boga-surface-muted` (#f8f8fa)
- Numeros: `--boga-lima-500` (sobre fondo oscuro) o `--boga-electric-500` (sobre fondo claro)
- Labels: `--boga-text-inverted` (sobre oscuro) o `--boga-text-secondary` (sobre claro)
- Separador: 3 circulos BOGA en `--boga-lima-500` (sobre oscuro) o `--boga-electric-500` (sobre claro)

**Por que**: Numeros en lima sobre fondo oscuro porque son "destellos de exito". El lima es el color de la energia positiva. Sobre fondo claro, usamos azul electrico para mantener la conexion con la marca.

**Depth**: Nivel 0. Los stats son contenido, no componentes elevados.

**Surfaces**: Variable segun contexto.

**Typography**:
- Numeros: `var(--boga-text-display-lg)` (3rem / 800 / color acento)
- Labels: `var(--boga-text-caption)` (0.75rem / 500 / uppercase / letter-spacing 0.08em)

**Spacing**:
- Gap entre stats: `var(--boga-space-12)` (48px) desktop, `var(--boga-space-8)` (32px) mobile
- Gap numero-label: `var(--boga-space-2)` (8px)

**Animation**: Los numeros usan un contador animado que incrementa desde 0 hasta el valor final en 1.5s con easing ease-out. Esto crea el efecto de "contando eventos exitosos".

---

### 8.8 Badge (ISO / Categoria)

**Intent**: Comunicar categoria, certificacion o estado en un espacio minimo. El badge debe ser escaneable en 200ms.

**Variants**:

| Variante | Fondo | Texto | Uso |
|----------|-------|-------|-----|
| `lima` | `--boga-lima-500` | `--boga-text-on-lima` | "VIP", "Premium", "Nuevo", acentos |
| `electric` | `--boga-electric-500` | `#ffffff` | "Inclusivo", "Tecnologia", categorias |
| `gold` | `#c9a84c` | `#1b1341` | "ISO 9001", "ISO 14001", certificaciones |
| `neutral` | `--boga-neutral-200` | `--boga-neutral-700` | "Mas popular", etiquetas genericas |
| `success` | `--boga-success-500` | `#ffffff` | "Disponible", "Confirmado" |
| `outline` | transparent | `--boga-electric-500` | Badges sutiles sobre fondos claros |

**Depth**: Nivel 1 (`--boga-shadow-1`). Un badge es un elemento pequeno que necesita "flotar" ligeramente sobre su contenedor.

**Surfaces**: Segun variante.

**Typography**: `var(--boga-text-caption)` (0.75rem / 700 / uppercase / letter-spacing 0.08em)

**Spacing**:
- Padding: `var(--boga-space-1)` (4px) vertical, `var(--boga-space-2)` (8px) horizontal
- Border-radius: `--boga-radius-xs` (2px) para badges angostos, `--boga-radius-full` para pill badges

**Por que**: Los badges ISO usan dorado (#c9a84c) porque es el color universal de certificacion/premium. No es un color del brand kit BOGA, pero es un estandar de la industria que los usuarios esperan. El lima es para las categorias BOGA propias.

---

### 8.9 Marquee (Cinta de Clientes/Eventos)

**Intent**: Mostrar credibilidad mediante volumen. "Mira cuantos eventos hemos atendido". El marquee es prueba social en movimiento.

**Hierarchy**: Textos de nombres de eventos en fila infinita, separados por los 3 circulos BOGA miniatura.

**Palette**:
- Fondo: `--boga-surface-muted` (#f8f8fa) o transparente
- Texto: `--boga-text-secondary` (#544e63)
- Separador (circulos): `--boga-electric-300` (version sutil)
- Overlays de fade: gradiente hacia `--boga-surface-muted` en ambos extremos

**Por que**: Fondo muted porque el marquee es decorativo/informativo, no es contenido principal. Los textos en gris secundario para que no compitan con los headings. Los circulos BOGA como separador refuerzan la marca.

**Depth**: Nivel 0. El marquee es una cinta plana.

**Surfaces**: `--boga-surface-muted` o transparente.

**Typography**: `var(--boga-text-body-md)` (1rem / 500 / `--boga-text-secondary` / uppercase / letter-spacing 0.05em)

**Motion**: Animacion CSS `marquee` 30s linear infinite. Velocidad constante, no aceleracion. El marquee no debe llamar la atencion, solo crear ambiente.

```css
@keyframes boga-marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.boga-marquee-track {
  animation: boga-marquee 30s linear infinite;
}
```

**Responsive**: Velocidad aumenta en mobile (20s) porque hay menos espacio visible. Texto puede reducirse a `body-sm`.

---

### 8.10 Emergency Button

**Intent**: El boton de emergencia es un lifeline. Debe ser encontrado en segundos por alguien con panico (bano colapsado en medio de un evento). Diseno: "no puedes ignorarme".

**Hierarchy**: Icono de telefono + "EMERGENCIA". El icono es primero porque en panico se procesan imagenes mas rapido que texto.

**Palette**:
- Fondo: `--boga-error-600` (#e02424)
- Texto/Icono: `#ffffff`
- Hover: `--boga-error-700` (#c81e1e)
- Pulse: sombra pulsante roja `0 0 0 0 rgba(224, 36, 36, 0.4)` → `0 0 0 12px rgba(224, 36, 36, 0)`

**Por que**: Rojo puro de emergencia. No es un color BOGA, pero es un color universal que trasciende marcas. En emergencia, la marca cede ante la usabilidad. La sombra pulsante atrae atencion periferica sin ser agresiva.

**Depth**:
- Nivel 3 (elevated) constante: `--boga-shadow-3`
- Pulse shadow: animacion infinita de 2s
- Border-radius: `--boga-radius-md` (6px)

**Surfaces**: Color solido, sin variacion de superficie.

**Typography**: `var(--boga-text-caption)` (0.75rem / 700 / uppercase / letter-spacing 0.05em)

**Spacing**: Padding `var(--boga-space-2) var(--boga-space-3)` (8px 12px)

**Animation**:
```css
@keyframes boga-pulse-emergency {
  0%   { box-shadow: 0 0 0 0 rgba(224, 36, 36, 0.4); }
  70%  { box-shadow: 0 0 0 12px rgba(224, 36, 36, 0); }
  100% { box-shadow: 0 0 0 0 rgba(224, 36, 36, 0); }
}

.boga-btn-emergency {
  animation: boga-pulse-emergency 2s infinite;
}
```

**Ubicacion**: Navbar (siempre visible), fixed bottom-right en mobile, WhatsApp como fallback.

---

### 8.11 Empty State

**Intent**: Cuando no hay datos (no hay productos filtrados, no hay cotizaciones), la interfaz no debe sentirse rota. Debe guiar al usuario hacia la siguiente accion.

**Hierarchy**:
1. Icono/ilustracion (3 circulos BOGA en version grande)
2. Titulo: "No hay resultados" / "Aun no hay cotizaciones"
3. Descripcion: Explicacion amable
4. CTA: Accion para salir del estado vacio

**Palette**:
- Fondo: `--boga-surface-canvas` o `--boga-surface-muted`
- Icono: `--boga-neutral-300` (gris sutil, no llama atencion)
- Titulo: `--boga-text-secondary`
- Descripcion: `--boga-text-tertiary`
- CTA: `--boga-electric-500` (ghost button)

**Por que**: Colores neutros porque el empty state no es contenido, es ausencia de contenido. No debe usar colores de acento (seria como gritar en una habitacion vacia). Los 3 circulos BOGA en gris mantienen la marca presente sin ser intrusivos.

**Depth**: Nivel 0.

**Surfaces**: `--boga-surface-muted`.

**Typography**:
- Titulo: `var(--boga-text-heading-3)` (1.5rem / 600 / `--boga-text-secondary`)
- Descripcion: `var(--boga-text-body-md)` (1rem / 400 / `--boga-text-tertiary`)
- CTA: `var(--boga-text-body-md)` (1rem / 600 / `--boga-electric-500`)

**Spacing**: Centrado, padding generoso (`var(--boga-space-24)` vertical).

---

### 8.12 Error State

**Intent**: Cuando algo falla (404, error de servidor, formulario invalido), la interfaz debe transmitir: "Esto es un contratiempo, no un desastre. BOGA lo soluciona."

**Hierarchy**:
1. Codigo de error grande ("404")
2. Ilustracion: 3 circulos BOGA con uno "roto" (outline rojo)
3. Titulo: "Pagina no encontrada" / "Algo salio mal"
4. Descripcion: Explicacion + disculpa
5. CTA: "Volver al inicio" / "Intentar de nuevo"

**Palette**:
- Fondo: `--boga-surface-canvas`
- Codigo: `--boga-error-500` a muy baja opacidad (0.1) como watermark gigante
- Titulo: `--boga-text-primary`
- Descripcion: `--boga-text-secondary`
- Circulo "roto": `--boga-error-500` para el outline del circulo vacio
- CTA: `--boga-electric-500`

**Por que**: El error no debe usar rojo agresivo en todo el diseno (eso aumenta la ansiedad). Solo el circulo "roto" usa rojo como senal. El resto es neutro/calmado.

**Depth**: Nivel 0.

**Surfaces**: `--boga-surface-canvas`.

**Typography**:
- Codigo: `var(--boga-text-display-3xl)` (5.5rem / 900 / `--boga-error-500` / opacity 0.1)
- Titulo: `var(--boga-text-heading-1)` (2.25rem / 700 / `--boga-text-primary`)
- Descripcion: `var(--boga-text-body-md)` (1rem / 400 / `--boga-text-secondary`)
- CTA: Button secondary

---

### 8.13 Dropdown Menu

**Intent**: Mostrar opciones de navegacion secundaria (sub-menu de productos, acciones de usuario) sin navegar a otra pagina.

**Hierarchy**: Trigger (boton/link) → panel desplegable → lista de items → posible sub-menu.

**Palette**:
- Fondo: `--boga-surface-floating` (#ffffff)
- Sombra: `--boga-shadow-4` (modales/drawers)
- Items: `--boga-text-primary`
- Items hover: `--boga-electric-50` fondo, `--boga-electric-500` texto
- Separador: `--boga-border-subtle`
- Border-radius: `--boga-radius-xl` (12px)

**Por que**: Fondo blanco puro (no inset) porque el dropdown "flota" sobre el contenido. Sombra nivel 4 porque necesita separarse claramente del fondo. Items hover en azul electrico sutil para feedback.

**Depth**:
- Nivel 4: `--boga-shadow-4`
- Padding: `var(--boga-space-2)` (8px)
- Border-radius: `--boga-radius-xl` (12px)

**Surfaces**: `--boga-surface-floating`.

**Typography**:
- Items: `var(--boga-text-body-sm)` (0.875rem / 400 / `--boga-text-primary`)
- Items hover: `var(--boga-text-body-sm)` (0.875rem / 600 / `--boga-electric-500`)
- Separador: 1px solid `--boga-border-subtle`

**Motion**: Apertura 150ms ease-enter, desplazamiento de 8px hacia abajo con opacidad 0→1. Cierre 100ms ease-exit.

**Spacing**:
- Padding item: `var(--boga-space-2) var(--boga-space-3)` (8px 12px)
- Gap entre items: 0 (lista continua)
- Min-width: 200px

---

### 8.14 Modal / Dialog

**Intent**: Interrumpir el flujo solo cuando es necesario (confirmacion, formulario embebido, detalle rapido). El modal debe sentirse como "una conversacion", no como una barrera.

**Hierarchy**:
1. Overlay oscuro semi-transparente
2. Panel central (card grande)
3. Header: Titulo + boton cerrar (X)
4. Body: Contenido
5. Footer: Acciones (Cancelar / Confirmar)

**Palette**:
- Overlay: `rgba(27, 19, 65, 0.6)` (azul profundo semi-transparente, no negro)
- Panel: `--boga-surface-elevated` (#ffffff)
- Sombra: `--boga-shadow-5` (maxima elevacion)
- Titulo: `--boga-text-primary`
- Boton cerrar: `--boga-text-tertiary`, hover: `--boga-error-500`
- Acciones: Button secondary (cancelar) + Button primary (confirmar)

**Por que**: Overlay en azul profundo (no negro) porque mantiene la coherencia cromatica de BOGA. Un overlay negro sobre un sitio azul se siente "sucio". El azul profundo transparente es elegante y calmado.

**Depth**:
- Nivel 5: `--boga-shadow-5` (maxima)
- Border-radius: `--boga-radius-2xl` (16px)
- Max-width: 560px (modal estandar), 720px (modal grande)
- Padding: `var(--boga-space-6)` (24px)

**Surfaces**: `--boga-surface-elevated` con `--boga-shadow-5`.

**Typography**:
- Titulo: `var(--boga-text-heading-2)` (1.875rem / 700 / `--boga-text-primary`)
- Body: `var(--boga-text-body-md)` (1rem / 400 / `--boga-text-primary`)
- Boton cerrar: 24px icono

**Motion**:
- Overlay: fade-in 300ms ease-smooth
- Panel: slide-up 300ms ease-enter (translateY 20px → 0) + fade-in
- Cierre: reverse, 200ms ease-exit

**Spacing**:
- Padding panel: `var(--boga-space-6)` (24px)
- Gap header-body: `var(--boga-space-4)` (16px)
- Gap body-footer: `var(--boga-space-6)` (24px)
- Gap botones footer: `var(--boga-space-3)` (12px)

**Responsive**: En mobile (<768px), el modal se convierte en bottom sheet que ocupa 90% de la pantalla desde abajo. Slide-up desde bottom en lugar de center.

---

## 9. Checks

### 9.1 Swap Test

> **Pregunta**: Que pasaria si cambio Montserrat por Inter? La interfaz sigue siendo BOGA?

**Resultado**: **PARCIALMENTE**. Inter es una sans-serif geometrica similar en pesos (300-900), pero carece de las formas redondeadas distintivas de Montserrat. La "O" de Montserrat es casi circular (como el logo BOGA), la de Inter es ovalada. El tracking negativo en display funciona con ambas, pero la sensacion de "geometria redondeada" se pierde con Inter.

**Elementos que SOBREVIVEN al swap**:
- La paleta de colores (es 100% BOGA)
- Los 3 circulos BOGA (signature)
- La distribucion 60/30/10
- La estrategia surface-color

**Elementos que NO sobreviven**:
- La coherencia entre tipografia y logo (la "B" redondeada del isotipo vs letras angulosas de Inter)
- El feel de "festival + confianza" (Inter es demasiado corporativa, demasiado "sistema")
- "INGENIERIA PORTATIL" pierde sofisticacion con Inter Light

**Veredicto**: La interfaz sigue siendo reconocible como BOGA por colores y signature, pero pierde aproximadamente 30% de su personalidad distintiva. **Montserrat es la eleccion correcta**.

### 9.2 Squint Test

> **Pregunta**: La jerarquia se percibe con ojos borrosos?

**Resultado**: **APROBADO**.

**Hero**: Con ojos borrosos, se percibe:
1. Un bloque grande BLANCO centrado ("BOGA") — claramente el foco
2. Un bloque amarillo pequeno debajo (CTA) — claramente la accion
3. Un fondo azul uniforme — el escenario

**Product Cards**: Con ojos borrosos:
1. Rectangulos blancos con sombra (las cards se despegan del fondo)
2. Manchas amarillas en la esquina (badges) — escaneables como categorias
3. Texto gris debajo (informacion secundaria)

**Stats**: Con ojos borrosos:
1. Numeros grandes amarillos (los mas brillantes del bloque)
2. Texto pequeno gris debajo

**Nav**: Con ojos borrosos:
1. Rectangulo blanco en la parte superior
2. Mancha amarilla a la derecha (CTA)
3. Mancha roja pequena (emergencia)

**Veredicto**: La jerarquia visual funciona incluso sin ver los detalles. Los contrastes de tamano, color, y elevacion son claros.

### 9.3 Signature Test

> **Pregunta**: Donde aparecen los 3 circulos BOGA? (5 lugares minimos)

**Resultado**: **APROBADO — 8 lugares confirmados**.

| # | Ubicacion | Como aparecen | Tamano |
|---|-----------|---------------|--------|
| 1 | **Loading states** | Spinner animado: 2 circulos lima llenos + 1 vacio, pulsando | 12px cada uno |
| 2 | **Transiciones de seccion** | 3 circulos como separador visual entre secciones | 8px cada uno |
| 3 | **Bullets de lista** | En listas de features ("Por que BOGA?"), cada item usa los 3 circulos como viñeta | 6px cada uno |
| 4 | **Marca de agua** | En fondos de seccion oscuros, los 3 circulos en opacity 0.05 como patron decorativo | Variable |
| 5 | **Hero decorativo** | Esquina superior derecha del hero, opacity 0.3 | 16px cada uno |
| 6 | **Wizard de cotizacion** | Indicadores de paso (step 1, 2, 3): cada paso es un circulo BOGA | 20px cada uno |
| 7 | **Footer** | Separador entre CTA banner y contenido de footer | 10px cada uno |
| 8 | **Favicon** | El isotipo BOGA contiene implicitamente los 3 circulos en su version completa | 16-32px |

**Veredicto**: Los 3 circulos aparecen en suficientes lugares para ser memorable, pero no en tantos que se vuelvan molestos. Son como el "sonido de marca" visual: presente pero sutil.

### 9.4 Token Test

> **Pregunta**: Los nombres de tokens (--boga-electric) pertenecen a BOGA o a cualquier proyecto?

**Resultado**: **APROBADO — 100% especifico de BOGA**.

| Token | Analisis |
|-------|----------|
| `--boga-electric-*` | "Electrico" es el nombre del azul en el brand kit. Solo BOGA tiene un "Azul Electrico #2c4df2". |
| `--boga-deep-*` | "Deep" = profundo. Refiere al "Azul Profundo #1b1341" del brand kit. |
| `--boga-lima-*` | "Lima" es el nombre del acento en el brand kit. El #daf73a es un lima distintivo. |
| `--boga-neutral-*` | Aunque "neutral" es generico, la escala tiene tinte azulado especifico de BOGA. |
| `--boga-surface-*` | Los nombres de superficies (canvas, elevated, floating, inset, muted) describen el sistema BOGA. |
| `--boga-text-on-lima` | Especifico: texto sobre el color lima. No aplica a ninguna otra marca. |

**Tokens rechazados (demasiado genericos)**:
- ~~`--blue-500`~~ → `--boga-electric-500`
- ~~`--gray-700`~~ → `--boga-neutral-700`
- ~~`--primary`~~ → `--boga-electric-500` (en contexto) o se mantiene como alias
- ~~`--accent`~~ → `--boga-lima-500`

**Veredicto**: Cada token name es unico para BOGA. Si otro proyecto usara estos tokens, estaria claramente copiando a BOGA.

---

## 10. Archivos a Modificar

### 10.1 Fase 1: Tokens Globales y Layout

| # | Archivo | Cambios especificos |
|---|---------|---------------------|
| 1 | `src/app/globals.css` | **REEMPLAZAR completamente** la seccion `@theme inline` (lineas 17-216) con los tokens BOGA. Reemplazar variables `:root` (lineas 218-288) con CSS custom properties BOGA. Mantener estructura de `@layer components` y `@layer utilities` pero actualizar valores. Actualizar animaciones (pulse-emergency con rojo BOGA, marquee). |
| 2 | `src/app/layout.tsx` | Cambiar Google Fonts: de `Outfit + Space Grotesk` a `Montserrat:wght@300;400;500;600;700;900`. Actualizar metadata: title template de `%s \| Junisama` a `%s \| BOGA`. Actualizar favicon: `/favicon.svg` → nuevo favicon BOGA. Actualizar JSON-LD: nombre, tagline, logo URL. Actualizar preconnects si es necesario. |
| 3 | `src/components/logo.tsx` | **REEMPLAZAR SVG** con el isotipo BOGA (B estilizada con iconos de bano) + wordmark "BOGA" + barra lima + "INGENIERIA PORTATIL". Usar colores del brand kit via CSS variables o props. Soportar variantes light/dark. |
| 4 | `src/components/providers.tsx` | Actualizar offset `pt-[72px]` si cambia la altura del navbar (mantener 72px). |

### 10.2 Fase 2: Layout y Componentes Principales

| # | Archivo | Cambios especificos |
|---|---------|---------------------|
| 5 | `src/components/layout/navbar.tsx` | Cambiar fondo a blanco con blur. Cambiar colores de texto a `--boga-text-primary`. Cambiar CTA a boton lima pill. Cambiar boton emergencia a rojo BOGA con pulse. Actualizar dropdown de productos con paleta BOGA. Cambiar logo a componente Logo BOGA. |
| 6 | `src/components/layout/footer.tsx` | Cambiar fondo a `--boga-deep-500`. Cambiar texto a blanco/70%. Actualizar CTA banner con fondo `--boga-electric-500`. Cambiar boton a lima. Actualizar links, iconos sociales. Cambiar info de contacto (telefono, email, direcciones). |
| 7 | `src/components/home/hero.tsx` | **REESTRUCTURAR**: Fondo azul electrico con gradiente. Wordmark "BOGA" en display-3xl blanco. "INGENIERIA PORTATIL" en overline. Tagline. CTAs dual (lima + outline). Stats con numeros lima. Elemento decorativo 3 circulos. |
| 8 | `src/components/home/why-us.tsx` | Cambiar fondo oscuro a `--boga-deep-500`. Actualizar iconos a estilo lineal BOGA. Cambiar colores de texto a blanco/gris. |
| 9 | `src/components/home/contact.tsx` | Cambiar fondo a `--boga-deep-500`. Actualizar formulario con estilos input BOGA. Cambiar info de contacto. |
| 10 | `src/components/home/fade-in.tsx` | Mantener funcionalidad, actualizar duracion a 400ms y easing a `--boga-easing-smooth`. |

### 10.3 Fase 3: Componentes de Contenido

| # | Archivo | Cambios especificos |
|---|---------|---------------------|
| 11 | `src/components/product-card.tsx` | Cambiar estilo de card: fondo blanco, sombra BOGA, borde-radius 8px. Actualizar badge colors (lima/electric/gold). Cambiar tipografia a Montserrat. Actualizar hover effect (translateY -4px + sombra nivel 3). Cambiar precio color a `--boga-electric-500`. |
| 12 | `src/components/product-grid.tsx` | Actualizar grid gap a `--boga-grid-gap`. Cambiar colores de fondo si aplica. |
| 13 | `src/components/client-marquee.tsx` | Cambiar estilo de texto: body-md, uppercase, tracking 0.05em, `--boga-text-secondary`. Cambiar separadores a 3 circulos BOGA miniatura. Actualizar velocidad de animacion. Cambiar fondo a `--boga-surface-muted`. |
| 14 | `src/components/our-numbers.tsx` | Cambiar numeros a `--boga-lima-500` (sobre fondo oscuro) o `--boga-electric-500` (sobre claro). Actualizar tipografia a Montserrat 800. Cambiar labels a caption uppercase. Agregar separador de 3 circulos entre stats. |
| 15 | `src/components/layout/whatsapp-button.tsx` | Mantener color WhatsApp (#25d366) porque es estandar de la plataforma. Posicion y comportamiento sin cambios. |

### 10.4 Fase 4: Paginas y Contenido

| # | Archivo | Cambios especificos |
|---|---------|---------------------|
| 16 | `src/app/page.tsx` | Revisar orden y props de componentes. Verificar que todos los componentes rebrandeados se usen correctamente. |
| 17 | `src/app/productos/page.tsx` | Actualizar tabs de categoria con colores BOGA. Cambiar tipografia. Actualizar filtros. |
| 18 | `src/app/productos/[slug]/page.tsx` | Cambiar layout de detalle con paleta BOGA. Actualizar breadcrumbs. |
| 19 | `src/app/servicios/page.tsx` | Cambiar iconos a estilo lineal BOGA. Actualizar cards con sombra y colores BOGA. |
| 20 | `src/app/quienes-somos/page.tsx` | Cambiar tipografia, colores de seccion. Actualizar contenido corporativo (mision/vision/valores). |
| 21 | `src/app/contacto/page.tsx` | Actualizar formulario con estilos input BOGA. Cambiar info de contacto. |
| 22 | `src/app/cotizacion/page.tsx` | Actualizar wizard con colores BOGA. Step indicators con 3 circulos BOGA. |
| 23 | `src/app/galeria/page.tsx` | Cambiar colores de filtros de tipo de evento a paleta BOGA. |
| 24 | `src/app/faq/page.tsx` | Actualizar acordeon con colores BOGA (focus ring azul electrico). |
| 25 | `src/app/design-system/page.tsx` | **REESCRIBIR** con los nuevos tokens BOGA como documentacion viva. |

### 10.5 Fase 5: Datos y Configuracion

| # | Archivo | Cambios especificos |
|---|---------|---------------------|
| 26 | `src/lib/seo.ts` | Actualizar `siteConfig`: nombre "BOGA", tagline "Elevamos el estandar de tus eventos.", URL, logo, telefono, email, WhatsApp, direcciones, redes sociales. Actualizar todas las descripciones SEO. |
| 27 | `src/lib/mocks.ts` | Actualizar `nombreSitio`, `telefono`, `email`, `whatsappNumero`, `direccion*`, `instagramUrl`, `linkedinUrl`. Actualizar nombres de productos si cambian. |
| 28 | `public/logo.svg` | Reemplazar con logo BOGA completo (isotipo + wordmark + barra + sub-marca). |
| 29 | `public/favicon.svg` | Reemplazar con isotipo BOGA (B estilizada). |
| 30 | `public/favicon.ico` | Regenerar desde el nuevo favicon.svg. |
| 31 | `public/og-image.jpg` | Generar nueva OG image con marca BOGA, colores, y tagline. |

### 10.6 Fase 6: Admin (Opcional / Posteriorente)

| # | Archivo | Cambios especificos |
|---|---------|---------------------|
| 32 | `src/components/admin/status-badge.tsx` | Reemplazar hex literales por tokens semanticos BOGA. |
| 33 | `src/components/admin/kpi-card.tsx` | Actualizar colores de tendencias con tokens BOGA. |
| 34 | `src/components/admin/cotizaciones-status-chart.tsx` | Reemplazar hex literales por tokens semanticos. |
| 35 | Tema admin (`[data-admin-theme="dark"]`) | Decidir si el admin adopta paleta BOGA o mantiene tema dorado oscuro separado. |

### 10.7 Fase 7: Assets

| # | Tarea | Descripcion |
|---|-------|-------------|
| 36 | Fotos de productos (8) | Obtener/subir fotos reales de banos portatiles BOGA. |
| 37 | Foto/video hero | Obtener foto o video real de evento con banos BOGA. |
| 38 | Fotos de eventos (50) | Obtener autorizaciones y fotos para la galeria. |
| 39 | Fotos de equipo | Fotos reales del equipo BOGA para quienes-somos. |
| 40 | OG image | Generar OG image con marca BOGA y fotografia de calidad. |

---

*Fin del Design System Web BOGA*

> **Nota**: Este documento es la fuente de verdad para todas las decisiones de diseno del rebrand. Cada valor, token y decision esta trazada al brand kit BOGA o al dominio del negocio. Cualquier desviacion debe ser documentada y justificada.
