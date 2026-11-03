from datetime import datetime, timezone

from sqlalchemy import DateTime, Float, ForeignKey, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Match(Base):
    __tablename__ = "matches"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    resume_id: Mapped[int] = mapped_column(
        ForeignKey("resumes.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    job_description_id: Mapped[int] = mapped_column(
        ForeignKey("job_descriptions.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    match_score: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    matched_skills: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    missing_skills: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    experience_match: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    education_match: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    ai_explanation: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    recommendations: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )