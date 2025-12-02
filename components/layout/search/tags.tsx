import clsx from 'clsx';
import { Suspense } from 'react';

import { getClientConfig } from 'lib/get-client-config';
import { getCollectionProducts } from 'lib/shopify';
import FilterList from './filter';

async function TagList() {
  const clientConfig = await getClientConfig();
  const products = await getCollectionProducts({ collection: clientConfig.shopifyCollectionHandle });

  let tags: string[] = [];
  products.forEach((product) => {
    tags.push(...product.tags);
  });

  const uniqueTags = [...new Set(tags)];
  const formattedTags = [
    { title: 'All', path: '/search/all' },
    ...uniqueTags.map((tag) => ({
      title: tag,
      path: `/search/${tag}`
    }))
  ];

  return <FilterList list={formattedTags} title="Tags" />;
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded-sm';
const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300';
const items = 'bg-neutral-400 dark:bg-neutral-700';

export default function Tags() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <TagList />
    </Suspense>
  );
}
