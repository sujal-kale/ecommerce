"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ClipboardList, ChevronDown, ChevronUp, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { ordersAPI, Order } from "@/lib/api";

const statusColor: Record<string, string> = {
  pending:   "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  confirmed: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  shipped:   "bg-purple-500/15 text-purple-400 border-purple-500/20",
  delivered: "bg-green-500/15 text-green-400 border-green-500/20",
  cancelled: "bg-red-500/15 text-red-400 border-red-500/20",
};

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading]);

  useEffect(() => {
    if (!user) return;
    ordersAPI.mine().then(r => setOrders(r.data)).finally(() => setFetching(false));
  }, [user]);

  const toggle = (id: string) => setExpanded(expanded === id ? null : id);

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">My Orders</h1>
            <p className="text-zinc-500 text-sm mt-0.5">{orders.length} total orders</p>
          </div>

          {fetching ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card h-20 animate-pulse bg-zinc-900" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">
              <ClipboardList size={48} strokeWidth={1} className="mx-auto mb-3 text-zinc-700" />
              <p>No orders yet</p>
              <button onClick={() => router.push("/products")} className="btn-primary mt-4 text-sm">Browse Products</button>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map(order => (
                <div key={order.id} className="card overflow-hidden">
                  <button
                    onClick={() => toggle(order.id)}
                    className="w-full flex items-center gap-4 p-5 hover:bg-zinc-800/30 transition-colors text-left"
                  >
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <p className="text-zinc-500 text-xs mb-1">Order ID</p>
                        <p className="text-white text-sm font-mono">#{order.id.slice(0, 8).toUpperCase()}</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs mb-1">Date</p>
                        <p className="text-white text-sm">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs mb-1">Items</p>
                        <p className="text-white text-sm">{order.order_items.length} item(s)</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs mb-1">Total</p>
                        <p className="text-orange-400 font-bold">${Number(order.total).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`badge border ${statusColor[order.status] || "bg-zinc-800 text-zinc-400"}`}>{order.status}</span>
                      {expanded === order.id ? <ChevronUp size={16} className="text-zinc-400" /> : <ChevronDown size={16} className="text-zinc-400" />}
                    </div>
                  </button>

                  {expanded === order.id && (
                    <div className="border-t border-zinc-800 p-5">
                      <div className="space-y-3">
                        {order.order_items.map(item => (
                          <div key={item.id} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-zinc-800 overflow-hidden flex-shrink-0">
                              {item.product?.image_url
                                ? <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                                : <Package size={16} className="m-auto mt-2.5 text-zinc-600" />
                              }
                            </div>
                            <div className="flex-1">
                              <p className="text-white text-sm">{item.product?.name || "Product"}</p>
                              <p className="text-zinc-500 text-xs">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-white text-sm font-medium">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
