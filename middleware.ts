// middleware.ts
import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const subdomain = host.replace('.filamentfarmmfg.com', '').replace(':3000', '');
  const res = NextResponse.next();
  res.cookies.set('client-subdomain', subdomain);
  return res;
}

export const config = {
  matcher: '/:path*'
};
