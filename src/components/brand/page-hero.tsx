import { BogaCircles } from "@/components/brand/boga-circles"
import { BogaDecor } from "@/components/brand/boga-decor"
import { cn } from "@/lib/utils"

interface PageHeroProps {
  overline?: string
  title: string
  description?: string
  tone?: "deep" | "electric"
  className?: string
}

export function PageHero({
  overline,
  title,
  description,
  tone = "deep",
  className,
}: PageHeroProps) {
  const bg =
    tone === "electric" ? "bg-boga-electric-500" : "bg-boga-deep-500"

  return (
    <section
      className={cn(
        "relative z-0 overflow-hidden pb-20 pt-32",
        bg,
        className
      )}
    >
      <BogaDecor
        variant="waves"
        tone="lima"
        className="absolute left-6 top-24 h-10 w-24 opacity-40 md:left-10"
      />
      <BogaDecor
        variant="arrows"
        tone="lima"
        className="absolute right-6 top-28 h-16 w-16 opacity-35 md:right-12"
      />
      <BogaDecor
        variant="bars"
        tone="lima"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-30 md:left-auto md:right-16 md:translate-x-0"
      />
      <div className="container-boga relative z-10 text-center">
        {overline ? (
          <span className="mb-4 inline-flex items-center gap-2 text-caption font-bold uppercase tracking-wider text-boga-lima-500">
            <BogaCircles size="s" tone="lima" />
            {overline}
          </span>
        ) : null}
        <h1 className="text-3xl font-extrabold text-boga-text-inverted md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-boga-text-inverted/70">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  )
}
