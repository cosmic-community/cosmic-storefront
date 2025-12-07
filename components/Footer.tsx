import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-center text-sm text-gray-500 md:text-left">
            &copy; {new Date().getFullYear()} Cosmic Store. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/products" className="text-sm text-gray-500 hover:text-gray-900">
              Products
            </Link>
            <Link href="/collections" className="text-sm text-gray-500 hover:text-gray-900">
              Collections
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}