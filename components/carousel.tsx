'use client';

import { useEffect, useState } from 'react';
import { getCollectionProducts } from 'lib/shopify';
import { CLIENT_CONFIGS } from 'lib/client-config';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';
import Image from 'next/image';

export default function Carousel() {
  const [products, setProducts] = useState<Product[]>([]);

  // Read the subdomain from browser cookie
  function getCookieSubdomain(): string | null {
    if (typeof document === 'undefined') return null;

    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith('client-subdomain='));

    return match?.split('=')[1] ?? null;
  }

  useEffect(() => {
    (async () => {
      const subdomain = getCookieSubdomain();
      const config = subdomain ? CLIENT_CONFIGS[subdomain] : null;
      const collectionHandle =
        config?.shopifyCollectionHandle ?? 'hidden-homepage-featured-items';

      const items = await getCollectionProducts({ collection: collectionHandle });

      setProducts(items.slice(0, 3)); // limit to 3 items
    })();
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="overflow-x-auto py-8 px-4">
      <div className="flex gap-6 snap-x snap-mandatory scroll-pl-4 overflow-x-scroll">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.handle}`}
            className="min-w-[250px] max-w-xs snap-center rounded border border-gray-800 bg-gray-900 p-4 text-center"
          >
            <div className="relative aspect-square">
              <Image
                src={product.featuredImage.url}
                alt={product.title}
                fill
                className="object-cover rounded"
              />
            </div>
            <h2 className="mt-4 font-semibold text-white">{product.title}</h2>
            <p className="text-gray-400">
              {product.priceRange.maxVariantPrice.amount}{' '}
              {product.priceRange.maxVariantPrice.currencyCode}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
