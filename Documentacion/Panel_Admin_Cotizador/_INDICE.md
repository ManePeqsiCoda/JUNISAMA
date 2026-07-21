# Panel Admin + Cotizador BOGA — Índice de documentación

> **Propósito:** Guía de implementación de un sistema de catálogo, precios y cotizaciones en el panel admin de BOGA, inspirado en **RR Kotizador**.
> **Stack BOGA:** Next.js 16 + React 19 + Tailwind v4 + TypeScript
> **Referencia técnica:** `../../RR_Kotizador/` — https://github.com/ManePeqsiCoda/RR_KOTIZADOR

---

## Orden de lectura recomendado

| # | Documento | Para qué |
|---|-----------|----------|
| 1 | **`DOCUMENTO_MAESTRO_PANEL_ADMIN_BOGA.md`** | Visión completa: qué construir, por qué, arquitectura |
| 2 | `MODELO_DATOS_COTIZADOR_BOGA.md` | Tipos TypeScript, entidades, persistencia |
| 3 | `REFERENCIA_RR_KOTIZADOR.md` | Mapeo archivo-a-archivo Kotizador → BOGA |
| 4 | `PLAN_IMPLEMENTACION_FASES.md` | Fases, tareas y criterios de aceptación |
| 5 | `PATRONES_UI_ADMIN.md` | UI/UX admin alineada al design system BOGA |
| 6 | `REGLAS_NEGOCIO_COTIZACION.md` | Reglas de precios, márgenes y cotización |

## Documentos de contexto BOGA (fuera de esta carpeta)

| Documento | Ubicación |
|-----------|-----------|
| Design system BOGA | `../design-system-boga.md` |
| Plan rebrand / admin theme | `../plan-implementacion-boga.md` (Task 1.5 — tema admin) |
| Formulario cotización público | `../junisama-auditoria-rediseno/04-plan-tecnico/plan-tecnico-implementacion.md` §8 |
| Playbook proyecto | `../../../../Playbooks/BOGA/_CONTEXTO.md` |

## Documentos de referencia RR Kotizador (código fuente)

| Documento / Código | Ubicación |
|--------------------|-----------|
| Documento maestro Kotizador | `../../RR_Kotizador/DOCUMENTO_MAESTRO_RR_KOTIZADOR.md` |
| Admin CRUD servicios | `../../RR_Kotizador/src/components/AdminModal.tsx` |
| Catálogo + persistencia | `../../RR_Kotizador/src/lib/utils.ts` |
| Tipos | `../../RR_Kotizador/src/types/index.ts` |
| Crear combo/cotización | `../../RR_Kotizador/src/pages/CreateCombo.tsx` |
| Cronogramas (fase 2 opcional) | `../../RR_Kotizador/PLAN_CRONOGRAMA_AUTOMATICO.md` |

---

**Volver al proyecto BOGA:** `../`
