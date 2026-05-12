"use client";

import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { removeFromCart } = useCart();

  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">
      <div>
        <h2 className="font-bold text-lg">{item.name}</h2>
        <p>₹ {item.price}</p>
      </div>

      <button
        onClick={() => removeFromCart(item.id)}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Remove
      </button>
    </div>
  );
}