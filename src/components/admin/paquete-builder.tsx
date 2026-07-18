"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  FileDown,
  Save,
  Send,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  calcularPaquete,
  DESCUENTO_NOTAS_MIN,
  formatCOP,
  labelUnidadCobro,
  margenStatus,
  MARGEN_BLOQUEO,
  MARGEN_WARNING,
  nextNumeroCotizacion,
  precioDesdeMargen,
  subtotalLinea,
} from "@/lib/cotizador/calc"
import {
  generateId,
  getCatalogo,
  getPaqueteById,
  getPaquetes,
  getPlantillas,
  upsertPaquete,
} from "@/lib/cotizador/storage"
import { exportPaquetePdf } from "@/lib/cotizador/pdf"
import type {
  CatalogItem,
  CategoriaCatalogo,
  ClienteEvento,
  ItemEnPaquete,
  PaqueteEvento,
  TipoEventoCotizador,
} from "@/types/cotizador-boga"
import { CATEGORIA_LABELS } from "@/types/cotizador-boga"

interface PaqueteBuilderProps {
  paqueteId?: string
  plantillaId?: string
  solicitudPrefill?: {
    cliente?: Partial<ClienteEvento>
    nombre?: string
    tipoEvento?: string
    fechaEvento?: string
    productSlugs?: string[]
    notas?: string
  }
}

const TIPOS: TipoEventoCotizador[] = [
  "festival",
  "concierto",
  "feria",
  "corporativo",
  "boda",
  "privado",
  "obra",
]

export function PaqueteBuilder({
  paqueteId,
  plantillaId,
  solicitudPrefill,
}: PaqueteBuilderProps) {
  const router = useRouter()
  const [catalogo, setCatalogo] = useState<CatalogItem[]>([])
  const [search, setSearch] = useState("")
  const [categoria, setCategoria] = useState<CategoriaCatalogo | "all">("all")
  const [items, setItems] = useState<ItemEnPaquete[]>([])
  const [mostrarCostos, setMostrarCostos] = useState(true)
  const [descuento, setDescuento] = useState(0)
  const [duracionDias, setDuracionDias] = useState(1)
  const [margenManual, setMargenManual] = useState<number | null>(null)
  const [nombre, setNombre] = useState("")
  const [tipoEvento, setTipoEvento] = useState<TipoEventoCotizador | "">("")
  const [fechaEvento, setFechaEvento] = useState("")
  const [asistentes, setAsistentes] = useState<number | undefined>()
  const [notasInternas, setNotasInternas] = useState("")
  const [cliente, setCliente] = useState<ClienteEvento>({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    ciudad: "",
  })
  const [editId, setEditId] = useState<string | undefined>(paqueteId)
  const [numero, setNumero] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const cat = getCatalogo()
    setCatalogo(cat)

    const sourceId = paqueteId || plantillaId
    if (sourceId) {
      const existing = getPaqueteById(sourceId)
      if (existing) {
        const isTemplate = existing.esPlantilla && !paqueteId
        setItems(existing.items.map((i) => ({ ...i })))
        setDescuento(existing.descuentoPorcentaje ?? 0)
        setDuracionDias(Math.max(1, existing.duracionDias ?? 1))
        setMargenManual(existing.margenPorcentaje)
        setNombre(
          isTemplate ? `${existing.nombre} — copia` : existing.nombre
        )
        setTipoEvento(existing.tipoEvento ?? "")
        setFechaEvento(existing.fechaEvento ?? "")
        setAsistentes(existing.asistentesEstimados)
        setNotasInternas(existing.notasInternas ?? "")
        if (existing.cliente) setCliente(existing.cliente)
        if (!isTemplate) {
          setEditId(existing.id)
          setNumero(existing.numero)
        } else {
          setEditId(undefined)
          setNumero("")
        }
      }
    }

    if (solicitudPrefill) {
      if (solicitudPrefill.nombre) setNombre(solicitudPrefill.nombre)
      if (solicitudPrefill.fechaEvento)
        setFechaEvento(solicitudPrefill.fechaEvento)
      if (solicitudPrefill.tipoEvento) {
        const t = solicitudPrefill.tipoEvento.toLowerCase()
        if (TIPOS.includes(t as TipoEventoCotizador)) {
          setTipoEvento(t as TipoEventoCotizador)
        }
      }
      if (solicitudPrefill.cliente) {
        setCliente((c) => ({
          ...c,
          nombre: solicitudPrefill.cliente?.nombre ?? c.nombre,
          empresa: solicitudPrefill.cliente?.empresa ?? c.empresa,
          email: solicitudPrefill.cliente?.email ?? c.email,
          telefono: solicitudPrefill.cliente?.telefono ?? c.telefono,
          ciudad: solicitudPrefill.cliente?.ciudad ?? c.ciudad,
        }))
      }
      if (solicitudPrefill.notas) setNotasInternas(solicitudPrefill.notas)
      if (solicitudPrefill.productSlugs?.length) {
        const seeded: ItemEnPaquete[] = []
        for (const slug of solicitudPrefill.productSlugs) {
          const item = cat.find((c) => c.slug === slug)
          const tarifa = item?.tarifas.find((t) => t.activa)
          if (item && tarifa) {
            seeded.push({
              catalogItemId: item.id,
              tarifaId: tarifa.id,
              cantidad: 1,
            })
          }
        }
        if (seeded.length) setItems(seeded)
      }
    }
  }, [paqueteId, plantillaId, solicitudPrefill])

  const baseTotales = useMemo(
    () => calcularPaquete(items, catalogo, descuento, duracionDias),
    [items, catalogo, descuento, duracionDias]
  )

  const totales = useMemo(() => {
    if (margenManual == null || baseTotales.costoTotal <= 0) {
      return baseTotales
    }
    const precioCliente = precioDesdeMargen(
      baseTotales.costoTotal,
      margenManual
    )
    const ganancia = Math.max(0, precioCliente - baseTotales.costoTotal)
    return {
      ...baseTotales,
      precioCliente,
      ganancia,
      margenPorcentaje: margenManual,
    }
  }, [baseTotales, margenManual])

  const mStatus = margenStatus(totales.margenPorcentaje)

  const handleMargenSlider = (value: number) => {
    const m = Math.min(90, Math.max(0, value))
    setMargenManual(m)
    // Al fijar margen manual, el descuento deja de aplicar sobre precio lista
    if (descuento > 0) setDescuento(0)
  }

  const filtered = useMemo(() => {
    return catalogo
      .filter((c) => c.activo)
      .filter((c) => categoria === "all" || c.categoria === categoria)
      .filter((c) => {
        const q = search.trim().toLowerCase()
        if (!q) return true
        return (
          c.nombre.toLowerCase().includes(q) ||
          c.tarifas.some((t) => t.nombre.toLowerCase().includes(q))
        )
      })
      .sort((a, b) => a.orden - b.orden)
  }, [catalogo, categoria, search])

  const isSelected = (catalogItemId: string, tarifaId: string) =>
    items.some(
      (i) => i.catalogItemId === catalogItemId && i.tarifaId === tarifaId
    )

  const toggleTarifa = (catalogItemId: string, tarifaId: string) => {
    setItems((prev) => {
      const exists = prev.find(
        (i) => i.catalogItemId === catalogItemId && i.tarifaId === tarifaId
      )
      if (exists) {
        return prev.filter(
          (i) =>
            !(i.catalogItemId === catalogItemId && i.tarifaId === tarifaId)
        )
      }
      return [...prev, { catalogItemId, tarifaId, cantidad: 1 }]
    })
  }

  const setCantidad = (
    catalogItemId: string,
    tarifaId: string,
    cantidad: number
  ) => {
    setItems((prev) =>
      prev.map((i) =>
        i.catalogItemId === catalogItemId && i.tarifaId === tarifaId
          ? { ...i, cantidad: Math.max(1, cantidad) }
          : i
      )
    )
  }

  const buildPaquete = (estado: PaqueteEvento["estado"]): PaqueteEvento => {
    const now = new Date().toISOString()
    const all = getPaquetes()
    const id = editId ?? generateId("cot")
    const num =
      numero ||
      nextNumeroCotizacion(all.filter((p) => !p.esPlantilla))
    return {
      id,
      numero: num,
      nombre: nombre.trim() || "Cotización sin nombre",
      esPlantilla: false,
      tipoEvento: tipoEvento || undefined,
      cliente: {
        ...cliente,
        nombre: cliente.nombre.trim(),
        email: cliente.email.trim(),
        telefono: cliente.telefono.trim(),
        ciudad: cliente.ciudad.trim(),
      },
      fechaEvento: fechaEvento || undefined,
      duracionDias,
      asistentesEstimados: asistentes,
      items,
      ...totales,
      descuentoPorcentaje: descuento || undefined,
      estado,
      origen: "admin",
      validezDias: 15,
      notasInternas: notasInternas.trim() || undefined,
      creadoEn: getPaqueteById(id)?.creadoEn ?? now,
      actualizadoEn: now,
    }
  }

  const validate = (forSend: boolean) => {
    if (items.length === 0) {
      toast.error("Selecciona al menos una tarifa")
      return false
    }
    if (!cliente.nombre.trim() || !cliente.email.trim()) {
      toast.error("Nombre y email del cliente son obligatorios")
      return false
    }
    if (descuento > DESCUENTO_NOTAS_MIN && !notasInternas.trim()) {
      toast.error(
        `Descuento > ${DESCUENTO_NOTAS_MIN}% exige notas internas (B-04)`
      )
      return false
    }
    if (forSend && totales.margenPorcentaje < MARGEN_BLOQUEO) {
      toast.error(
        `Margen < ${MARGEN_BLOQUEO}%: no se puede enviar / exportar PDF`
      )
      return false
    }
    return true
  }

  const handleSave = (estado: "borrador" | "enviada") => {
    if (!validate(estado === "enviada")) return
    if (estado === "enviada" && mStatus === "warning") {
      toast.warning(`Margen bajo (< ${MARGEN_WARNING}%). Revisa antes de enviar.`)
    }
    setSaving(true)
    try {
      const saved = upsertPaquete(buildPaquete(estado))
      setEditId(saved.id)
      setNumero(saved.numero)
      toast.success(
        estado === "enviada"
          ? `Cotización ${saved.numero} marcada como enviada`
          : `Borrador ${saved.numero} guardado`
      )
      router.push(`/admin/cotizaciones/${saved.id}`)
    } finally {
      setSaving(false)
    }
  }

  const handlePdf = async () => {
    if (!validate(true)) return
    const pkg = buildPaquete("enviada")
    try {
      await exportPaquetePdf(pkg, catalogo)
      toast.success("PDF generado")
    } catch {
      toast.error("No se pudo generar el PDF")
    }
  }

  const plantillas = getPlantillas()

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-dashed border-boga-lima-500/40 bg-boga-lima-500/5 px-3 py-2 text-xs text-muted-foreground">
        MOCK — validar con BOGA. Elevamos el estándar de tus eventos.
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Label className="text-xs text-muted-foreground">Usar plantilla</Label>
        <Select
          onValueChange={(id) => {
            if (!id) return
            router.push(`/admin/cotizaciones/nueva?plantillaId=${id}`)
          }}
        >
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Elegir plantilla…" />
          </SelectTrigger>
          <SelectContent>
            {plantillas.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Catálogo 60% */}
        <div className="space-y-4 lg:col-span-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Buscar producto o tarifa…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip
              active={categoria === "all"}
              onClick={() => setCategoria("all")}
              label="Todas"
            />
            {(Object.keys(CATEGORIA_LABELS) as CategoriaCatalogo[]).map(
              (key) => (
                <Chip
                  key={key}
                  active={categoria === key}
                  onClick={() => setCategoria(key)}
                  label={CATEGORIA_LABELS[key]}
                />
              )
            )}
          </div>

          <div className="space-y-3">
            {filtered.map((item) => (
              <Card
                key={item.id}
                className="border-border bg-card ring-1 ring-foreground/10"
              >
                <CardContent className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {item.nombre}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {CATEGORIA_LABELS[item.categoria]}
                      </p>
                    </div>
                    {item.badge && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.tarifas
                    .filter((t) => t.activa)
                    .map((tarifa) => {
                      const selected = isSelected(item.id, tarifa.id)
                      const qty =
                        items.find(
                          (i) =>
                            i.catalogItemId === item.id &&
                            i.tarifaId === tarifa.id
                        )?.cantidad ?? 1
                      return (
                        <div
                          key={tarifa.id}
                          className={cn(
                            "rounded-lg border p-3 transition-colors",
                            selected
                              ? "border-boga-lima-500/50 bg-boga-lima-500/5"
                              : "border-border"
                          )}
                        >
                          <label className="flex cursor-pointer items-start gap-3">
                            <Checkbox
                              checked={selected}
                              onCheckedChange={() =>
                                toggleTarifa(item.id, tarifa.id)
                              }
                            />
                            <div className="flex-1 space-y-1">
                              <div className="flex flex-wrap items-baseline justify-between gap-2">
                                <span className="text-sm font-medium">
                                  {tarifa.nombre}
                                </span>
                                <span className="text-sm font-semibold text-foreground">
                                  {formatCOP(tarifa.precioCliente)}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {tarifa.descripcion}
                              </p>
                              {selected && (
                                <div
                                  className="mt-2 flex items-center gap-2"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <Label className="text-xs">
                                    {labelUnidadCobro()}
                                  </Label>
                                  <Input
                                    type="number"
                                    min={1}
                                    className="h-8 w-24"
                                    value={qty}
                                    onChange={(e) =>
                                      setCantidad(
                                        item.id,
                                        tarifa.id,
                                        Number(e.target.value) || 1
                                      )
                                    }
                                  />
                                </div>
                              )}
                            </div>
                          </label>
                        </div>
                      )
                    })}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Resumen 40% */}
        <div className="space-y-4 lg:col-span-2 lg:sticky lg:top-6 lg:self-start">
          <Card className="border-border bg-card ring-1 ring-foreground/10">
            <CardContent className="space-y-4 p-4">
              <h2 className="text-sm font-extrabold uppercase tracking-wider">
                Datos del evento
              </h2>
              <div className="space-y-2">
                <Label>Nombre cotización</Label>
                <Input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Festival Manizales"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tipo evento</Label>
                  <Select
                    value={tipoEvento || undefined}
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
                <div className="space-y-2">
                  <Label>Fecha</Label>
                  <Input
                    type="date"
                    value={fechaEvento}
                    onChange={(e) => setFechaEvento(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Cliente *</Label>
                  <Input
                    value={cliente.nombre}
                    onChange={(e) =>
                      setCliente((c) => ({ ...c, nombre: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Empresa</Label>
                  <Input
                    value={cliente.empresa ?? ""}
                    onChange={(e) =>
                      setCliente((c) => ({ ...c, empresa: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={cliente.email}
                    onChange={(e) =>
                      setCliente((c) => ({ ...c, email: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Teléfono</Label>
                  <Input
                    value={cliente.telefono}
                    onChange={(e) =>
                      setCliente((c) => ({ ...c, telefono: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Ciudad</Label>
                  <Input
                    value={cliente.ciudad}
                    onChange={(e) =>
                      setCliente((c) => ({ ...c, ciudad: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Asistentes</Label>
                  <Input
                    type="number"
                    value={asistentes ?? ""}
                    onChange={(e) =>
                      setAsistentes(
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card ring-1 ring-foreground/10">
            <CardContent className="space-y-3 p-4">
              <h2 className="text-sm font-extrabold uppercase tracking-wider">
                Resumen
              </h2>
              <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/20 px-3 py-2">
                <Label htmlFor="duracion-dias" className="text-xs shrink-0">
                  Cantidad de días
                </Label>
                <Input
                  id="duracion-dias"
                  type="number"
                  min={1}
                  className="h-8 w-24"
                  value={duracionDias}
                  onChange={(e) =>
                    setDuracionDias(Math.max(1, Number(e.target.value) || 1))
                  }
                />
              </div>
              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Selecciona tarifas del catálogo
                </p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {items.map((it) => {
                    const cat = catalogo.find((c) => c.id === it.catalogItemId)
                    const tar = cat?.tarifas.find((t) => t.id === it.tarifaId)
                    if (!cat || !tar) return null
                    const sub = subtotalLinea(
                      tar.precioCliente,
                      it.cantidad,
                      tar.unidadCobro,
                      duracionDias
                    )
                    return (
                      <li
                        key={`${it.catalogItemId}-${it.tarifaId}`}
                        className="flex justify-between gap-2"
                      >
                        <span className="text-muted-foreground">
                          {cat.nombre} · {tar.nombre}
                          <span className="mt-0.5 block text-[11px]">
                            {it.cantidad} und.
                            {tar.unidadCobro === "dia"
                              ? ` × ${duracionDias} día${duracionDias === 1 ? "" : "s"}`
                              : ""}
                          </span>
                        </span>
                        <span className="shrink-0 font-medium text-foreground">
                          {formatCOP(sub)}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              )}

              <div className="space-y-3 border-t border-border pt-3">
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
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Checkbox
                    checked={mostrarCostos}
                    onCheckedChange={(v) => setMostrarCostos(!!v)}
                  />
                  Mostrar costos operativos
                </label>
                {mostrarCostos && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Costo op.</span>
                    <span>{formatCOP(totales.costoTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Precio cliente</span>
                  <span className="font-bold text-foreground">
                    {formatCOP(totales.precioCliente)}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Margen</span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-bold",
                        mStatus === "ok" &&
                          "bg-boga-success-500/15 text-boga-success-500",
                        mStatus === "warning" &&
                          "bg-boga-warning-500/15 text-boga-warning-500",
                        mStatus === "blocked" &&
                          "bg-boga-error-500/15 text-boga-error-500"
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
                    onChange={(e) =>
                      handleMargenSlider(Number(e.target.value))
                    }
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
                      ? `Margen bajo ${MARGEN_BLOQUEO}%: envío/PDF bloqueados`
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
                  placeholder="Solo admin — no va en el PDF"
                />
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <Button
                  disabled={saving}
                  onClick={() => handleSave("borrador")}
                  className="bg-boga-lima-500 font-semibold text-boga-text-on-lima hover:bg-boga-lima-600"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Guardar borrador
                </Button>
                <Button
                  variant="outline"
                  disabled={saving || mStatus === "blocked"}
                  onClick={() => handleSave("enviada")}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Marcar enviada
                </Button>
                <Button
                  variant="secondary"
                  disabled={mStatus === "blocked"}
                  onClick={handlePdf}
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  Exportar PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

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
