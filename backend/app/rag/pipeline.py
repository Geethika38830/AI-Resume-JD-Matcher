
from app.rag.chunker import split_text
from app.rag.embeddings import generate_embeddings
from app.rag.text_cleaner import clean_text
from app.rag.vector_store import add_documents
from app.rag.retriever import retrieve_relevant_documents
from app.rag.prompts import MATCHING_PROMPT
from app.rag.llm import generate_response


def process_document(
    text: str,
    document_id: str,
    document_type: str = "resume",
    source_id: int | None = None
) -> int:
    """Clean, chunk, embed, and store a document."""

    cleaned_text = clean_text(text)

    if not cleaned_text:
        return 0

    chunks = split_text(cleaned_text)

    if not chunks:
        return 0

    embeddings = generate_embeddings(chunks)

    if embeddings is None or len(embeddings) == 0:
        return 0

    document_ids = [
        f"{document_id}_chunk_{index}"
        for index in range(len(chunks))
    ]

    metadatas = [
        {
            "document_id": document_id,
            "document_type": document_type,
            "source_id": source_id if source_id is not None else -1
        }
        for _ in chunks
    ]

    add_documents(
        document_ids=document_ids,
        documents=chunks,
        embeddings=embeddings,
        metadatas=metadatas
    )

    return len(chunks)


def analyze_resume_and_job(
    resume_text: str,
    job_description: str,
    document_id: str | None = None
) -> str:
    """Analyze one resume against a job description using RAG and Gemma."""

    if not resume_text or not resume_text.strip():
        return "Resume text is empty."

    if not job_description or not job_description.strip():
        return "Job description is empty."

    resume_context = ""

    # Retrieve only chunks belonging to the requested resume.
    if document_id:
        retrieved = retrieve_relevant_documents(
            query=job_description,
            n_results=5,
            document_id=document_id
        )

        resume_context = "\n\n".join(
            retrieved.get("documents", [])
        )

    # Use the supplied resume text if no scoped chunks are available.
    if not resume_context:
        resume_context = clean_text(resume_text)

    prompt = MATCHING_PROMPT.format(
        resume_context=resume_context,
        job_description=job_description
    )

    return generate_response(prompt)
