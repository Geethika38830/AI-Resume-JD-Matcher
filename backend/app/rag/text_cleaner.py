import re


def clean_text(text: str) -> str:
    """
    Clean extracted resume or job description text.
    """

    if not text:
        return ""

    # Normalize line breaks
    text = text.replace("\r\n", "\n")
    text = text.replace("\r", "\n")

    # Remove excessive whitespace
    text = re.sub(r"[ \t]+", " ", text)

    # Remove excessive blank lines
    text = re.sub(r"\n\s*\n+", "\n\n", text)

    # Remove unwanted special characters
    text = re.sub(
        r"[^\w\s.,;:!?@#$%&()+\-/'\"|]",
        " ",
        text,
        flags=re.UNICODE
    )

    # Remove spaces around newlines
    text = re.sub(r" *\n *", "\n", text)

    # Final cleanup
    return text.strip()