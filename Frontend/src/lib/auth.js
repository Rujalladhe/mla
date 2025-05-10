import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-min-32-chars-long!!'
);

export async function signJWT(payload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secretKey);
  
  return token;
}

export async function verifyJWT(token) {
  try {
    if (!token) return null;
    
    const { payload } = await jwtVerify(token, secretKey);
    
    if (Date.now() >= payload.exp * 1000) {
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function getUser() {
  try {
    const cookieStore = cookies();
    // Fix: Properly await the cookie operation
    const token = await cookieStore.get('jwt-token');
    
    if (!token?.value) return null;
    
    const payload = await verifyJWT(token.value);
    return payload;
  } catch (error) {
    console.error('Get user failed:', error);
    return null;
  }
}