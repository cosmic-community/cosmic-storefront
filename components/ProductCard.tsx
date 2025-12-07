import Link from 'next/link';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export default function ProductCard({ product }: { product: Product }) {
  const { title, slug, metadata } = product;

  return (
    <Link href={`/products/${slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={`${metadata.main_image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        {!metadata.in_stock && (
          <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 text-xs font-bold text-white rounded">
            Out of Stock
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{metadata.collection?.title}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{formatPrice(metadata.price)}</p>
      </div>
    </Link>
  );
}