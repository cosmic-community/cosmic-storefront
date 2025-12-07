'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from './CartProvider';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { count, setIsOpen: setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 lg:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight">COSMIC STORE</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="/products"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-black"
            >
              All Products
            </Link>
            <Link
              href="/collections"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-black"
            >
              Collections
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center p-2 text-gray-700 transition-colors hover:text-black"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-6 w-6" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <button
            className="block md:hidden p-2 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t md:hidden bg-white">
          <nav className="flex flex-col space-y-4 p-4">
            <Link
              href="/products"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            <Link
              href="/collections"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}