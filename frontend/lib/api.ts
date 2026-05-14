import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

// ── types ─────────────────────────────────────────────
export interface User { id: string; name: string; email: string; role: string; created_at: string; }
export interface Product { id: string; name: string; description?: string; price: number; stock: number; category: string; image_url?: string; created_at: string; }
export interface CartItem { id: string; product_id: string; quantity: number; product: Product; }
export interface OrderItem { id: string; product_id: string; quantity: number; price: number; product: Product; }
export interface Order { id: string; status: string; total: number; created_at: string; order_items: OrderItem[]; }

// ── auth ──────────────────────────────────────────────
export const authAPI = {
  register: (name: string, email: string, password: string) =>
    api.post("/auth/register", { name, email, password }),
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
  me: () => api.get("/auth/me"),
};

// ── products ──────────────────────────────────────────
export const productsAPI = {
  list: (params?: { search?: string; category?: string; min_price?: number; max_price?: number }) =>
    api.get<Product[]>("/products", { params }),
  categories: () => api.get<string[]>("/products/categories"),
  get: (id: string) => api.get<Product>(`/products/${id}`),
  create: (data: Partial<Product>) => api.post<Product>("/products", data),
  update: (id: string, data: Partial<Product>) => api.put<Product>(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

// ── cart ──────────────────────────────────────────────
export const cartAPI = {
  get: () => api.get<CartItem[]>("/cart"),
  add: (product_id: string, quantity = 1) => api.post<CartItem>("/cart", { product_id, quantity }),
  update: (id: string, quantity: number) => api.put<CartItem>(`/cart/${id}`, { quantity }),
  remove: (id: string) => api.delete(`/cart/${id}`),
  clear: () => api.delete("/cart"),
};

// ── orders ────────────────────────────────────────────
export const ordersAPI = {
  place: () => api.post<Order>("/orders"),
  mine: () => api.get<Order[]>("/orders"),
};
