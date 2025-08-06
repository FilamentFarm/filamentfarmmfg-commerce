import { CartProvider } from 'components/cart/cart-context';
import { Navbar } from 'components/layout/navbar';
import { WelcomeToast } from 'components/welcome-toast';
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

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  const cart = getCart();
  const client = await getClientConfig();

  const backgroundColor = client?.theme?.backgroundColor ?? '#ffffff';
  const textColor = client?.theme?.textColor ?? '#000000';
  const accentColor = client?.theme?.primaryColor ?? '#00ff00';

  return (
    <html lang="en" className={GeistSans.variable}>
      <body
        style={{
          '--bg-color': backgroundColor,
          '--text-color': textColor,
          '--accent-color': accentColor,
          '--product-button': client?.theme?.productButtonColor ?? accentColor,
          '--product-button-hover': client?.theme?.productButtonHoverColor ?? '#333333'
        }} as React.CSSProperties}

        }
        className="bg-[var(--bg-color)] text-[var(--text-color)] selection:bg-[var(--accent-color)]"
      >
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton />
            <WelcomeToast />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
