from datetime import datetime

from pydantic import BaseModel, Field


class MatchCreate(BaseModel):
    resume_id: int
    job_description_id: int


class MatchResponse(BaseModel):
    id: int
    resume_id: int
    job_description_id: int

    match_score: float = Field(
        ...,
        ge=0,
        le=100
    )

    matched_skills: str | None = None
    missing_skills: str | None = None
    experience_match: str | None = None
    education_match: str | None = None
    ai_explanation: str | None = None
    recommendations: str | None = None
    created_at: datetime | None = None

    model_config = {
        "from_attributes": True
    }