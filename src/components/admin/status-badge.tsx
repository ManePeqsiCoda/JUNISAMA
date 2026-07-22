"use client"

import { cn } from "@/lib/utils"
import type { EstadoCotizacion } from "@/lib/mocks"

const statusConfig: Record<
  EstadoCotizacion,
  { label: string; bg: string; text: string; border: string }
> = {
  BORRADOR: {
    label: "Borrador",
    bg: "bg-boga-neutral-500/15",
    text: "text-boga-neutral-400",
    border: "border-boga-neutral-500/20",
  },
  ENVIADA: {
    label: "Enviada",
    bg: "bg-boga-info-500/15",
    text: "text-boga-info-500",
    border: "border-boga-info-500/20",
  },
  APROBADA: {
    label: "Aprobada",
    bg: "bg-boga-success-500/15",
    text: "text-boga-success-500",
    border: "border-boga-success-500/20",
  },
  RECHAZADA: {
    label: "Rechazada",
    bg: "bg-boga-error-500/15",
    text: "text-boga-error-500",
    border: "border-boga-error-500/20",
  },
  EXPIRADA: {
    label: "Expirada",
    bg: "bg-boga-warning-500/15",
    text: "text-boga-warning-500",
    border: "border-boga-warning-500/20",
  },
}

interface StatusBadgeProps {
  status: EstadoCotizacion
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      {config.label}
    </span>
  )
}
