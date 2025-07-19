'use client';

import React from 'react';
import { Shirt, ShoppingBag, Layers, Footprints } from 'lucide-react';

const categories = [
  {
    name: 'Dresses',
    icon: Layers,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80',
  },
  {
    name: 'Tops',
    icon: Shirt,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80',
  },
  {
    name: 'Accessories',
    icon: ShoppingBag,
    image: 'https://images.unsplash.com/photo-1603561591411-77c5c797f5aa?w=500&q=80',
  },
  {
    name: 'Footwear',
    icon: Footprints,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80',
  },
  {
    name: 'Bags',
    icon: ShoppingBag,
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&q=80',
  },
];

// ===== Card Component =====
const Card = ({ className = '', children, ...props }) => {
  return (
    <div
      className={`rounded-lg border border-gray-300 bg-white text-black shadow-sm ${className} hover:border-b-fuchsia-300`}
      {...props}
    >
      {children}
    </div>
  );
};

// ===== CardContent Component =====
const CardContent = ({ className = '', children, ...props }) => {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
};

// ===== Categories Section =====
const Categories = () => {
  return (
    <section className="py-16 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-deep-plum mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="group cursor-pointer hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-0">
                <div className="relative w-full">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-60 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors rounded-t-lg" />
                </div>
                <div className="p-4 bg-gradient-to-b from-peach-pink to-white flex flex-col items-center justify-center rounded-b-lg">
                  <category.icon className="h-5 w-5 text-hot-pink mb-1" />
                  <h3 className="font-semibold text-deep-plum">{category.name}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
