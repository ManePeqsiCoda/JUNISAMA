# Junisama → BOGA — Rebrand Completo
## Kit de Implementacion para Kimi Code

**Proyecto**: Rebrand de Junisama Inversiones S.A.S → **BOGA** (Ingenieria Portatil)
**Prototipo actual**: https://junisama-seven.vercel.app
**Produccion actual**: https://junisama.com.co
**Brand Kit BOGA**: https://heyzine.com/flip-book/adeaf2e1df.html
**Fecha**: Julio 2025

---

## Estructura de Carpetas

```
junisama-auditoria-rediseno/
|
|-- 00-brand-kit-boga/
|   |-- brand-kit-boga-auditoria.md   # FASE 2 ACTUAL: Auditoria hiperdetallada del Brand Kit BOGA
|                                       # Logo, paleta HEX, tipografia, iconografia, tono de voz
|
|-- 01-auditoria-tecnica/
|   |-- auditoria-tecnica.md          # Auditoria anterior: 22 hallazgos tecnicos
|   |-- auditoria-estado-actual.md    # FASE 1 ACTUAL: Inventario forense del estado pre-rebrand
|
|-- 02-auditoria-contenido/
|   |-- auditoria-contenido-riesgo-marca.md  # 15+ hallazgos de contenido y riesgo reputacional
|
|-- 03-direccion-diseno/
|   |-- direccion-diseno-uiux.md      # Sistema de diseno previo (819 lineas) — REEMPLAZAR por BOGA
|
|-- 04-plan-tecnico/
|   |-- plan-tecnico-implementacion.md # Codigo de implementacion (2125 lineas) — ADAPTAR a BOGA
|
|-- 05-qa-final/
|   |-- qa-final-checklist.md         # Checklist P0/P1/P2 — ADAPTAR a BOGA
|
|-- 99-recursos/
|   |-- plan-general.md               # Plan general del proyecto
|
|-- brand-kit-boga-auditoria.md       # Copia raiz: Auditoria del Brand Kit BOGA
|-- auditoria-estado-actual.md        # Copia raiz: Inventario forense pre-rebrand
|-- README.md                         # Este archivo — indice maestro
```

---

## Orden de Lectura Recomendado (Rebrand BOGA)

### Fases del Rebrand (en orden):

1. **Brand Kit BOGA** (Fase 2) → **LEER PRIMERO**. La nueva identidad: logo, colores HEX, tipografia, tono de voz
2. **Auditoria Estado Actual** (Fase 1) → Que existe hoy en el prototipo (inventario completo)
3. **Mapa de Cambios** (Fase 3) → **CRUCE CRÍTICO**. Cada componente clasificado: CONSERVA / ADAPTA / RECONSTRUYE / NUEVO
4. **Auditoria Contenido** → Que nombres/marcas requieren autorizacion legal
5. **Plan Tecnico** → Codigo para implementar el rebrand (ADAPTAR colores y logo a BOGA)
6. **QA Final** → Checklist para validar el rebrand completo

### Plan de Implementacion (listo para ejecutar):
- **plan-implementacion-boga.md** (4,545 lineas, 45 tasks, 9 fases) ← **EJECUTAR ESTE**. Plan paso a paso con codigo completo, comandos de verificacion, y QA final.

### Design System BOGA (nuevo, reemplaza todo lo anterior):
- **design-system-boga.md** (1,669 lineas) ← **ESTE ES EL SISTEMA OFICIAL**. Tokens, tipografia, espaciado, motion, componentes.

### Documentos legacy (referencia, no usar directamente):
- **Direccion de Diseno UI/UX** (819 lineas) → Sistema de diseno anterior (Junisama). OBSOLETO — reemplazado por design-system-boga.md
- **Auditoria Tecnica** (22 hallazgos) → Hallazgos tecnicos originales, parcialmente resueltos

---

## Hallazgos Criticos del Rebrand BOGA

| # | Hallazgo | Severidad | Accion |
|---|----------|-----------|--------|
| 1 | Logo debe cambiar de "JUNISAMA" → "BOGA" + isotipo "B" | CRITICO | Reemplazar en header, footer, favicon, admin |
| 2 | Paleta debe cambiar: naranja coral → **azul electrico #2c4df2** | CRITICO | Actualizar todos los tokens de color |
| 3 | Nuevo acento: **amarillo lima #daf73a** (no existia antes) | CRITICO | Agregar a tokens, badges, stats, decorativos |
| 4 | Tipografia debe cambiar a sans-serif geometrica redondeada | ALTO | Reemplazar Outfit → Montserrat/Poppins |
| 5 | Sub-marca: "INGENIERIA PORTATIL" (tracking amplio) | ALTO | Agregar debajo del logo en header |
| 6 | Tagline: "Elevamos el estandar de tus eventos." | ALTO | Integrar en hero o seccion de marca |
| 7 | Iconografia: estilo lineal/outline (cambio visual) | MEDIO | Reemplazar iconos actuales |
| 8 | Elementos decorativos BOGA: 3 circulos, ondas, flechas | MEDIO | Agregar como SVG/CSS decorativos |
| 9 | Panel admin y boton EMERGENCIA ya funcionan | ✅ OK | Conservar, rebrandear colores |
| 10 | Copyright: "JUNISAMA" → "BOGA" + actualizar año | ALTO | Reemplazar en footer |

---

## Bloqueantes Externos (requieren accion del cliente)

1. **Archivos del logo BOGA** (SVG, PNG, AI) — necesarios para implementar el isotipo "B" con precision
2. **Nombre exacto de la fuente tipografica** — el flipbook no mostraba esta pagina; se infiere Montserrat pero requiere confirmacion
3. **8 fotos de productos reales** (min 800x600px) — sin esto las cards siguen con placeholders
4. **Autorizacion legal para usar nombres de marca** (Shakira, Foo Fighters, Papa Francisco, etc.)
5. **1 foto para /quienes-somos** (empresa, equipo o instalaciones)

---

## Instrucciones para Kimi Code (Rebrand BOGA)

Este kit contiene todo lo necesario para implementar el rebrand completo Junisama → BOGA.

**Flujo de implementacion:**
1. Lee **00-brand-kit-boga/brand-kit-boga-auditoria.md** para entender la nueva identidad
2. Lee **01-auditoria-tecnica/auditoria-estado-actual.md** para saber que existe hoy
3. Adapta **04-plan-tecnico/plan-tecnico-implementacion.md** reemplazando tokens Junisama por tokens BOGA
4. Ejecuta fase por fase pidiendo confirmacion antes de avanzar

**Documento principal de referencia visual:**
> **00-brand-kit-boga/brand-kit-boga-auditoria.md**

Contiene: logo con variantes, paleta HEX exacta (#2c4df2, #1b1341, #daf73a, #d8d8d8, #ffffff, #f9eec1), tipografia inferida, iconografia, tono de voz, mision/vision/valores, y recomendaciones CSS para implementacion web.
