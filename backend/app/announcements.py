"""
Announcements routes.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db import get_async_session
from app.models import Announcement, User
from app.schemas import AnnouncementCreate, AnnouncementUpdate, AnnouncementInDB
from app.users import current_active_user

router = APIRouter()

@router.post("/", response_model=AnnouncementInDB)
async def create_announcement(
    announcement: AnnouncementCreate,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    """
    Create a new announcement.
    """
    announcement_dict = announcement.dict()
    # Do not strip timezone info—store the datetime as is (UTC)
    new_announcement = Announcement(**announcement_dict)
    session.add(new_announcement)
    await session.commit()
    await session.refresh(new_announcement)
    return new_announcement

@router.put("/{announcement_id}", response_model=AnnouncementInDB)
async def update_announcement(
    announcement_id: int,
    announcement_update: AnnouncementUpdate,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    """
    Update an existing announcement.
    """
    result = await session.execute(select(Announcement).where(Announcement.id == announcement_id))
    announcement = result.scalar_one_or_none()
    if announcement is None:
        raise HTTPException(status_code=404, detail="Announcement not found")
    announcement_update_dict = announcement_update.dict()
    # Do not strip timezone info—store the datetime as is (UTC)
    for key, value in announcement_update_dict.items():
        setattr(announcement, key, value)
    session.add(announcement)
    await session.commit()
    await session.refresh(announcement)
    return announcement

@router.delete("/{announcement_id}", response_model=dict)
async def delete_announcement(
    announcement_id: int,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    """
    Delete an existing announcement.
    """
    result = await session.execute(select(Announcement).where(Announcement.id == announcement_id))
    announcement = result.scalar_one_or_none()
    if announcement is None:
        raise HTTPException(status_code=404, detail="Announcement not found")
    await session.delete(announcement)
    await session.commit()
    return {"detail": "Announcement deleted"}

@router.get("/latest", response_model=list[AnnouncementInDB])
async def get_latest_announcements(session: AsyncSession = Depends(get_async_session)):
    """
    Get the latest 5 announcements.
    """
    result = await session.execute(select(Announcement).order_by(Announcement.published_at.desc()).limit(5))
    announcements = result.scalars().all()
    return announcements
