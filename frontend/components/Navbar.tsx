"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Package, LayoutDashboard, ClipboardList, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import CartDrawer from "./CartDrawer";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/products", label: "Products", icon: Package },
  { href: "/orders", label: "Orders", icon: ClipboardList },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { count } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const handleLogout = () => { logout(); router.push("/login"); };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 h-16 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 flex items-center px-6">
        <Link href="/dashboard" className="flex items-center gap-2 mr-10">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <Package size={16} className="text-white" />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">ShopDash</span>
        </Link>

        <div className="flex items-center gap-1 flex-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith(href)
                  ? "bg-orange-500/10 text-orange-400"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link
              href="/admin/products"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith("/admin")
                  ? "bg-orange-500/10 text-orange-400"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <Shield size={15} />
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </button>
          <div className="flex items-center gap-2 pl-3 border-l border-zinc-800">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center text-sm font-bold text-white">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <span className="text-sm text-zinc-300 hidden md:block">{user?.name}</span>
          </div>
          <button onClick={handleLogout} className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </nav>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
