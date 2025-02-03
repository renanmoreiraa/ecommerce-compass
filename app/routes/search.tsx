import { EllipsisVertical, Search } from "lucide-react"
import React from "react"
import { Link, useNavigate } from "react-router"
import { Input } from "~/components/ui/input"
import { useProducts } from "~/hooks/use-products"
import Star from "~/icons/star.svg"
import type { Product } from "~/lib/types"
import { averageProductRating, getMostPopularProducts } from "~/lib/utils"

export default function SearchPage() {
    const { data: products } = useProducts()
    const [searchQuery, setSearchQuery] = React.useState("")
    const [searchResults, setSearchResults] = React.useState<Product[] | null>(null)

    function handleSearch(query: string) {
        setSearchQuery(query)
        if (query.trim()) {
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(query.toLowerCase()),
            )
            setSearchResults(filtered)
        } else {
            setSearchResults(null)
        }
    }

    return (
        <>
            <div className="px-4">
                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search
                        className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 transform"
                        size={16}
                    />
                    <Input
                        type="text"
                        placeholder="Search headphone"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10 text-sm"
                    />
                </div>

                {/* Search Results */}
                <div className="flex min-h-80 flex-col gap-4">
                    {searchResults === null ? (
                        <span className="w-full text-center text-xs">Start typing to search</span>
                    ) : searchResults.length === 0 ? (
                        <span className="w-full text-center text-xs">No results found</span>
                    ) : (
                        searchResults.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center gap-4 rounded-xl bg-gray-50 p-3"
                            >
                                <Link to={`/products/${product.id}`}>
                                    <img
                                        src={product.img || "/placeholder.svg"}
                                        alt={product.name}
                                        width={80}
                                        height={80}
                                        className="rounded-lg"
                                    />
                                </Link>
                                <div className="flex-1">
                                    <Link to={`/products/${product.id}`}>
                                        <h3 className="font-medium">{product.name}</h3>
                                    </Link>
                                    <p className="text-sm">USD {product.price}</p>
                                    <div className="mt-1 flex items-center gap-3 text-sm">
                                        <span className="flex items-center gap-1">
                                            <Star />
                                            {averageProductRating(product.reviews).toFixed(1)}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {product.reviews.length} Reviews
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-8">
                    {/* Popular Products */}
                    <h2 className="mb-4 text-lg font-semibold">Popular Products</h2>
                    <div className="space-y-4">
                        {getMostPopularProducts(products, 3).map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center gap-4 rounded-xl p-4"
                            >
                                <Link to={`/products/${product.id}`}>
                                    <img
                                        src={product.img || "/placeholder.svg"}
                                        alt={product.name}
                                        width={64}
                                        height={64}
                                        className="rounded-lg"
                                    />
                                </Link>
                                <div className="flex-1 space-y-1">
                                    <Link to={`/products/${product.id}`}>
                                        <h3>{product.name}</h3>
                                    </Link>
                                    <p className="text-sm font-bold">USD {product.price}</p>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="flex items-center gap-1">
                                            <Star />
                                            {averageProductRating(product.reviews).toFixed(1)}
                                        </span>
                                        <span className="text-gray-500">
                                            {product.reviews.length}{" "}
                                            {product.reviews.length > 1 ? "Reviews" : "Review"}
                                        </span>
                                        <button className="ml-auto" type="button">
                                            <EllipsisVertical className="text-gray-500" size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
