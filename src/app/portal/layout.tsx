"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { ClientAuthMockProvider, useClientAuthMock } from "@/lib/auth-client-mock"
import { Button } from "@/components/ui/button"
import { Loader2, LogOut, Building2 } from "lucide-react"
import Link from "next/link"

function PortalLayoutInner({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, status, signOut } = useClientAuthMock()

  const isLoginPage = pathname === "/portal/login"

  useEffect(() => {
    if (status === "unauthenticated" && !isLoginPage) {
      router.replace("/portal/login")
    }
    if (status === "authenticated" && isLoginPage) {
      router.replace("/portal")
    }
  }, [status, isLoginPage, router])

  if (isLoginPage) {
    return <>{children}</>
  }

  if (status === "loading" || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header simple para el portal del cliente */}
      <header className="sticky top-0 z-40 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link
            href="/portal"
            className="flex items-center gap-2 font-semibold text-foreground"
          >
            <Building2 className="h-5 w-5 text-boga-electric-500" />
            <span>BOGA — Portal del Cliente</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {user.nombre}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                signOut()
                router.replace("/portal/login")
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientAuthMockProvider>
      <PortalLayoutInner>{children}</PortalLayoutInner>
    </ClientAuthMockProvider>
  )
}
