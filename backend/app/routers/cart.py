from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List
from uuid import UUID
from ..database import get_db
from ..models import CartItem, Product
from ..schemas import CartItemCreate, CartItemUpdate, CartItemOut
from ..deps import get_current_user

router = APIRouter(prefix="/cart", tags=["cart"])

@router.get("", response_model=List[CartItemOut])
def get_cart(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return (
        db.query(CartItem)
        .options(joinedload(CartItem.product))
        .filter(CartItem.user_id == current_user.id)
        .all()
    )

@router.post("", response_model=CartItemOut)
def add_to_cart(data: CartItemCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    product = db.query(Product).filter(Product.id == data.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    existing = db.query(CartItem).filter(
        CartItem.user_id == current_user.id,
        CartItem.product_id == data.product_id
    ).first()
    if existing:
        existing.quantity += data.quantity
        db.commit()
        db.refresh(existing)
        return existing
    item = CartItem(user_id=current_user.id, product_id=data.product_id, quantity=data.quantity)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.put("/{item_id}", response_model=CartItemOut)
def update_cart_item(item_id: UUID, data: CartItemUpdate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    item = db.query(CartItem).filter(CartItem.id == item_id, CartItem.user_id == current_user.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    if data.quantity <= 0:
        db.delete(item)
        db.commit()
        return {"message": "Item removed"}
    item.quantity = data.quantity
    db.commit()
    db.refresh(item)
    return item

@router.delete("/{item_id}")
def remove_from_cart(item_id: UUID, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    item = db.query(CartItem).filter(CartItem.id == item_id, CartItem.user_id == current_user.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    db.delete(item)
    db.commit()
    return {"message": "Item removed"}

@router.delete("")
def clear_cart(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    db.query(CartItem).filter(CartItem.user_id == current_user.id).delete()
    db.commit()
    return {"message": "Cart cleared"}
