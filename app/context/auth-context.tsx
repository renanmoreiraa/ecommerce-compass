import React from "react"
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
} from "firebase/auth"
import type { User } from "firebase/auth"
import { auth } from "~/lib/firebase"
import Cookies from "js-cookie"
import { useNavigate } from "react-router"

interface AuthContextType {
    user: User | null
    signIn: (email: string, password: string) => Promise<void>
    signInWithGoogle: () => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate()
    const [user, setUser] = React.useState<User | null>(null)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            if (user) {
                Cookies.set("auth", "true", { expires: 7 })
            } else {
                Cookies.remove("auth")
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const signIn = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password,
            )
            navigate("/")
        } catch (error) { 
            //TODO: handle error
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, new GoogleAuthProvider())
            navigate("/")
        } catch (error) {
            //TODO: handle error
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
            navigate("/login")
        } catch (error) {
            // TODO: handle error
        }
    }

    return (
        <AuthContext.Provider
            value={{ user, signIn, signInWithGoogle, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => React.useContext(AuthContext)
