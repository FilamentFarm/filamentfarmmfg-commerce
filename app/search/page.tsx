import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getCollectionProducts } from 'lib/shopify';
import { getClientConfig } from 'lib/get-client-config';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = (searchParams || {}) as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const clientConfig = await getClientConfig();

  if (!clientConfig) {
    console.log('DEBUG: clientConfig is null, returning notFound().');
    return notFound();
  }

  console.log('DEBUG: clientConfig loaded:', clientConfig);
  const products = await getCollectionProducts({
    collection: clientConfig.shopifyCollectionHandle,
    sortKey,
    reverse,
    query: searchValue || undefined
  });

  console.log('DEBUG: Products fetched:', products);

  const resultsText = products.length > 1 ? 'results' : 'result';

  let content;

  if (searchValue) {
    if (products.length === 0) {
      content = (
        <p className="mb-4">
          {`No products found in ${clientConfig.name}'s collection that match "${searchValue}"`}
        </p>
      );
    } else {
      content = (
        <p className="mb-4">
          {`Showing ${products.length} ${resultsText} for "${searchValue}"`}
        </p>
      );
    }
  } else if (products.length === 0) {
    content = (
      <p className="py-3 text-lg">{`No products found in ${clientConfig.name}'s collection.`}</p>
    );
  } else {
    content = (
      <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <ProductGridItems products={products} />
      </Grid>
    );
  }

  return <>{content}</>;
}
