"use client"

import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Image from "next/image"

// Mock data for popular products
const popularProducts = [
  { id: 1, name: "TMA-2 HD Wireless", price: "USD 350", image: "/placeholder.svg?height=80&width=80" },
  { id: 2, name: "C02 - Cable", price: "USD 25", image: "/placeholder.svg?height=80&width=80" },
  { id: 3, name: "H03 - Headband", price: "USD 50", image: "/placeholder.svg?height=80&width=80" },
]

export function SearchSheet() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory")
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory))
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const updatedHistory = [searchQuery, ...searchHistory.filter((item) => item !== searchQuery)].slice(0, 5)
      setSearchHistory(updatedHistory)
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory))
      setSearchQuery("")
      // Here you would typically perform the actual search
    }
  }

  const clearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem("searchHistory")
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input type="text" placeholder="Search headphone" className="pl-10 bg-gray-50 border-none" />
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md mx-auto">
        <SheetHeader>
          <SheetTitle>Search Products</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search headphones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Search</Button>
          </form>
        </div>
        {searchHistory.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Recent Searches</h3>
            <ul className="space-y-2">
              {searchHistory.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery(item)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Search
                  </Button>
                </li>
              ))}
            </ul>
            <Button variant="link" onClick={clearHistory} className="mt-2 text-sm text-gray-500">
              Clear History
            </Button>
          </div>
        )}
        <div>
          <h3 className="font-semibold mb-2">Popular Products</h3>
          <div className="grid grid-cols-2 gap-4">
            {popularProducts.map((product) => (
              <div key={product.id} className="bg-gray-50 rounded-lg p-3 flex flex-col items-center">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="mb-2"
                />
                <h4 className="text-sm font-medium text-center">{product.name}</h4>
                <p className="text-xs text-gray-500">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

