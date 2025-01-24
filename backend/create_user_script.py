"""
Script to create a user.
"""
import asyncio
from create_user import create_user

if __name__ == "__main__":
    asyncio.run(create_user("test@email.com", "test"))
