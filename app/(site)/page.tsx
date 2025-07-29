import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { getClientConfig } from 'lib/get-client-config';

export const metadata = {
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const client = await getClientConfig();

  const title = client?.name ?? 'Filament Farm MFG';
  const tagline =
    client?.theme.primaryColor && client?.theme.backgroundColor
      ? `Custom 3D printing, storefronts, and fulfillment for ${client.name}.`
      : 'Custom 3D printing, storefronts, and fulfillment for miniature creators.';

  return (
    <>
      <section className="px-6 py-10 text-center">
        <h1 className="text-4xl font-bold text-white sm:text-6xl">{title}</h1>
        <p className="mt-4 text-lg text-gray-300">{tagline}</p>
        {client?.logoUrl && (
          <img
            src={client.logoUrl}
            alt={`${client.name} logo`}
            className="mx-auto mt-6 h-12"
          />
        )}
      </section>

      <ThreeItemGrid />
      <Carousel />
      <Footer />
    </>
  );
}
