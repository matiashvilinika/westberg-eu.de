import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Set this to false when you want to launch the full website on December 16, 2025
const COMING_SOON_MODE = true;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // COMING SOON MODE - Redirect ALL traffic to coming-soon page
  if (COMING_SOON_MODE) {
    // Don't redirect if already on coming-soon page
    if (pathname === '/coming-soon') {
      return NextResponse.next();
    }
    
    // Redirect everyone to coming-soon
    return NextResponse.redirect(new URL('/coming-soon', request.url));
  }

  // ============================================
  // NORMAL MODE (when COMING_SOON_MODE = false)
  // ============================================
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|images|api).*)',
  ],
};
