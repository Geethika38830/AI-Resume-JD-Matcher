from pydantic import BaseModel, Field


class SkillCreate(BaseModel):
    name: str = Field(
        ...,
        min_length=1,
        max_length=100
    )

    category: str | None = Field(
        default=None,
        max_length=100
    )


class SkillResponse(BaseModel):
    id: int
    name: str
    category: str | None = None

    model_config = {
        "from_attributes": True
    }