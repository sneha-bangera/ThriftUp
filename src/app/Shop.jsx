// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Heart, Star, MessageSquare } from "lucide-react";
import Link from "next/link";
// ===== Button Component =====
const Button = ({ className = '', children, ...props }) => {
  return (
    <button
      className={`text-white font-bold cursor-pointer hover:text-deep-plum hover:bg-peach-pink p-0 flex items-center transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
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
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={merge("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={merge("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={merge("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"




const products = [
  {
    id: 1,
    name: "Vintage Denim Jacket",
    price: "$45",
    rating: 4.5,
    likes: 23,
    comments: 8,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=400&fit=crop"
  },
  {
    id: 2,
    name: "Floral Summer Dress",
    price: "$35",
    rating: 4.8,
    likes: 45,
    comments: 12,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop"
  },
  {
    id: 3,
    name: "Classic White Blouse",
    price: "$25",
    rating: 4.2,
    likes: 18,
    comments: 5,
    image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=300&h=400&fit=crop"
  },
  {
    id: 4,
    name: "Pleated Midi Skirt",
    price: "$30",
    rating: 4.6,
    likes: 32,
    comments: 9,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?w=300&h=400&fit=crop"
  }
];

const Shop = () => {
  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-deep-plum mb-8">Shop Thrifted Fashion</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} passHref>
              <div>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="p-0">
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2 text-deep-plum">{product.name}</CardTitle>
                    <p className="text-2xl font-bold text-hot-pink">{product.price}</p>
                    <div className="flex items-center gap-4 mt-3 text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-butter-yellow text-butter-yellow" />
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
                    <Button variant="outline" className="w-full border-hot-pink text-hot-pink hover:bg-peach-pink">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
