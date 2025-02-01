import { Link } from "react-router"
import { ArrowRight, Headset, Menu, Search } from "lucide-react"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import Logo from "~/icons/logo.svg"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import React from "react"
import type { Product } from "~/lib/types"
import { Carousel, CarouselContent, CarouselItem } from "~/components/ui/carousel"
import { AuthContext } from "~/auth/auth-context"
import { useProducts } from "~/hooks/get-products"
import { getNameInitials, getMostPopularProducts } from "~/lib/utils"

const Category = {
    Headphone:"Headphone",
    Headset: "Headset",
} as const
type Category = typeof Category[keyof typeof Category]

function filterProducts(products: Product[], category: Category) {
    return products.filter((product) => product.category === category)
}

export default function Home() {
    const { user } = React.use(AuthContext)
    const { data } = useProducts()
    const [activeCategory, setActiveCategory] = React.useState<Category>(Category.Headphone)
    const [products, setProducts] = React.useState(filterProducts(data!, activeCategory))

    function handleCategoryChange(category: Category) {
        setActiveCategory(category)
        setProducts(filterProducts(data, category))
    }

    return (
        <div className="min-h-screen w-full bg-white">
            {/* Header */}
            <header className="mb-6 flex items-center justify-between p-4">
                <button className="cursor-pointer">
                    <Menu size={24} />
                </button>
                <div className="flex items-center gap-2">
                    <Logo />
                    <h1 className="text-lg font-bold">Audio</h1>
                </div>
                <Avatar>
                    <AvatarImage src={user!.photoURL ?? undefined} />
                    <AvatarFallback>{getNameInitials(user!.displayName)}</AvatarFallback>
                </Avatar>
            </header>

            {/* Welcome Section */}
            <div className="mb-6 p-4">
                <p className="mb-1 font-medium text-gray-600">
                    Hi, {user!.displayName ?? "Unknown"}
                </p>
                <h1 className="text-3xl font-bold">What are you looking for today?</h1>
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

            <div className="rounded-t-2xl bg-gray-100 p-4 pt-8">
                {/* Filter Badges */}
                <div className="mb-6 flex gap-3">
                    <Badge
                        variant="outline"
                        className={`hover:bg-primary/90 text-md cursor-pointer rounded-full px-4 font-normal ${
                            activeCategory === Category.Headphone
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
                            activeCategory === Category.Headset
                                ? "bg-primary text-primary-foreground"
                                : "bg-gray-100 text-gray-600"
                        }`}
                        onClick={() => handleCategoryChange(Category.Headset)}
                    >
                        Headset
                    </Badge>
                </div>
                {/* Top Products Carousel */}
                <div className="mb-6">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {getMostPopularProducts(products).map((product) => (
                                <CarouselItem
                                    key={product.id}
                                    className="md:basis-1/2 lg:basis-1/5"
                                >
                                    <div className="flex items-center rounded-2xl bg-white p-4">
                                        <div className="flex w-full max-w-48 flex-col items-start gap-4">
                                            <h3 className="text-2xl font-bold">{product.name}</h3>
                                            <Button
                                                variant="link"
                                                className="p-0 font-bold"
                                                asChild
                                            >
                                                <Link to={`/product/${product.id}`}>
                                                    Shop now <ArrowRight size={16} />
                                                </Link>
                                            </Button>
                                        </div>
                                        <img
                                            src={
                                                product.img ||
                                                "/placeholder.svg?height=120&width=120"
                                            }
                                            alt={product.name}
                                            width={120}
                                            height={120}
                                            className="mx-auto mb-4 object-contain"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
                {/* Product Carousel */}
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="font-bold">Featured Products</h2>
                        <Button asChild variant="link" className="text-gray-500">
                            <Link to="products">See All</Link>
                        </Button>
                    </div>
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {products.map((product) => (
                                <CarouselItem
                                    key={product.id}
                                    className="max-w-[220px] md:basis-1/2 lg:basis-1/5"
                                >
                                    <div className="rounded-md bg-white p-4">
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
                                        <h3 className="text-sm">{product.name}</h3>
                                        <p className="text-sm font-semibold text-black">
                                            USD {product.price.toFixed(0)}
                                        </p>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </div>
    )
}
