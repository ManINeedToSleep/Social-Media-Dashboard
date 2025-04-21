import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  // Try to get token from NextAuth
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })
  
  // Check for custom auth (fallback if NextAuth isn't working)
  const customAuthCookie = request.cookies.get('isAuthenticated')?.value
  const isCustomAuthenticated = customAuthCookie === 'true'
  
  // User is authenticated if they have a token OR custom auth
  const isAuthenticated = !!token || isCustomAuthenticated
  
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
  
  // Redirect authenticated users away from auth pages
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/custom-signin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*']
}