import { CartProvider } from 'components/cart/cart-context';
import { Navbar } from 'components/layout/navbar';
import { GeistSans } from 'geist/font/sans';
import { getCart } from 'lib/shopify';
import { getClientConfig } from 'lib/get-client-config';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';
import { baseUrl } from 'lib/utils';
import { ClientConfig } from 'lib/client-config';

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  }
};

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
