'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shirt, ShoppingBag, Layers, Footprints } from 'lucide-react';

const categories = [
  {
    name: 'Dresses',
    icon: Layers,
    image: '/cat_jeans.png', 
  },
  {
    name: 'Tops',
    icon: Shirt,
    image: '/cat_top.png',
  },
  {
    name: 'Bottoms',
    icon: ShoppingBag,
    image: 'cat_bottom.png',
  },
  {
    name: 'Footwear',
    icon: Footprints,
    image: 'cat_shoe.png',
  },
  {
    name: 'Bags',
    icon: ShoppingBag,
    image: 'cat_bag.png',
  },
];

const Card = ({ className = '', children, ...props }) => {
  return (
    <div
      className={`rounded-lg border border-gray-300 bg-white text-black shadow-sm ${className} hover:border-b-fuchsia-300`}{...props}>
      {children}
    </div>
  );
};
const CardContent = ({ className = '', children, ...props }) => {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
};

const Category = () => {
  return (
    <section className="py-16 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-deep-plum mb-8 text-center font-bold">
          SHOP BT CATEGORY
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
          <Link
            href={'/shop?category=' + category.name.toLowerCase()}
            key={category.name}
          >
            <Card className="group cursor-pointer ">
              <CardContent className="p-0">
                <div className="relative w-full">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-70 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors rounded-t-lg" />
                </div>
                <div className="p-4 bg-gradient-to-b from-peach-pink to-white flex flex-col items-center justify-center rounded-b-lg">
                  <category.icon className="h-5 w-5 text-hot-pink mb-1" />
                  <h3 className="font-semibold text-deep-plum">{category.name}</h3>
                </div>
              </CardContent>
            </Card>
          </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Category;
