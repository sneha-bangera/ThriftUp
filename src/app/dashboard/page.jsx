"use client";

import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { data: session, status } = useSession(); // ✅ declared first
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("listings");

  // ✅ Only runs when session is defined
  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch(`/api/cart?userEmail=${session.user.email}`);
      const data = await res.json();
      setCartItems(data);
    };
    if (session?.user) fetchCart();
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/dashboard/login");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return null;
  }

  const handleAddProduct = async () => {
    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({ name, price, image, userEmail: session.user.email }),
    });
    const newProduct = await res.json();
    setProducts([...products, newProduct]);
  };

  const user = session?.user;

  const purchaseHistory = [
    { id: 1, name: "Leather Boots", price: "$60", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Wool Scarf", price: "$20", image: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="min-h-screen w-full bg-light-peach-gradient text-deep-plum">
      <div className="bg-white shadow-md border-b border-gray-200 p-6 w-full flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={user?.image || "https://i.pravatar.cc/150?img=47"}
            alt={user?.name}
            className="w-16 h-16 rounded-full object-cover border-4 border-hot-pink"
          />
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="btn-secondary" onClick={() => signOut({ callbackUrl: "/" })}>
            Logout
          </button>
        </div>
      </div>

      <div className="flex justify-center bg-peach-pink py-4 gap-6 border-b border-gray-300">
        <button
          onClick={() => setActiveTab("listings")}
          className={`px-4 py-2 rounded-lg font-semibold ${activeTab === "listings" ? "text-white bg-hot-pink" : "text-deep-plum hover:bg-pink-100"}`}
        >
          My Listings
        </button>
        <button
          onClick={() => setActiveTab("purchases")}
          className={`px-4 py-2 rounded-lg font-semibold ${activeTab === "purchases" ? "bg-hot-pink text-white" : "text-deep-plum hover:bg-pink-100"}`}
        >
          Purchase History
        </button>
        <button
          onClick={() => setActiveTab("cart")}
          className={`px-4 py-2 rounded-lg font-semibold ${activeTab === "cart" ? "bg-hot-pink text-white" : "text-deep-plum hover:bg-pink-100"}`}
        >
          Cart
        </button>
      </div>

      <div className="p-6 max-w-5xl mx-auto">
        {activeTab === "listings" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">My Listings</h3>
              <button className="bg-hot-pink text-white px-4 py-2 rounded-lg hover:bg-pink-600">Add to Listing</button>
            </div>
            <div className="mb-6">
              <input placeholder="Name" onChange={e => setName(e.target.value)} className="mr-2" />
              <input placeholder="Price" onChange={e => setPrice(e.target.value)} className="mr-2" />
              <input placeholder="Image URL" onChange={e => setImage(e.target.value)} className="mr-2" />
              <button onClick={handleAddProduct} className="bg-hot-pink text-white px-4 py-2 rounded-lg">Add to Listing</button>
            </div>
          </div>
        )}

        {activeTab === "purchases" && (
          <div>
            <h3 className="text-xl font-bold mb-4">Purchase History</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {purchaseHistory.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
                  <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md mb-2" />
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "cart" && (
          <div>
            <h3 className="text-xl font-bold mb-4">My Cart</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
                  <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md mb-2" />
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
