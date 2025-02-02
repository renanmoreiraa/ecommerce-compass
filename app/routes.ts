import { index, layout, route } from "@react-router/dev/routes"
import type { RouteConfig } from "@react-router/dev/routes"

const routes: RouteConfig = [
    layout("auth/auth-layout.tsx", [
        index("routes/home.tsx"),
        route("/search", "routes/search.tsx"),
        route("/products", "routes/products.tsx"),
        route("/products/:id", "routes/product.tsx"),
    ]),
    route("/signin", "routes/signin.tsx"),
    route("/signup", "routes/signup.tsx"),
]

export default routes
