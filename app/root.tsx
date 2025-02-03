import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import React from "react"
import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    redirect,
    Scripts,
    ScrollRestoration,
} from "react-router"
import { AuthProvider } from "~/contexts/auth-context"
import { isAuthed } from "~/lib/utils"
import { LoadingSpinner } from "~/components/loading-spinner"
import type { Route } from "./+types/root"
import "./root.css"

export const links: Route.LinksFunction = () => [
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
]

export function meta(_: Route.MetaArgs) {
    return [
        { title: "Audio" },
        { name: "description", content: "It's modular and designed to last" },
    ]
}

export async function clientLoader(args: Route.ClientLoaderArgs) {
    const url = new URL(args.request.url)

    if (url.pathname === "/signin" || url.pathname === "/signup") {
        return null
    }

    const authed = await isAuthed()
    if (!authed) {
        return redirect("/signin")
    }

    return null
}

export function Layout({ children }: { children: React.ReactNode }) {
    const [queryClient] = React.useState(() => new QueryClient())

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <AuthProvider>
                    <QueryClientProvider client={queryClient}>
                        {children}
                        <ScrollRestoration />
                        <Scripts />
                    </QueryClientProvider>
                </AuthProvider>
            </body>
        </html>
    )
}

export default function App() {
    return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!"
    let details = "An unexpected error occurred."
    let stack: string | undefined

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error"
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message
        stack = error.stack
    }

    return (
        <main className="container mx-auto p-4 pt-16">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full overflow-x-auto p-4">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    )
}

export function HydrateFallback() {
    return <LoadingSpinner />
}
