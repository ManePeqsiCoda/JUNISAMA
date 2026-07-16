"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { FadeIn } from "./fade-in"
import { ArrowRight, Star, Bath, Accessibility, Users, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Producto } from "@/lib/mocks"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Crown: Star,
  Bath: Bath,
  Accessibility: Accessibility,
  Leaf: Leaf,
  Users: Users,
}

interface FeaturedProductsProps {
  productos: Producto[]
}

export function FeaturedProducts({ productos }: FeaturedProductsProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 lg:px-6">
        <FadeIn className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-dark md:text-4xl">
            Nuestras soluciones
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-body">
            Equipos sanitarios portátiles para todo tipo de evento
          </p>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productos.map((producto, index) => {
            const Icon = iconMap[producto.categoria.icono || ""] || Bath
            return (
              <FadeIn key={producto.id} delay={index * 0.1}>
                <Card className="group h-full border-border-subtle bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="relative h-44 overflow-hidden rounded-t-xl bg-bg-light">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-light text-primary transition-transform group-hover:scale-110">
                        <Icon className="h-10 w-10" />
                      </div>
                    </div>
                    {producto.badge && (
                      <Badge className="absolute top-3 right-3 bg-accent-gold text-white hover:bg-accent-gold">
                        {producto.badge}
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <h3 className="text-lg font-medium text-dark">
                      {producto.nombre}
                    </h3>
                    <CardDescription>{producto.descripcionCorta}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Link
                      href={`/productos/${producto.slug}`}
                      className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-hover"
                    >
                      Ver más
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>
              </FadeIn>
            )
          })}
        </div>

        <FadeIn delay={0.4} className="mt-12 text-center">
          <Link
            href="/productos"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "px-8 font-semibold"
            )}
          >
            Ver todos los productos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
