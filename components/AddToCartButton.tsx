'use client';

import { useCart } from './CartProvider';
import { Product } from '@/lib/types';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    addItem(product);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <button
      onClick={handleAdd}
      className={`flex w-full items-center justify-center gap-2 rounded-md px-8 py-3 text-base font-medium text-white shadow-sm transition-colors ${
        isAdding ? 'bg-green-600' : 'bg-black hover:bg-gray-800'
      }`}
    >
      <ShoppingBag className="h-5 w-5" />
      {isAdding ? 'Added to Cart' : 'Add to Cart'}
    </button>
  );
}