"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Shield, Trash2, Edit2, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProductForm from "@/components/ProductForm";
import { useAuth } from "@/context/AuthContext";
import { productsAPI, Product } from "@/lib/api";

export default function AdminProductsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [fetching, setFetching] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!user) router.push("/login");
      else if (user.role !== "admin") router.push("/dashboard");
    }
  }, [user, loading]);

  const load = async () => {
    setFetching(true);
    const { data } = await productsAPI.list();
    setProducts(data);
    setFetching(false);
  };

  useEffect(() => { if (user?.role === "admin") load(); }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    setDeleting(id);
    await productsAPI.delete(id);
    await load();
    setDeleting(null);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditing(null);
    load();
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/15 rounded-lg flex items-center justify-center">
                <Shield size={20} className="text-orange-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Product Management</h1>
                <p className="text-zinc-500 text-sm">{products.length} products total</p>
              </div>
            </div>
            <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary flex items-center gap-2">
              <Plus size={16} /> Add Product
            </button>
          </div>

          {fetching ? (
            <div className="card p-8 text-center">
              <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : products.length === 0 ? (
            <div className="card p-16 text-center text-zinc-500">
              <Package size={48} strokeWidth={1} className="mx-auto mb-3 text-zinc-700" />
              <p>No products yet</p>
              <button onClick={() => setShowForm(true)} className="btn-primary mt-4 text-sm">Add First Product</button>
            </div>
          ) : (
            <div className="card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left text-zinc-500 text-xs font-medium px-5 py-3">PRODUCT</th>
                    <th className="text-left text-zinc-500 text-xs font-medium px-5 py-3 hidden sm:table-cell">CATEGORY</th>
                    <th className="text-left text-zinc-500 text-xs font-medium px-5 py-3">PRICE</th>
                    <th className="text-left text-zinc-500 text-xs font-medium px-5 py-3 hidden md:table-cell">STOCK</th>
                    <th className="text-right text-zinc-500 text-xs font-medium px-5 py-3">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr key={p.id} className={`border-b border-zinc-800 last:border-0 hover:bg-zinc-800/30 transition-colors ${i % 2 === 0 ? "" : "bg-zinc-900/20"}`}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-zinc-800 overflow-hidden flex-shrink-0">
                            {p.image_url ? <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" /> : <Package size={16} className="m-auto mt-2.5 text-zinc-600" />}
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">{p.name}</p>
                            {p.description && <p className="text-zinc-500 text-xs truncate max-w-[200px]">{p.description}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span className="badge bg-zinc-800 text-zinc-400">{p.category}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-orange-400 font-bold">${Number(p.price).toFixed(2)}</span>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className={`text-sm ${p.stock === 0 ? "text-red-400" : p.stock < 5 ? "text-yellow-400" : "text-zinc-300"}`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => { setEditing(p); setShowForm(true); }}
                            className="p-2 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            disabled={deleting === p.id}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-colors disabled:opacity-50"
                          >
                            {deleting === p.id ? <div className="w-4 h-4 border border-red-400 border-t-transparent rounded-full animate-spin" /> : <Trash2 size={15} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {showForm && (
        <ProductForm
          product={editing}
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
