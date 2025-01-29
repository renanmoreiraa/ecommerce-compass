"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { signIn, signInWithGoogle } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      await signIn(email, password)
      console.log("Redirecionando após login bem-sucedido")
      router.push("/")
    } catch (error) {
      console.error("Login error:", error)
      setError("Invalid email or password")
    }
  }

  const handleGoogleSignIn = async () => {
    setError("")
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error("Google sign in error:", error)
      setError("Failed to sign in with Google")
    }
  }

  return (
    <div className="relative z-10 w-full max-w-md space-y-8 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-white">Audio</h1>
        <p className="text-gray-300">It's modular and designed to last</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 bg-white/10 border-transparent text-white placeholder:text-gray-400"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 bg-white/10 border-transparent text-white placeholder:text-gray-400"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="text-right">
          <Link href="/forgot-password" className="text-sm text-gray-300 hover:text-white">
            Forgot Password
          </Link>
        </div>

        <Button type="submit" className="w-full bg-[#00FF90] hover:bg-[#00FF90]/90 text-black font-semibold">
          Sign In
        </Button>
      </form>

      <div className="space-y-4">
        <Button
          type="button"
          onClick={handleGoogleSignIn}
          variant="outline"
          className="w-full bg-white/10 border-transparent hover:bg-white/20 text-white space-x-2"
        >
          <Image src="/google.svg" alt="Google" width={20} height={20} className="mr-2" />
          Sign in with Google
        </Button>

        <p className="text-gray-300">
          Didn't have any account?{" "}
          <Link href="/signup" className="text-[#00FF90] hover:underline">
            Sign Up here
          </Link>
        </p>
      </div>
    </div>
  )
}

