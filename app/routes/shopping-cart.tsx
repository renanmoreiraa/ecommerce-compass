import { ChevronRight, Minus, Plus, Trash } from "lucide-react"
import React from "react"
import { Button } from "~/components/ui/button"
import { ShoppingCartContext, type ShoppingCartItem } from "~/contexts/shopping-cart-context"

export default function ShoppingCartPage() {
    const cart = React.use(ShoppingCartContext)!

    return (
        <div
            className="flex flex-col gap-4 px-4 pb-6"
            //80px is the height of the header
            //TODO: Might need to move this to a constants file
            style={{ minHeight: `calc(100vh - 80px)` }}
        >
            {cart.items.length > 0 ? (
                cart.items.map((item) => <CartItemView key={item.productId} item={item} />)
            ) : (
                <p>Your cart is empty</p>
            )}
            <div className="flex items-center justify-between mt-auto">
                <span className="text-muted-foreground text-xs font-medium">
                    Total {cart.items.length} items
                </span>
                <span className="text-sm font-bold">USD {cart.total}</span>
            </div>
            <Button className="justify-between">
                Proceed to checkout
                <ChevronRight size={16} />
            </Button>
        </div>
    )
}

function CartItemView({ item }: { item: ShoppingCartItem }) {
    const cart = React.use(ShoppingCartContext)!
    const product = cart.getProduct(item.productId)

    if (!product) return null

    return (
        <div className="flex gap-4 p-4 text-sm">
            <img
                src={product.img}
                alt={product.name}
                className="h-20 w-20 rounded-lg object-cover"
            />
            <div className="w-full space-y-1">
                <p className="font-medium">{product.name}</p>
                <p className="font-bold">USD {product.price}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            disabled={item.quantity === 1}
                            onClick={() => {
                                cart.updateQuantity(product.id, item.quantity - 1)
                            }}
                            variant="outline"
                            className="h-fit p-1"
                        >
                            <Minus
                                className={`${item.quantity > 1 ? "text-foreground" : "text-muted-foreground"}`}
                            />
                        </Button>
                        <p className="font-bold">{item.quantity}</p>
                        <Button
                            onClick={() => {
                                cart.updateQuantity(product.id, item.quantity + 1)
                            }}
                            variant="outline"
                            className="h-fit p-1"
                        >
                            <Plus />
                        </Button>
                    </div>
                    <button onClick={() => cart.removeItem(product.id)}>
                        <Trash size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}
