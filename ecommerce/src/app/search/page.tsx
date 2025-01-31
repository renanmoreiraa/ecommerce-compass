import { api } from "@/lib/api"
import { SearchPageComponent } from "./search";

export default async function SearchPage() {
  const products = await api.getProducts();
  return <SearchPageComponent products={products} />
}

