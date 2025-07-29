'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';

// Dummy product data
const categoryData = {
  dresses: [
    { id: 1, name: 'Floral Summer Dress', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80', price: '$25.00' },
    { id: 2, name: 'Boho Maxi Dress', image: 'https://images.unsplash.com/photo-1612423284934-3c6d28a9db8c?w=500&q=80', price: '$32.00' },
  ],
  tops: [
    { id: 3, name: 'White Linen Top', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80', price: '$18.00' },
    { id: 4, name: 'Striped Crop Top', image: 'https://images.unsplash.com/photo-1602810317999-e06b0e12c0dd?w=500&q=80', price: '$20.00' },
  ],
  accessories: [
    { id: 5, name: 'Gold Hoop Earrings', image: 'https://images.unsplash.com/photo-1603561591411-77c5c797f5aa?w=500&q=80', price: '$10.00' },
    { id: 6, name: 'Beaded Necklace', image: 'https://images.unsplash.com/photo-1606149059549-203f03883e34?w=500&q=80', price: '$14.00' },
  ],
  footwear: [
    { id: 7, name: 'White Sneakers', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80', price: '$35.00' },
    { id: 8, name: 'Brown Sandals', image: 'https://images.unsplash.com/photo-1588174273420-d98edc2f8c1b?w=500&q=80', price: '$22.00' },
  ],
  bags: [
    { id: 9, name: 'Leather Tote', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&q=80', price: '$28.00' },
    { id: 10, name: 'Canvas Backpack', image: 'https://images.unsplash.com/photo-1502394201059-4a6f268f3c11?w=500&q=80', price: '$30.00' },
  ],
};

// Capitalize function
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Card component
const Card = ({ product }) => (
  <div className="rounded-lg overflow-hidden border border-gray-200 bg-white hover:shadow-md transition-shadow">
    <img src={product.image} alt={product.name} className="w-full h-60 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-deep-plum">{product.name}</h3>
      <p className="text-hot-pink font-bold">{product.price}</p>
    </div>
  </div>
);

const CategoryPage = () => {
  const { name } = useParams();
  const category = name.toLowerCase();

  if (!categoryData[category]) return notFound();

  const products = categoryData[category];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-deep-plum mb-8 text-center">
        {capitalize(category)} Collection
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
