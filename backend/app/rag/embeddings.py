from sentence_transformers import SentenceTransformer


MODEL_NAME = "all-MiniLM-L6-v2"


model = SentenceTransformer(MODEL_NAME)


def generate_embeddings(
    texts: list[str]
) -> list[list[float]]:
    """
    Generate vector embeddings for a list of text chunks.
    """

    if not texts:
        return []

    embeddings = model.encode(
        texts,
        convert_to_numpy=True,
        normalize_embeddings=True
    )

    return embeddings.tolist()


def generate_embedding(
    text: str
) -> list[float]:
    """
    Generate a single embedding for one text.
    """

    if not text or not text.strip():
        return []

    embedding = model.encode(
        text,
        convert_to_numpy=True,
        normalize_embeddings=True
    )

    return embedding.tolist()