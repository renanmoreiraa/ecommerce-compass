import { index, route } from "@react-router/dev/routes"
import type { RouteConfig } from "@react-router/dev/routes"

const routes: RouteConfig = [
    index("routes/home.tsx"),
    route("/signin", "routes/signin.tsx"),
    route("/signup", "routes/signup.tsx"),
    route("/search", "routes/search.tsx"),
]

export default routes
