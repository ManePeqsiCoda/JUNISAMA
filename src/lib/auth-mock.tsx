"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { verifyAdminCredentials } from "@/lib/auth"
import { siteConfig } from "@/lib/site"

interface MockUser {
  id: string
  email: string
  name: string
  role: "ADMIN"
}

type AuthStatus = "loading" | "authenticated" | "unauthenticated"

interface AuthMockContextValue {
  user: MockUser | null
  status: AuthStatus
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
}

const AuthMockContext = createContext<AuthMockContextValue | null>(null)

const STORAGE_KEY = "boga-admin-auth"

const MOCK_USER: MockUser = {
  id: "usr_1",
  email: siteConfig.admin.email,
  name: "Administrador BOGA",
  role: "ADMIN",
}

export function AuthMockProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null)
  const [status, setStatus] = useState<AuthStatus>("loading")

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored === "1") {
        setUser(MOCK_USER)
        setStatus("authenticated")
        return
      }
    } catch {
      // sessionStorage puede fallar en modo privado estricto
    }
    setStatus("unauthenticated")
  }, [])

  const signIn = async (email: string, password: string) => {
    const ok = verifyAdminCredentials(email, password)

    if (ok) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1")
      } catch {
        // continuar aunque no se pueda persistir
      }
      setUser({ ...MOCK_USER, email })
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
    <AuthMockContext.Provider value={{ user, status, signIn, signOut }}>
      {children}
    </AuthMockContext.Provider>
  )
}

export function useAuthMock() {
  const ctx = useContext(AuthMockContext)
  if (!ctx) {
    throw new Error("useAuthMock must be used within AuthMockProvider")
  }
  return ctx
}
