import { useState } from "react"
import { Link } from "react-router"
import { Mail, Lock } from "lucide-react"
import { Button } from "~/ui/button"
import { Input } from "~/ui/input"
import { useAuth } from "~/context/auth-context"

export function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { signIn, signInWithGoogle } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        await signIn(email, password).catch((error) => {
            console.error("Login error:", error)
            setError("Invalid email or password")
        })
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
                <p className="text-gray-300">
                    It's modular and designed to last
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-transparent bg-white/10 pl-10 text-white placeholder:text-gray-400"
                        required
                    />
                </div>

                <div className="relative">
                    <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-transparent bg-white/10 pl-10 text-white placeholder:text-gray-400"
                        required
                    />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <div className="text-right">
                    <Link
                        to="/forgot-password"
                        className="text-sm text-gray-300 hover:text-white"
                    >
                        Forgot Password
                    </Link>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-[#00FF90] font-semibold text-black hover:bg-[#00FF90]/90"
                >
                    Sign In
                </Button>
            </form>

            <div className="space-y-4">
                <Button
                    type="button"
                    onClick={handleGoogleSignIn}
                    variant="outline"
                    className="w-full space-x-2 border-transparent bg-white/10 text-white hover:bg-white/20"
                >
                    <img
                        src="/google.svg"
                        alt="Google"
                        width={20}
                        height={20}
                        className="mr-2"
                    />
                    Sign in with Google
                </Button>

                <p className="text-gray-300">
                    Didn't have any account?{" "}
                    <Link
                        to="/signup"
                        className="text-[#00FF90] hover:underline"
                    >
                        Sign Up here
                    </Link>
                </p>
            </div>
        </div>
    )
}
