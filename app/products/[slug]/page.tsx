// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getProductBySlug, getProductReviews } from '@/lib/cosmic';
import { formatPrice } from '@/lib/utils';
import ProductGallery from '@/components/ProductGallery';
import ReviewList from '@/components/ReviewList';
import ReviewForm from '@/components/ReviewForm';
import ReactMarkdown from 'react-markdown';
import AddToCartButton from '@/components/AddToCartButton';

// Must export this to enable AddToCartButton usage without importing the component file directly here if it were client-side only
// But for now we create a small client component inline or separate file. Let's make a separate file.
// Wait, I forgot to create AddToCartButton.tsx in the list. I will create it below or inline it if simple.
// I'll create it as a separate file for cleanliness.

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.title} | Cosmic Storefront`,
    description: product.metadata.description.substring(0, 160),
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  const reviews = await getProductReviews(product.id);
  const averageRating = reviews.length
    ? reviews.reduce((acc, review) => acc + parseInt(review.metadata.rating), 0) / reviews.length
    : 0;

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Gallery */}
        <ProductGallery product={product} />

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <div className="mt-4 flex items-center gap-4">
            <p className="text-2xl font-medium text-gray-900">
              {formatPrice(product.metadata.price)}
            </p>
            {reviews.length > 0 && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <span className="font-bold text-yellow-500">★</span>
                <span>{averageRating.toFixed(1)}</span>
                <span>({reviews.length} reviews)</span>
              </div>
            )}
          </div>

          <div className="mt-8 prose prose-sm text-gray-600">
            <ReactMarkdown>{product.metadata.description}</ReactMarkdown>
          </div>

          <div className="mt-8 border-t pt-8">
            <p className="text-sm text-gray-500 mb-4">SKU: {product.metadata.sku}</p>
            {product.metadata.in_stock ? (
              <AddToCartButton product={product} />
            ) : (
              <button
                disabled
                className="w-full rounded-md bg-gray-200 px-8 py-3 text-base font-medium text-gray-500 cursor-not-allowed"
              >
                Out of Stock
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-20 border-t pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <ReviewList reviews={reviews} />
          </div>
          <div>
            <ReviewForm productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}