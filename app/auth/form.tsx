import { useState } from "react"
import { Link } from "react-router"
import { Mail, Lock } from "lucide-react"
import { Button } from "~/ui/button"
import { Input } from "~/ui/input"
import { useAuth } from "~/context/auth-context"
import GoogleIcon from "~/icons/google.svg"

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
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
        <div className="relative z-10 flex h-[80dvh] w-full flex-col justify-center gap-8 p-8 text-center">
            <div className="mb-auto w-full space-y-2">
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
                        className="border-transparent bg-white p-6 pl-10 text-white placeholder:text-gray-400"
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
                        className="border-transparent bg-white p-6 pl-10 text-white placeholder:text-gray-400"
                        required
                    />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                {mode === "signin" ? (
                    <div className="-mt-2">
                        <Button
                            asChild
                            variant={"link"}
                            className="text-sm text-white"
                        >
                            <Link to="/forgot-password">Forgot Password</Link>
                        </Button>
                    </div>
                ) : null}

                <Button
                    type="submit"
                    className="p-6 bg-primary hover:bg-primary/90 w-full font-semibold text-white"
                >
                    {mode === "signin" ? "Sign In" : "Sign Up"}
                </Button>

                <Button
                    type="button"
                    onClick={handleGoogleSignIn}
                    variant="link"
                    className="p-6 text-white"
                >
                    <GoogleIcon />
                    {mode === "signin"
                        ? "Sign in with Google"
                        : "Sign up with Google"}
                </Button>
            </form>
            <div className="mt-auto">
                <p className="text-sm text-gray-300">
                    {mode === "signin"
                        ? "Didn't have any account?"
                        : "If you have an account?"}{" "}
                    <Link
                        to="/signup"
                        className="text-[#00FF90] hover:underline"
                    >
                        {mode === "signin" ? "Sign up" : "Sign in"} here
                    </Link>
                </p>
            </div>
        </div>
    )
}
