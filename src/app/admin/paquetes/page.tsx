"use client"

import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Layers,
  Plus,
  Package,
  Search,
  Pencil,
  Trash2,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { BogaCircles } from "@/components/brand/boga-circles"
import {
  calcularPaquete,
  DESCUENTO_NOTAS_MIN,
  formatCOP,
  margenStatus,
  MARGEN_BLOQUEO,
  MARGEN_WARNING,
  nextNumeroCotizacion,
  precioDesdeMargen,
} from "@/lib/cotizador/calc"
import {
  generateId,
  getCatalogo,
  getPaqueteById,
  getPaquetes,
  savePaquetes,
  upsertPaquete,
} from "@/lib/cotizador/storage"
import type {
  CatalogItem,
  CategoriaCatalogo,
  ItemEnPaquete,
  PaqueteEvento,
  TipoEventoCotizador,
} from "@/types/cotizador-boga"
import { CATEGORIA_LABELS } from "@/types/cotizador-boga"

const TIPOS: TipoEventoCotizador[] = [
  "festival",
  "concierto",
  "feria",
  "corporativo",
  "boda",
  "privado",
  "obra",
]

const CATEGORIAS = Object.keys(CATEGORIA_LABELS) as CategoriaCatalogo[]

export default function PaquetesPage() {
  const [paquetes, setPaquetes] = useState<PaqueteEvento[]>([])
  const [creando, setCreando] = useState(false)
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const recargar = () => setPaquetes(getPaquetes())

  useEffect(() => {
    recargar()
  }, [])

  const abrirCreador = () => {
    setEditandoId(null)
    setDialogOpen(true)
    setCreando(true)
  }

  const abrirEditor = (id: string) => {
    setEditandoId(id)
    setDialogOpen(true)
    setCreando(false)
  }

  const cerrarDialog = () => {
    setDialogOpen(false)
    setEditandoId(null)
    setCreando(false)
  }

  const handleEliminar = (id: string, nombre: string) => {
    if (!confirm(`¿Eliminar el paquete "${nombre}"?`)) return
    const nuevos = paquetes.filter((p) => p.id !== id)
    savePaquetes(nuevos)
    recargar()
    toast.success("Paquete eliminado")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-foreground">
            Paquetes de evento
          </h1>
          <p className="text-sm text-muted-foreground">
            Crea y gestiona los paquetes promocionales que aparecerán en la sección Servicios
          </p>
        </div>
        <div className="flex items-center gap-2">
          <BogaCircles size="s" tone="electric" />
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger
              onClick={abrirCreador}
              className="btn-primary"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nuevo paquete
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] w-[calc(100%-1rem)] overflow-y-auto md:max-w-3xl lg:max-w-6xl max-sm:h-[85vh] max-sm:rounded-xl max-sm:p-3">
              <DialogHeader>
                <DialogTitle>
                  {editandoId ? "Editar paquete" : "Nuevo paquete promocional"}
                </DialogTitle>
              </DialogHeader>
              <PaqueteEditor
                paqueteId={editandoId ?? undefined}
                onSaved={() => {
                  recargar()
                  cerrarDialog()
                }}
                onCancel={cerrarDialog}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Grid de paquetes */}
      {paquetes.length === 0 ? (
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center py-16">
            <Package className="mb-4 h-12 w-12 text-muted-foreground/40" />
            <p className="text-lg font-semibold text-foreground">
              No hay paquetes aún
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Crea tu primer paquete promocional
            </p>
            <Button
              onClick={abrirCreador}
              className="btn-primary"
            >
              <Plus className="mr-2 h-4 w-4" />
              Crear paquete
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {paquetes.map((p) => {
            const descuento = p.descuentoPorcentaje ?? 0
            const precioOriginal = descuento > 0
              ? Math.round(p.precioCliente / (1 - descuento / 100))
              : p.precioCliente

            return (
              <Card
                key={p.id}
                className="border-border bg-card transition-all hover:shadow-md"
              >
                <CardHeader className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Layers className="h-5 w-5" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{p.nombre}</CardTitle>
                  <p className="text-xs capitalize text-muted-foreground">
                    {p.tipoEvento ?? "general"} · {p.items.length} servicios
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Precios */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Precio</span>
                      <span className="font-semibold text-boga-lima-500">
                        {formatCOP(p.precioCliente)}
                      </span>
                    </div>
                    {descuento > 0 && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Antes</span>
                          <span className="text-xs text-muted-foreground line-through">
                            {formatCOP(precioOriginal)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Descuento</span>
                          <span className="font-semibold text-boga-electric-500">
                            -{descuento}%
                          </span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Margen</span>
                      <span className="font-semibold text-boga-success-500">
                        {p.margenPorcentaje}%
                      </span>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => abrirEditor(p.id)}
                    >
                      <Pencil className="mr-1.5 h-3.5 w-3.5" />
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-boga-error-500"
                      onClick={() => handleEliminar(p.id, p.nombre)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Editor interno de paquetes (sin datos de cliente) ─────────────────────

interface PaqueteEditorProps {
  paqueteId?: string
  onSaved: () => void
  onCancel: () => void
}

function PaqueteEditor({ paqueteId, onSaved, onCancel }: PaqueteEditorProps) {
  const [catalogo, setCatalogo] = useState<CatalogItem[]>([])
  const [search, setSearch] = useState("")
  const [categoria, setCategoria] = useState<CategoriaCatalogo | "all">("all")
  const [items, setItems] = useState<ItemEnPaquete[]>([])
  const [descuento, setDescuento] = useState(10)
  const [margenManual, setMargenManual] = useState<number | null>(null)
  const [nombre, setNombre] = useState("")
  const [tipoEvento, setTipoEvento] = useState<TipoEventoCotizador | "">("")
  const [notasInternas, setNotasInternas] = useState("")
  const [saving, setSaving] = useState(false)
  const [openItems, setOpenItems] = useState<string[]>([])

  useEffect(() => {
    const cat = getCatalogo()
    setCatalogo(cat)

    if (paqueteId) {
      const existing = getPaqueteById(paqueteId)
      if (existing) {
        setItems(existing.items.map((i) => ({ ...i })))
        setDescuento(existing.descuentoPorcentaje ?? 0)
        setMargenManual(existing.margenPorcentaje)
        setNombre(existing.nombre)
        setTipoEvento(existing.tipoEvento ?? "")
        setNotasInternas(existing.notasInternas ?? "")
      }
    }
  }, [paqueteId])

  const baseTotales = useMemo(
    () => calcularPaquete(items, catalogo, descuento),
    [items, catalogo, descuento]
  )

  const totales = useMemo(() => {
    if (margenManual == null || baseTotales.costoTotal <= 0) return baseTotales
    const precioCliente = precioDesdeMargen(baseTotales.costoTotal, margenManual)
    const ganancia = Math.max(0, precioCliente - baseTotales.costoTotal)
    return { ...baseTotales, precioCliente, ganancia, margenPorcentaje: margenManual }
  }, [baseTotales, margenManual])

  const mStatus = margenStatus(totales.margenPorcentaje)

  const handleMargenSlider = (value: number) => {
    const m = Math.min(90, Math.max(0, value))
    setMargenManual(m)
    if (descuento > 0) setDescuento(0)
  }

  const filtered = useMemo(() => {
    return catalogo
      .filter((c) => c.activo)
      .filter((c) => categoria === "all" || c.categoria === categoria)
      .filter((c) => {
        const q = search.trim().toLowerCase()
        if (!q) return true
        return c.nombre.toLowerCase().includes(q)
      })
      .sort((a, b) => a.orden - b.orden)
  }, [catalogo, categoria, search])

  const isProductSelected = (catalogItemId: string) =>
    items.some((i) => i.catalogItemId === catalogItemId)

  const toggleProduct = (catalogItemId: string) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.catalogItemId === catalogItemId)
      if (exists) {
        setOpenItems((p) => p.filter((id) => id !== catalogItemId))
        return prev.filter((i) => i.catalogItemId !== catalogItemId)
      }
      const item = catalogo.find((c) => c.id === catalogItemId)
      const tarifa = item?.tarifas.find((t) => t.activa)
      if (!item || !tarifa) {
        toast.error("Este producto no tiene tarifas activas")
        return prev
      }
      setOpenItems((p) => [...p, catalogItemId])
      return [...prev, { catalogItemId, tarifaId: tarifa.id, cantidad: 1 }]
    })
  }

  const setCantidad = (catalogItemId: string, cantidad: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.catalogItemId === catalogItemId
          ? { ...i, cantidad: Math.max(1, cantidad) }
          : i
      )
    )
  }

  const guardarCantidad = (catalogItemId: string) => {
    setOpenItems((p) => p.filter((id) => id !== catalogItemId))
  }

  const getTarifaItem = (it: ItemEnPaquete) => {
    const item = catalogo.find((c) => c.id === it.catalogItemId)
    return item?.tarifas.find((t) => t.id === it.tarifaId) ?? null
  }

  const validate = () => {
    if (items.length === 0) {
      toast.error("Selecciona al menos un producto")
      return false
    }
    if (descuento > DESCUENTO_NOTAS_MIN && !notasInternas.trim()) {
      toast.error(`Descuento > ${DESCUENTO_NOTAS_MIN}% exige notas internas (B-04)`)
      return false
    }
    return true
  }

  const handleSave = () => {
    if (!validate()) return
    setSaving(true)
    try {
      const now = new Date().toISOString()
      const all = getPaquetes()
      const id = paqueteId ?? generateId("pkg")
      const num = paqueteId
        ? (getPaqueteById(paqueteId)?.numero ?? nextNumeroCotizacion(all))
        : nextNumeroCotizacion(all)

      const pkg: PaqueteEvento = {
        id,
        numero: num,
        nombre: nombre.trim() || "Paquete sin nombre",
        esPlantilla: false,
        tipoEvento: tipoEvento || undefined,
        items,
        ...totales,
        descuentoPorcentaje: descuento || undefined,
        estado: "borrador",
        origen: "admin",
        validezDias: 30,
        notasInternas: notasInternas.trim() || undefined,
        creadoEn: getPaqueteById(id)?.creadoEn ?? now,
        actualizadoEn: now,
      }
      upsertPaquete(pkg)
      toast.success(paqueteId ? "Paquete actualizado" : "Paquete creado")
      onSaved()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Catálogo de productos 60% */}
        <div className="space-y-4 lg:col-span-3">
          {/* Búsqueda */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Buscar producto…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filtro de categorías */}
          <div className="flex flex-wrap gap-2">
            <Chip
              active={categoria === "all"}
              onClick={() => setCategoria("all")}
              label="Todas"
            />
            {CATEGORIAS.map((key) => (
              <Chip
                key={key}
                active={categoria === key}
                onClick={() => setCategoria(key)}
                label={CATEGORIA_LABELS[key]}
              />
            ))}
          </div>

          {/* Lista de productos */}
          <div className="space-y-2">
            {filtered.map((item) => {
              const selected = isProductSelected(item.id)
              const itemEncontrado = items.find(
                (i) => i.catalogItemId === item.id
              )
              const tarifa = getTarifaItem(
                itemEncontrado ?? {
                  catalogItemId: item.id,
                  tarifaId: item.tarifas.find((t) => t.activa)?.id ?? "",
                  cantidad: 1,
                }
              )
              const isOpen = openItems.includes(item.id)
              return (
                <Card
                  key={item.id}
                  className={cn(
                    "border transition-colors",
                    selected
                      ? "border-boga-lima-500/50 bg-boga-lima-500/5"
                      : "border-border bg-card"
                  )}
                >
                  <CardContent className="p-0">
                    <div
                      className="flex cursor-pointer items-center gap-3 px-4 py-3"
                      onClick={() => toggleProduct(item.id)}
                    >
                      <Checkbox
                        checked={selected}
                        onCheckedChange={() => toggleProduct(item.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">
                            {item.nombre}
                          </h3>
                          {item.badge && (
                            <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {CATEGORIA_LABELS[item.categoria]}
                        </p>
                      </div>
                      {selected && !isOpen && (
                        <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-boga-lima-500/15 px-2.5 py-0.5 text-xs font-semibold text-boga-lima-600">
                          ×{itemEncontrado?.cantidad ?? 1}
                        </span>
                      )}
                    </div>

                    {isOpen && selected && (
                      <div className="border-t border-border px-4 py-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex-1">
                            <Label className="text-xs text-muted-foreground">
                              Cantidad de unidades
                            </Label>
                            <Input
                              type="number"
                              min={1}
                              className="mt-1 h-9 w-28"
                              value={itemEncontrado?.cantidad ?? 1}
                              onChange={(e) =>
                                setCantidad(item.id, Number(e.target.value) || 1)
                              }
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          {tarifa && (
                            <div className="text-right">
                              {itemEncontrado && itemEncontrado.cantidad > 1 ? (
                                <>
                                  <p className="text-[11px] text-muted-foreground line-through transition-all">
                                    {formatCOP(tarifa.precioCliente)} c/u
                                  </p>
                                  <p className="text-lg font-bold text-foreground transition-all">
                                    {formatCOP(
                                      tarifa.precioCliente * itemEncontrado.cantidad
                                    )}
                                  </p>
                                </>
                              ) : (
                                <p className="font-semibold text-foreground">
                                  {formatCOP(tarifa.precioCliente)}
                                </p>
                              )}
                            </div>
                          )}
                          <Button
                            type="button"
                            size="sm"
                            className="self-end bg-boga-lima-500 text-boga-text-on-lima hover:bg-boga-lima-600 font-semibold"
                            onClick={(e) => {
                              e.stopPropagation()
                              guardarCantidad(item.id)
                            }}
                          >
                            Guardar
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
            {filtered.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Sin productos disponibles
              </p>
            )}
          </div>
        </div>

        {/* Resumen 40% */}
        <div className="space-y-4 lg:col-span-2 lg:sticky lg:top-6 lg:self-start">
          {/* Datos del paquete */}
          <Card className="border-border bg-card ring-1 ring-foreground/10">
            <CardContent className="space-y-4 p-4">
              <h2 className="text-sm font-extrabold uppercase tracking-wider">
                Datos del paquete
              </h2>
              <div className="space-y-2">
                <Label>
                  Nombre del paquete <span className="text-boga-error-500">*</span>
                </Label>
                <Input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Festival Starter"
                />
              </div>
              <div className="space-y-2">
                <Label>Tipo de evento</Label>
                <Select
                  value={tipoEvento}
                  onValueChange={(v) =>
                    setTipoEvento(v as TipoEventoCotizador)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPOS.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Resumen financiero */}
          <Card className="border-border bg-card ring-1 ring-foreground/10">
            <CardContent className="space-y-3 p-4">
              <h2 className="text-sm font-extrabold uppercase tracking-wider">
                Resumen
              </h2>

              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Marca productos del catálogo
                </p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {items.map((it) => {
                    const cat = catalogo.find((c) => c.id === it.catalogItemId)
                    const tar = cat?.tarifas.find((t) => t.id === it.tarifaId)
                    if (!cat || !tar) return null
                    return (
                      <li
                        key={`${it.catalogItemId}-${it.tarifaId}`}
                        className="flex justify-between gap-2"
                      >
                        <span className="text-muted-foreground">
                          {cat.nombre}
                          <span className="mt-0.5 block text-[11px]">
                            {it.cantidad} und.
                          </span>
                        </span>
                        <span className="shrink-0 font-medium text-foreground">
                          {formatCOP(tar.precioCliente * it.cantidad)}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              )}

              <div className="space-y-3 border-t border-border pt-3">
                {/* Descuento */}
                <div className="flex items-center justify-between gap-2">
                  <Label className="text-xs">Descuento %</Label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    className="h-8 w-20"
                    value={descuento || ""}
                    onChange={(e) => {
                      setDescuento(Math.min(100, Number(e.target.value) || 0))
                      setMargenManual(null)
                    }}
                  />
                </div>

                {/* Totales */}
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Costo operativo</span>
                  <span>{formatCOP(totales.costoTotal)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Precio al cliente</span>
                  <span className="font-bold text-foreground">
                    {formatCOP(totales.precioCliente)}
                  </span>
                </div>

                {/* Descuento visible */}
                {descuento > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cliente ahorra</span>
                    <span className="font-semibold text-boga-electric-500">
                      {formatCOP(
                        Math.round(totales.precioCliente * (descuento / (100 - descuento)))
                      )}
                    </span>
                  </div>
                )}

                {/* Margen */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Margen</span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-bold",
                        mStatus === "ok" && "bg-boga-success-500/15 text-boga-success-500",
                        mStatus === "warning" && "bg-boga-warning-500/15 text-boga-warning-500",
                        mStatus === "blocked" && "bg-boga-error-500/15 text-boga-error-500"
                      )}
                    >
                      {totales.margenPorcentaje}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={80}
                    step={1}
                    value={totales.margenPorcentaje}
                    onChange={(e) => handleMargenSlider(Number(e.target.value))}
                    disabled={totales.costoTotal <= 0}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-border accent-boga-electric-500 disabled:opacity-40"
                    aria-label="Ajustar margen"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>0%</span>
                    <span>Objetivo {MARGEN_WARNING}%+</span>
                    <span>80%</span>
                  </div>
                </div>

                {mStatus !== "ok" && (
                  <p className="flex items-start gap-1 text-xs text-boga-warning-500">
                    <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
                    {mStatus === "blocked"
                      ? `Margen bajo ${MARGEN_BLOQUEO}%`
                      : `Margen bajo ${MARGEN_WARNING}%: revisa precios`}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Notas internas</Label>
                <Textarea
                  rows={3}
                  value={notasInternas}
                  onChange={(e) => setNotasInternas(e.target.value)}
                  placeholder="Información interna del paquete"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  disabled={saving}
                  onClick={handleSave}
                  className="btn-primary flex-1"
                >
                  {paqueteId ? "Actualizar paquete" : "Crear paquete"}
                </Button>
                <Button
                  variant="outline"
                  disabled={saving}
                  onClick={onCancel}
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// ─── Chip de categoría ─────────────────────────────────────────────────────

function Chip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors",
        active
          ? "border-boga-electric-500 bg-boga-electric-500 text-white shadow-sm"
          : "border-boga-electric-500/35 bg-transparent text-foreground/80 hover:border-boga-electric-500 hover:bg-boga-electric-500/10 hover:text-foreground"
      )}
    >
      {label}
    </button>
  )
}
