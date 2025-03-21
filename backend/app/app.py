"""
Main application module.
"""
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db import User, create_db_and_tables, initialize_features, initialize_announcements, initialize_faqs, initialize_thanks
from app.users import auth_backend, cookie_auth_backend, current_active_user, fastapi_users
from app.features import router as features_router
from app.announcements import router as announcements_router
from app.faqs import router as faqs_router
from app.thanks import router as thanks_router
from app.routes import router as routes_router  # Import the routes router


@asynccontextmanager
async def lifespan(_app: FastAPI):
    """
    Lifespan context manager to create database tables and initialize features.
    """
    # await create_db_and_tables()
    # await initialize_features()
    # await initialize_announcements()
    # await initialize_faqs()  # Initialize FAQs table
    # await initialize_thanks()  # Initialize thanks record
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)
app.include_router(
    fastapi_users.get_auth_router(cookie_auth_backend),
    prefix="/auth/cookie",
    tags=["auth"],
)
# app.include_router(
#     fastapi_users.get_register_router(UserRead, UserCreate),
#     prefix="/auth",
#     tags=["auth"],
# )

app.include_router(features_router, prefix="/features", tags=["features"])
app.include_router(announcements_router, prefix="/announcements", tags=["announcements"])
app.include_router(faqs_router, prefix="/faqs", tags=["faqs"])
app.include_router(thanks_router, prefix="/thanks", tags=["thanks"])
app.include_router(routes_router, prefix="/routes", tags=["routes"])  # Add routes router

# @app.get("/authenticated-route")
# async def authenticated_route(user: User = Depends(current_active_user)):
#     """
#     Authenticated route that returns a greeting message.
#     """
#     return {"message": f"Hello {user.email}!"}


@app.get("/auth/check")
async def check_auth(user: User = Depends(current_active_user)):
    """
    Route to check if the user is authenticated.
    """
    return {"authenticated": True}
