'use client';

import { Collection } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCollection?: string;
  onCollectionChange?: (collectionId: string) => void;
  collections?: Collection[];
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'name';
  onSortChange: (sort: 'newest' | 'price-asc' | 'price-desc' | 'name') => void;
  showInStock: boolean;
  onShowInStockChange: (show: boolean) => void;
  hideCollectionFilter?: boolean;
}

export default function SearchAndFilters({
  searchQuery,
  onSearchChange,
  selectedCollection,
  onCollectionChange,
  collections,
  priceRange,
  onPriceRangeChange,
  maxPrice,
  sortBy,
  onSortChange,
  showInStock,
  onShowInStockChange,
  hideCollectionFilter = false,
}: SearchAndFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = 
    searchQuery !== '' || 
    (selectedCollection && selectedCollection !== 'all') ||
    priceRange[0] !== 0 || 
    priceRange[1] !== maxPrice ||
    showInStock;

  const clearAllFilters = () => {
    onSearchChange('');
    if (onCollectionChange) onCollectionChange('all');
    onPriceRangeChange([0, maxPrice]);
    onShowInStockChange(false);
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Toggle */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap"
        >
          <SlidersHorizontal className="h-5 w-5" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 px-2 py-0.5 text-xs font-semibold bg-blue-600 text-white rounded-full">
              Active
            </span>
          )}
        </button>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as any)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Collection Filter */}
            {!hideCollectionFilter && collections && onCollectionChange && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Collection
                </label>
                <select
                  value={selectedCollection}
                  onChange={(e) => onCollectionChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Collections</option>
                  {collections.map((collection) => (
                    <option key={collection.id} value={collection.id}>
                      {collection.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const value = Math.max(0, Math.min(Number(e.target.value), priceRange[1]));
                      onPriceRangeChange([value, priceRange[1]]);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Min"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const value = Math.max(priceRange[0], Number(e.target.value));
                      onPriceRangeChange([priceRange[0], value]);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Max"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                  className="w-full"
                />
                <p className="text-sm text-gray-600">
                  {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </p>
              </div>
            </div>

            {/* Stock Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showInStock}
                  onChange={(e) => onShowInStockChange(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">In stock only</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}