from pydantic import BaseModel, EmailStr
from typing import Optional, List
from decimal import Decimal
from uuid import UUID
from datetime import datetime

# ── Auth ──────────────────────────────────────────────
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: UUID
    name: str
    email: str
    role: str
    created_at: datetime
    class Config: from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserOut

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# ── Products ──────────────────────────────────────────
class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: Decimal
    stock: int = 0
    category: str
    image_url: Optional[str] = None

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[Decimal] = None
    stock: Optional[int] = None
    category: Optional[str] = None
    image_url: Optional[str] = None

class ProductOut(BaseModel):
    id: UUID
    name: str
    description: Optional[str]
    price: Decimal
    stock: int
    category: str
    image_url: Optional[str]
    created_at: datetime
    class Config: from_attributes = True

# ── Cart ──────────────────────────────────────────────
class CartItemCreate(BaseModel):
    product_id: UUID
    quantity: int = 1

class CartItemUpdate(BaseModel):
    quantity: int

class CartItemOut(BaseModel):
    id: UUID
    product_id: UUID
    quantity: int
    product: ProductOut
    class Config: from_attributes = True

# ── Orders ────────────────────────────────────────────
class OrderItemOut(BaseModel):
    id: UUID
    product_id: UUID
    quantity: int
    price: Decimal
    product: ProductOut
    class Config: from_attributes = True

class OrderOut(BaseModel):
    id: UUID
    status: str
    total: Decimal
    created_at: datetime
    order_items: List[OrderItemOut]
    class Config: from_attributes = True
