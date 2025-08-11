import { NextResponse, NextRequest } from 'next/server';
import { CLIENT_CONFIGS } from './lib/client-config';

export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get('host') ?? '';
  const hostname = hostHeader.split(':')[0] || '';
  const primaryDomain = 'filamentfarmmfg.com';

  // Only enforce routing on the production domain
  if (hostname.endsWith(primaryDomain)) {
    const parts = hostname.split('.');

    let subdomain = '';
    if (parts.length > 2) {
      subdomain = parts.slice(0, parts.length - 2).join('.');
      if (subdomain === 'www') subdomain = '';
    }

    // If a subdomain exists but we don't have a config for it, redirect to the root domain
    if (subdomain && !(subdomain in CLIENT_CONFIGS)) {
      const url = request.nextUrl.clone();
      url.hostname = primaryDomain;
      url.port = '';
      return NextResponse.redirect(url, 308);
    }

    const res = NextResponse.next();
    res.cookies.set('client-subdomain', subdomain, { path: '/', sameSite: 'lax' });
    return res;
  }

  // For non-production hosts (localhost, *.vercel.app), do not redirect; use default theme
  const res = NextResponse.next();
  res.cookies.set('client-subdomain', '', { path: '/', sameSite: 'lax' });
  return res;
}

export const config = { matcher: '/:path*' };