import { EllipsisVertical, SlidersVertical } from "lucide-react"
import React from "react"
import { useNavigate } from "react-router"
import { Button } from "~/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer"
import { useProducts } from "~/hooks/use-products"
import Star from "~/icons/star.svg"
import type { Product } from "~/lib/types"
import { averageProductRating } from "~/lib/utils"

const Category = {
    Headphone: "headphones",
    Headset: "headsets",
} as const

type Category = (typeof Category)[keyof typeof Category]

const Sorting = {
    Popularity: "Popularity",
    Newest: "Newest",
    Oldest: "Oldest",
    HighestPrice: "Highest Price",
    LowestPrice: "Lowest Price",
} as const

type Sorting = (typeof Sorting)[keyof typeof Sorting]

interface FilterState {
    category: Category
    sorting: Sorting
}

function applyCategoryFilter(products: Product[], category: Category): Product[] {
    return products.filter((product) => product.category === category)
}

function applySorting(products: Product[], sorting: Sorting): Product[] {
    switch (sorting) {
        case Sorting.Popularity:
            return products.sort((a, b) => b.reviews.length - a.reviews.length)
        case Sorting.Newest:
            return products.sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
            )
        case Sorting.Oldest:
            return products.sort(
                (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
            )
        case Sorting.HighestPrice:
            return products.sort((a, b) => b.price - a.price)
        case Sorting.LowestPrice:
            return products.sort((a, b) => a.price - b.price)
        default:
            return products
    }
}

function applyFilters(products: Product[], filters: FilterState): Product[] {
    return applySorting(applyCategoryFilter(products, filters.category), filters.sorting)
}

export default function ProductsPage() {
    const navigate = useNavigate()
    const { data: products } = useProducts()
    const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false)
    const [filters, setFilters] = React.useState<FilterState>({
        category: Category.Headphone,
        sorting: Sorting.Popularity,
    })

    const [tempFilters, setTempFilters] = React.useState<FilterState>({
        category: Category.Headphone,
        sorting: Sorting.Popularity,
    })

    function onDrawerOpenChange() {
        setTempFilters(filters)
        setDrawerOpen((prev) => !prev)
    }

    function handleApplyFilters() {
        setFilters(tempFilters)
        setDrawerOpen(false)
    }

    return (
        <>
            {/* Heading */}
            <div className="flex flex-col gap-4 px-4 pb-4">
                <h1 className="text-2xl font-bold">All Products</h1>
                <Drawer open={drawerOpen} onOpenChange={onDrawerOpenChange}>
                    <DrawerTrigger asChild>
                        <Button variant="outline">
                            <SlidersVertical />
                            Filter
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="mx-auto w-full max-w-sm">
                            <DrawerHeader className="-mb-2">
                                <DrawerTitle className="font-bold">Filter</DrawerTitle>
                            </DrawerHeader>
                            <div className="p-4 pb-8">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-2 text-sm font-medium">Category</h3>
                                        <div className="space-x-2">
                                            {Object.entries(Category).map(([key, category]) => (
                                                <Button
                                                    key={key}
                                                    variant={
                                                        tempFilters.category === category
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    className="h-6 rounded-full p-3 text-xs"
                                                    onClick={() =>
                                                        setTempFilters((prev) => ({
                                                            ...prev,
                                                            category,
                                                        }))
                                                    }
                                                >
                                                    {key}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="mb-3 text-sm font-medium">Sort By</h3>
                                        <div className="space-y-2 space-x-2">
                                            {Object.values(Sorting).map((sorting) => (
                                                <Button
                                                    key={sorting}
                                                    variant={
                                                        tempFilters.sorting === sorting
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    className="text-xs"
                                                    onClick={() =>
                                                        setTempFilters((prev) => ({
                                                            ...prev,
                                                            sorting,
                                                        }))
                                                    }
                                                >
                                                    {sorting}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                    <Button className="w-full text-xs" onClick={handleApplyFilters}>
                                        Apply Filters
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
            {/* Products */}
            <div className="bg-accent p-4 pt-8">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {applyFilters(products, filters).map((product) => (
                        <div key={product.id} className="rounded-lg bg-white p-4">
                            <img
                                src={product.img}
                                alt={product.name}
                                className="mx-auto h-32 object-cover"
                                loading="lazy"
                            />
                            <h2 className="mt-4 text-sm">{product.name}</h2>
                            <div className="flex flex-col">
                                <span className="mt-1 text-sm font-bold">USD {product.price}</span>
                                <div className="mt-2 flex items-center">
                                    <Star />
                                    <span className="ml-1 text-xs">
                                        {averageProductRating(product.reviews).toFixed(1)}
                                    </span>
                                    <span className="ml-2 text-xs text-gray-500">
                                        {product.reviews.length}{" "}
                                        {product.reviews.length > 1 ? "Reviews" : "Review"}
                                    </span>
                                    <button className="ml-auto">
                                        <EllipsisVertical className="text-gray-500" size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
