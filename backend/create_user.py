"""
Module for creating, deleting, and showing users.
"""
import contextlib
from fastapi_users.exceptions import UserAlreadyExists
from app.db import get_async_session, get_user_db
from app.schemas import UserCreate
from app.users import get_user_manager
from sqlalchemy import select
from app.db import get_db_session
from app.models import User

get_async_session_context = contextlib.asynccontextmanager(get_async_session)
get_user_db_context = contextlib.asynccontextmanager(get_user_db)
get_user_manager_context = contextlib.asynccontextmanager(get_user_manager)

async def create_user(email: str, password: str, is_superuser: bool = False):
    """
    Create a new user with the given email, password, and superuser status.
    """
    try:
        async with get_async_session_context() as session:
            async with get_user_db_context(session) as user_db:
                async with get_user_manager_context(user_db) as user_manager:
                    user = await user_manager.create(
                        UserCreate(
                            email=email, password=password, is_superuser=is_superuser
                        )
                    )
                    print(f"User created {user}")
                    return user
    except UserAlreadyExists:
        print(f"User {email} already exists")
        raise

async def delete_user(email: str):
    """
    Delete a user with the given email.
    """
    async with get_async_session_context() as session:
        async with get_user_db_context(session) as user_db:
            async with get_user_manager_context(user_db) as user_manager:
                user = await user_manager.get_by_email(email)
                if user:
                    await user_manager.delete(user)
                    print(f"User {email} deleted")
                else:
                    print(f"User {email} not found")

async def show_users():
    """
    Show all registered users.
    """
    async with get_db_session() as session:
        result = await session.execute(select(User))
        users = result.scalars().all()
        for user in users:
            print("User:", user.email)
