"use client";

import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold">{product.name}</h2>

      <p className="text-gray-600 mt-2">
        {product.description}
      </p>

      <p className="text-green-600 font-bold mt-2">
        ₹ {product.price}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded w-full"
      >
        Add To Cart
      </button>
    </div>
  );
}