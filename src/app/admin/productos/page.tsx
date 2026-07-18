"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { CatalogoTarifaEditor } from "@/components/admin/catalogo-tarifa-editor"
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
import { Search, Plus, Pencil, Package } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatCOP } from "@/lib/cotizador/calc"
import { getCatalogo } from "@/lib/cotizador/storage"
import type { CatalogItem } from "@/types/cotizador-boga"
import { CATEGORIA_LABELS } from "@/types/cotizador-boga"

export default function ProductosAdminPage() {
  const [catalogo, setCatalogo] = useState<CatalogItem[]>([])
  const [search, setSearch] = useState("")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selected, setSelected] = useState<CatalogItem | null>(null)

  const reload = () => setCatalogo(getCatalogo().sort((a, b) => a.orden - b.orden))

  useEffect(() => {
    reload()
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return catalogo
    return catalogo.filter(
      (c) =>
        c.nombre.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q) ||
        CATEGORIA_LABELS[c.categoria].toLowerCase().includes(q)
    )
  }, [catalogo, search])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-foreground">Productos</h1>
          <p className="text-sm text-muted-foreground">
            Catálogo cotizador con tarifas y costos operativos
          </p>
        </div>
        <Button
          onClick={() => {
            setSelected(null)
            setDrawerOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo ítem
        </Button>
      </div>

      <div className="rounded-lg border border-dashed border-boga-lima-500/40 bg-boga-lima-500/5 px-3 py-2 text-xs text-muted-foreground">
        MOCK — validar precios y márgenes con BOGA. Los slugs SEO del sitio
        público no se alteran desde aquí.
      </div>

      <Card className="bg-card ring-1 ring-foreground/10">
        <CardContent className="space-y-4 p-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Buscar…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead># Tarifas</TableHead>
                <TableHead>Margen prom.</TableHead>
                <TableHead>Desde</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => {
                const activas = item.tarifas.filter((t) => t.activa)
                const margen =
                  activas.length > 0
                    ? Math.round(
                        activas.reduce((s, t) => s + t.margenPorcentaje, 0) /
                          activas.length
                      )
                    : 0
                const desde = activas.length
                  ? Math.min(...activas.map((t) => t.precioCliente))
                  : null
                return (
                  <TableRow key={item.id} className="border-border">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-muted">
                          {item.imagen ? (
                            <Image
                              src={item.imagen}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          ) : (
                            <Package className="m-2 h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {item.nombre}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.slug}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {CATEGORIA_LABELS[item.categoria]}
                    </TableCell>
                    <TableCell>{activas.length}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "font-semibold",
                          margen < 25
                            ? "text-boga-warning-500"
                            : "text-boga-success-500"
                        )}
                      >
                        {margen}%
                      </span>
                    </TableCell>
                    <TableCell className="text-foreground">
                      {desde != null ? formatCOP(desde) : "—"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-medium",
                          item.activo
                            ? "bg-boga-success-500/15 text-boga-success-500"
                            : "bg-boga-error-500/15 text-boga-error-500"
                        )}
                      >
                        {item.activo ? "Activo" : "Inactivo"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label="Editar"
                        onClick={() => {
                          setSelected(item)
                          setDrawerOpen(true)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-10 text-center text-muted-foreground"
                  >
                    Sin resultados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CatalogoTarifaEditor
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        item={selected}
        onSuccess={() => {
          reload()
          toast.success("Producto guardado")
        }}
      />
    </div>
  )
}
