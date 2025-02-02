import { usePrefetchQuery } from "@tanstack/react-query"
import Logo from "~/icons/logo.svg"
import { ArrowLeft, Menu, ShoppingCart } from "lucide-react"
import React from "react"
import { Outlet, useLocation, useNavigate } from "react-router"
import { LoadingSpinner } from "~/components/loading-spinner"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Api } from "~/lib/api"
import { AuthContext } from "./auth-context"
import { getNameInitials } from "~/lib/utils"

interface HeaderProps {
    left: React.ReactNode | null
    center: React.ReactNode | null
    right: React.ReactNode | null
}

const useHeaderConfig = (pathname: string): HeaderProps => {
    const navigate = useNavigate()
    const { user } = React.use(AuthContext)!

    switch (pathname) {
        case "/":
            return {
                right: (
                    <Avatar>
                        <AvatarImage src={user!.photoURL ?? undefined} />
                        <AvatarFallback>{getNameInitials(user!.displayName)}</AvatarFallback>
                    </Avatar>
                ),
                center: (
                    <div className="flex items-center gap-2">
                        <Logo />
                        <h1 className="text-lg font-bold">Audio</h1>
                    </div>
                ),
                left: (
                    <button className="cursor-pointer">
                        <Menu size={16} />
                    </button>
                ),
            }
        case "/search":
            return {
                left: (
                    <button onClick={() => navigate(-1)}>
                        <ArrowLeft size={16} />
                    </button>
                ),
                center: <h1 className="text-lg font-semibold">Search</h1>,
                right: (
                    <button>
                        <ShoppingCart size={16} />
                    </button>
                ),
            }
        case pathname.startsWith("/products") ? pathname : "":
            return {
                left: (
                    <button onClick={() => navigate(-1)}>
                        <ArrowLeft size={16} />
                    </button>
                ),
                center: null,
                right: (
                    <button>
                        <ShoppingCart size={16} />
                    </button>
                ),
            }
        default:
            return {
                left: null,
                center: null,
                right: null,
            }
    }
}

export default function AuthedLayout() {
    const location = useLocation()
    const config = useHeaderConfig(location.pathname)
    usePrefetchQuery({ queryKey: ["products"], queryFn: Api.getProducts })

    return (
        <React.Suspense fallback={<LoadingSpinner />}>
            <main className="min-h-screen w-full bg-white">
                <header className="flex max-h-20 min-h-20 items-center justify-between p-4">
                    {config.left}
                    {config.center}
                    {config.right}
                </header>
                <Outlet />
            </main>
        </React.Suspense>
    )
}
