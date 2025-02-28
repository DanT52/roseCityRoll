"""
Database module for setting up and accessing the database.
"""
from collections.abc import AsyncGenerator
import os
from dotenv import load_dotenv
from fastapi import Depends
from fastapi_users.db import SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from app.models import Base, User, Feature, Announcement, FAQ, Thanks  # Added Thanks
from contextlib import asynccontextmanager
from sqlalchemy.future import select

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:@localhost:5432/postgres")

engine = create_async_engine(DATABASE_URL)
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)

async def create_db_and_tables():
    """
    Create database tables.
    """
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    """
    Get an asynchronous session.
    """
    async with async_session_maker() as session:
        yield session

async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    """
    Get the user database.
    """
    yield SQLAlchemyUserDatabase(session, User)

async def get_feature_db(session: AsyncSession = Depends(get_async_session)):
    """
    Get the feature database.
    """
    yield SQLAlchemyUserDatabase(session, Feature)

async def get_announcement_db(session: AsyncSession = Depends(get_async_session)):
    """
    Get the announcement database.
    """
    yield SQLAlchemyUserDatabase(session, Announcement)

@asynccontextmanager
async def get_db_session() -> AsyncSession:
    async with async_session_maker() as session:
        yield session

async def initialize_features():
    """
    Initialize default features in the database.
    """
    async with async_session_maker() as session:
        features = ["announcements", "schedule", "faq", "thanks"]
        for feature_name in features:
            result = await session.execute(select(Feature).where(Feature.name == feature_name))
            feature = result.scalar_one_or_none()
            if feature is None:
                new_feature = Feature(name=feature_name, enabled=True)
                session.add(new_feature)
        await session.commit()

# Ensure announcements table is initialized
async def initialize_announcements():
    """
    Initialize the announcements table in the database.
    """
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Ensure FAQs table is initialized
async def initialize_faqs():
    """
    Initialize the FAQs table in the database.
    """
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def initialize_thanks():
    """
    Initialize the thanks record in the database.
    """
    async with async_session_maker() as session:
        result = await session.execute(select(Thanks))
        thanks_obj = result.scalar_one_or_none()
        if thanks_obj is None:
            new_thanks = Thanks(content="")
            session.add(new_thanks)
            await session.commit()



