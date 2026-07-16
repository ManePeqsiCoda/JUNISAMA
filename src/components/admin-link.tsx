import Link from "next/link"
import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminLinkProps {
  className?: string
}

export function AdminLink({ className }: AdminLinkProps) {
  return (
    <Link
      href="/admin/login"
      className={cn(
        "inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-300 transition-colors",
        className
      )}
      aria-label="Acceso administrativo"
      title="Acceso administrativo"
    >
      <Lock className="h-3 w-3" aria-hidden="true" />
      <span className="text-xs">Acceso administrativo</span>
    </Link>
  )
}
