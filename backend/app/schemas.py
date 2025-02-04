"""
Schemas for user-related data.
"""
import uuid

from fastapi_users import schemas
from pydantic import BaseModel


class UserRead(schemas.BaseUser[uuid.UUID]):
    """
    Schema for reading user data.
    """


class UserCreate(schemas.BaseUserCreate):
    """
    Schema for creating a new user.
    """


class UserUpdate(schemas.BaseUserUpdate):
    """
    Schema for updating user data.
    """


class FeatureBase(BaseModel):
    name: str
    enabled: bool


class FeatureCreate(FeatureBase):
    pass


class FeatureUpdate(FeatureBase):
    pass


class FeatureInDB(FeatureBase):
    class Config:
        from_attributes = True
