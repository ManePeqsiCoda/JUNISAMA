# Plan de implementación — Panel Admin Cotizador BOGA

> Fases, tareas y criterios de aceptación.  
> Basado en patrones de `RR_Kotizador` + stack BOGA (Next.js App Router).

---

## Fase A — Fundación (2–3 días)

| ID | Tarea | Archivo(s) | Referencia Kotizador |
|----|-------|------------|---------------------|
| A-1 | Crear `src/types/cotizador.ts` | types | `src/types/index.ts` |
| A-2 | Crear `src/lib/catalogo.ts` con seed `DEFAULT_CATALOGO` | lib | `src/lib/utils.ts` |
| A-3 | Implementar `normalizarTarifa()` y `formatCOP()` | lib | `normalizarPlan()` |
| A-4 | API route GET/POST catálogo (o JSON estático temporal) | `app/api/catalogo/route.ts` | `getServicios/saveServicios` |
| A-5 | Añadir rutas admin en sidebar: Catálogo, Cotizaciones | layout admin | `Header.tsx` nav |

**Criterios de aceptación:**
- [ ] Catálogo seed con 8 productos + 4 servicios cargable en admin
- [ ] Tarifas recalculan margen al editar costos o precio

---

## Fase B — CRUD Catálogo admin (3–4 días)

| ID | Tarea | Archivo(s) | Referencia Kotizador |
|----|-------|------------|---------------------|
| B-1 | Página `/admin/catalogo` — listado con búsqueda | page + component | `AdminModal` tab servicios |
| B-2 | Formulario crear/editar ítem catálogo | component | `AdminModal` tab editor |
| B-3 | Editor de tarifas anidadas | component | planes en AdminModal |
| B-4 | Desglose de costos (concepto, cant, unidad, $) | component | `addCosto()` en AdminModal |
| B-5 | Items incluidos (tags) | component | `addItemIncluido()` |
| B-6 | Activar/desactivar ítem, orden drag (opcional) | component | — |

**Criterios de aceptación:**
- [ ] Admin puede crear producto con 1+ tarifas
- [ ] Admin puede editar costos y ver margen recalculado
- [ ] Cambios persisten (API/DB)

---

## Fase C — Constructor de cotizaciones (3–4 días)

| ID | Tarea | Archivo(s) | Referencia Kotizador |
|----|-------|------------|---------------------|
| C-1 | `/admin/cotizaciones` — listado cards | page | `Combos.tsx` |
| C-2 | `/admin/cotizaciones/nueva` — constructor | page | `CreateCombo.tsx` |
| C-3 | Selector catálogo + cantidades (días/unidades) | component | `togglePlan`, `setQuantity` |
| C-4 | Panel totales: costo, precio, margen | component | cálculo en CreateCombo |
| C-5 | Formulario datos cliente (empresa, evento, fecha) | component | Step1ClienteForm (simplificado) |
| C-6 | Guardar cotización con estado `borrador` | lib + API | `saveCombos()` |
| C-7 | Editar / duplicar / eliminar | modal | ComboEditModal |

**Criterios de aceptación:**
- [ ] Cotización con 3+ ítems calcula totales correctos
- [ ] Listado muestra todas las cotizaciones guardadas
- [ ] Duplicar crea copia editable

---

## Fase D — PDF y bandeja pública (2–3 días)

| ID | Tarea | Archivo(s) | Referencia Kotizador |
|----|-------|------------|---------------------|
| D-1 | Export PDF cotización (branding BOGA) | component | `CronogramaPDFButton.tsx` |
| D-2 | PDF **sin** costos internos — solo precio cliente | template | — |
| D-3 | API POST solicitudes desde `/cotizacion` | API route | — |
| D-4 | `/admin/solicitudes` — bandeja entradas públicas | page | — |
| D-5 | Convertir solicitud → cotización borrador | action | — |
| D-6 | Estados: nueva → convertida / descartada | lib | — |

**Criterios de aceptación:**
- [ ] PDF descargable con logo BOGA y tabla de ítems
- [ ] Formulario público crea entrada en bandeja admin
- [ ] Admin convierte solicitud en cotización editable

---

## Fase E — Pulido (2 días)

| ID | Tarea |
|----|-------|
| E-1 | Tema admin BOGA en todas las pantallas nuevas |
| E-2 | Toasts (sonner) en guardar/eliminar |
| E-3 | Validación Zod en formularios admin |
| E-4 | Mobile responsive en constructor |
| E-5 | Número correlativo cotización `BOGA-YYYY-NNNN` |

---

## Fase F — Plan de entrega evento (opcional, 4–5 días)

Adaptar motor de cronogramas del Kotizador a hitos de evento BOGA:

| Hito | Día relativo al evento |
|------|------------------------|
| Confirmación + anticipo | D-14 |
| Visita técnica / brief | D-10 |
| Instalación unidades | D-2 |
| Operación evento | D-0 |
| Mantenimiento durante evento | D+0 a D+N |
| Retiro unidades | D+1 |
| Informe cierre | D+3 |

Referencia: `../../RR_Kotizador/PLAN_CRONOGRAMA_AUTOMATICO.md` + `src/lib/cronograma-engine.ts`

---

## Integración con docs BOGA existentes

| Al implementar | Consultar |
|----------------|-----------|
| Colores admin | `../design-system-boga.md` + plan-implementacion Task 1.5 |
| Formulario público | plan-tecnico §8 (Zod schema) |
| Productos seed | plan-tecnico §5 (8 productos con slugs) |
| Seguridad admin | plan-tecnico §11 (sin credenciales en DOM) |

---

## QA final

- [ ] Catálogo editable sin romper sitio público `/productos`
- [ ] Cotización PDF coincide con totales en pantalla
- [ ] Solicitud pública aparece en admin < 5 seg
- [ ] Solo usuarios autenticados acceden a `/admin/catalogo` y `/admin/cotizaciones`
- [ ] Margen nunca negativo sin alerta visual

---

*Estimación total Fases A–E: ~12–16 días dev. Fase F opcional +4–5 días.*
