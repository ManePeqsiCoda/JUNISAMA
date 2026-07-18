"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers, ArrowRight } from "lucide-react"
import { BogaCircles } from "@/components/brand/boga-circles"
import { formatCOP } from "@/lib/cotizador/calc"
import { getPlantillas } from "@/lib/cotizador/storage"
import type { PaqueteEvento } from "@/types/cotizador-boga"

export default function PaquetesPage() {
  const [plantillas, setPlantillas] = useState<PaqueteEvento[]>([])

  useEffect(() => {
    setPlantillas(getPlantillas())
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-foreground">
            Paquetes de evento
          </h1>
          <p className="text-sm text-muted-foreground">
            Plantillas reutilizables para armar cotizaciones en segundos
          </p>
        </div>
        <BogaCircles size="s" tone="electric" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {plantillas.map((p) => (
          <Card
            key={p.id}
            className="border-border bg-card ring-1 ring-foreground/10"
          >
            <CardHeader className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Layers className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">{p.nombre}</CardTitle>
              <p className="text-xs capitalize text-muted-foreground">
                {p.tipoEvento ?? "general"} · {p.items.length} tarifas
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Precio ref.</span>
                <span className="font-semibold text-boga-lima-500">
                  {formatCOP(p.precioCliente)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Margen</span>
                <span className="font-semibold text-boga-success-500">
                  {p.margenPorcentaje}%
                </span>
              </div>
              <Button
                className="w-full bg-boga-lima-500 font-semibold text-boga-text-on-lima hover:bg-boga-lima-600"
                nativeButton={false}
                render={
                  <Link href={`/admin/cotizaciones/nueva?plantillaId=${p.id}`}>
                    Usar plantilla
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                }
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
