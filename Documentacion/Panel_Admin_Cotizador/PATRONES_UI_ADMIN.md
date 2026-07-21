# Patrones UI — Admin Cotizador BOGA

> Alineación visual entre patrones del **RR Kotizador** y el **design system BOGA**.
> Referencia: `../design-system-boga.md` + Kotizador `AdminModal.tsx`

---

## 1. Tema admin BOGA (obligatorio)

Usar variables CSS existentes en `globals.css`:

```css
[data-admin-theme="dark"] {
  --admin-primary: #2c4df2;
  --admin-primary-hover: #1a3ad9;
  --admin-accent: #daf73a;
  --admin-accent-hover: #b9d231;
  --admin-bg: #0a0a0a;
  --admin-bg-elevated: #141414;
  --admin-bg-surface: #1a1a1a;
  --admin-border: rgba(27, 19, 65, 0.3);
  --admin-text: #e5e5e5;
  --admin-text-muted: #737373;
  --admin-success: #6bc935;
  --admin-error: #f05252;
}
```

**Kotizador usa:** `#0a0a0a` fondo + `#c9a84c` acento → **BOGA reemplaza gold por lima + azul**.

---

## 2. Layout admin cotizador

```
┌─────────────────────────────────────────────────────────────┐
│ Admin Header BOGA (logo B + "INGENIERÍA PORTÁTIL")          │
├──────────┬──────────────────────────────────────────────────┤
│ Sidebar  │  CONTENIDO PRINCIPAL                             │
│          │                                                  │
│ Dashboard│  [Breadcrumb: Admin > Catálogo]                  │
│ Catálogo │                                                  │
│ Cotizac. │  ┌─ Stats bar ─────────────────────────────┐    │
│ Solicitud│  │ 12 cotizaciones | $45M pipeline | 3 nuevas│    │
│          │  └──────────────────────────────────────────┘    │
│          │                                                  │
│          │  [Contenido: tabla / cards / formulario]         │
└──────────┴──────────────────────────────────────────────────┘
```

---

## 3. Pantalla Catálogo (patrón AdminModal)

### Listado
- Input búsqueda con icono `Search`
- Filtro chips por categoría: Productos | Servicios | Insumos
- Card por ítem:
  - Badge categoría (azul `#2c4df2` 10% opacity)
  - Badge `"N tarifas"` (lima 10% opacity)
  - Acciones: Editar | Expandir tarifas | Eliminar
- Botón primario: `+ Nuevo producto` (lima `#daf73a`, texto oscuro)

### Editor (modal o página full)
- Tabs: **Listado** | **Editor** (igual Kotizador)
- Campos ítem: nombre, slug, categoría (select), descripción, icono, imagen
- Sección **TARIFAS (N)** con botón `+ Agregar tarifa`
- Por tarifa:
  - Nombre, descripción
  - Items incluidos (tags removibles)
  - Grid desglose costos: Concepto | Cant. | Unidad | $ unit. | Agregar
  - Precio venta | Margen % (auto) | Costo total (auto)

### Clases Tailwind sugeridas (BOGA admin)

```tsx
// Card base
className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-bg-surface)] p-4"

// Input
className="w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-elevated)] px-4 py-3 text-[var(--admin-text)]"

// Botón primario
className="rounded-full bg-[var(--admin-accent)] px-4 py-2 text-sm font-semibold text-[#0a0a0a] hover:bg-[var(--admin-accent-hover)]"

// Botón ghost
className="rounded-lg px-3 py-2 text-[var(--admin-text-muted)] hover:bg-[var(--admin-bg-elevated)]"

// Tag badge
className="rounded-full bg-[var(--admin-primary)]/10 px-2 py-0.5 text-xs text-[var(--admin-primary)]"
```

---

## 4. Constructor cotización (patrón CreateCombo)

### Layout 2 columnas (desktop)

```
┌─ Columna izq (60%) ──────────────┬─ Columna der (40%) ─────────┐
│ Buscar productos...              │ RESUMEN COTIZACIÓN           │
│ [Filtro categoría ▼]             │                              │
│                                  │ Baño VIP × 3 días  $XXX      │
│ ┌─ Baño VIP ─────────────────┐ │ Operarios × 2      $XXX      │
│ │ ○ Tarifa día evento  $XXX   │ │                              │
│ │ ○ Tarifa fin de semana       │ │ Costo:  $XXX (toggle oculto) │
│ └──────────────────────────────┘ │ Precio: $XXX                 │
│                                  │ Margen: 42%                  │
│ ┌─ Baño Estándar ──────────────┐ │                              │
│ │ ...                          │ │ [Guardar borrador] [PDF]     │
│ └──────────────────────────────┘ └──────────────────────────────┘
```

### Interacciones (copiar de Kotizador)
- Click tarifa → toggle selección
- Input cantidad → recalcular subtotales
- Toggle "Mostrar costos internos" (solo admin)
- Validación: nombre cotización + mínimo 1 ítem

---

## 5. Listado cotizaciones (patrón Combos)

Stats bar superior (3 métricas):
- Cotizaciones creadas
- Valor pipeline (suma precio venta)
- Solicitudes nuevas (link a bandeja)

Card cotización:
```
┌─────────────────────────────────────────────┐
│ Festival Manizales 2026          [Enviada]  │
│ Cliente: Eventos SA · Medellín              │
│ 5 ítems · Margen 38%                        │
│ Precio: $12.500.000 COP                     │
│ [Ver] [Editar] [PDF] [Duplicar] [Eliminar]  │
└─────────────────────────────────────────────┘
```

Estados — colores badge:
| Estado | Color |
|--------|-------|
| borrador | `--admin-text-muted` |
| enviada | `--admin-primary` |
| aceptada | `--admin-success` |
| rechazada | `--admin-error` |

---

## 6. PDF cotización cliente

**Incluir:**
- Logo BOGA + "INGENIERÍA PORTÁTIL"
- Datos cliente y evento
- Tabla ítems: producto, cantidad, precio unit., subtotal
- Total destacado en azul
- Validez: "Propuesta válida 15 días"
- Contacto: teléfono emergencia + email

**No incluir:**
- Desglose de costos internos
- Margen %
- Notas internas

---

## 7. Bandeja solicitudes públicas

Tabla compacta:
| Fecha | Cliente | Evento | Ciudad | Productos | Acción |
|-------|---------|--------|--------|-----------|--------|
| 17/07 | Juan P. | Festival | Manizales | VIP, Estándar | [Convertir] [Descartar] |

Badge `"Nueva"` en lima pulsante (sutil, no emergency).

---

## 8. Accesibilidad

- Labels en todos los inputs admin
- `aria-expanded` en acordeones de tarifas
- Contraste: lima `#daf73a` sobre `#0a0a0a` — verificar WCAG (usar lima solo en botones grandes)
- Focus ring: `ring-2 ring-[var(--admin-primary)]`

---

*Componentes shadcn/ui del proyecto BOGA: Dialog, Tabs, Input, Label, Badge, Table.*
