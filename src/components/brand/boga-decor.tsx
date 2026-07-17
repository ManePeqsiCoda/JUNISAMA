import { cn } from "@/lib/utils"

type DecorVariant = "waves" | "arrows" | "bars" | "bubbles"
type DecorTone = "lima" | "electric" | "white" | "deep"

interface BogaDecorProps {
  variant: DecorVariant
  tone?: DecorTone
  className?: string
}

const toneFill: Record<DecorTone, string> = {
  lima: "#daf73a",
  electric: "#2c4df2",
  white: "#ffffff",
  deep: "#1b1341",
}

export function BogaDecor({
  variant,
  tone = "lima",
  className,
}: BogaDecorProps) {
  const fill = toneFill[tone]

  if (variant === "waves") {
    return (
      <svg
        viewBox="0 0 120 48"
        fill="none"
        className={cn("boga-waves pointer-events-none", className)}
        aria-hidden="true"
      >
        <path
          d="M0 12 C20 4, 40 20, 60 12 S100 4, 120 12"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M0 24 C20 16, 40 32, 60 24 S100 16, 120 24"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M0 36 C20 28, 40 44, 60 36 S100 28, 120 36"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    )
  }

  if (variant === "arrows") {
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className={cn("boga-arrows pointer-events-none", className)}
        aria-hidden="true"
      >
        <path
          d="M12 44 L32 12 L52 44"
          stroke={fill}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.35"
        />
        <path
          d="M18 48 L32 26 L46 48"
          stroke={fill}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
        <path
          d="M24 52 L32 40 L40 52"
          stroke={fill}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (variant === "bars") {
    return (
      <div
        className={cn("boga-bars pointer-events-none flex flex-col gap-2", className)}
        aria-hidden="true"
      >
        <span
          className="block h-2 w-16 rounded-sm"
          style={{ backgroundColor: fill }}
        />
        <span
          className="block h-2 w-10 rounded-sm self-end"
          style={{ backgroundColor: fill, opacity: 0.75 }}
        />
      </div>
    )
  }

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={cn("boga-bubbles pointer-events-none", className)}
      aria-hidden="true"
    >
      <circle cx="40" cy="50" r="28" stroke={fill} strokeWidth="1.5" opacity="0.25" />
      <circle cx="120" cy="40" r="18" stroke={fill} strokeWidth="1.5" opacity="0.2" />
      <circle cx="160" cy="100" r="36" stroke={fill} strokeWidth="1.5" opacity="0.18" />
      <circle cx="70" cy="140" r="22" stroke={fill} strokeWidth="1.5" opacity="0.22" />
      <circle cx="140" cy="160" r="14" stroke={fill} strokeWidth="1.5" opacity="0.28" />
    </svg>
  )
}

/** Fondo partido diagonal azul eléctrico / amarillo lima. */
export function BogaDiagonal({ className }: { className?: string }) {
  return (
    <div
      className={cn("boga-diagonal absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-boga-electric-500" />
      <div
        className="absolute inset-0 bg-boga-lima-500"
        style={{
          clipPath: "polygon(55% 0, 100% 0, 100% 100%, 35% 100%)",
        }}
      />
    </div>
  )
}
