'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import FakeRazorpayModal from '@/components/FakeRazorpayModal';

const Dashboard = () => {

  const { data: session, status } = useSession(); 
  const router = useRouter();


  const user = session?.user;

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [myListings, setMyListings] = useState([]);
  const [orders, setOrders] = useState([]);
  const[showModal, setShowModal] = useState(false);

  const calculateTotal = (items) => {
  return items.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
};


  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/dashboard/login");
    }
  }, [status, router]);

  
   useEffect(() => {
    if (session?.user?.email) {
    fetchCart();
    fetchMyListings(session.user.email);
    }
  }, [session?.user?.email]);

   

  useEffect(() => {
    if(session?.user?.email) {
    fetch(`/api/orders?userEmail=${user.email}`)
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []));
    }
  }, []);

  
    if (status === "loading") return <p>Loading...</p>;



  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart');
      const json = await res.json();
      if (json.success) {
        setCartItems(json.data);
        const cartTotal = json.data.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(cartTotal);
      }
    } catch (err) {
      console.error("Failed to fetch cart items:", err);
    }
  };


  const fetchMyListings = async (email) => {
  try {
    const res = await fetch(`/api/products/user?email=${email}`);
    const json = await res.json();
    if (json.success) setMyListings(json.data);
    else console.error("API Error:", json.error);
  } catch (err) {
    console.error("Failed to fetch my listings:", err);
  }
};



  const fetchOrders = async () => {
    if (!session?.user?.email) return;
    try {
      const res = await fetch(`/api/orders?userEmail=${session.user.email}`);
      const json = await res.json();
      if (json.success) setOrders(json.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };
   useEffect(() => {
    fetchOrders();
  }, [session]);


  const deleteCartItem = async (id) => {
    try {
      await fetch('/api/cart/', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
      fetchCart();
    } catch (err) {
      console.error("Error deleting cart item:", err);
    }
  };

  const deleteListing = async (id) => {
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (session?.user?.email) {
        fetchMyListings(session.user.email);
      }
    } catch (err) {
      console.error("Error deleting listing:", err);
    }
  };

  if (status === "loading") {
    return <p className="p-10 text-center">Loading...</p>;
  }

  const handleFakeCheckout = async () => {
  try {
    await fetch("/api/fake-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems, userEmail }),
    });

    alert("Payment Successful! Your order has been placed.");
    fetchCart(); 
  } catch (err) {
    console.error("Fake checkout failed:", err);
    alert("Something went wrong during checkout.");
  }
};

const handleSuccessPayment = async () => {
  if (!user?.email || cartItems.length === 0) {
    alert("Cart is empty or user not logged in.");
    return;
  }

  try {
    const res = await fetch("/api/fake-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        userEmail: user.email,  
      }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Payment Successful! Order placed.");
      fetchCart();
    } else {
      alert("Something went wrong during order save.");
    }
  } catch (err) {
    console.error("Fake payment error:", err);
    alert("Checkout failed.");
  }
};


  return (
    <div className="p-10 space-y-12">
      <h1 className="text-2xl font-bold text-deep-plum">Dashboard</h1>
      <div className="bg-white shadow-md border-b border-gray-200 p-4 md:p-6 w-full flex justify-between items-center flex-nowrap">
        <div className="flex items-center gap-3 md:gap-4 min-w-0">
          <img
            src={user?.image || "https://locator.apa.org/resource/1668705141000/PsycLocator/img/profile-default.png"}
            alt={user?.name}
            className="w-10 h-10 md:w-16 md:h-16 rounded-full object-cover border-2 border-hot-pink"
          />
          <div className="min-w-0">
            <h2 className="text-base md:text-2xl font-semibold truncate">{user?.name}</h2>
            <p className="text-xs md:text-sm text-gray-600 truncate">{user?.email}</p>
          </div>
        </div>
        <div>
          <button className="btn-secondary" onClick={() => signOut({ callbackUrl: "/" })}>
            Logout
          </button>
        </div>
      </div>


      <div>
        <h2 className="text-xl font-semibold mb-4">Cart</h2>
        {cartItems.length === 0 ? (
          <p>No items in your cart.</p>
        ) : ( <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item._id} className="flex items-center justify-between border p-4 rounded-md">
                <div>
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category} • {item.size}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-600">₹{item.price} each</p>
                </div>
                <button
                  onClick={() => deleteCartItem(item._id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between items-center">
            <div className="font-bold text-xl">Total: ₹{total}</div>

            {cartItems.length > 0 && (
            <button
              onClick={()=> setShowModal(true)}
              className="bg-hot-pink text-white px-4 py-2 rounded mt-4 hover:bg-deep-plum"
            >
              Checkout
            </button>
          )}
          <FakeRazorpayModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            totalAmount={calculateTotal(cartItems)}
            onSuccess={handleSuccessPayment}
          />

          </div>
        </>
        )}
      </div>


      {/* My Listings Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Listings</h2>
          <Link
            href="/dashboard/add-product"
            className="bg-hot-pink text-white px-4 py-2 rounded-md hover:bg-hot-pink/80"
          >
            Add to List
          </Link>
        </div>
        {myListings.length === 0 ? (
          <p>You haven't listed any products yet.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myListings.map((product) => (
              <li key={product._id} className="border p-4 rounded-md">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-2" />
                <h3 className="text-lg font-bold text-deep-plum">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.category} • {product.size}</p>
                <p className="text-sm mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-hot-pink">₹{product.price}</span>
                  <button
                    onClick={() => deleteListing(product._id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

    
      <div>
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-500">
                  Order Date: {new Date(order.createdAt).toLocaleString()}
                </div>
                <div className="text-right font-semibold text-hot-pink">
                  ₹{order.totalAmount}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-center gap-4 border p-2 rounded-md"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                     <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
      
    

    </div>
  );
};

export default Dashboard;

