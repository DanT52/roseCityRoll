from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db import get_async_session
from app.models import FAQ
from app.schemas import FAQCreate, FAQUpdate, FAQInDB
from app.users import current_active_user
from uuid import uuid4

router = APIRouter()

@router.post("/", response_model=FAQInDB)
async def create_faq(
    faq: FAQCreate,
    session: AsyncSession = Depends(get_async_session),
    user=Depends(current_active_user)
):
    # Generate a UUID for the id since it doesn't autogenerate
    new_faq = FAQ(id=str(uuid4()), **faq.dict())
    session.add(new_faq)
    await session.commit()
    await session.refresh(new_faq)
    return new_faq

@router.put("/{faq_id}", response_model=FAQInDB)
async def update_faq(
    faq_id: str,
    faq_update: FAQUpdate,
    session: AsyncSession = Depends(get_async_session),
    user=Depends(current_active_user)
):
    result = await session.execute(select(FAQ).where(FAQ.id == faq_id))
    faq_obj = result.scalar_one_or_none()
    if faq_obj is None:
        raise HTTPException(status_code=404, detail="FAQ not found")
    for key, value in faq_update.dict().items():
        setattr(faq_obj, key, value)
    session.add(faq_obj)
    await session.commit()
    await session.refresh(faq_obj)
    return faq_obj

@router.delete("/{faq_id}", response_model=dict)
async def delete_faq(
    faq_id: str,
    session: AsyncSession = Depends(get_async_session),
    user=Depends(current_active_user)
):
    result = await session.execute(select(FAQ).where(FAQ.id == faq_id))
    faq_obj = result.scalar_one_or_none()
    if faq_obj is None:
        raise HTTPException(status_code=404, detail="FAQ not found")
    await session.delete(faq_obj)
    await session.commit()
    return {"detail": "FAQ deleted"}

@router.get("/", response_model=list[FAQInDB])
async def get_faqs(session: AsyncSession = Depends(get_async_session)):
    result = await session.execute(select(FAQ))
    faqs = result.scalars().all()
    return faqs
