import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';

export const metadata = {
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>

      <section className="px-6 py-10 text-center">
        <h1 className="text-4xl font-bold text-white sm:text-6xl">Filament Farm MFG</h1>
        <p className="mt-4 text-lg text-gray-300">
          Custom 3D printing, storefronts, and fulfillment for miniature creators.
        </p>
      </section>

      
      <ThreeItemGrid />
      <Carousel />
      <Footer />
    </>
  );
}
