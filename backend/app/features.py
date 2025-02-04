from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db import get_async_session
from app.models import Feature, User
from app.schemas import FeatureUpdate
from app.users import current_active_user

router = APIRouter()

@router.get("/", response_model=list[FeatureUpdate])
async def get_features(session: AsyncSession = Depends(get_async_session)):
    result = await session.execute(select(Feature))
    features = result.scalars().all()
    return features

@router.put("/{feature_name}", response_model=FeatureUpdate)
async def toggle_feature(
    feature_name: str,
    feature_update: FeatureUpdate,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await session.execute(select(Feature).where(Feature.name == feature_name))
    feature = result.scalar_one_or_none()
    if feature is None:
        raise HTTPException(status_code=404, detail="Feature not found")
    feature.enabled = feature_update.enabled
    session.add(feature)
    await session.commit()
    await session.refresh(feature)
    return feature
