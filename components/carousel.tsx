'use client';

import { getClientConfig } from 'lib/get-client-config';
import { getCollectionProducts } from 'lib/shopify';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Carousel() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const client = await getClientConfig();
      const collectionHandle =
        client?.shopifyCollectionHandle ?? 'hidden-homepage-featured-items';

      const items = await getCollectionProducts({ collection: collectionHandle });

      setProducts(items.slice(0, 3)); // max of 3
    })();
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="overflow-x-auto py-8 px-4">
      <div className="flex gap-6 snap-x snap-mandatory scroll-pl-4 overflow-x-scroll">
        {products.map((product: any) => (
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
              {product.priceRange.maxVariantPrice.amount} {product.priceRange.maxVariantPrice.currencyCode}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
