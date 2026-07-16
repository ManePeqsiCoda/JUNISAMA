"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "light" | "dark"
  className?: string
  showTagline?: boolean
}

export function Logo({ variant = "light", className, showTagline = true }: LogoProps) {
  const isDark = variant === "dark"

  return (
    <a
      href="/"
      className={cn("inline-flex items-center gap-2.5 group", className)}
      aria-label="Junisama Inversiones S.A.S - Inicio"
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="8" fill={isDark ? "#0F1923" : "#0F1923"} />
        <path d="M20 8L32 32H8L20 8Z" fill="#E85D24" />
        <path d="M20 14L28 30H12L20 14Z" fill="#C9A84C" />
      </svg>
      <div className="flex flex-col">
        <span
          className={cn(
            "font-outfit text-lg font-bold leading-tight tracking-tight",
            isDark ? "text-white" : "text-secondary-800"
          )}
        >
          JUNISAMA
        </span>
        {showTagline && (
          <span
            className={cn(
              "font-space-grotesk text-[0.6rem] leading-tight tracking-[0.12em] uppercase",
              isDark ? "text-neutral-400" : "text-neutral-500"
            )}
          >
            Inversiones S.A.S
          </span>
        )}
      </div>
    </a>
  )
}
