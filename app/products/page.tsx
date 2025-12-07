import { getProducts } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';

export const metadata = {
  title: 'All Products | Cosmic Storefront',
  description: 'Browse all our high-quality products.',
};

export default async function ProductsPage() {
  const products = await getProducts(100);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">All Products</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}