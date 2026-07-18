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
import { ArrowLeft, FileDown, Pencil } from "lucide-react"
import { formatCOP } from "@/lib/cotizador/calc"
import { exportPaquetePdf } from "@/lib/cotizador/pdf"
import {
  getCatalogo,
  getPaqueteById,
  upsertPaquete,
} from "@/lib/cotizador/storage"
import type { CatalogItem, PaqueteEvento } from "@/types/cotizador-boga"
import { cn } from "@/lib/utils"

export default function CotizacionDetailPage() {
  const params = useParams()
  const id = typeof params.id === "string" ? params.id : ""
  const [paquete, setPaquete] = useState<PaqueteEvento | null>(null)
  const [catalogo, setCatalogo] = useState<CatalogItem[]>([])

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
            <Button onClick={() => cambiarEstado("enviada")}>Enviar</Button>
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
            </>
          )}
          <Button variant="outline" onClick={handlePdf}>
            <FileDown className="mr-2 h-4 w-4" />
            PDF
          </Button>
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
        </div>
      </div>

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
