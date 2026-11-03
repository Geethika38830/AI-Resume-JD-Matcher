
from app.rag.embeddings import generate_embedding
from app.rag.vector_store import search_documents


def retrieve_relevant_documents(
    query: str,
    n_results: int = 5,
    document_id: str | None = None
) -> dict:
    """
    Retrieve relevant document chunks.
    Optionally restrict retrieval to a specific document.
    """

    empty_result = {
        "documents": [],
        "metadatas": [],
        "distances": []
    }

    if not query or not query.strip():
        return empty_result

    query_embedding = generate_embedding(query)

    if query_embedding is None or len(query_embedding) == 0:
        return empty_result

    results = search_documents(
        query_embedding=query_embedding,
        n_results=n_results,
        document_id=document_id
    )

    return {
        "documents": results.get("documents", [[]])[0] or [],
        "metadatas": results.get("metadatas", [[]])[0] or [],
        "distances": results.get("distances", [[]])[0] or []
    }
