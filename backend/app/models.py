"""
Database models.
"""
from sqlalchemy.orm import DeclarativeBase
from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy import Boolean, Column, String
from sqlalchemy import DateTime, Integer

class Base(DeclarativeBase):
    """
    Base class for all models.
    """


class User(SQLAlchemyBaseUserTableUUID, Base):
    """
    User model.
    """


class Feature(Base):
    """
    Feature model.
    """
    __tablename__ = "features"
    name = Column(String, primary_key=True)
    enabled = Column(Boolean, default=True)


class Announcement(Base):
    """
    Announcement model.
    """
    __tablename__ = "announcements"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    subtext = Column(String, nullable=False)
    published_at = Column(DateTime(timezone=True), nullable=False)
