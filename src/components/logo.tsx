"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "light" | "dark"
  className?: string
  showTagline?: boolean
}

/** Marca BOGA oficial (`public/LogoBOGA.svg`). */
function BogaIsotype({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG de marca local; Image no aporta aquí
    <img
      src="/LogoBOGA.svg"
      alt=""
      width={54}
      height={40}
      className={cn(
        "h-10 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105",
        className
      )}
      aria-hidden="true"
    />
  )
}

export function Logo({ variant = "light", className, showTagline = true }: LogoProps) {
  const isDark = variant === "dark"

  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3 py-1", className)}
      aria-label="BOGA - Ingeniería Portátil - Inicio"
    >
      <BogaIsotype />
      <div className="flex flex-col">
        <span
          className={cn(
            "font-sans text-lg font-black leading-none tracking-tight",
            isDark ? "text-white" : "text-[#1b1341]"
          )}
        >
          BOGA
        </span>
        {/* Barra lima distintiva del brand kit */}
        <span
          className="mt-1 block h-[3px] w-[3.25rem] rounded-full bg-[#daf73a]"
          aria-hidden="true"
        />
        {showTagline && (
          <span
            className={cn(
              "mt-1 font-sans text-[0.55rem] font-light uppercase leading-tight tracking-[0.28em]",
              isDark ? "text-white/80" : "text-[#1b1341]/80"
            )}
          >
            Ingeniería Portátil
          </span>
        )}
      </div>
    </Link>
  )
}

export { BogaIsotype }
