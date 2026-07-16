# Auditoria Forense del Estado Actual — Junisama → BOGA Rebrand

## 1. RESUMEN EJECUTIVO

La empresa **Junisama Inversiones S.A.S** opera un sitio web en produccion (junisama.com.co) que sera completamente rebrandeado bajo el nombre **BOGA**. Existe un prototipo funcional desplegado en Vercel (junisama-seven.vercel.app) que ya contiene mejoras significativas respecto al sitio de produccion: catalogo de productos con 8 unidades, sistema de cotizacion de 3 pasos, panel administrativo, filtros de productos funcionales, y un sistema de diseno mas pulido.

Este documento inventaria con precision quirurgica cada componente, pagina, color, tipografia, copy y funcionalidad del estado actual para garantizar que nada se pierda durante la transicion de marca.

**Alcance de la auditoria:**
- **Prototipo Vercel (PRIORIDAD):** 9 paginas principales + panel admin + paginas legales
- **Produccion (referencia):** 4 paginas principales, funcionalidades y estructura de negocio
- **Diferencias clave identificadas:** 5 paginas adicionales en prototipo, sistema de cotizacion, panel admin, catalogo de productos con filtros

**Riesgos criticos a gestionar en el rebrand:**
1. Panel de administracion con autenticacion (no perder acceso)
2. Boton de Emergencia (funcionalidad de llamada telefonica)
3. Sistema de cotizacion de 3 pasos (flujo de negocio)
4. 33 eventos de la galeria (activos de contenido)
5. Sedes con mapas embebidos (Google Maps)

---

## 2. INVENTARIO DE PAGINAS

### 2.1 Home (/)

**Estructura de la pagina:**

| Seccion | Orden | Descripcion |
|---------|-------|-------------|
| Header | 1 | Fijo, transparente → solido al scroll |
| Hero | 2 | Pantalla completa, fondo oscuro con textura sutil |
| Stats Bar | 3 | Barra horizontal semitransparente con 4-6 metricas |
| Eventos/Clientes | 4 | Marquee o grid de eventos destacados |
| Diferenciadores | 5 | 6 stats cards con iconos ("La diferencia Junisama") |
| Footer | 6 | Oscuro, 4 columnas |

**Hero — Contenido exacto:**
- Badge: "ISO14001 CERTIFICADO" en dorado (~#C9A84C) con borde sutil
- Titulo principal: "INFRAESTRUCTURA SANITARIA INDUSTRIAL"
  - Palabra "INDUSTRIAL" resaltada en naranja coral (~#E8632B)
  - Fuente: Sans-serif geometrica, bold, ~48-56px desktop
- Subtitulo: Texto descriptivo del servicio (saneamiento para eventos e industria)
- CTA primario: "SOLICITAR PRESUPUESTO A LA MEDIDA" — boton naranja solido, pill (border-radius ~50px)
- CTA secundario: "VER SERVICIOS" — boton outline blanco, pill

**Stats Bar — Metricas (4 visibles en hero):**
| Metrica | Valor | Label |
|---------|-------|-------|
| Clientes atendidos | 500+ | EVENTOS ATENDIDOS |
| Disponibilidad | 24/7 | DISPONIBILIDAD |
| Efectividad | 99.9% | EFECTIVIDAD |
| Experiencia | 10+ | ANOS DE EXPERIENCIA |

- Estilo: Fondo oscuro semitransparente (~rgba(15,25,35,0.85)), numeros en dorado (~#C9A84C), labels en blanco/gris claro en mayusculas con tracking amplio

**Seccion "La diferencia Junisama" — 6 Stats Cards:**
| # | Icono | Valor | Label |
|---|-------|-------|-------|
| 1 | Evento/calendario | 500+ | Eventos Atendidos |
| 2 | Reloj | 24/7 | Disponibilidad |
| 3 | Check/escudo | 99.9% | Efectividad |
| 4 | Experiencia/trofeo | 10+ | Anos de Experiencia |
| 5 | (adicional) | — | — |
| 6 | (adicional) | — | — |

- Estilo: Cards con fondo oscuro, icono dorado, numero grande dorado, label inferior

**Seccion Eventos:**
- Grid o marquee horizontal con logotipos/nombres de eventos destacados
- Los 33 eventos se listan (ver seccion 2.4 para listado completo)

---

### 2.2 Productos (/productos)

**Estructura de la pagina:**

| Seccion | Orden | Descripcion |
|---------|-------|-------------|
| Header | 1 | Fijo |
| Hero | 2 | Fondo oscuro, titulo centrado |
| Filtros (Tabs) | 3 | 5 categorias de filtro |
| Grid Productos | 4 | 8 cards en grid responsivo |
| Footer | 5 | Oscuro |

**Hero — Contenido:**
- Titulo: "NUESTROS PRODUCTOS" (o similar)
- Palabra clave resaltada en naranja
- Subtitulo descriptivo

**Filtros/Tabs — 5 categorias:**
1. **Todos** — Muestra los 8 productos
2. **Banos portatiles** — Filtra unidades de bano
3. **Lavamanos** — Filtra estaciones de lavado
4. **Puntos ecologicos** — Filtra unidades ecologicas
5. **Servicios** — Filtra servicios (operarios, etc.)

**Grid de 8 Productos — Detalle completo:**

| # | Nombre | Tag | Color Circulo | Letra Icono | Specs Inline |
|---|--------|-----|---------------|-------------|--------------|
| 1 | Bano VIP | Premium | Azul (~#3B82F6) | B | Capacidad, dimensiones |
| 2 | Bano Estandar | Mas popular | Verde (~#22C55E) | L | Capacidad, dimensiones |
| 3 | Bano Discapacitados | Inclusivo | Morado (~#A855F7) | T | Accesibilidad, normativa |
| 4 | Bano Electricos | Tecnologia | Naranja (~#F97316) | S | Calefaccion, iluminacion |
| 5 | Lavamanos | Alto volumen | Rosa (~#EC4899) | P | Capacidad, conexiones |
| 6 | Trailer de Lujo | Premium | (color propio) | — | Lujo, acabados |
| 7 | Operarios | Servicio | (color propio) | — | Certificaciones |
| 8 | Puntos Ecologicos | Sostenible | Verde oscuro | — | Reciclaje, compostaje |

**Estructura de cada Product Card:**
- Imagen placeholder con letra/icono en circulo de color sobre fondo oscuro
- Texto "FOTO REAL PENDIENTE" visible en la card
- Tag/badge superpuesto (esquina superior): Premium / Mas popular / Inclusivo / Tecnologia / Alto volumen / Sostenible
- Titulo del producto (bold, blanco)
- Descripcion corta (gris claro, 2-3 lineas)
- Specs tecnicos inline (icono + valor): capacidad, dimensiones, peso, etc.
- Link "Ver detalles" (texto + flecha, naranja o blanco)
- Hover: elevacion sutil o cambio de borde

---

### 2.3 Servicios (/servicios)

**Estructura de la pagina:**

| Seccion | Orden | Descripcion |
|---------|-------|-------------|
| Header | 1 | Fijo |
| Hero | 2 | Fondo oscuro con gradiente azul-navy |
| Lista Servicios | 3 | 4 servicios en cards o lista vertical |
| Footer | 4 | Oscuro |

**Hero — Contenido:**
- Titulo: "SERVICIOS ESPECIALIZADOS"
- Palabra "ESPECIALIZADOS" resaltada en naranja coral (~#E8632B)
- Subtitulo descriptivo

**4 Servicios — Detalle completo:**

| # | Servicio | Icono | Descripcion | Bullet Points |
|---|----------|-------|-------------|---------------|
| 1 | Alquiler de Unidades | Icono bano/unidad | Alquiler de infrastructura sanitaria portable | Banos portatiles, Lavamanos, Puntos ecologicos, Trailers de lujo |
| 2 | Mantenimiento Especializado | Icono herramienta/mantenimiento | Servicio tecnico continuo | Limpieza profunda, Desinfeccion, Reabastecimiento de insumos, Revision de equipos |
| 3 | Operarios Certificados | Icono persona/escudo | Personal capacitado y uniformado | Operarios de aseo, Vigilantes, Auxiliares de logistica, Supervisores de operacion |
| 4 | Insumos Biodegradables | Icono hoja/eco | Productos eco-amigables | Papel higienico, Jabon biodegradable, Desinfectantes verdes, Sanitizante ecologico |

- Cada servicio tiene un boton "SOLICITAR INFO" (naranja o outline)
- Estilo: Card con fondo oscuro, icono dorado o naranja, titulo en blanco, descripcion en gris, bullets con checkmarks

---

### 2.4 Galeria (/galery → /galeria)

**Estructura de la pagina:**

| Seccion | Orden | Descripcion |
|---------|-------|-------------|
| Header | 1 | Fijo |
| Hero | 2 | Fondo oscuro con gradiente |
| Grid Eventos | 3 | Masonry o grid de 33 cards |
| Footer | 4 | Oscuro |

**Hero — Contenido:**
- Titulo: "NUESTRA GALERIA"
- Palabra "GALERIA" resaltada en naranja coral (~#E8632B)
- Subtitulo descriptivo

**33 Eventos — Listado completo:**

| # | Evento | Imagen |
|---|--------|--------|
| 1 | Alvaro Diaz | B/N + overlay azul + nombre |
| 2 | &ME | B/N + overlay azul + nombre |
| 3 | CORE | B/N + overlay azul + nombre |
| 4 | Feria de Manizales | B/N + overlay azul + nombre |
| 5 | Feria de las Flores | B/N + overlay azul + nombre |
| 6 | RANCHETON ARENA MIX | B/N + overlay azul + nombre |
| 7 | DOOM | B/N + overlay azul + nombre |
| 8 | Carl Cox | B/N + overlay azul + nombre |
| 9 | La Solar | B/N + overlay azul + nombre |
| 10 | RITVALES | B/N + overlay azul + nombre |
| 11 | JAZZ al Parque | B/N + overlay azul + nombre |
| 12 | F-AIR Colombia | B/N + overlay azul + nombre |
| 13 | Joropo al Parque | B/N + overlay azul + nombre |
| 14 | Salsa al Parque | B/N + overlay azul + nombre |
| 15 | Rock al Parque | B/N + overlay azul + nombre |
| 16 | EXPO Cundinamarca | B/N + overlay azul + nombre |
| 17 | Hip Hop al Parque | B/N + overlay azul + nombre |
| 18 | Desfile Autos Clasicos | B/N + overlay azul + nombre |
| 19 | La Gira Alejandro Sanz | B/N + overlay azul + nombre |
| 20 | SODA STEREO | B/N + overlay azul + nombre |
| 21 | BEYOND WONDERLAND | B/N + overlay azul + nombre |
| 22 | FOO FIGHTERS | B/N + overlay azul + nombre |
| 23 | Festival Tatacoa | B/N + overlay azul + nombre |
| 24 | Picnic de Andres | B/N + overlay azul + nombre |
| 25 | Colombia al Parque | B/N + overlay azul + nombre |
| 26 | Festival de Verano Bogota | B/N + overlay azul + nombre |
| 27 | Luis Miguel | B/N + overlay azul + nombre |
| 28 | STEREO PICNIC | B/N + overlay azul + nombre |
| 29 | I Love Bogota | B/N + overlay azul + nombre |
| 30 | Shakira | B/N + overlay azul + nombre |
| 31 | Festival Be You Fest | B/N + overlay azul + nombre |
| 32 | Visita del Papa Francisco | B/N + overlay azul + nombre |
| 33 | Jamming Summer Fest | B/N + overlay azul + nombre |

- Estilo visual: Imagen en blanco y negro con overlay azul oscuro semitransparente
- Nombre del evento en texto blanco centrado
- Efecto hover: Revela color de la imagen o aumenta opacidad

---

### 2.5 Quienes Somos (/quienes-somos)

**Estructura de la pagina:**

| Seccion | Orden | Descripcion |
|---------|-------|-------------|
| Header | 1 | Fijo |
| Hero | 2 | Foto de equipo + overlay azul oscuro |
| Nuestra Empresa | 3 | Texto descriptivo de la mision/vision |
| Nuestro Compromiso | 4 | 3-4 pilares de valor |
| Equipos Disponibles | 5 | Lista de tipos de equipos |
| Servicio Tecnico | 6 | Descripcion de soporte tecnico |
| Sedes | 7 | Mapas de Medellin y Bogota |
| Footer | 8 | Oscuro |

**Hero — Contenido:**
- Imagen de fondo: Foto del equipo completo
- Overlay: Gradiente azul oscuro (~#0F1923 con 70% opacidad)
- Titulo: "NUESTRA EMPRESA" — "EMPRESA" en naranja coral (~#E8632B)

**Seccion "Nuestra Empresa":**
- Parrafo descriptivo sobre la historia, mision y enfoque de la empresa
- Mencion de experiencia en eventos masivos e industria

**Seccion "Nuestro Compromiso" — 3-4 pilares:**
1. Estandares de higiene superiores
2. Eficiencia operativa
3. Experiencia comprobada
4. (Posiblemente) Sostenibilidad ambiental

**Seccion "Equipos Disponibles":**
- Duchas portatiles
- Banos portatiles (VIP, Estandar, Discapacitados)
- Lavamanos
- Equipos especializados

**Seccion "Servicio Tecnico Especializado":**
- Insumos biodegradables
- Compromiso ambiental
- Personal certificado

---

### 2.6 Contacto (/contacto)

**Estructura de la pagina:**

| Seccion | Orden | Descripcion |
|---------|-------|-------------|
| Header | 1 | Fijo |
| Hero | 2 | Fondo oscuro, titulo "CONTACTO INDUSTRIAL" |
| Formulario | 3 | 6 campos + boton de envio |
| Canales Contacto | 4 | Telefono, email, WhatsApp |
| Sedes | 5 | Mapas Google Maps |
| Footer | 6 | Oscuro |

**Formulario — Campos:**
| Campo | Tipo | Requerido | Placeholder |
|-------|------|-----------|-------------|
| Nombre | text | Si | "Tu nombre completo" |
| Empresa | text | No | "Nombre de tu empresa" |
| Email | email | Si | "correo@empresa.com" |
| Telefono | tel | Si | "+57 300 000 0000" |
| Detalles | textarea | Si | "Cuentanos sobre tu evento o necesidad..." |
| — | — | — | — |

- Boton submit: "ENVIAR SOLICITUD" — naranja solido, pill
- Validacion: HTML5 + posiblemente JavaScript
- Mensaje de confirmacion al enviar

**Canales de Contacto:**
- Telefono: Numero de contacto principal
- Email: correo corporativo
- WhatsApp: Boton directo a conversacion

---

### 2.7 Cotizacion (/cotizacion)

**Estructura de la pagina:**

| Seccion | Orden | Descripcion |
|---------|-------|-------------|
| Header | 1 | Fijo |
| Hero | 2 | Fondo oscuro, titulo del proceso |
| Formulario 3 Pasos | 3 | Wizard/progreso paso a paso |
| Footer | 4 | Oscuro |

**Formulario de 3 Pasos:**
- Indicador de progreso (Step 1 → Step 2 → Step 3)
- **Paso 1:** Datos del evento (tipo, fecha, ubicacion, cantidad estimada)
- **Paso 2:** Seleccion de productos/servicios requeridos
- **Paso 3:** Datos de contacto y envio
- Botones: "Siguiente" / "Anterior" / "Enviar cotizacion"
- Resumen visual en el paso 3

---

### 2.8 Panel Admin (/admin)

**Estructura de la pagina:**

| Seccion | Descripcion |
|---------|-------------|
| Login | Formulario de autenticacion |
| Dashboard | Panel de administracion post-login |

**Login — Campos:**
- Usuario / Email
- Contrasena
- Boton "INGRESAR"
- Posiblemente: "Olvide mi contrasena"

**Dashboard (funcionalidades inferidas):**
- Listado de cotizaciones recibidas
- Estadisticas de visitas/contactos
- Gestion de contenido (productos, eventos)
- Gestion de usuarios

**⚠️ CRITICO:** Credenciales de acceso existen. Documentar para no perder acceso durante el rebrand.

---

### 2.9 Paginas Legales

**Paginas identificadas:**

| Pagina | Ruta | Contenido |
|--------|------|-----------|
| FAQ | /faq | Preguntas frecuentes sobre servicios |
| Privacidad | /privacidad | Politica de privacidad de datos |
| Terminos | /terminos | Terminos y condiciones de uso |
| Cookies | /cookies | Politica de uso de cookies |

- Estilo consistente: Header oscuro, contenido en fondo claro, footer
- Texto legal estandar adaptado a servicios de infraestructura sanitaria

---

## 3. COMPONENTES REUTILIZADOS

### 3.1 Header/Nav

**Estructura del componente:**

```
┌─────────────────────────────────────────────────────────────────┐
│ [LOGO]  Inicio  Productos ▼  Servicios  Galeria  Quienes Somos  │
│         Contacto                                [EMERGENCIA] [COTIZAR] │
└─────────────────────────────────────────────────────────────────┘
```

**Logo:**
- Icono: Triangulo/casa estilizado en naranja y negro
- Texto: "JUNISAMA" en bold + "INVERSIONES S.A.S" en lighter
- Tamanio: ~120-150px de ancho
- Hover: Ligero brillo o cambio de opacidad

**Navegacion — Items:**
| Item | Ruta | Dropdown |
|------|------|----------|
| Inicio | / | No |
| Productos | /productos | Si — subitems: Banos, Lavamanos, Puntos Ecologicos, Servicios |
| Servicios | /servicios | No |
| Galeria | /galeria | No |
| Quienes Somos | /quienes-somos | No |
| Contacto | /contacto | No |

**Boton EMERGENCIA:**
- Texto: "EMERGENCIA"
- Estilo: Pill outline, borde gris claro, texto blanco
- Icono: Telefono (izquierda)
- Accion: Llamada telefonica directa (tel:)
- Hover: Fondo blanco semi-transparente

**Boton COTIZAR:**
- Texto: "COTIZAR" (o "COTIZACION")
- Estilo: Pill solido, fondo naranja (~#E8632B), texto blanco
- Accion: Navegacion a /cotizacion
- Hover: Oscurecimiento sutil del fondo

**Comportamiento scroll:**
- Estado inicial: Fondo transparente
- Scroll > 50px: Fondo solido oscuro (~#0F1923) con backdrop-blur
- Transicion: 300ms ease

**Responsive (< 768px):**
- Hamburger menu (tres lineas)
- Menu desplegable lateral o full-screen
- Botones EMERGENCIA y COTIZAR visibles o en menu

---

### 3.2 Footer

**Estructura del componente:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  [LOGO JUNISAMA]    SERVICIOS TECNICOS    CONTACTO 24/7   SIGUENOS │
│  Infrastructura      - Alquiler de        - Telefono      - Insta  │
│  sanitaria industrial  Unidades           - Email         - LinkedIn│
│                      - Mantenimiento      - Correo                   │
│  [ISO Badge]         - Operarios          Corporativo               │
│                      - Insumos            - Sedes                    │
│                        Biodegradables                                │
├─────────────────────────────────────────────────────────────────────┤
│  © 2025 JUNISAMA INVERSIONES S.A.S          [INDUSTRIAL GRADE      │
│                                               SOLUTIONS badge]       │
└─────────────────────────────────────────────────────────────────────┘
```

**Columna 1 — Marca:**
- Logo Junisama (version oscura o clara segun fondo)
- Descripcion: "Infrastructura sanitaria industrial para eventos y proyectos de alta exigencia"
- Badge ISO14001 CERTIFICADO (hexagono dorado + texto)

**Columna 2 — Servicios Tecnicos:**
- Titulo: "SERVICIOS TECNICOS"
- Lista de links:
  - Alquiler de Unidades
  - Mantenimiento Especializado
  - Operarios Certificados
  - Insumos Biodegradables

**Columna 3 — Contacto 24/7:**
- Titulo: "CONTACTO 24/7"
- Telefono: (numero principal)
- Email: (correo corporativo)
- Correo corporativo: (email adicional)
- Sedes: Medellin, Bogota

**Columna 4 — Siguenos:**
- Titulo: "SIGUENOS"
- Instagram: Icono + link
- LinkedIn: Icono + link

**Barra inferior:**
- Copyright: "© 2025 JUNISAMA INVERSIONES S.A.S"
- Badge: "INDUSTRIAL GRADE SOLUTIONS" (tipografia estilo sello/tecnico)

**Responsive:**
- Desktop: 4 columnas
- Tablet: 2 columnas
- Mobile: 1 columna apilada

---

### 3.3 Hero Section

**Variantes observadas:**

| Pagina | Fondo | Overlay | Alineacion |
|--------|-------|---------|------------|
| Home | Oscuro + textura | Gradiente oscuro | Centrado |
| Productos | Oscuro | Gradiente | Centrado |
| Servicios | Azul navy | Gradiente azul | Centrado |
| Galeria | Oscuro | Gradiente | Centrado |
| Quienes Somos | Foto equipo | Azul oscuro 70% | Centrado |
| Contacto | Oscuro | Gradiente | Centrado |

**Elementos comunes:**
1. Badge dorado (cuando aplica): "ISO14001 CERTIFICADO"
2. Titulo principal: MAYUSCULAS, bold, ~40-56px
3. Palabra resaltada en naranja coral (~#E8632B)
4. Subtitulo: Regular, ~16-18px, gris claro/blanco 70%
5. 1-2 CTAs (botones pill)
6. Altura: 80-100vh (pantalla completa o casi completa)

---

### 3.4 Stats Bar

**Ubicacion:** Sobre el hero o justo debajo

**Estructura:**
```
┌─────────────────────────────────────────────────────────────┐
│  [ICONO] 500+      [ICONO] 24/7      [ICONO] 99.9%    [ICONO] 10+  │
│  EVENTOS           DISPONIBILIDAD     EFECTIVIDAD      ANOS        │
│  ATENDIDOS                                                EXPERIENCIA │
└─────────────────────────────────────────────────────────────┘
```

**Estilo:**
- Fondo: Oscuro semitransparente (~rgba(15,25,35,0.85))
- Numeros: Dorado (~#C9A84C), ~36-48px, bold
- Labels: Blanco/gris claro, ~12px, mayusculas, tracking 2-3px
- Iconos: Dorados, ~24px, linea o filled
- Separadores: Lineas verticales sutiles o espaciado amplio

**Comportamiento:**
- Animacion de conteo al entrar en viewport (posible)
- Estatico en scroll

---

### 3.5 Product Card

**Estructura del componente:**

```
┌──────────────────────────┐
│  [TAG: Premium]          │
│                          │
│    ┌─────┐               │
│    │  B  │  <- Circulo   │
│    └─────┘    de color   │
│                          │
│  FOTO REAL PENDIENTE     │
│                          │
├──────────────────────────┤
│  BANO VIP                │  <- Titulo
│  Unidad premium con      │  <- Descripcion
│  acabados de lujo        │
│                          │
│  [ICON] Cap: 200 uses    │  <- Specs
│  [ICON] Dim: 1.2x1.2m    │
│                          │
│  Ver detalles →          │  <- Link
└──────────────────────────┘
```

**Elementos:**
- Imagen/placeholder: Fondo oscuro con letra en circulo de color
- Tag: Badge posicionado absoluto, esquina superior izquierda
- Titulo: Bold, blanco, ~18-20px
- Descripcion: Regular, gris claro, ~14px, 2-3 lineas
- Specs: Icono pequeno + valor, inline horizontal o vertical
- Link: "Ver detalles →", color naranja o blanco
- Hover: Elevacion (box-shadow), escala sutil (1.02)

**Colores de circulos por producto:**
| Producto | Color Circulo | Hex Aprox. |
|----------|---------------|------------|
| Bano VIP | Azul | ~#3B82F6 |
| Bano Estandar | Verde | ~#22C55E |
| Bano Discapacitados | Morado | ~#A855F7 |
| Bano Electricos | Naranja | ~#F97316 |
| Lavamanos | Rosa | ~#EC4899 |
| Trailer de Lujo | (propio) | — |
| Operarios | (propio) | — |
| Puntos Ecologicos | Verde oscuro | ~#15803D |

---

### 3.6 WhatsApp Float

**Estructura:**

```
                    ┌─────────────┐
                    │  [LOGO WA]  │  <- Boton circular
                    │  En linea   │     verde, fijo
                    └─────────────┘         ↘
```

**Especificaciones:**
- Posicion: Fijo, esquina inferior derecha
- Offset: ~24px desde borde derecho, ~24px desde borde inferior
- Forma: Circulo (~60px diametro)
- Color: Verde WhatsApp (~#25D366)
- Icono: Logo WhatsApp blanco
- Tooltip/badge: "En linea" (verde, pequeno)
- Accion: Link a wa.me/[numero]
- Animacion: Pulse sutil cada ~3 segundos
- Hover: Escala 1.1, sombra aumentada
- z-index: 999 (por encima de todo)

---

### 3.7 CTA Buttons

**Tipos de botones en el sistema:**

| Tipo | Fondo | Borde | Texto | Uso |
|------|-------|-------|-------|-----|
| Primario Solido | Naranja (~#E8632B) | Ninguno | Blanco | COTIZAR, SOLICITAR PRESUPUESTO |
| Secundario Outline | Transparente | Blanco 1px | Blanco | VER SERVICIOS |
| Emergencia Outline | Transparente | Gris claro | Blanco | EMERGENCIA |
| Link Texto | Transparente | Ninguno | Naranja o Blanco | Ver detalles |
| Submit | Naranja (~#E8632B) | Ninguno | Blanco | ENVIAR SOLICITUD |

**Caracteristicas comunes:**
- Border-radius: 50px (pill)
- Padding: ~12-16px vertical, ~24-32px horizontal
- Fuente: Sans-serif, semibold, ~14-16px
- Mayusculas: Si (tracking amplio en algunos)
- Icono: Opcional (teléfono, flecha, WhatsApp)
- Hover: 
  - Solidos: Oscurecimiento 10-15%
  - Outline: Fondo blanco 10% opacidad
- Transicion: 200ms ease

---

## 4. SISTEMA VISUAL

### 4.1 Paleta de Color (hex exactos observados)

#### Colores Primarios

| Nombre | Hex | Uso |
|--------|-----|-----|
| Naranja Coral (CTA) | ~#E8632B | Botones primarios, acentos de texto, resaltados |
| Naranja Hover | ~#D4541F | Estado hover de botones naranja |
| Naranja Claro | ~#F0A070 | Posibles estados disabled o variantes |

#### Colores Dorados

| Nombre | Hex | Uso |
|--------|-----|-----|
| Dorado/Ambar | ~#C9A84C | Badge ISO, stats, iconos de stats |
| Dorado Claro | ~#D4B85C | Hover de elementos dorados |
| Dorado Oscuro | ~#A0883C | Texto dorado sobre fondo oscuro |

#### Colores de Fondo

| Nombre | Hex | Uso |
|--------|-----|-----|
| Fondo Oscuro Principal | ~#0F1923 | Hero, secciones oscuras, header scrolled |
| Fondo Oscuro Secundario | ~#1A2634 | Variante de seccion oscura, cards |
| Fondo Claro | ~#F8F9FA | Secciones claras, fondo de pagina |
| Blanco Puro | #FFFFFF | Cards, fondos claros, texto sobre oscuro |
| Overlay Oscuro | ~rgba(15,25,35,0.85) | Overlays de hero, modales |

#### Colores de Texto

| Nombre | Hex | Uso |
|--------|-----|-----|
| Texto Blanco | #FFFFFF | Sobre fondos oscuros |
| Texto Oscuro Principal | ~#0F1923 | Sobre fondos claros, titulos |
| Texto Gris Oscuro | ~#4A5568 | Body text, descripciones |
| Texto Gris Medio | ~#718096 | Labels secundarios, captions |
| Texto Gris Claro | ~#A0AEC0 | Placeholders, texto deshabilitado |

#### Colores de Productos (Circulos)

| Producto | Hex Aprox. |
|----------|------------|
| Bano VIP (Azul) | ~#3B82F6 |
| Bano Estandar (Verde) | ~#22C55E |
| Bano Discapacitados (Morado) | ~#A855F7 |
| Bano Electricos (Naranja) | ~#F97316 |
| Lavamanos (Rosa) | ~#EC4899 |
| Puntos Ecologicos (Verde oscuro) | ~#15803D |

#### Colores de Estado

| Estado | Hex | Uso |
|--------|-----|-----|
| Exito (Verde) | ~#22C55E | Validaciones, mensajes OK |
| Error (Rojo) | ~#EF4444 | Errores de formulario |
| Advertencia (Amarillo) | ~#EAB308 | Alertas |
| Info (Azul) | ~#3B82F6 | Mensajes informativos |

#### Colores de Terceros

| Servicio | Hex | Uso |
|----------|-----|-----|
| WhatsApp | #25D366 | Boton flotante |
| Instagram | #E4405F | Icono social |
| LinkedIn | #0A66C2 | Icono social |
| Google Maps | — | Embed de mapas |

---

### 4.2 Tipografia (familias, pesos, tamanos observados)

#### Familia Principal
- **Familia:** Outfit (o similar sans-serif geometrica moderna)
- **Alternativa:** Montserrat, Poppins, o geometric sans-serif
- **Caracteristicas:** Formas geometricas, aperturas amplias, muy legible en pantalla

#### Escala Tipografica (aproximada)

| Elemento | Tamanio Desktop | Peso | Estilo | Color |
|----------|----------------|------|--------|-------|
| H1 (Hero) | ~48-56px | 700 (Bold) | Mayusculas | Blanco + Naranja |
| H2 (Seccion) | ~36-42px | 700 (Bold) | Mayusculas | Blanco oscuro |
| H3 (Subseccion) | ~24-28px | 600 (Semibold) | Normal | Blanco/oscuro |
| H4 (Card title) | ~18-20px | 600 (Semibold) | Normal | Blanco |
| Body | ~16px | 400 (Regular) | Normal | Gris claro/oscuro |
| Body Small | ~14px | 400 (Regular) | Normal | Gris medio |
| Caption | ~12px | 500 (Medium) | Mayusculas | Gris, tracking 2px |
| Button | ~14px | 600 (Semibold) | Mayusculas | Blanco |
| Nav Link | ~14px | 500 (Medium) | Normal | Blanco |
| Stats Number | ~36-48px | 700 (Bold) | Normal | Dorado |
| Stats Label | ~12px | 500 (Medium) | Mayusculas | Blanco, tracking 2-3px |

#### Line Heights
- Titulos: 1.1 - 1.2
- Body: 1.5 - 1.6
- Buttons: 1.0

#### Letter Spacing
- Titulos hero: -0.5px a 0px
- Labels/Stats: +2px a +3px
- Botones: +0.5px a +1px

---

### 4.3 Espaciado y Grid (breakpoints, contenedores observados)

#### Sistema de Grid
- **Tipo:** 12 columnas (probablemente Tailwind o similar)
- **Gutter:** ~24px (1.5rem)
- **Contenedor max-width:** ~1280px (7xl en Tailwind)

#### Breakpoints (estimados basados en comportamiento)

| Breakpoint | Ancho | Cambios principales |
|------------|-------|-------------------|
| Mobile | < 640px | 1 columna, hamburger menu, hero stack |
| Tablet | 640-1024px | 2 columnas, menu colapsado |
| Desktop | 1024-1280px | 3-4 columnas, menu expandido |
| Large | > 1280px | Max-width del contenedor, centrado |

#### Espaciado Vertical (Secciones)
- Padding vertical de secciones: ~80-120px (py-20 a py-30)
- Entre subsecciones: ~40-60px
- Hero: min-height 80-100vh

#### Espaciado Horizontal
- Contenedor: px-4 (16px) mobile → px-8 (32px) tablet → px-12 (48px) desktop
- Max-width: mx-auto centrado

#### Bordes y Radios
- Botones pill: border-radius 9999px (rounded-full)
- Cards: border-radius ~12-16px (rounded-xl/2xl)
- Inputs: border-radius ~8px (rounded-lg)
- Circulos de producto: border-radius 50%

#### Sombras
- Cards: Sombra sutil (shadow-md), se intensifica en hover
- Boton flotante WA: shadow-lg + shadow color verde
- Header scrolled: Sombra ligera inferior

---

### 4.4 Iconografia e Ilustraciones

#### Iconos Utilizados

**Header/Nav:**
- Logo Junisama: Icono triangular/casa estilizado (SVG o PNG)
- Dropdown: ChevronDown (▼)
- EMERGENCIA: Icono telefono

**Hero/Stats:**
- Eventos/Calendario: Icono calendario o ticket
- 24/7: Icono reloj
- Efectividad: Icono checkmark o escudo
- Experiencia: Icono trofeo o estrella

**Servicios:**
- Alquiler: Icono bano/unidad movil
- Mantenimiento: Icono herramienta/llave
- Operarios: Icono persona/escudo
- Insumos: Icono hoja/eco

**Productos:**
- Letras en circulos: B, L, T, S, P (iniciales de productos)
- Specs: Iconos variados (regla, peso, gota, etc.)

**Contacto:**
- Telefono: Icono phone
- Email: Icono mail
- WhatsApp: Logo WA
- Ubicacion: Icono map-pin

**Footer:**
- Instagram: Logo Instagram
- LinkedIn: Logo LinkedIn
- ISO Badge: Hexagono dorado con checkmark

#### Estilo de Iconos
- Tipo: Line icons (stroke-based) o duotone
- Grosor: 1.5-2px stroke
- Tamanio: 20-24px estandar, 40-48px para stats
- Color: Dorado (~#C9A84C) sobre fondo oscuro, gris oscuro sobre fondo claro

#### Ilustraciones
- **Hero:** Posiblemente fondo con gradiente + textura sutil (noise o pattern)
- **Fotos:** Fotos reales de equipo (Quienes Somos), fotos de eventos (Galeria)
- **Placeholders:** Circulos de colores con letras para productos sin foto real

---

## 5. COPY Y TONO DE VOZ

#### Tono General
- **Profesional e industrial:** Lenguaje tecnico pero accesible
- **Confiado:** Metricas y certificaciones como prueba social
- **Servicio 24/7:** Enfasis en disponibilidad y respuesta inmediata
- **Experiencia comprobada:** Galeria de 33+ eventos masivos

#### Patrones Linguisticos Observados
- Titulos en MAYUSCULAS con palabra clave resaltada en naranja
- Labels de stats en mayusculas con tracking amplio
- Uso de terminos tecnicos: "infrastructura sanitaria industrial", "insumos biodegradables", "ISO 14001"
- Llamadas a la accion imperativas: "SOLICITAR", "VER", "ENVIAR"
- Metricas con + y % para transmitir escala

#### Copy Especifico por Pagina

**Home:**
- "INFRAESTRUCTURA SANITARIA INDUSTRIAL"
- "SOLICITAR PRESUPUESTO A LA MEDIDA"
- "VER SERVICIOS"

**Productos:**
- Nombres de productos con calificativos: "VIP", "Estandar", "Discapacitados", "Electricos"
- Tags descriptivos: "Premium", "Mas popular", "Inclusivo", "Tecnologia", "Alto volumen", "Sostenible"
- "FOTO REAL PENDIENTE" (placeholder visible)

**Servicios:**
- "SERVICIOS ESPECIALIZADOS"
- "SOLICITAR INFO" (por servicio)

**Contacto:**
- "CONTACTO INDUSTRIAL"
- "ENVIAR SOLICITUD"

**Footer:**
- "© 2025 JUNISAMA INVERSIONES S.A.S"
- "INDUSTRIAL GRADE SOLUTIONS"
- "ISO14001 CERTIFICADO"

#### Texto de Badges/Tags
| Tag | Uso |
|-----|-----|
| Premium | Bano VIP, Trailer de Lujo |
| Mas popular | Bano Estandar |
| Inclusivo | Bano Discapacitados |
| Tecnologia | Bano Electricos |
| Alto volumen | Lavamanos |
| Sostenible | Puntos Ecologicos |

---

## 6. DATOS DE CONTACTO Y OPERACION

#### Canales de Contacto

| Canal | Valor | Tipo |
|-------|-------|------|
| Telefono principal | (numero de contacto) | Call + WhatsApp |
| Email corporativo | (correo@junisama.com.co) | Email |
| Email adicional | (correo corporativo secundario) | Email |
| WhatsApp | wa.me/[numero] | Mensajeria |
| Instagram | @junisama | Social |
| LinkedIn | /company/junisama | Social |

#### Sedes

| Sede | Ciudad | Mapa |
|------|--------|------|
| Principal | Medellin | Google Maps embed |
| Secundaria | Bogota | Google Maps embed |

#### Horarios/Disponibilidad
- Servicio 24/7 (indicado en stats y footer)
- Boton EMERGENCIA para llamadas urgentes

#### Certificaciones
- ISO 14001 (sistema de gestion ambiental)
- Badge visible en hero y footer

---

## 7. PENDIENTES CRITICOS (no perder en rebrand)

### 7.1 Panel de Administracion

**Estado:** Funcional con autenticacion
**Ruta:** /admin

**Funcionalidades criticas:**
- Autenticacion de usuarios (login/logout)
- Dashboard con estadisticas
- Gestion de cotizaciones recibidas
- Posible gestion de contenido

**Riesgos:**
- ⚠️ Credenciales de acceso deben preservarse
- ⚠️ URL /admin debe mantenerse o redirigirse
- ⚠️ Base de datos/backend no debe perderse
- ⚠️ Flujo de autenticacion (tokens, sesiones)

**Acciones para rebrand:**
- [ ] Verificar que las credenciales siguen funcionando post-rebrand
- [ ] Actualizar branding del panel (logo, colores, nombre)
- [ ] Confirmar que la base de datos es la misma
- [ ] Revisar si hay usuarios adicionales con acceso

### 7.2 Boton de Emergencia

**Estado:** Visible en header de todas las paginas
**Funcion:** Llamada telefonica directa

**Especificaciones tecnicas:**
- Tipo: Boton con accion tel: (protocolo de telefono)
- Estilo: Pill outline gris
- Texto: "EMERGENCIA"
- Icono: Telefono

**Riesgos:**
- ⚠️ Numero de emergencia debe permanecer funcional
- ⚠️ El boton debe seguir visible y accesible en todas las paginas
- ⚠️ No debe romperse al cambiar componentes del header

**Acciones para rebrand:**
- [ ] Confirmar numero de emergencia sigue activo
- [ ] Preservar funcionalidad tel:
- [ ] Revisar estilo en nuevo diseno (debe seguir siendo prominente)

### 7.3 Sistema de Cotizacion (3 Pasos)

**Estado:** Funcional en /cotizacion
**Importancia:** Flujo de negocio principal

**Riesgos:**
- ⚠️ Formulario de 3 pasos con logica de estado
- ⚠️ Datos de cotizaciones deben seguir almacenandose
- ⚠️ Integracion con backend/email de notificaciones

**Acciones para rebrand:**
- [ ] Probar flujo completo post-rebrand
- [ ] Verificar que los datos llegan al admin
- [ ] Confirmar emails de notificacion

### 7.4 Filtros de Productos

**Estado:** Funcionales en /productos
**Importancia:** Navegacion del catalogo

**Riesgos:**
- ⚠️ Logica de filtrado (client-side o server-side)
- ⚠️ Estado activo de tabs
- ⚠️ Animaciones de transicion

**Acciones para rebrand:**
- [ ] Verificar que los filtros siguen funcionando
- [ ] Confirmar que las 5 categorias filtran correctamente

### 7.5 Imagenes de Productos (FOTO REAL PENDIENTE)

**Estado:** 8 productos con placeholder
**Importancia:** Contenido pendiente

**Riesgos:**
- ⚠️ Los placeholders con letras deben reemplazarse por fotos reales
- ⚠️ Texto "FOTO REAL PENDIENTE" no debe ir a produccion final

**Acciones para rebrand:**
- [ ] Solicitar/organizar fotografia de los 8 productos
- [ ] Reemplazar placeholders antes de lanzar BOGA

### 7.6 Mapas de Google Maps

**Estado:** Embeds funcionales en sedes
**Ubicacion:** Footer, pagina Contacto, pagina Quienes Somos

**Riesgos:**
- ⚠️ API key de Google Maps
- ⚠️ Coordenadas de las 2 sedes

**Acciones para rebrand:**
- [ ] Verificar API key sigue activa
- [ ] Confirmar coordenadas de sedes son correctas

---

## 8. DIFERENCIAS PRODUCCION vs PROTOTIPO

### Paginas: Produccion tiene 4, Prototipo tiene 9+

| Pagina | Produccion | Prototipo | Diferencia |
|--------|------------|-----------|------------|
| Home | ✅ | ✅ | Prototipo tiene stats bar y diferenciadores mejorados |
| Productos | ❌ | ✅ | **NUEVO en prototipo** — Catalogo completo con 8 productos |
| Servicios | ✅ | ✅ | Prototipo tiene mejor estructura visual |
| Galeria | ✅ | ✅ | Mismo contenido (33 eventos) |
| Quienes Somos | ✅ | ✅ | Similar contenido |
| Contacto | ✅ (en Home) | ✅ (pagina dedicada) | Prototipo tiene pagina separada + formulario |
| Cotizacion | ❌ | ✅ | **NUEVO en prototipo** — Formulario 3 pasos |
| Panel Admin | ❌ | ✅ | **NUEVO en prototipo** — Login + dashboard |
| Paginas Legales | ❌ | ✅ | **NUEVO en prototipo** — FAQ, Privacidad, Terminos, Cookies |

### Componentes: Diferencias

| Componente | Produccion | Prototipo |
|------------|------------|-----------|
| Header EMERGENCIA | Solido naranja coral, mas prominente | Outline gris, mas sutil |
| Header COTIZAR | No existe | Naranja solido, nuevo |
| Stats Bar | 4 stats (produccion) | 6 stats (prototipo) |
| Product Cards | No existen | Cards con circulos de colores y specs |
| Filtros Productos | No existen | Tabs funcionales (5 categorias) |
| WhatsApp Float | ✅ | ✅ |
| Footer ISO Badge | ✅ | ✅ |
| Footer layout | 4 columnas | 4 columnas (similar) |

### Sistema Visual: Diferencias

| Aspecto | Produccion | Prototipo |
|---------|------------|-----------|
| Fondo hero | Gradiente azul oscuro (~#1a2a4a a ~#2d3e5f) | Fondo muy oscuro (~#0F1923) |
| Naranja CTA | ~#FF6B35 (coral mas brillante) | ~#E8632B (coral mas oscuro) |
| Dorado/Stats | No prominentes en produccion | ~#C9A84C (badge, stats, iconos) |
| Tipografia | Montserrat o similar | Outfit o similar (mas moderna) |
| Ano copyright | 2024 | 2025 |

### Funcionalidades: Solo en Prototipo

| Funcionalidad | Descripcion | Prioridad |
|---------------|-------------|-----------|
| Catalogo de productos con filtros | 8 productos, 5 categorias de filtro | Alta |
| Sistema de cotizacion 3 pasos | Wizard con progreso | Critica |
| Panel administrativo | Login + dashboard + gestion | Critica |
| Formulario de contacto dedicado | Pagina /contacto separada | Media |
| Paginas legales | FAQ, Privacidad, Terminos, Cookies | Media |

---

## 9. RECOMENDACIONES PARA REBRAND

### 9.1 Prioridad 1 — Preservacion de Funcionalidad

1. **No tocar el backend** hasta tener backup completo: panel admin, cotizaciones, base de datos
2. **Mantener todas las rutas URL** o implementar redirecciones 301
3. **Preservar flujo de cotizacion** — es el principal canal de leads
4. **Mantener boton EMERGENCIA** funcional con el mismo numero

### 9.2 Prioridad 2 — Reemplazo de Marca

1. **Logo:** Reemplazar "JUNISAMA INVERSIONES S.A.S" por "BOGA" en todos los lugares:
   - Header
   - Footer
   - Favicon
   - Panel admin
   - Emails automaticos
   - Meta tags (SEO)

2. **Copy:** Actualizar menciones de "Junisama" a "BOGA" en:
   - Todo el texto visible
   - Meta descriptions y titles
   - Alt text de imagenes
   - Boton "La diferencia Junisama" → "La diferencia BOGA"

3. **Copyright:** "© 2025 JUNISAMA INVERSIONES S.A.S" → "© 2025 BOGA" o nombre legal actualizado

### 9.3 Prioridad 3 — Assets Visuales

1. **Fotos de productos:** Las 8 unidades necesitan fotografia real antes del lanzamiento
2. **Nuevo logo BOGA:** Necesario en formatos SVG, PNG, favicon
3. **Colores del rebrand:** Si BOGA tiene nueva paleta, aplicarla al sistema existente
4. **Graficas sociales:** Instagram, LinkedIn con nueva marca

### 9.4 Prioridad 4 — Mejoras Oportunas

1. **SEO:** Aprovechar el rebrand para optimizar meta tags con "BOGA"
2. **Analytics:** Verificar que Google Analytics/Tag Manager siguen funcionando
3. **Performance:** Revisar tiempos de carga, especialmente en galeria (33 imagenes)
4. **Accesibilidad:** Revisar contrastes con nueva paleta de colores

### 9.5 Checklist de Lanzamiento

- [ ] Todas las paginas cargan correctamente
- [ ] Header funciona en desktop y mobile
- [ ] Boton EMERGENCIA llama al numero correcto
- [ ] Formulario de contacto envia datos
- [ ] Sistema de cotizacion funciona (3 pasos)
- [ ] Filtros de productos funcionan
- [ ] Panel admin accesible con credenciales
- [ ] WhatsApp flotante abre chat correcto
- [ ] Mapas de Google cargan
- [ ] No queda texto "Junisama" visible
- [ ] No queda texto "FOTO REAL PENDIENTE" visible
- [ ] Favicon actualizado
- [ ] Meta tags actualizados
- [ ] Copyright actualizado
- [ ] Paginas legales mencionan BOGA
- [ ] Redes sociales enlazadas correctamente

---

*Documento generado para la transicion de marca: JUNISAMA INVERSIONES S.A.S → BOGA*
*Fecha de auditoria: 2025*
*Auditor: Analisis forense del estado actual pre-rebrand*
