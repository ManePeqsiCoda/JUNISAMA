"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { KpiCard } from "@/components/admin/kpi-card"
import {
  Search,
  Plus,
  Eye,
  Pencil,
  FileText,
  Percent,
  Inbox,
  Copy,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { formatCOP, nextNumeroCotizacion } from "@/lib/cotizador/calc"
import {
  getCotizaciones,
  getSolicitudes,
  getPaquetes,
  upsertPaquete,
  savePaquetes,
  generateId,
} from "@/lib/cotizador/storage"
import type {
  EstadoCotizacionPaquete,
  PaqueteEvento,
} from "@/types/cotizador-boga"

const estados: { value: EstadoCotizacionPaquete | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "borrador", label: "Borrador" },
  { value: "enviada", label: "Enviada" },
  { value: "aceptada", label: "Aceptada" },
  { value: "rechazada", label: "Rechazada" },
  { value: "vencida", label: "Vencida" },
]

const estadoClass: Record<EstadoCotizacionPaquete, string> = {
  borrador: "bg-muted text-muted-foreground",
  enviada: "bg-boga-info-500/15 text-boga-info-500",
  en_revision: "bg-boga-warning-500/15 text-boga-warning-500",
  aceptada: "bg-boga-success-500/15 text-boga-success-500",
  rechazada: "bg-boga-error-500/15 text-boga-error-500",
  vencida: "bg-muted text-muted-foreground",
}

function contarSufijo(nombre: string, existentes: PaqueteEvento[]): number {
  const base = nombre.replace(/ v\d+$/, "")
  let maxVer = 0
  for (const p of existentes) {
    if (p.id.startsWith("cot-")) continue // solo contar paquetes/plantillas
    const pBase = p.nombre.replace(/ v\d+$/, "")
    if (pBase === base) {
      const match = p.nombre.match(/ v(\d+)$/)
      const ver = match ? parseInt(match[1], 10) : 1
      maxVer = Math.max(maxVer, ver)
    }
  }
  return maxVer + 1
}

export default function CotizacionesPage() {
  const router = useRouter()
  const [rows, setRows] = useState<PaqueteEvento[]>([])
  const [search, setSearch] = useState("")
  const [estado, setEstado] = useState<EstadoCotizacionPaquete | "todos">(
    "todos"
  )
  const [solicitudesNuevas, setSolicitudesNuevas] = useState(0)

  // Modal de duplicado
  const [duplicateTarget, setDuplicateTarget] = useState<PaqueteEvento | null>(
    null
  )

  useEffect(() => {
    setRows(getCotizaciones())
    setSolicitudesNuevas(
      getSolicitudes().filter((s) => s.estado === "nueva").length
    )
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return rows.filter((r) => {
      if (estado !== "todos" && r.estado !== estado) return false
      if (!q) return true
      return (
        r.nombre.toLowerCase().includes(q) ||
        r.numero.toLowerCase().includes(q) ||
        (r.cliente?.nombre ?? "").toLowerCase().includes(q) ||
        (r.cliente?.empresa ?? "").toLowerCase().includes(q)
      )
    })
  }, [rows, search, estado])

  const margenPromedio =
    rows.length > 0
      ? Math.round(
          rows.reduce((s, r) => s + r.margenPorcentaje, 0) / rows.length
        )
      : 0
  const pipeline = rows
    .filter((r) => r.estado === "enviada" || r.estado === "borrador")
    .reduce((s, r) => s + r.precioCliente, 0)

  const handleRowClick = useCallback(
    (paquete: PaqueteEvento) => {
      router.push(`/admin/cotizaciones/${paquete.id}`)
    },
    [router]
  )

  const handleEdit = useCallback(
    (e: React.MouseEvent, paquete: PaqueteEvento) => {
      e.stopPropagation()
      if (paquete.estado === "enviada" || paquete.estado === "aceptada") {
        setDuplicateTarget(paquete)
      } else {
        router.push(`/admin/cotizaciones/nueva?id=${paquete.id}`)
      }
    },
    [router]
  )

  const handleDuplicate = useCallback(() => {
    if (!duplicateTarget) return
    const allPaquetes = getPaquetes()
    const nuevaVersion = contarSufijo(duplicateTarget.nombre, allPaquetes)
    const nuevoNombre = `${duplicateTarget.nombre.replace(/ v\d+$/, "")} v${nuevaVersion}`
    const duplicado: PaqueteEvento = {
      ...duplicateTarget,
      id: generateId("cot"),
      numero: nextNumeroCotizacion(allPaquetes),
      nombre: nuevoNombre,
      estado: "borrador",
      origen: "admin",
      creadoEn: new Date().toISOString(),
      actualizadoEn: new Date().toISOString(),
    }
    const all = getPaquetes()
    all.unshift(duplicado)
    savePaquetes(all)
    setRows(getCotizaciones())
    setDuplicateTarget(null)
  }, [duplicateTarget])

  return (
    <div className="space-y-6">
      {/* Modal de duplicado */}
      <Dialog
        open={!!duplicateTarget}
        onOpenChange={(open) => {
          if (!open) setDuplicateTarget(null)
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-boga-warning-500/15 text-boga-warning-500">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <DialogTitle className="text-center text-foreground">
              Cotización no editable
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              ¡Ey! Esta cotización ya fue{" "}
              {duplicateTarget?.estado === "aceptada"
                ? "aceptada"
                : "enviada"}
              , por lo tanto no puede ser editada.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm">
            <p className="font-medium text-foreground">
              {duplicateTarget?.nombre}
            </p>
            <p className="text-muted-foreground">
              {duplicateTarget?.numero}
            </p>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            ¿Quieres crear una copia? La copia, que sí puede editarse,
            conservará el mismo nombre con la versión correspondiente.
          </p>
          <DialogFooter className="sm:justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setDuplicateTarget(null)}
            >
              Cancelar
            </Button>
            <Button onClick={handleDuplicate}>
              <Copy className="mr-2 h-4 w-4" />
              Crear copia
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-foreground">
            Cotizaciones
          </h1>
          <p className="text-sm text-muted-foreground">
            Paquetes de evento por cliente
          </p>
        </div>
        <Button
          nativeButton={false}
          render={
            <Link href="/admin/cotizaciones/nueva">
              <Plus className="mr-2 h-4 w-4" />
              Nueva cotización
            </Link>
          }
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard
          title="Pipeline"
          value={formatCOP(pipeline)}
          icon={FileText}
        />
        <KpiCard
          title="Margen promedio"
          value={`${margenPromedio}%`}
          icon={Percent}
        />
        <KpiCard
          title="Solicitudes nuevas"
          value={String(solicitudesNuevas)}
          icon={Inbox}
        />
      </div>

      <Card className="bg-card ring-1 ring-foreground/10">
        <CardContent className="space-y-4 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Buscar…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {estados.map((e) => (
                <button
                  key={e.value}
                  type="button"
                  onClick={() => setEstado(e.value)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    estado === e.value
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead>Número</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Margen</TableHead>
                <TableHead className="w-24" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow
                  key={r.id}
                  className="border-border cursor-pointer transition-colors hover:bg-muted/30"
                  onClick={() => handleRowClick(r)}
                >
                  <TableCell className="font-medium text-primary">
                    {r.numero}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {r.nombre}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {r.cliente?.empresa || r.cliente?.nombre || "—"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                        estadoClass[r.estado]
                      )}
                    >
                      {r.estado.replace("_", " ")}
                    </span>
                  </TableCell>
                  <TableCell>{formatCOP(r.precioCliente)}</TableCell>
                  <TableCell
                    className={cn(
                      "font-semibold",
                      r.margenPorcentaje < 25
                        ? "text-boga-warning-500"
                        : "text-boga-success-500"
                    )}
                  >
                    {r.margenPorcentaje}%
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                      <Button
                        size="icon"
                        variant="ghost"
                        nativeButton={false}
                        render={
                          <Link href={`/admin/cotizaciones/${r.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        }
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => handleEdit(e, r)}
                      >
                        <Pencil className={cn(
                          "h-4 w-4",
                          r.estado === "enviada" || r.estado === "aceptada"
                            ? "text-muted-foreground/50"
                            : ""
                        )} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-10 text-center text-muted-foreground"
                  >
                    Sin cotizaciones
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
