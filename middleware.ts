// middleware.ts
import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const [h] = host.split(':');
  const parts = h.split('.');
  const primaryDomain = 'filamentfarmmfg.com';

  let subdomain = '';

  // Only set a subdomain when we're on the primary domain
  if (h.endsWith(primaryDomain) && parts.length > 2) {
    subdomain = parts.slice(0, parts.length - 2).join('.');
    if (subdomain === 'www') subdomain = '';
  }

  const res = NextResponse.next();

  // Store the subdomain (empty string = default theme)
  res.cookies.set('client-subdomain', subdomain, {
    path: '/',
    sameSite: 'lax'
  });

  return res;
}

export const config = {
  matcher: '/:path*'
};
