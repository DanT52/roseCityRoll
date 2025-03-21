"""
Route schedules routes.
"""
import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db import get_async_session
from app.models import RouteSchedule, User
from app.schemas import RouteScheduleCreate, RouteScheduleUpdate, RouteScheduleInDB
from app.users import current_active_user

router = APIRouter()

@router.post("/", response_model=RouteScheduleInDB)
async def create_route(
    route: RouteScheduleCreate,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    """
    Create a new route schedule.
    """
    route_dict = route.dict()
    # Generate a UUID for the new route
    route_dict["id"] = str(uuid.uuid4())
    
    new_route = RouteSchedule(**route_dict)
    session.add(new_route)
    await session.commit()
    await session.refresh(new_route)
    return new_route

@router.put("/{route_id}", response_model=RouteScheduleInDB)
async def update_route(
    route_id: str,
    route_update: RouteScheduleUpdate,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    """
    Update an existing route schedule.
    """
    result = await session.execute(select(RouteSchedule).where(RouteSchedule.id == route_id))
    route = result.scalar_one_or_none()
    if route is None:
        raise HTTPException(status_code=404, detail="Route not found")
    
    route_update_dict = route_update.dict()
    for key, value in route_update_dict.items():
        setattr(route, key, value)
    
    session.add(route)
    await session.commit()
    await session.refresh(route)
    return route

@router.delete("/{route_id}", response_model=dict)
async def delete_route(
    route_id: str,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    """
    Delete an existing route schedule.
    """
    result = await session.execute(select(RouteSchedule).where(RouteSchedule.id == route_id))
    route = result.scalar_one_or_none()
    if route is None:
        raise HTTPException(status_code=404, detail="Route not found")
    
    await session.delete(route)
    await session.commit()
    return {"detail": "Route deleted"}

@router.get("/", response_model=list[RouteScheduleInDB])
async def get_all_routes(
    session: AsyncSession = Depends(get_async_session),
):
    """
    Get all route schedules.
    """
    result = await session.execute(select(RouteSchedule).order_by(RouteSchedule.date))
    routes = result.scalars().all()
    return routes

@router.get("/{route_id}", response_model=RouteScheduleInDB)
async def get_route(
    route_id: str,
    session: AsyncSession = Depends(get_async_session),
):
    """
    Get a specific route schedule by ID.
    """
    result = await session.execute(select(RouteSchedule).where(RouteSchedule.id == route_id))
    route = result.scalar_one_or_none()
    if route is None:
        raise HTTPException(status_code=404, detail="Route not found")
    return route
