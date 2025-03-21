"""
Schemas for user-related data.
"""
import uuid
from datetime import datetime

from fastapi_users import schemas
from pydantic import BaseModel
from typing import Optional, Literal


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


class AnnouncementBase(BaseModel):
    title: str
    subtext: str
    published_at: datetime
    link: Optional[str] = None
    linktext: Optional[str] = None


class AnnouncementCreate(AnnouncementBase):
    pass


class AnnouncementUpdate(AnnouncementBase):
    pass


class AnnouncementInDB(AnnouncementBase):
    id: int

    class Config:
        from_attributes = True


class FAQBase(BaseModel):
    question: str
    answer: str
    link: Optional[str] = None
    linktext: Optional[str] = None

class FAQCreate(FAQBase):
    pass

class FAQUpdate(FAQBase):
    pass

class FAQInDB(FAQBase):
    id: str

    class Config:
        from_attributes = True

# Add schemas for Thanks.
class ThanksRead(BaseModel):
    id: int
    content: str

class ThanksUpdate(BaseModel):
    content: str

# Add schemas for RouteSchedule
class RouteScheduleBase(BaseModel):
    day: str
    date: str
    meeting_point: str
    end_point: Optional[str] = None
    start_time: str
    end_time: str
    route_description: str
    difficulty: Literal['🐰 Bunny', '🟢 Green', '🔵 Blue', '⚫ Black']
    distance: str
    leader: str
    route_map_embed: Optional[str] = None
    start_point_embed: Optional[str] = None

class RouteScheduleCreate(RouteScheduleBase):
    pass

class RouteScheduleUpdate(RouteScheduleBase):
    pass

class RouteScheduleInDB(RouteScheduleBase):
    id: str
    
    class Config:
        from_attributes = True
