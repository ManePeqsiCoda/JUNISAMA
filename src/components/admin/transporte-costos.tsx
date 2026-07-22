"use client";

import { useMemo, useState } from "react";
import { Truck, ChevronDown, ChevronRight, AlertTriangle } from "lucide-react";
import { formatCOP } from "@/lib/cotizador/calc";
import { calcularTransporte } from "@/lib/cotizador/transporte";
import type { ItemEnPaquete } from "@/types/cotizador-boga";
import { TRANSPORT_ITEM_LABELS } from "@/lib/cotizador/transport-config";
import type { Camion } from "@/lib/cotizador/transporte";

interface TransporteCostosProps {
  items: ItemEnPaquete[];
  ciudad: string | undefined;
}

export function TransporteCostos({ items, ciudad }: TransporteCostosProps) {
  const [expandido, setExpandido] = useState(false);

  const resultado = useMemo(
    () => calcularTransporte(items, ciudad),
    [items, ciudad]
  );

  if (!resultado.sede && resultado.camiones.length === 0 && resultado.advertencias.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-3">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setExpandido((p) => !p)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setExpandido((p) => !p); }}
      >
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Transporte
          </span>
          {resultado.sede && resultado.costoTotal > 0 && (
            <span className="text-xs font-bold text-foreground">
              {formatCOP(resultado.costoTotal)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {resultado.sede && (
            <span className="text-[10px] text-muted-foreground">
              {resultado.camiones.length} camion(es) desde {resultado.sede}
            </span>
          )}
          {expandido ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
        </div>
      </div>

      {resultado.advertencias.length > 0 && (
        <div className="space-y-1">
          {resultado.advertencias.map((adv, i) => (
            <div key={i} className="flex items-start gap-1.5 rounded bg-amber-500/10 px-2 py-1">
              <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
              <span className="text-[11px] leading-tight text-amber-600">{adv}</span>
            </div>
          ))}
        </div>
      )}

      {expandido && resultado.camiones.length > 0 && (
        <div className="space-y-2 border-t border-border pt-2">
          {resultado.camiones.map((camion, i) => (
            <CamionRow key={i} index={i} camion={camion} />
          ))}
          {resultado.sede && resultado.costoTotal > 0 && (
            <div className="flex justify-between border-t border-border pt-1.5 text-xs font-bold text-foreground">
              <span>Costo total transporte</span>
              <span>{formatCOP(resultado.costoTotal)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CamionRow({ index, camion }: { index: number; camion: Camion }) {
  return (
    <div className="rounded bg-background px-2 py-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-foreground">
          Camion #{index + 1}
        </span>
        <span className="text-[10px] text-muted-foreground">
          {camion.espacio_usado}/{30} slots usados
        </span>
      </div>
      <div className="mt-0.5 flex flex-wrap gap-1">
        {Object.entries(agruparItems(camion.items)).map(([id, cant]) => (
          <span
            key={id}
            className="rounded-full bg-primary/5 px-1.5 py-0.5 text-[10px] text-muted-foreground"
          >
            {TRANSPORT_ITEM_LABELS[id] ?? id} x{cant}
          </span>
        ))}
      </div>
    </div>
  );
}

function agruparItems(items: { catalogItemId: string }[]): Record<string, number> {
  const agrupado: Record<string, number> = {};
  for (const it of items) {
    agrupado[it.catalogItemId] = (agrupado[it.catalogItemId] ?? 0) + 1;
  }
  return agrupado;
}
