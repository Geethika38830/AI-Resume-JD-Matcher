import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import Base, engine
from app.models import (
    User,
    Resume,
    JobDescription,
    Skill,
    Match,
)
from app.routers.auth import router as auth_router
from app.routers.resume import router as resume_router
from app.routers.job_description import (
    router as job_description_router
)
from app.routers.matching import router as matching_router
from app.routers.dashboard import router as dashboard_router


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION
)


# Authentication routes
app.include_router(auth_router)

# Resume routes
app.include_router(resume_router)

# Job Description routes
app.include_router(job_description_router)

# Matching routes
app.include_router(matching_router)

# Dashboard routes
app.include_router(dashboard_router)


@app.get("/")
def root():
    return {
        "message": "AI Resume JD Matcher API is running",
        "version": settings.APP_VERSION,
        "status": "success"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }