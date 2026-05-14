"use client";
import { ShoppingCart, Package, Star } from "lucide-react";
import { Product } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface Props {
  product: Product;
  onEdit?: (p: Product) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export default function ProductCard({ product, onEdit, onDelete, isAdmin }: Props) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = async () => {
    setAdding(true);
    await addItem(product.id);
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="card group hover:border-zinc-600 transition-all duration-200 overflow-hidden flex flex-col">
      <div className="relative h-48 bg-zinc-800 overflow-hidden">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={40} className="text-zinc-600" />
          </div>
        )}
        <span className="absolute top-3 left-3 badge bg-zinc-900/90 text-zinc-300 backdrop-blur-sm">
          {product.category}
        </span>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="badge bg-red-500/20 text-red-400 border border-red-500/30">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-white text-sm leading-snug mb-1 line-clamp-2">{product.name}</h3>
        {product.description && (
          <p className="text-zinc-500 text-xs mb-3 line-clamp-2">{product.description}</p>
        )}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-orange-400 font-bold text-lg">${Number(product.price).toFixed(2)}</span>
            <span className="text-xs text-zinc-500">{product.stock} left</span>
          </div>
          {isAdmin ? (
            <div className="flex gap-2">
              <button onClick={() => onEdit?.(product)} className="flex-1 btn-ghost text-sm py-2">Edit</button>
              <button onClick={() => onDelete?.(product.id)} className="flex-1 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm transition-colors">Delete</button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              disabled={adding || product.stock === 0}
              className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                added
                  ? "bg-green-500/15 text-green-400 border border-green-500/30"
                  : "btn-primary"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {adding ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShoppingCart size={15} />
                  {added ? "Added!" : "Add to Cart"}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
