import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "ShopHub - Modern E-Commerce",
  description: "Discover amazing products with fast checkout and secure payments",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-background">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
