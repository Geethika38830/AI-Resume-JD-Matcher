from pydantic import BaseModel


class ResumeResponse(BaseModel):
    id: int
    file_name: str
    file_path: str
    extracted_text: str | None = None

    model_config = {
        "from_attributes": True
    }


class ResumeUploadResponse(BaseModel):
    message: str
    resume: ResumeResponse