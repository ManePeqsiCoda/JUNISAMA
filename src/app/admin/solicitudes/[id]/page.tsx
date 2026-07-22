"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, RefreshCw, Trash2 } from "lucide-react"
import {
  getSolicitudById,
  updateSolicitud,
} from "@/lib/cotizador/storage"
import type { SolicitudPublica } from "@/types/cotizador-boga"
import { cn } from "@/lib/utils"

export default function SolicitudDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = typeof params.id === "string" ? params.id : ""
  const [solicitud, setSolicitud] = useState<SolicitudPublica | null>(null)

  const reload = useCallback(
    () => setSolicitud(getSolicitudById(id) ?? null),
    [id]
  )

  useEffect(() => {
    reload()
  }, [reload])

  if (!solicitud) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Solicitud no encontrada.</p>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/admin/solicitudes">Volver</Link>}
        />
      </div>
    )
  }

  const convertir = () => {
    const prefill = {
      nombre: solicitud.eventType + " - " + solicitud.city,
      tipoEvento: solicitud.eventType,
      fechaEvento: solicitud.eventDate,
      productSlugs: solicitud.productSlugs,
      notas: solicitud.notes,
      cliente: {
        nombre: solicitud.fullName,
        empresa: solicitud.company,
        email: solicitud.email,
        telefono: solicitud.phone,
        ciudad: solicitud.city,
      },
    }
    sessionStorage.setItem(
      "boga-solicitud-prefill-" + solicitud.id,
      JSON.stringify(prefill)
    )
    updateSolicitud(solicitud.id, { estado: "convertida" })
    toast.success("Solicitud convertida a borrador")
    router.push("/admin/cotizaciones/nueva?solicitudId=" + solicitud.id)
  }

  const descartar = () => {
    updateSolicitud(solicitud.id, { estado: "descartada" })
    toast.message("Solicitud descartada")
    reload()
  }

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
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
              <Link href="/admin/solicitudes">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            }
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Solicitud
            </p>
            <h1 className="text-xl font-extrabold text-foreground">
              {solicitud.fullName}
            </h1>
            <p className="text-sm text-muted-foreground">
              Ref.{" "}
              <span className="font-mono font-semibold text-foreground">
                {solicitud.numeroReferencia}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Recibida el {formatDate(solicitud.recibidoEn)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {solicitud.estado === "nueva" && (
            <>
              <Button onClick={convertir}>Convertir</Button>
              <Button variant="outline" onClick={descartar}>
                <Trash2 className="mr-2 h-4 w-4" />
                Descartar
              </Button>
            </>
          )}
          {solicitud.estado !== "nueva" && (
            <Button variant="outline" onClick={descartar}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reabrir
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card ring-1 ring-foreground/10">
          <CardHeader>
            <CardTitle className="text-sm font-extrabold uppercase tracking-wider">
              Contacto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Row label="Nombre" value={solicitud.fullName} />
            <Row label="Email" value={solicitud.email} />
            <Row label="Telefono" value={solicitud.phone} />
            <Row label="Empresa" value={solicitud.company} />
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">RUT</span>
              {solicitud.rut ? (
                <span className="text-right font-medium">{solicitud.rut}</span>
              ) : (
                <span className="inline-flex rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-600">
                  Sin RUT
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card ring-1 ring-foreground/10">
          <CardHeader>
            <CardTitle className="text-sm font-extrabold uppercase tracking-wider">
              Evento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Row label="Tipo" value={solicitud.eventType} capitalize />
            <Row label="Ciudad" value={solicitud.city} />
            <Row label="Fecha" value={solicitud.eventDate} />
            <Row label="Asistentes" value={solicitud.attendees} />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card ring-1 ring-foreground/10">
        <CardHeader>
          <CardTitle className="text-sm font-extrabold uppercase tracking-wider">
            Productos solicitados
          </CardTitle>
        </CardHeader>
        <CardContent>
          {solicitud.productSlugs.length === 0 ? (
            <p className="text-sm text-muted-foreground">Sin productos</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {solicitud.productSlugs.map((slug) => (
                <Badge key={slug} variant="secondary">
                  {slug}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {solicitud.notes && (
        <Card className="bg-card ring-1 ring-foreground/10">
          <CardHeader>
            <CardTitle className="text-sm font-extrabold uppercase tracking-wider">
              Notas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm">{solicitud.notes}</p>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-xs font-medium capitalize",
            solicitud.estado === "nueva" &&
              "bg-boga-lima-500/20 text-boga-lima-600",
            solicitud.estado === "convertida" &&
              "bg-boga-success-500/15 text-boga-success-500",
            solicitud.estado === "descartada" &&
              "bg-muted text-muted-foreground"
          )}
        >
          {solicitud.estado}
        </span>
        {solicitud.paqueteId && (
          <Button
            variant="link"
            size="sm"
            className="h-auto p-0"
            nativeButton={false}
            render={
              <Link href={"/admin/cotizaciones/" + solicitud.paqueteId}>
                Ver cotizacion
              </Link>
            }
          />
        )}
      </div>
    </div>
  )
}

function Row({
  label,
  value,
  capitalize,
}: {
  label: string
  value?: string | null
  capitalize?: boolean
}) {
  const display = value || "-"
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={cn(
          "text-right font-medium",
          capitalize && "capitalize"
        )}
      >
        {display}
      </span>
    </div>
  )
}