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