'use server';

import { getCollectionProducts } from './index';

export async function getClientProducts(collectionHandle: string) {
  return await getCollectionProducts({ collection: collectionHandle });
}
