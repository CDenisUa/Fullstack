# Core
from fastapi import FastAPI
from db import init_db

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    await init_db()

@app.get("/")
async def root():
    return {"message": "Hello from FastAPI + Tortoise"}
