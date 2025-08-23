'use client';
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, Star, MessageSquare } from "lucide-react";

const categories = ['All', 'Dresses', 'Tops', 'Bottoms', 'Footwear', 'Bags'];

const Shop = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const initialCategory= categoryParam
    ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).toLowerCase()
    : 'All';

  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const fetchProducts = async (category = 'All') => {
  try {
    const url =
      category === 'All'
        ? `/api/products`
        : `/api/products?category=${encodeURIComponent(category)}`;

    const res = await fetch(url);
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
            onClick={() => {
              setActiveCategory(category);
              router.push(`/shop?category=${category.toLowerCase()}`);
            }}
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
          
            <Card key={product._id} className="hover:shadow-lg transition-shadow cursor-pointer border border-peach-pink">
              <Link href={`/shop/${product._id}`}>
              <CardHeader>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-t-lg p-4"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-deep-plum mb-1">{product.name}</CardTitle>
                <p className="text-2xl font-bold text-hot-pink">${product.price}</p>
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
              </Link>
              <CardFooter>
                <Button
                  className="btn-primary w-[80%] ml-5"
                  onClick={async (e) => {
                    e.preventDefault(); 
                    try {
                      const res = await fetch('/api/cart', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          productId: product._id,
                          name: product.name,
                          category: product.category,
                          size: product.size || 'M',
                          price: parseFloat(product.price),
                          image: product.image
                        })
                      });

                      const result = await res.json();
                      if (result.success) {
                        alert("Added to cart!");
                      } else {
                        alert(result.error || "Failed to add to cart");
                      }
                    } catch (error) {
                      console.error("Error adding to cart:", error);
                    }
                  }}
                >
                  Add Cart
                </Button>

              </CardFooter>
            </Card>
          
        ))}
      </div>
    </div>
  );
};

export default Shop;


const merge = (...classes) => classes.filter(Boolean).join(" ");

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
