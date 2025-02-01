import { usePrefetchQuery } from "@tanstack/react-query"
import React from "react"
import { Outlet } from "react-router"
import {LoadingSpinner} from "~/components/loading-spinner"
import { Api } from "~/lib/api"

export function AuthedLayout() {
    usePrefetchQuery({ queryKey: ["products"], queryFn: Api.getProducts })

    return (
        <React.Suspense fallback={<LoadingSpinner/>}>
            <Outlet />
        </React.Suspense>
    )
}
