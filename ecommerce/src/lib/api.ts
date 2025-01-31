export namespace api {
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

    export async function getProducts(): Promise<Product[]> {
        "use cache"
        const url = process.env.NEXT_PUBLIC_MOCK_URL
        if(!url) {
            throw new Error('Please set NEXT_PUBLIC_MOCK_URL')
        }

        return await fetch(url).then(res => res.json()) as Product[]
    }
}