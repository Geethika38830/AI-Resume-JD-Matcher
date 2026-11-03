
from pathlib import Path

import chromadb

from app.core.config import settings


CHROMA_PATH = Path(settings.CHROMA_DIR)
CHROMA_PATH.mkdir(parents=True, exist_ok=True)

client = chromadb.PersistentClient(path=str(CHROMA_PATH))


def get_collection(collection_name: str = "resume_jd_documents"):
    """Get or create the ChromaDB collection."""
    return client.get_or_create_collection(
        name=collection_name,
        metadata={
            "description": "Resume and Job Description embeddings"
        }
    )


def add_documents(
    document_ids: list[str],
    documents: list[str],
    embeddings: list[list[float]],
    metadatas: list[dict] | None = None
) -> None:
    """Store document chunks and their embeddings in ChromaDB."""
    if not documents:
        return

    if len(document_ids) != len(documents):
        raise ValueError(
            "document_ids and documents must have the same length"
        )

    if len(embeddings) != len(documents):
        raise ValueError(
            "embeddings and documents must have the same length"
        )

    collection = get_collection()

    collection.upsert(
        ids=document_ids,
        documents=documents,
        embeddings=embeddings,
        metadatas=metadatas
    )


def search_documents(
    query_embedding: list[float],
    n_results: int = 5,
    document_id: str | None = None
) -> dict:
    """Search semantically, optionally filtering by document ID."""
    collection = get_collection()

    if collection.count() == 0:
        return {
            "ids": [[]],
            "documents": [[]],
            "metadatas": [[]],
            "distances": [[]]
        }

    query_args = {
        "query_embeddings": [query_embedding],
        "n_results": min(n_results, collection.count())
    }

    if document_id is not None:
        query_args["where"] = {"document_id": document_id}

    return collection.query(**query_args)
