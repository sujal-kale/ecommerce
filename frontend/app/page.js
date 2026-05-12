import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-card p-8 shadow-sm md:p-12 lg:p-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98110_1px,transparent_1px),linear-gradient(to_bottom,#10b98110_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              New arrivals every week
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Discover products you&apos;ll love
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground leading-relaxed">
              Shop the latest trends with confidence. Fast shipping, secure checkout, and hassle-free returns on every order.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-accent"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Shop Now
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
              >
                Create Account
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl bg-secondary p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="mt-4 font-semibold text-foreground">Fast Delivery</h3>
                <p className="mt-1 text-sm text-muted-foreground">Get your orders in 2-3 business days</p>
              </div>
              <div className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-sm">
                <div className="text-3xl font-bold">500+</div>
                <p className="mt-1 text-sm opacity-90">Products available</p>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-2xl bg-foreground p-6 text-background shadow-sm">
                <div className="text-3xl font-bold">24/7</div>
                <p className="mt-1 text-sm opacity-80">Customer support</p>
              </div>
              <div className="rounded-2xl bg-secondary p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="mt-4 font-semibold text-foreground">Secure Checkout</h3>
                <p className="mt-1 text-sm text-muted-foreground">Your data is always protected</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">Why choose ShopHub?</h2>
          <p className="mt-2 text-muted-foreground">Everything you need for a seamless shopping experience</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground">Wide Selection</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">Browse through hundreds of carefully curated products across multiple categories.</p>
          </div>
          <div className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground">Secure Payments</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">Shop with confidence using our encrypted payment system and fraud protection.</p>
          </div>
          <div className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
              </svg>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground">Easy Returns</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">Not satisfied? Return any item within 30 days for a full refund, no questions asked.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-3xl bg-foreground p-8 text-center text-background md:p-12">
        <h2 className="text-3xl font-bold">Ready to start shopping?</h2>
        <p className="mx-auto mt-3 max-w-lg text-background/80">
          Join thousands of happy customers and discover products that match your style.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-accent"
          >
            Browse Products
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-xl border border-background/20 px-6 py-3 font-medium text-background transition-colors hover:bg-background/10"
          >
            Admin Panel
          </Link>
        </div>
      </section>
    </div>
  );
}
