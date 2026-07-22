"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { KpiCard } from "@/components/admin/kpi-card"
import { Button } from "@/components/ui/button"
import { FileText, Percent, Inbox } from "lucide-react"
import { formatCOP } from "@/lib/cotizador/calc"
import {
  getCotizaciones,
  getSolicitudes,
} from "@/lib/cotizador/storage"

export function CotizadorKpis() {
  const [pipeline, setPipeline] = useState(0)
  const [margen, setMargen] = useState(0)
  const [solicitudes, setSolicitudes] = useState(0)

  useEffect(() => {
    const cots = getCotizaciones()
    setPipeline(
      cots
        .filter((c) => c.estado === "borrador" || c.estado === "enviada")
        .reduce((s, c) => s + c.precioCliente, 0)
    )
    setMargen(
      cots.length
        ? Math.round(
            cots.reduce((s, c) => s + c.margenPorcentaje, 0) / cots.length
          )
        : 0
    )
    setSolicitudes(getSolicitudes().filter((s) => s.estado === "nueva").length)
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-muted-foreground">
          Cotizador BOGA
        </h2>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            nativeButton={false}
            render={<Link href="/admin/cotizaciones/nueva">Nueva cotización</Link>}
          />
          <Button
            size="sm"
            variant="outline"
            nativeButton={false}
            render={<Link href="/admin/solicitudes">Ver solicitudes</Link>}
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <KpiCard title="Pipeline" value={formatCOP(pipeline)} icon={FileText} />
        <KpiCard title="Margen promedio" value={`${margen}%`} icon={Percent} />
        <KpiCard
          title="Solicitudes nuevas"
          value={String(solicitudes)}
          icon={Inbox}
          color={solicitudes > 0 ? "orange" : "gray"}
        />
      </div>
    </div>
  )
}
