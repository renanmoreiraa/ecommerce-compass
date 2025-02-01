import type { Product } from "./types"

export class Api {
    static url = (() => {
        const url = import.meta.env.VITE_API_URL
        if (!url) {
            throw new Error("Please set VITE_API_URL")
        }
        return url
    })()

    static async getProducts(): Promise<Product[]> {
        const products = (await fetch(Api.url).then((res) =>
            res.json(),
        )) as Product[]
        return products
    }
}
