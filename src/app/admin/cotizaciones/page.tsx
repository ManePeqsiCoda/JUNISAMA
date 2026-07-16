"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
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
import { StatusBadge } from "@/components/admin/status-badge"
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Clock,
  CheckCircle,
  DollarSign,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { cotizaciones as cotizacionesMock } from "@/lib/mocks"
import type { Cotizacion, Cliente, EstadoCotizacion } from "@/lib/mocks"

type CotizacionWithCliente = Cotizacion & {
  cliente: Cliente
}

const estados: { value: EstadoCotizacion | "TODOS"; label: string }[] = [
  { value: "TODOS", label: "Todos" },
  { value: "BORRADOR", label: "Borrador" },
  { value: "ENVIADA", label: "Enviada" },
  { value: "APROBADA", label: "Aprobada" },
  { value: "RECHAZADA", label: "Rechazada" },
]

function formatCurrency(value: number | null | undefined) {
  if (value == null) return "—"
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Number(value))
}

function formatDate(date: string | Date | null | undefined) {
  if (!date) return "—"
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date))
}

interface Stats {
  totalCotizaciones: number
  pendientes: number
  aprobadasMes: number
  ingresosEstimados: number
}

export default function CotizacionesAdminPage() {
  const [cotizaciones, setCotizaciones] = useState<CotizacionWithCliente[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [estadoFiltro, setEstadoFiltro] = useState<EstadoCotizacion | "TODOS">(
    "TODOS"
  )
  const [page, setPage] = useState(1)
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean
    cotizacion: CotizacionWithCliente | null
  }>({ open: false, cotizacion: null })

  const limit = 10

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    const timer = setTimeout(() => {
      setCotizaciones(cotizacionesMock as CotizacionWithCliente[])
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const filteredCotizaciones = useMemo(() => {
    const term = debouncedSearch.toLowerCase()
    return cotizaciones.filter((c) => {
      const matchesSearch =
        c.codigo.toLowerCase().includes(term) ||
        c.cliente.nombreEmpresa.toLowerCase().includes(term) ||
        c.nombre.toLowerCase().includes(term)
      const matchesEstado = estadoFiltro === "TODOS" || c.estado === estadoFiltro
      return matchesSearch && matchesEstado
    })
  }, [cotizaciones, debouncedSearch, estadoFiltro])

  const totalPages = Math.max(1, Math.ceil(filteredCotizaciones.length / limit))
  const paginatedCotizaciones = useMemo(() => {
    const start = (page - 1) * limit
    return filteredCotizaciones.slice(start, start + limit)
  }, [filteredCotizaciones, page])

  const stats = useMemo<Stats>(() => {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const aprobadasMes = cotizaciones.filter((c) => {
      if (c.estado !== "APROBADA") return false
      const date = new Date(c.createdAt)
      return date >= startOfMonth
    }).length
    const ingresosEstimados = cotizaciones
      .filter((c) => {
        if (c.estado !== "APROBADA") return false
        const date = new Date(c.createdAt)
        return date >= startOfMonth
      })
      .reduce((sum, c) => sum + (c.precioVenta ?? 0), 0)
    return {
      totalCotizaciones: cotizaciones.length,
      pendientes: cotizaciones.filter((c) =>
        ["BORRADOR", "ENVIADA"].includes(c.estado)
      ).length,
      aprobadasMes,
      ingresosEstimados,
    }
  }, [cotizaciones])

  const handleDelete = () => {
    if (!deleteDialog.cotizacion) return
    setCotizaciones((prev) =>
      prev.map((c) =>
        c.id === deleteDialog.cotizacion!.id ? { ...c, estado: "EXPIRADA" as const } : c
      )
    )
    toast.success("Cotización marcada como expirada")
    setDeleteDialog({ open: false, cotizacion: null })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-sm font-extrabold uppercase tracking-widest text-foreground">
            Cotizaciones
          </h1>
          <p className="text-sm text-muted-foreground">
            Gestión y seguimiento de cotizaciones
          </p>
        </div>
        <Button
          className="bg-primary font-semibold text-primary-foreground hover:bg-primary-hover"
          render={(
            <Link href="/admin/cotizaciones/nueva">
              <Plus className="mr-2 h-4 w-4" />
              Nueva cotización
            </Link>
          )}
        />
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Total cotizaciones"
          value={stats.totalCotizaciones}
          icon={FileText}
          trend="neutral"
          trendValue="Todas las cotizaciones"
          color="primary"
        />
        <KpiCard
          title="Pendientes"
          value={stats.pendientes}
          icon={Clock}
          trend={stats.pendientes > 0 ? "down" : "neutral"}
          trendValue={stats.pendientes > 0 ? "Por gestionar" : "Al día"}
          color="orange"
        />
        <KpiCard
          title="Aprobadas este mes"
          value={stats.aprobadasMes}
          icon={CheckCircle}
          trend="neutral"
          trendValue="Este mes"
          color="green"
        />
        <KpiCard
          title="Ingresos estimados"
          value={formatCurrency(stats.ingresosEstimados)}
          icon={DollarSign}
          trend="neutral"
          trendValue="Aprobadas del mes"
          color="blue"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por código, cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-input bg-background pl-9 text-foreground"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {estados.map((e) => (
            <button
              key={e.value}
              onClick={() => setEstadoFiltro(e.value)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                estadoFiltro === e.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/20 text-muted-foreground hover:bg-muted/30"
              )}
            >
              {e.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card className="bg-card ring-1 ring-foreground/10">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Código</TableHead>
                <TableHead className="text-muted-foreground">Cliente</TableHead>
                <TableHead className="text-muted-foreground">Evento</TableHead>
                <TableHead className="text-muted-foreground">Productos</TableHead>
                <TableHead className="text-muted-foreground">Total</TableHead>
                <TableHead className="text-muted-foreground">Estado</TableHead>
                <TableHead className="text-muted-foreground">Fecha</TableHead>
                <TableHead className="text-right text-muted-foreground">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow className="border-border hover:bg-transparent">
                  <TableCell colSpan={8} className="py-12 text-center">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
                  </TableCell>
                </TableRow>
              ) : paginatedCotizaciones.length === 0 ? (
                <TableRow className="border-border hover:bg-transparent">
                  <TableCell colSpan={8} className="py-12 text-center text-muted-foreground">
                    No se encontraron cotizaciones.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedCotizaciones.map((cotizacion) => (
                  <TableRow key={cotizacion.id} className="border-border">
                    <TableCell className="font-mono text-xs text-foreground">
                      {cotizacion.codigo}
                    </TableCell>
                    <TableCell className="text-foreground">
                      {cotizacion.cliente.nombreEmpresa}
                    </TableCell>
                    <TableCell>
                      <div className="text-foreground">{cotizacion.nombre}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(cotizacion.fechaEvento)}
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">
                      {cotizacion.items?.length ?? "—"}
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {formatCurrency(Number(cotizacion.precioVenta))}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={cotizacion.estado} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(cotizacion.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Ver cotización"
                          className="text-muted-foreground hover:text-foreground"
                          render={(
                            <Link href={`/admin/cotizaciones/${cotizacion.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          )}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Editar cotización"
                          className="text-muted-foreground hover:text-foreground"
                          render={(
                            <Link
                              href={`/admin/cotizaciones/nueva?id=${cotizacion.id}`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                          )}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Eliminar cotización"
                          onClick={() =>
                            setDeleteDialog({ open: true, cotizacion })
                          }
                          className="text-muted-foreground hover:text-error"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {!loading && paginatedCotizaciones.length > 0 && (
            <div className="flex items-center justify-between border-t border-border px-4 py-3">
              <p className="text-sm text-muted-foreground">
                Página {page} de {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  aria-label="Página anterior"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label="Página siguiente"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete dialog */}
      <Dialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          setDeleteDialog((prev) => ({ ...prev, open }))
        }
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">
              ¿Eliminar cotización?
            </DialogTitle>
            <DialogDescription>
              Esta acción marcará la cotización{" "}
              <strong>{deleteDialog.cotizacion?.codigo}</strong> como expirada.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col-reverse gap-2 sm:flex-row">
            <Button
              variant="outline"
              onClick={() =>
                setDeleteDialog({ open: false, cotizacion: null })
              }
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="w-full sm:w-auto"
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
