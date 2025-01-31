import { auth } from "~/lib/firebase"

export async function isAuthed(): Promise<boolean> {
    return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe()
            resolve(Boolean(user))
        })
    })
}
