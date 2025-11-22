import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pass through for system routes
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    /\.[\w]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Auth and app-specific paths - no locale processing needed
  if (
    pathname.startsWith('/auth/') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/app/') ||
    pathname.startsWith('/other/') ||
    pathname.startsWith('/help/')
  ) {
    return NextResponse.next();
  }

  // English routes - let them pass through to their own layout
  if (pathname.startsWith('/en')) {
    return NextResponse.next();
  }

  // German is default (no prefix)
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Always run for `/`
    '/'
  ]
};
