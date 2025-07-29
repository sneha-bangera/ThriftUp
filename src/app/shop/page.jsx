'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Star, MessageSquare } from "lucide-react";

// Tailwind utility class merger
const merge = (...classes) => classes.filter(Boolean).join(" ");

// UI COMPONENTS
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={merge("rounded-lg border bg-white shadow-md", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={merge("p-0", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={merge("text-lg font-semibold", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={merge("p-4", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={merge("p-4 pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

const Button = ({ className = '', children, ...props }) => (
  <button
    className={`text-white font-bold py-2 px-4 rounded transition-colors ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Badge = ({ className = '', children, ...props }) => (
  <span
    className={`cursor-pointer rounded-full px-4 py-2 font-medium text-sm ${className}`}
    {...props}
  >
    {children}
  </span>
);

// CATEGORY FILTER
const categories = ['All', 'Dresses', 'Tops', 'Bottoms', 'Footwear', 'Bags'];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  const fetchProducts = async (category = 'All') => {
    try {
      const res = await fetch(`/api/products?category=${category}`);
      const json = await res.json();
      if (json.success) setProducts(json.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts(activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-off-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((category) => (
          <Badge
            key={category}
            className={`${
              activeCategory === category
                ? "bg-hot-pink text-white"
                : "bg-peach-pink text-deep-plum"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length === 0 && (
          <p className="text-center col-span-full text-gray-500">No products found in this category.</p>
        )}
        {products.map((product) => (
          <Link key={product._id} href={`/shop/${product._id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-deep-plum mb-1">{product.name}</CardTitle>
                <p className="text-2xl font-bold text-hot-pink">{product.price}</p>
                <div className="flex items-center gap-4 mt-3 text-gray-500 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{product.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{product.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{product.comments}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full border border-hot-pink text-hot-pink hover:bg-peach-pink hover:text-deep-plum">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Shop;
