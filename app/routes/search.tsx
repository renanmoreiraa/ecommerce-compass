import React from "react"
import { Search, ArrowLeft, ShoppingCart } from "lucide-react"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import type { Product } from "~/lib/types"
import { useNavigate } from "react-router"
import { useProducts } from "~/hooks/get-products"

export default function SearchPage() {
    const navigate = useNavigate()
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
        <div className="min-h-screen bg-white">
            <header className="flex items-center justify-between border-b p-4">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-lg font-semibold">Search</h1>
                <Button variant="ghost" size="icon">
                    <ShoppingCart className="h-6 w-6" />
                </Button>
            </header>

            <div className="p-4">
                <div className="relative mb-6">
                    <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search headphone"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="bg-transparent p-6 pl-10"
                    />
                </div>

                <div className="flex min-h-80 flex-col gap-4">
                    {searchResults === null ? (
                        <span className="w-full text-center text-sm">Start typing to search</span>
                    ) : searchResults.length === 0 ? (
                        <span className="w-full text-center text-sm">No results found</span>
                    ) : (
                        searchResults.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center gap-4 rounded-xl bg-gray-50 p-3"
                            >
                                <img
                                    src={product.img || "/placeholder.svg"}
                                    alt={product.name}
                                    width={80}
                                    height={80}
                                    className="rounded-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium">{product.name}</h3>
                                    <p className="text-sm">USD {product.price}</p>
                                    <div className="mt-1 flex items-center gap-1">
                                        <span className="text-sm">
                                            ★ TODO: Função para pegar rating do produto
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            ({product.reviews.length} Reviews)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-8">
                    <h2 className="mb-4 text-lg font-semibold">Popular Products</h2>
                    <div className="space-y-4">
                        {products.slice(0, 3).map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center gap-4 rounded-xl bg-gray-50 p-3"
                            >
                                <img
                                    src={product.img || "/placeholder.svg"}
                                    alt={product.name}
                                    width={64}
                                    height={64}
                                    className="rounded-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium">{product.name}</h3>
                                    <p className="text-sm">USD {product.price}</p>
                                    <div className="mt-1 flex items-center gap-1">
                                        <span className="text-sm">
                                            ★ TODO: Função para pegar rating do produto
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            ({product.reviews.length} Reviews)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
