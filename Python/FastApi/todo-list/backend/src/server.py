## Core
import os
import sys
import uvicorn
from contextlib import asynccontextmanager
from datetime import datetime
from bson import ObjectId
from fastapi import FastAPI, status
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from dotenv import load_dotenv
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(dotenv_path=env_path)

## DB
from dal import ToDoDAL, ListSummary, ToDoList

CONNECTION_NAME = "todo_lists"
MONGODB_URI = os.environ["MONGODB_URI"]
DEBUG = os.environ.get("DEBUG", "false").strip().lower() in {"true", "1", "on", "yes"}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database connection
    client = AsyncIOMotorClient(MONGODB_URI)
    database = client.get_default_database()

    # Check database connection
    pong = await database.command({"ping": 1})
    if pong.get("ok") != 1:
        raise Exception("Cluster connection is not okay!")

    # Assign DAL instance
    app.todo_dal = ToDoDAL(database.get_collection(CONNECTION_NAME))

    yield

    client.close()

# Create FastAPI app
app = FastAPI(lifespan=lifespan, debug=DEBUG)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get summaries of all to-do lists
@app.get("/api/lists")
async def get_all_lists() -> list[ListSummary]:
    return [i async for i in app.todo_dal.list_todo_lists()]

# Request body for creating a new to-do list
class NewList(BaseModel):
    name: str

# Response body after creating a new to-do list
class NewListResponse(BaseModel):
    id: str
    name: str

# Create a new to-do list
@app.post("/api/list", status_code=status.HTTP_201_CREATED)
async def create_todo_list(new_list: NewList) -> NewListResponse:
    return NewListResponse(
        id=await app.todo_dal.create_todo_list(new_list.name),
        name=new_list.name,
    )

# Get a single to-do list by its ID
@app.get("/api/list/{list_id}")
async def get_list(list_id: str) -> ToDoList:
    return await app.todo_dal.get_todo_list(list_id)

# Delete a to-do list by its ID
@app.delete("/api/list/{list_id}")
async def delete_list(list_id: str) -> bool:
    return await app.todo_dal.delete_todo_list(list_id)

# Request body for adding a new item
class NewItem(BaseModel):
    label: str

# Response body after adding a new item
class NewItemResponse(BaseModel):
    id: str
    label: str

# Add a new item to the to-do list
@app.post(
    "/api/lists/{list_id}/items",
    status_code=status.HTTP_201_CREATED
)
async def create_item(list_id: str, new_item: NewItem) -> ToDoList:
    return await app.todo_dal.create_item(list_id, new_item.label)

# Delete an item from a to-do list
@app.delete("/api/lists/{list_id}/items/{item_id}")
async def delete_item(list_id: str, item_id: str) -> ToDoList:
    return await app.todo_dal.delete_item(list_id, item_id)

# Request body for updating the checked state of an item
class ToDoItemUpdate(BaseModel):
    item_id: str
    checked_state: bool

# Update the checked state of an item in a to-do list
@app.patch("/api/lists/{list_id}/checked_state")
async def set_checked_state(list_id: str, update: ToDoItemUpdate) -> ToDoList:
    return await app.todo_dal.set_checked_state(
        list_id, update.item_id, update.checked_state
    )

# Dummy response body
class DummyResponse(BaseModel):
    id: str
    when: datetime

# Dummy endpoint for testing the API
@app.get("/api/dummy")
async def get_dummy() -> DummyResponse:
    return DummyResponse(
        id=str(ObjectId()),
        when=datetime.now(),
    )

# Run the application with Uvicorn
def main(argv=sys.argv[1:]):
    try:
        uvicorn.run("server:app", host="0.0.0.0", port=3001, reload=DEBUG)
    except KeyboardInterrupt:
        pass

if __name__ == "__main__":
    main()
