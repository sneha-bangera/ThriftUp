'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const offers = [
  {
    title: 'Summer Collection',
    discount: '30% OFF',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
    description: 'Refresh your wardrobe with our stunning summer collection',
  },
  {
    title: 'New Arrivals',
    discount: 'First Pick',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80',
    description: 'Be the first to shop our latest arrivals, trendy and unique pieces',
  },
  {
    title: 'Accessories Deal',
    discount: 'Buy 2 Get 1',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=500&q=80',
    description: 'Complete your look with our trendy accessories',
  },
];

const Card = ({ className = '', children, ...props }) => {
  return (
    <div
      className={`group rounded-lg border border-gray-300 bg-white text-black shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
const CardContent = ({ className = '', children, ...props }) => {
  return (
    <div className={`p-0 ${className}`} {...props}>
      {children}
    </div>
  );
};
const Badge = ({ className = '', children, ...props }) => {
  return (
    <span
      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
const Button = ({ className = '', children, ...props }) => {
  return (
    <button
      className={`text-hot-pink hover:text-deep-plum hover:bg-peach-pink p-0 flex items-center transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Offers = () => {
  return (
    <section className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-deep-plum mb-8 text-center">
          SPECIAL OFFERS 
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <Link href="/shop" key={offer.title}>
            <Card key={offer.title}>
              <div className="transition-colors duration-300 group-hover:bg-cotton-candy-gradient">
                <CardContent>
                  <div className="relative w-full">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-64 object-cover"
                    />
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-peach-pink to-hot-pink text-white">
                      {offer.discount}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-deep-plum mb-2">
                      {offer.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{offer.description}</p>
                    <Button>
                      Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;
