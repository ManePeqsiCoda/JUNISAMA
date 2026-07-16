import {
  CalendarDays,
  Clock,
  Shield,
  MapPin,
  Leaf,
  Users,
} from "lucide-react"

const statsData = [
  {
    icon: CalendarDays,
    value: "500+",
    label: "Eventos Atendidos",
    description: "Desde conciertos hasta ferias internacionales",
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Soporte Técnico",
    description: "Equipo de operarios certificados siempre disponible",
  },
  {
    icon: Shield,
    value: "99.9%",
    label: "Uptime Garantizado",
    description: "Infraestructura confiable en todo momento",
  },
  {
    icon: MapPin,
    value: "2",
    label: "Sedes Operativas",
    description: "Medellín y Bogotá con cobertura nacional",
  },
  {
    icon: Leaf,
    value: "100%",
    label: "Insumos Eco-friendly",
    description: "Compromiso ambiental certificado ISO 14001",
  },
  {
    icon: Users,
    value: "30+",
    label: "Clientes Recurrentes",
    description: "Organizaciones que confían año tras año",
  },
]

export function OurNumbers() {
  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="numbers-heading">
      <div className="container-junisama">
        <div className="mb-16 text-center">
          <span className="badge-iso mx-auto mb-4 inline-flex">La diferencia Junisama</span>
          <h2
            id="numbers-heading"
            className="font-outfit text-heading-lg text-secondary-800 md:text-display-md"
          >
            Más de una década respaldando los eventos más importantes del país
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {statsData.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-2xl border border-neutral-200 bg-neutral-50 p-6 transition-all duration-300 hover:border-transparent hover:bg-white hover:shadow-lg md:p-8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 transition-colors group-hover:bg-primary-500">
                <stat.icon
                  className="h-6 w-6 text-primary-500 transition-colors group-hover:text-white"
                  aria-hidden="true"
                />
              </div>
              <div className="font-space-grotesk text-3xl font-bold text-accent-gold-500">
                {stat.value}
              </div>
              <h3 className="mt-2 font-outfit text-heading-sm text-secondary-800">
                {stat.label}
              </h3>
              <p className="mt-1 text-body-sm text-neutral-500">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
