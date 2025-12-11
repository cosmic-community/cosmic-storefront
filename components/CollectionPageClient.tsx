'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import SearchAndFilters from '@/components/SearchAndFilters';

interface CollectionPageClientProps {
  products: Product[];
  collectionTitle: string;
}

export default function CollectionPageClient({ products, collectionTitle }: CollectionPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'name'>('newest');
  const [showInStock, setShowInStock] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.metadata.description?.toLowerCase().includes(query) ||
          product.metadata.sku?.toLowerCase().includes(query)
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.metadata.price >= priceRange[0] &&
        product.metadata.price <= priceRange[1]
    );

    // Stock filter
    if (showInStock) {
      filtered = filtered.filter((product) => product.metadata.in_stock);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.metadata.price - b.metadata.price;
        case 'price-desc':
          return b.metadata.price - a.metadata.price;
        case 'name':
          return a.title.localeCompare(b.title);
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    return filtered;
  }, [products, searchQuery, priceRange, sortBy, showInStock]);

  const maxPrice = useMemo(() => {
    return Math.max(...products.map((p) => p.metadata.price), 1000);
  }, [products]);

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">{products.length} Products</h2>
      
      <SearchAndFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        maxPrice={maxPrice}
        sortBy={sortBy}
        onSortChange={setSortBy}
        showInStock={showInStock}
        onShowInStockChange={setShowInStock}
        hideCollectionFilter
      />

      <div className="mt-8">
        <p className="text-sm text-gray-600 mb-4">
          Showing {filteredAndSortedProducts.length} of {products.length} products
        </p>
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setPriceRange([0, maxPrice]);
                setShowInStock(false);
              }}
              className="mt-4 text-blue-600 hover:text-blue-700 underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}