from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from routers import auth, products, cart

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="E-Commerce API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "E-Commerce Backend Running"
    }


app.include_router(auth.router)
app.include_router(products.router)
app.include_router(cart.router)
