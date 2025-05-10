import { NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't need authentication
  const isPublicPath = ['/login', '/', '/api/auth/login', '/api/auth/logout'].includes(path);

  if (
    isPublicPath ||
    path.startsWith('/_next') || 
    path.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('jwt-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const verified = await verifyJWT(token);
    
    if (!verified) {
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('jwt-token');
      return response;
    }

    return NextResponse.next();
  } catch (error) {
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('jwt-token');
    return response;
  }
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};