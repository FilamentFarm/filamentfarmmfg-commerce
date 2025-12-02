import ClientLogoBanner from 'components/layout/client-logo-banner';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { getClientConfig } from 'lib/get-client-config';
import { notFound } from 'next/navigation';

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

  return (
    <>
      <ClientLogoBanner />
      <ThreeItemGrid />
      <Footer />
    </>
  );
}
