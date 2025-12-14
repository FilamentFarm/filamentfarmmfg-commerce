// components/grid/three-items.tsx
import { GridTileImage } from 'components/grid/tile';
import { getClientConfig } from 'lib/get-client-config';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

// Clamp the hero (largest) tile height so big images don't blow out the layout
const HERO_HEIGHT = 'clamp(320px, 70vw, 560px)';

function pickRandomProducts(items: Product[], count: number): Product[] {
  // Shallow copy to avoid mutating source array, then shuffle.
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: Product;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  const img = item.featuredImage;

  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
      style={size === 'full' ? { height: HERO_HEIGHT, overflow: 'hidden' } : undefined}
    >
      <Link
        href={`/product/${item.handle}`}
        prefetch={true}
        // ƒªØ‹,? Remove forced square/height so intrinsic sizing can work
        className="relative block h-full w-full"
      >
        <GridTileImage
          src={img.url}
          alt={img.altText ?? item.title}
          // ƒªØ‹,? Pass real dimensions to enable intrinsic mode
          width={img.width}
          height={img.height}
          // Keep sizes logic ƒ?" can be tuned later if desired
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          className="h-full"
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.title,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  const client = await getClientConfig();
  const collection = client?.shopifyCollectionHandle ?? 'hidden-homepage-featured-items';
  const products = await getCollectionProducts({ collection });

  if (!products.length) return null;

  const featured = pickRandomProducts(products, 3);

  return (
    <section
      className="mx-auto grid max-w-(--breakpoint-2xl) gap-4 px-4 pt-6 pb-4 md:grid-cols-6 md:grid-rows-2"
      style={{ backgroundColor: client?.theme.backgroundColor }}
    >
      {featured[0] && (
        <ThreeItemGridItem size="full" item={featured[0]} priority={true} />
      )}
      {featured[1] && (
        <ThreeItemGridItem size="half" item={featured[1]} priority={true} />
      )}
      {featured[2] && <ThreeItemGridItem size="half" item={featured[2]} />}
    </section>
  );
}
