"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Product, productsAPI } from "@/lib/api";

interface Props {
  product?: Product | null;
  onClose: () => void;
  onSave: () => void;
}

export default function ProductForm({ product, onClose, onSave }: Props) {
  const [form, setForm] = useState({
    name: "", description: "", price: "", stock: "", category: "", image_url: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description || "",
        price: String(product.price),
        stock: String(product.stock),
        category: product.category,
        image_url: product.image_url || "",
      });
    }
  }, [product]);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setError("");
    if (!form.name || !form.price || !form.category) {
      setError("Name, price, and category are required");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        description: form.description || undefined,
        price: parseFloat(form.price),
        stock: parseInt(form.stock) || 0,
        category: form.category,
        image_url: form.image_url || undefined,
      };
      if (product) {
        await productsAPI.update(product.id, payload);
      } else {
        await productsAPI.create(payload);
      }
      onSave();
    } catch (e: any) {
      setError(e.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="card w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-xl">{product ? "Edit Product" : "Add Product"}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 transition-colors"><X size={18} /></button>
        </div>

        {error && <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}

        <div className="space-y-4">
          <div>
            <label className="block text-zinc-400 text-sm mb-1.5">Product Name *</label>
            <input className="input" placeholder="e.g. Wireless Headphones" value={form.name} onChange={e => set("name", e.target.value)} />
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1.5">Description</label>
            <textarea className="input resize-none h-24" placeholder="Product description..." value={form.description} onChange={e => set("description", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 text-sm mb-1.5">Price (USD) *</label>
              <input className="input" type="number" step="0.01" placeholder="0.00" value={form.price} onChange={e => set("price", e.target.value)} />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1.5">Stock</label>
              <input className="input" type="number" placeholder="0" value={form.stock} onChange={e => set("stock", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1.5">Category *</label>
            <input className="input" placeholder="e.g. Electronics, Clothing..." value={form.category} onChange={e => set("category", e.target.value)} />
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1.5">Image URL</label>
            <input className="input" placeholder="https://..." value={form.image_url} onChange={e => set("image_url", e.target.value)} />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="btn-ghost flex-1">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2">
            {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (product ? "Save Changes" : "Add Product")}
          </button>
        </div>
      </div>
    </div>
  );
}
