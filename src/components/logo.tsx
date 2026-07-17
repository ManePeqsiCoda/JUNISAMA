"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "light" | "dark"
  className?: string
  showTagline?: boolean
}

/** Isotipo BOGA: B orgánica sobre lima con iconos baño azul eléctrico. */
function BogaIsotype({ className }: { className?: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 transition-transform duration-300 group-hover:scale-105", className)}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="8" fill="#daf73a" />
      {/* Contorno B orgánica */}
      <path
        d="M10 8h12c5.5 0 9 3.2 9 8 0 2.8-1.4 5-3.6 6.2C30.2 23.6 32 26.2 32 30c0 5.2-4 8-10 8H10V8z"
        fill="#2c4df2"
      />
      {/* Hueco interior estilo B */}
      <path
        d="M16 13h5.5c2.4 0 3.8 1.3 3.8 3.2S23.9 19.4 21.5 19.4H16V13zm0 9.4h6c2.6 0 4.2 1.4 4.2 3.6 0 2.3-1.6 3.7-4.2 3.7H16v-7.3z"
        fill="#daf73a"
      />
      {/* Figuras baño */}
      <circle cx="18.2" cy="21" r="1.35" fill="#2c4df2" />
      <path
        d="M16.6 23.1h3.2v4.2h-1.05v-2.4h-1.1v2.4H16.6v-4.2z"
        fill="#2c4df2"
      />
      <line
        x1="21.5"
        y1="19.5"
        x2="21.5"
        y2="27.5"
        stroke="#2c4df2"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <circle cx="24.8" cy="21" r="1.35" fill="#2c4df2" />
      <path
        d="M23.2 23.1h3.2l-.35 4.2h-1.05l.15-2.1h-.85l.15 2.1h-1.05l-.35-4.2z"
        fill="#2c4df2"
      />
    </svg>
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
