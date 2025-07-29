'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 opacity-80">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-pink-600">
          <img src="logo.png" alt="logo" className='h-10'/>
        </Link>
        <div className="flex gap-6 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-pink-500">Home</Link>
          <Link href="/shop" className="hover:text-pink-500">Shop</Link>
          <Link href="/community" className="hover:text-pink-500">Community</Link>
          <Link href="/dashboard" className="hover:text-pink-500">dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
