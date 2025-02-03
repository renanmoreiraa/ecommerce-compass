import { ArrowRight, Search } from "lucide-react"
import React from "react"
import { Link } from "react-router"
import { AuthContext } from "~/contexts/auth-context"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Carousel, CarouselContent, CarouselItem } from "~/components/ui/carousel"
import { Input } from "~/components/ui/input"
import { useProducts } from "~/hooks/use-products"
import type { Product } from "~/lib/types"
import { getMostPopularProducts } from "~/lib/utils"

const Category = {
    Headphone: "headphones",
    Headset: "headsets",
} as const
type Category = (typeof Category)[keyof typeof Category]

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
        <>
            {/* Welcome Section */}
            <div className="px-4 pb-4">
                <p className="mb-1 text-sm font-medium text-gray-600">
                    Hi {user && user.displayName !== null ? ", " + user.displayName : ""}
                </p>
                <h1 className="text-2xl font-bold">What are you looking for today?</h1>
            </div>

            {/* Search Bar */}
            <Link to="/search" className="relative mx-4 mb-6 block">
                <Search
                    size={16}
                    className="absolute top-1/2 left-3 z-10 -translate-y-1/2 transform text-zinc-400"
                />
                <Input
                    type="text"
                    placeholder="Search headphone"
                    className="w-full pl-10 text-sm"
                    readOnly
                />
            </Link>

            <div className="rounded-t-2xl bg-gray-100 p-4">
                {/* Filter Badges */}
                <div className="mb-4 flex gap-3">
                    <Badge
                        variant="outline"
                        className={`hover:bg-primary/90 cursor-pointer rounded-full px-4 text-sm font-normal ${
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
                        className={`hover:bg-primary/90 cursor-pointer rounded-full px-4 text-sm font-normal ${
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
                <div className="mb-4">
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
                                    <div className="flex items-center rounded-2xl bg-white p-4 px-8">
                                        <div className="flex w-full max-w-48 flex-col items-start gap-4">
                                            <Link
                                                to={`/products/${product.id}`}
                                                className="max-w-42"
                                            >
                                                <h3 className="text-2xl font-bold">
                                                    {product.name}
                                                </h3>
                                            </Link>
                                            <Button
                                                variant="link"
                                                className="p-0 font-bold"
                                                asChild
                                            >
                                                <Link to={`/products/${product.id}`}>
                                                    Shop now <ArrowRight size={16} />
                                                </Link>
                                            </Button>
                                        </div>
                                        <Link
                                            className="mx-auto mb-4"
                                            to={`/product/${product.id}`}
                                        >
                                            <img
                                                src={
                                                    product.img ||
                                                    "/placeholder.svg?height=120&width=120"
                                                }
                                                alt={product.name}
                                                width={120}
                                                height={120}
                                                className="object-contain"
                                            />
                                        </Link>
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
                                        <Link to={`/products/${product.id}`}>
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
                                        </Link>
                                        <Link to={`/products/${product.id}`}>
                                            <h3 className="text-sm font-medium">{product.name}</h3>
                                        </Link>
                                        <p className="text-primary text-sm font-semibold">
                                            USD {product.price.toFixed(0)}
                                        </p>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </>
    )
}
