import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const userId = null;
  if (userId) {
    return NextResponse.rewrite(new URL(path, request.url));
  } else {
    return NextResponse.redirect(new URL('/', request.nextUrl.origin));
  }
}

export const config = {
  matcher: [
    '/school',
    '/dashboard',
    '/about-us'
]

};
