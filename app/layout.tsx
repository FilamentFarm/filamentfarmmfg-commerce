import { CartProvider } from 'components/cart/cart-context';
import { Navbar } from 'components/layout/navbar';
//import { WelcomeToast } from 'components/welcome-toast';
import { GeistSans } from 'geist/font/sans';
import { getCart } from 'lib/shopify';
import { getClientConfig } from 'lib/get-client-config';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';
import { baseUrl } from 'lib/utils';

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

export default async function Layout({
  children
}: {
  children: ReactNode;
}) {
  const cart = getCart();
  const client = await getClientConfig();

  const backgroundColor = client?.theme?.backgroundColor ?? '#ffffff';
  const textColor = client?.theme?.textColor ?? '#000000';
  const accentColor = client?.theme?.primaryColor ?? '#00ff00';
  const productButtonColor =
    client?.theme?.productButtonColor ?? accentColor;
  const productButtonHoverColor =
    client?.theme?.productButtonHoverColor ?? '#333333';

  const brandLogo = client?.logoUrl ?? '';
  const brandName = client?.name ?? 'Filament Farm MFG';

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
        data-brand-logo={brandLogo}
        data-brand-name={brandName}
      >
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton />
            {/* <WelcomeToast /> */}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
