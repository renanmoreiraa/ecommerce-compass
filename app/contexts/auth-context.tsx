import React from "react"
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
} from "firebase/auth"
import type { User } from "firebase/auth"
import { auth } from "~/lib/firebase"
import Cookies from "js-cookie"
import { useNavigate } from "react-router"

export interface AuthContext {
    user: User | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, password: string) => Promise<void>
    signInWithGoogle: () => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = React.createContext<AuthContext>({} as AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate()
    const [user, setUser] = React.useState<User | null>(null)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            if (user) {
                Cookies.set("auth", "true", { expires: 7 })
            } else {
                Cookies.remove("auth")
            }
        })

        return () => unsubscribe()
    }, [])

    const signIn = async (email: string, password: string) => {
        try {
            setLoading(true)
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    const signInWithGoogle = async () => {
        try {
            setLoading(true)
            await signInWithPopup(auth, new GoogleAuthProvider())
            navigate("/")
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }

    }

    const signUp = async (email: string, password: string) => {
        try {
            setLoading(true)
            await createUserWithEmailAndPassword(auth, email, password)
            await signIn(email, password)
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        await signOut(auth)
        navigate("/signin")
    }

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
