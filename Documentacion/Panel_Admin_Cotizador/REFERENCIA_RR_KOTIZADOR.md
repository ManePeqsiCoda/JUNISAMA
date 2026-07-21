# Referencia RR Kotizador → BOGA Admin

> Mapeo directo de archivos del Kotizador clonado para acelerar la implementación en BOGA.

**Repo Kotizador:** `G:\My Drive\RR_Aliados\08_Dev\Proyectos\RR_Kotizador`  
**GitHub:** https://github.com/ManePeqsiCoda/RR_KOTIZADOR

---

## Mapeo de componentes

| Kotizador (origen) | BOGA (destino propuesto) | Qué copiar/adaptar |
|--------------------|--------------------------|-------------------|
| `src/components/AdminModal.tsx` | `src/components/admin/catalogo/CatalogoAdmin.tsx` | CRUD completo: tabs, búsqueda, editor tarifas, desglose costos |
| `src/pages/CreateCombo.tsx` | `src/app/admin/cotizaciones/nueva/page.tsx` | Selector catálogo, cantidades, totales en vivo |
| `src/pages/Combos.tsx` | `src/app/admin/cotizaciones/page.tsx` | Listado cards con costo/precio/margen |
| `src/components/ComboEditModal.tsx` | `src/components/admin/cotizaciones/CotizacionEditModal.tsx` | Edición post-creación |
| `src/lib/utils.ts` | `src/lib/catalogo.ts` + `src/lib/cotizaciones.ts` | `DEFAULT_SERVICES` → `DEFAULT_CATALOGO`, helpers persistencia |
| `src/types/index.ts` | `src/types/cotizador.ts` | Ver `MODELO_DATOS_COTIZADOR_BOGA.md` |
| `src/components/Header.tsx` | Sidebar admin existente | Nav: Catálogo, Cotizaciones, Solicitudes |
| `CronogramaExport.tsx` + jspdf | `src/components/admin/cotizaciones/CotizacionPDF.tsx` | PDF con logo BOGA, sin costos internos |

---

## Mapeo de conceptos de negocio

| Kotizador | BOGA |
|-----------|------|
| `Servicio` | `ItemCatalogo` (producto o servicio) |
| `PlanServicio` | `Tarifa` |
| `CategoriaServicio` | `CategoriaCatalogo` |
| `Combo` | `Cotizacion` |
| `ServicioEnCombo` | `ItemEnCotizacion` |
| `DEFAULT_SERVICES` | `DEFAULT_CATALOGO` |
| `SERVICES_VERSION` | `CATALOGO_VERSION` |
| `getServicios()` / `saveServicios()` | `getCatalogo()` / `saveCatalogo()` |
| `getCombos()` / `saveCombos()` | `getCotizaciones()` / `saveCotizaciones()` |
| `normalizarPlan()` | `normalizarTarifa()` |
| `formatCOP` / `Ae()` | `formatCOP()` utility compartida |

---

## Funciones clave en `utils.ts` (Kotizador)

Leer e implementar equivalentes en BOGA:

```ts
// Persistencia
getServicios(): Servicio[]
saveServicios(servicios: Servicio[]): void
getCombos(): Combo[]
saveCombos(combos: Combo[]): void
generateId(): string

// Cálculo
normalizarPlan(plan: PlanServicio): PlanServicio

// Versión catálogo (invalida caché)
SERVICES_VERSION + check en getServicios()
```

---

## UI patterns a replicar

### AdminModal — estructura de tabs
1. **Tab Servicios:** listado con búsqueda, expandir planes/tarifas, editar/eliminar
2. **Tab Editor:** formulario servicio + planes anidados + desglose costos

### CreateCombo — flujo
1. Nombre + descripción cotización
2. Panel izquierdo: catálogo filtrable por categoría
3. Panel derecho: ítems seleccionados + totales (costo, precio, margen)
4. Toggle "mostrar costos internos" (solo admin)
5. Guardar → listado

### Cards de listado
- Nombre cotización / combo
- Costo total | Precio venta | Margen %
- Acciones: ver, editar, duplicar, eliminar, export PDF

---

## Dependencias npm (Kotizador → BOGA)

Ya probablemente en BOGA; verificar:

```json
{
  "jspdf": "^2.5.2",
  "html2canvas": "^1.4.1",
  "lucide-react": "latest",
  "sonner": "latest",
  "zod": "latest",
  "react-hook-form": "latest"
}
```

---

## Documentos Kotizador para copiar como referencia

Estos NO se copian tal cual (son de RR Aliados), pero sí consultar:

| Documento | Uso para BOGA |
|-----------|---------------|
| `DOCUMENTO_MAESTRO_RR_KOTIZADOR.md` | Arquitectura general |
| `PLAN_CRONOGRAMA_AUTOMATICO.md` | Fase 4 — plan entrega evento |
| `ACTUALIZACION_V30.md` | Patrón de documentar cambios de precios (adaptar a BOGA) |

---

## Diferencias importantes (no copiar ciegamente)

| Aspecto | Kotizador | BOGA |
|---------|-----------|------|
| Persistencia | `localStorage` | API + DB |
| Stack | Vite SPA | Next.js App Router |
| Auth | Ninguna | Login admin existente |
| Dominio | Servicios agencia RR | Productos sanitarios eventos |
| PDF cliente | Incluye desglose RR | **Solo precio cliente**, sin costos |
| Cronograma | 6 meses agencia | Días alrededor del evento |
| Design | Dark #0a0a0a + gold | Admin BOGA azul + lima |

---

*Actualizar este mapeo cuando exista repo BOGA clonado con estructura real de carpetas.*
