from pathlib import Path

import fitz
from fastapi import HTTPException, status


ALLOWED_EXTENSIONS = {".pdf"}


def load_pdf_text(file_path: str) -> str:
    """
    Load and extract text from a PDF file.
    """

    path = Path(file_path)

    if not path.exists():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="PDF file not found"
        )

    if path.suffix.lower() not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are supported"
        )

    try:
        document = fitz.open(file_path)

        text_parts = []

        for page in document:
            page_text = page.get_text()

            if page_text:
                text_parts.append(page_text)

        document.close()

        extracted_text = "\n".join(text_parts).strip()

        if not extracted_text:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No readable text found in the PDF"
            )

        return extracted_text

    except HTTPException:
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to load PDF: {str(exc)}"
        )