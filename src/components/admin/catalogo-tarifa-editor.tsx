"use client"

import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Trash2, Loader2 } from "lucide-react"
import { formatCOP, normalizarTarifa } from "@/lib/cotizador/calc"
import { getCatalogo, saveCatalogo, generateId } from "@/lib/cotizador/storage"
import type {
  CatalogItem,
  CategoriaCatalogo,
  CostoOperativo,
  Tarifa,
  UnidadCobro,
} from "@/types/cotizador-boga"
import { CATEGORIA_LABELS } from "@/types/cotizador-boga"

interface CatalogoTarifaEditorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: CatalogItem | null
  onSuccess: (item: CatalogItem) => void
}

const emptyCosto = (): CostoOperativo => ({
  concepto: "",
  cantidad: 1,
  unidad: "día",
  costoUnitario: 0,
  costoTotal: 0,
})

const emptyTarifa = (): Tarifa =>
  normalizarTarifa({
    id: generateId("tar"),
    nombre: "",
    descripcion: "",
    incluye: [],
    costos: [emptyCosto()],
    costoTotal: 0,
    precioCliente: 0,
    margenPorcentaje: 0,
    ganancia: 0,
    unidadCobro: "dia",
    activa: true,
  })

export function CatalogoTarifaEditor({
  open,
  onOpenChange,
  item,
  onSuccess,
}: CatalogoTarifaEditorProps) {
  const [saving, setSaving] = useState(false)
  const [nombre, setNombre] = useState("")
  const [slug, setSlug] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [categoria, setCategoria] = useState<CategoriaCatalogo>("banos-portatiles")
  const [activo, setActivo] = useState(true)
  const [tarifas, setTarifas] = useState<Tarifa[]>([emptyTarifa()])
  const [incluyeDraft, setIncluyeDraft] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!open) return
    if (item) {
      setNombre(item.nombre)
      setSlug(item.slug)
      setDescripcion(item.descripcion)
      setCategoria(item.categoria)
      setActivo(item.activo)
      setTarifas(item.tarifas.map(normalizarTarifa))
    } else {
      setNombre("")
      setSlug("")
      setDescripcion("")
      setCategoria("banos-portatiles")
      setActivo(true)
      setTarifas([emptyTarifa()])
    }
  }, [open, item])

  const margenPromedio = useMemo(() => {
    const activas = tarifas.filter((t) => t.activa)
    if (!activas.length) return 0
    return Math.round(
      activas.reduce((s, t) => s + t.margenPorcentaje, 0) / activas.length
    )
  }, [tarifas])

  const updateTarifa = (idx: number, patch: Partial<Tarifa>) => {
    setTarifas((prev) =>
      prev.map((t, i) =>
        i === idx ? normalizarTarifa({ ...t, ...patch }) : t
      )
    )
  }

  const updateCosto = (
    tarifaIdx: number,
    costoIdx: number,
    patch: Partial<CostoOperativo>
  ) => {
    setTarifas((prev) =>
      prev.map((t, i) => {
        if (i !== tarifaIdx) return t
        const costos = t.costos.map((c, j) => {
          if (j !== costoIdx) return c
          const next = { ...c, ...patch }
          next.costoTotal =
            Math.max(0, next.cantidad) * Math.max(0, next.costoUnitario)
          return next
        })
        return normalizarTarifa({ ...t, costos })
      })
    )
  }

  const handleSave = () => {
    if (!nombre.trim() || !slug.trim()) {
      toast.error("Nombre y slug son obligatorios")
      return
    }
    if (!tarifas.length) {
      toast.error("Agrega al menos una tarifa")
      return
    }
    for (const t of tarifas) {
      if (!t.nombre.trim()) {
        toast.error("Cada tarifa necesita nombre")
        return
      }
      if (t.costos.length < 1) {
        toast.error("Cada tarifa necesita al menos un costo")
        return
      }
    }

    setSaving(true)
    try {
      const catalogo = getCatalogo()
      const normalized = tarifas.map(normalizarTarifa)
      const nextItem: CatalogItem = item
        ? {
            ...item,
            nombre: nombre.trim(),
            slug: slug.trim(),
            descripcion: descripcion.trim(),
            categoria,
            activo,
            tarifas: normalized,
          }
        : {
            id: generateId("prod"),
            slug: slug.trim(),
            nombre: nombre.trim(),
            descripcion: descripcion.trim(),
            categoria,
            icono: "Box",
            specs: [],
            tarifas: normalized,
            activo,
            orden: catalogo.length + 1,
          }

      const idx = catalogo.findIndex((c) => c.id === nextItem.id)
      if (idx >= 0) catalogo[idx] = nextItem
      else catalogo.push(nextItem)
      saveCatalogo(catalogo)
      onSuccess(nextItem)
      toast.success("Catálogo actualizado")
      onOpenChange(false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[92vh]">
        <DrawerHeader>
          <DrawerTitle>
            {item ? "Editar catálogo + tarifas" : "Nuevo ítem de catálogo"}
          </DrawerTitle>
          <DrawerDescription>
            MOCK — validar con BOGA. Margen promedio: {margenPromedio}%
          </DrawerDescription>
        </DrawerHeader>

        <div className="space-y-6 overflow-y-auto px-4 pb-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Slug (SEO)</Label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Descripción</Label>
            <Textarea
              rows={2}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Categoría</Label>
              <Select
                value={categoria}
                onValueChange={(v) => setCategoria(v as CategoriaCatalogo)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(CATEGORIA_LABELS) as CategoriaCatalogo[]).map(
                    (key) => (
                      <SelectItem key={key} value={key}>
                        {CATEGORIA_LABELS[key]}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-2 pb-2">
              <Checkbox
                id="activo-cat"
                checked={activo}
                onCheckedChange={(v) => setActivo(!!v)}
              />
              <Label htmlFor="activo-cat">Activo en cotizador</Label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider">
                Tarifas
              </h3>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setTarifas((p) => [...p, emptyTarifa()])}
              >
                <Plus className="mr-1 h-4 w-4" />
                Tarifa
              </Button>
            </div>

            {tarifas.map((tarifa, tIdx) => (
              <div
                key={tarifa.id}
                className="space-y-3 rounded-xl border border-border bg-muted/20 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="grid flex-1 gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <Label>Nombre tarifa</Label>
                      <Input
                        value={tarifa.nombre}
                        onChange={(e) =>
                          updateTarifa(tIdx, { nombre: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Unidad de cobro</Label>
                      <Select
                        value={tarifa.unidadCobro}
                        onValueChange={(v) =>
                          updateTarifa(tIdx, {
                            unidadCobro: v as UnidadCobro,
                          })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dia">Día</SelectItem>
                          <SelectItem value="evento">Evento</SelectItem>
                          <SelectItem value="unidad">Unidad</SelectItem>
                          <SelectItem value="turno_8h">Turno 8h</SelectItem>
                          <SelectItem value="turno_12h">Turno 12h</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      setTarifas((p) => p.filter((_, i) => i !== tIdx))
                    }
                    aria-label="Eliminar tarifa"
                  >
                    <Trash2 className="h-4 w-4 text-boga-error-500" />
                  </Button>
                </div>

                <div className="space-y-1">
                  <Label>Descripción</Label>
                  <Input
                    value={tarifa.descripcion}
                    onChange={(e) =>
                      updateTarifa(tIdx, { descripcion: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <Label>Precio cliente (COP)</Label>
                  <Input
                    type="number"
                    min={0}
                    value={tarifa.precioCliente || ""}
                    onChange={(e) =>
                      updateTarifa(tIdx, {
                        precioCliente: Number(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Costos operativos</Label>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        updateTarifa(tIdx, {
                          costos: [...tarifa.costos, emptyCosto()],
                        })
                      }
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      Costo
                    </Button>
                  </div>
                  {tarifa.costos.map((costo, cIdx) => (
                    <div
                      key={`${tarifa.id}-c-${cIdx}`}
                      className="grid gap-2 rounded-lg bg-background/60 p-2 sm:grid-cols-5"
                    >
                      <Input
                        className="sm:col-span-2"
                        placeholder="Concepto"
                        value={costo.concepto}
                        onChange={(e) =>
                          updateCosto(tIdx, cIdx, { concepto: e.target.value })
                        }
                      />
                      <Input
                        type="number"
                        placeholder="Cant."
                        value={costo.cantidad || ""}
                        onChange={(e) =>
                          updateCosto(tIdx, cIdx, {
                            cantidad: Number(e.target.value) || 0,
                          })
                        }
                      />
                      <Input
                        type="number"
                        placeholder="Costo unit."
                        value={costo.costoUnitario || ""}
                        onChange={(e) =>
                          updateCosto(tIdx, cIdx, {
                            costoUnitario: Number(e.target.value) || 0,
                          })
                        }
                      />
                      <div className="flex items-center justify-between gap-1 text-xs text-muted-foreground">
                        <span>{formatCOP(costo.costoTotal)}</span>
                        <button
                          type="button"
                          onClick={() =>
                            updateTarifa(tIdx, {
                              costos: tarifa.costos.filter((_, i) => i !== cIdx),
                            })
                          }
                          className="text-boga-error-500"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="text-muted-foreground">
                    Costo: {formatCOP(tarifa.costoTotal)}
                  </span>
                  <span className="font-semibold text-boga-lima-500">
                    Precio: {formatCOP(tarifa.precioCliente)}
                  </span>
                  <span
                    className={
                      tarifa.margenPorcentaje < 25
                        ? "text-boga-warning-500"
                        : "text-boga-success-500"
                    }
                  >
                    Margen: {tarifa.margenPorcentaje}%
                  </span>
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Agregar ítem incluido…"
                    value={incluyeDraft[tarifa.id] ?? ""}
                    onChange={(e) =>
                      setIncluyeDraft((d) => ({
                        ...d,
                        [tarifa.id]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key !== "Enter") return
                      e.preventDefault()
                      const val = (incluyeDraft[tarifa.id] ?? "").trim()
                      if (!val) return
                      updateTarifa(tIdx, {
                        incluye: [...tarifa.incluye, val],
                      })
                      setIncluyeDraft((d) => ({ ...d, [tarifa.id]: "" }))
                    }}
                  />
                </div>
                {tarifa.incluye.length > 0 && (
                  <ul className="flex flex-wrap gap-1">
                    {tarifa.incluye.map((inc) => (
                      <li
                        key={inc}
                        className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                      >
                        {inc}
                        <button
                          type="button"
                          className="ml-1 opacity-70"
                          onClick={() =>
                            updateTarifa(tIdx, {
                              incluye: tarifa.incluye.filter((x) => x !== inc),
                            })
                          }
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <DrawerFooter>
          <Button onClick={handleSave} disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Guardar
          </Button>
          <DrawerClose
            render={
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            }
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
