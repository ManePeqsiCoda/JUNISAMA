"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  formatPrecioPublico,
  labelUnidadPublica,
} from "@/lib/cotizador/public-pricing"

const STORAGE_KEY = "boga-hide-prices"

type PriceVisibilityContextValue = {
  pricesHidden: boolean
  togglePrices: () => void
  setPricesHidden: (hidden: boolean) => void
}

const PriceVisibilityContext =
  React.createContext<PriceVisibilityContextValue | null>(null)

export function PriceVisibilityProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [pricesHidden, setPricesHiddenState] = React.useState(false)
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    try {
      setPricesHiddenState(localStorage.getItem(STORAGE_KEY) === "1")
    } catch {
      /* ignore */
    }
    setReady(true)
  }, [])

  const setPricesHidden = React.useCallback((hidden: boolean) => {
    setPricesHiddenState(hidden)
    try {
      localStorage.setItem(STORAGE_KEY, hidden ? "1" : "0")
    } catch {
      /* ignore */
    }
  }, [])

  const togglePrices = React.useCallback(() => {
    setPricesHidden(!pricesHidden)
  }, [pricesHidden, setPricesHidden])

  const value = React.useMemo(
    () => ({ pricesHidden: ready ? pricesHidden : false, togglePrices, setPricesHidden }),
    [pricesHidden, ready, togglePrices, setPricesHidden]
  )

  return (
    <PriceVisibilityContext.Provider value={value}>
      {children}
    </PriceVisibilityContext.Provider>
  )
}

export function usePriceVisibility() {
  const ctx = React.useContext(PriceVisibilityContext)
  if (!ctx) {
    return {
      pricesHidden: false,
      togglePrices: () => {},
      setPricesHidden: () => {},
    }
  }
  return ctx
}

interface PriceVisibilityToggleProps {
  className?: string
  /** Etiqueta visible junto al icono */
  showLabel?: boolean
  size?: "sm" | "md"
}

/** Botón ojito para ocultar/mostrar precios (prototipo / demos a cliente). */
export function PriceVisibilityToggle({
  className,
  showLabel = false,
  size = "md",
}: PriceVisibilityToggleProps) {
  const { pricesHidden, togglePrices } = usePriceVisibility()

  return (
    <button
      type="button"
      onClick={togglePrices}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border border-boga-border-default bg-boga-surface-elevated font-medium text-boga-text-secondary transition-colors hover:border-boga-electric-500/40 hover:text-boga-electric-500",
        size === "sm" ? "px-2 py-1 text-xs" : "px-2.5 py-1.5 text-sm",
        className
      )}
      aria-pressed={pricesHidden}
      aria-label={
        pricesHidden ? "Mostrar precios" : "Ocultar precios para presentación"
      }
      title={
        pricesHidden
          ? "Mostrar precios"
          : "Ocultar precios (útil para mostrar al cliente)"
      }
    >
      {pricesHidden ? (
        <EyeOff
          className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"}
          aria-hidden="true"
        />
      ) : (
        <Eye
          className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"}
          aria-hidden="true"
        />
      )}
      {showLabel && (
        <span>{pricesHidden ? "Mostrar precios" : "Ocultar precios"}</span>
      )}
    </button>
  )
}

interface PriceDisplayProps {
  amount: number | null | undefined
  className?: string
  /** Precio tachado (lista) cuando hay descuento */
  compareAt?: number | null
  unidadMedida?: string
  size?: "sm" | "md" | "lg"
  /** Texto cuando no hay precio */
  emptyLabel?: string
}

export function PriceDisplay({
  amount,
  className,
  compareAt,
  unidadMedida,
  size = "md",
  emptyLabel = "Consultar",
}: PriceDisplayProps) {
  const { pricesHidden } = usePriceVisibility()
  const unit = unidadMedida ? labelUnidadPublica(unidadMedida) : ""

  if (amount == null || Number.isNaN(amount)) {
    return (
      <span className={cn("text-boga-text-tertiary", className)}>
        {emptyLabel}
      </span>
    )
  }

  if (pricesHidden) {
    return null
  }

  const showCompare =
    compareAt != null && compareAt > amount && !Number.isNaN(compareAt)

  return (
    <span
      className={cn(
        "inline-flex flex-wrap items-center gap-x-2 gap-y-0.5",
        className
      )}
    >
      {showCompare && (
        <span
          className={cn(
            "font-medium text-boga-text-tertiary line-through",
            size === "lg" && "text-base",
            size === "sm" && "text-xs"
          )}
        >
          {formatPrecioPublico(compareAt)}
        </span>
      )}
      <span
        className={cn(
          "font-bold text-boga-electric-500",
          size === "lg" && "text-2xl",
          size === "md" && "text-base",
          size === "sm" && "text-sm"
        )}
      >
        {formatPrecioPublico(amount)}
        {unit ? (
          <span className="ml-1 text-xs font-medium text-boga-text-tertiary">
            {unit}
          </span>
        ) : null}
      </span>
    </span>
  )
}
