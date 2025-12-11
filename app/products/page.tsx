import { getProducts, getCollections } from '@/lib/cosmic';
import ProductsPageClient from '@/components/ProductsPageClient';

export const metadata = {
  title: 'All Products | Cosmic Storefront',
  description: 'Browse all our high-quality products.',
};

export default async function ProductsPage() {
  const [products, collections] = await Promise.all([
    getProducts(100),
    getCollections()
  ]);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">All Products</h1>
      <ProductsPageClient products={products} collections={collections} />
    </div>
  );
}