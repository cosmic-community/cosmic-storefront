import Link from 'next/link';
import { getCollections, getProducts } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import CollectionCard from '@/components/CollectionCard';
import { ArrowRight } from 'lucide-react';

export default async function Home() {
  const [featuredProducts, collections] = await Promise.all([
    getProducts(4),
    getCollections(),
  ]);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="https://imgix.cosmicjs.com/cf380960-d33c-11f0-b693-79ceb5783a41-photo-1553062407-98eeb64c6a62-1765091857527.jpg?w=1600&h=900&fit=crop&auto=format,compress"
            alt="Hero Background"
            className="h-full w-full object-cover opacity-60"
          />
        </div>
        <div className="relative container mx-auto flex h-full items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Summer Collection 2025
            </h1>
            <p className="mt-4 text-xl text-gray-200">
              Discover the latest trends in sustainable fashion. Crafted with care, designed for life.
            </p>
            <div className="mt-8">
              <Link
                href="/collections/summer-essentials"
                className="inline-flex items-center rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-100"
              >
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Collections</h2>
          <Link href="/collections" className="text-sm font-medium text-gray-600 hover:text-black">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">New Arrivals</h2>
          <Link href="/products" className="text-sm font-medium text-gray-600 hover:text-black">
            View all
          </Link>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}