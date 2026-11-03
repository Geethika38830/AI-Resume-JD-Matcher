
from pathlib import Path

from fastapi import HTTPException, UploadFile, status

from app.core.config import settings


ALLOWED_EXTENSIONS = {".pdf"}


def validate_resume_file(file: UploadFile) -> None:
    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No file was selected"
        )

    extension = Path(file.filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are allowed"
        )


async def save_resume_file(
    file: UploadFile,
    user_id: int
) -> tuple[str, str]:

    validate_resume_file(file)

    upload_directory = Path(settings.UPLOAD_DIR) / "resumes"

    upload_directory.mkdir(
        parents=True,
        exist_ok=True
    )

    original_name = Path(file.filename).name
    safe_filename = f"{user_id}_{original_name}"

    file_path = upload_directory / safe_filename

    content = await file.read()

    with open(file_path, "wb") as buffer:
        buffer.write(content)

    return original_name, str(file_path)


def extract_text_from_pdf(file_path: str) -> str:

    try:
        # Import PDF processing library only when needed.
        import fitz

        with fitz.open(file_path) as document:
            text = "\n".join(
                page.get_text()
                for page in document
            )

        text = text.strip()

        if not text:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Could not extract text from the PDF"
            )

        return text

    except HTTPException:
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process PDF: {str(exc)}"
        )


async def process_resume(
    file: UploadFile,
    user_id: int
) -> tuple[str, str, str]:

    original_name, file_path = await save_resume_file(
        file,
        user_id
    )

    extracted_text = extract_text_from_pdf(file_path)

    return (
        original_name,
        file_path,
        extracted_text
    )
