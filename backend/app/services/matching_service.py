
import os
import re


# Local development: RAG enabled by default.
# Render deployment: set RAG_ENABLED=false.
RAG_ENABLED = os.getenv("RAG_ENABLED", "true").lower() == "true"


COMMON_SKILLS = {
    "python", "java", "c", "c++", "javascript", "typescript",
    "react", "node.js", "fastapi", "flask", "django", "sql",
    "mysql", "postgresql", "mongodb", "machine learning",
    "deep learning", "artificial intelligence", "ai",
    "data science", "data analysis", "pandas", "numpy",
    "scikit-learn", "tensorflow", "pytorch", "html", "css",
    "git", "github", "docker", "kubernetes", "aws", "azure",
}


def normalize_text(text: str) -> str:
    return re.sub(r"\s+", " ", text.lower().strip())


def extract_skills(text: str) -> set[str]:
    normalized_text = normalize_text(text)
    found_skills = set()

    for skill in COMMON_SKILLS:
        pattern = rf"(?<!\w){re.escape(skill)}(?!\w)"

        if re.search(pattern, normalized_text):
            found_skills.add(skill)

    return found_skills


def calculate_skill_match(
    resume_text: str,
    job_description: str,
) -> tuple[float, list[str], list[str]]:

    resume_skills = extract_skills(resume_text)
    required_skills = extract_skills(job_description)

    if not required_skills:
        return 0.0, [], []

    matched_skills = sorted(resume_skills & required_skills)
    missing_skills = sorted(required_skills - resume_skills)

    score = len(matched_skills) / len(required_skills) * 100

    return round(score, 2), matched_skills, missing_skills


def check_experience_match(
    resume_text: str,
    job_description: str,
) -> str:

    resume_text = normalize_text(resume_text)
    job_description = normalize_text(job_description)

    # Supports 2 years, 2+ years, 1.5 yrs, etc.
    years_pattern = (
        r"\b(\d+(?:\.\d+)?)\s*\+?\s*(?:years?|yrs?)\b"
    )

    resume_years = re.findall(years_pattern, resume_text)
    required_years = re.findall(years_pattern, job_description)

    if not required_years:
        return "Experience requirement not specified"

    required = max(map(float, required_years))

    if not resume_years:
        return "Experience information not found in resume"

    candidate = max(map(float, resume_years))

    if candidate >= required:
        return (
            f"Experience requirement met "
            f"({candidate:g} years found, {required:g} required)"
        )

    return (
        f"Experience requirement not met "
        f"({candidate:g} years found, {required:g} required)"
    )


def check_education_match(
    resume_text: str,
    job_description: str,
) -> str:

    resume_text = normalize_text(resume_text)
    job_description = normalize_text(job_description)

    education_keywords = [
        "b.tech", "btech", "b.e", "bachelor", "m.tech",
        "mtech", "m.e", "master", "computer science",
        "information technology", "artificial intelligence",
        "data science",
    ]

    resume_education = {
        keyword for keyword in education_keywords
        if keyword in resume_text
    }

    job_education = {
        keyword for keyword in education_keywords
        if keyword in job_description
    }

    if not job_education:
        return "Education requirement not specified"

    if not resume_education:
        return "Education information not found in resume"

    if resume_education & job_education:
        return "Education requirement appears to be matched"

    return "Education requirement may not be matched"


def generate_explanation(
    score: float,
    matched_skills: list[str],
    missing_skills: list[str],
) -> str:

    if score >= 80:
        level = "strong"
    elif score >= 60:
        level = "good"
    elif score >= 40:
        level = "moderate"
    else:
        level = "low"

    explanation = (
        f"The resume shows a {level} skill match ({score:.2f}%). "
        f"{len(matched_skills)} required skills were found."
    )

    if missing_skills:
        explanation += (
            " Missing skills: " + ", ".join(missing_skills) + "."
        )

    return explanation


def generate_recommendations(missing_skills: list[str]) -> str:

    skills = sorted({
        skill.strip()
        for skill in missing_skills
        if skill and skill.strip()
    })

    if not skills:
        return (
            "No skill gaps were identified by the current skill extractor. "
            "Review the job description manually to confirm all requirements."
        )

    recommendations = [
        f"Strengthen your knowledge of {skill} and practise it "
        f"in a small project or practical exercise."
        for skill in skills
    ]

    return "\n".join(
        f"{index}. {recommendation}"
        for index, recommendation in enumerate(recommendations, start=1)
    )


def perform_match(
    resume_text: str,
    job_description: str,
    resume_id: int | None = None,
) -> dict:

    # 1. Skill matching
    score, matched_skills, missing_skills = calculate_skill_match(
        resume_text,
        job_description,
    )

    # 2. Experience matching
    experience_match = check_experience_match(
        resume_text,
        job_description,
    )

    # 3. Education matching
    education_match = check_education_match(
        resume_text,
        job_description,
    )

    # 4. Default explanation and recommendations
    ai_explanation = generate_explanation(
        score,
        matched_skills,
        missing_skills,
    )

    recommendations = generate_recommendations(missing_skills)

    # 5. Optional RAG analysis
    # Heavy AI modules are imported only when RAG is enabled.
    if RAG_ENABLED:
        try:
            from app.rag.pipeline import (
                process_document,
                analyze_resume_and_job,
            )

            document_id = (
                f"resume_{resume_id}"
                if resume_id is not None
                else None
            )

            if document_id:
                process_document(
                    text=resume_text,
                    document_id=document_id,
                    document_type="resume",
                    source_id=resume_id,
                )

            rag_analysis = analyze_resume_and_job(
                resume_text=resume_text,
                job_description=job_description,
                document_id=document_id,
            )

            if rag_analysis and not rag_analysis.startswith(
                (
                    "Local LLM generation failed:",
                    "Resume text is empty.",
                    "Job description is empty.",
                )
            ):
                ai_explanation = rag_analysis

        except Exception as exc:
            print(f"Optional RAG analysis failed: {exc}")

    # 6. Return final result
    return {
        "match_score": score,
        "matched_skills": ", ".join(matched_skills),
        "missing_skills": ", ".join(missing_skills),
        "experience_match": experience_match,
        "education_match": education_match,
        "ai_explanation": ai_explanation,
        "recommendations": recommendations,
    }
