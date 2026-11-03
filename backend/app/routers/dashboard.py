from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.resume import Resume
from app.models.job_description import JobDescription
from app.models.match import Match


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def get_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    total_resumes = (
        db.query(Resume)
        .filter(Resume.user_id == current_user.id)
        .count()
    )

    total_job_descriptions = (
        db.query(JobDescription)
        .filter(
            JobDescription.user_id == current_user.id
        )
        .count()
    )

    total_matches = (
        db.query(Match)
        .filter(Match.user_id == current_user.id)
        .count()
    )

    matches = (
        db.query(Match)
        .filter(Match.user_id == current_user.id)
        .all()
    )

    if matches:
        average_match_score = round(
            sum(match.match_score for match in matches)
            / len(matches),
            2
        )
    else:
        average_match_score = 0.0

    return {
        "total_resumes": total_resumes,
        "total_job_descriptions": total_job_descriptions,
        "total_matches": total_matches,
        "average_match_score": average_match_score
    }