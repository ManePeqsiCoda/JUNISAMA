# Reglas de negocio — Cotización BOGA

> Reglas para precios, márgenes y proceso comercial.  
> Adaptado del playbook Kotizador RR Aliados al contexto BOGA.

---

## 1. Fuente de verdad de precios

| Regla | Detalle |
|-------|---------|
| R-01 | Tarifas oficiales viven en el **catálogo admin**, no en WhatsApp/Excel sueltos |
| R-02 | Cambio de precio → registrar en `_HISTORIAL.md` del proyecto BOGA |
| R-03 | Incrementar `CATALOGO_VERSION` al modificar seed (patrón `SERVICES_VERSION` Kotizador) |
| R-04 | Sitio público `/productos` lee del mismo catálogo (single source of truth) |

---

## 2. Estructura de tarifas

| Campo | Regla |
|-------|-------|
| Costos | Todo precio de venta debe tener desglose de costos documentado |
| Margen | Recalcular automáticamente: `ganancia = precioVenta - costoTotal` |
| Margen mínimo | Definir con BOGA (sugerido: ≥ 25% en alquiler, ≥ 15% en operación masiva) |
| Margen negativo | **Bloquear guardado** o mostrar alerta roja — no enviar PDF al cliente |
| Unidad de cobro | Explícita: día | evento | unidad | mes |

---

## 3. Cotizaciones

| Regla | Detalle |
|-------|---------|
| C-01 | Toda cotización tiene número correlativo `BOGA-YYYY-NNNN` |
| C-02 | Validez default: **15 días** desde emisión |
| C-03 | PDF al cliente: **solo precio final**, nunca costos internos |
| C-04 | Descuentos > 10% requieren nota interna justificada |
| C-05 | Cotización `aceptada` no se edita — duplicar para nueva versión |
| C-06 | Formulario público genera `SolicitudCotizacion`, no cotización formal directa |

---

## 4. Productos y servicios

| Regla | Detalle |
|-------|---------|
| P-01 | Producto inactivo no aparece en constructor ni formulario público |
| P-02 | Mínimo 1 tarifa activa por producto publicado |
| P-03 | Baños discapacitados: verificar normativa accesibilidad en items incluidos |
| P-04 | Tráiler de lujo: tarifa diferenciada fin de semana vs día hábil (opcional) |
| P-05 | Operarios: tarifa por turno (8h / 12h) |

---

## 5. Integración formulario público

Campos obligatorios (schema Zod existente):
- Nombre, email, teléfono, tipo evento, fecha, ciudad
- Al menos 1 producto seleccionado

Flujo:
1. Usuario envía `/cotizacion`
2. Crea `SolicitudCotizacion` estado `nueva`
3. Admin revisa en bandeja
4. Admin convierte → `Cotizacion` borrador pre-llenada
5. Admin ajusta cantidades/precios → envía PDF

---

## 6. Seguridad y compliance

| Regla | Detalle |
|-------|---------|
| S-01 | No publicar precios sin aprobación BOGA (prospecto en negociación) |
| S-02 | Datos personales solicitudes: retención según política privacidad |
| S-03 | Admin auth server-side en API routes |
| S-04 | Credenciales nunca en DOM ni `NEXT_PUBLIC_*` en producción |

---

## 7. Diferencias vs RR Kotizador

| Kotizador RR | BOGA |
|--------------|------|
| Precio mínimo $2.7M/mes | No aplica — tarifas por día/evento |
| Modelo A prohibido | N/A |
| Combos estratégicos 24 | Paquetes opcionales por tipo evento |
| Cronograma 6 meses | Plan entrega evento (días) |
| localStorage | API + DB |

---

## 8. Checklist antes de enviar cotización al cliente

- [ ] Datos cliente completos
- [ ] Fecha y ciudad del evento confirmadas
- [ ] Cantidades coherentes (ej. baños vs asistentes estimados)
- [ ] Margen ≥ mínimo acordado
- [ ] PDF revisado visualmente (logo BOGA, totales)
- [ ] Validez indicada en PDF
- [ ] Registro en pipeline comercial BOGA

---

*Precios específicos en COP: definir con cliente BOGA antes de poblar `DEFAULT_CATALOGO`.*
