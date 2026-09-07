import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // Detect internship subdomain (e.g. internship.avpfuturetech.com, internships.avpfuturetech.com, internship.localhost:3000)
  const isInternshipSubdomain =
    host.startsWith('internship.') ||
    host.startsWith('internships.') ||
    request.nextUrl.searchParams.get('subdomain') === 'internship';

  if (isInternshipSubdomain) {
    // 1. Root of subdomain -> rewrite to /internships
    if (pathname === '/' || pathname === '') {
      return NextResponse.rewrite(new URL('/internships', request.url));
    }

    // 2. /domains -> rewrite to /internships/domains
    if (pathname === '/domains' || pathname === '/domains/') {
      return NextResponse.rewrite(new URL('/internships/domains', request.url));
    }

    // 3. /verify -> rewrite to /internships/verify
    if (pathname === '/verify' || pathname === '/verify/') {
      return NextResponse.rewrite(new URL('/internships/verify', request.url));
    }

    // 4. If someone visits /internships directly on the subdomain, redirect to clean path
    if (pathname === '/internships' || pathname === '/internship') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (pathname.startsWith('/internships/')) {
      const cleanPath = pathname.replace(/^\/internships/, '');
      return NextResponse.redirect(new URL(cleanPath || '/', request.url));
    }

    if (pathname.startsWith('/internship/')) {
      const cleanPath = pathname.replace(/^\/internship/, '');
      return NextResponse.redirect(new URL(cleanPath || '/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all request paths except for static files, _next, and API routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|logos|patterns|scratch|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf)).*)',
  ],
};
