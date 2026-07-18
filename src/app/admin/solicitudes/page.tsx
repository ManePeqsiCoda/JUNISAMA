"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getSolicitudes, updateSolicitud } from "@/lib/cotizador/storage"
import type { SolicitudPublica } from "@/types/cotizador-boga"
import { cn } from "@/lib/utils"

export default function SolicitudesPage() {
  const router = useRouter()
  const [rows, setRows] = useState<SolicitudPublica[]>([])

  const reload = () => setRows(getSolicitudes())

  useEffect(() => {
    reload()
  }, [])

  const convertir = (s: SolicitudPublica) => {
    const prefill = {
      nombre: `${s.eventType} — ${s.city}`,
      tipoEvento: s.eventType,
      fechaEvento: s.eventDate,
      productSlugs: s.productSlugs,
      notas: s.notes,
      cliente: {
        nombre: s.fullName,
        empresa: s.company,
        email: s.email,
        telefono: s.phone,
        ciudad: s.city,
      },
    }
    sessionStorage.setItem(
      `boga-solicitud-prefill-${s.id}`,
      JSON.stringify(prefill)
    )
    updateSolicitud(s.id, { estado: "convertida" })
    toast.success("Solicitud convertida a borrador")
    router.push(`/admin/cotizaciones/nueva?solicitudId=${s.id}`)
  }

  const descartar = (id: string) => {
    updateSolicitud(id, { estado: "descartada" })
    reload()
    toast.message("Solicitud descartada")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-foreground">
          Solicitudes públicas
        </h1>
        <p className="text-sm text-muted-foreground">
          Bandeja del formulario /cotizacion
        </p>
      </div>

      <Card className="bg-card ring-1 ring-foreground/10">
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead>Contacto</TableHead>
                <TableHead>Evento</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-48" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((s) => (
                <TableRow key={s.id} className="border-border">
                  <TableCell>
                    <p className="font-medium">{s.fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.email} · {s.phone}
                    </p>
                    {s.company && (
                      <p className="text-xs text-muted-foreground">
                        {s.company}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <p className="capitalize">{s.eventType}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.eventDate} · {s.city}
                      {s.attendees ? ` · ${s.attendees} pers.` : ""}
                    </p>
                  </TableCell>
                  <TableCell className="max-w-[200px] text-xs text-muted-foreground">
                    {s.productSlugs.join(", ")}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                        s.estado === "nueva" &&
                          "bg-boga-lima-500/20 text-boga-lima-600",
                        s.estado === "convertida" &&
                          "bg-boga-success-500/15 text-boga-success-500",
                        s.estado === "descartada" &&
                          "bg-muted text-muted-foreground"
                      )}
                    >
                      {s.estado}
                    </span>
                  </TableCell>
                  <TableCell>
                    {s.estado === "nueva" && (
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" onClick={() => convertir(s)}>
                          Convertir
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => descartar(s.id)}
                        >
                          Descartar
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-10 text-center text-muted-foreground"
                  >
                    Sin solicitudes
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
