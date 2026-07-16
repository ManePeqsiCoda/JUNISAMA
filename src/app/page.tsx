import type { Metadata } from "next"
import { Hero } from "@/components/home/hero"
import { Clients } from "@/components/home/clients"
import { FeaturedProducts } from "@/components/home/featured-products"
import { WhyUs } from "@/components/home/why-us"
import { Testimonials } from "@/components/home/testimonials"
import { Contact } from "@/components/home/contact"
import {
  eventos,
  getProductosDestacados,
} from "@/lib/mocks"
import {
  seoConfig,
  generateOpenGraph,
  generateTwitterCard,
} from "@/lib/seo"

export const metadata: Metadata = {
  title: seoConfig.home.title,
  description: seoConfig.home.description,
  keywords: seoConfig.home.keywords,
  alternates: { canonical: "/" },
  openGraph: generateOpenGraph("home", "/"),
  twitter: generateTwitterCard("home"),
}

export default function HomePage() {
  const productosDestacados = getProductosDestacados(4)
  const eventosDestacados = eventos
    .filter((e) => e.destacado && e.estado === "PUBLICADO")
    .slice(0, 3)

  return (
    <>
      <Hero />
      <Clients />
      <FeaturedProducts productos={productosDestacados} />
      <WhyUs />
      <Testimonials eventos={eventosDestacados} />
      <Contact />
    </>
  )
}
