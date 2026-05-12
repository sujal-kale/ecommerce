import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl rounded-[2rem] bg-white/90 p-10 shadow-2xl backdrop-blur-xl">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">ShopHub Ecommerce</p>
            <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-black sm:text-6xl">
              Build better shopping experiences with Tailwind & FastAPI
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Browse products, manage your cart, and sign in to access user-specific features backed by a FastAPI backend.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-white transition hover:bg-gray-900"
              >
                Shop Products
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full border border-slate-900 px-6 py-3 text-slate-900 transition hover:bg-slate-100"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-slate-950 p-8 text-white shadow-xl sm:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Your store dashboard</p>
            <div className="mt-8 space-y-5">
              <div className="rounded-3xl bg-white/10 p-6">
                <p className="text-sm text-slate-300">Add items to cart</p>
                <p className="mt-2 text-2xl font-semibold">Fast and secure checkout flow</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-6">
                <p className="text-sm text-slate-300">Manage orders</p>
                <p className="mt-2 text-2xl font-semibold">Simple dashboard insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
