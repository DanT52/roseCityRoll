from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models import Thanks
from app.schemas import ThanksRead, ThanksUpdate
from app.db import get_async_session
from app.users import current_active_user

router = APIRouter()

@router.get("/", response_model=ThanksRead)
async def get_thanks(session: AsyncSession = Depends(get_async_session)):
    # Get the thanks record.
    result = await session.execute(select(Thanks))
    thanks_obj = result.scalar_one_or_none()
    if thanks_obj is None:
        raise HTTPException(status_code=404, detail="Thanks record not found")
    return thanks_obj

@router.put("/", response_model=ThanksRead)
async def update_thanks(
    thanks_update: ThanksUpdate,
    session: AsyncSession = Depends(get_async_session),
    user=Depends(current_active_user)
):
    # Update the thanks string.
    result = await session.execute(select(Thanks))
    thanks_obj = result.scalar_one_or_none()
    if thanks_obj is None:
        raise HTTPException(status_code=404, detail="Thanks record not found")
    thanks_obj.content = thanks_update.content
    session.add(thanks_obj)
    await session.commit()
    await session.refresh(thanks_obj)
    return thanks_obj
