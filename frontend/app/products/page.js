"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.error(error);
        setMessage({ type: "error", text: "Failed to load products. Please try again." });
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const addToCart = async (productId) => {
    if (!user) {
      router.push("/login");
      return;
    }

    setAddingToCart(productId);
    setMessage({ type: "", text: "" });

    try {
      await API.post("/cart/add", { product_id: productId, quantity: 1 });
      setMessage({ type: "success", text: "Product added to cart successfully!" });
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Could not add product to cart. Please try again." });
    } finally {
      setAddingToCart(null);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Products</h1>
          <p className="mt-2 text-muted-foreground">
            Discover our collection of {products.length} amazing products
          </p>
        </div>

        <div className="relative w-full max-w-sm">
          <svg 
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-xl border border-border bg-card py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`rounded-xl border px-4 py-3 ${
          message.type === "success" 
            ? "border-primary/20 bg-secondary text-secondary-foreground" 
            : "border-destructive/20 bg-destructive/10 text-destructive"
        }`}>
          <div className="flex items-center gap-2">
            {message.type === "success" ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {message.text}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-border bg-card p-6">
              <div className="h-6 w-3/4 rounded bg-muted" />
              <div className="mt-4 h-20 rounded bg-muted" />
              <div className="mt-4 flex items-center justify-between">
                <div className="h-8 w-20 rounded bg-muted" />
                <div className="h-10 w-28 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">No products found</h3>
          <p className="mt-2 text-muted-foreground">
            {search ? "Try a different search term" : "Check back later for new arrivals"}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {product.category || "General"}
                </div>
                {product.stock > 0 && (
                  <span className="text-xs text-muted-foreground">{product.stock} in stock</span>
                )}
              </div>
              
              <h2 className="mt-4 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {product.name}
              </h2>
              <p className="mt-2 min-h-[3rem] text-sm text-muted-foreground line-clamp-2">
                {product.description || "No description available."}
              </p>
              
              <div className="mt-6 flex items-center justify-between gap-4">
                <div>
                  <span className="text-2xl font-bold text-primary">
                    ₹{product.price.toLocaleString()}
                  </span>
                </div>
                <button
                  type="button"
                  disabled={addingToCart === product.id}
                  onClick={() => addToCart(product.id)}
                  className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {addingToCart === product.id ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
