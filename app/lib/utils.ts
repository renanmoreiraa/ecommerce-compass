import { clsx } from "clsx"
import type { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ProductReview } from "./types"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function averageProductRating(reviews: ProductReview[]): number {
    return reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
}
