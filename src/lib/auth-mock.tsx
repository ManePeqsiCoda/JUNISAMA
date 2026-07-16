"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface MockUser {
  id: string
  email: string
  name: string
  role: "ADMIN"
}

interface AuthMockContextValue {
  user: MockUser | null
  status: "authenticated" | "unauthenticated"
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
}

const AuthMockContext = createContext<AuthMockContextValue | null>(null)

const MOCK_USER: MockUser = {
  id: "usr_1",
  email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || "",
  name: "Administrador Junisama",
  role: "ADMIN",
}

export function AuthMockProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null)
  const [status, setStatus] = useState<"authenticated" | "unauthenticated">(
    "unauthenticated"
  )

  const signIn = async (email: string, password: string) => {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

    if (
      adminEmail &&
      adminPassword &&
      email.trim().toLowerCase() === adminEmail.trim().toLowerCase() &&
      password === adminPassword
    ) {
      setUser(MOCK_USER)
      setStatus("authenticated")
      return true
    }
    return false
  }

  const signOut = () => {
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
