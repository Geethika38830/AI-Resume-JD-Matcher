
from sentence_transformers import SentenceTransformer

MODEL_NAME = "all-MiniLM-L6-v2"

model = None


def get_model():
    global model

    if model is None:
        model = SentenceTransformer(MODEL_NAME)

    return model


def generate_embeddings(texts: list[str]) -> list[list[float]]:
    if not texts:
        return []

    embeddings = get_model().encode(
        texts,
        convert_to_numpy=True,
        normalize_embeddings=True,
        batch_size=8,
        show_progress_bar=False
    )

    return embeddings.tolist()


def generate_embedding(text: str) -> list[float]:
    if not text or not text.strip():
        return []

    embedding = get_model().encode(
        text,
        convert_to_numpy=True,
        normalize_embeddings=True
    )

    return embedding.tolist()
