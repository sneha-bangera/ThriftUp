'use client'
import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Heart, Star, ShoppingCart, MessageSquare, Share2 } from "lucide-react"

const merge = (...classes) => classes.filter(Boolean).join(" ")
const Badge = ({ className = '', children, ...props }) => {
  return (
    <span
      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${className}`}
      {...props}
    >
      {children}
    </span>
  )};
const Button = ({ className = '', children, ...props }) => {
  return (
    <button
      className={`text-white font-bold cursor-pointer hover:text-deep-plum hover:bg-peach-pink p-0 flex items-center transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  )};
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
      image: "https://plus.unsplash.com/premium_photo-1671379102281-7225f3d3d97d?q=80&w=687&auto=format&fit=crop"
    }
  ]

if (loading) return <div className="text-center py-16">Loading product details...</div>;
if (!shop) return <div className="text-center py-16">Product not found</div>;


  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img 
                src={shop.image} 
                alt={shop.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-deep-plum mb-2">{shop.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-hot-pink">${shop.price}</span>
              </div>
              <Badge className="bg-green-100 text-green-800">{shop.category || "All"}</Badge>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-deep-plum mb-2">Description</h3>
              <p className="text-gray-600">{shop.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-deep-plum mb-3">Size</h3>
              <div className="flex gap-2">
                <Button className="bg-peach-pink py-2 px-3 rounded-md text-deep-plum">
                  {shop.size || "M"}
                </Button>
              </div>
            </div>

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

            <div className="flex gap-4 pt-4">
              <Button className="btn-primary"
                onClick={async (e) => {
                  e.preventDefault();
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



        <div className="mt-16">
          <h2 className="text-2xl font-bold text-deep-plum mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-peach-pink">
                <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name}
                    className="w-full h-80 object-cover p-5 rounded-2xl"
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
