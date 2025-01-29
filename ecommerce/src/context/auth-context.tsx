"use client"

import { createContext, useContext, useEffect, useState } from "react"
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  type User,
  signOut,
} from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      if (user) {
        Cookies.set("auth", "true", { expires: 7 })
      } else {
        Cookies.remove("auth")
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log("Login bem-sucedido:", userCredential.user.email)
      Cookies.set("auth", "true", { expires: 7 })
      router.push("/")
    } catch (error) {
      console.error("Sign in error:", error)
      throw error
    }
  }

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider())
      console.log("Login com Google bem-sucedido:", result.user.email)
      Cookies.set("auth", "true", { expires: 7 })
      router.push("/")
    } catch (error) {
      console.error("Google sign in error:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      Cookies.remove("auth")
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signInWithGoogle, logout }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
