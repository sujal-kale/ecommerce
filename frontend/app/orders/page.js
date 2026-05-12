"use client";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">Orders</h1>
        <p className="mt-2 text-gray-600">You can build order management here in future releases.</p>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-semibold">Order history</h2>
        <p className="mt-4 text-gray-600">No orders are available yet. Once customers place orders, they will appear here.</p>
      </div>
    </div>
  );
}
