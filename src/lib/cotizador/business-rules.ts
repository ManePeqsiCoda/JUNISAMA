export const EVENTO_GRANDE_ASISTENTES = 500;

export const EVENTO_GRANDE_UNIDADES = 15;

export const OBRA_DURACION_MINIMA_DIAS = 30;

export function esEventoGrande(
  asistentes: number | undefined,
  totalUnidades: number
): boolean {
  return (asistentes ?? 0) >= EVENTO_GRANDE_ASISTENTES || totalUnidades >= EVENTO_GRANDE_UNIDADES;
}
