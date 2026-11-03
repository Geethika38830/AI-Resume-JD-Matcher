from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.job_description import JobDescription
from app.models.user import User
from app.schemas.job_description import (
    JobDescriptionCreate,
    JobDescriptionResponse,
)
from app.services.jd_service import clean_job_description


router = APIRouter(
    prefix="/job-descriptions",
    tags=["Job Descriptions"]
)


@router.post(
    "/",
    response_model=JobDescriptionResponse,
    status_code=status.HTTP_201_CREATED
)
def create_job_description(
    jd_data: JobDescriptionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    title, company, description = clean_job_description(
        title=jd_data.title,
        company=jd_data.company,
        description=jd_data.description
    )

    job_description = JobDescription(
        user_id=current_user.id,
        title=title,
        company=company,
        description=description
    )

    db.add(job_description)
    db.commit()
    db.refresh(job_description)

    return job_description


@router.get(
    "/",
    response_model=list[JobDescriptionResponse]
)
def get_my_job_descriptions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    job_descriptions = (
        db.query(JobDescription)
        .filter(
            JobDescription.user_id == current_user.id
        )
        .order_by(JobDescription.id.desc())
        .all()
    )

    return job_descriptions