import { describe, it, expect } from "vitest";
import {
  seleccionarSede,
  itemsAUnidades,
  empacarCamiones,
  calcularCostoRuta,
  calcularTransporte,
} from "./transporte";
import type { ItemEnPaquete } from "../../types/cotizador-boga";

describe("seleccionarSede", () => {
  it("returns Medellin for Manizales", () => {
    const result = seleccionarSede("Manizales");
    expect(result.sede).toBe("Medellin");
    expect(result.advertencia).toBeUndefined();
  });

  it("returns Bogota for Cali", () => {
    const result = seleccionarSede("Cali");
    expect(result.sede).toBe("Bogota");
    expect(result.advertencia).toBeUndefined();
  });

  it("returns null with warning for undefined ciudad", () => {
    const result = seleccionarSede(undefined);
    expect(result.sede).toBeNull();
    expect(result.advertencia).toBeDefined();
  });

  it("returns null with warning for unknown city", () => {
    const result = seleccionarSede("Leticia");
    expect(result.sede).toBeNull();
    expect(result.advertencia).toContain("Leticia");
  });

  it("returns null with warning for empty string", () => {
    const result = seleccionarSede("");
    expect(result.sede).toBeNull();
    expect(result.advertencia).toBeDefined();
  });
});

describe("itemsAUnidades", () => {
  it("ignores items with quantity 0", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-estandar", tarifaId: "tar-std-dia", cantidad: 0 },
    ];
    expect(itemsAUnidades(items)).toEqual([]);
  });

  it("converts 6 standard bathrooms to 6 units of 5 slots each", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-estandar", tarifaId: "tar-std-dia", cantidad: 6 },
    ];
    const unidades = itemsAUnidades(items);
    expect(unidades).toHaveLength(6);
    expect(unidades[0].slots).toBe(5);
    expect(unidades.every((u) => u.catalogItemId === "prod-estandar")).toBe(true);
  });

  it("returns empty array for items without transport config", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "unknown-item", tarifaId: "x", cantidad: 5 },
    ];
    expect(itemsAUnidades(items)).toEqual([]);
  });

  it("skips items marked as no_aplica_transporte_camion", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-operarios", tarifaId: "x", cantidad: 3 },
      { catalogItemId: "svc-mantenimiento", tarifaId: "x", cantidad: 1 },
    ];
    expect(itemsAUnidades(items)).toEqual([]);
  });
});

describe("empacarCamiones", () => {
  it("6 standard bathrooms (30 slots) fit in exactly 1 truck", () => {
    const result = empacarCamiones(itemsAUnidades([
      { catalogItemId: "prod-estandar", tarifaId: "tar-std-dia", cantidad: 6 },
    ]));
    expect(result).toHaveLength(1);
    expect(result[0].espacio_usado).toBe(30);
  });

  it("6 bathrooms + 2 lavamanos + 3 ecopoints = 2 trucks (FFD)", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-estandar", tarifaId: "tar-std-dia", cantidad: 6 },
      { catalogItemId: "prod-lavamanos", tarifaId: "x", cantidad: 2 },
      { catalogItemId: "prod-eco", tarifaId: "x", cantidad: 3 },
    ];
    const result = empacarCamiones(itemsAUnidades(items));
    expect(result).toHaveLength(2);
    expect(result[0].espacio_usado).toBe(30);
    expect(result[1].espacio_usado).toBeLessThanOrEqual(30);
  });

  it("returns empty array for no items", () => {
    expect(empacarCamiones([])).toEqual([]);
  });
});

describe("calcularCostoRuta", () => {
  it("returns 500000 for Medellin -> Manizales", () => {
    const result = calcularCostoRuta("Medellin", "Manizales", 1);
    expect(result.costo).toBe(500000);
    expect(result.advertencia).toBeUndefined();
  });

  it("returns 1000000 for Medellin -> Manizales with 2 trucks", () => {
    const result = calcularCostoRuta("Medellin", "Manizales", 2);
    expect(result.costo).toBe(1000000);
  });

  it("returns 800000 for Bogota -> Cali (newly configured route)", () => {
    const result = calcularCostoRuta("Bogota", "Cali", 1);
    expect(result.costo).toBe(800000);
    expect(result.advertencia).toBeUndefined();
  });

  it("returns warning for unknown route", () => {
    const result = calcularCostoRuta("Medellin", "Leticia", 1);
    expect(result.costo).toBe(0);
    expect(result.advertencia).toContain("sin costo configurado");
  });
});

describe("calcularTransporte (integration)", () => {
  it("Case 1: 6 standard bathrooms -> 1 truck, Medellin sede", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-estandar", tarifaId: "tar-std-dia", cantidad: 6 },
    ];
    const result = calcularTransporte(items, "Manizales");
    expect(result.sede).toBe("Medellin");
    expect(result.camiones).toHaveLength(1);
    expect(result.costoTotal).toBe(500000);
    expect(result.advertencias.filter((a) => a.includes("pendiente") || a.includes("configurada"))).toHaveLength(0);
  });

  it("Case 2: 6 bathrooms + 2 lavamanos + 3 ecopoints -> 2 trucks, $1M total", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-estandar", tarifaId: "tar-std-dia", cantidad: 6 },
      { catalogItemId: "prod-lavamanos", tarifaId: "x", cantidad: 2 },
      { catalogItemId: "prod-eco", tarifaId: "x", cantidad: 3 },
    ];
    const result = calcularTransporte(items, "Manizales");
    expect(result.sede).toBe("Medellin");
    expect(result.camiones).toHaveLength(2);
    expect(result.costoTotal).toBe(1000000);
  });

  it("Case 3: items with quantity 0 are ignored", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-estandar", tarifaId: "tar-std-dia", cantidad: 0 },
    ];
    const result = calcularTransporte(items, "Manizales");
    expect(result.camiones).toHaveLength(0);
    expect(result.costoTotal).toBe(0);
  });

  it("Case 4: unknown city returns sede null and warning", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-estandar", tarifaId: "tar-std-dia", cantidad: 6 },
    ];
    const result = calcularTransporte(items, "Leticia");
    expect(result.sede).toBeNull();
    expect(result.camiones).toHaveLength(0);
    expect(result.advertencias.some((a) => a.includes("Leticia"))).toBe(true);
  });

  it("Case 5: Cali (Bogota sede) now has route cost configured -> $800K/truck", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-estandar", tarifaId: "tar-std-dia", cantidad: 6 },
    ];
    const result = calcularTransporte(items, "Cali");
    expect(result.sede).toBe("Bogota");
    expect(result.camiones).toHaveLength(1);
    expect(result.costoTotal).toBe(800000);
    expect(result.advertencias.filter((a) => a.includes("pendiente"))).toHaveLength(0);
  });

  it("Case 6: item type without transport config shows warning", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-estandar", tarifaId: "tar-std-dia", cantidad: 1 },
      { catalogItemId: "totally-unknown", tarifaId: "x", cantidad: 2 },
    ];
    const result = calcularTransporte(items, "Manizales");
    expect(result.sede).toBe("Medellin");
    expect(result.camiones).toHaveLength(1);
    expect(result.advertencias.some((a) => a.includes("no tiene capacidad"))).toBe(true);
  });

  it("Case 7: prod-accesible is transportable (like VIP/discapacitados), 3 units fill 1 truck", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-accesible", tarifaId: "tar-acc-dia", cantidad: 3 },
    ];
    const result = calcularTransporte(items, "Manizales");
    expect(result.sede).toBe("Medellin");
    expect(result.camiones).toHaveLength(1);
    expect(result.costoTotal).toBe(500000);
    expect(result.advertencias.filter((a) => a.includes("configurada"))).toHaveLength(0);
  });

  it("Case 8: prod-operarios and svc-mantenimiento are silently ignored (no warning, no trucks)", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-operarios", tarifaId: "tar-op-8h", cantidad: 4 },
      { catalogItemId: "svc-mantenimiento", tarifaId: "tar-mant-evento", cantidad: 1 },
      { catalogItemId: "prod-estandar", tarifaId: "tar-std-dia", cantidad: 6 },
    ];
    const result = calcularTransporte(items, "Manizales");
    expect(result.sede).toBe("Medellin");
    expect(result.camiones).toHaveLength(1);
    expect(result.costoTotal).toBe(500000);
    expect(result.advertencias.filter((a) => a.includes("configurada"))).toHaveLength(0);
  });

  it("Case 9: Medellin -> Rionegro route costs $200K/truck", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-estandar", tarifaId: "tar-std-dia", cantidad: 3 },
    ];
    const result = calcularTransporte(items, "Rionegro");
    expect(result.sede).toBe("Medellin");
    expect(result.camiones).toHaveLength(1);
    expect(result.costoTotal).toBe(200000);
    expect(result.advertencias).toHaveLength(0);
  });

  it("Case 10: Bogota -> Chia route costs $150K/truck", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-estandar", tarifaId: "tar-std-dia", cantidad: 6 },
    ];
    const result = calcularTransporte(items, "Chia");
    expect(result.sede).toBe("Bogota");
    expect(result.camiones).toHaveLength(1);
    expect(result.costoTotal).toBe(150000);
    expect(result.advertencias).toHaveLength(0);
  });

  it("Case 11: Bogota -> Tunja route costs $400K/truck, 2 trucks = $800K", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-estandar", tarifaId: "tar-std-dia", cantidad: 7 },
      { catalogItemId: "prod-vip", tarifaId: "tar-vip-dia", cantidad: 2 },
    ];
    const result = calcularTransporte(items, "Tunja");
    expect(result.sede).toBe("Bogota");
    expect(result.camiones).toHaveLength(2);
    expect(result.costoTotal).toBe(800000);
    expect(result.advertencias.filter((a) => a.includes("pendiente") || a.includes("configurada"))).toHaveLength(0);
  });

  it("Case 12: Medellin -> Pereira (new route) costs $550K/truck", () => {
    const items: ItemEnPaquete[] = [
      { catalogItemId: "prod-estandar", tarifaId: "tar-std-dia", cantidad: 3 },
    ];
    const result = calcularTransporte(items, "Pereira");
    expect(result.sede).toBe("Medellin");
    expect(result.camiones).toHaveLength(1);
    expect(result.costoTotal).toBe(550000);
    expect(result.advertencias).toHaveLength(0);
  });
});
