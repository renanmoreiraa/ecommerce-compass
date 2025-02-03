import { clsx } from "clsx"
import type { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Product, ProductReview } from "./types"
import { auth } from "./firebase"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
export function getNameInitials(displayName: string | undefined | null): string {
    if (!displayName) return ""

    const nameParts = displayName.trim().split(" ")

    if (nameParts.length > 1) {
        return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase()
    }

    return displayName.slice(0, 2).toUpperCase()
}

export function averageProductRating(reviews: ProductReview[]): number {
    return reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
}

export function getMostPopularProducts(products: Product[], limit: number = 5) {
    return [...products].sort((a, b) => b.popularity - a.popularity).slice(0, limit)
}

export async function isAuthed(): Promise<boolean> {
    return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe()
            resolve(Boolean(user))
        })
    })
}
