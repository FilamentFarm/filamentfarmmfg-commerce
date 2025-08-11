import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get('host') ?? '';
  const hostname = hostHeader.split(':')[0] || '';
  const parts = hostname.split('.');
  const primaryDomain = 'filamentfarmmfg.com';

  let subdomain = '';

  if (hostname.endsWith(primaryDomain) && parts.length > 2) {
    subdomain = parts.slice(0, parts.length - 2).join('.');
    if (subdomain === 'www') subdomain = '';
  }

  const res = NextResponse.next();
  res.cookies.set('client-subdomain', subdomain, { path: '/', sameSite: 'lax' });
  return res;
}

export const config = { matcher: '/:path*' };
