# Core
from tortoise import Tortoise
import os

async def init_db():
    await Tortoise.init(
        db_url=os.getenv("DATABASE_URL"),
        modules={"models": ["models.user"]},
    )
    await Tortoise.generate_schemas()
