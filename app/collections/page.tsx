import { getCollections } from '@/lib/cosmic';
import CollectionCard from '@/components/CollectionCard';

export const metadata = {
  title: 'Collections | Cosmic Storefront',
  description: 'Explore our curated collections.',
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Collections</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
}