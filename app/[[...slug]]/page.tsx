// app/[[...slug]]/page.tsx

import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { getClientConfig } from 'lib/get-client-config';

export const metadata = {
  description:
    'High‑performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: { type: 'website' }
};

export default async function PageWrapper() {
  const client = await getClientConfig();

  const title = client?.name ?? 'Filament Farm MFG';
  const tagline = `Custom 3D printing, storefronts, and fulfillment for ${
    client?.name || 'miniature creators'
  }`;

  return (
    <>
<section
  className="px-6 py-10 text-center"
  style={{
    backgroundColor: client?.theme?.backgroundColor ?? '#000',
    color: client?.theme?.textColor ?? '#fff'
  }}
>
  <h1 className="text-4xl font-bold">
    {client?.name ?? 'Filament Farm MFG'}
  </h1>
  <p className="mt-4 text-lg">
    Custom 3D printing, storefronts, and fulfillment for {client?.name || 'miniature creators'}.
  </p>
</section>

        {client?.logoUrl && (
          <img
            src={client.logoUrl}
            alt={`${client.name} logo`}
            className="mx-auto mt-6 h-12"
          />
        )}
      </section>

      <ThreeItemGrid />
      <Footer />
    </>
  );
}
