'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react'; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 opacity-95">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-pink-600 flex items-center">
          <Image src="/logo.png" alt="Thrift Up Logo" width={100} height={120} className="sm:h-6 md:h-9 w-auto" />
        </Link>

        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-pink-500">Home</Link>
          <Link href="/shop" className="hover:text-pink-500">Shop</Link>
          <Link href="/community" className="hover:text-pink-500">Community</Link>
          <Link href="/dashboard" className="hover:text-pink-500">Dashboard</Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3 shadow-md">
          <Link href="/" className="block text-gray-700 hover:text-pink-500">Home</Link>
          <Link href="/shop" className="block text-gray-700 hover:text-pink-500">Shop</Link>
          <Link href="/community" className="block text-gray-700 hover:text-pink-500">Community</Link>
          <Link href="/dashboard" className="block text-gray-700 hover:text-pink-500">Dashboard</Link>
        </div>
      )}
    </nav>
  );
}
