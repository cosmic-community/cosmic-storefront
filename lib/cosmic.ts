import { createBucketClient } from '@cosmicjs/sdk';
import { Product, Collection, Review } from '@/lib/types';

const COSMIC_BUCKET_SLUG = process.env.COSMIC_BUCKET_SLUG || '';
const COSMIC_READ_KEY = process.env.COSMIC_READ_KEY || '';
const COSMIC_WRITE_KEY = process.env.COSMIC_WRITE_KEY || '';

export const cosmic = createBucketClient({
  bucketSlug: COSMIC_BUCKET_SLUG,
  readKey: COSMIC_READ_KEY,
  writeKey: COSMIC_WRITE_KEY,
  apiEnvironment: "staging"
});

export async function getProducts(limit = 20): Promise<Product[]> {
  try {
    const data = await cosmic.objects
      .find({ type: 'products' })
      .props('id,slug,title,metadata')
      .depth(1)
      .limit(limit);
    return data.objects as Product[];
  } catch (error) {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const data = await cosmic.objects
      .findOne({ type: 'products', slug })
      .props('id,slug,title,metadata')
      .depth(1);
    return data.object as Product;
  } catch (error) {
    return null;
  }
}

export async function getCollections(): Promise<Collection[]> {
  try {
    const data = await cosmic.objects
      .find({ type: 'collections' })
      .props('id,slug,title,metadata');
    return data.objects as Collection[];
  } catch (error) {
    return [];
  }
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  try {
    const data = await cosmic.objects
      .findOne({ type: 'collections', slug })
      .props('id,slug,title,metadata');
    return data.object as Collection;
  } catch (error) {
    return null;
  }
}

export async function getProductsByCollection(collectionId: string): Promise<Product[]> {
  try {
    const data = await cosmic.objects
      .find({
        type: 'products',
        'metadata.collection': collectionId,
      })
      .props('id,slug,title,metadata')
      .depth(1);
    return data.objects as Product[];
  } catch (error) {
    return [];
  }
}

export async function getProductReviews(productId: string): Promise<Review[]> {
  try {
    const data = await cosmic.objects
      .find({
        type: 'reviews',
        'metadata.product': productId,
      })
      .props('id,title,metadata,created_at')
      .depth(1);
    return data.objects as Review[];
  } catch (error) {
    return [];
  }
}