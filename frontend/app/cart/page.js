"use client";

import { useEffect, useState } from "react";
import API from "../../services/api";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await API.get("/cart");
        setCartItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadCart();
  }, []);

  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`);

      setCartItems(
        cartItems.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">
        Cart
      </h1>

      {cartItems.length > 0 ? (
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow flex flex-col gap-4 md:flex-row md:justify-between md:items-center"
            >
              <div>
                <h2 className="text-xl font-bold">{item.product.name}</h2>
                <p className="mt-2 text-gray-600">Quantity: {item.quantity}</p>
                <p className="mt-2 text-green-600 font-bold">₹ {item.product.price}</p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="rounded-full bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-3 text-gray-600">Browse products and add items to start shopping.</p>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h2 className="text-2xl font-bold">Total: ₹ {total}</h2>
        </div>
      )}
    </div>
  );
}