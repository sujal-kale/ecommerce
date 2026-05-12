"use client";

import { useState } from "react";
import API from "../../services/api";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products/", formData);

      alert("Product Added Successfully");

      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed To Add Product");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Admin Panel
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Product Name"
          className="border p-3 rounded"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Description"
          className="border p-3 rounded"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-3 rounded"
          value={formData.price}
          onChange={(e) =>
            setFormData({
              ...formData,
              price: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Category"
          className="border p-3 rounded"
          value={formData.category}
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Stock"
          className="border p-3 rounded"
          value={formData.stock}
          onChange={(e) =>
            setFormData({
              ...formData,
              stock: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="bg-black text-white py-3 rounded hover:bg-gray-800"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}