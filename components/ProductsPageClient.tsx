'use client';

import { useState, useMemo } from 'react';
import { Product, Collection } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import SearchAndFilters from '@/components/SearchAndFilters';

interface ProductsPageClientProps {
  products: Product[];
  collections: Collection[];
}

export default function ProductsPageClient({ products, collections }: ProductsPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
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

    // Collection filter
    if (selectedCollection !== 'all') {
      filtered = filtered.filter(
        (product) => product.metadata.collection?.id === selectedCollection
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
  }, [products, searchQuery, selectedCollection, priceRange, sortBy, showInStock]);

  const maxPrice = useMemo(() => {
    return Math.max(...products.map((p) => p.metadata.price), 1000);
  }, [products]);

  return (
    <>
      <SearchAndFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCollection={selectedCollection}
        onCollectionChange={setSelectedCollection}
        collections={collections}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        maxPrice={maxPrice}
        sortBy={sortBy}
        onSortChange={setSortBy}
        showInStock={showInStock}
        onShowInStockChange={setShowInStock}
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
                setSelectedCollection('all');
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