import type { Route } from "../+types/root"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { useProducts } from "~/hooks/get-products"
import { Link, redirect } from "react-router"
import { Carousel, CarouselContent, CarouselItem } from "~/components/ui/carousel"
import Star from "~/icons/star.svg"
import type { Product } from "~/lib/types"
import { Button } from "~/components/ui/button"

function randomProducts(products: Product[], amount = 5) {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(amount, products.length));
}

export default function ProductPage({ params }: Route.ComponentProps) {
    const { data: products } = useProducts()
    const product = products.find((product) => product.id === params.id)

    if (!product) {
        redirect("/404")
        return null
    }

    function handleAddToCart() {
        // TODO: Implement add to cart functionality
    }

    return (
        <>
            {/* Product Heading */}
            <div className="flex flex-col px-4">
                <span className="text-primary font-bold">USD {product.price}</span>
                <h1 className="text-2xl font-bold">{product.name}</h1>
            </div>
            {/* Product Tabs */}
            <div className="px-4 py-2">
                <Tabs defaultValue="overview">
                    <TabsList className="bg-transparent">
                        <TabsTrigger
                            value="overview"
                            className="group relative rounded-none bg-transparent shadow-none drop-shadow-none data-[state=active]:shadow-none"
                        >
                            Overview
                            <div className="bg-primary absolute right-1/2 bottom-0 h-[3px] w-4 translate-x-1/2 scale-0 rounded-full opacity-0 transition-all duration-200 ease-out group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100"></div>
                        </TabsTrigger>
                        <TabsTrigger
                            value="features"
                            className="group relative rounded-none bg-transparent shadow-none drop-shadow-none data-[state=active]:shadow-none"
                        >
                            Features
                            <div className="bg-primary absolute right-1/2 bottom-0 h-[3px] w-4 translate-x-1/2 scale-0 rounded-full opacity-0 transition-all duration-200 ease-out group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100"></div>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="p-4">
                        <Carousel
                            opts={
                                {
                                    // align: "start",
                                    // loop: true,
                                }
                            }
                            className="w-full"
                        >
                            <CarouselContent>
                                <CarouselItem key={1} className="basis-1/2">
                                    <img className="rounded-md" src={product.img} />
                                </CarouselItem>
                                <CarouselItem key={2} className="basis-1/2">
                                    <img className="rounded-md" src={product.img} />
                                </CarouselItem>
                                <CarouselItem key={3} className="basis-1/2">
                                    <img className="rounded-md" src={product.img} />
                                </CarouselItem>
                            </CarouselContent>
                        </Carousel>
                    </TabsContent>
                    <TabsContent value="features" className="p-4">
                        <h3 className="mb-2 leading-relaxed font-semibold">{product.details}</h3>
                        <p className="leading-relaxed">
                            Lorem ipsum odor amet, consectetuer adipiscing elit. Mus dolor
                            suspendisse nostra libero mus cubilia platea quis aliquam. Ultrices nunc
                            pulvinar maecenas sit nascetur mus nascetur. Viverra erat sagittis
                            ligula lacus lacinia nascetur. Suspendisse ut auctor magna efficitur
                            ipsum. Diam nisl mauris lacinia, lacinia et metus primis scelerisque
                            elit? Libero metus fusce congue sem facilisis facilisis lobortis est.
                            Aliquet montes ipsum cubilia ad orci porta. Integer sodales nisl duis,
                            ultricies iaculis leo justo. Velit hendrerit viverra cubilia aliquam id.
                            Ac augue justo faucibus magnis diam platea duis. Sollicitudin neque
                            etiam consectetur ut in cursus a euismod. Quisque nam ullamcorper massa
                            adipiscing morbi ante eros vehicula. Ante nostra dis; mus habitant class
                            porttitor. Ornare congue morbi semper posuere aenean. Cursus phasellus
                            hendrerit mi rhoncus interdum tristique bibendum. Arcu vehicula maximus
                            pulvinar quis quam sapien lorem nulla. Odio platea suscipit auctor
                            habitasse sed himenaeos pharetra lacinia. Feugiat amet ante nec
                            fringilla vestibulum platea aptent a. Est aptent nunc tristique dui
                            sagittis tristique. Fames nec mollis iaculis placerat etiam. Morbi
                            mauris ex ornare venenatis venenatis risus a. Cras elit ipsum praesent
                            ullamcorper augue quis inceptos cras. Odio cursus eu posuere laoreet
                            sodales eget odio. Placerat felis elementum tellus primis quisque nunc
                            penatibus. Fusce viverra sapien nunc feugiat pretium dui laoreet magnis.
                            Metus convallis curae eget finibus cubilia eget.
                        </p>
                    </TabsContent>
                </Tabs>
                {/* Review comments */}
                <div className="flex flex-col gap-4 p-4">
                    <span className="mb-2 text-sm font-medium">
                        Reviews ({product.reviews.length})
                    </span>
                    {product.reviews.map((review) => (
                        <div className="flex gap-4" key={review.userId}>
                            <img
                                src="/assets/placeholder.png"
                                className="h-fit w-fit rounded-full"
                            />
                            <div className="space-y-2 text-sm">
                                <span className="font-semibold">{review.userName}</span>
                                <div className="flex items-center gap-0.5">
                                    {Array.from({ length: Math.floor(review.rating) }).map(() => (
                                        <Star key={`star:${Math.random()}`} />
                                    ))}
                                </div>
                                <p className="font-medium">{review.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Another product carousel */}
            <div className="flex flex-col gap-4 bg-gray-100 p-4">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-sm">Another Product</h3>
                    <Button
                        asChild
                        variant="link"
                        className="text-muted-foreground p-0 text-sm font-normal"
                    >
                        <Link to="/products">See All</Link>
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
                        {randomProducts(products.filter((it) => it.id !== product.id)).map(
                            (product) => (
                                <CarouselItem
                                    key={`product-carousel-1:${product.id}`}
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
                            ),
                        )}
                    </CarouselContent>
                </Carousel>
            </div>
            <div className="p-8">
                <Button onClick={handleAddToCart} className="w-full">
                    Add to Cart
                </Button>
            </div>
        </>
    )
}
