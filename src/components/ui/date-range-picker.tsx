"use client"

import * as React from "react"
import { format, isValid, parseISO, startOfDay } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Check } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"

export type EventDateRange = {
  from?: string
  to?: string
}

interface DateRangePickerProps {
  id?: string
  value: EventDateRange
  onChange: (value: EventDateRange) => void
  disabled?: boolean
  className?: string
  "aria-invalid"?: boolean | "true" | "false"
}

function toDate(value?: string) {
  if (!value?.trim()) return undefined
  const date = parseISO(value)
  return isValid(date) ? date : undefined
}

function toIso(date?: Date) {
  if (!date || !isValid(date)) return undefined
  return format(date, "yyyy-MM-dd")
}

function formatDisplay(value?: string) {
  const date = toDate(value)
  if (!date) return ""
  return format(date, "dd/MM/yyyy")
}

export function DateRangePicker({
  id,
  value,
  onChange,
  disabled,
  className,
  "aria-invalid": ariaInvalid,
}: DateRangePickerProps) {
  const hasCompleteRange = Boolean(value.from && value.to)
  const [open, setOpen] = React.useState(!hasCompleteRange)
  const [months, setMonths] = React.useState(2)

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)")
    const update = () => setMonths(mq.matches ? 2 : 1)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const fromDate = toDate(value.from)
  const toDateValue = toDate(value.to)

  const selected: DateRange | undefined = React.useMemo(() => {
    if (!fromDate && !toDateValue) return undefined
    return { from: fromDate, to: toDateValue }
  }, [fromDate, toDateValue])

  const handleSelect = (range: DateRange | undefined) => {
    if (!range?.from) {
      onChange({ from: undefined, to: undefined })
      return
    }

    if (range.from && !range.to) {
      onChange({ from: toIso(range.from), to: undefined })
      return
    }

    onChange({
      from: toIso(range.from),
      to: toIso(range.to),
    })
  }

  const handleConfirm = () => {
    if (!fromDate || !toDateValue) return
    setOpen(false)
  }

  const today = startOfDay(new Date())
  const invalid = ariaInvalid === true || ariaInvalid === "true"
  const canConfirm = Boolean(fromDate && toDateValue)

  return (
    <div id={id} className={cn("space-y-3", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className={cn(
          "grid w-full gap-2 rounded-xl border bg-transparent p-2 text-left transition-colors sm:grid-cols-2",
          invalid ? "border-destructive" : "border-input",
          "hover:border-boga-lima-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-boga-lima-500/50",
          disabled && "pointer-events-none opacity-50"
        )}
      >
        <div className="space-y-1 px-1">
          <span className="text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground">
            Inicio
          </span>
          <div
            className={cn(
              "flex h-8 items-center gap-2 text-sm",
              !value.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="size-3.5 shrink-0 text-muted-foreground" />
            {formatDisplay(value.from) || "dd/mm/aaaa"}
          </div>
        </div>
        <div className="space-y-1 px-1">
          <span className="text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground">
            Fin
          </span>
          <div
            className={cn(
              "flex h-8 items-center gap-2 text-sm",
              !value.to && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="size-3.5 shrink-0 text-muted-foreground" />
            {formatDisplay(value.to) || "dd/mm/aaaa"}
          </div>
        </div>
      </button>

      {open && (
        <div
          className={cn(
            "overflow-hidden rounded-xl border border-input bg-background",
            invalid && "border-destructive",
            disabled && "pointer-events-none opacity-50"
          )}
        >
          <div className="overflow-x-auto p-1">
            <Calendar
              mode="range"
              numberOfMonths={months}
              locale={es}
              selected={selected}
              onSelect={handleSelect}
              defaultMonth={fromDate ?? today}
              disabled={{ before: today }}
              required={false}
            />
          </div>

          <div className="flex flex-col gap-2 border-t border-input px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              {!fromDate &&
                "Elige primero el día de inicio y luego el de fin."}
              {fromDate &&
                !toDateValue &&
                "Ahora elige la fecha de fin del evento."}
              {canConfirm &&
                `${formatDisplay(value.from)} — ${formatDisplay(value.to)}`}
            </p>
            <Button
              type="button"
              size="sm"
              disabled={!canConfirm}
              onClick={handleConfirm}
              className="shrink-0 bg-boga-lima-500 text-boga-text-on-lima hover:bg-boga-lima-400"
            >
              <Check className="size-3.5" />
              Confirmar fechas
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
