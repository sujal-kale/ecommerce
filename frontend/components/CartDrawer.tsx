"use client";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

interface Props { open: boolean; onClose: () => void; }

export default function CartDrawer({ open, onClose }: Props) {
  const { items, total, updateItem, removeItem, checkout, loading } = useCart();
  const router = useRouter();

  const handleCheckout = async () => {
    await checkout();
    onClose();
    router.push("/orders");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 z-50 flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-orange-500" />
            <h2 className="font-bold text-white text-lg">Your Cart</h2>
            <span className="badge bg-orange-500/15 text-orange-400">{items.length}</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-zinc-500">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="card p-4 flex gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                  {item.product.image_url ? (
                    <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600">
                      <ShoppingBag size={20} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">{item.product.name}</p>
                  <p className="text-orange-400 font-bold text-sm mt-0.5">${Number(item.product.price).toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => item.quantity > 1 ? updateItem(item.id, item.quantity - 1) : removeItem(item.id)}
                      className="w-7 h-7 rounded-md bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-300 transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-white text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateItem(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-md bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-300 transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto p-1 text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-zinc-800 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Subtotal</span>
              <span className="text-white font-bold text-lg">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Place Order"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
