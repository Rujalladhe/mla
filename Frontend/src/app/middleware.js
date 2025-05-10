import { NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't need authentication
  const publicPaths = ['/', '/login', '/api/auth/login'];
  
  // Skip middleware for static files
  if (
    path.startsWith('/_next') || 
    path.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Allow access to public paths without authentication
  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  // Get token from cookies
  const token = request.cookies.get('jwt-token')?.value;

  try {
    // No token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Verify token
    const payload = await verifyJWT(token);
    
    // Invalid token
    if (!payload) {
      // Clear the invalid token
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('jwt-token');
      return response;
    }

    // Valid token - allow request to proceed
    return NextResponse.next();

  } catch (error) {
    // Any verification error should redirect to login
    console.error('Auth error:', error);
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('jwt-token');
    return response;
  }
}

// Update matcher to protect all routes except public ones
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon\\.ico).*)',
  ],
};