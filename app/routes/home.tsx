import type { Route } from "./+types/home"
import { isAuthed } from "~/auth/utils"
import { Link, redirect } from "react-router"
import { Search } from "lucide-react"
import { Input } from "~/ui/input"
import { Button } from "~/ui/button"
import { Api } from "~/lib/api"
import Logo from "~/icons/logo.svg"
import { useAuth } from "~/context/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/avatar"
import { Badge } from "~/ui/badge"
import React from "react"
import type { Product } from "~/lib/types"

export function meta({}: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ]
}

export async function clientLoader() {
    const authed = await isAuthed()
    if (!authed) {
        return redirect("/signin")
    }

    return await Api.getProducts()
}

const Category = {
    Headphone: "Headphone",
    Headset: "Headset",
} as const
type Category = (typeof Category)[keyof typeof Category]

function filterProducts(products: Product[], category: Category) {
    return products.filter((product) => product.category === category)
}

function getInitials(displayName: string | undefined | null): string {
    if (!displayName) return ""

    const nameParts = displayName.trim().split(" ")

    if (nameParts.length > 1) {
        return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase()
    }

    return displayName.slice(0, 2).toUpperCase()
}

export default function Home(props: Route.ComponentProps) {
    const { user } = useAuth()
    const [activeTab, setActiveTab] = React.useState<Category>(
        Category.Headphone,
    )

    const [products, setProducts] = React.useState(
        filterProducts(props.loaderData, activeTab),
    )

    function handleCategoryChange(category: Category) {
        setActiveTab(category)
        setProducts(filterProducts(props.loaderData, category))
    }

    return (
        <div className="min-h-screen w-full bg-white">
            {/* Header */}
            <header className="mb-6 flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                    <button className="p-2">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M3 12H21M3 6H21M3 18H21"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <div className="flex items-center gap-2">
                        <Logo />
                        <h1 className="text-lg font-bold">Audio</h1>
                    </div>
                </div>
                <Avatar>
                    <AvatarImage src={user?.photoURL ?? undefined} />
                    <AvatarFallback>
                        {getInitials(user?.displayName)}
                    </AvatarFallback>
                </Avatar>
            </header>

            {/* Welcome Section */}
            <div className="mb-6 p-4">
                <p className="mb-1 font-medium text-gray-600">
                    Hi, {user?.displayName ?? "Unknown"}
                </p>
                <h1 className="text-3xl font-bold">
                    What are you looking for today?
                </h1>
            </div>

            {/* Search Bar */}
            <Link to="/search" className="relative mx-4 mb-6 block">
                <Search className="absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 transform text-zinc-400" />
                <Input
                    type="text"
                    placeholder="Search headphone"
                    className="w-full border-gray-300 bg-transparent p-6 pl-10 shadow-none"
                    readOnly
                />
            </Link>

            <div className="rounded-t-2xl bg-gray-100 p-4">
                {/* Filter Chips */}
                <div className="mb-6 flex gap-3">
                    <Badge
                        variant="outline"
                        className={`hover:bg-primary/90 text-md cursor-pointer rounded-full px-4 font-normal ${
                            activeTab === "Headphone"
                                ? "bg-primary text-primary-foreground"
                                : "bg-gray-100 text-gray-600"
                        }`}
                        onClick={() => handleCategoryChange(Category.Headphone)}
                    >
                        Headphone
                    </Badge>
                    <Badge
                        variant="outline"
                        className={`hover:bg-primary/90 text-md cursor-pointer rounded-full px-4 font-normal ${
                            activeTab === "Headset"
                                ? "bg-primary text-primary-foreground"
                                : "bg-gray-100 text-gray-600"
                        }`}
                        onClick={() => handleCategoryChange(Category.Headset)}
                    >
                        Headset
                    </Badge>
                </div>

                {/* Featured Product Card */}
                <div className="mb-6 rounded-2xl bg-white p-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="mb-1 font-bold">TMA-2</h3>
                            <p className="mb-4 font-bold">Modular Headphone</p>
                            <Button
                                variant="link"
                                className="h-auto p-0 font-semibold text-[#00FF90] hover:text-[#00FF90]/90"
                            >
                                Shop now →
                            </Button>
                        </div>
                        <img
                            src="/placeholder.svg?height=80&width=80"
                            alt="TMA-2 Headphones"
                            width={80}
                            height={80}
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Featured Products Section */}
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-bold">Featured Products</h2>
                    <Button variant="link" className="text-gray-500">
                        See All
                    </Button>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="rounded-2xl bg-gray-50 p-4"
                        >
                            <img
                                src={
                                    product.img ||
                                    "/placeholder.svg?height=120&width=120"
                                }
                                alt={product.name}
                                width={120}
                                height={120}
                                className="mx-auto mb-4"
                            />
                            <h3 className="text-sm font-semibold">
                                {product.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                                USD {product.price.toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
