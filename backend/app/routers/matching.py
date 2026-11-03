
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.job_description import JobDescription
from app.models.match import Match
from app.models.resume import Resume
from app.models.user import User
from app.schemas.match import MatchResponse
from app.services.matching_service import perform_match


router = APIRouter(
    prefix="/matching",
    tags=["Matching"]
)


@router.post(
    "/{resume_id}/{job_description_id}",
    response_model=MatchResponse,
    status_code=status.HTTP_201_CREATED
)
def create_match(
    resume_id: int,
    job_description_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == current_user.id
        )
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found"
        )

    job_description = (
        db.query(JobDescription)
        .filter(
            JobDescription.id == job_description_id,
            JobDescription.user_id == current_user.id
        )
        .first()
    )

    if not job_description:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job description not found"
        )

    if not resume.extracted_text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Resume does not contain extracted text"
        )

    result = perform_match(
        resume_text=resume.extracted_text,
        job_description=job_description.description,
        resume_id=resume.id
    )

    match = Match(
        user_id=current_user.id,
        resume_id=resume.id,
        job_description_id=job_description.id,
        match_score=result["match_score"],
        matched_skills=result["matched_skills"],
        missing_skills=result["missing_skills"],
        experience_match=result["experience_match"],
        education_match=result["education_match"],
        ai_explanation=result["ai_explanation"],
        recommendations=result["recommendations"]
    )

    db.add(match)
    db.commit()
    db.refresh(match)

    return match


@router.get(
    "/",
    response_model=list[MatchResponse]
)
def get_my_matches(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    matches = (
        db.query(Match)
        .filter(Match.user_id == current_user.id)
        .order_by(Match.id.desc())
        .all()
    )

    return matches


@router.get(
    "/{match_id}",
    response_model=MatchResponse
)
def get_match(
    match_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    match = (
        db.query(Match)
        .filter(
            Match.id == match_id,
            Match.user_id == current_user.id
        )
        .first()
    )

    if not match:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Match not found"
        )

    return match
