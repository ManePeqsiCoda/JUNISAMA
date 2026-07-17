import { cn } from "@/lib/utils"

type BogaCirclesSize = "s" | "m" | "l"
type BogaCirclesTone = "lima" | "electric" | "dark" | "white"

interface BogaCirclesProps {
  size?: BogaCirclesSize
  tone?: BogaCirclesTone
  className?: string
  "aria-hidden"?: boolean | "true" | "false"
}

const sizeClass: Record<BogaCirclesSize, string> = {
  s: "boga-circles--s",
  m: "boga-circles--m",
  l: "boga-circles--l",
}

const toneClass: Record<BogaCirclesTone, string> = {
  lima: "",
  electric: "boga-circles--electric",
  dark: "boga-circles--dark",
  white: "boga-circles--white",
}

/** Firma visual BOGA: 2 círculos llenos + 1 vacío (contorno) en el centro. */
export function BogaCircles({
  size = "s",
  tone = "lima",
  className,
  "aria-hidden": ariaHidden = true,
}: BogaCirclesProps) {
  return (
    <span
      className={cn("boga-circles", sizeClass[size], toneClass[tone], className)}
      aria-hidden={ariaHidden}
    >
      <span className="circle" />
      <span className="circle" />
      <span className="circle" />
    </span>
  )
}
