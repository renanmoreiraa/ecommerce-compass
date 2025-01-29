import { AuthWrapper } from "@/components/auth/auth-wrapper"
import { HomePage } from "@/components/home/home-page"

export default function Home() {
  return (
    <AuthWrapper>
      <HomePage />
    </AuthWrapper>
  )
}
