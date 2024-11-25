import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    const isPublicPage =
      request.nextUrl.pathname === '/login' ||
      request.nextUrl.pathname === '/register' ||
      request.nextUrl.pathname === '/';
    // if there is no token and the page is not public, redirect to login.
    const token = request.cookies.get('token')?.value;
    if (!token && !isPublicPage) {
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
    // if there is a token and the page is public, then rediret to home.
    if (token && isPublicPage) {
      return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.error();
  }
}

export const config = {
  matcher: ['/', '/login', '/register'],
};
