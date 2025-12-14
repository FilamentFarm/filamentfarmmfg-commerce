// components/grid/three-item-hero.tsx
import { GridTileImage } from 'components/grid/tile';
import { getClientConfig } from 'lib/get-client-config';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';
import type { CSSProperties } from 'react';

// Adjust this to cap the hero image height; only affects images taller than this.
const HERO_MAX_HEIGHT_PX = 560;

function pickRandomProducts(items: Product[], count: number): Product[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function ThreeItemHeroTile({
  product,
  variant,
  priority
}: {
  product: Product;
  variant: 'hero' | 'side';
  priority?: boolean;
}) {
  const img = product.featuredImage;
  const aspectRatio =
    img?.width && img?.height ? `${img.width}/${img.height}` : '4/5';

  const tileStyle: CSSProperties =
    variant === 'hero'
      ? { aspectRatio, maxHeight: `${HERO_MAX_HEIGHT_PX}px` }
      : { aspectRatio };

  return (
    <div
      className={
        variant === 'hero'
          ? 'md:col-span-4 md:row-span-2'
          : 'md:col-span-2 md:row-span-1'
      }
      style={tileStyle}
    >
      <Link
        href={`/product/${product.handle}`}
        prefetch={true}
        className="relative block h-full w-full"
      >
        <GridTileImage
          src={img.url}
          alt={img.altText ?? product.title}
          fill
          sizes={
            variant === 'hero'
              ? '(min-width: 768px) 66vw, 100vw'
              : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          label={{
            position: 'bottom',
            title: product.title,
            amount: product.priceRange.maxVariantPrice.amount,
            currencyCode: product.priceRange.maxVariantPrice.currencyCode
          }}
          className="h-full"
        />
      </Link>
    </div>
  );
}

export async function ThreeItemHero() {
  const client = await getClientConfig();
  const collection =
    client?.shopifyCollectionHandle ?? 'hidden-homepage-featured-items';
  const products = await getCollectionProducts({ collection });

  if (!products.length) return null;

  const featured = pickRandomProducts(products, 3);

  return (
    <section
      className="mx-auto grid max-w-(--breakpoint-2xl) gap-4 px-4 pt-6 pb-4 md:grid-cols-6 md:grid-rows-2"
      style={{ backgroundColor: client?.theme.backgroundColor }}
    >
      {featured[0] && (
        <ThreeItemHeroTile product={featured[0]} variant="hero" priority />
      )}
      {featured[1] && (
        <ThreeItemHeroTile product={featured[1]} variant="side" priority />
      )}
      {featured[2] && (
        <ThreeItemHeroTile product={featured[2]} variant="side" />
      )}
    </section>
  );
}
