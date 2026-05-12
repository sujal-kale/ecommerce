"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProducts();
  }, []);

  const addToCart = async (productId) => {
    if (!user) {
      router.push("/login");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await API.post("/cart/add", { product_id: productId, quantity: 1 });
      setMessage("Product added to cart successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Could not add product to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold">Products</h1>
          <p className="text-gray-600 mt-2">Browse our catalog and add products to your cart.</p>
        </div>

        <input
          type="text"
          placeholder="Search products"
          className="w-full max-w-sm rounded-2xl border border-gray-300 px-4 py-3 shadow-sm focus:border-black focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {message && (
        <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-green-800">
          {message}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {filteredProducts.map((product) => (
          <div key={product.id} className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="mt-4 min-h-[4rem] text-gray-600">{product.description || "No description available."}</p>
            <div className="mt-5 flex items-center justify-between gap-4">
              <span className="text-2xl font-bold text-green-600">₹ {product.price}</span>
              <button
                type="button"
                disabled={loading}
                onClick={() => addToCart(product.id)}
                className="rounded-full bg-black px-6 py-2 text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
