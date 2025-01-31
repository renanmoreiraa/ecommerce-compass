import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/ui/form"
import { useAuth } from "~/context/auth-context"
import { Lock, Mail } from "lucide-react"
import { Input } from "~/ui/input"
import { Button } from "~/ui/button"
import { Link } from "react-router"
import Google from "~/icons/google.svg"

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const [error, setError] = React.useState("")
    const { signIn, signInWithGoogle } = useAuth()

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setError("")
        await signIn(values.email, values.password).catch((error) => {
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

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            className="border-transparent bg-white p-6 pl-10 text-white placeholder:text-gray-400"
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            className="border-transparent bg-white p-6 pl-10 text-white placeholder:text-gray-400"
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    {mode === "signin" ? (
                        <div className="-mt-2">
                            <Button
                                asChild
                                variant={"link"}
                                className="text-sm text-white"
                            >
                                <Link to="/forgot-password">
                                    Forgot Password
                                </Link>
                            </Button>
                        </div>
                    ) : null}

                    <Button
                        type="submit"
                        className="bg-primary hover:bg-primary/90 w-full p-6 font-semibold text-white"
                    >
                        {mode === "signin" ? "Sign In" : "Sign Up"}
                    </Button>

                    <Button
                        type="button"
                        onClick={handleGoogleSignIn}
                        variant="link"
                        className="p-6 text-white"
                    >
                        <Google />
                        {mode === "signin"
                            ? "Sign in with Google"
                            : "Sign up with Google"}
                    </Button>
                </form>
            </Form>

            <div className="mt-auto">
                <p className="text-sm text-gray-300">
                    {mode === "signin"
                        ? "Didn't have any account?"
                        : "If you have an account?"}{" "}
                    <Link
                        to={mode === "signin" ? "/signup" : "/signin"}
                        className="text-[#00FF90] hover:underline"
                    >
                        {mode === "signin" ? "Sign up" : "Sign in"} here
                    </Link>
                </p>
            </div>
        </div>
    )
}
