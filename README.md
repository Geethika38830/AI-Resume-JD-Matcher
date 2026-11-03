# ResumeIQ — AI Resume & Job Description Matcher

ResumeIQ is a full-stack application for uploading resumes, saving job descriptions, comparing candidate skills with role requirements, and reviewing match history and recommendations.

## Stack
- Frontend: React, TypeScript, Vite, Material UI, React Router
- Backend: FastAPI, SQLAlchemy, PostgreSQL
- AI/RAG: Sentence Transformers embeddings, ChromaDB retrieval, Ollama/Gemma local inference (when configured)

## Project structure
- `frontend/` — React application
- `backend/app/` — FastAPI application

## Local setup
### Backend
1. Create a Python virtual environment in `backend/`.
2. Install dependencies: `pip install -r requirements.txt`.
3. Copy `.env.example` to `.env` and set a PostgreSQL `DATABASE_URL` and a strong `SECRET_KEY`. Never commit `.env`.
4. From `backend/`, start the API: `uvicorn app.main:app --reload`.
5. API docs: `http://127.0.0.1:8000/docs`; health check: `http://127.0.0.1:8000/health`.

### Frontend
1. From `frontend/`, run `npm install`.
2. Run `npm run dev`.
3. Open `http://127.0.0.1:5173`. The Vite `/api` proxy forwards requests to the local backend and strips the `/api` prefix.
4. Production build: `npm run build`; preview: `npm run preview`.

## Deployment notes
- Deploy the frontend as a static Vite site with build command `npm run build` and output directory `dist`. Set `VITE_API_BASE_URL` to the deployed backend base URL (for example `https://your-api.example.com`); the local Vite proxy is development-only.
- Deploy FastAPI as a Python web service with start command `uvicorn app.main:app --host 0.0.0.0 --port $PORT`. Configure `DATABASE_URL`, `SECRET_KEY`, `CORS_ORIGINS` (comma-separated deployed frontend origin(s)), `UPLOAD_DIR`, and `CHROMA_DIR` as environment variables. Set `OLLAMA_URL` and `OLLAMA_MODEL` if using a separately hosted Ollama service.
- Use managed PostgreSQL and persistent storage for uploaded resumes and ChromaDB data. Do not use an ephemeral filesystem for data that must survive restarts.
- Ollama running at `127.0.0.1:11434` on a developer laptop is not reachable by a deployed backend. To retain Gemma-generated responses, host the inference service separately and configure the backend to use its private service URL. Ensure the hosting instance has sufficient memory/compute for the model.
- Do not expose database credentials, JWT secrets, or inference credentials in frontend environment variables.

## Before publishing
- Review all `.env` files and remove secrets from Git history.
- Test registration, login, resume upload, job-description creation, matching, history, and profile on the deployed URLs.
- Confirm CORS, file-size limits, persistent storage, database migrations/backups, and inference availability.
- `Base.metadata.create_all()` is present in the current backend bootstrap; use explicit migrations for future schema changes. Do not delete a production database to resolve schema differences.

## Important snapshot note
This package is assembled from the source files shared in this conversation, including older project ZIP snapshots and later individual-file updates. Run the build and end-to-end checks in your own environment before treating it as a production release. The actual pasted `package-lock.json` was not available as a mounted file, so regenerate it in `frontend/` with `npm install` and commit the resulting lockfile.
