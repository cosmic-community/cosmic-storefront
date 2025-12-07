'use client';

import { useState } from 'react';
import { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function ProductGallery({ product }: { product: Product }) {
  const images = [
    product.metadata.main_image,
    ...(product.metadata.image_gallery || []),
  ];
  const [activeImage, setActiveImage] = useState(0);

  if (!images.length) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={`${images[activeImage].imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
          alt={product.title}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex gap-4 overflow-auto pb-2">
        {images.map((image, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(idx)}
            className={cn(
              'relative aspect-square w-20 flex-none overflow-hidden rounded-md bg-gray-100 ring-2 ring-transparent transition-all hover:ring-black/20',
              activeImage === idx && 'ring-black'
            )}
          >
            <img
              src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
              alt={`${product.title} - view ${idx + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}