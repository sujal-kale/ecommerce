"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function DashboardPage() {
  const [productCount, setProductCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadDashboardStats = async () => {
      try {
        const productRes = await API.get("/products");
        setProductCount(productRes.data.length);
        setRecentProducts(productRes.data.slice(0, 4));
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
      
      setLoading(false);
    };

    loadDashboardStats();
  }, [user]);

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <div className="rounded-2xl border border-border bg-card p-12 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <svg className="h-10 w-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-foreground">Access Restricted</h2>
          <p className="mt-2 text-muted-foreground">Please login to view your dashboard</p>
          <Link
            href="/login"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-accent"
          >
            Go to Login
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Welcome back! Here&apos;s your store overview.</p>
        </div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Product
        </Link>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-border bg-card p-6">
              <div className="h-6 w-24 rounded bg-muted" />
              <div className="mt-4 h-10 w-16 rounded bg-muted" />
              <div className="mt-2 h-4 w-32 rounded bg-muted" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground">Total Products</h2>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
            <p className="mt-4 text-4xl font-bold text-foreground">{productCount}</p>
            <p className="mt-1 text-sm text-muted-foreground">Available in store</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground">Cart Items</h2>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <p className="mt-4 text-4xl font-bold text-foreground">{cartCount}</p>
            <p className="mt-1 text-sm text-muted-foreground">Items in your cart</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground">Orders</h2>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p className="mt-4 text-4xl font-bold text-foreground">-</p>
            <p className="mt-1 text-sm text-muted-foreground">Coming soon</p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/products"
          className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Browse Products</h3>
              <p className="text-sm text-muted-foreground">View all available products</p>
            </div>
          </div>
        </Link>

        <Link
          href="/cart"
          className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">View Cart</h3>
              <p className="text-sm text-muted-foreground">Check your cart items</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Products */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Recent Products</h2>
          <Link href="/products" className="text-sm font-medium text-primary hover:text-accent">
            View all
          </Link>
        </div>
        
        {loading ? (
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse rounded-xl border border-border p-4">
                <div className="h-5 w-3/4 rounded bg-muted" />
                <div className="mt-3 h-4 w-full rounded bg-muted" />
                <div className="mt-3 h-6 w-20 rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : recentProducts.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {recentProducts.map((product) => (
              <div key={product.id} className="rounded-xl border border-border p-4 transition-all hover:border-primary">
                <h3 className="font-medium text-foreground">{product.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {product.description || "No description."}
                </p>
                <p className="mt-3 text-lg font-bold text-primary">₹{product.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-border p-8 text-center">
            <p className="text-muted-foreground">No products available yet.</p>
            <Link href="/admin" className="mt-2 inline-block text-sm font-medium text-primary hover:text-accent">
              Add your first product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
