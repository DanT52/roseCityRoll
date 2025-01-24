"""
Database models.
"""
from sqlalchemy.orm import DeclarativeBase
from fastapi_users.db import SQLAlchemyBaseUserTableUUID

class Base(DeclarativeBase):
    """
    Base class for all models.
    """


class User(SQLAlchemyBaseUserTableUUID, Base):
    """
    User model.
    """
