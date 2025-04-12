import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('adminToken');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/admin/login';

  // If trying to access admin routes without token, redirect to login
  if (isAdminRoute && !token && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If trying to access login page with token, redirect to dashboard
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}; 