export interface Product {
    id: string
    name: string
    category: string
    price: number
    details: string
    img: string
    reviews: ProductReview[]
    popularity: number
    createdAt: string
}

export interface ProductReview {
    userId: string
    userName: string
    rating: number
    comment: string
    postedAt: string
}
