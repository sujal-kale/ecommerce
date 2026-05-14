from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List
from uuid import UUID
from ..database import get_db
from ..models import Order, OrderItem, CartItem, Product
from ..schemas import OrderOut
from ..deps import get_current_user, require_admin

router = APIRouter(prefix="/orders", tags=["orders"])

@router.post("", response_model=OrderOut)
def place_order(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    cart_items = (
        db.query(CartItem)
        .options(joinedload(CartItem.product))
        .filter(CartItem.user_id == current_user.id)
        .all()
    )
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    total = sum(item.product.price * item.quantity for item in cart_items)
    order = Order(user_id=current_user.id, total=total, status="pending")
    db.add(order)
    db.flush()
    for item in cart_items:
        order_item = OrderItem(
            order_id=order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price=item.product.price
        )
        db.add(order_item)
    db.query(CartItem).filter(CartItem.user_id == current_user.id).delete()
    db.commit()
    db.refresh(order)
    return db.query(Order).options(
        joinedload(Order.order_items).joinedload(OrderItem.product)
    ).filter(Order.id == order.id).first()

@router.get("", response_model=List[OrderOut])
def my_orders(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return (
        db.query(Order)
        .options(joinedload(Order.order_items).joinedload(OrderItem.product))
        .filter(Order.user_id == current_user.id)
        .order_by(Order.created_at.desc())
        .all()
    )

@router.get("/all", response_model=List[OrderOut])
def all_orders(db: Session = Depends(get_db), _=Depends(require_admin)):
    return (
        db.query(Order)
        .options(joinedload(Order.order_items).joinedload(OrderItem.product))
        .order_by(Order.created_at.desc())
        .all()
    )

@router.put("/{order_id}/status", response_model=OrderOut)
def update_status(order_id: UUID, status: str, db: Session = Depends(get_db), _=Depends(require_admin)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    valid_statuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"]
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Status must be one of {valid_statuses}")
    order.status = status
    db.commit()
    db.refresh(order)
    return order
