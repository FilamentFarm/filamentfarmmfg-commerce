// components/grid/three-items.tsx
import { GridTileImage } from 'components/grid/tile';
import { getClientConfig } from 'lib/get-client-config';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

// Pick `count` items from the list, deterministically per UTC day.
// Why not Math.random()?  pickRandomProducts() used to call Math.random()
// inside a server component, which meant:
//   1. SEO crawlers, social-media link-preview bots, and cache snapshots
//      could each see a different trio of products on different fetches.
//      That's bad for sharing previews and for consistent SEO signals.
//   2. With React Server Component rendering + Vercel ISR, the picker
//      runs on every request that bypasses cache, so the homepage
//      "shuffles" in front of users who refresh.
// Deterministic-per-day means the trio rotates daily (still feels fresh)
// but stays stable across all requests within a single day, regardless
// of region, cache state, or refresh.
function pickDailyProducts(items: Product[], count: number): Product[] {
  if (items.length <= count) return items.slice();

  // Days since epoch — same value across all servers within a UTC day.
  const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));

  // Tiny linear-congruential PRNG seeded with the day number.
  // Same seed → same shuffle, every time.
  let state = day || 1;
  const rand = () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };

  // Fisher–Yates shuffle of indices, then take the first `count`.
  const indices = items.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [indices[i], indices[j]] = [indices[j]!, indices[i]!];
  }

  return indices.slice(0, count).map((i) => items[i]!);
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

  const featured = pickDailyProducts(products, 3);

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
