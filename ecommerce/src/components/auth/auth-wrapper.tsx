"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      console.log("Usuário não autenticado, redirecionando para /login")
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}

