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
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-subdomain-internship', '1');

    // 1. Root of subdomain -> rewrite to /internships
    if (pathname === '/' || pathname === '') {
      return NextResponse.rewrite(new URL('/internships', request.url), {
        request: { headers: requestHeaders }
      });
    }

    // 2. /domains -> rewrite to /internships/domains
    if (pathname === '/domains' || pathname === '/domains/') {
      return NextResponse.rewrite(new URL('/internships/domains', request.url), {
        request: { headers: requestHeaders }
      });
    }

    // 3. /verify -> rewrite to /internships/verify
    if (pathname === '/verify' || pathname === '/verify/') {
      return NextResponse.rewrite(new URL('/internships/verify', request.url), {
        request: { headers: requestHeaders }
      });
    }

    // 4. If someone visits /internships directly on the subdomain, redirect to clean path
    if (pathname === '/internships' || pathname === '/internships/' || pathname === '/internship' || pathname === '/internship/') {
      const cleanUrl = new URL('/', request.url);
      cleanUrl.search = request.nextUrl.search;
      return NextResponse.redirect(cleanUrl);
    }

    if (pathname.startsWith('/internships/')) {
      const cleanPath = pathname.replace(/^\/internships/, '');
      const cleanUrl = new URL(cleanPath || '/', request.url);
      cleanUrl.search = request.nextUrl.search;
      return NextResponse.redirect(cleanUrl);
    }

    if (pathname.startsWith('/internship/')) {
      const cleanPath = pathname.replace(/^\/internship/, '');
      const cleanUrl = new URL(cleanPath || '/', request.url);
      cleanUrl.search = request.nextUrl.search;
      return NextResponse.redirect(cleanUrl);
    }
  }

  // If request hits the main domain (e.g. www.avpfuturetech.com or avpfuturetech.com) for internship routes in production:
  if (!isInternshipSubdomain && host.includes('avpfuturetech.com')) {
    if (pathname === '/internships' || pathname === '/internships/' || pathname === '/internship' || pathname === '/internship/') {
      const targetUrl = new URL('https://internship.avpfuturetech.com/');
      targetUrl.search = request.nextUrl.search;
      return NextResponse.redirect(targetUrl, 308);
    }

    if (pathname.startsWith('/internships/')) {
      const cleanPath = pathname.replace(/^\/internships/, '');
      const targetUrl = new URL(`https://internship.avpfuturetech.com${cleanPath || '/'}`);
      targetUrl.search = request.nextUrl.search;
      return NextResponse.redirect(targetUrl, 308);
    }

    if (pathname.startsWith('/internship/')) {
      const cleanPath = pathname.replace(/^\/internship/, '');
      const targetUrl = new URL(`https://internship.avpfuturetech.com${cleanPath || '/'}`);
      targetUrl.search = request.nextUrl.search;
      return NextResponse.redirect(targetUrl, 308);
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
