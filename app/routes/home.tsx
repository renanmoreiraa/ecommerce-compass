import type { Route } from "./+types/home"
import { isAuthed } from "~/auth/utils"
import { redirect } from "react-router"

export function meta({}: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ]
}

export async function clientLoader() {
    const authed = await isAuthed()
    if (!authed) {
        return redirect("/signin")
    }
}

export default function Home() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-red-300">
                Welcome to react-router
            </h1>
        </div>
    )
}
