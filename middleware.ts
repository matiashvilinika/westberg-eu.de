import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ⚠️ SET TO FALSE ON DECEMBER 16, 2025 TO LAUNCH THE WEBSITE
const COMING_SOON_MODE = true;

export function middleware(request: NextRequest) {
  // Skip middleware for static files and API routes
  const { pathname } = request.nextUrl;
  
  // Always allow these paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // static files like .svg, .png, etc.
  ) {
    return NextResponse.next();
  }

  // COMING SOON MODE
  if (COMING_SOON_MODE) {
    // Already on coming-soon page - allow
    if (pathname === '/coming-soon') {
      return NextResponse.next();
    }
    
    // Redirect ALL other requests to coming-soon
    const url = request.nextUrl.clone();
    url.pathname = '/coming-soon';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Run middleware on ALL routes
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
