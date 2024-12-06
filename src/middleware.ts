import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  // define public routes that are accessible to everyone
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

  if (token && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token && isPrivatePath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

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
