"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Search, ArrowLeft, ShoppingCart } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { api } from "@/lib/api"
import { Button } from "@/components/ui/button"

export function SearchPageComponent({ products }: { products: api.Product[] }) {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState(products)

    const handleSearch = (query: string) => {
        setSearchQuery(query)
        if (query.trim()) {
            const filtered = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
            setSearchResults(filtered)
        } else {
            setSearchResults(products)
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <header className="flex items-center justify-between p-4 border-b">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-lg font-semibold">Search</h1>
                <Button variant="ghost" size="icon">
                    <ShoppingCart className="h-6 w-6" />
                </Button>
            </header>

            <div className="p-4">
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                        type="text"
                        placeholder="Search headphone"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10 bg-gray-50 border-none"
                    />
                </div>

                <div className="space-y-4">
                    {searchResults.map((product) => (
                        <div key={product.id} className="flex items-center gap-4 bg-gray-50 rounded-xl p-3">
                            <Image
                                src={product.img || "/placeholder.svg"}
                                alt={product.name}
                                width={80}
                                height={80}
                                className="rounded-lg"
                            />
                            <div className="flex-1">
                                <h3 className="font-medium">{product.name}</h3>
                                <p className="text-sm">USD {product.price}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <span className="text-sm">★ TODO: Função para pegar rating do produto</span>
                                    <span className="text-sm text-gray-500">({product.reviews.length} Reviews)</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-4">Popular Products</h2>
                    <div className="space-y-4">
                        {products.slice(0, 3).map((product) => (
                            <div key={product.id} className="flex items-center gap-4 bg-gray-50 rounded-xl p-3">
                                <Image
                                    src={product.img || "/placeholder.svg"}
                                    alt={product.name}
                                    width={80}
                                    height={80}
                                    className="rounded-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium">{product.name}</h3>
                                    <p className="text-sm">USD {product.price}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <span className="text-sm">★ TODO: Função para pegar rating do produto</span>
                                        <span className="text-sm text-gray-500">({product.reviews.length} Reviews)</span>
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