# ShopDash — Full-Stack E-Commerce Dashboard

Built with **Next.js 14** + **FastAPI** + **PostgreSQL (Neon)**

## Project Structure

```
ecommerce/
├── backend/          # FastAPI
└── frontend/         # Next.js 14
```

---

## 🚀 Quick Start

### 1. Database — Neon (free)
1. Go to [neon.tech](https://neon.tech) → Create a new project
2. Copy the **Connection string** (looks like `postgresql://user:pass@host/db`)

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Edit .env and paste your Neon DATABASE_URL + set a SECRET_KEY

# Run server (tables auto-create on first start)
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set environment variable
cp .env.local.example .env.local
# Edit .env.local → NEXT_PUBLIC_API_URL=http://localhost:8000

# Run dev server
npm run dev
```

App: http://localhost:3000

---

## 🔑 Making Yourself Admin

After registering, run this SQL in your Neon dashboard:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

Admin users get access to the **Admin** tab in the navbar with full product CRUD.

---

## 📁 Key Files

### Backend
| File | Purpose |
|------|---------|
| `app/main.py` | FastAPI app, CORS, router setup |
| `app/models.py` | SQLAlchemy DB models |
| `app/schemas.py` | Pydantic request/response schemas |
| `app/routers/auth.py` | `/auth/register`, `/auth/login`, `/auth/me` |
| `app/routers/products.py` | Product CRUD + search/filter |
| `app/routers/cart.py` | Cart add/update/remove/clear |
| `app/routers/orders.py` | Place order, view orders |

### Frontend
| File | Purpose |
|------|---------|
| `lib/api.ts` | Axios instance + all API functions |
| `context/AuthContext.tsx` | JWT auth state (login/register/logout) |
| `context/CartContext.tsx` | Cart state (add/update/remove/checkout) |
| `components/Navbar.tsx` | Top nav with cart badge |
| `components/CartDrawer.tsx` | Slide-in cart panel |
| `components/ProductCard.tsx` | Product card with add-to-cart |
| `components/ProductForm.tsx` | Add/edit product modal |
| `app/login/page.tsx` | Login page |
| `app/signup/page.tsx` | Signup page |
| `app/dashboard/page.tsx` | Stats + recent activity |
| `app/products/page.tsx` | Product listing + search + filters |
| `app/orders/page.tsx` | Order history |
| `app/admin/products/page.tsx` | Admin CRUD table |

---

## 🌐 API Endpoints

### Auth
- `POST /auth/register` — create account
- `POST /auth/login` — get JWT token
- `GET  /auth/me` — current user

### Products
- `GET    /products` — list (supports `?search=&category=&min_price=&max_price=`)
- `GET    /products/categories` — unique categories
- `GET    /products/{id}` — single product
- `POST   /products` — create *(admin)*
- `PUT    /products/{id}` — update *(admin)*
- `DELETE /products/{id}` — delete *(admin)*

### Cart
- `GET    /cart` — my cart
- `POST   /cart` — add item
- `PUT    /cart/{id}` — update qty
- `DELETE /cart/{id}` — remove item
- `DELETE /cart` — clear cart

### Orders
- `POST /orders` — place order (converts cart → order)
- `GET  /orders` — my orders
