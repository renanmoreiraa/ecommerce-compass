import type { Product } from "./types"

export class Api {
    static url = (() => {
        const url = process.env.NEXT_PUBLIC_MOCK_URL
        if (!url) {
            throw new Error("Please set NEXT_PUBLIC_MOCK_URL")
        }
        return url
    })()

    static async getProducts(): Promise<Product[]> {
        "use cache"
        return (await fetch(Api.url).then((res) => res.json())) as Product[]
    }
}
