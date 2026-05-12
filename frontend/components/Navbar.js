"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/95 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold tracking-tight">
            ShopHub
          </Link>
          <Link href="/products" className="text-sm transition hover:text-slate-200">
            Products
          </Link>
          <Link href="/cart" className="text-sm transition hover:text-slate-200">
            Cart
          </Link>
          <Link href="/orders" className="text-sm transition hover:text-slate-200">
            Orders
          </Link>
        </div>

        <div className="flex items-center gap-4 text-sm">
          {user ? (
            <button
              onClick={logout}
              className="rounded-full bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="rounded-full border border-white/20 px-4 py-2 transition hover:bg-white/10">
                Login
              </Link>
              <Link href="/signup" className="rounded-full bg-white px-4 py-2 text-black transition hover:bg-slate-100">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
