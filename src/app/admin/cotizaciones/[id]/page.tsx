"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft, FileDown, Pencil, Copy, AlertTriangle } from "lucide-react"
import { formatCOP, nextNumeroCotizacion } from "@/lib/cotizador/calc"
import { exportPaquetePdf } from "@/lib/cotizador/pdf"
import {
  getCatalogo,
  getPaqueteById,
  getPaquetes,
  upsertPaquete,
  savePaquetes,
  generateId,
} from "@/lib/cotizador/storage"
import type { CatalogItem, PaqueteEvento } from "@/types/cotizador-boga"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function contarSufijo(nombre: string, existentes: PaqueteEvento[]): number {
  const base = nombre.replace(/ v\d+$/, "")
  let maxVer = 0
  for (const p of existentes) {
    if (p.id.startsWith("cot-")) continue
    const pBase = p.nombre.replace(/ v\d+$/, "")
    if (pBase === base) {
      const match = p.nombre.match(/ v(\d+)$/)
      const ver = match ? parseInt(match[1], 10) : 1
      maxVer = Math.max(maxVer, ver)
    }
  }
  return maxVer + 1
}

export default function CotizacionDetailPage() {
  const params = useParams()
  const id = typeof params.id === "string" ? params.id : ""
  const [paquete, setPaquete] = useState<PaqueteEvento | null>(null)
  const [catalogo, setCatalogo] = useState<CatalogItem[]>([])
  const [duplicateTarget, setDuplicateTarget] = useState<PaqueteEvento | null>(null)

  useEffect(() => {
    setCatalogo(getCatalogo())
    setPaquete(getPaqueteById(id) ?? null)
  }, [id])

  if (!paquete) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Cotización no encontrada.</p>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/admin/cotizaciones">Volver</Link>}
        />
      </div>
    )
  }

  const handlePdf = async () => {
    try {
      await exportPaquetePdf(paquete, catalogo)
      toast.success("PDF generado")
    } catch {
      toast.error("No se pudo generar el PDF")
    }
  }

  const cambiarEstado = (estado: PaqueteEvento["estado"]) => {
    if (paquete.estado === "aceptada") {
      toast.error("Cotización aceptada es inmutable — duplícala para editar")
      return
    }
    const next = upsertPaquete({ ...paquete, estado })
    setPaquete(next)
    toast.success(`Estado: ${estado}`)
  }

  const handleDuplicate = () => {
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
    setDuplicateTarget(null)
    setPaquete(duplicado)
    toast.success("Copia editable creada")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Volver"
            nativeButton={false}
            render={
              <Link href="/admin/cotizaciones">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            }
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {paquete.numero}
            </p>
            <h1 className="text-xl font-extrabold text-foreground">
              {paquete.nombre}
            </h1>
            <p className="text-sm capitalize text-muted-foreground">
              {paquete.estado.replace("_", " ")}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {paquete.estado === "borrador" && (
            <>
              <Button onClick={() => cambiarEstado("enviada")}>Enviar</Button>
              <Button
                variant="outline"
                nativeButton={false}
                render={
                  <Link href={`/admin/cotizaciones/nueva?id=${paquete.id}`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar
                  </Link>
                }
              />
            </>
          )}
          {paquete.estado === "enviada" && (
            <>
              <Button onClick={() => cambiarEstado("aceptada")}>Aceptar</Button>
              <Button
                variant="destructive"
                onClick={() => cambiarEstado("rechazada")}
              >
                Rechazar
              </Button>
              <Button
                variant="outline"
                onClick={() => setDuplicateTarget(paquete)}
              >
                <Copy className="mr-2 h-4 w-4" />
                Crear copia editable
              </Button>
            </>
          )}
          {paquete.estado === "aceptada" && (
            <Button
              variant="outline"
              onClick={() => setDuplicateTarget(paquete)}
            >
              <Copy className="mr-2 h-4 w-4" />
              Crear copia editable
            </Button>
          )}
          <Button variant="outline" onClick={handlePdf}>
            <FileDown className="mr-2 h-4 w-4" />
            PDF
          </Button>
        </div>
      </div>

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
              Crear copia editable
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Vamos a crear una copia editable de esto.
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

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card ring-1 ring-foreground/10">
          <CardHeader>
            <CardTitle className="text-sm font-extrabold uppercase tracking-wider">
              Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Row label="Nombre" value={paquete.cliente?.nombre} />
            <Row label="Empresa" value={paquete.cliente?.empresa} />
            <Row label="Email" value={paquete.cliente?.email} />
            <Row label="Teléfono" value={paquete.cliente?.telefono} />
            <Row label="Ciudad" value={paquete.cliente?.ciudad} />
          </CardContent>
        </Card>
        <Card className="bg-card ring-1 ring-foreground/10">
          <CardHeader>
            <CardTitle className="text-sm font-extrabold uppercase tracking-wider">
              Totales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Row label="Costo op." value={formatCOP(paquete.costoTotal)} />
            {paquete.transporte && paquete.transporte.sede && (
              <>
                <Row
                  label="Sede despacho"
                  value={paquete.transporte.sede}
                />
                <Row
                  label="Camiones"
                  value={`${paquete.transporte.numCamiones} camión(es)`}
                />
                <Row
                  label="Costo transporte"
                  value={formatCOP(paquete.transporte.costoTotal)}
                />
              </>
            )}
            <Row
              label="Precio"
              value={formatCOP(paquete.precioCliente)}
              highlight
            />
            <Row label="Margen" value={`${paquete.margenPorcentaje}%`} />
            <Row label="Ganancia" value={formatCOP(paquete.ganancia)} />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card ring-1 ring-foreground/10">
        <CardHeader>
          <CardTitle className="text-sm font-extrabold uppercase tracking-wider">
            Ítems
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead>Producto</TableHead>
                <TableHead>Tarifa</TableHead>
                <TableHead>Cant.</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paquete.items.map((it) => {
                const item = catalogo.find((c) => c.id === it.catalogItemId)
                const tarifa = item?.tarifas.find((t) => t.id === it.tarifaId)
                const sub = (tarifa?.precioCliente ?? 0) * it.cantidad
                return (
                  <TableRow
                    key={`${it.catalogItemId}-${it.tarifaId}`}
                    className="border-border"
                  >
                    <TableCell>{item?.nombre ?? "—"}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {tarifa?.nombre ?? "—"}
                    </TableCell>
                    <TableCell>{it.cantidad}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCOP(sub)}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {paquete.notasInternas && (
        <Card className="bg-card ring-1 ring-foreground/10">
          <CardHeader>
            <CardTitle className="text-sm font-extrabold uppercase tracking-wider">
              Notas internas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm">
              {paquete.notasInternas}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string
  value?: string | null
  highlight?: boolean
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={cn(
          "text-right font-medium",
          highlight && "text-boga-lima-500"
        )}
      >
        {value || "—"}
      </span>
    </div>
  )
}
