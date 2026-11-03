# ResumeIQ – AI-Powered Resume & Job Description Matcher

<p align="center">
  <strong>Intelligent Resume Analysis | Skill Gap Detection | AI-Powered Career Insights</strong>
</p>

<p align="center">
  <a href="https://ai-resume-jd-matcher-pearl.vercel.app/">
    <strong>🚀 Live Demo</strong>
  </a>
  &nbsp; | &nbsp;
  <a href="https://github.com/Geethika38830/AI-Resume-JD-Matcher">
    <strong>📂 GitHub Repository</strong>
  </a>
</p>

---

## 📌 Overview

ResumeIQ is an AI-powered full-stack web application designed to help job seekers evaluate their resumes against specific job descriptions.

The platform analyzes uploaded resumes, extracts relevant information, evaluates compatibility with job requirements, calculates matching scores, identifies matched and missing skills, and provides personalized recommendations to improve job readiness.

ResumeIQ aims to simplify the resume evaluation process by providing candidates with actionable insights into their strengths, weaknesses, and skill gaps for targeted job roles.

## 🌐 Live Application

**Try ResumeIQ here:**

https://ai-resume-jd-matcher-pearl.vercel.app/

The application is deployed using:
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Neon PostgreSQL

## ✨ Key Features

### 1. Resume Management
- Upload resumes in PDF format.
- Extract text from uploaded PDF documents.
- Store resume information for further analysis.
- Manage uploaded resume records.

### 2. Job Description Management
- Create and manage job descriptions.
- Add job titles and detailed job requirements.
- Maintain multiple job descriptions for different career roles.

### 3. AI-Powered Resume Matching
- Analyze resumes against selected job descriptions.
- Calculate resume-job compatibility scores.
- Identify matching skills and relevant keywords.
- Generate explanations for matching results.

### 4. Skill Gap Analysis
- Identify skills already present in the resume.
- Detect missing or insufficiently represented skills.
- Highlight technical areas that need improvement.
- Help candidates understand job-specific skill requirements.

### 5. Personalized Recommendations
- Generate recommendations based on matching results.
- Suggest areas for technical skill improvement.
- Provide guidance to improve resume relevance.

### 6. User Authentication
- User registration and login.
- JWT-based authentication.
- Protected application functionality.

### 7. Dashboard and History
- View resume and job-related information.
- Access previous matching results.
- Track match history.
- Manage career profile information.

## 🧠 AI and Matching Workflow

ResumeIQ follows a structured workflow to evaluate candidate profiles.

1. **Resume Upload:** The candidate uploads a PDF resume.
2. **Text Extraction:** Resume content is extracted from the PDF.
3. **Job Description Input:** The candidate creates or selects a job description.
4. **Text Processing:** Resume content and job requirements are processed.
5. **Similarity Analysis:** The system evaluates resume-job compatibility using matching techniques.
6. **Skill Comparison:** Relevant and missing skills are identified.
7. **Score Generation:** A compatibility score is calculated.
8. **Recommendations:** The system provides explanations and suggestions for improvement.

### Matching Technologies

- Sentence Transformers for semantic representation in the local RAG-enabled workflow.
- Cosine similarity for semantic comparison.
- Python-based skill matching and analysis.
- Optional RAG pipeline using ChromaDB.
- Ollama with Gemma for local AI-powered explanations.

**Deployment note:** The current Render production configuration uses `RAG_ENABLED=false` to stay within the free instance's memory limits. The deployed application uses its non-RAG matching and explanation path. The full RAG-enabled workflow is intended for local execution.

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite |
| UI Framework | Material UI (MUI) |
| Backend | Python, FastAPI |
| ORM | SQLAlchemy |
| Database | PostgreSQL |
| Database Hosting | Neon |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
| Authentication | JWT |
| PDF Processing | PyMuPDF |
| Semantic AI | Sentence Transformers |
| Similarity | Cosine Similarity |
| Vector Database | ChromaDB |
| Local LLM | Ollama, Gemma |
| Version Control | Git, GitHub |

## 🏗️ System Architecture

```text
                 USER
                   |
                   v
        React + TypeScript Frontend
              (Vercel)
                   |
                   | REST API Requests
                   v
             FastAPI Backend
                (Render)
                   |
          +--------+--------+
          |                 |
          v                 v
    PostgreSQL         Resume Processing
      (Neon)           and Matching Logic
                            |
                            v
                   Skill Gap Analysis
                            |
                            v
                   Match Score and
                    Recommendations
```

**Local AI workflow:** Sentence Transformers, ChromaDB and Ollama/Gemma can be used in the locally RAG-enabled configuration.

## 📁 Project Structure

```text
AI-Resume-JD-Matcher/
│
├── backend/
│   ├── app/
│   │   ├── core/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── rag/
│   │   └── main.py
│   │
│   ├── requirements.txt
│   ├── requirements-render.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── assets/
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

## ⚙️ Local Installation and Setup

### Prerequisites

Install the following:

- Python 3.10 or later
- Node.js and npm
- PostgreSQL
- Git
- Ollama (optional, for the local RAG and LLM workflow)

### 1. Clone the Repository

```bash
git clone https://github.com/Geethika38830/AI-Resume-JD-Matcher.git
```

Navigate into the project:

```bash
cd AI-Resume-JD-Matcher
```

### 2. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```powershell
.venv\Scripts\activate
```

Install the backend dependencies:

```bash
pip install -r requirements.txt
```

### 3. Environment Configuration

Create a `.env` file inside the backend directory using `.env.example` as a reference.

Configure the following environment variables with your own values:

```env
DATABASE_URL=your_postgresql_connection_string
SECRET_KEY=your_secure_secret_key
DEBUG=true
OLLAMA_MODEL=gemma3:4b
RAG_ENABLED=true
```

Do not commit the actual `.env` file or expose database credentials and JWT secrets.

### 4. Start the Backend

Run:

```bash
uvicorn app.main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

### 5. Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Start the frontend:

```bash
npm run dev
```

Open the application:

```text
http://127.0.0.1:5173
```

## ☁️ Production Deployment

ResumeIQ is deployed using separate frontend, backend, and database hosting services.

### Frontend – Vercel

- Platform: Vercel
- Framework: Vite
- Root directory: `frontend`
- Production environment variable:

```env
VITE_API_BASE_URL=https://ai-resume-jd-matcher-backend-jewc.onrender.com
```

Live URL:

https://ai-resume-jd-matcher-pearl.vercel.app/

### Backend – Render

- Platform: Render
- Service type: Web Service
- Root directory: `backend`
- Build command:

```bash
pip install -r requirements-render.txt
```

- Start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Production environment variables include:

```env
DATABASE_URL=your_neon_database_url
SECRET_KEY=your_secure_secret_key
DEBUG=false
RAG_ENABLED=false
OLLAMA_MODEL=gemma3:4b
FRONTEND_URL=https://ai-resume-jd-matcher-pearl.vercel.app
```

### Database – Neon PostgreSQL

- Managed PostgreSQL database hosted on Neon.
- Used for storing application data.
- Connected to the FastAPI backend through `DATABASE_URL`.

**Hosting note:** The current hosting configuration uses free-tier services. Free instances may experience cold starts, usage limits, or temporary availability restrictions. Uploaded files on Render's local filesystem should not be treated as permanently stored.

## 🔐 Security Considerations

- JWT-based authentication.
- Keep database credentials in environment variables.
- Never commit `.env` files.
- Do not expose API secrets or private credentials.
- Avoid uploading sensitive personal resumes to public environments.
- Configure CORS to allow only trusted frontend origins.

## 🚀 Future Enhancements

- Advanced semantic resume-job matching.
- Improved AI-powered resume feedback.
- Automated resume improvement suggestions.
- Integration with external LLM inference services.
- Support for additional resume formats.
- Job recommendation based on candidate skills.
- Personalized learning paths for missing skills.
- Advanced candidate analytics and reporting.

## 🎯 Project Objective

The primary objective of ResumeIQ is to bridge the gap between candidate skills and industry job requirements by providing intelligent resume analysis, skill-gap identification, and actionable career recommendations through an integrated AI-powered platform.

## 👩‍💻 Author

**Geethika Swamy**

B.Tech – Computer Science and Engineering (AI & ML)

GitHub: https://github.com/Geethika38830

---

<p align="center">
  <strong>ResumeIQ – Analyze Your Resume. Identify Skill Gaps. Improve Your Career Readiness.</strong>
</p>
