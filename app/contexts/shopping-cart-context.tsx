import React from "react"
import { useProducts } from "~/hooks/use-products"
import type { Product } from "~/lib/types"

export interface ShoppingCartItem {
    productId: Product["id"]
    quantity: number
}

export interface ShoppingCartContext {
    items: ShoppingCartItem[]
    addItem: (product: Product) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    getProduct: (productId: string) => Product | undefined
    getCartItemTotal: (item: ShoppingCartItem) => number
    total: number
}

export const ShoppingCartContext = React.createContext<ShoppingCartContext | null>(null)

export function ShoppingCartProvider({ children }: { children: React.ReactNode }) {
    const { data: products } = useProducts()
    const [items, setItems] = React.useState<ShoppingCartItem[]>(() => {
        const savedCart = localStorage.getItem("cart")
        return savedCart ? JSON.parse(savedCart) : []
    })

    React.useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items))
    }, [items])

    const getProduct = React.useCallback(
        (productId: string) => {
            return products?.find((p) => p.id === productId)
        },
        [products],
    )

    const addItem = (product: Product) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.productId === product.id)
            if (existingItem) {
                return currentItems.map((item) =>
                    item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item,
                )
            }
            return [...currentItems, { productId: product.id, quantity: 1 }]
        })
    }

    const removeItem = (productId: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.productId !== productId))
    }

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId)
            return
        }
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.productId === productId ? { ...item, quantity } : item,
            ),
        )
    }

    const clearCart = () => {
        setItems([])
    }

    const getCartItemTotal = (item: ShoppingCartItem) => {
        const product = getProduct(item.productId)
        return product ? product.price * item.quantity : 0
    }

    const total = items.reduce((sum, item) => {
        return sum + getCartItemTotal(item)
    }, 0)

    const value = {
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getProduct,
        getCartItemTotal,
        total,
    }

    return <ShoppingCartContext.Provider value={value}>{children}</ShoppingCartContext.Provider>
}
