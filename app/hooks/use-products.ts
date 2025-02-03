import { useSuspenseQuery } from "@tanstack/react-query"
import { Api } from "~/lib/api"

export const useProducts = () =>
    useSuspenseQuery({
        queryKey: ["products"],
        queryFn: Api.getProducts,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })
