// app/catalog/page.tsx
import { getClientConfig } from 'lib/get-client-config';
import { getCollectionProducts, getProducts } from 'lib/shopify';
import ProductGridItems from 'components/layout/product-grid-items';

export const metadata = {
  title: 'All Products',
  description: 'Browse all products from this client'
};

export default async function CatalogPage() {
  const cfg = await getClientConfig();

  const handle =
    (cfg as any)?.branding?.allProductsCollectionHandle ??
    (cfg as any)?.allProductsCollectionHandle ??
    (cfg as any)?.shopifyCollectionHandle ??
    null;

  const products = handle
    ? await getCollectionProducts({ collection: handle })
    : await getProducts({});

  return (
    <div className="mx-auto max-w-(--breakpoint-2xl) px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-[var(--text-color)]">All Products</h1>
      <ProductGridItems products={products} />
    </div>
  );
}
