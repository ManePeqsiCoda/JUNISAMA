import { describe, it, expect } from "vitest"
import { factorDias, validarDuracionObra } from "@/lib/cotizador/calc"
import type { CatalogItem, ItemEnPaquete } from "@/types/cotizador-boga"

describe("factorDias", () => {
  it("returns 1 for dia with 0", () => {
    expect(factorDias("dia", 0)).toBe(1)
  })
  it("returns 1 for dia with 1", () => {
    expect(factorDias("dia", 1)).toBe(1)
  })
  it("returns 5 for dia with 5", () => {
    expect(factorDias("dia", 5)).toBe(5)
  })
  it("returns 1 for evento", () => {
    expect(factorDias("evento", 5)).toBe(1)
  })
  it("returns 1 for turno_8h", () => {
    expect(factorDias("turno_8h", 5)).toBe(1)
  })
  it("returns 1 for turno_12h", () => {
    expect(factorDias("turno_12h", 5)).toBe(1)
  })
  it("returns 1 for unidad", () => {
    expect(factorDias("unidad", 5)).toBe(1)
  })

  describe("mes", () => {
    it("returns 1 for 15 dias", () => {
      expect(factorDias("mes", 15)).toBe(1)
    })
    it("returns 1 for 30 dias", () => {
      expect(factorDias("mes", 30)).toBe(1)
    })
    it("returns 2 for 45 dias", () => {
      expect(factorDias("mes", 45)).toBe(2)
    })
    it("returns 3 for 65 dias", () => {
      expect(factorDias("mes", 65)).toBe(3)
    })
    it("returns 1 for 0 dias", () => {
      expect(factorDias("mes", 0)).toBe(1)
    })
    it("returns 6 for 180 dias", () => {
      expect(factorDias("mes", 180)).toBe(6)
    })
  })
})

describe("validarDuracionObra", () => {
  const CATALOGO: CatalogItem[] = [
    {
      id: "prod-bano-obra",
      slug: "bano-obra",
      nombre: "Bano de Obra",
      descripcion: "Test",
      categoria: "obras",
      icono: "Building2",
      specs: [],
      activo: true,
      orden: 1,
      tarifas: [{id:"tar-bano-obra-mes",nombre:"Mensual",descripcion:"",incluye:[],costos:[],costoTotal:150000,precioCliente:280000,margenPorcentaje:46,ganancia:130000,unidadCobro:"mes",activa:true}]
    },
    {
      id: "prod-lavamanos-obra",
      slug: "lavamanos-obra",
      nombre: "Lava Manos de Obra",
      descripcion: "Test",
      categoria: "obras",
      icono: "Droplets",
      specs: [],
      activo: true,
      orden: 2,
      tarifas: [{id:"tar-lavamanos-obra-mes",nombre:"Mensual",descripcion:"",incluye:[],costos:[],costoTotal:55000,precioCliente:90000,margenPorcentaje:39,ganancia:35000,unidadCobro:"mes",activa:true}]
    },
  ]

  it("passes for obra item with duracionDias >= 30", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-bano-obra", tarifaId: "tar-bano-obra-mes", cantidad: 2 },
    ]
    const result = validarDuracionObra(items, CATALOGO, 30)
    expect(result.valido).toBe(true)
    expect(result.mensaje).toBeUndefined()
  })

  it("passes for obra item with duracionDias > 30", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-bano-obra", tarifaId: "tar-bano-obra-mes", cantidad: 1 },
    ]
    const result = validarDuracionObra(items, CATALOGO, 60)
    expect(result.valido).toBe(true)
  })

  it("fails for obra item with duracionDias < 30", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-bano-obra", tarifaId: "tar-bano-obra-mes", cantidad: 1 },
    ]
    const result = validarDuracionObra(items, CATALOGO, 15)
    expect(result.valido).toBe(false)
    expect(result.mensaje).toBeTruthy()
    expect(result.mensaje!.includes("30 d") || result.mensaje!.includes("30 D")).toBe(true)
  })

  it("fails for obra item with undefined duracionDias", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-bano-obra", tarifaId: "tar-bano-obra-mes", cantidad: 1 },
    ]
    const result = validarDuracionObra(items, CATALOGO, undefined)
    expect(result.valido).toBe(false)
  })

  it("passes for non-obra items regardless of duration", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-bano-estandar", tarifaId: "tar-estandar-dia", cantidad: 1 },
    ]
    const result = validarDuracionObra(items, CATALOGO, 1)
    expect(result.valido).toBe(true)
  })

  it("passes for obra items with non-mes tarifa", () => {
    const catConDia: CatalogItem[] = [
      {
        ...CATALOGO[0],
        tarifas: [{id:"tar-bano-obra-dia",nombre:"Diario",descripcion:"",incluye:[],costos:[],costoTotal:50000,precioCliente:80000,margenPorcentaje:38,ganancia:30000,unidadCobro:"dia",activa:true}]
      },
    ]
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-bano-obra", tarifaId: "tar-bano-obra-dia", cantidad: 1 },
    ]
    const result = validarDuracionObra(items, catConDia, 1)
    expect(result.valido).toBe(true)
  })
})
