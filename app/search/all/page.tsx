import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getCollectionProducts } from 'lib/shopify'; // Changed to getCollectionProducts
import { getClientConfig } from 'lib/get-client-config';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
};

export default async function SearchPage({ searchParams: searchParamsPromise }: { searchParams?: Promise<any> }) {
  const clientConfig = await getClientConfig();
  if (!clientConfig) return notFound();

  const searchParams = await searchParamsPromise; // Await the promise
  const { sort } = (searchParams || {}) as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  
  // CRITICAL FIX: Use getCollectionProducts with the client's handle
  const products = await getCollectionProducts({ 
    collection: clientConfig.shopifyCollectionHandle, // Filter by client's collection
    sortKey,
    reverse
  });

  return (
    <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <ProductGridItems 
        products={products} 
        accentColor={clientConfig.theme.productButtonColor} // Use productButtonColor for border
        borderWidth={clientConfig.theme.productCardBorderWidth} // Pass borderWidth
      />
    </Grid>
  );
}
