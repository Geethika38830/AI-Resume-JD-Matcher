from pydantic import BaseModel, Field


class JobDescriptionCreate(BaseModel):
    title: str = Field(
        ...,
        min_length=2,
        max_length=200
    )

    company: str | None = Field(
        default=None,
        max_length=200
    )

    description: str = Field(
        ...,
        min_length=20
    )


class JobDescriptionResponse(BaseModel):
    id: int
    title: str
    company: str | None = None
    description: str

    model_config = {
        "from_attributes": True
    }