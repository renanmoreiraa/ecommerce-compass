import Logo from "~/icons/logo.svg"
import { ArrowLeft, User, LogOut, Menu, ShoppingCart, Trash } from "lucide-react"
import React from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { AuthContext } from "../contexts/auth-context"
import { getNameInitials } from "~/lib/utils"
import { ShoppingCartContext, ShoppingCartProvider } from "~/contexts/shopping-cart-context"
import { usePrefetchQuery } from "@tanstack/react-query"
import { Api } from "~/lib/api"
import { LoadingSpinner } from "~/components/loading-spinner"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

interface HeaderProps {
    left: React.ReactNode | null
    center: React.ReactNode | null
    right: React.ReactNode | null
}

const useHeaderConfig = (pathname: string): HeaderProps => {
    const navigate = useNavigate()
    const { user, logout } = React.use(AuthContext)!
    const { clearCart, items } = React.use(ShoppingCartContext)!

    const ShoppingCartIcon = () => {
        return (
            <Link className="relative" to="/shopping-cart">
                <ShoppingCart size={16} />

                {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {items.length}
                    </span>
                )}
            </Link>
        )
    }

    const BackButton = () => {
        return (
            <button onClick={() => navigate(-1)}>
                <ArrowLeft size={16} />
            </button>
        )
    }

    const UserIcon = () => {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                    <Avatar>
                        <AvatarImage src={user!.photoURL ?? undefined} />
                        <AvatarFallback>{getNameInitials(user!.displayName)}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link to="/profile">
                            <User size={16} />
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                        <LogOut size={16} />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    switch (pathname) {
        case "/":
            return {
                left: (
                    <button className="cursor-pointer">
                        <Menu size={16} />
                    </button>
                ),
                center: (
                    <div className="flex items-center gap-2">
                        <Logo />
                        <h1 className="text-lg font-bold">Audio</h1>
                    </div>
                ),
                right: <UserIcon />,
            }
        case "/search":
            return {
                left: <BackButton />,
                center: <h1 className="text-lg font-semibold">Search</h1>,
                right: <ShoppingCartIcon />,
            }
        case pathname.startsWith("/products") ? pathname : "":
            return {
                left: <BackButton />,
                center: null,
                right: <ShoppingCartIcon />,
            }
        case "/shopping-cart":
            return {
                left: <BackButton />,
                center: <h1 className="text-lg font-semibold">Shopping Cart</h1>,
                right: (
                    <button onClick={clearCart}>
                        <Trash size={16} />
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

function AppLayoutContent() {
    const location = useLocation()
    const config = useHeaderConfig(location.pathname)

    return (
        <main className="min-h-screen w-full bg-white">
            <header className="flex max-h-20 min-h-20 items-center justify-between p-4">
                {config.left}
                {config.center}
                {config.right}
            </header>
            <Outlet />
        </main>
    )
}

export default function AppLayout() {
    usePrefetchQuery({ queryKey: ["products"], queryFn: Api.getProducts })

    return (
        <React.Suspense fallback={<LoadingSpinner />}>
            <ShoppingCartProvider>
                <AppLayoutContent />
            </ShoppingCartProvider>
        </React.Suspense>
    )
}
