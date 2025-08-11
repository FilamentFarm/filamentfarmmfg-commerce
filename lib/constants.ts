export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: 'Relevance',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  { title: 'Trending', slug: 'trending-desc', sortKey: 'BEST_SELLING', reverse: false }, // asc
  { title: 'Latest arrivals', slug: 'latest-desc', sortKey: 'CREATED_AT', reverse: true },
  { title: 'Price: Low to high', slug: 'price-asc', sortKey: 'PRICE', reverse: false }, // asc
  { title: 'Price: High to low', slug: 'price-desc', sortKey: 'PRICE', reverse: true }
];

export const TAGS = {
  collections: 'collections',
  products: 'products',
  cart: 'cart'
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const STOREFRONT_API_VERSION =
  process.env.SHOPIFY_STOREFRONT_VERSION ?? '2025-07';

// Read and sanitize the store domain from env.
// Accepts values with or without protocol and trailing slash.
const rawDomain = process.env.SHOPIFY_STORE_DOMAIN ?? '';
export const SHOPIFY_STORE_DOMAIN = rawDomain
  .replace(/^https?:\/\//, '')
  .replace(/\/$/, '');

// Optional: fail fast if missing (helps avoid "Invalid URL")
if (!SHOPIFY_STORE_DOMAIN) {
  throw new Error('Missing SHOPIFY_STORE_DOMAIN env var (e.g., my-shop.myshopify.com)');
}

export const SHOPIFY_GRAPHQL_API_ENDPOINT =
  `https://${SHOPIFY_STORE_DOMAIN}/api/${STOREFRONT_API_VERSION}/graphql.json`;


