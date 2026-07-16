"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { CotizacionWizard } from "@/components/admin/cotizacion-wizard"
import type { Cotizacion } from "@/lib/mocks"

export default function NuevaCotizacionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const clienteId = searchParams.get("clienteId") ?? undefined
  const id = searchParams.get("id") ?? undefined

  const handleSuccess = (cotizacion: Cotizacion) => {
    toast.success("Cotización guardada")
    router.push(`/admin/cotizaciones/${cotizacion.id}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">
          {id ? "Editar cotización" : "Nueva cotización"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {id
            ? "Modifica la cotización existente."
            : "Completa el asistente para crear una cotización."}
        </p>
      </div>
      <CotizacionWizard
        cotizacionId={id}
        preselectedClienteId={clienteId}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
