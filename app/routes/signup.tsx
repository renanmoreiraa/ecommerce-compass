import { AuthForm } from "~/components/auth-form"

export default function SignupPage() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage:
                        "url('assets/background-signup-signin.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <AuthForm mode="signup" />
        </div>
    )
}
