"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { useAuth } from "@/context/AuthContext";
import { productsAPI, Product } from "@/lib/api";

export default function ProductsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading]);

  useEffect(() => {
    productsAPI.categories().then(r => setCategories(r.data));
  }, []);

  const fetchProducts = useCallback(async () => {
    setFetching(true);
    try {
      const { data } = await productsAPI.list({
        search: search || undefined,
        category: category || undefined,
        min_price: minPrice ? parseFloat(minPrice) : undefined,
        max_price: maxPrice ? parseFloat(maxPrice) : undefined,
      });
      setProducts(data);
    } finally { setFetching(false); }
  }, [search, category, minPrice, maxPrice]);

  useEffect(() => {
    const t = setTimeout(fetchProducts, 300);
    return () => clearTimeout(t);
  }, [fetchProducts]);

  const clearFilters = () => { setSearch(""); setCategory(""); setMinPrice(""); setMaxPrice(""); };
  const hasFilters = search || category || minPrice || maxPrice;

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Products</h1>
              <p className="text-zinc-500 text-sm mt-0.5">{products.length} items found</p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 btn-ghost text-sm ${showFilters ? "border-orange-500 text-orange-400" : ""}`}
            >
              <SlidersHorizontal size={15} />
              Filters
              {hasFilters && <span className="w-2 h-2 bg-orange-500 rounded-full" />}
            </button>
          </div>

          <div className="space-y-4 mb-8">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input className="input pl-11 text-sm" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"><X size={14} /></button>
              )}
            </div>

            {showFilters && (
              <div className="card p-4 grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-400 text-xs mb-1.5">Category</label>
                  <select className="input text-sm" value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs mb-1.5">Min Price</label>
                  <input className="input text-sm" type="number" placeholder="$0" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs mb-1.5">Max Price</label>
                  <input className="input text-sm" type="number" placeholder="Any" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                </div>
                {hasFilters && (
                  <button onClick={clearFilters} className="text-orange-400 text-sm hover:text-orange-300 flex items-center gap-1">
                    <X size={12} /> Clear filters
                  </button>
                )}
              </div>
            )}

            {categories.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => setCategory("")} className={`badge cursor-pointer transition-colors ${!category ? "bg-orange-500 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"}`}>All</button>
                {categories.map(c => (
                  <button key={c} onClick={() => setCategory(category === c ? "" : c)} className={`badge cursor-pointer transition-colors ${category === c ? "bg-orange-500 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"}`}>{c}</button>
                ))}
              </div>
            )}
          </div>

          {fetching ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="card h-72 animate-pulse">
                  <div className="h-48 bg-zinc-800 rounded-t-xl" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-zinc-800 rounded w-3/4" />
                    <div className="h-3 bg-zinc-800 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">
              <Package size={48} strokeWidth={1} className="mx-auto mb-3 text-zinc-700" />
              <p>No products found</p>
              {hasFilters && <button onClick={clearFilters} className="text-orange-400 text-sm mt-2 hover:text-orange-300">Clear filters</button>}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
