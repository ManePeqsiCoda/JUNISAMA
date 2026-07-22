import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/logo"
import { BogaCircles } from "@/components/brand/boga-circles"
import { BogaDecor, BogaDiagonal } from "@/components/brand/boga-decor"
import { PageHero } from "@/components/brand/page-hero"

export const metadata: Metadata = {
  title: "Design System BOGA",
  robots: {
    index: false,
    follow: false,
  },
}

const brandColors = [
  { name: "Electric 500", className: "bg-boga-electric-500", hex: "#2c4df2", on: "text-white" },
  { name: "Deep 500", className: "bg-boga-deep-500", hex: "#1b1341", on: "text-white" },
  { name: "Lima 500", className: "bg-boga-lima-500", hex: "#daf73a", on: "text-boga-text-on-lima" },
  { name: "Cream", className: "bg-boga-cream", hex: "#e9eac1", on: "text-boga-deep-500" },
  { name: "Silver", className: "bg-boga-silver", hex: "#d8d8d8", on: "text-boga-deep-500" },
  { name: "Surface canvas", className: "bg-boga-surface-canvas", hex: "canvas", on: "text-boga-text-primary" },
  { name: "Surface elevated", className: "bg-boga-surface-elevated", hex: "elevated", on: "text-boga-text-primary" },
  { name: "Success", className: "bg-boga-success-500", hex: "success", on: "text-white" },
  { name: "Error", className: "bg-boga-error-500", hex: "error", on: "text-white" },
]

const typeScale = [
  { name: "Display MD", className: "text-display-md font-bold", sample: "BOGA Ingeniería" },
  { name: "Heading LG", className: "text-heading-lg font-semibold", sample: "Sección principal" },
  { name: "Body", className: "text-base", sample: "Texto de cuerpo Montserrat para lectura cómoda." },
  { name: "Caption", className: "text-caption uppercase tracking-wider", sample: "Overline de marca" },
]

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-boga-surface-canvas">
      <PageHero
        overline="Design system"
        title="Sistema de diseño BOGA"
        description="Tokens, firmas gráficas y componentes alineados al Brand Kit oficial."
      />

      <div className="container-boga py-16">
        <section className="mb-20">
          <span className="mb-3 inline-flex items-center gap-2 text-caption uppercase tracking-wider text-boga-electric-500">
            <BogaCircles size="s" tone="electric" />
            Identidad
          </span>
          <h2 className="mb-2 text-2xl font-bold text-boga-text-primary md:text-3xl">
            Logo y firmas
          </h2>
          <p className="mb-8 max-w-2xl text-boga-text-secondary">
            Isotipo lima con iconos de baño, barra lima y sub-marca con tracking amplio.
            Firma de tres círculos: dos llenos y uno vacío al centro.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-boga-border-subtle bg-boga-surface-elevated p-8">
              <Logo variant="light" />
            </div>
            <div className="rounded-xl bg-boga-deep-500 p-8">
              <Logo variant="dark" />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-8 rounded-xl border border-boga-border-subtle bg-boga-surface-elevated p-6">
            <BogaCircles size="s" tone="lima" />
            <BogaCircles size="m" tone="electric" />
            <BogaCircles size="l" tone="dark" />
            <div className="rounded-lg bg-boga-deep-500 px-4 py-3">
              <BogaCircles size="m" tone="white" />
            </div>
            <div className="boga-loading-circles" aria-hidden="true">
              <span className="circle" />
              <span className="circle" />
              <span className="circle" />
            </div>
          </div>
        </section>

        <Separator className="my-16" />

        <section className="mb-20">
          <span className="mb-3 inline-flex items-center gap-2 text-caption uppercase tracking-wider text-boga-electric-500">
            <BogaCircles size="s" tone="electric" />
            Decorativos
          </span>
          <h2 className="mb-2 text-2xl font-bold text-boga-text-primary md:text-3xl">
            Elementos del Brand Kit
          </h2>
          <p className="mb-8 max-w-2xl text-boga-text-secondary">
            Ondas, flechas, barras, burbujas y diagonal azul/lima para esquinas y fondos.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex h-36 items-center justify-center rounded-xl border border-boga-border-subtle bg-boga-deep-500">
              <BogaDecor variant="waves" tone="lima" className="h-12 w-28" />
            </div>
            <div className="flex h-36 items-center justify-center rounded-xl border border-boga-border-subtle bg-boga-deep-500">
              <BogaDecor variant="arrows" tone="lima" className="h-20 w-20" />
            </div>
            <div className="flex h-36 items-center justify-center rounded-xl border border-boga-border-subtle bg-boga-electric-500">
              <BogaDecor variant="bars" tone="lima" />
            </div>
            <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-xl border border-boga-border-subtle bg-boga-surface-elevated">
              <BogaDecor variant="bubbles" tone="electric" className="absolute inset-0 h-full w-full" />
              <span className="relative z-10 text-sm font-semibold text-boga-text-primary">
                Bubbles
              </span>
            </div>
            <div className="relative h-36 overflow-hidden rounded-xl sm:col-span-2 lg:col-span-2">
              <BogaDiagonal />
              <span className="absolute inset-0 z-10 flex items-center justify-center text-sm font-bold uppercase tracking-wider text-boga-deep-500">
                Diagonal electric / lima
              </span>
            </div>
          </div>
        </section>

        <Separator className="my-16" />

        <section className="mb-20">
          <span className="mb-3 inline-flex items-center gap-2 text-caption uppercase tracking-wider text-boga-electric-500">
            <BogaCircles size="s" tone="electric" />
            Color
          </span>
          <h2 className="mb-2 text-2xl font-bold text-boga-text-primary md:text-3xl">
            Paleta BOGA
          </h2>
          <p className="mb-8 max-w-2xl text-boga-text-secondary">
            Azul eléctrico, deep, lima y neutrales del kit. Sin naranja legacy.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {brandColors.map((color) => (
              <article
                key={color.name}
                className="overflow-hidden rounded-xl border border-boga-border-subtle bg-boga-surface-elevated shadow-boga-2"
              >
                <div
                  className={`flex h-24 w-full items-center justify-center text-sm font-semibold ${color.className} ${color.on}`}
                >
                  {color.hex}
                </div>
                <div className="p-3">
                  <p className="font-semibold text-boga-text-primary">{color.name}</p>
                  <p className="text-xs text-boga-text-tertiary">{color.hex}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <Separator className="my-16" />

        <section className="mb-20">
          <span className="mb-3 inline-flex items-center gap-2 text-caption uppercase tracking-wider text-boga-electric-500">
            <BogaCircles size="s" tone="electric" />
            Tipografía
          </span>
          <h2 className="mb-2 text-2xl font-bold text-boga-text-primary md:text-3xl">
            Montserrat
          </h2>
          <p className="mb-8 max-w-2xl text-boga-text-secondary">
            Alternativa web oficial del Brand Kit. Escala display / heading / body / caption.
          </p>
          <div className="space-y-6 rounded-xl border border-boga-border-subtle bg-boga-surface-elevated p-6 shadow-boga-2">
            {typeScale.map((t) => (
              <div
                key={t.name}
                className="border-b border-boga-border-subtle pb-4 last:border-0 last:pb-0"
              >
                <span className="text-caption uppercase tracking-wider text-boga-text-tertiary">
                  {t.name}
                </span>
                <p className={`mt-1 text-boga-text-primary ${t.className}`}>{t.sample}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-16" />

        <section className="mb-20">
          <span className="mb-3 inline-flex items-center gap-2 text-caption uppercase tracking-wider text-boga-electric-500">
            <BogaCircles size="s" tone="electric" />
            Componentes
          </span>
          <h2 className="mb-2 text-2xl font-bold text-boga-text-primary md:text-3xl">
            CTAs y formularios
          </h2>
          <p className="mb-8 max-w-2xl text-boga-text-secondary">
            CTA primario lima sobre fondos deep/electric. Contraste WCAG AA.
          </p>
          <div className="space-y-8 rounded-xl border border-boga-border-subtle bg-boga-surface-elevated p-6 shadow-boga-2">
            <div className="flex flex-wrap items-center gap-4">
              <Button className="btn-primary">Cotizar ahora</Button>
              <Button variant="secondary">Secundario</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 rounded-lg bg-boga-deep-500 p-6">
              <Button className="btn-primary">CTA lima</Button>
              <Badge className="border-0 bg-boga-lima-500/15 text-boga-lima-500">
                Emergencia
              </Badge>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ds-name">Nombre</Label>
                <Input id="ds-name" placeholder="Ej: Carlos Pérez" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ds-email">Correo</Label>
                <Input id="ds-email" type="email" placeholder="correo@ejemplo.com" />
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-16" />

        <section className="mb-12">
          <span className="mb-3 inline-flex items-center gap-2 text-caption uppercase tracking-wider text-boga-electric-500">
            <BogaCircles size="s" tone="electric" />
            Superficies
          </span>
          <h2 className="mb-2 text-2xl font-bold text-boga-text-primary md:text-3xl">
            Tarjetas de interacción
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card className="border-boga-border-subtle bg-boga-surface-elevated shadow-boga-2">
              <CardHeader>
                <CardTitle>Producto ejemplo</CardTitle>
                <CardDescription>
                  Contenedor solo cuando hay interacción o contenido agrupado.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="btn-primary w-full">Cotizar</Button>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-boga-electric-500 text-white shadow-boga-2">
              <CardHeader>
                <CardTitle className="text-boga-lima-500">Valores</CardTitle>
                <CardDescription className="text-white/70">
                  Fondo eléctrico + tipografía lima como en el flipbook.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/80">
                  Arco de círculos semitransparentes en home / ADN.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <footer className="border-t border-boga-border-subtle bg-boga-surface-muted py-8">
        <div className="container-boga text-center text-sm text-boga-text-tertiary">
          © {new Date().getFullYear()} BOGA — Ingeniería Portátil — Design System
        </div>
      </footer>
    </main>
  )
}
