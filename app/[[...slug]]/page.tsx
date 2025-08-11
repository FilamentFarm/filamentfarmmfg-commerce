// app/[[...slug]]/page.tsx

import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { getClientConfig } from 'lib/get-client-config';
import ClientLogoBanner from '@/components/layout/client-logo-banner';

export const metadata = {
  description:
    'High‑performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: { type: 'website' }
};

export default async function HomePage() {
  // ...existing data fetching / code
  return (
    <>
      <ClientLogoBanner />
      {/* Product tiles / grids follow */}
    </>
  );
}

      <ThreeItemGrid />
      <Footer />
    </>
  );
}
