"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, cartAPI, ordersAPI } from "@/lib/api";
import { useAuth } from "./AuthContext";

interface CartCtx {
  items: CartItem[];
  count: number;
  total: number;
  loading: boolean;
  addItem: (productId: string, qty?: number) => Promise<void>;
  updateItem: (id: string, qty: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  checkout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartCtx>({} as CartCtx);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const refresh = async () => {
    if (!token) { setItems([]); return; }
    try {
      const { data } = await cartAPI.get();
      setItems(data);
    } catch { setItems([]); }
  };

  useEffect(() => { refresh(); }, [token]);

  const addItem = async (productId: string, qty = 1) => {
    setLoading(true);
    await cartAPI.add(productId, qty);
    await refresh();
    setLoading(false);
  };

  const updateItem = async (id: string, qty: number) => {
    await cartAPI.update(id, qty);
    await refresh();
  };

  const removeItem = async (id: string) => {
    await cartAPI.remove(id);
    await refresh();
  };

  const checkout = async () => {
    setLoading(true);
    await ordersAPI.place();
    await refresh();
    setLoading(false);
  };

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, count, total, loading, addItem, updateItem, removeItem, checkout, refresh }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
