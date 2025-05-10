import { NextResponse } from 'next/server';
import { signJWT } from '@/app/lib/auth';

// Mock database - In a real app, this would be your database
const USERS = [
  {
    id: '1',
    email: 'user@example.com',
    name: 'Test User',
    // In a real app, passwords would be hashed
    password: 'password123'
  }
];

export async function POST(request) {
  const body = await request.json();
  
  // Find user with matching credentials
  const user = USERS.find(u => u.email === body.email && u.password === body.password);
  
  if (!user) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }
  
  // Create user object without password
  const userWithoutPassword = {
    id: user.id,
    email: user.email,
    name: user.name
  };
  
  // Sign JWT
  const token = await signJWT(userWithoutPassword);
  
  // Set cookie
  const response = NextResponse.json({ 
    message: 'Login successful',
    user: userWithoutPassword
  });
  
  response.cookies.set({
    name: 'jwt-token',
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 // 1 day
  });
  
  return response;
}

// GET handler if needed
export async function GET() {
  return NextResponse.json(
    { message: 'Please use POST to login' }, 
    { status: 405 }
  );
}