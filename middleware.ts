// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const subdomain = hostname.replace('.filamentfarmmfg.com', '').replace(':3000', '');
  const response = NextResponse.next();
  response.cookies.set('client-subdomain', subdomain);
  return response;
}

export const config = {
  matcher: ['/(.*)']
};
