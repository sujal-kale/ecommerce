"use client";

import { useEffect, useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function DashboardPage() {
  const [productCount, setProductCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [recentProducts, setRecentProducts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadDashboardStats = async () => {
      try {
        const productRes = await API.get("/products");
        setProductCount(productRes.data.length);
        setRecentProducts(productRes.data.slice(0, 3));
      } catch {
        console.error("Unable to load product statistics.");
      }

      if (user) {
        try {
          const cartRes = await API.get("/cart");
          setCartCount(cartRes.data.length);
        } catch {
          setCartCount(0);
        }
      }
    };

    loadDashboardStats();
  }, [user]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="mt-2 text-gray-600">Your ecommerce overview and quick actions.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-semibold">Products</h2>
          <p className="mt-3 text-4xl font-bold text-black">{productCount}</p>
          <p className="mt-2 text-gray-600">Total available products.</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-semibold">Cart Items</h2>
          <p className="mt-3 text-4xl font-bold text-black">{cartCount}</p>
          <p className="mt-2 text-gray-600">Items in your cart.</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-semibold">Orders</h2>
          <p className="mt-3 text-4xl font-bold text-black">—</p>
          <p className="mt-2 text-gray-600">Order management coming soon.</p>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Recent Products</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {recentProducts.length > 0 ? (
            recentProducts.map((product) => (
              <div key={product.id} className="rounded-3xl border border-gray-200 p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="mt-2 text-gray-600">{product.description || "No description."}</p>
                <p className="mt-3 font-bold text-green-600">₹ {product.price}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No products available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
