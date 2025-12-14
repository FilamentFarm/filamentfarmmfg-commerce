// components/grid/three-items.tsx
import { GridTileImage } from 'components/grid/tile';
import { getClientConfig } from 'lib/get-client-config';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

function pickRandomProducts(items: Product[], count: number): Product[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: Product;
  size: 'hero' | 'side';
  priority?: boolean;
}) {
  const img = item.featuredImage;

  return (
    <Link
      href={`/product/${item.handle}`}
      prefetch={true}
      className={`relative block w-full ${size === 'hero' ? 'h-full' : 'h-full'}`}
    >
      <GridTileImage
        src={img.url}
        alt={img.altText ?? item.title}
        width={img.width}
        height={img.height}
        sizes={
          size === 'hero'
            ? '(min-width: 768px) 66vw, 100vw'
            : '(min-width: 768px) 33vw, 100vw'
        }
        priority={priority}
        label={{
          position: 'bottom',
          title: item.title,
          amount: item.priceRange.maxVariantPrice.amount,
          currencyCode: item.priceRange.maxVariantPrice.currencyCode
        }}
        className="h-full w-full"
      />
    </Link>
  );
}

export async function ThreeItemGrid() {
  const client = await getClientConfig();
  const collection =
    client?.shopifyCollectionHandle ?? 'hidden-homepage-featured-items';
  const products = await getCollectionProducts({ collection });

  if (!products.length) return null;

  const featured = pickRandomProducts(products, 3);

  return (
    <section
      className="mx-auto max-w-(--breakpoint-2xl) px-4 pt-6 pb-4"
      style={{ backgroundColor: client?.theme.backgroundColor }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {featured[0] && (
          <div className="md:flex-[2] flex-1">
            <ThreeItemGridItem size="hero" item={featured[0]} priority />
          </div>
        )}
        <div className="md:flex-1 flex flex-col gap-4 justify-center self-center w-full">
          {featured[1] && (
            <ThreeItemGridItem size="side" item={featured[1]} priority />
          )}
          {featured[2] && <ThreeItemGridItem size="side" item={featured[2]} />}
        </div>
      </div>
    </section>
  );
}
