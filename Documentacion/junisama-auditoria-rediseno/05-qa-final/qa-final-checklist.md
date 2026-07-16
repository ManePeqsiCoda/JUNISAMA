# FASE 7 — QA FINAL Y CHECKLIST DE ACEPTACION
## Proyecto Junisama | Auditoria de Cierre Post-Implementacion

**Fecha:** Julio 2025
**Rol:** QA de Cierre — Regresion Final
**Documentos base:** Auditoria Tecnica (Fase 1), Auditoria Contenido (Fase 2), Direccion de Diseno (Fase 3), Plan Tecnico (Fases 4-6)
**Prototipo:** https://junisama-seven.vercel.app
**Produccion:** https://junisama.com.co

---

## 1. MATRIZ DE TRAZABILIDAD

Verificacion completa: cada hallazgo de las Fases 1 y 2 debe tener cobertura explicita en el Plan Tecnico de Implementacion (Fases 4-6).

### 1.1 Hallazgos Fase 1 (Auditoria Tecnica)

| ID | Hallazgo (Fase 1) | Severidad | Cubierto en plan tecnico? | Codigo en plan | Notas |
|----|-------------------|-----------|---------------------------|----------------|-------|
| F1-01 | Logo "UVINERIL" → JUNISAMA en header/footer | **CRITICO** | **SI** | LOGO-001, LOGO-002, `components/header.tsx`, `components/footer.tsx` | Codigo SVG completo + componente JunisamaLogo. Verificar tambien en favicon |
| F1-02 | Credenciales admin expuestas en /admin/login | **CRITICO** | **SI** | ADMIN-001, ADMIN-002, `app/admin/login/page.tsx` | Credenciales movidas a .env. Demo hint solo en development mode |
| F1-03 | Imagenes de productos rotas/placeholders | **CRITICO** | **SI** | PROD-001, PROD-002, `components/product-grid.tsx`, `components/product-card.tsx` | Requiere 8 fotos reales en `/images/products/`. **Gap de assets**: las imagenes deben ser provistas |
| F1-04 | Boton "Ver productos" invisible (blanco/blanco) | **CRITICO** | **SI** | HERO-001, `components/hero.tsx` | btn-secondary con borde visible sobre fondo oscuro + overlay |
| F1-05 | Boton EMERGENCIA ausente | **CRITICO** | **SI** | EMERG-001, EMERG-002, `components/header.tsx` | Boton pill rojo #DC2626, pulsacion 3s, click-to-call +573507089584 |
| F1-06 | Title tag duplicado "\| Junisama \| Junisama" | **ALTO** | **SI** | META-001, `app/layout.tsx` | Template corregido a `%s \| Junisama` (una sola vez) |
| F1-07 | Error validacion tipo evento: "expected string, received undefined" | **ALTO** | **SI** | FORM-001, FORM-002, `app/cotizacion/page.tsx`, `components/quote-form.tsx` | Schema Zod con `.default("")` en campos opcionales, valores por defecto en RHF |
| F1-08 | Botones "Solicitar info" sin enlace (2 servicios) | **ALTO** | **SI** | SERV-001, SERV-002, `app/servicios/page.tsx` | Todos los 4 servicios con `cta: { href: "/cotizacion" }` + renderizado via `<Link>` |
| F1-09 | Imagenes galeria placeholders genericos | **ALTO** | **SI** | EVENT-002, EVENT-004, `components/gallery-grid.tsx`, `app/galeria/page.tsx` | Dataset de 30+ eventos reales en `data/events.ts`, marquee infinito CSS |
| F1-10 | Imagen /quienes-somos placeholder | **ALTO** | **PARCIAL** | No hay archivo especifico para /quienes-somos | **⚠️ GAP**: El plan no incluye codigo para corregir la imagen placeholder de /quienes-somos ni la de Servicio Tecnico |
| F1-11 | Dropdown Productos no despliega | **MEDIO** | **SI** | HEAD-001, `components/header.tsx` | Dropdown funcional con click-outside, Escape key, aria-expanded, role=menu |
| F1-12 | Boton hero sin texto visible | **MEDIO** | **SI** | (Mismo que HERO-001) | Cubierto en HERO-001 |
| F1-13 | Diferencia navegacion vs produccion | **MEDIO** | **SI** | `components/header.tsx` | Nav incluye Productos (dropdown), Servicios, Galeria, Quienes Somos, Contacto + EMERGENCIA |
| F1-14 | "Quienes Somos" sin tilde | **BAJO** | **⚠️ GAP** | No cubierto explicitamente | **⚠️ GAP**: Debe ser "Quiénes Somos" (con tilde en la e) |
| F1-15 | Copyright 2026 → 2025 (footer) | **BAJO** | **SI** | FOOT-001, `components/footer.tsx` | Hardcodeado a 2025 + `© 2025 JUNISAMA INVERSIONES S.A.S` |
| F1-16 | Copyright admin 2026 → 2025 | **BAJO** | **SI** | `app/admin/login/page.tsx` | Nuevo login no muestra copyright (solo formulario) |
| F1-17 | og:image apunta a .com en vez de .com.co | **POR VERIFICAR** | **SI** | META-002, META-003, `app/layout.tsx` | `metadataBase: new URL("https://junisama.com.co")`, og:url corregido |
| F1-18 | Filtros sin funcionalidad visual | **BAJO** | **SI** | `app/productos/page.tsx` | Grid con filtros funcionales, productos con imagenes reales |
| F1-19 | FAQ acordeones | **BAJO** | **OK** | Sin cambios requeridos | Funcionalidad OK en auditoria original |
| F1-20 | Formulario contacto funcional | **OK** | **N/A** | Sin cambios | Funcionalidad confirmada en Fase 1 |
| F1-21 | Formulario cotizacion 3 pasos | **OK** | **SI** | FORM-001 a FORM-005 | Estructura funcional + fixes de validacion |
| F1-22 | Panel admin funcional | **OK** | **SI** | ADMIN-001, ADMIN-002 | Acceso funcional, credenciales protegidas |

### 1.2 Hallazgos Fase 2 (Auditoria Contenido y Riesgo de Marca)

| ID | Hallazgo (Fase 2) | Severidad | Cubierto en plan tecnico? | Codigo en plan | Notas |
|----|-------------------|-----------|---------------------------|----------------|-------|
| C1 | Logo "UVINERIL" → JUNISAMA | **CRITICO** | **SI** | LOGO-001, LOGO-002 | Mismo que F1-01 |
| C2 | Galeria con eventos ficticios + placeholders | **CRITICO** | **SI** | EVENT-001, EVENT-002, `data/events.ts`, `components/client-marquee.tsx` | 32 eventos reales del sitio de produccion. **ADVERTENCIA**: los nombres de marca requieren autorizacion confirmada |
| C3 | Testimonios ficticios (3 personas) | **CRITICO** | **SI** | TEST-001, TEST-002, `components/our-numbers.tsx` | Eliminados y reemplazados por seccion "Nuestros Numeros" con 6 stats verificables |
| C4 | Copyright 2026 | **ALTO** | **SI** | FOOT-001 | Mismo que F1-15 |
| A1 | Seccion clientes/eventos AUSENTE | **ALTO** | **SI** | EVENT-001, EVENT-002, `components/client-marquee.tsx` | Marquee infinito con 32 eventos reales, filtros por tipo |
| A2 | Imagen placeholder /quienes-somos | **ALTO** | **⚠️ GAP** | No hay archivo especifico | **⚠️ GAP**: No se incluye codigo para /quienes-somos. Requiere foto real de empresa/equipo |
| A3 | Imagen placeholder Servicio Tecnico | **ALTO** | **⚠️ GAP** | No hay archivo especifico | **⚠️ GAP**: Mismo que A2 |
| A4 | Paginas legales ausentes en PRODUCCION | **ALTO** | **N/A (produccion)** | Prototipo SI tiene legales | Hallazgo es de produccion, no del prototipo. Prototipo OK |
| A5 | ISO 14001 sin certificado verificable | **ALTO** | **PARCIAL** | HERO-003 | Badge ISO sin numero ficticio: "Si no se tiene el numero real, usar solo 'ISO 14001 Certificado' sin numero". **⚠️ Gap**: Falta instruccion para obtener/link al certificado real |
| M1 | "Quienes Somos" sin tilde | **MEDIO** | **⚠️ GAP** | No cubierto explicitamente | **⚠️ GAP**: Debe ser "Quiénes Somos" (con tilde en la e) |
| M2 | Estadisticas contradictorias | **MEDIO** | **SI** | `components/our-numbers.tsx` | Stats unificados: 500+ eventos, 24/7 soporte, 99.9% uptime, 2 sedes, 100% eco, 30+ clientes |
| M3-M5 | Menu/Galeria/FAQ menores | **MEDIO/BAJO** | **PARCIAL** | HEAD-001, EVENT-003 | Dropdown funcional, filtros de eventos. FAQ se mantiene como esta |
| B1-B4 | Items de baja prioridad | **BAJO** | **PARCIAL** | META-004, META-005 | Keywords SEO y geo-region agregados. "INDUSTRIAL GRADE SOLUTIONS" no se menciona |

### 1.3 Resumen de GAPS identificados

| # | Gap | Severidad | Impacto | Recomendacion |
|---|-----|-----------|---------|---------------|
| GAP-01 | **Falta codigo para pagina /quienes-somos**: imagen placeholder hero + imagen Servicio Tecnico | **ALTO** | Pagina de "Quienes Somos" seguiria con imagenes genericas | Agregar tarea P0 para reemplazar ambas imagenes con fotos reales de la empresa/equipo/instalaciones |
| GAP-02 | **Tilde en "Quiénes Somos"**: la navegacion del prototipo dice "Quienes Somos" sin tilde | **MEDIO** | Error ortografico visible en nav de todas las paginas | Corregir a "Quiénes Somos" en `components/header.tsx` y en la ruta si aplica |
| GAP-03 | **Favicon**: no se menciona actualizacion del favicon de UVINERIL a JUNISAMA | **MEDIO** | El favicon podria seguir con logo incorrecto | Verificar y actualizar `app/favicon.ico` o equivalente |
| GAP-04 | **Imagenes de productos**: el plan define paths pero no hay proceso para obtener las fotos reales | **ALTO** | Sin las fotos, las cards seguirian sin imagenes | Coordinar con el cliente para obtener 8 fotos profesionales de productos (min 800x600px) |
| GAP-05 | **Hero background image**: se define `/images/hero-background.jpg` pero no hay fuente | **MEDIO** | Hero podria no tener imagen de fondo | Obtener foto/video de evento real atendido por Junisama |
| GAP-06 | **Autorizacion de nombres de marca**: el plan incluye 32 eventos reales (Shakira, Foo Fighters, etc.) pero no hay verificacion de autorizacion | **ALTO** | Riesgo legal si no hay autorizacion por escrito | **Confirmar con el cliente/legal que cuentan con autorizacion para usar los nombres/logos de terceros** |
| GAP-07 | **Certificado ISO**: no se proporciona numero real ni organismo certificador | **MEDIO** | Badge ISO sin verificacion reduce credibilidad | Solicitar al cliente: numero de certificado, organismo certificador (ICONTEC, Bureau Veritas, SGS), fecha de vigencia |
| GAP-08 | **Galeria de fotos de eventos**: el marquee muestra nombres, pero no se especifican imagenes de cada evento | **MEDIO** | La galeria /galeria seguiria sin fotos reales | Obtener fotos autenticas de los eventos atendidos |
| GAP-09 | **Email de contacto inconsistency**: Fase 2 detecta `soporte@junisama.com` en prototipo vs produccion; plan usa `soporte@junisama.com` | **BAJO** | Email consistente con prototipo, pero produccion apunta a Microsoft 365 | Confirmar email oficial correcto |
| GAP-10 | **Mapas Google en footer**: el plan menciona sedes con direcciones pero no mapas incrustados como en produccion | **BAJO** | Footer inferior al de produccion | Agregar iframe de Google Maps para Medellin y Bogota |

---

## 2. CHECKLIST FINAL DE ACEPTACION

### 2.1 P0 — Criticos (Bloqueantes para mostrar al prospecto)

| Codigo | Item | Criterio de aceptacion | Estado | Nota |
|--------|------|------------------------|--------|------|
| P0-LOGO-001 | Logo header correcto | El header muestra "JUNISAMA" (no "UVINERIL") con icono de casa+naranja en TODAS las paginas | ⏳ | Codigo listo en header.tsx. Verificar en /, /productos, /servicios, /galeria, /quienes-somos, /contacto, /cotizacion, legales |
| P0-LOGO-002 | Logo footer correcto | El footer muestra "JUNISAMA INVERSIONES S.A.S" (no "UVINERIL") | ⏳ | Codigo listo en footer.tsx |
| P0-LOGO-003 | Favicon actualizado | El favicon del navegador muestra el logo JUNISAMA (no UVINERIL) | ⚠️ | **GAP-03**: No cubierto en plan. Verificar archivo favicon.ico |
| P0-EMERG-001 | Boton EMERGENCIA visible | Header derecho muestra boton pill rojo #DC2626 con texto "EMERGENCIA" e icono de telefono | ⏳ | Codigo listo. Visible solo en desktop (>=768px) |
| P0-EMERG-002 | Boton EMERGENCIA funcional | Click en EMERGENCIA inicia llamada telefonica a +57 350 708 9584 (`tel:` link) | ⏳ | Codigo listo con `window.location.href = "tel:+573507089584"` |
| P0-HERO-001 | Boton hero visible | El boton secundario del hero muestra texto legible ("Ver productos" o "Ver servicios") con contraste correcto | ⏳ | btn-secondary sobre fondo oscuro con overlay. Verificar en mobile |
| P0-PROD-001 | Cards con imagen real | Las tarjetas de productos muestran fotografia real (aspect-ratio 4:3), no icono de banera | ⏳ | **Requiere assets**: 8 fotos en `/images/products/`. Sin fotos = FAIL |
| P0-PROD-002 | Sin placeholders de productos | Ninguna card muestra el icono naranja generico de banera | ⏳ | Depende de PROD-001 |
| P0-EVENT-001 | Eventos reales en dataset | `data/events.ts` contiene los 32 eventos reales del sitio de produccion | ⏳ | Codigo listo. Verificar que NO haya eventos inventados |
| P0-EVENT-002 | Marquee infinito funcional | La seccion de clientes muestra marquee CSS infinito con nombres de eventos reales, scroll suave | ⏳ | Codigo listo con 2 tracks (normal + reverse) |
| P0-TEST-001 | Testimonios ficticios eliminados | NO aparecen: Carlos Vargas, Maria Elena Rios, Laura Gomez, ni el "Festival Vallenato 2025" | ⏳ | Reemplazados por "Nuestros Numeros". Verificar que NO queden en DOM |
| P0-TEST-002 | Seccion "Nuestros Numeros" visible | Muestra 6 stats con iconos: 500+ eventos, 24/7 soporte, 99.9% uptime, 2 sedes, 100% eco, 30+ clientes | ⏳ | Codigo listo en our-numbers.tsx |
| P0-FORM-001 | Error Zod corregido | Al enviar cotizacion sin seleccionar tipo de evento, muestra mensaje amigable ("Selecciona un tipo de evento") en vez de error tecnico | ⏳ | Schema con `.default("")` y mensajes personalizados |
| P0-FORM-002 | Formulario con defaults | Todos los campos tienen valores por defecto, no hay `undefined` que rompa la validacion | ⏳ | defaultValues en React Hook Form |
| P0-SERV-001 | Botones servicios con enlace | Los 4 servicios tienen boton "Solicitar info" que navega a /cotizacion | ⏳ | Link component con href="/cotizacion" |
| P0-FOOT-001 | Copyright 2025 | Footer muestra "© 2025 JUNISAMA INVERSIONES S.A.S" (no 2026) | ⏳ | Hardcodeado en footer.tsx |
| P0-ADMIN-001 | Credenciales removidas del DOM | /admin/login NO muestra texto "admin@junisama.com / Junisama2025!" debajo del titulo | ⏳ | Solo mensaje generico de "Inicia sesion para gestionar Junisama" |
| P0-ADMIN-002 | Credenciales en variables de entorno | Login valida contra `process.env.NEXT_PUBLIC_ADMIN_EMAIL` y `_PASSWORD` | ⏳ | **ADVERTENCIA**: `NEXT_PUBLIC_` es visible en bundle. Requiere backend real para produccion |
| P0-META-001 | Title no duplicado | Las paginas internas muestran "%s \| Junisama" (no "\| Junisama \| Junisama") | ⏳ | Template corregido en layout.tsx |
| P0-META-002 | Dominio canonico .com.co | Canonical URL apunta a https://junisama.com.co (no .com) | ⏳ | `metadataBase: new URL("https://junisama.com.co")` |
| P0-META-003 | og:url y og:image correctos | Open Graph apunta a junisama.com.co con imagen absoluta | ⏳ | URL absoluta: `https://junisama.com.co/images/og-image.jpg` |

### 2.2 P1 — Altos (Mejora significativa de percepcion)

| Codigo | Item | Criterio de aceptacion | Estado | Nota |
|--------|------|------------------------|--------|------|
| P1-HEAD-001 | Dropdown Productos funcional | Click en "Productos" despliega menu con 8 categorias, cierra con click outside o Escape | ⏳ | Codigo listo con useRef + useEffect para click outside y Escape |
| P1-HEAD-002 | Header sticky con sombra | Al hacer scroll >10px, header se vuelve fixed con `bg-white/95 backdrop-blur-md shadow-md` | ⏳ | useState + useEffect con passive scroll listener |
| P1-HEAD-003 | Acceso discreto admin | Footer muestra icono de candado con link a /admin/login, estilo discreto (texto gris, tamano xs) | ⏳ | Componente `admin-link.tsx` |
| P1-HERO-003 | Badge ISO sin numero ficticio | Muestra "ISO 14001 Certificado" sin numero inventado. Si hay numero real, agregarlo con estilo monospace | ⏳ | **Gap-07**: Requiere numero real del cliente |
| P1-HERO-004 | Fondo con imagen + overlay | Hero tiene imagen/video de fondo real con overlay oscuro multi-capa (#0F1923 al 80-90%) | ⏳ | **Gap-05**: Requiere imagen/video del cliente |
| P1-PROD-004 | Hover effects en cards | Cards se elevan 4px con shadow aumentada, imagen hace scale(1.05) en 300ms ease-out | ⏳ | CSS transitions implementadas |
| P1-PROD-005 | Specs tecnicos inline | Cada card muestra 3 bullets tecnicos (capacidad, material, extras) con icono Check | ⏳ | Array de specs en cada producto |
| P1-EVENT-003 | Filtros por tipo de evento | Botones de filtro: Todos, Festivales, Conciertos, Ferias, Corporativos, Privados. Filtro activo resaltado | ⏳ | Estados con useState, filtrado en cliente |
| P1-FORM-003 | Stepper visual mejorado | 3 circulos numerados con linea conectora, activo en naranja con ring, completados con check verde | ⏳ | Codigo completo con Check icon de lucide-react |
| P1-FORM-004 | Validacion inline amigable | Errores aparecen debajo del campo con icono AlertCircle, color rojo, mensaje claro | ⏳ | Componente FormField con error handling |
| P1-FOOT-004 | Footer enterprise 4 columnas | Brand + Servicios + Contacto 24/7 + Redes Sociales, layout responsivo | ⏳ | Grid 4 columnas desktop, 2 tablet, 1 mobile |
| P1-FOOT-005 | Redes sociales correctas | Links funcionales a Instagram (@junisama_inversiones) y LinkedIn (company/inversiones-junisama-s-a-s) | ⏳ | URLs verificadas, target="_blank" rel="noopener noreferrer" |

### 2.3 P2 — Medios/Bajos (Pulido)

| Codigo | Item | Criterio de aceptacion | Estado | Nota |
|--------|------|------------------------|--------|------|
| P2-HERO-005 | Animacion entrada hero | Elementos del hero entran con fade-up staggered al cargar | ⏳ | CSS animation + delay escalonado |
| P2-PROD-006 | Lazy loading imagenes | Imagenes de productos cargan con lazy loading + blur-up placeholder | ⏳ | Next.js Image component con placeholder="blur" |
| P2-EVENT-005 | Hover marquee pills | Pills del marquee responden a hover (pausa + highlight sutil) | ⏳ | `animation-play-state: paused` en hover del container |
| P2-A11Y-001 | Contraste WCAG AA | Todos los textos tienen contraste minimo 4.5:1 (normal) o 3:1 (grande) | ⏳ | Primary #E85D24 sobre blanco = 3.5:1 (AA para texto grande OK) |
| P2-A11Y-002 | Skip link funcional | Primer elemento focusable es skip link que navega a #main-content | ⏳ | Implementado en globals.css + layout |
| P2-A11Y-003 | Reduced motion | `@media (prefers-reduced-motion: reduce)` desactiva todas las animaciones | ⏳ | CSS al final de globals.css |

### 2.4 Validaciones Cruzadas (Regresion Post-Cambio)

| ID | Validacion cruzada | Paginas a verificar | Estado |
|----|--------------------|---------------------|--------|
| VC-01 | **Despues de cambiar logo**: verificar que cambio en header Y footer Y favicon | Todas | ⏳ |
| VC-02 | **Despues de cambiar copyright**: verificar que cambio en footer publico Y en admin sidebar (si aplica) | Todas + /admin | ⏳ |
| VC-03 | **Despues de agregar EMERGENCIA**: verificar que NO se rompio layout del header en mobile | Todas (viewport <768px) | ⏳ |
| VC-04 | **Despues de agregar EMERGENCIA**: verificar que el boton COTIZAR sigue visible y funcional | Todas | ⏳ |
| VC-05 | **Despues de fix title tags**: verificar que NINGUNA pagina interna tiene doble "\| Junisama" | /productos, /servicios, /galeria, /quienes-somos, /contacto, /cotizacion, /faq, /privacidad, /terminos, /cookies | ⏳ |
| VC-06 | **Despues de fix formulario**: verificar que la validacion funciona en los 3 pasos y el envio completo | /cotizacion | ⏳ |
| VC-07 | **Despues de eliminar testimonios**: verificar que NO quedan en DOM (buscar "Carlos Vargas" o "Festival Vallenato") | / (home) | ⏳ |
| VC-08 | **Despues de agregar eventos reales**: verificar que NO hay eventos inventados ("Festival Vallenato 2025" no debe existir) | / (home - marquee), /galeria | ⏳ |
| VC-09 | **Despues de fix botones servicios**: verificar que los 4 servicios navegan correctamente a /cotizacion | /servicios | ⏳ |
| VC-10 | **Despues de agregar client-marquee**: verificar que la home carga sin errores de hidratacion (use client) | / (home) | ⏳ |
| VC-11 | **Datos de contacto consistentes**: Tel +57 350 708 9584, email soporte@junisama.com, direcciones correctas en TODAS las paginas | Header, Footer, /contacto, /cotizacion | ⏳ |
| VC-12 | **Responsive**: Verificar layout en 320px, 768px, 1024px, 1440px | Todas las paginas | ⏳ |

---

## 3. VEREDICTO FINAL

### Estado resumido

| Categoria | Total | Cubiertos en plan | Gaps criticos |
|-----------|-------|-------------------|---------------|
| Hallazgos Fase 1 (Tecnico) | 22 | 19 (86%) | 1 gap alto (imagen /quienes-somos) |
| Hallazgos Fase 2 (Contenido) | 15 | 11 (73%) | 2 gaps altos (imagenes /quienes-somos, servicio tecnico) |
| P0 en plan tecnico | 22 | 22 definidos | 4 gaps de assets externos |
| P1 en plan tecnico | 18 | 18 definidos | 0 gaps |
| P2 en plan tecnico | 10 | 10 definidos | 0 gaps |

### Bloqueantes identificados (deben resolverse ANTES del prospecto)

1. **GAP-01: Imagenes /quienes-somos** — La pagina "Quienes Somos" no tiene cobertura en el plan tecnico. Quedaria con imagenes placeholder.
2. **GAP-04: Fotos de productos** — Sin las 8 fotos reales, las cards seguirian sin imagenes. Esto es P0 critico.
3. **GAP-06: Autorizacion nombres de marca** — Usar nombres como Shakira, Foo Fighters, Papa Francisco sin autorizacion confirmada es riesgo legal.

### Veredicto

> **⚠️ PENDIENTE por 3 bloqueantes antes de mostrar al prospecto:**
>
> 1. **Assets de imagen faltantes**: Se requieren 8+ fotos de productos y al menos 1 foto para /quienes-somos. Sin ellas, el sitio sigue con placeholders.
> 2. **Confirmacion de autorizacion de marcas**: Los 32 eventos incluyen nombres de alto perfil. Debe confirmarse autorizacion legal.
> 3. **Favicon**: Verificar que el favicon tambien se actualizo (no cubierto en plan).
>
> **El plan tecnico cubre el 86% de los hallazgos tecnicos y el 73% de los de contenido.** Las tareas P0 y P1 estan bien definidas con codigo. **Una vez resueltos los 3 bloqueantes de assets/autorizacion, el sitio estaria listo para presentacion.**

---

## 4. RECOMENDACIONES DE DESPLIEGUE

### 4.1 Orden de implementacion (secuencia recomendada)

#### Fase A: Fundamentos (sin esto, todo lo demas falla)
1. `tailwind.config.ts` — Tokens de color, tipografia, espaciado, animaciones
2. `app/globals.css` — Custom properties, Google Fonts, keyframes
3. `app/layout.tsx` — Fix metadatos, title template, canonical, OG

#### Fase B: Componentes base (bloqueantes visuales)
4. `components/header.tsx` — Logo JUNISAMA + EMERGENCIA + dropdown + sticky
5. `components/hero.tsx` — Fix boton + stats dorados + badge ISO + fondo
6. `components/footer.tsx` — Logo + copyright 2025 + sedes + admin link
7. `components/admin-link.tsx` — Acceso discreto (nuevo componente)

#### Fase C: Contenido critico (credibilidad)
8. `data/events.ts` — Dataset de 32 eventos reales (nuevo archivo)
9. `components/client-marquee.tsx` — Marquee infinito (nuevo componente)
10. `components/our-numbers.tsx` — Reemplaza testimonios (nuevo componente)
11. `components/product-card.tsx` + `components/product-grid.tsx` — Cards con fotos reales

#### Fase D: Funcionalidad
12. `components/quote-form.tsx` + `app/cotizacion/page.tsx` — Fix validacion Zod + stepper
13. `app/servicios/page.tsx` — Fix botones sin enlace
14. `app/admin/login/page.tsx` — Eliminar credenciales expuestas

#### Fase E: Paginas especificas
15. `app/page.tsx` — Integrar nuevos componentes (marquee, our-numbers)
16. `app/galeria/page.tsx` — Eventos reales con filtros
17. `app/productos/page.tsx` — Grid con imagenes reales

#### Fase F: Assets y pulido
18. Subir fotos a `/public/images/products/` (8 imagenes)
19. Subir hero background a `/public/images/hero-background.jpg`
20. Subir OG image a `/public/images/og-image.jpg`
21. Actualizar favicon (`/app/favicon.ico`)

### 4.2 Que validar en cada etapa

| Etapa | Validacion | Como |
|-------|------------|------|
| **Post-Fase A** | Build no falla, estilos se aplican | `npm run build` debe pasar sin errores. Verificar fonts cargadas en Network tab |
| **Post-Fase B** | Header, hero, footer renderizan correcto | Navegar a / y verificar: logo JUNISAMA, boton EMERGENCIA rojo, copyright 2025, stats dorados |
| **Post-Fase C** | Nuevos componentes se muestran | Verificar marquee con eventos, "Nuestros Numeros" reemplaza testimonios, cards con fotos |
| **Post-Fase D** | Formularios y admin funcionan | /cotizacion: enviar sin tipo de evento → mensaje amigable. /admin/login: sin credenciales visibles. /servicios: 4 CTAs funcionales |
| **Post-Fase E** | Paginas integradas sin errores | Revisar cada pagina: sin 500, sin hidratation errors, contenido correcto |
| **Post-Fase F** | Assets cargados | Verificar Network tab: 0 imagenes 404. Lighthouse: 0 errores de recurso |

### 4.3 Checklist pre-deploy en Vercel

| # | Item | Comando/Metodo |
|---|------|----------------|
| 1 | Build local exitoso | `npm run build` → 0 errores, 0 warnings criticas |
| 2 | TypeScript sin errores | `npx tsc --noEmit` → 0 errores |
| 3 | Linting limpio | `npm run lint` → 0 errores (warnings aceptables) |
| 4 | Variables de entorno configuradas | Verificar en Vercel Dashboard: NEXT_PUBLIC_ADMIN_EMAIL, NEXT_PUBLIC_ADMIN_PASSWORD, NEXT_PUBLIC_SITE_URL |
| 5 | Imagenes en public/ | Verificar que `/public/images/` contiene: hero-background.jpg, og-image.jpg, products/ (8 fotos) |
| 6 | Sin credenciales hardcodeadas | Buscar `Junisama2025` o `admin@junisama.com` en todo el codebase → debe aparecer SOLO en .env.example |
| 7 | Sin "UVINERIL" en codebase | `grep -ri "uvineril" . --exclude-dir=node_modules --exclude-dir=.git` → 0 resultados |
| 8 | Sin testimonios ficticios | `grep -ri "carlos vargas\|maria elena rios\|laura gomez\|festival vallenato" . --exclude-dir=node_modules` → 0 resultados |
| 9 | Responsive testado | Chrome DevTools: iPhone SE (375px), iPad (768px), Desktop (1440px) |
| 10 | Lighthouse score | Performance >= 70, Accessibility >= 90, Best Practices >= 90, SEO >= 90 |
| 11 | Links funcionales | Todos los enlaces internos navegan correctamente, sin 404 |
| 12 | Formulario cotizacion | Flujo completo de 3 pasos sin errores en consola |
| 13 | Boton EMERGENCIA | Click abre dialogo de llamada en mobile, funciona en desktop |

### 4.4 Consideraciones especificas para Vercel

| Aspecto | Consideracion |
|---------|---------------|
| **SSR/Hidratacion** | Los componentes `client-marquee.tsx` y `our-numbers.tsx` usan `"use client"`. Verificar que no hay mismatch de hidratacion (el HTML server-side debe coincidir con el primer render client-side) |
| **Imagenes** | Usar `<Image>` de Next.js con `sizes` correcto para optimizacion automatica. Las imagenes en `public/` se sirven estaticamente |
| **Environment variables** | Las `NEXT_PUBLIC_*` se incluyen en el bundle del cliente. **No es seguro para credenciales reales**. Considerar implementar autenticacion con API route en el futuro |
| **Font loading** | Google Fonts importados via CSS `@import`. Considerar usar `next/font` para optimizacion y evitar FOUT |
| **Animaciones CSS** | Las animaciones `marquee` y `pulse-emergency` son puramente CSS, no requieren JS. Performance-friendly |
| **Metadata** | Next.js 14+ genera metadatos automaticamente desde `layout.tsx`. Verificar con herramientas como https://www.opengraph.xyz/ |
| **Dominio** | Configurar dominio custom `junisama.com.co` en Vercel Dashboard una vez validado el deploy de preview |

---

## 5. ACCIONES POST-DEPLOY

| # | Accion | Responsable | Prioridad |
|---|--------|-------------|-----------|
| 1 | Obtener 8 fotos reales de productos (min 800x600px, formato WebP/JPG) | Cliente/Junisama | **P0 bloqueante** |
| 2 | Obtener 1-2 fotos de empresa/equipo/instalaciones para /quienes-somos | Cliente/Junisama | **P0 bloqueante** |
| 3 | Confirmar autorizacion legal para usar nombres de marca de eventos (Shakira, Foo Fighters, etc.) | Legal/Junisama | **P0 bloqueante** |
| 4 | Obtener numero de certificado ISO 14001, organismo certificador y vigencia | Cliente/Junisama | P1 |
| 5 | Implementar autenticacion backend segura (reemplazar NEXT_PUBLIC credenciales) | Dev Backend | P1 |
| 6 | Agregar mapas de Google Maps incrustados en footer (como en produccion) | Frontend | P1 |
| 7 | Obtener video de fondo para hero (5-8s, evento real) | Cliente/Junisama | P2 |
| 8 | Generar imagen OG (1200x630) con branding JUNISAMA | Diseno | P1 |
| 9 | Crear favicon.ico con logo JUNISAMA | Diseno | P1 |
| 10 | Sitemap.xml + robots.txt configurados | Frontend/SEO | P2 |

---

## 6. RESUMEN EJECUTIVO PARA STAKEHOLDERS

| Aspecto | Estado |
|---------|--------|
| **Plan tecnico** | Completo con 22 P0 + 18 P1 + 10 P2, codigo listo para 20 archivos |
| **Cobertura de hallazgos** | 86% Fase 1, 73% Fase 2. Gaps menores documentados |
| **Bloqueantes para prospecto** | 3: (1) Fotos de productos, (2) Foto /quienes-somos, (3) Autorizacion marcas |
| **Estimado de implementacion** | 2-3 dias de desarrollo frontend + 1-2 dias de coordinacion de assets |
| **Riesgo legal** | Medio-Alto si se publican nombres de marca sin autorizacion. Requiere confirmacion |
| **Veredicto** | **PENDIENTE** — El plan es solido pero requiere assets externos y confirmacion legal antes del deploy |

---

*Documento generado por QA de Cierre | Fase 7 — Regresion Final*
*Metodologia: Trazabilidad completa de hallazgos Fase 1-2 contra plan tecnico Fases 4-6, validacion cruzada de dependencias, checklist de aceptacion con criterios objetivos*
