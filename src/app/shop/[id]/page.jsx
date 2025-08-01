'use client'
import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Heart, Star, ShoppingCart, MessageSquare, Share2 } from "lucide-react"

const merge = (...classes) => classes.filter(Boolean).join(" ")

// ===== Badge Component =====
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

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={merge("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={merge("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"


const ProductDetail = () => {
  const { id } = useParams()
  const [shop, setShop] = useState(null)
  const [loading, setLoading] = useState(true)
  // const [selectedSize, setSelectedSize] = useState("M")
  // const [selectedColor, setSelectedColor] = useState("Blue")
  const [quantity, setQuantity] = useState(1)


  useEffect(() => {
  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setShop(data);
    } catch (err) {
      console.error("Failed to fetch product", err);
      setShop(null); // Explicitly mark as not found
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    fetchProduct();
  }
}, [id]);


  
  const relatedProducts = [
    {
      id: 2,
      name: "Floral Summer Dress",
      price: "$35",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=250&fit=crop"
    },
    {
      id: 3,
      name: "Classic White Blouse",
      price: "$25",
      image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=200&h=250&fit=crop"
    },
    {
      id: 4,
      name: "Pleated Midi Skirt",
      price: "$30",
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?w=200&h=250&fit=crop"
    }
  ]

if (loading) return <div className="text-center py-16">Loading product details...</div>;
if (!shop) return <div className="text-center py-16">Product not found</div>;


  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img 
                src={shop.image} 
                alt={shop.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* <div className="grid grid-cols-3 gap-4">
              {shop.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg cursor-pointer">
                  <img 
                    src={image} 
                    alt={`${shop.name} ${index + 2}`}
                    className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
            </div> */}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-deep-plum mb-2">{shop.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                {/* <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(shop.rating) ? 'fill-butter-yellow text-butter-yellow' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-gray-600 ml-2">({shop.totalReviews} reviews)</span>
                </div> */}
                {/* <div className="flex items-center gap-1 text-gray-600">
                  <Heart className="h-4 w-4" />
                  <span>likes</span>
                </div> */}
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-hot-pink">${shop.price}</span>
                {/* <span className="text-lg text-gray-500 line-through">{shop.originalPrice}</span> */}
                {/* <Badge className="cotton-candy-gradient text-white">47% OFF</Badge> */}
              </div>
              <Badge className="bg-green-100 text-green-800">{shop.category || "All"}</Badge>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-deep-plum mb-2">Description</h3>
              <p className="text-gray-600">{shop.description}</p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-deep-plum mb-3">Size</h3>
              <div className="flex gap-2">
                {/* {shop.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className={selectedSize === size ? "bg-peach-pink py-2 px-3 rounded-md text-deep-plum" : "px-3 py-2 border-peach-pink text-deep-plum hover:bg-peach-pink"}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))} */}
                <Button className="bg-peach-pink py-2 px-3 rounded-md text-deep-plum">
                  {shop.size || "M"}
                </Button>
              </div>
            </div>

            {/* Color Selection */}
            {/* <div>
              <h3 className="text-lg font-semibold text-deep-plum mb-3">Color</h3>
              <div className="flex gap-2">
                {shop.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    className={selectedColor === color ? "bg-peach-pink rounded-2xl text-deep-plum p-2.5" : "p-2.5 border-peach-pink text-deep-plum hover:bg-peach-pink"}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div> */}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-deep-plum mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  className="bg-peach-pink px-2.5 rounded-l-md text-deep-plum hover:bg-peach-pink"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                <Button 
                  variant="outline" 
                  className="bg-peach-pink px-2.5 rounded-r-md text-deep-plum hover:bg-peach-pink"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button className="btn-primary"
  onClick={async (e) => {
    e.preventDefault(); // prevent navigation if inside a <Link>
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: shop._id,
          name: shop.name,
          category: shop.category || 'All',
          size: shop.size,
          price: parseFloat(shop.price),
          image: shop.image
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
  <ShoppingCart className="mr-2 h-5 w-5" />
  Add to Cart
</Button>

              <Button variant="outline" className="border-hot-pink text-hot-pink hover:bg-peach-pink">
                <Heart className="h-5 w-5" />
              </Button>
              
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {/* <div className="mt-16">
          <h2 className="text-2xl font-bold text-deep-plum mb-8">Customer Reviews</h2>
          <div className="space-y-6">
            {shop.reviews.map((review) => (
              <Card key={review.id} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-deep-plum">{review.user}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating ? 'fill-butter-yellow text-butter-yellow' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-deep-plum mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name}
                    className="w-full h-80 object-cover"
                  />
                <CardContent className="p-4">
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-deep-plum mb-2">{relatedProduct.name}</h3>
                    <p className="text-xl font-bold text-hot-pink">{relatedProduct.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
