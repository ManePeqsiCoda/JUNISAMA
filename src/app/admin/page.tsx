import { KpiCard } from "@/components/admin/kpi-card"
import { CotizadorKpis } from "@/components/admin/cotizador-kpis"
import { RecentCotizaciones } from "@/components/admin/recent-cotizaciones"
import { CotizacionesStatusChart } from "@/components/admin/cotizaciones-status-chart"
import { cotizaciones } from "@/lib/mocks"
import {
  FileText,
  DollarSign,
  Clock,
  Users,
  Activity,
} from "lucide-react"

function getMonthRanges() {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  )
  const startOfPrev = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const endOfPrev = new Date(
    now.getFullYear(),
    now.getMonth(),
    0,
    23,
    59,
    59,
    999
  )
  return { startOfMonth, endOfMonth, startOfPrev, endOfPrev }
}

function calculateTrend(current: number, previous: number) {
  if (previous === 0) {
    return current > 0
      ? { trend: "up" as const, value: "+100%" }
      : { trend: "neutral" as const, value: "0%" }
  }
  const diff = current - previous
  const percent = Math.round((diff / previous) * 100)
  return {
    trend: percent > 0 ? ("up" as const) : percent < 0 ? ("down" as const) : ("neutral" as const),
    value: `${percent > 0 ? "+" : ""}${percent}%`,
  }
}

function formatCurrency(value: number | null | undefined) {
  if (value == null) return "$0"
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value)
}

const recentActivities = [
  { id: 1, text: "Sistema inicializado correctamente", time: "Hace unos segundos" },
  { id: 2, text: "Dashboard cargado con datos actualizados", time: "Hace unos segundos" },
]

export default function AdminDashboardPage() {
  const { startOfMonth, endOfMonth, startOfPrev, endOfPrev } = getMonthRanges()

  const cotizacionesMesActual = cotizaciones.filter((c) => {
    const date = new Date(c.createdAt)
    return date >= startOfMonth && date <= endOfMonth
  }).length

  const cotizacionesMesAnterior = cotizaciones.filter((c) => {
    const date = new Date(c.createdAt)
    return date >= startOfPrev && date <= endOfPrev
  }).length

  const ingresosEstimados = cotizaciones
    .filter((c) => {
      if (c.estado !== "APROBADA") return false
      const date = new Date(c.createdAt)
      return date >= startOfMonth && date <= endOfMonth
    })
    .reduce((sum, c) => sum + (c.precioVenta ?? 0), 0)

  const ingresosMesAnterior = cotizaciones
    .filter((c) => {
      if (c.estado !== "APROBADA") return false
      const date = new Date(c.createdAt)
      return date >= startOfPrev && date <= endOfPrev
    })
    .reduce((sum, c) => sum + (c.precioVenta ?? 0), 0)

  const cotizacionesPendientes = cotizaciones.filter((c) =>
    ["BORRADOR", "ENVIADA"].includes(c.estado)
  ).length

  const clientesActivos = new Set(
    cotizaciones.map((c) => c.clienteId)
  ).size

  const statusData = (["BORRADOR", "ENVIADA", "APROBADA", "RECHAZADA", "EXPIRADA"] as const).map(
    (estado) => ({
      estado,
      count: cotizaciones.filter((c) => c.estado === estado).length,
    })
  )

  const recentCotizaciones = [...cotizaciones]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const cotizacionesTrend = calculateTrend(
    cotizacionesMesActual,
    cotizacionesMesAnterior
  )

  return (
    <div className="space-y-6">
      <h1 className="sr-only">Dashboard</h1>
      <CotizadorKpis />
      {/* KPI Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Cotizaciones del mes"
          value={cotizacionesMesActual}
          icon={FileText}
          trend={cotizacionesTrend.trend}
          trendValue={cotizacionesTrend.value}
          color="primary"
        />
        <KpiCard
          title="Ingresos estimados"
          value={formatCurrency(ingresosEstimados)}
          icon={DollarSign}
          trend={calculateTrend(ingresosEstimados, ingresosMesAnterior).trend}
          trendValue={calculateTrend(ingresosEstimados, ingresosMesAnterior).value}
          color="green"
        />
        <KpiCard
          title="Cotizaciones pendientes"
          value={cotizacionesPendientes}
          icon={Clock}
          trend={cotizacionesPendientes > 0 ? "down" : "neutral"}
          trendValue={cotizacionesPendientes > 0 ? "Por gestionar" : "Al día"}
          color="orange"
        />
        <KpiCard
          title="Clientes activos"
          value={clientesActivos}
          icon={Users}
          trend="neutral"
          trendValue="Total con cotizaciones"
          color="blue"
        />
      </div>

      {/* Charts & Table */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentCotizaciones cotizaciones={recentCotizaciones} />
        </div>
        <div className="space-y-6">
          <CotizacionesStatusChart data={statusData} />

          <div className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-foreground">
              Actividad reciente
            </h3>
            <div className="mt-4 space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
