// app/collections/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getCollectionBySlug, getProductsByCollection } from '@/lib/cosmic';
import CollectionPageClient from '@/components/CollectionPageClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return { title: 'Collection Not Found' };
  return {
    title: `${collection.title} | Cosmic Storefront`,
    description: collection.metadata.description || `Browse our ${collection.title} collection.`,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const products = await getProductsByCollection(collection.id);

  return (
    <div className="space-y-12 pb-12">
      {/* Collection Header */}
      <div className="relative h-[400px] w-full overflow-hidden bg-gray-900">
        <img
          src={`${collection.metadata.cover_image.imgix_url}?w=1600&h=600&fit=crop&auto=format,compress`}
          alt={collection.title}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="relative container mx-auto flex h-full flex-col justify-center px-4 text-white sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{collection.title}</h1>
          {collection.metadata.description && (
            <p className="mt-4 max-w-2xl text-lg text-gray-200">{collection.metadata.description}</p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <CollectionPageClient products={products} collectionTitle={collection.title} />
      </div>
    </div>
  );
}