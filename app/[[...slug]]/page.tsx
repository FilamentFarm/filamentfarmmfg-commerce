import ClientLogoBanner from 'components/layout/client-logo-banner';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { getClientConfig } from 'lib/get-client-config';
import { notFound } from 'next/navigation';
import { getCollectionProducts } from 'lib/shopify';
import ProductGridItems from 'components/layout/product-grid-items';
import Grid from 'components/grid';
import Link from 'next/link';
import type { CSSProperties } from 'react';

export const metadata = {
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: { type: 'website' }
};

export default async function HomePage() {
  const clientConfig = await getClientConfig();

  if (!clientConfig) {
    return notFound();
  }

  const allProducts = await getCollectionProducts({
    collection: clientConfig.shopifyCollectionHandle
  });
  const productsToShow = allProducts.slice(0, 6);
  const productButtonColor =
    clientConfig.theme.productButtonColor || clientConfig.theme.primaryColor;

  return (
    <>
      <ClientLogoBanner />
      <ThreeItemGrid />

      {/* New Product Grid Section */}
      {productsToShow.length > 0 && (
        <section style={{ backgroundColor: clientConfig.theme.backgroundColor }} className="py-8">
          <div className="mx-auto max-w-screen-2xl px-4">
            <h2 className="mb-4 text-2xl font-bold" style={{ color: clientConfig.theme.textColor }}>
              Featured Products
            </h2>
            <Grid className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              <ProductGridItems 
                products={productsToShow} 
                accentColor={clientConfig.theme.productButtonColor} // Use productButtonColor for border
                borderWidth={clientConfig.theme.productCardBorderWidth} // Pass borderWidth
              />
            </Grid>

            {allProducts.length > 6 && (
              <div className="mt-8 text-center">
                <Link
                  href="/search/all"
                  className="inline-block rounded-full px-8 py-3 text-lg font-medium text-white transition hover:opacity-90"
                  style={{ backgroundColor: productButtonColor } as CSSProperties}
                >
                  View All
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
