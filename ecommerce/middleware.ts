import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth")
  console.log("Auth cookie:", authCookie)
  const { pathname } = request.nextUrl

  // Se estiver na página de login e estiver autenticado, redireciona para home
  if (pathname === "/login" && authCookie) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Se não estiver na página de login e não estiver autenticado, redireciona para login
  if (pathname !== "/login" && !authCookie) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
