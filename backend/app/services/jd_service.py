from fastapi import HTTPException, status


def validate_job_description(
    title: str,
    description: str
) -> None:
    title = title.strip()
    description = description.strip()

    if not title:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Job title cannot be empty"
        )

    if not description:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Job description cannot be empty"
        )

    if len(description) < 20:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Job description must contain at least 20 characters"
        )


def clean_job_description(
    title: str,
    company: str | None,
    description: str
) -> tuple[str, str | None, str]:
    title = title.strip()

    if company:
        company = company.strip()
        if not company:
            company = None

    description = description.strip()

    validate_job_description(
        title=title,
        description=description
    )

    return title, company, description