import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  
  // Clear the cookie
  response.cookies.set({
    name: 'jwt-token',
    value: '',
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0 // Expire immediately
  });
  
  return response;
}

// Handle other methods
export async function GET() {
  return NextResponse.json(
    { message: 'Please use POST to logout' }, 
    { status: 405 }
  );
}

// API route to get the current user - app/api/auth/user/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyJWT } from '@/app/lib/auth';

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('jwt-token')?.value;
  
  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  
  const payload = await verifyJWT(token);
  
  if (!payload) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  
  return NextResponse.json({ user: payload });
}

// Handle other methods
export async function POST() {
  return NextResponse.json(
    { message: 'Method not allowed. Use GET to retrieve user information' }, 
    { status: 405 }
  );
}