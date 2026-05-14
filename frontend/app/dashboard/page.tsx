"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Package, ShoppingCart, ClipboardList, TrendingUp, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { productsAPI, ordersAPI, Product, Order } from "@/lib/api";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading]);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      productsAPI.list({ limit: 100 } as any).then(r => setProducts(r.data)),
      ordersAPI.mine().then(r => setOrders(r.data)),
    ]).finally(() => setFetching(false));
  }, [user]);

  if (loading || fetching) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const totalSpent = orders.reduce((s, o) => s + Number(o.total), 0);
  const pendingOrders = orders.filter(o => o.status === "pending").length;

  const stats = [
    { label: "Total Products", value: products.length, icon: Package, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "My Orders", value: orders.length, icon: ClipboardList, color: "text-orange-400", bg: "bg-orange-500/10" },
    { label: "Pending Orders", value: pendingOrders, icon: ShoppingCart, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { label: "Total Spent", value: `$${totalSpent.toFixed(2)}`, icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/10" },
  ];

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-500/15 text-yellow-400",
    confirmed: "bg-blue-500/15 text-blue-400",
    shipped: "bg-purple-500/15 text-purple-400",
    delivered: "bg-green-500/15 text-green-400",
    cancelled: "bg-red-500/15 text-red-400",
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">
              Good day, <span className="text-orange-400">{user?.name?.split(" ")[0]}</span> 👋
            </h1>
            <p className="text-zinc-500 mt-1">Here&apos;s what&apos;s happening with your store.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="card p-5">
                <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-3`}>
                  <Icon size={20} className={color} />
                </div>
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-zinc-500 text-sm mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-white">Recent Orders</h2>
                <Link href="/orders" className="text-orange-400 text-sm flex items-center gap-1 hover:text-orange-300">
                  View all <ArrowRight size={14} />
                </Link>
              </div>
              {orders.length === 0 ? (
                <p className="text-zinc-500 text-sm py-8 text-center">No orders yet</p>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 4).map(order => (
                    <div key={order.id} className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0">
                      <div>
                        <p className="text-white text-sm font-medium">#{order.id.slice(0, 8).toUpperCase()}</p>
                        <p className="text-zinc-500 text-xs">{order.order_items.length} item(s)</p>
                      </div>
                      <div className="text-right">
                        <span className={`badge ${statusColor[order.status] || "bg-zinc-800 text-zinc-400"}`}>{order.status}</span>
                        <p className="text-white text-sm font-bold mt-1">${Number(order.total).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Featured Products */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-white">Latest Products</h2>
                <Link href="/products" className="text-orange-400 text-sm flex items-center gap-1 hover:text-orange-300">
                  Browse all <ArrowRight size={14} />
                </Link>
              </div>
              {products.length === 0 ? (
                <p className="text-zinc-500 text-sm py-8 text-center">No products available</p>
              ) : (
                <div className="space-y-3">
                  {products.slice(0, 4).map(p => (
                    <div key={p.id} className="flex items-center gap-3 py-2 border-b border-zinc-800 last:border-0">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800 overflow-hidden flex-shrink-0">
                        {p.image_url ? <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" /> : <Package size={16} className="m-auto mt-2.5 text-zinc-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate">{p.name}</p>
                        <p className="text-zinc-500 text-xs">{p.category}</p>
                      </div>
                      <span className="text-orange-400 font-bold text-sm">${Number(p.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
