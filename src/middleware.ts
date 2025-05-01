import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// This middleware will protect routes that require authentication
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define routes that require authentication
  const protectedRoutes = ['/dashboard'];
  
  // Define routes that are only for guests
  const guestRoutes = ['/auth/custom-signin', '/auth/signup'];
  
  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route) || pathname === route
  );
  
  // Check if the route is for guests only
  const isGuestRoute = guestRoutes.some(route => 
    pathname.startsWith(route) || pathname === route
  );
  
  // Get the authentication token from the request
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
  // If the route is protected and the user is not authenticated, redirect to login
  if (isProtectedRoute && !token) {
    const url = new URL('/auth/custom-signin', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
  // If the route is for guests only and the user is authenticated, redirect to dashboard
  if (isGuestRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// Configure the middleware to run for specific routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/custom-signin',
    '/auth/signup',
  ],
};