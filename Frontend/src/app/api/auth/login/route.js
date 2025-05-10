import { NextResponse } from 'next/server';
import { signJWT } from '@/lib/auth';  // Note the correct import path

// Mock database - In a real app, this would be your database
const USERS = [
  {
    id: '1',
    email: 'user@example.com',
    name: 'Test User',
    password: 'password123'
  }
];

export async function POST(request) {
  try {
    const body = await request.json();
    
    const user = USERS.find(u => u.email === body.email && u.password === body.password);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    const userWithoutPassword = {
      id: user.id,
      email: user.email,
      name: user.name
    };
    
    const token = await signJWT(userWithoutPassword);
    
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
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}