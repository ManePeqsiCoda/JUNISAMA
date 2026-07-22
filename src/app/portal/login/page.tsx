"use client"

import { Suspense, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useClientAuthMock } from "@/lib/auth-client-mock"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Loader2, Eye, EyeOff, Copy } from "lucide-react"

const loginSchema = z.object({
  email: z.string().min(1, "El correo es obligatorio").email("Correo invalido"),
  password: z.string().min(1, "La contrasena es obligatoria").min(6, "Minimo 6 caracteres"),
})

type LoginForm = z.infer<typeof loginSchema>

function ClientLoginForm() {
  const router = useRouter()
  const { signIn } = useClientAuthMock()
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginForm) => {
    setError("")
    try {
      const ok = await signIn(data.email, data.password)
      if (ok) {
        router.replace("/portal")
      } else {
        setError("Credenciales invalidas. Intentelo de nuevo.")
      }
    } catch {
      setError("No se pudo iniciar sesion. Intentelo de nuevo.")
    }
  }

  const autoFill = () => {
    setValue("email", "camila@weddingco.co")
    setValue("password", "cliente123")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            render={<Link href="/"><ArrowLeft className="mr-2 h-4 w-4" />Volver al inicio</Link>}
          />
        </div>
        <Card className="w-full border-border bg-card text-card-foreground shadow-xl">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-boga-electric-500 text-white font-extrabold text-xl shadow-sm">
              B
            </div>
            <h1 className="text-2xl font-extrabold uppercase tracking-wider text-foreground">
              Portal del Cliente
            </h1>
            <CardDescription className="text-muted-foreground">
              Ingresa con la contrasena que creaste al recibir tu cotizacion.
            </CardDescription>
            <div className="rounded-lg border-2 border-dashed border-boga-electric-500/30 bg-boga-electric-50/30 p-3 text-left transition-colors hover:border-boga-electric-500/50">
              <p className="text-xs font-semibold text-foreground">Acceso demo</p>
              <p className="mt-0.5 text-xs text-muted-foreground font-mono tracking-tight">
                camila@weddingco.co
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <Button
                  type="button"
                  size="xs"
                  className="bg-[var(--boga-lima-500)] text-[var(--boga-deep-500)] hover:bg-[var(--boga-lima-600)] font-semibold text-xs gap-1.5"
                  onClick={autoFill}
                >
                  <Copy className="size-3" />
                  Autocompletar
                </Button>
                <span className="text-[10px] text-muted-foreground">o escribe manualmente</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="border-error/30 bg-error-bg text-error">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">Correo electronico</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@correo.co"
                  className="h-9 border-2 border-border bg-background text-foreground placeholder:text-muted-foreground/60 transition-colors focus-visible:border-boga-electric-500 focus-visible:ring-2 focus-visible:ring-boga-electric-500/20"
                  {...register("email")}
                />
                {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">Contrasena</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="******"
                    className="h-9 border-2 border-border bg-background text-foreground placeholder:text-muted-foreground/60 transition-colors focus-visible:border-boga-electric-500 focus-visible:ring-2 focus-visible:ring-boga-electric-500/20 pr-9"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Ocultar contrasena" : "Mostrar contrasena"}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-error">{errors.password.message}</p>}
              </div>
              <Button
                type="submit"
                className="w-full h-9 bg-boga-electric-500 font-semibold text-white hover:bg-boga-electric-600 shadow-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Ingresando...</>
                ) : (
                  "Iniciar sesion"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ClientLoginPage() {
  return (
    <Suspense fallback={<div className="h-64 w-full max-w-md animate-pulse rounded-xl bg-card" />}>
      <ClientLoginForm />
    </Suspense>
  )
}
