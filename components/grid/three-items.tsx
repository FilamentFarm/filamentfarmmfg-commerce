// components/grid/three-items.tsx
import { GridTileImage } from 'components/grid/tile';
import { getClientConfig } from 'lib/get-client-config';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

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
    <div className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}>
      <Link
        href={`/product/${item.handle}`}
        prefetch={true}
        // ⬇️ Remove forced square/height so intrinsic sizing can work
        className="relative block w-full"
      >
        <GridTileImage
          src={img.url}
          alt={img.altText ?? item.title}
          // ⬇️ Pass real dimensions to enable intrinsic mode
          width={img.width}
          height={img.height}
          // Keep sizes logic — can be tuned later if desired
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
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

  return (
    <section
      className="mx-auto grid max-w-(--breakpoint-2xl) gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2"
      style={{ backgroundColor: client?.theme.backgroundColor }}
    >
      {products[0] && (
        <ThreeItemGridItem size="full" item={products[0]} priority={true} />
      )}
      {products[1] && (
        <ThreeItemGridItem size="half" item={products[1]} priority={true} />
      )}
      {products[2] && <ThreeItemGridItem size="half" item={products[2]} />}
    </section>
  );
}
