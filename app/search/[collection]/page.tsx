import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getClientConfig } from 'lib/get-client-config';

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const clientConfig = await getClientConfig();

  if (!clientConfig) return notFound();

  const clientCollectionHandle = clientConfig.shopifyCollectionHandle;
  const currentTag = params.collection === 'all' ? null : params.collection;

  const collection = await getCollection(clientCollectionHandle);

  if (!collection) return notFound();

  const title = currentTag
    ? `${collection.title} - ${currentTag} Products`
    : `${collection.title} Products`;
  const description = currentTag
    ? `All ${currentTag} products from the ${collection.title} collection`
    : `All products from the ${collection.title} collection`;

  return {
    title: collection.seo?.title || title,
    description: collection.seo?.description || description
  };
}

export default async function SearchPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const clientConfig = await getClientConfig();

  if (!clientConfig) return notFound();

  const clientCollectionHandle = clientConfig.shopifyCollectionHandle;
  const currentTag = params.collection === 'all' ? null : params.collection;

  const { sort } = (searchParams || {}) as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getCollectionProducts({
    collection: clientCollectionHandle,
    sortKey,
    reverse,
    query: currentTag ? `tag:${currentTag}` : undefined
  });

  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">
          {currentTag
            ? `No products found with tag \`${currentTag}\` in ${clientConfig.name}'s collection`
            : `No products found in ${clientConfig.name}'s collection`}
        </p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}
