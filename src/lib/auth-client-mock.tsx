"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

/*
 * Cliente demo para el portal:
 *   Email:    camila@weddingco.co
 *   Password: cliente123
 *
 * Credenciales fijas para la demo. Coinciden con la cotizacion demo
 * "Boda Hacienda El Retiro", cuyo cliente es Camila Restrepo.
 * En produccion, las credenciales se crearian cuando el admin envia la cotizacion
 * y el cliente establece su propia contrasena (ver Tarea 6 / PaqueteBuilder).
 */

interface ClientUser {
  id: string
  email: string
  nombre: string
  rol: "CLIENTE"
}

type AuthStatus = "loading" | "authenticated" | "unauthenticated"

interface ClientAuthMockContextValue {
  user: ClientUser | null
  status: AuthStatus
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
}

const ClientAuthMockContext = createContext<ClientAuthMockContextValue | null>(null)

const STORAGE_KEY = "boga-cliente-auth"

const DEMO_EMAIL = "camila@weddingco.co"
const DEMO_PASSWORD = "cliente123"

const MOCK_CLIENT: ClientUser = {
  id: "cli_usr_1",
  email: DEMO_EMAIL,
  nombre: "Camila Restrepo",
  rol: "CLIENTE",
}

export function ClientAuthMockProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ClientUser | null>(null)
  const [status, setStatus] = useState<AuthStatus>("loading")

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored === "1") {
        setUser(MOCK_CLIENT)
        setStatus("authenticated")
        return
      }
    } catch {
      // sessionStorage puede fallar en modo privado estricto
    }
    setStatus("unauthenticated")
  }, [])

  const signIn = async (email: string, password: string) => {
    const ok =
      email.trim().toLowerCase() === DEMO_EMAIL &&
      password === DEMO_PASSWORD

    if (ok) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1")
      } catch {
        // continuar aunque no se pueda persistir
      }
      setUser({ ...MOCK_CLIENT, email })
      setStatus("authenticated")
      return true
    }
    return false
  }

  const signOut = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    setUser(null)
    setStatus("unauthenticated")
  }

  return (
    <ClientAuthMockContext.Provider value={{ user, status, signIn, signOut }}>
      {children}
    </ClientAuthMockContext.Provider>
  )
}

export function useClientAuthMock() {
  const ctx = useContext(ClientAuthMockContext)
  if (!ctx) {
    throw new Error("useClientAuthMock must be used within ClientAuthMockProvider")
  }
  return ctx
}
