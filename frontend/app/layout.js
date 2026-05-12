import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "E-Commerce Dashboard",
  description: "Full Stack Ecommerce App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <div className="p-6">{children}</div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}