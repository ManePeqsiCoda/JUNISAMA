"use client"

import { useEffect, useState } from "react"
import { useClientAuthMock } from "@/lib/auth-client-mock"
import { getPaquetes } from "@/lib/cotizador/storage"
import { getCatalogo } from "@/lib/cotizador/storage"
import { formatCOP } from "@/lib/cotizador/calc"
import { StatusBadge } from "@/components/admin/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import {
  FileText,
  CreditCard,
  Package,
  Calendar,
  User,
  Building2,
  ChevronRight,
} from "lucide-react"
import type { PaqueteEvento, CatalogItem } from "@/types/cotizador-boga"
import type { EstadoCotizacion } from "@/lib/mocks"

export default function ClientDashboard() {
  const { user } = useClientAuthMock()
  const [paquetes, setPaquetes] = useState<PaqueteEvento[]>([])
  const [catalogo, setCatalogo] = useState<CatalogItem[]>([])
  const [selectedPkg, setSelectedPkg] = useState<PaqueteEvento | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  useEffect(() => {
    setCatalogo(getCatalogo())
  }, [])

  useEffect(() => {
    if (!user) return
    const all = getPaquetes()
    const mine = all.filter(
      (p) => p.cliente?.email?.trim().toLowerCase() === user.email.trim().toLowerCase()
    )
    setPaquetes(mine)
  }, [user])

  const estadoCotizador = (estado: string): EstadoCotizacion => {
    const map: Record<string, EstadoCotizacion> = {
      borrador: "BORRADOR",
      enviada: "ENVIADA",
      en_revision: "ENVIADA",
      aceptada: "APROBADA",
      rechazada: "RECHAZADA",
      vencida: "EXPIRADA",
    }
    return map[estado] ?? "BORRADOR"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Mis Cotizaciones</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Hola <strong>{user?.nombre}</strong>, estas son tus cotizaciones con BOGA.
        </p>
      </div>

      {paquetes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <FileText className="mb-4 h-12 w-12 text-muted-foreground/40" />
            <h3 className="text-lg font-semibold text-foreground">No tienes cotizaciones</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Cuando recibas una cotizacion de BOGA, aparecera aqui.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {paquetes.map((pkg) => (
            <Card key={pkg.id} className="flex flex-col border-border bg-card shadow-sm transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base font-semibold leading-tight text-foreground">
                    {pkg.nombre}
                  </CardTitle>
                  <StatusBadge status={estadoCotizador(pkg.estado)} />
                </div>
                <p className="text-xs text-muted-foreground font-mono">{pkg.numero}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-3">
                <div className="space-y-1.5 text-sm">
                  {pkg.fechaEvento && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 shrink-0" />
                      <span>{pkg.fechaEvento}</span>
                    </div>
                  )}
                  {pkg.tipoEvento && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5 shrink-0" />
                      <span className="capitalize">{pkg.tipoEvento}</span>
                    </div>
                  )}
                  {pkg.asistentesEstimados && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-3.5 w-3.5 shrink-0" />
                      <span>{pkg.asistentesEstimados} asistentes</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Package className="h-3.5 w-3.5 shrink-0" />
                    <span>{pkg.items.length} producto(s)</span>
                  </div>
                </div>

                <div className="mt-auto space-y-2 pt-3 border-t">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Total:</span>
                    <span className="text-lg font-bold text-foreground">{formatCOP(pkg.precioCliente)}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1.5"
                      onClick={() => {
                        setSelectedPkg(pkg)
                        setDetailOpen(true)
                      }}
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                      Ver detalle
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1 gap-1.5 opacity-50 cursor-not-allowed"
                      disabled
                      title="Proximamente: pago en linea"
                    >
                      <CreditCard className="h-3.5 w-3.5" />
                      Pagar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog de detalle */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedPkg && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedPkg.nombre}</DialogTitle>
                <DialogDescription>
                  Cotizacion {selectedPkg.numero} — {estadoCotizador(selectedPkg.estado) === "BORRADOR" ? "Borrador" : estadoCotizador(selectedPkg.estado) === "ENVIADA" ? "Enviada" : estadoCotizador(selectedPkg.estado) === "APROBADA" ? "Aprobada" : estadoCotizador(selectedPkg.estado) === "RECHAZADA" ? "Rechazada" : "Expirada"}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {selectedPkg.cliente?.nombre && (
                  <div className="flex items-start gap-3 rounded-lg bg-muted/50 px-3 py-2.5 text-sm">
                    <User className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{selectedPkg.cliente.nombre}</p>
                      <p className="text-xs text-muted-foreground">{selectedPkg.cliente.email}</p>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Productos incluidos</h4>
                  <ul className="space-y-1.5">
                    {selectedPkg.items.map((it, idx) => {
                      const item = catalogo.find((c) => c.id === it.catalogItemId)
                      const tarifa = item?.tarifas.find((t) => t.id === it.tarifaId)
                      return (
                        <li key={idx} className="flex items-center justify-between gap-2 rounded-md bg-muted/30 px-3 py-2 text-sm">
                          <span className="text-foreground">{item?.nombre ?? it.catalogItemId}</span>
                          <span className="text-muted-foreground">x{it.cantidad}{(tarifa && tarifa.unidadCobro !== "unidad") ? ` /${tarifa.unidadCobro}` : ""}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <div className="rounded-lg border bg-card px-4 py-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted-foreground">Valor total</span>
                    <span className="text-xl font-bold text-foreground">{formatCOP(selectedPkg.precioCliente)}</span>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  className="w-full gap-2 opacity-50 cursor-not-allowed"
                  disabled
                  title="Proximamente: pago en linea"
                >
                  <CreditCard className="h-4 w-4" />
                  Pagar en linea (proximamente)
                </Button>
              </div>

              <DialogClose>
                <Button variant="outline" className="w-full">Cerrar</Button>
              </DialogClose>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
