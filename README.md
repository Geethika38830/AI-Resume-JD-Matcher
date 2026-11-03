# ResumeIQ – AI Resume & Job Description Matcher

ResumeIQ is an AI-powered full-stack application that analyzes resumes against job descriptions, calculates compatibility scores, identifies matched and missing skills, and provides personalized recommendations to help candidates improve their job readiness.

## Key Features

- Resume PDF upload and text extraction
- Job description creation and management
- AI-powered resume and job matching
- Semantic similarity using Sentence Transformers
- Skill matching and skill-gap analysis
- AI-generated explanations and recommendations
- Match history and profile management

## Technology Stack

- **Frontend:** React, TypeScript, Vite, Material UI
- **Backend:** FastAPI, Python, SQLAlchemy
- **Database:** PostgreSQL
- **AI/NLP:** Sentence Transformers, cosine similarity
- **RAG:** ChromaDB and Ollama/Gemma

## Project Structure

- `frontend/` – React application
- `backend/app/` – FastAPI application

## Local Setup

### Backend

1. Create a Python virtual environment inside `backend/`.
2. Install dependencies:

   `pip install -r requirements.txt`

3. Copy `.env.example` to `.env`.
4. Configure PostgreSQL `DATABASE_URL` and a strong `SECRET_KEY`.
5. Start the backend from the `backend/` directory:

   `uvicorn app.main:app --reload`

6. API documentation: `http://127.0.0.1:8000/docs`

### Frontend

1. Navigate to `frontend/`.
2. Install dependencies:

   `npm install`

3. Start the development server:

   `npm run dev`

4. Open `http://127.0.0.1:5173`.

## Deployment Notes

- Deploy the frontend as a Vite static application.
- Deploy FastAPI as a separate backend service.
- Use managed PostgreSQL and persistent storage.
- Configure CORS and production environment variables.
- A locally running Ollama service must be replaced with an externally accessible inference service for public deployment.

## Security

- Never commit `.env` files or credentials.
- Do not upload private resumes or database files.
- Keep JWT secrets and database credentials private.

## Project Status

Local development and feature testing completed. Production deployment and final hosting configuration are pending.
