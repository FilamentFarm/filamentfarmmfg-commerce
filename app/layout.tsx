import { CartProvider } from 'components/cart/cart-context';
import { Navbar } from 'components/layout/navbar';
import { GeistSans } from 'geist/font/sans';
import { getCart } from 'lib/shopify';
import { getClientConfig } from 'lib/get-client-config';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';
import { baseUrl } from 'lib/utils';
import { ClientConfig } from 'lib/client-config';

const { SITE_NAME } = process.env;

// Per-tenant <title> and metadata. When a request comes in on
// kongclave.filamentfarmmfg.com, the middleware sets a `client-subdomain`
// cookie. getClientConfig() reads that cookie and returns the matching
// client. We use the client name as the site name for both the default
// document title and the `%s | <site>` template that child pages append to.
// Falls back to the SITE_NAME env var (or a hardcoded default) for the
// root domain and any non-tenant request.
export async function generateMetadata(): Promise<Metadata> {
  const client = await getClientConfig();
  const siteName = client?.name || SITE_NAME || 'Filament Farm MFG';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: siteName,
      template: `%s | ${siteName}`
    },
    robots: {
      follow: true,
      index: true
    }
  };
}

const defaultClientConfig: ClientConfig = {
  name: 'Filament Farm MFG',
  logoUrl: '/logo.png', // A sensible default
  shopifyCollectionHandle: 'all', // Default to all products
  theme: {
    primaryColor: '#000000',
    backgroundColor: '#ffffff',
    textColor: '#000000'
  }
};

export default async function Layout({
  children
}: {
  children: ReactNode;
}) {
  // Note: intentionally NOT awaited. getCart() returns a Promise that we
  // hand to <CartProvider> as `cartPromise`. The provider streams it to the
  // client and resolves inside a Suspense boundary, which is the modern
  // Next.js streaming pattern. Awaiting here would block the entire page
  // render on the cart fetch.
  const cart = getCart();
  const clientFromConfig = await getClientConfig();
  const client = clientFromConfig || defaultClientConfig;

  const backgroundColor = client.theme.backgroundColor;
  const textColor = client.theme.textColor;
  const accentColor = client.theme.primaryColor;
  const productButtonColor =
    client.theme.productButtonColor ?? accentColor;
  const productButtonHoverColor =
    client.theme.productButtonHoverColor ?? '#333333';

  return (
    <html lang="en" className={GeistSans.variable}>
      <body
        style={
          {
            backgroundColor: backgroundColor,
            '--bg-color': backgroundColor,
            '--text-color': textColor,
            '--accent-color': accentColor,
            '--product-button': productButtonColor,
            '--product-button-hover': productButtonHoverColor
          } as React.CSSProperties
        }
      >
        <CartProvider cartPromise={cart}>
          <Navbar client={client} />
          <main>
            {children}
            <Toaster closeButton />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
