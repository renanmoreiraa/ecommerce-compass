import Image from "next/image"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/00%20%20Auth%20-%20Sign%20In-H7NrlszVd4JBlIM5gLidF5I2pgt2Nu.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-[#0B4E3B]/90" />

      <LoginForm />
    </div>
  )
}

