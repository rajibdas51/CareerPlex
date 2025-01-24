import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  // Define public routes accessible to everyone
  const publicPaths = [
    '/',
    '/jobs',
    '/users',
    '/employer',
    '/contact',
    '/login',
    '/register',
  ];

  const isPublicPath = publicPaths.some(
    (publicPath) => path === publicPath || path.startsWith(`${publicPath}/`)
  );

  const isPrivatePath = path.startsWith('/dashboard');

  try {
    // If token exists, decode and validate it
    if (token) {
      const decodedToken = jwt.decode(token) as {
        iat: number;
        exp?: number;
      };

      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const tokenAgeInSeconds = currentTime - decodedToken.iat; // Age of the token

      // Check if token age exceeds 24 hours (24 * 60 * 60 = 86400 seconds)
      if (tokenAgeInSeconds > 86400) {
        console.log('Token expired due to age. Redirecting to login.');
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('token'); // Delete the expired token
        return response;
      }

      // Redirect logged-in users away from login and register
      if (path === '/login' || path === '/register') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Allow access to private routes
      if (isPrivatePath) {
        return NextResponse.next();
      }
    }

    // If no token and trying to access private routes, redirect to login
    if (!token && isPrivatePath) {
      console.log('No token. Redirecting to login.');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error: any) {
    console.error('Error processing token:', error.message);
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token'); // Remove invalid or expired token
    return response;
  }

  // Allow access to public routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/login',
    '/register',
    '/jobs/:path*',
    '/users/:path*',
    '/employer/:path*',
    '/contact/:path*',
  ],
};
