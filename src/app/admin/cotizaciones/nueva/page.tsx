"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { PaqueteBuilder } from "@/components/admin/paquete-builder"
import { Loader2 } from "lucide-react"

type Prefill = {
  cliente?: {
    nombre?: string
    empresa?: string
    email?: string
    telefono?: string
    ciudad?: string
  }
  nombre?: string
  tipoEvento?: string
  fechaEvento?: string
  productSlugs?: string[]
  notas?: string
}

function NuevaCotizacionInner() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id") ?? undefined
  const solicitudId = searchParams.get("solicitudId") ?? undefined
  const [prefill, setPrefill] = useState<Prefill | undefined>()
  const [ready, setReady] = useState(!solicitudId)

  useEffect(() => {
    if (!solicitudId) {
      setReady(true)
      return
    }
    try {
      const raw = sessionStorage.getItem(`boga-solicitud-prefill-${solicitudId}`)
      if (raw) setPrefill(JSON.parse(raw) as Prefill)
    } catch {
      // ignore
    }
    setReady(true)
  }, [solicitudId])

  if (!ready) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-extrabold text-foreground">
          {id ? "Editar cotización" : "Nueva cotización / paquete"}
        </h1>
        <p className="text-sm text-muted-foreground">
          Selecciona tarifas, ajusta cantidades y controla el margen
        </p>
      </div>
      <PaqueteBuilder
        key={`${id ?? ""}-${solicitudId ?? ""}`}
        paqueteId={id}
        solicitudId={solicitudId}
        solicitudPrefill={prefill}
      />
    </div>
  )
}

export default function NuevaCotizacionPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <NuevaCotizacionInner />
    </Suspense>
  )
}
