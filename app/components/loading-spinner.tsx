import { Loader } from "lucide-react"

export function LoadingSpinner() {
    return (
        <div className="flex min-h-screen items-center justify-center gap-2">
            <Loader size={32} className="animate-spin text-zinc-500" />
            <span className="text-lg font-medium text-zinc-500">Loading...</span>
        </div>
    )
}
