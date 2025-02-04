"""
Database models.
"""
from sqlalchemy.orm import DeclarativeBase
from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy import Boolean, Column, String

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
